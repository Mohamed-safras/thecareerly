// prompts/jd.ts
import type { AIPromptInput } from "@/types/gen-AI";
import { oneLine } from "../utils";

function parseFacilities(facilities?: string[] | string): string[] {
  if (!facilities) return [];
  const items = Array.isArray(facilities) ? facilities : facilities.split(",");
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of items) {
    const v = String(raw).trim();
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  return out;
}

// ---------- System Prompt ----------
function setSystemPromptJobDescriptionBuilder() {
  return [
    `You write concise, skimmable, ATS-friendly Job Descriptions in Markdown.`,
    `Rules:`,
    `- Use ONLY the information provided; do NOT invent details. Omit unknowns.`,
    `- Do NOT repeat the plain job title anywhere in the output.`,
    `- Headings must be **bold** and on their own line.`,
    `- Under every section except "About the Role", use bullet points prefixed with "- ".`,
    `- Keep sentences short; avoid fluff, emojis, and superlatives.`,
    `- Include salary/location/benefits ONLY if explicitly provided (internally for context; do not print them).`,
    `- Ignore irrelevant input.`,
    ``,
    `Required section order:`,
    `1) **About the Role** — 2–5 sentence paragraph describing the role and impact.`,
    `2) **Key Responsibilities** — 4–8 bullets.`,
    `3) **Required Qualifications** — 5–8 bullets.`,
    `4) **Nice to Have** — 3–5 bullets (omit if empty).`,
    `5) **What We Offer** — bullets if benefits/facilities provided (omit otherwise).`,
    `6) **How to Apply** — exactly ONE sentence (no bullet) if a method/link is provided.`,
    ``,
    `Validation hints (do not print):`,
    `- Do not print context, source, or repetitive info.`,
  ].join("\n");
}

// ---------- User Prompt Builder ----------
function buildJobDescriptionUserPrompt({
  title,
  description,
  facilities,
  workPreference,
  applyUrl,
  employmentType,
  location,
  salary,
  qualification,
  seniority,
  extras,
}: AIPromptInput) {
  const H = (s: string) => `**${s}**`;
  const lines: string[] = [];

  // Core instruction
  if (title) {
    lines.push(`Create a concise Job Description for: ${title}`);
  } else {
    lines.push(
      `Create a concise Job Description based on the provided inputs.`
    );
  }

  if (description) {
    lines.push(
      `Use only relevant parts of these notes: ${oneLine(description)}`
    );
  }

  // Global formatting
  lines.push(
    `Follow the section order exactly.`,
    `For **How to Apply**, write exactly one sentence with no bullet.`
  );

  // Output skeleton
  lines.push(
    ``,
    H("About the Role"),
    `A tight 2–4 sentence paragraph describing the role and impact.`,
    ``,
    H("Key Responsibilities"),
    `- 4–8 relevant bullets`,
    ``,
    H("Required Qualifications"),
    `- 5–8 relevant bullets`,
    ``,
    H("Nice to Have"),
    `- 3–5 optional bullets (omit if content does not exist)`
  );

  // What We Offer (facilities/benefits)
  const parsedFacilities = parseFacilities(facilities as string[]);
  if (parsedFacilities.length > 0) {
    lines.push(
      ``,
      H("What We Offer"),
      ...parsedFacilities.map((b) => `- ${b}`)
    );
  }

  // How to Apply — only if provided
  if (applyUrl) {
    lines.push(``, H("How to Apply"), `Apply via ${applyUrl}`);
  }

  // Hidden context — AI can use this info internally, but do NOT print it
  const hiddenContext: string[] = [];
  if (location) hiddenContext.push(`Location: ${location}`);
  if (salary) hiddenContext.push(`Salary: ${salary}`);
  if (employmentType) hiddenContext.push(`Employment type: ${employmentType}`);
  if (workPreference) hiddenContext.push(`Work preference: ${workPreference}`);
  if (seniority) hiddenContext.push(`Seniority: ${seniority}`);
  if (qualification) hiddenContext.push(`Qualification: ${qualification}`);
  if (extras?.length) hiddenContext.push(`Extras: ${extras.join("; ")}`);
  if (hiddenContext.length) {
    lines.push(
      `Use the following information to guide content generation but do NOT print it: ${hiddenContext.join(
        "; "
      )}`
    );
  }

  return lines.filter(Boolean).join("\n");
}

export { setSystemPromptJobDescriptionBuilder, buildJobDescriptionUserPrompt };
