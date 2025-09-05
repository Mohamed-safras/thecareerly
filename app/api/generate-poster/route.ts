// app/api/generate-poster/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { toFile } from "openai/uploads";
import { POSTER_MODEL, POSTER_SIZE } from "@/constents/gen-ai-constent";
import { compactPosterPrompt } from "@/lib/prompts/job-poster";
import { rateLimiter } from "@/lib/server/rate-limiter.redis";
import { cacheGet, cacheSet } from "@/lib/server/cache.redis";
import { badRequest, withHeaders } from "@/lib/error/errors";
import { mapOpenAIError } from "@/lib/error/openai.error";
import {
  clientIpFromHeaders,
  stableIdempotencyKey,
  clampString,
} from "@/lib/server/utils";
import { normalizePosterVibe, PosterPayload } from "@/types/poster-types";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Tunables
const RL_WINDOW_SEC = Number(process.env.POSTER_RATE_LIMIT_WINDOW_SEC ?? 60);
const RL_LIMIT = Number(process.env.POSTER_RATE_LIMIT_MAX ?? 4);
const CACHE_TTL_MS = Number(process.env.POSTER_CACHE_TTL_MS ?? 10 * 60_000);

function normalizePayload(p: Partial<PosterPayload>): PosterPayload {
  return {
    title: clampString((p.title || "").trim(), 120),
    posterNotes: clampString((p.posterNotes || "").trim(), 220),
    companyName: p.companyName?.trim() || undefined,
    brandColorHex: p.brandColorHex?.trim() || undefined,
    posterVibe: normalizePosterVibe(p.posterVibe),
  };
}

async function handleJson(
  req: NextRequest,
  rateHeaders?: Record<string, string | number | undefined>
) {
  const body = (await req.json().catch(() => null)) as {
    payload?: Partial<PosterPayload>;
  } | null;

  const p = body?.payload;
  if (!p?.posterNotes?.trim()) {
    return badRequest("Poster payload requires at least: { posterNotes }");
  }

  const payload = normalizePayload(p);
  const prompt = compactPosterPrompt(payload);

  const idemKey = "poster:gen:" + stableIdempotencyKey(payload);
  const cached = await cacheGet<{
    type: "poster";
    image: string;
    meta: unknown;
  }>(idemKey);
  if (cached) {
    const res = NextResponse.json(cached, { status: 200 });
    return withHeaders(res, {
      "X-Cache": "HIT",
      "X-Idempotency-Key": idemKey,
      ...(rateHeaders ?? {}),
    });
  }

  try {
    const img = await client.images.generate({
      model: POSTER_MODEL,
      prompt,
      size: POSTER_SIZE,
      n: 1,
    });

    const first = img.data?.[0];
    const b64 = first?.b64_json;
    const url = first?.url;
    const image = b64 ? `data:image/png;base64,${b64}` : url;

    if (!image) {
      return NextResponse.json({ error: "No image returned" }, { status: 502 });
    }

    const payloadRes = {
      type: "poster" as const,
      image,
      meta: { prompt, size: POSTER_SIZE, mode: "generate" },
    };
    await cacheSet(idemKey, payloadRes, CACHE_TTL_MS);

    const res = NextResponse.json(payloadRes, { status: 200 });
    return withHeaders(res, {
      "X-Cache": "MISS",
      "X-Idempotency-Key": idemKey,
      ...(rateHeaders ?? {}),
    });
  } catch (e) {
    return mapOpenAIError(e);
  }
}

