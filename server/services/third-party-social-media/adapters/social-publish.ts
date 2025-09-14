import {
  SocialResult,
  PublishPayload,
  SocialPlatformKey,
} from "@/types/social-media";
import { FilePayload } from "@/types/file-payload";
import { getAdapter } from "./registry";
import { BadRequestError } from "@/lib/error/http-error";

type Args = {
  job: {
    id: string;
    title: string;
    description: string | null;
    company_name: string | null;
    company_site: string;
  };
  teamId: string;
  platforms: string[];
  scheduleAt?: Date | undefined;
  media?: FilePayload[]; // optional media files (logo/poster buffers)
};

export async function postToSocialIfSelected({
  job,
  teamId,
  platforms,
  scheduleAt,
  media,
}: Args): Promise<SocialResult[]> {
  if (!Array.isArray(platforms) || platforms.length === 0) return [];

  if (!job.id || !job.title || !job.company_site) {
    throw new BadRequestError("Missing required job fields");
  }

  const payload: PublishPayload = {
    title: job.title,
    text: job.description ?? "",
    url: `${job.company_site}/jobs/${job.id}`,
    company: job.company_name ?? "",
    teamId,
    ...(scheduleAt && { scheduleAt: scheduleAt.toISOString() }),
    ...(media && { media }),
  };

  const supported = new Set<SocialPlatformKey>([
    "website",
    "linkedin",
    "x",
    "facebook",
  ]);

  const tasks = platforms?.map(async (pRaw) => {
    const key = pRaw.toLowerCase() as SocialPlatformKey;

    if (!supported.has(key)) {
      return {
        platform: key,
        ok: false,
        message: "Platform not integrated",
      } as SocialResult;
    }

    try {
      const adapter = getAdapter(key);
      return await adapter.publish(payload);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      return { platform: key, ok: false, message: msg } as SocialResult;
    }
  });

  return Promise.all(tasks);
}
