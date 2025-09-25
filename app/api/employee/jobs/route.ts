import { requireTeamRole, requireUser } from "@/server/auth/require-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse } from "@/server/response/success-response";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const authUser = await requireUser();

  const teamUser = await prisma.teamUser.findFirst({
    where: { user_id: authUser.id },
    select: { id: true, team_id: true, team: true, role: true },
  });

  console.log(teamUser?.team_id);

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  //   const organizationId = session.user.organizationId;
  const teamId = teamUser?.team_id;

  const jobs = await prisma.job.findMany({
    where: {
      team_id: teamId,
      user_id: authUser.id,
    },
    select: {
      id: true,
      title: true,
      status: true,
      work_preference: true,
      employment_type: true,
      location: true,
    },
    orderBy: { created_at: "desc" },
    skip,
    take: limit,
  });

  const total = await prisma.job.count({
    where: { team_id: teamId, user_id: authUser.id },
  });

  return successResponse(200, "", {
    jobs,
    hasMore: skip + jobs.length < total,
  });
}
