export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 6px 24px rgba(0,0,0,.06)" }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>Skina Review Kiosk</h1>
        <p style={{ marginTop: 10, lineHeight: 1.6, color: "#444" }}>
          Customer page: <code>/r</code><br />
          Admin page: <code>/admin?token=...</code>
        </p>
      </div>
    </main>
  );
}
