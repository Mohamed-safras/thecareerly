// lib/server/cache.redis.ts
import { redis } from "./redis";

export async function cacheGet<T>(key: string): Promise<T | undefined> {
  const v = await redis.get<T>(key);
  return v ?? undefined;
}

export async function cacheSet<T>(
  key: string,
  value: T,
  ttlMs: number
): Promise<void> {
  const ttlSec = Math.ceil(ttlMs / 1000);
  // upstash supports PX too; EX is fine here
  await redis.set(key, value, { ex: ttlSec });
}
