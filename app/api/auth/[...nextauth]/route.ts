import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { login } from "@/server/services/auth/login.service";
import type { JWT } from "next-auth/jwt";
import { TeamRole } from "@prisma/client";

interface ExtendedUser {
  id?: string;
  organizationId?: string;
  teamId?: string;
  roles: TeamRole[];
}

interface ExtendedJWT extends JWT {
  uid: string;
  organizationId?: string;
  teamId?: string;
  roles: TeamRole[];
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
        console.log("Authorize called with credentials:", credentials);
        const emailOrUsername = credentials?.email?.toLowerCase() ?? "";
        const password = credentials?.password ?? "";

        if (!emailOrUsername || !password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          // Call login service which should return user profile data
          const user = await login(emailOrUsername, password);
          console.log("Login service returned user:", user);
          if (!user) {
            console.log("Invalid credentials");
            return null;
          }

          console.log("Login successful for user:", user.id);

          // Return user object with all required profile data
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            organizationId: user.organizationId,
            teamId: user.teamId,
            roles: user.roles,
            image: user.image,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      const jwtToken = token as ExtendedJWT;

      // Set user ID from token sub or user id
      jwtToken.uid = token.sub || user?.id;

      // If user data is available (first login), set additional fields
      if (user) {
        const extendedUser = user as ExtendedUser;
        console.log("JWT callback - user data:", extendedUser);
        jwtToken.roles = extendedUser.roles;
        jwtToken.organizationId = extendedUser.organizationId;
        jwtToken.teamId = extendedUser.teamId;

        console.log("JWT callback - setting user data:", {
          uid: jwtToken.uid,
          roles: jwtToken.roles,
          organizationId: jwtToken.organizationId,
          teamId: jwtToken.teamId,
        });
      }

      return jwtToken;
    },

    async session({ session, token }) {
      const sessionToken = token as ExtendedJWT;

      if (session.user) {
        const extendedUser = session.user as ExtendedUser;
        extendedUser.id = sessionToken.uid;
        extendedUser.roles = sessionToken.roles;
        extendedUser.organizationId = sessionToken.organizationId;
        extendedUser.teamId = sessionToken.teamId;
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
