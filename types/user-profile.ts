export type UserPermission = {
  resource: string;
  action: string;
};

export type UserProfile = {
  id?: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  avatar?: string;
  roles?: string[];
  organization?: Record<string, { id: string }> | object; // Raw organization object from API
  organizationId?: string; // Extracted organization ID
  organizationName?: string; // Extracted organization name (dynamic key)
  teamId?: string;
  lastUpdated?: string;
  lastActive?: string;
  status?: string;
  permissions?: UserPermission[];
  phone?: string;
  bio?: string;
  skills?: string[];
};
