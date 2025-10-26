import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
// Remove this import - we won't use toFile at all
// import { toFile } from "openai/uploads";
import sharp from "sharp";
import { POSTER_MODEL, POSTER_SIZE } from "@/constents/gen-ai-constent";
import { compactPosterPrompt } from "@/lib/prompts/job-poster";
import { cacheGet, cacheSet } from "@/lib/cache/cache.redis";
import { badRequest, withHeaders } from "@/lib/error/errors";
import { mapOpenAIError } from "@/lib/error/openai.error";

import { normalizePosterVibe } from "@/types/poster";
import { PosterPayload } from "@/types/job-form";
import { clampString } from "@/lib/utils";
import { stableIdempotencyKey } from "@/lib/common/json";
import { rateLimiter } from "@/lib/rate-limit/rate-limiter.redis";
import { clientIpFromHeaders } from "@/lib/http/client-ip";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RL_WINDOW_SEC = Number(process.env.POSTER_RATE_LIMIT_WINDOW_SEC ?? 60);
const RL_LIMIT = Number(process.env.POSTER_RATE_LIMIT_MAX ?? 4);
const CACHE_TTL_MS = Number(process.env.POSTER_CACHE_TTL_MS ?? 10 * 60_000);

const MAX_FILES = 3;

/** Parse "1024x1792" → { w: 1024, h: 1792 } */
function parseSize(size: string): { w: number; h: number } {
  const [w, h] = size.split("x").map((n) => parseInt(n, 10));
  return { w: Number.isFinite(w) ? w : 1024, h: Number.isFinite(h) ? h : 1024 };
}

/** Safely extract string from FormData entry (string or Blob) */
async function entryToString(
  entry: FormDataEntryValue | null
): Promise<string> {
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  if (entry && typeof entry === "object" && "arrayBuffer" in entry) {
    const buf = Buffer.from(await (entry as File).arrayBuffer());
    return buf.toString("utf8");
  }
  return "";
}

/** Force any uploaded image to PNG buffer (fixes octet-stream, odd extensions, etc.) */
async function normalizeToPng(file: File): Promise<Buffer> {
  const input = Buffer.from(await file.arrayBuffer());
  try {
    // sharp will throw if the buffer isn't an image it can decode
    return await sharp(input).png().toBuffer(); // normalized PNG
  } catch {
    throw new Error(
      `Unsupported image "${file.name || "upload"}" – cannot decode.`
    );
  }
}

/** Create a proper File object from buffer with correct MIME type */
function createPngFile(buffer: Buffer, filename: string): File {
  // Convert Buffer to Uint8Array for proper BlobPart compatibility
  const uint8Array = new Uint8Array(buffer);
  return new File([uint8Array], filename, {
    type: "image/png",
    lastModified: Date.now(),
  });
}

/** Compose up to 3 images into one horizontal strip PNG, resized to target width */
async function composeReferenceCanvas(
  files: File[],
  targetW: number
): Promise<Buffer> {
  const MAX_THUMB_H = 512;

  // Normalize to PNG first (so EXIF orientation etc. is handled consistently)
  const pngs: Buffer[] = [];
  for (const f of files) {
    pngs.push(await normalizeToPng(f));
  }

  const metas = await Promise.all(pngs.map((b) => sharp(b).metadata()));

  const thumbs: Buffer[] = [];
  for (let i = 0; i < pngs.length; i++) {
    const m = metas[i];
    const h = m.height ?? MAX_THUMB_H;
    const scale = Math.min(1, MAX_THUMB_H / h);
    const thumb = await sharp(pngs[i])
      .resize({ height: Math.round(h * scale) })
      .png()
      .toBuffer();
    thumbs.push(thumb);
  }

  const tMetas = await Promise.all(thumbs.map((b) => sharp(b).metadata()));
  const stripH = Math.max(
    ...tMetas.map((m) => m.height || MAX_THUMB_H),
    MAX_THUMB_H
  );
  const stripW = tMetas.reduce((acc, m) => acc + (m.width || MAX_THUMB_H), 0);

  let x = 0;
  const overlays = thumbs.map((input, i) => {
    const m = tMetas[i];
    const left = x;
    x += m.width || 0;
    return { input, left, top: 0 } as sharp.OverlayOptions;
  });

  const strip = await sharp({
    create: {
      width: stripW,
      height: stripH,
      channels: 3,
      background: { r: 245, g: 245, b: 245 },
    },
  })
    .composite(overlays)
    .png()
    .toBuffer();

  return await sharp(strip).resize({ width: targetW }).png().toBuffer();
}

