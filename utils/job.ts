import { ALLOWED_VIBES } from "@/const/basic-job-info-options-value";
import { PosterVibe } from "@/types/job";

export function isPosterVibe(value: unknown): value is PosterVibe {
  return (
    typeof value === "string" &&
    (ALLOWED_VIBES as readonly string[]).includes(value)
  );
}

/** Normalizer (fallback → "professional") */
export function normalizePosterVibe(value?: string | null): PosterVibe {
  return isPosterVibe(value) ? value : "professional";
}
