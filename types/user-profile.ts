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
  id?: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  roles?: string[];
  organizationId?: string | null;
  teamId?: string | null;
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
};

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  roles?: string[];
  organizationId?: string | null;
  teamId?: string | null;
  teamUsers?: TeamUserType[];
  organizationUsers?: OrganizationUserType[];
}
