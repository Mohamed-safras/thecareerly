import { UserPermission } from "@prisma/client";

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

export type UserProfile = {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  organizationId?: string;
  teamId?: string;
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
  lastUpdated?: string;
  lastActive?: string;
  status?: string;
  permissions?: UserPermission[];
  phone?: string;
  bio?: string;
  skills?: string[];
};
