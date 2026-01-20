"use server";

import { redis, KEY_UNUSED, KEY_USED } from "@/lib/redis";
import { isAdminTokenValid } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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

  if (lines.length) {
    await redis.sadd(KEY_UNUSED, ...lines);
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
