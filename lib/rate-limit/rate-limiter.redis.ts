import { redis } from "@/lib/cache/redis";

export interface RateLimitConfig {
  limit: number; // max requests allowed per window
  windowSec: number; // length of window in seconds
}

export interface RateLimitResult {
  ok: boolean;
  limit: number;
  count: number;
  remaining: number;
  retryAfterSec?: number;
  resetAt: number; // unix ms when window resets
}

export async function rateLimiter(
  key: string,
  cfg: RateLimitConfig
): Promise<RateLimitResult> {
  const nowSec = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(nowSec / cfg.windowSec) * cfg.windowSec;
  const redisKey = `rl:${process.env.NODE_ENV}:${key}:${windowStart}`;

  // Run INCR and set EXPIRE atomically
  const [count] = (await redis
    .multi()
    .incr(redisKey)
    .expire(redisKey, cfg.windowSec)
    .exec()) as [number, unknown];

  const resetAt = (windowStart + cfg.windowSec) * 1000;

  if (count <= cfg.limit) {
    return {
      ok: true,
      limit: cfg.limit,
      count,
      remaining: Math.max(0, cfg.limit - count),
      resetAt,
    };
  }

  const retryAfterSec = windowStart + cfg.windowSec - nowSec;
  return {
    ok: false,
    limit: cfg.limit,
    count,
    remaining: 0,
    retryAfterSec: Math.max(1, retryAfterSec),
    resetAt,
  };
}
