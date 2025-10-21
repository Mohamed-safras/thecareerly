import { TeamRole } from "@prisma/client";

export interface UserProfile {
  id: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  roles?: TeamRole[];
  organizationId?: string | null;
  teamId?: string | null;
}
