import "next-auth";
import "next-auth/jwt";
import { OrganizationUserType, TeamUserType } from "./user-profile";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      organizationId?: string;
      teamId?: string;
      teamUsers?: TeamUserType[];
      organizationUsers?: OrganizationUserType[];
      phone?: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    organizationId?: string;
    teamId?: string;
    teamUsers?: TeamUserType[];
    organizationUsers?: OrganizationUserType[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    organizationId?: string;
    teamId?: string;
    teamUsers?: TeamUserType[];
    organizationUsers?: OrganizationUserType[];
  }
}
