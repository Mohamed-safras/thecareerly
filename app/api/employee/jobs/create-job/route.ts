import { NextRequest } from "next/server";
import { saveJob } from "@/server/services/hiring/job.save.service";
import { errorResponse } from "@/server/response/api-error-response";
import { ConflictError, HttpError } from "@/lib/error/http-error";
import { successResponse } from "@/server/response/success-response";
import { parseJobForm } from "@/server/api/utils/parse-job-form";
import { findExactDuplicateJob } from "@/server/api/utils/check-job-duplicate";
import { requireTeamRole, requireUser } from "@/server/auth/require-auth";
import { TeamRole } from "@/types/roles";
import { JobStatus } from "@/types/job-status";
import { prisma } from "@/lib/prisma";
import { enqueueSocialQStash } from "@/server/queue/qstash"; // 👈 use QStash

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const authUser = await requireUser();

    const teamUser = await prisma.teamUser.findFirst({
      where: { user_id: authUser.id },
      select: { id: true, team_id: true, team: true },
    });

    const formData = await req.formData();
    const action = formData.get("postingType");

    const { parsed, files } = await parseJobForm(
      formData,
      authUser.id,
      teamUser?.team_id
    );

    await requireTeamRole(parsed?.teamId, authUser.id, [
      TeamRole.Admin,
      TeamRole.HR,
    ]);

    const duplicate = await findExactDuplicateJob({
      title: parsed.title,
      teamId: parsed?.teamId,
      userId: parsed.userId,
      employmentType: parsed.employmentType,
      workPreference: parsed.workPreference,
      jobSeniority: parsed.jobSeniority,
      description: parsed.description,
      location: parsed.location,
      status: parsed.status,
      complianceStatus: parsed.complianceStatus,
      companyName: parsed.companyName,
      skills: parsed.skills,
      scheduleDate: parsed.scheduleDate,
      facilities: parsed.facilities,
    });

    if (duplicate) {
      throw new ConflictError(
        "An identical job already exists in the current team."
      );
    }

    const toSave = {
      ...parsed,
      status: action === "publish" ? JobStatus.open : JobStatus.draft,
    };

    const job = await saveJob(toSave, files);

    // 👉 Social media queue via QStash
    if (
      action === "publish" &&
      Array.isArray(parsed.selectedPlatforms) &&
      parsed.selectedPlatforms?.length
    ) {
      await enqueueSocialQStash(
        {
          organizationId: teamUser?.team.organizationId, // 👈 pass orgId
          teamId: parsed.teamId,
          job: {
            id: job.id,
            title: job.title,
            description: job.description,
            company_name: job.company_name,
            company_site: job.company_site,
          },
          platforms: parsed.selectedPlatforms,
        },
        parsed.scheduleDate ?? undefined // scheduleAt optional
      );

      return successResponse(201, "Job published; social task enqueued", {
        job,
      });
    }

    return successResponse(
      201,
      action === "publish" ? "Job published" : "Draft saved",
      job
    );
  } catch (err) {
    if (typeof err === "object" && err && "issues" in err) {
      const issues = (err as { issues: unknown }).issues;
      return errorResponse(422, "Validation failed", issues);
    }

    if (err instanceof HttpError) {
      return errorResponse(err.status, err.message, err.details);
    }

    const msg = err instanceof Error ? err.message : "Unknown error";
    return errorResponse(500, msg);
  }
}
