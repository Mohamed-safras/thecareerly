import { NextRequest } from "next/server";
import { isFile, toBuffer } from "@/lib/utils/file";
import { safeParseJSON } from "@/lib/utils/json";
import { isObjectId } from "@/lib/utils/validate";
import { BadRequestError } from "@/lib/error/http-error";
import { CreateJobSchema } from "@/server/db/schema/validation/job";
import { FilePayload } from "@/types/file-payload";
import { ParsedJob } from "@/types/parse-job";

export async function parseJobForm(req: NextRequest): Promise<ParsedJob> {
  const form = await req.formData();

  // Files (optional)
  const logoEntry = form.get("logo");
  const posterEntry = form.get("poster");

  let logoFile: FilePayload | undefined;
  let posterFile: FilePayload | undefined;

  if (isFile(logoEntry)) {
    const buffer = await toBuffer(logoEntry);
    logoFile = {
      buffer,
      contentType: logoEntry.type || "application/octet-stream",
      preview: (form.get("logoPreview") as string) || undefined,
    };
  }

  if (isFile(posterEntry)) {
    const buffer = await toBuffer(posterEntry);
    posterFile = {
      buffer,
      contentType: posterEntry.type || "application/octet-stream",
      preview: (form.get("posterPreview") as string) || undefined,
    };
  }

  // Required IDs
  const userIdRaw = (form.get("userId") as string) || "";
  const teamIdRaw = (form.get("teamId") as string) || "";

  if (!isObjectId(userIdRaw) || !isObjectId(teamIdRaw)) {
    throw new BadRequestError("Invalid userId or teamId format");
  }

  // Scalars (keep loose; Zod will validate/transform)
  const body: Record<string, unknown> = {
    title: (form.get("title") as string) || "",
    employmentType: (form.get("employmentType") as string) || undefined,
    workPreference: (form.get("workPreference") as string) || undefined,
    jobSeniority: (form.get("jobSeniority") as string) || undefined,
    minimumQualificationLevel:
      (form.get("minimumQualificationLevel") as string) || undefined,
    description: (form.get("description") as string) || undefined,
    location: (form.get("location") as string) || undefined,

    // keep as string; Zod will coerce to Date
    schedule: (form.get("schedule") as string) || undefined,

    companyName: (form.get("companyName") as string) || undefined,
    companySite: (form.get("companySite") as string) || "",

    logoFileId: (form.get("logoFileId") as string) || null,
    logoPreview: (form.get("logoPreview") as string) || null,
    posterFileId: (form.get("posterFileId") as string) || null,
    posterPreview: (form.get("posterPreview") as string) || null,

    userId: userIdRaw,
    teamId: teamIdRaw,
    status: (form.get("status") as string) || "open",
    complianceStatus: (form.get("complianceStatus") as string) || "pending",
  };

  // JSON / array fields (may arrive as strings)
  const facilities = safeParseJSON<string[]>(form.get("facilities"), []);
  const platforms = safeParseJSON<string[]>(form.get("platforms"), []);
  const skills = safeParseJSON<string[]>(form.get("skills"), []);
  const salary = safeParseJSON<Record<string, unknown>>(form.get("salary"), {});
  const questions = safeParseJSON<unknown[]>(form.get("questions"), []);
  const selectionProcess = safeParseJSON<unknown[]>(
    form.get("selectionProcess"),
    []
  );
  const socialMediaPost = safeParseJSON<Record<string, unknown>>(
    form.get("socialMediaPosts"),
    {}
  );
  const aiContent = safeParseJSON<Record<string, unknown>>(
    form.get("aiContent"),
    {}
  );

  const payload: unknown = {
    ...body,
    facilities,
    platforms,
    salary,
    questions,
    selectionProcess,
    skills,
    socialMediaPost,
    aiContent,
  };

  // Validate & coerce with Zod (schedule -> Date, ids format, etc.)
  const parsed = CreateJobSchema.parse(payload);

  return { parsed, files: { logoFile, posterFile } };
}