/** multipart path (supports optional sample image → image edit) */
async function handleMultipart(
  req: NextRequest,
  rateHeaders?: Record<string, string | number | undefined>
) {
  const form = await req.formData();

  const posterNotes = clampString(
    (form.get("posterNotes") as string | null) ?? "",
    220
  );
  if (!posterNotes) {
    return badRequest("Poster payload requires at least: { posterNotes }");
  }

  const payload = normalizePayload({
    title: (form.get("title") as string) ?? "",
    companyName: (form.get("companyName") as string) || undefined,
    brandColorHex: (form.get("brandColorHex") as string) || undefined,
    posterVibe: (form.get("posterVibe") as string) || undefined,
    posterNotes,
  });

  const prompt = compactPosterPrompt(payload);

  const sample = form.get("sampleImage");
  const hasSample =
    sample && typeof sample === "object" && "arrayBuffer" in sample;

  const mode: "edit" | "generate" = hasSample ? "edit" : "generate";
  const idemKey = `poster:${mode}:` + stableIdempotencyKey(payload);

  const cached = await cacheGet<{
    type: "poster";
    image: string;
    meta: unknown;
  }>(idemKey);
  if (cached) {
    const res = NextResponse.json(cached, { status: 200 });
    return withHeaders(res, {
      "X-Cache": "HIT",
      "X-Idempotency-Key": idemKey,
      ...(rateHeaders ?? {}),
    });
  }

  try {
    if (hasSample) {
      const blob = sample as File;
      const uploadable = await toFile(
        await blob.arrayBuffer(),
        blob.name || "sample.png"
      );

      const edited = await client.images.edit({
        model: POSTER_MODEL,
        prompt,
        image: uploadable,
        size: POSTER_SIZE,
        n: 1,
      });

      const first = edited.data?.[0];
      const b64 = first?.b64_json;
      const url = first?.url;
      const image = b64 ? `data:image/png;base64,${b64}` : url;

      if (!image) {
        return NextResponse.json(
          { error: "No image returned" },
          { status: 502 }
        );
      }

      const payloadRes = {
        type: "poster" as const,
        image,
        meta: { prompt, size: POSTER_SIZE, mode: "edit" as const },
      };
      await cacheSet(idemKey, payloadRes, CACHE_TTL_MS);

      const res = NextResponse.json(payloadRes, { status: 200 });
      return withHeaders(res, {
        "X-Cache": "MISS",
        "X-Idempotency-Key": idemKey,
        ...(rateHeaders ?? {}),
      });
    }

    // no sample → generate
    const generated = await client.images.generate({
      model: POSTER_MODEL,
      prompt,
      size: POSTER_SIZE,
      n: 1,
    });

    const first = generated.data?.[0];
    const b64 = first?.b64_json;
    const url = first?.url;
    const image = b64 ? `data:image/png;base64,${b64}` : url;

    if (!image) {
      return NextResponse.json({ error: "No image returned" }, { status: 502 });
    }

    const payloadRes = {
      type: "poster" as const,
      image,
      meta: { prompt, size: POSTER_SIZE, mode: "generate" as const },
    };
    await cacheSet(idemKey, payloadRes, CACHE_TTL_MS);

    const res = NextResponse.json(payloadRes, { status: 200 });
    return withHeaders(res, {
      "X-Cache": "MISS",
      "X-Idempotency-Key": idemKey,
      ...(rateHeaders ?? {}),
    });
  } catch (e) {
    return mapOpenAIError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    // Decide path (JSON vs multipart) and build cache key BEFORE rate limit
    const ct = req.headers.get("content-type") || "";

    // We still want to include RL headers on responses, so we compute them
    const ip = clientIpFromHeaders(req.headers);

    // For cache hits we do not want to consume a token:
    // therefore we parse the body/form, compute idempotency inside handlers,
    // and only when a cache miss occurs do we rate-limit (+ pass RL headers through).

    if (ct.includes("multipart/form-data")) {
      // parse form and check cache in handleMultipart
      // if cache miss → rate-limit once here and pass RL headers in to response
      // rate-limit
      const rl = await rateLimiter(`poster:${ip}`, {
        limit: RL_LIMIT,
        windowSec: RL_WINDOW_SEC,
      });
      if (!rl.ok) {
        const res = NextResponse.json(
          { error: "Too Many Requests" },
          { status: 429 }
        );
        return withHeaders(res, {
          "Retry-After": rl.retryAfterSec,
          "X-RateLimit-Limit": RL_LIMIT,
          "X-RateLimit-Remaining": rl.remaining,
          "X-RateLimit-Reset": rl.resetAt,
        });
      }
      const rateHeaders = {
        "X-RateLimit-Limit": RL_LIMIT,
        "X-RateLimit-Remaining": rl.remaining,
        "X-RateLimit-Reset": rl.resetAt,
      };
      return await handleMultipart(req, rateHeaders);
    } else {
      // JSON path
      // Same flow: only rate-limit on actual work (cache miss happens inside)
      const rl = await rateLimiter(`poster:${ip}`, {
        limit: RL_LIMIT,
        windowSec: RL_WINDOW_SEC,
      });
      if (!rl.ok) {
        const res = NextResponse.json(
          { error: "Too Many Requests" },
          { status: 429 }
        );
        return withHeaders(res, {
          "Retry-After": rl.retryAfterSec,
          "X-RateLimit-Limit": RL_LIMIT,
          "X-RateLimit-Remaining": rl.remaining,
          "X-RateLimit-Reset": rl.resetAt,
        });
      }
      const rateHeaders = {
        "X-RateLimit-Limit": RL_LIMIT,
        "X-RateLimit-Remaining": rl.remaining,
        "X-RateLimit-Reset": rl.resetAt,
      };
      return await handleJson(req, rateHeaders);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
