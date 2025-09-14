import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getEmailDomain, isOrgEmail } from "@/server/auth/policy";
import { fetchAzurePhotoAsDataUrl } from "@/server/auth/azure-photo";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { candidateCredentialsAuthorize } from "@/server/services/auth/candidate.service";
import {
  stakeholderCredentialsAuthorize,
  stakeholderOAuthGateOrCleanup,
} from "@/server/services/auth/employee.service";

interface User {
  id?: string;
  userType?: "Employee" | "Candidate";
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email.toLocaleLowerCase() ?? "";
        const password = credentials?.password ?? "";
        if (!email || !password) return null;

        if (isOrgEmail(email)) {
          return await stakeholderCredentialsAuthorize(email, password);
        }
        return await candidateCredentialsAuthorize(email, password);
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
      profile(profile: {
        sub: string;
        name?: string | null;
        email?: string | null;
        picture?: string | null;
      }) {
        return {
          id: profile.sub,
          name: profile.name ?? null,
          email: profile.email ?? null,
          image: profile.picture ?? null,
        };
      },
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
      tenantId: process.env.AZURE_AD_TENANT_ID ?? "common",
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  callbacks: {
    // classify & persist on SSO login
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;

      const ok = await stakeholderOAuthGateOrCleanup({
        id: user.id as string | undefined,
        email: user.email,
      });

      return ok;
    },
    jwt,
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).id = token.uid as string | undefined;
        (session.user as User).userType = token.utype as
          | "Employee"
          | "Candidate"
          | undefined;
      }

      if (session.user && !session.user.image && token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import type { JWT } from "next-auth/jwt";

/** Extend JWT without using `any` */
type UserKind = "Employee" | "Candidate";
interface ExtendedJWT extends JWT {
  uid?: string;
  utype?: UserKind;
  picture?: string;
}

/** Safe helpers (no `any`) */
const toLower = (s?: string | null) => (s ? s.toLowerCase() : "");
const getProfilePicture = (profile: unknown): string | undefined => {
  if (profile && typeof profile === "object") {
    const obj = profile as Record<string, unknown>;
    const candidate =
      (typeof obj.picture === "string" && obj.picture) ||
      (typeof obj.avatar_url === "string" && obj.avatar_url) ||
      (typeof obj.image === "string" && obj.image) ||
      undefined;
    return candidate;
  }
  return undefined;
};

async function ensureUserMeta(
  userId: string,
  email: string,
  desired: UserKind
): Promise<UserKind> {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { userType: true, emailDomain: true },
  });

  if (!existing?.userType) {
    await prisma.user.update({
      where: { id: userId },
      data: { userType: desired, emailDomain: getEmailDomain(email) },
    });
    return desired;
  }

  if (!existing.emailDomain) {
    await prisma.user.update({
      where: { id: userId },
      data: { emailDomain: getEmailDomain(email) },
    });
  }

  // keep what’s already set
  return existing.userType as UserKind;
}

export async function jwt({
  token,
  account,
  profile,
}: {
  token: JWT;
  account?: { provider?: string; access_token?: string } | null;
  profile?: unknown;
}): Promise<JWT> {
  const t = token as ExtendedJWT;

  // mirror DB id
  t.uid = token.sub;

  // set/refresh userType when first OAuth login happens or missing in token
  if (account || !t.utype) {
    const email = toLower(token.email);
    const desired: UserKind = isOrgEmail(email) ? "Employee" : "Candidate";

    if (t.uid) {
      t.utype = await ensureUserMeta(t.uid, email, desired);
    } else {
      t.utype = desired; // fallback (rare)
    }
  }

  // ---- Avatar handling on OAuth sign-in ----
  if (account) {
    const pic = getProfilePicture(profile);
    if (pic) {
      t.picture = pic;
      if (t.uid) {
        try {
          await prisma.user.update({
            where: { id: t.uid },
            data: { image: pic },
          });
        } catch {
          /* ignore */
        }
      }
    }
  }

  // Azure AD: optionally fetch Graph photo if access token present and no picture yet
  if (
    account?.provider === "azure-ad" &&
    account.access_token &&
    t.uid &&
    !t.picture
  ) {
    try {
      const blobUrl = await fetchAzurePhotoAsDataUrl(
        account.access_token
      ).catch(() => null);
      if (blobUrl) {
        t.picture = blobUrl;
        await prisma.user.update({
          where: { id: t.uid },
          data: { image: blobUrl },
        });
      }
    } catch {
      /* ignore */
    }
  }

  return t;
}
