// prompts/jd.ts
import type { AIPromptInput } from "@/types/gen-AI";
import { oneLine } from "../utils";

function parseBenefits(benefits?: string[] | string): string[] {
  if (!benefits) return [];
  const items = Array.isArray(benefits) ? benefits : benefits.split(",");
  // Trim, remove empties, de-duplicate (case-insensitive), preserve first-seen order
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
    `- Include salary/location/benefits ONLY if explicitly provided.`,
    `- Ignore input that is irrelevant to JD creation.`,
    ``,
    `Required section order and shapes:`,
    `1) **About the Role** — one short paragraph (2–5 sentences). Start naturally (e.g., “We are seeking…”, “You will…”).`,
    `2) **Key Responsibilities** — 4–8 bullets.`,
    `3) **Required Qualifications** — 5–8 bullets.`,
    `4) **Nice to Have** — 3–5 bullets (omit if empty).`,
    `5) **What We Offer** — bullets with very short straight forward explantion (only if benefits are provided).`,
    `6) **How to Apply** — exactly ONE sentence (NO bullet), only if a method/link (URL or email) is provided.`,
    `7) **Source** — include the provided URL only (optional).`,
    ``,
    `Hashtags (NO heading, final line only):`,
    `- After ALL sections (and any Source), output ONE final line of 6–10 space-separated hashtags.`,
    `- The final line MUST contain ONLY hashtags (no extra words, labels, or punctuation).`,
    `- Do NOT include the job title or any direct concatenation of its words (e.g., no "#seniorsoftwareengineer"). Prefer generic role-family tags (e.g., "#softwareengineering") when relevant.`,
    `- Lowercase; letters/numbers only; no spaces, hyphens, punctuation, or duplicates.`,
    `- Avoid brand names unless explicitly provided by the user.`,
    ``,
    `Strict separation examples:`,
    `- BAD (How to Apply): "Submit your application to careers@acme.com with relevant hashtags."`,
    `- GOOD (How to Apply): "Apply via careers@acme.com"`,
    `- Final line (no heading): "#hiring #softwareengineering #react #aws #hybrid #berlin"`,
    ``,
    `Validation hints (not to print):`,
    `- The How to Apply sentence MUST NOT contain "#" or the word "hashtag".`,
    `- The last line SHOULD match: (?:#[a-z0-9]+)(?:\\s#[a-z0-9]+){5,9}$`,
  ].join("\n");
}

// ---------- User Prompt Builder ----------
function buildJobDescriptionUserPrompt(d: AIPromptInput) {
  const H = (s: string) => `**${s}**`;
  const lines: string[] = [];

  // Core ask & relevant notes
  lines.push(
    `Create a concise Job Description for: ${d.title}`,
    d.description
      ? `Use only relevant parts of these notes: ${oneLine(d.description)}`
      : ``
  );

  // Global format guards
  lines.push(
    `Follow the section order exactly. Under each heading (except About the Role) write bullets.`,
    `For **How to Apply**, write exactly one sentence with no bullet and DO NOT mention hashtags.`,
    `At the very end of the entire output (after all sections and any Source), print a single line of space-separated hashtags with NO heading and NO extra words.`
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
    `- 3–5 optional bullets (include only if content exists)`
  );

  // What We Offer — dynamic, comma-separated (or array) -> bullets
  const parsedBenefits = parseBenefits(d.benefits as string[]);
  if (parsedBenefits.length > 0) {
    lines.push(``, H("What We Offer"), ...parsedBenefits.map((b) => `- ${b}`));
  } else {
    // If nothing provided, instruct generator to omit the section in final output
    lines.push(
      ``,
      H("What We Offer"),
      `- Include only if benefits are explicitly provided`
    );
  }

  // How to Apply — single sentence, NO bullet, NO hashtags
  const applyTarget = d.applyUrl;
  if (applyTarget) {
    lines.push(``, H("How to Apply"), `Apply via ${applyTarget}`);
  } else {
    lines.push(
      ``,
      H("How to Apply"),
      `Include a single sentence ONLY if an application method/link is provided (do not mention hashtags).`
    );
  }

  // Optional Source
  if (d.sourceUrl) {
    lines.push(``, H("Source"), d.sourceUrl);
  }

  // Lightweight context (not a section)
  if (d.location) lines.push(`Context: Location is ${d.location}.`);
  if (d.salary) lines.push(`Context: Salary info is "${d.salary}".`);
  if (d.extras?.length)
    lines.push(
      `Honor these extra requests if relevant: ${d.extras.join("; ")}`
    );

  // Final directive for hashtags
  lines.push(
    ``,
    `Finally, output ONE line of 6–10 auto-generated, space-separated hashtags based on the role domain, core skills/tech, seniority, work arrangement, and location. Exclude job-title words. The line must contain ONLY hashtags and nothing else.`
  );

  return lines.filter(Boolean).join("\n");
}

export { setSystemPromptJobDescriptionBuilder, buildJobDescriptionUserPrompt };
