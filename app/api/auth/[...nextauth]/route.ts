import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { login } from "@/server/services/auth/login.service";
import type { JWT } from "next-auth/jwt";
import { OrganizationUserType, TeamUserType } from "@/types/user-profile";

// Team and Organization user types

// Extended user type for NextAuth
interface ExtendedUser extends User {
  id: string;
  organizationId?: string;
  teamId?: string;
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
  image?: string;
  name?: string;
  email?: string;
  phone?: string;
}

// Extended JWT type for NextAuth
interface ExtendedJWT extends JWT {
  uid: string;
  organizationId?: string;
  teamId?: string;
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
  image?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email/Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const emailOrUsername = credentials?.email?.toLowerCase() ?? "";
        const password = credentials?.password ?? "";

        if (!emailOrUsername || !password) {
          return null;
        }

        try {
          const user = await login(emailOrUsername, password);
          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            organizationId: user.organizationId,
            teamId: user.teamId,
            teamUsers: user.teamUsers ?? [],
            organizationUsers: user.organizationUsers ?? [],
            image: user.image,
            phone: user.phone,
          } as ExtendedUser;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        return {
          ...token,
          uid: extendedUser.id,
          organizationId: extendedUser.organizationId,
          teamId: extendedUser.teamId,
          teamUsers: extendedUser.teamUsers ?? [],
          organizationUsers: extendedUser.organizationUsers ?? [],
          image: extendedUser.image,
          name: extendedUser.name,
          email: extendedUser.email,
        } as ExtendedJWT;
      }
      const extToken = token as ExtendedJWT;
      return {
        ...token,
        uid: extToken.uid ?? token.sub ?? "",
        organizationId: extToken.organizationId,
        teamId: extToken.teamId,
        teamUsers: extToken.teamUsers ?? [],
        organizationUsers: extToken.organizationUsers ?? [],
        image: extToken.image,
        name: extToken.name,
        email: extToken.email,
      } as ExtendedJWT;
    },

    async session({ session, token }) {
      const extToken = token as ExtendedJWT;
      if (session.user) {
        (session.user as ExtendedUser).id = extToken.uid;
        (session.user as ExtendedUser).organizationId = extToken.organizationId;
        (session.user as ExtendedUser).teamId = extToken.teamId;
        (session.user as ExtendedUser).teamUsers = extToken.teamUsers ?? [];
        (session.user as ExtendedUser).organizationUsers =
          extToken.organizationUsers ?? [];
        (session.user as ExtendedUser).image = extToken.image;
        (session.user as ExtendedUser).name = extToken.name;
        (session.user as ExtendedUser).email = extToken.email;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: "session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
