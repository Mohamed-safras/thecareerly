// Do not import useAppSelector here; use a pure helper function instead

export const HOME = "/";
export const FORBIDDEN = "/forbidden";

export const API_AUTH = "/api/auth";

// Organization paths
export const CONNECT_ORGANIZATION_CREATE = "/connect/organization/create";

export const CONNECT_ORGANIZATION_LOGIN = "/connect/organization/login";
export const CONNECT_EMPLOYEE_DASHBOARD = "/connect/dashboard";
export const EMPLOYEE = "/connect";

export const GENERATE_JD = "/api/employee/generate-jd";

export const GENERATE_POSTER = "/api/employee/generate-poster";

export const CONNECT_MEMBER_LOGIN = "/connect/member/login";

export const GENERATE_JOB_DESCRIPTION_API = `api/ai-agent/generate-job-description`;

/**
 * Returns the jobs path for a given organizationId and teamId.
 * Usage: getJobsPath(organizationId, teamId)
 */
export function getJobsPath(
  organizationId?: string | null,
  teamId?: string | null
) {
  if (!organizationId || !teamId) return null;
  return `/organization/${organizationId}/team/${teamId}/jobs`;
}
