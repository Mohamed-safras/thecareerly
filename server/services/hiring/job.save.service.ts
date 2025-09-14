// server/services/job.service.ts
import { prisma } from "@/lib/prisma";
import { CreateJobInput } from "@/server/db/schema/validation/job";
import { NotFoundError, BadRequestError } from "@/lib/error/http-error";
import { putToS3 } from "@/lib/aws/s3";
import { FilePayload } from "@/types/file-payload";

export async function saveJob(
  input: CreateJobInput, // Zod already coerced schedule -> Date | undefined
  files?: { logoFile?: FilePayload; posterFile?: FilePayload }
) {
  // ---- verify related records exist BEFORE connect ----
  const [userExists, teamExists] = await Promise.all([
    prisma.user.findUnique({
      where: { id: input.userId },
      select: { id: true },
    }),
    prisma.team.findUnique({
      where: { id: input.teamId },
      select: { id: true },
    }),
  ]);

  if (!userExists) throw new NotFoundError("User not found for given userId.");
  if (!teamExists) throw new NotFoundError("Team not found for given teamId.");

  // ---- S3 uploads (optional) ----
  if (!process.env.S3_BUCKET) {
    throw new BadRequestError(
      "S3 bucket not configured (S3_BUCKET is missing)."
    );
  }
  const bucket = process.env.S3_BUCKET;

  let logoFileId = input.logoFileId ?? undefined;
  let posterFileId = input.posterFileId ?? undefined;

  if (files?.logoFile) {
    const result = await putToS3({
      bucket,
      keyPrefix: `teams/${input.teamId}/logos`,
      contentType: files.logoFile.contentType,
      body: files.logoFile.buffer,
    });
    if (!result.success) {
      throw new BadRequestError(
        `Failed to upload logo: ${result.error ?? "Unknown error"}`
      );
    }
    logoFileId = result.key;
  }

  if (files?.posterFile) {
    const result = await putToS3({
      bucket,
      keyPrefix: `teams/${input.teamId}/posters`,
      contentType: files.posterFile.contentType,
      body: files.posterFile.buffer,
    });
    if (!result.success) {
      throw new BadRequestError(
        `Failed to upload poster: ${result.error ?? "Unknown error"}`
      );
    }
    posterFileId = result.key;
  }

  // ---- Create Job ----
  const job = await prisma.job.create({
    data: {
      title: input.title,
      employment_type: input.employmentType,
      work_preference: input.workPreference,
      job_seniority: input.jobSeniority,
      minimum_qualification_lvl: input.minimumQualificationLevel,

      facilities: input.facilities,
      description: input.description,
      location: input.location,
      skills: input.skills,

      salary: {
        min: input.salary.min,
        max: input.salary.max,
        currency: input.salary.currency,
        payPeriod: input.salary.payPeriod,
      },

      schedule: input.schedule, // Date | undefined (already coerced by Zod)

      platforms: input.platforms,

      // S3 object keys (final)
      logo_file_id: logoFileId,
      logo_preview: input.logoPreview ?? undefined,

      poster_file_id: posterFileId,
      poster_preview: input.posterPreview ?? undefined,

      company_name: input.companyName,
      company_site: input.companySite,

      questions: input.questions.map((question) => ({
        prompt: question.prompt,
        required: question.required,
        kind: question.kind,
        options: question.options,
      })),

      selection_process: input.selectionProcess.map((process) => ({
        order: process.order,
        title: process.title,
        description: process.description,
      })),

      // relations (safe because we checked existence)
      created_by: { connect: { id: input.userId } },
      team: { connect: { id: input.teamId } },

      status: input.status,
      compliance_status: input.complianceStatus,
      ai_content: input.ai_content,
      social_media_posts: input.social_media_posts,
    },
  });

  return job;
}
