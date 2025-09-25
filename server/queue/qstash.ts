import { Client } from "@upstash/qstash";

export const qstash = new Client({
  baseUrl: process.env.QSTASH_URL!,
  token: process.env.QSTASH_TOKEN!,
});

export async function enqueueSocialQStash(
  job: {
    organizationId?: string;
    teamId: string;
    job: {
      id: string;
      title: string;
      description: string | null;
      company_name: string | null;
      company_site: string;
    };
    platforms: string[];
  },
  scheduleAt?: Date
) {
  const url = `${process.env.NEXT_APP_URL}/api/social/publish`;

  return await qstash.publishJSON({
    url,
    body: job,
    notBefore: scheduleAt ? Math.floor(scheduleAt.getTime() / 1000) : undefined,
    deduplicationId: `${job.job.id}-${job.organizationId}-${job.platforms
      .sort()
      .join("_")}`, // ✅ safe characters only
  });
}
