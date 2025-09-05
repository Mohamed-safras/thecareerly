import { oneLine } from "../utils/utils";
import { PosterPayload } from "@/types/poster-types";

function compactPosterPrompt(p: PosterPayload) {
  // A compact, high-signal image prompt—not verbose—to save tokens
  // NOTE: purely text → no extra tokens from long descriptions
  const lines = [
    `Hiring poster for "${p.title}".`,
    p.companyName ? `Company: ${p.companyName}.` : "",
    p.posterVibe ? `Style: ${p.posterNotes}.` : "Style: professional, clean.",
    p.brandColorHex ? `Primary color: ${p.brandColorHex}.` : "",
    "White title text, subtle geometric shapes.",
    "Centered layout, balanced whitespace.",
    "Include 'Apply Now' button.",
    "No photo-realistic people; use abstract/clean illustration vibe.",
    p.posterNotes ? oneLine(p.posterNotes) : "",
  ]
    .filter(Boolean)
    .join(" ");

  return lines;
}

export { compactPosterPrompt };
