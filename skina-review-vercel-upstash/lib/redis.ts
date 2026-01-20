import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const KEY_UNUSED = "skina:reviews:unused";
export const KEY_USED = "skina:reviews:used";
