export const dynamic = "force-dynamic";

import CopyButton from "@/components/CopyButton";
import { redis, KEY_UNUSED, KEY_USED } from "@/lib/redis";
import { getGoogleReviewUrl } from "@/lib/auth";

export default async function ReviewPage() {
  const review = await redis.spop<string>(KEY_UNUSED);
  if (review) {
    await redis.sadd(KEY_USED, review);
  }

  const googleUrl = getGoogleReviewUrl();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 20 }}>
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          padding: 16,
          boxShadow: "0 6px 24px rgba(0,0,0,.06)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 18 }}>感谢您光临 Skina 💚</h1>

        {review ? (
          <>
            <div
              style={{
                whiteSpace: "pre-wrap",
                background: "#f2f4f5",
                borderRadius: 12,
                padding: 14,
                lineHeight: 1.6,
                fontSize: 15,
                marginTop: 10,
              }}
            >
              {review}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <CopyButton text={review} />
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener"
                style={{
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 15,
                  textDecoration: "none",
                  background: "#1a8f5b",
                  color: "#fff",
                  display: "inline-block",
                }}
              >
                去 Google 发布
              </a>
            </div>

            <div style={{ fontSize: 12, color: "#666", marginTop: 10, lineHeight: 1.5 }}>
              温馨提示：点击“一键复制”后，跳转到 Google 页面，粘贴并发布即可（可自行修改内容更真实）。
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                whiteSpace: "pre-wrap",
                background: "#f2f4f5",
                borderRadius: 12,
                padding: 14,
                lineHeight: 1.6,
                fontSize: 15,
                marginTop: 10,
                color: "#b00020",
              }}
            >
              今天的评论模板已全部被使用完啦～请联系前台补充文案 💡
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener"
                style={{
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 15,
                  textDecoration: "none",
                  background: "#1a8f5b",
                  color: "#fff",
                  display: "inline-block",
                }}
              >
                仍然去 Google 发布
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
