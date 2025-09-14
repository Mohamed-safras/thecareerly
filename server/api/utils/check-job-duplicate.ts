import { prisma } from "@/lib/prisma";

/**
 * Checks for an EXACT duplicate across selected scalar & list fields.
 * For list equality we use equals[] (order-sensitive).
 * If you want order-insensitive, normalize arrays before save & compare.
 */
export async function findExactDuplicateJob(args: {
  title: string;
  teamId: string;
  userId: string;
  employmentType?: string;
  workPreference?: string;
  jobSeniority?: string;
  description?: string;
  location?: string;
  status: "open" | "hold" | "closed" | "draft";
  complianceStatus: "pending" | "approved" | "flagged";
  schedule?: Date;
  companyName?: string;
  skills: string[];
  facilities: string[];
}) {
  const existing = await prisma.job.findFirst({
    where: {
      title: args.title,
      team_id: args.teamId,
      user_id: args.userId,
      employment_type: args.employmentType,
      work_preference: args.workPreference,
      job_seniority: args.jobSeniority,
      description: args.description,
      location: args.location,
      status: args.status,
      compliance_status: args.complianceStatus,
      schedule: args.schedule,
      company_name: args.companyName,
      skills: { equals: args.skills },
      facilities: { equals: args.facilities },
    },
    select: { id: true },
  });

  return existing; // { id } | null
}
