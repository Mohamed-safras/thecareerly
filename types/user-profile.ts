import { UserPermission } from "@prisma/client";

export type UserProfile = {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: string[];
  organizationId?: string;
  teamId?: string;
  lastUpdated?: string;
  lastActive?: string;
  status?: string;
  permissions?: UserPermission[];
  phone?: string;
  bio?: string;
  skills?: string[];
};
