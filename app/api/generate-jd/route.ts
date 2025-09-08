import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { JD_MODEL, JD_MAX_TOKENS, JD_TEMP } from "@/constents/gen-ai-constent";
import {
  buildJobDescriptionUserPrompt,
  setSystemPromptJobDescriptionBuilder,
} from "@/lib/prompts/job-description";
import { AIPromptInput } from "@/types/gen-AI";
import { rateLimiter } from "@/lib/server/rate-limiter.redis";
import { cacheGet, cacheSet } from "@/lib/server/cache.redis";
import { badRequest, withHeaders } from "@/lib/error/errors";
import { mapOpenAIError } from "@/lib/error/openai.error";
import {
  clampString,
  clientIpFromHeaders,
  stableIdempotencyKey,
} from "@/lib/server/utils";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RL_WINDOW_SEC = Number(process.env.JD_RATE_LIMIT_WINDOW_SEC ?? 60);
const RL_LIMIT = Number(process.env.JD_RATE_LIMIT_MAX ?? 6);
const CACHE_TTL_MS = Number(process.env.JD_CACHE_TTL_MS ?? 5 * 60_000);

export async function POST(req: NextRequest) {
  try {
    // Parse and validate input first
    const body = (await req.json().catch(() => null)) as {
      payload?: AIPromptInput;
    } | null;

    if (!body?.payload || !body.payload.title?.trim()) {
      return badRequest("JD payload requires at least: { title }");
    }

    const normalized: AIPromptInput = {
      ...body.payload,
      title: clampString(body.payload.title.trim(), 120),
    };

    const idemKey = `jd:${stableIdempotencyKey(normalized)}`;

    // ✅ 1) Cache first: cache hits do NOT consume rate limit
    const cached = await cacheGet<{ type: "jd"; text: string }>(idemKey);
    if (cached) {
      const res = NextResponse.json(cached, { status: 200 });
      return withHeaders(res, {
        "X-Cache": "HIT",
        "X-Idempotency-Key": idemKey,
      });
    }

    // ✅ 2) Only rate-limit when actual work is needed
    const ip = clientIpFromHeaders(req.headers);
    const rateLimit = await rateLimiter(`jd:${ip}`, {
      limit: RL_LIMIT,
      windowSec: RL_WINDOW_SEC,
    });

    if (!rateLimit.ok) {
      const res = NextResponse.json(
        { error: "Too Many Requests" },
        { status: 429 }
      );
      return withHeaders(res, {
        "Retry-After": rateLimit.retryAfterSec,
        "X-RateLimit-Limit": RL_LIMIT,
        "X-RateLimit-Remaining": rateLimit.remaining,
        "X-RateLimit-Reset": rateLimit.resetAt,
      });
    }

    // Build prompt and call OpenAI
    const userPrompt = buildJobDescriptionUserPrompt(normalized);

    console.log("JD prompt:", userPrompt);

    try {
      const resp = await client.chat.completions.create({
        model: JD_MODEL,
        max_tokens: Math.min(JD_MAX_TOKENS, 1024),
        temperature: JD_TEMP,
        messages: [
          { role: "system", content: setSystemPromptJobDescriptionBuilder() },
          { role: "user", content: userPrompt },
        ],
      });

      const text = resp.choices[0]?.message?.content?.trim() ?? "";
      const payload = { type: "jd" as const, text };

      await cacheSet(idemKey, payload, CACHE_TTL_MS);

      const res = NextResponse.json(payload, { status: 200 });
      return withHeaders(res, {
        "X-Cache": "MISS",
        "X-Idempotency-Key": idemKey,
        "X-RateLimit-Limit": RL_LIMIT,
        "X-RateLimit-Remaining": rateLimit.remaining,
        "X-RateLimit-Reset": rateLimit.resetAt,
      });
    } catch (e) {
      return mapOpenAIError(e);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
