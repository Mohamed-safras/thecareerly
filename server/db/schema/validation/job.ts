import { DatetimeLocalRegex } from "@/lib/common/validate";
import { z as zod } from "zod";

const objectId = zod
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid Mongo ObjectId (must be 24 hex chars)");

export const SalarySchema = zod.object({
  min: zod.string().optional(),
  max: zod.string().optional(),
  currency: zod.string().max(10).optional(),
  payPeriod: zod.string().optional(),
});

export const QuestionSchema = zod.object({
  prompt: zod.string().min(1),
  required: zod.boolean().optional(),
  kind: zod.string().optional(),
  options: zod.array(zod.string()).optional(),
});

export const SelectionProcessSchema = zod.object({
  order: zod.number().int().nonnegative().optional(),
  title: zod.string().min(1),
  description: zod.string().optional(),
});

export const CreateJobSchema = zod.object({
  title: zod.string().min(1),
  employmentType: zod.string().optional(),
  workPreference: zod.string().optional(),
  jobSeniority: zod.string().optional(),
  minimumQualificationLevel: zod.string().optional(),

  facilities: zod.array(zod.string()).default([]),
  skills: zod.array(zod.string()).default([]),

  description: zod.string().optional(),
  location: zod.string().optional(),

  salary: SalarySchema.default({}),

  scheduleDate: zod
    .union([
      zod
        .string()
        .regex(DatetimeLocalRegex, { message: "Invalid datetime-local" }),
      zod.string().datetime(), // RFC 3339 (e.g., 2025-09-15T09:00:00Z)
      zod.date(), // already a Date (server-side callers)
    ])
    .optional()
    .transform((v) => {
      if (!v) return undefined;
      if (v instanceof Date) return v;
      return new Date(v); // works for both datetime-local and RFC 3339
    })
    .refine((d) => d === undefined || !Number.isNaN(d.getTime()), {
      message: "Invalid datetime",
    }),

  companyName: zod.string().optional(),
  companySite: zod.string().url().optional(),

  questions: zod.array(QuestionSchema).default([]),
  selectionProcess: zod.array(SelectionProcessSchema).default([]),

  posterFileId: zod.string().nullable().optional(),
  posterPreview: zod.string().nullable().optional(),

  // required relations
  userId: objectId,
  teamId: objectId,

  // server-side fields
  status: zod.enum(["open", "hold", "closed", "draft"]).default("open"),
  complianceStatus: zod
    .enum(["pending", "approved", "flagged"])
    .default("pending"),

  // free-form JSONs
  ai_content: zod.any().default({}),
  selectedPlatforms: zod.any().default({}),
});

export type CreateJobInput = zod.infer<typeof CreateJobSchema>;