function normalizePayload(p: Partial<PosterPayload>): PosterPayload {
  return {
    title: clampString((p.title || "").trim(), 120),
    posterNotes: clampString((p.posterNotes || "").trim(), 220),
    companyName: p.companyName?.trim() || undefined,
    brandColorHex: p.brandColorHex?.trim() || undefined,
    posterVibe: normalizePosterVibe(p.posterVibe),
  };
}

/** JSON path (no images) */
async function handleJson(
  req: NextRequest,
  rateHeaders?: Record<string, string | number | undefined>
) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    return badRequest(
      `Expected Content-Type: application/json (got: ${ct || "none"})`
    );
  }

  const raw = await req.text();
  let body: { payload?: Partial<PosterPayload> } | null = null;
  try {
    body = raw
      ? (JSON.parse(raw) as { payload?: Partial<PosterPayload> })
      : null;
  } catch {
    const preview = raw.length > 200 ? raw.slice(0, 200) + "…" : raw;
    return badRequest(`Invalid JSON body. Preview: ${preview || "<empty>"}`);
  }

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
    if (!image)
      return NextResponse.json({ error: "No image returned" }, { status: 502 });

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

/** multipart path (accepts 0–3 files as `sampleImages`, or legacy `sampleImage`) */
async function handleMultipart(
  req: NextRequest,
  rateHeaders?: Record<string, string | number | undefined>
) {
  let form: FormData;
  try {
    form = await req.formData(); // read once
  } catch {
    return badRequest("Failed to parse multipart form data");
  }

  // posterNotes may be string or Blob
  const posterNotesRaw = await entryToString(form.get("posterNotes"));
  const posterNotes = clampString((posterNotesRaw || "").trim(), 220);
  if (!posterNotes) {
    return badRequest("Poster payload requires at least: { posterNotes }");
  }

  const title = clampString(
    (await entryToString(form.get("title"))).trim(),
    120
  );
  const companyName =
    (await entryToString(form.get("companyName"))).trim() || undefined;
  const brandColorHex =
    (await entryToString(form.get("brandColorHex"))).trim() || undefined;
  const posterVibe = (await entryToString(form.get("posterVibe"))) || undefined;

  const payload = normalizePayload({
    title,
    posterNotes,
    companyName,
    brandColorHex,
    posterVibe,
  });

  const prompt = compactPosterPrompt(payload);
  const { w: outW } = parseSize(POSTER_SIZE);

  // Collect up to 3 files from "sampleImages" and legacy "sampleImage"
  const collected: File[] = [];
  for (const entry of form.getAll("sampleImages")) {
    if (entry && typeof entry === "object" && "arrayBuffer" in entry) {
      collected.push(entry as File);
    }
  }
  const legacy = form.get("sampleImage");
  if (legacy && typeof legacy === "object" && "arrayBuffer" in legacy) {
    collected.push(legacy as File);
  }
  const files = collected.slice(0, MAX_FILES);

  // 0 images → generate
  if (files.length === 0) {
    try {
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
      if (!image)
        return NextResponse.json(
          { error: "No image returned" },
          { status: 502 }
        );

      const payloadRes = {
        type: "poster" as const,
        image,
        meta: { prompt, size: POSTER_SIZE, mode: "generate" as const },
      };
      const res = NextResponse.json(payloadRes, { status: 200 });
      return withHeaders(res, { "X-Cache": "MISS", ...(rateHeaders ?? {}) });
    } catch (e) {
      return mapOpenAIError(e);
    }
  }

  // 1 image → normalize to PNG, then edit
  if (files.length === 1) {
    try {
      console.log(
        `Processing single file: ${files[0].name}, type: ${files[0].type}, size: ${files[0].size}`
      );

      const pngBuffer = await normalizeToPng(files[0]); // <— the critical fix
      console.log(`Normalized to PNG buffer: ${pngBuffer.length} bytes`);

      // FIXED: Use File constructor instead of toFile
      const uploadableFile = createPngFile(pngBuffer, "sample.png");
      console.log(
        `Created File object: ${uploadableFile.name}, type: ${uploadableFile.type}, size: ${uploadableFile.size}`
      );

      const edited = await client.images.edit({
        model: POSTER_MODEL,
        prompt,
        image: uploadableFile, // Use File object directly
        size: POSTER_SIZE,
        n: 1,
      });

      const first = edited.data?.[0];
      const b64 = first?.b64_json;
      const url = first?.url;
      const image = b64 ? `data:image/png;base64,${b64}` : url;
      if (!image)
        return NextResponse.json(
          { error: "No image returned" },
          { status: 502 }
        );

      const payloadRes = {
        type: "poster" as const,
        image,
        meta: { prompt, size: POSTER_SIZE, mode: "edit_compose" as const },
      };
      const res = NextResponse.json(payloadRes, { status: 200 });
      return withHeaders(res, { "X-Cache": "MISS", ...(rateHeaders ?? {}) });
    } catch (e) {
      // If sharp couldn't decode (e.g., HEIC without support), return 415
      if (e instanceof Error && /Unsupported image/.test(e.message)) {
        return NextResponse.json({ error: e.message }, { status: 415 });
      }
      return mapOpenAIError(e);
    }
  }

  // 2–3 images → compose then single edit
  try {
    console.log(`Processing ${files.length} files for composition`);

    const composite = await composeReferenceCanvas(files, outW); // already PNG
    console.log(`Created composite buffer: ${composite.length} bytes`);

    // FIXED: Use File constructor instead of toFile
    const uploadableFile = createPngFile(composite, "references.png");
    console.log(
      `Created composite File object: ${uploadableFile.name}, type: ${uploadableFile.type}, size: ${uploadableFile.size}`
    );

    const edited = await client.images.edit({
      model: POSTER_MODEL,
      prompt:
        `${prompt}\n\n` +
        `Use ALL reference thumbnails on the canvas to synthesize ONE cohesive poster. ` +
        `Do not include the reference strip in the final look; produce a clean, unified poster.`,
      image: uploadableFile, // Use File object directly
      size: POSTER_SIZE,
      n: 1,
    });

    const first = edited.data?.[0];
    const b64 = first?.b64_json;
    const url = first?.url;
    const image = b64 ? `data:image/png;base64,${b64}` : url;
    if (!image)
      return NextResponse.json({ error: "No image returned" }, { status: 502 });

    const payloadRes = {
      type: "poster" as const,
      image,
      meta: { prompt, size: POSTER_SIZE, mode: "edit_compose" as const },
    };
    const res = NextResponse.json(payloadRes, { status: 200 });
    return withHeaders(res, { "X-Cache": "MISS", ...(rateHeaders ?? {}) });
  } catch (e) {
    if (e instanceof Error && /Unsupported image/.test(e.message)) {
      return NextResponse.json({ error: e.message }, { status: 415 });
    }
    return mapOpenAIError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = clientIpFromHeaders(req.headers);
    const ct = req.headers.get("content-type") || "";

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

    if (ct.includes("multipart/form-data")) {
      return await handleMultipart(req, rateHeaders);
    }
    return await handleJson(req, rateHeaders);
  } catch (err: unknown) {
    console.error("API Error:", err);
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
