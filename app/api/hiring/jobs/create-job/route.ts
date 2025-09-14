// app/api/jobs/route.ts
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
import { postToSocialIfSelected } from "@/server/services/third-party-social-media/adapters/social-publish";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // 0) Require authenticated session & resolve app user
    const authUser = await requireUser();

    // Read action before parsing (so we can branch messages later)
    const form = await req.formData();
    const action = ((form.get("action") as string) || "draft").toLowerCase() as
      | "draft"
      | "publish";

    // 1) Parse + validate multipart form (files + json fields, schedule -> Date)
    //    parseJobForm also validates userId/teamId ObjectIds

    const { parsed, files } = await parseJobForm(req);

    // 2) Enforce team permission (Admin or HR)

    await requireTeamRole(parsed.teamId, authUser.id, [
      TeamRole.Admin,
      TeamRole.HR,
    ]);

    // 3) Optional — exact duplicate block across selected fields (including list equality)
    const duplicate = await findExactDuplicateJob({
      title: parsed.title,
      teamId: parsed.teamId,
      userId: parsed.userId,
      employmentType: parsed.employmentType,
      workPreference: parsed.workPreference,
      jobSeniority: parsed.jobSeniority,
      description: parsed.description,
      location: parsed.location,
      status: parsed.status,
      complianceStatus: parsed.complianceStatus,
      schedule: parsed.schedule,
      companyName: parsed.companyName,
      skills: parsed.skills,
      facilities: parsed.facilities,
    });

    if (duplicate) {
      throw new ConflictError(
        "An identical job already exists in the current team."
      );
    }

    // 4) Save to your own site: draft or publish (open)

    const toSave = {
      ...parsed,
      status:
        action === "publish"
          ? JobStatus.open // ✅ publishing sets status=Open
          : JobStatus.draft, // ✅ saving sets status=Draft,
    };

    const job = await saveJob(toSave, files);

    // 5) If publishing AND platforms selected, call external social platforms

    if (
      action === "publish" &&
      Array.isArray(parsed.platforms) &&
      parsed.platforms?.length
    ) {
      const result = await postToSocialIfSelected({
        job: {
          id: job.id,
          title: job.title,
          description: job.description,
          company_name: job.company_name,
          company_site: job.company_site,
        },
        teamId: parsed.teamId,
        platforms: parsed.platforms,
        scheduleAt: parsed.schedule,
      });

      return successResponse(201, "Job published; social calls attempted", {
        job,
        socialResults: result,
      });
    }

    // 6) Unified success response
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

    if (
      typeof err === "object" &&
      err &&
      "code" in err &&
      (err as { code: string }).code === "P2002"
    ) {
      return errorResponse(
        409,
        "A job with this title already exists in the team."
      );
    }
    // Typed HttpError from service/route
    if (err instanceof HttpError) {
      return errorResponse(err.status, err.message, err.details);
    }
    // Fallback
    const msg = err instanceof Error ? err.message : "Unknown error";
    return errorResponse(500, msg);
  }
}
