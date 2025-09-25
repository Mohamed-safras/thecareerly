import { prisma } from "@/lib/prisma";
import { open } from "@/lib/encryption/crypto";
import {
  PublishPayload,
  SocialResult,
  SocialPlatformKey,
  TokenBundle,
} from "@/types/social-media";
import { getAdapter } from "./registry";
import { enqueueSocialQStash } from "@/server/queue/qstash";
import { FilePayload } from "@/types/file-payload";
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
  organizationId: string;
  platforms: string[];
  scheduleAt?: Date;
  media?: FilePayload[];
};

export async function postToSocialIfSelected({
  job,
  teamId,
  organizationId,
  platforms,
  scheduleAt,
  media,
}: Args): Promise<SocialResult[]> {
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
    ...(media && media.length > 0 ? { media } : {}),
  };

  console.log(payload);

  const accounts = await prisma.socialAccount.findMany({
    where: { organizationId },
  });

  console.log(accounts);

  const supported = new Set<SocialPlatformKey>([
    "website",
    "linkedin",
    "facebook",
    "x",
  ]);

  const tasks = platforms.map(async (pRaw) => {
    console.log(pRaw);
    const key = pRaw.toLowerCase() as SocialPlatformKey;
    if (!supported.has(key)) {
      return { platform: key, ok: false, message: "Unsupported platform" };
    }

    const acct = accounts.find((a) => a.platform === key);
    if (key !== "website" && !acct) {
      return { platform: key, ok: false, message: "Not connected" };
    }

    console.log(acct);

    const tok: TokenBundle =
      key === "website"
        ? { accountId: "", access: "" }
        : {
            accountId: acct!.accountId,
            access: open(acct!.accessToken),
            refresh: acct!.refreshToken ? open(acct!.refreshToken) : undefined,
          };
    console.log(tok);
    try {
      const adapter = getAdapter(key);
      console.log(adapter);
      const result = await adapter.publish(payload, tok);

      if (result.ok && acct) {
        await prisma.socialPost.upsert({
          where: {
            jobId_accountId: {
              jobId: job.id,
              accountId: acct.id,
            },
          },
          update: { postId: result.externalId ?? "" },
          create: {
            jobId: job.id,
            accountId: acct.id,
            platform: acct.platform,
            postId: result.externalId ?? "",
            url: payload.url,
          },
        });
      }

      // If rate-limited, re-enqueue via QStash
      if (!result.ok && result.retryAfterSec) {
        await enqueueSocialQStash(
          { organizationId, teamId, job, platforms: [key] },
          new Date(Date.now() + result.retryAfterSec * 1000)
        );
      }

      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      return { platform: key, ok: false, message: msg };
    }
  });

  return Promise.all(tasks);
}
