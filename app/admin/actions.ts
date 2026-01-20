"use server";

import { getRedis, KEY_UNUSED, KEY_USED } from "@/lib/redis";
import { isAdminTokenValid } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const redis = getRedis(); // ✅ 就加在这里（文件顶层）

function requireAdmin(token?: string | null) {
  if (!isAdminTokenValid(token)) {
    throw new Error("Unauthorized: invalid ADMIN_TOKEN");
  }
}

export async function addOne(formData: FormData) {
  const token = String(formData.get("token") || "");
  requireAdmin(token);

  const text = String(formData.get("text") || "").trim();
  if (!text) return;

  await redis.sadd(KEY_UNUSED, text);
  revalidatePath("/admin");
}

export async function bulkAdd(formData: FormData) {
  const token = String(formData.get("token") || "");
  requireAdmin(token);

  const bulk = String(formData.get("bulk") || "").trim();
  if (!bulk) return;

  const lines = bulk
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  // ✅ 关键：不要 spread
  for (const line of lines) {
    await redis.sadd(KEY_UNUSED, line);
  }

  revalidatePath("/admin");
}

export async function clearUsed(formData: FormData) {
  const token = String(formData.get("token") || "");
  requireAdmin(token);

  await redis.del(KEY_USED);
  revalidatePath("/admin");
}

export async function resetAll(formData: FormData) {
  const token = String(formData.get("token") || "");
  requireAdmin(token);

  await redis.del(KEY_UNUSED);
  await redis.del(KEY_USED);
  revalidatePath("/admin");
}
