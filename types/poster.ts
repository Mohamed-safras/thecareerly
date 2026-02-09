import { ALLOWED_VIBES_TYPES } from "@/const/basic-info-options";

/** Canonical allowed vibes */
export const ALLOWED_VIBES = [
  "",
  "professional",
  "modern",
  "minimal",
  "vibrant",
] as const;

/** Union type of allowed vibes */
export type PosterVibe = (typeof ALLOWED_VIBES)[number];

/** Type guard */
export function isPosterVibe(v: unknown): v is PosterVibe {
  return (
    typeof v === "string" && (ALLOWED_VIBES as readonly string[]).includes(v)
  );
}

/** Normalizer (fallback → "professional") */
export function normalizePosterVibe(v?: string | null): PosterVibe {
  return isPosterVibe(v) ? v : "professional";
}

/** Options for UI selects */

/** Value type of the select options */
export type AllowedVibesTypeValue =
  (typeof ALLOWED_VIBES_TYPES)[number]["value"];

/** Value → Label map */
export const ALLOWED_VIBES_TYPE_LABEL: Readonly<
  Record<AllowedVibesTypeValue, string>
> = Object.freeze(
  Object.fromEntries(
    ALLOWED_VIBES_TYPES.map((o) => [o.value, o.label]),
  ) as Record<AllowedVibesTypeValue, string>,
);
