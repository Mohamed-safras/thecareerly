import { Place } from "@/types/place";

export function isPlace(x: unknown): x is Place {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o["place_id"] === "number" &&
    typeof o["display_name"] === "string" &&
    typeof o["lat"] === "string" &&
    typeof o["lon"] === "string"
  );
}

export function mapNominatim(raw: unknown): Place[] {
  return Array.isArray(raw) ? raw.filter(isPlace) : [];
}
