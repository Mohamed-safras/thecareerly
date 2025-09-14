import { z } from "zod";
import { TeamRole } from "@prisma/client";

// Create Zod enum directly from Prisma enum
export const TeamRoleSchema = z.nativeEnum(TeamRole);

export type TeamRoleType = z.infer<typeof TeamRoleSchema>;
