import { UserPermission } from "@prisma/client";

export type TeamUser = {
  team?: {
    id?: string;
    organizationId?: string;
    organization?: { id?: string };
  };
  role?: string;
};

export type OrganizationUser = {
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
  teamUsers?: TeamUser[];
  organizationUsers?: OrganizationUser[];
  lastUpdated?: string;
  lastActive?: string;
  status?: string;
  permissions?: UserPermission[];
  phone?: string;
  bio?: string;
  skills?: string[];
};
