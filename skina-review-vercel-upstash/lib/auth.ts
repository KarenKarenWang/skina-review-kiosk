export function isAdminTokenValid(token?: string | null) {
  if (!token) return false;
  return token === process.env.ADMIN_TOKEN;
}

export function getGoogleReviewUrl() {
  return process.env.GOOGLE_REVIEW_URL || "https://g.page/r/CRjcSAYWw8eUEBM/review";
}
