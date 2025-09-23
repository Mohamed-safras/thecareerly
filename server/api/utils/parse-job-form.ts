import { NextRequest } from "next/server";
import { isFile, toBuffer } from "@/lib/common/file";
import { safeParseJSON } from "@/lib/common/json";
import { isObjectId, parseDatetimeLocal } from "@/lib/common/validate";
import { BadRequestError } from "@/lib/error/http-error";
import { CreateJobSchema } from "@/server/db/schema/validation/job";
import { FilePayload } from "@/types/file-payload";
import { ParsedJob } from "@/types/parse-job";
import { User } from "@prisma/client";

export async function parseJobForm(
  formData: FormData,
  userId: string,
  teamId?: string
): Promise<ParsedJob> {
  // Files (optional)
  console.log(formData);

  const posterEntry = formData.get("poster");

  let posterFile: FilePayload | undefined;

  if (isFile(posterEntry)) {
    const buffer = await toBuffer(posterEntry);
    posterFile = {
      buffer,
      contentType: posterEntry.type ?? "application/octet-stream",
      preview: (formData.get("posterPreview") as string) ?? undefined,
    };
  }
  // Scalars (keep loose; Zod will validate/transform)
  const body: Record<string, unknown> = {
    title: (formData.get("title") as string) ?? "",
    employmentType: (formData.get("employmentType") as string) ?? undefined,
    workPreference: (formData.get("workPreference") as string) ?? undefined,
    jobSeniority: (formData.get("jobSeniority") as string) ?? undefined,
    minimumQualificationLevel:
      (formData.get("minimumQualificationLevel") as string) ?? undefined,
    description: (formData.get("description") as string) ?? undefined,
    location: (formData.get("location") as string) ?? undefined,
    // keep as string; Zod will coerce to Date
    scheduleDate: (formData.get("scheduleDate") as string) || new Date(),
    companyName: (formData.get("companyName") as string) ?? undefined,
    companySite: (formData.get("companySite") as string) ?? "",
    posterFileId: (formData.get("posterFileId") as string) ?? null,
    posterPreview: (formData.get("posterPreview") as string) ?? null,
    userId,
    teamId,
    status: (formData.get("status") as string) ?? "open",
    complianceStatus: (formData.get("complianceStatus") as string) ?? "pending",
  };
  // JSON / array fields (may arrive as strings)
  const facilities = safeParseJSON<string[]>(formData.get("facilities"), []);
  const skills = safeParseJSON<string[]>(formData.get("skills"), []);
  const salary = safeParseJSON<Record<string, unknown>>(
    formData.get("salary"),
    {}
  );
  const questions = safeParseJSON<unknown[]>(formData.get("questions"), []);
  const selectionProcess = safeParseJSON<unknown[]>(
    formData.get("selectionProcess"),
    []
  );
  const selectedPlatforms = safeParseJSON<Record<string, unknown>>(
    formData.get("selectedPlatforms"),
    {}
  );

  const aiContent = safeParseJSON<Record<string, unknown>>(
    formData.get("aiContent"),
    {}
  );
  const payload: unknown = {
    ...body,
    facilities,
    salary,
    questions,
    selectionProcess,
    skills,
    selectedPlatforms,
    aiContent,
  };

  console.log(payload);
  // Validate & coerce with Zod (schedule -> Date, ids format, etc.)
  const parsed = CreateJobSchema.parse(payload);
  return { parsed, files: { posterFile } };
}
