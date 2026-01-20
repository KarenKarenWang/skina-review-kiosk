export const dynamic = "force-dynamic";

import { redis, KEY_UNUSED, KEY_USED } from "@/lib/redis";
import { isAdminTokenValid, getGoogleReviewUrl } from "@/lib/auth";
import { addOne, bulkAdd, clearUsed, resetAll } from "./actions";

export default async function AdminPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token || "";
  const ok = isAdminTokenValid(token);

  if (!ok) {
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)" }}>
          <h1 style={{ margin: 0, fontSize: 18 }}>Admin</h1>
          <p style={{ marginTop: 10, color: "#b00020" }}>
            Unauthorized. 请在 URL 里带 token：<code>?token=你的ADMIN_TOKEN</code>
          </p>
        </div>
      </main>
    );
  }

  const [unused, used] = await Promise.all([redis.scard(KEY_UNUSED), redis.scard(KEY_USED)]);
  const googleUrl = getGoogleReviewUrl();

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)", marginBottom: 12 }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>Review 模板后台</h1>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <div style={{ background: "#f2f4f5", borderRadius: 12, padding: "10px 12px" }}>
            未使用：<b>{unused}</b>
          </div>
          <div style={{ background: "#f2f4f5", borderRadius: 12, padding: "10px 12px" }}>
            已使用：<b>{used}</b>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 10, lineHeight: 1.6 }}>
          顾客扫码入口：{" "}
          <a href="/r" target="_blank" rel="noreferrer">
            /r
          </a>
          <br />
          Google Review 跳转：{" "}
          <a href={googleUrl} target="_blank" rel="noreferrer">
            {googleUrl}
          </a>
          <br />
          你的后台链接（含 token）：<code>/admin?token={token}</code>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>新增 1 条</h2>
        <form action={addOne} style={{ marginTop: 10 }}>
          <input type="hidden" name="token" value={token} />
          <textarea
            name="text"
            rows={3}
            placeholder="输入一条 review 文案"
            style={{ width: "100%", borderRadius: 12, border: "1px solid #ddd", padding: 10, fontSize: 14 }}
          />
          <div style={{ marginTop: 10 }}>
            <button type="submit" style={{ border: 0, borderRadius: 12, padding: "10px 12px", fontSize: 14, cursor: "pointer", background: "#111", color: "#fff" }}>
              添加
            </button>
          </div>
        </form>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>批量导入（每行一条）</h2>
        <form action={bulkAdd} style={{ marginTop: 10 }}>
          <input type="hidden" name="token" value={token} />
          <textarea
            name="bulk"
            rows={10}
            placeholder={"一行一条：\n太喜欢这里的环境了...\n护士非常专业..."}
            style={{ width: "100%", borderRadius: 12, border: "1px solid #ddd", padding: 10, fontSize: 14 }}
          />
          <div style={{ marginTop: 10 }}>
            <button type="submit" style={{ border: 0, borderRadius: 12, padding: "10px 12px", fontSize: 14, cursor: "pointer", background: "#111", color: "#fff" }}>
              批量添加
            </button>
          </div>
        </form>
        <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>建议准备中英混合、多句式，避免重复感。</div>
      </div>

      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>维护</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
          <form action={clearUsed}>
            <input type="hidden" name="token" value={token} />
            <button type="submit" style={{ border: 0, borderRadius: 12, padding: "10px 12px", fontSize: 14, cursor: "pointer", background: "#b00020", color: "#fff" }}>
              清空已使用（可选）
            </button>
          </form>

          <form
            action={resetAll}
            onSubmit={(e) => {
              if (!confirm("确定要清空全部（未使用+已使用）吗？")) e.preventDefault();
            }}
          >
            <input type="hidden" name="token" value={token} />
            <button type="submit" style={{ border: 0, borderRadius: 12, padding: "10px 12px", fontSize: 14, cursor: "pointer", background: "#333", color: "#fff" }}>
              清空全部（慎用）
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
