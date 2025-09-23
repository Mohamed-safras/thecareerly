import crypto from "crypto";

export function stableIdempotencyKey(payload: unknown): string {
  const json = JSON.stringify(payload ?? null);
  return crypto.createHash("sha256").update(json).digest("hex");
}

export function safeParseJSON<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return (value ?? fallback) as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
