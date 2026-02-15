export function getJobsPath(
  organizationId?: string | null,
  teamId?: string | null,
) {
  if (!organizationId || !teamId) return null;
  return `/organization/${organizationId}/team/${teamId}/jobs`;
}
