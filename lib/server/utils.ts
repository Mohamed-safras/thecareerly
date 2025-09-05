import crypto from "crypto";

export function clientIpFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip") || "0.0.0.0";
}

export function stableIdempotencyKey(payload: unknown): string {
  const json = JSON.stringify(payload ?? null);
  return crypto.createHash("sha256").update(json).digest("hex");
}

export function clampString(s: string | undefined, max: number): string {
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}
