import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Hard limits to reduce spend
const JD_MODEL = "gpt-4o-mini";
const JD_MAX_TOKENS = 350; // concise JD
const JD_TEMP = 0.4;

const POSTER_MODEL = "gpt-image-1";
const POSTER_SIZE = "768x768" as
  | "512x512"
  | "1024x1024"
  | "auto"
  | "1536x1024"
  | "1024x1536"
  | "256x256"
  | "1792x1024"
  | "1024x1792"
  | null
  | "512x512";

type JDInput = {
  title: string;
  description?: string; // 1–3 lines max (optional)
};

type PosterInput = {
  jobTitle: string;
  brandColorHex?: string; // e.g. "#00A8E8"
  companyName?: string;
  mustUseLogo?: boolean; // if your UI will overlay logo itself, set false
  vibe?: "professional" | "modern" | "minimal" | "vibrant";
  notes?: string; // e.g., "white title text, subtle shapes"
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = String(body?.mode || "").toLowerCase();

    if (mode !== "jd" && mode !== "poster") {
      // Reject anything unnecessary to cut costs
      return NextResponse.json(
        { error: "This assistant only supports: mode='jd' or mode='poster'." },
        { status: 400 }
      );
    }

    if (mode === "jd") {
      const data = body?.payload as JDInput | undefined;
      if (!data || !data.title) {
        return NextResponse.json(
          { error: "JD payload requires at least: { title }" },
          { status: 400 }
        );
      }

      // Build a compact prompt (tiny system + minimal user)
      const system =
        "You write concise job descriptions. Keep output short, skimmable, and ATS-friendly. Use bullet points. Avoid fluff.";
      const user = compactJDUserPrompt(data);

      const resp = await client.chat.completions.create({
        model: JD_MODEL,
        max_tokens: JD_MAX_TOKENS,
        temperature: JD_TEMP,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      });

      const text = resp.choices[0]?.message?.content?.trim() || "No response";
      return NextResponse.json({ type: "jd", text });
    }

    if (mode === "poster") {
      const data = body?.payload as PosterInput | undefined;
      if (!data || !data.jobTitle) {
        return NextResponse.json(
          { error: "Poster payload requires at least: { jobTitle }" },
          { status: 400 }
        );
      }

      // **Only** create an image for relevant job posters (no general images)
      const prompt = compactPosterPrompt(data);

      const img = await client.images.generate({
        model: POSTER_MODEL,
        prompt,
        size: POSTER_SIZE,
        n: 1, // exactly one image
      });

      const first = img.data?.[0];
      const b64 = first?.b64_json;
      const url = first?.url;
      const image = b64 ? `data:image/png;base64,${b64}` : url;

      if (!image) {
        return NextResponse.json(
          { error: "No image returned" },
          { status: 502 }
        );
      }
      return NextResponse.json({
        type: "poster",
        image,
        meta: { prompt, size: POSTER_SIZE },
      });
    }

    // Should not reach
    return NextResponse.json({ error: "Unsupported" }, { status: 400 });
  } catch (err: unknown) {
    console.error("[/api/assist] error:", err);
    return NextResponse.json(
      { error: (err as Error)?.message || "Server error" },
      { status: 500 }
    );
  }
}

function compactJDUserPrompt(d: JDInput) {
  // Keep everything crisp; no long context → fewer tokens
  // If a field is missing, omit it (no filler)
  return [
    `Write a concise JD for: ${d.title}`,
    d.description ? `Summary: ${oneLine(d.description)}` : "",
    "Format:",
    "* About the role (2–3 lines)",
    "* Key Responsibilities (4–6 bullets)",
    "* Required Qualifications (5–8 bullets)",
    "* Nice to Have (optional, 3–5 bullets)",
    "* How to Apply (1 line)",
  ]
    .filter(Boolean)
    .join("\n");
}

function compactPosterPrompt(p: PosterInput) {
  // A compact, high-signal image prompt—not verbose—to save tokens
  // NOTE: purely text → no extra tokens from long descriptions
  const lines = [
    `Hiring poster for "${p.jobTitle}".`,
    p.companyName ? `Company: ${p.companyName}.` : "",
    p.vibe ? `Style: ${p.vibe}.` : "Style: professional, clean.",
    p.brandColorHex ? `Primary color: ${p.brandColorHex}.` : "",
    "White title text, subtle geometric shapes.",
    "Centered layout, balanced whitespace.",
    "Include 'Apply Now' button.",
    "No photo-realistic people; use abstract/clean illustration vibe.",
    p.notes ? oneLine(p.notes) : "",
  ]
    .filter(Boolean)
    .join(" ");

  return lines;
}

function oneLine(s?: string) {
  if (!s) return "";
  return s.replace(/\s+/g, " ").trim();
}
