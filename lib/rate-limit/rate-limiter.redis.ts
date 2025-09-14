import { redis } from "../../server/lib/cache/redis";

export interface RateLimitConfig {
  limit: number;
  windowSec: number;
}
export interface RateLimitResult {
  ok: boolean;
  retryAfterSec?: number;
  remaining?: number;
  resetAt?: number;
}

/** Fixed-window: INCR + EXPIRE. Simple and cheap. */
export async function rateLimiter(
  key: string,
  cfg: RateLimitConfig
): Promise<RateLimitResult> {
  const nowSec = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(nowSec / cfg.windowSec) * cfg.windowSec;
  const redisKey = `rl:${key}:${windowStart}`;

  // INCR returns the new count; set TTL only when key is new
  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.expire(redisKey, cfg.windowSec); // set window TTL
  }

  if (count <= cfg.limit) {
    return {
      ok: true,
      remaining: Math.max(0, cfg.limit - count),
      resetAt: (windowStart + cfg.windowSec) * 1000,
    };
  }

  const retryAfterSec = windowStart + cfg.windowSec - nowSec;
  return {
    ok: false,
    retryAfterSec: Math.max(1, retryAfterSec),
    remaining: 0,
    resetAt: (windowStart + cfg.windowSec) * 1000,
  };
}
