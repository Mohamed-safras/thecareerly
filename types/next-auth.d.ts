import "next-auth";
import "next-auth/jwt";

export type TeamUserType = {
  team?: {
    id?: string;
    organizationId?: string;
    organization?: { id?: string };
  };
  role?: string;
};

export type OrganizationUserType = {
  organization?: { id?: string };
  role?: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      organizationId?: string | null;
      teamId?: string | null;
      teamUsers?: TeamUserType[];
      organizationUsers?: OrganizationUserType[];
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    organizationId?: string | null;
    teamId?: string | null;
    teamUsers?: TeamUserType[];
    organizationUsers?: OrganizationUserType[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    organizationId?: string | null;
    teamId?: string | null;
    teamUsers?: TeamUserType[];
    organizationUsers?: OrganizationUserType[];
  }
}
