export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  SUSPENDED = "SUSPENDED",
}

// 2. Permission Module Type (The "What")
export type PermissionModule =
  | "CANDIDATE"
  | "JOB_POSTING"
  | "INTERVIEW_SCHEDULE"
  | "REPORT"
  | "USER_MANAGEMENT";

// 3. Permission State Interface (The Actions)
export interface PermissionState {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

// 4. Overall Permissions Mapping Type
export type RolePermissionsMap = Record<PermissionModule, PermissionState>;

// 5. Shared Constants
export const ALL_MODULES: PermissionModule[] = [
  "USER_MANAGEMENT",
  "REPORT",
  "CANDIDATE",
  "JOB_POSTING",
  "INTERVIEW_SCHEDULE",
];

export const PERMISSION_KEYS: Array<keyof PermissionState> = [
  "canView",
  "canCreate",
  "canEdit",
  "canDelete",
];

// Helper to format enum names (e.g., TEAM_ADMIN -> Team Admin)
export const formatName = (str: string) =>
  str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
