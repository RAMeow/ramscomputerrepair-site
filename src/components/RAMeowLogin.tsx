import React, { useState } from "react";

export default function RAMeowLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }

      window.location.href = "/RAMeow";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page" style={{ background: "transparent" }}>
      <section className="section-dark" style={{ minHeight: "100vh", paddingTop: 40 }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="portal-panel">
            <p className="portal-kicker">Secure Access</p>
            <h1 className="portal-title">RAMeow Portal Login</h1>
            <p className="portal-copy">
              Authorized access only.
            </p>

            <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter portal password"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,.15)",
                  background: "#0f172a",
                  color: "white",
                  marginBottom: 12,
                }}
              />

              <button
                type="submit"
                className="button-primary"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {error && (
              <p style={{ color: "#f87171", marginTop: 14 }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
