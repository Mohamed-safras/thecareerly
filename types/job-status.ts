import { z } from "zod";
import { JobStatus as PrismaJobStatus } from "@prisma/client";

// Prisma enum re-export
export const JobStatus = PrismaJobStatus;

// TypeScript union: "Open" | "Hold" | "Draft" | "Closed"
export type JobStatusType = PrismaJobStatus;

// Zod schema for validation
export const JobStatusSchema = z.nativeEnum(PrismaJobStatus);
