import { z } from "zod";
import { TeamRole as PrismaTeamRole } from "@prisma/client";

// Prisma enum as runtime + type
export const TeamRole = PrismaTeamRole;
export type TeamRoleType = PrismaTeamRole;

// Zod schema that validates against the Prisma enum
export const TeamRoleSchema = z.nativeEnum(PrismaTeamRole);
