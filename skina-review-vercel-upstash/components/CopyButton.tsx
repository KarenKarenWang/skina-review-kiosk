"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      alert("已复制 ✅ 现在去 Google 页面粘贴发布就好～");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      alert("已复制 ✅ 现在去 Google 页面粘贴发布就好～");
    }
  }

  return (
    <button
      onClick={copy}
      style={{
        border: 0,
        borderRadius: 12,
        padding: "12px 14px",
        fontSize: 15,
        cursor: "pointer",
        background: "#111",
        color: "#fff",
      }}
      aria-label="Copy review text"
    >
      {copied ? "已复制" : "一键复制"}
    </button>
  );
}
