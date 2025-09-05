// types/posterVibe.ts
export const ALLOWED_VIBES = [
  "",
  "professional",
  "modern",
  "minimal",
  "vibrant",
] as const;
export type PosterVibe = (typeof ALLOWED_VIBES)[number];

export function isPosterVibe(v: unknown): v is PosterVibe {
  return (
    typeof v === "string" && (ALLOWED_VIBES as readonly string[]).includes(v)
  );
}

export function normalizePosterVibe(v?: string): PosterVibe {
  return isPosterVibe(v) ? v : "professional";
}

export type PosterPayload = {
  title: string;
  posterNotes?: string;
  posterVibe?: string;
  companyName?: string;
  brandColorHex?: string;
};
