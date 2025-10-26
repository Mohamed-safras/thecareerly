import { z } from "zod";
import {
  TeamRole as PrismaTeamRole,
  OrganizationRole as PrismaOrganizatioRole,
} from "@prisma/client";

// Prisma enum as runtime + type
export type TeamRole = PrismaTeamRole;
export type TeamRoleType = PrismaTeamRole;

export type OrganizationRole = PrismaOrganizatioRole;

// Zod schema that validates against the Prisma enum
export const TeamRoleSchema = z.nativeEnum(PrismaTeamRole);
