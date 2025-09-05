// scripts/test-redis.ts
import { redis } from "../lib/server/redis";

(async () => {
  try {
    await redis.set("ping", "pong", "EX", 30);
    const v = await redis.get("ping");
    console.log("Redis says:", v);
  } catch (e) {
    console.error("Test failed:", (e as Error).message);
  } finally {
    process.exit(0);
  }
})();
