export const ROLES = {
  ORGANIZATION_SUPER_ADMIN: "ORGANIZATION_SUPER_ADMIN",
  TEAM_ADMIN: "TEAM_ADMIN",
  TEAM_MEMBER: "TEAM_MEMBER",
  GUEST: "GUEST",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
