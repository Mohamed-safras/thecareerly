import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { postToSocialIfSelected } from "@/server/services/social/social-publish";

async function handler(req: Request) {
  const payload = await req.json();
  const { organizationId, teamId, job, platforms } = payload;

  const results = await postToSocialIfSelected({
    organizationId,
    teamId,
    job,
    platforms,
  });

  return NextResponse.json(results);
}

// ✅ Secure this route so only QStash can trigger it
export const POST = verifySignatureAppRouter(handler);
