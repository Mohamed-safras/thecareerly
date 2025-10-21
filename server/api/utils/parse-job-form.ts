import { isFile, toBuffer } from "@/lib/common/file";
import { safeParseJSON } from "@/lib/common/json";

import { CreateJobSchema } from "@/server/db/schema/validation/job";
import { FilePayload } from "@/types/file-payload";
import { ParsedJob } from "@/types/parse-job";

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

  const status = (formData.get("status") as string) || "DRAFT";
  // Scalars (keep loose; Zod will validate/transform)
  const body: Record<string, unknown> = {
    title: formData.get("title") as string,
    employmentType: formData.get("employmentType") as string,
    workPreference: formData.get("workPreference") as string,
    jobSeniority: formData.get("jobSeniority") as string,
    minimumQualificationLevel: formData.get(
      "minimumQualificationLevel"
    ) as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    // keep as string; Zod will coerce to Date
    scheduleDate: formData.get("scheduleDate") as string,
    organizationName: formData.get("organizationName") as string,
    // Handle empty string for organizationSite - convert to undefined for optional URL field
    organizationSite: formData.get("organizationSite") as string,
    posterFileId: (formData.get("posterFileId") as string) ?? null,
    posterPreview: (formData.get("posterPreview") as string) ?? null,
    userId,
    teamId,
    status,
    complianceStatus: (formData.get("complianceStatus") as string) ?? "PENDING",
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
