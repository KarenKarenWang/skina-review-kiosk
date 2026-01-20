// lib/redis.ts
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

// ✅ Redis key 常量（你 actions 里在用）
export const KEY_UNUSED = "reviews:unused";
export const KEY_USED = "reviews:used";

export function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  // ✅ 不在 import 阶段 throw，只在真正调用时校验
  if (!url || !token) {
    throw new Error("Upstash Redis env vars not set");
  }

  if (!redis) {
    redis = new Redis({
      url,
      token,
    });
  }

  return redis;
}
