import { TeamRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      roles: TeamRole[];
      organizationId?: string | null;
      teamId?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles: TeamRole[];
    organizationId?: string | null;
    teamId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    roles: TeamRole[];
    organizationId?: string | null;
    teamId?: string | null;
  }
}
