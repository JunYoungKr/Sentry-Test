"use client";

import { useState } from "react";

export default function TestAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log(supabase_url, supabase_key);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      setResult({ status: res.status, data });
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setResult({ status: res.status, data });
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      setResult({ status: res.status, data });
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleGetUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      setResult({ status: res.status, data });
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f0f 100%)",
      padding: "60px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      maxWidth: "480px",
      margin: "0 auto",
      background: "linear-gradient(145deg, #1a1a1a, #0d0d0d)",
      borderRadius: "24px",
      padding: "48px 40px",
      boxShadow:
        "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(45, 212, 191, 0.1)",
      border: "1px solid rgba(45, 212, 191, 0.15)",
    },
    title: {
      color: "#2dd4bf",
      fontSize: "32px",
      fontWeight: 700,
      textAlign: "center" as const,
      marginBottom: "12px",
      letterSpacing: "-0.5px",
      textShadow: "0 0 40px rgba(45, 212, 191, 0.3)",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "14px",
      textAlign: "center" as const,
      marginBottom: "40px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      color: "#9ca3af",
      fontSize: "12px",
      fontWeight: 500,
      marginBottom: "8px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
    },
    input: {
      width: "100%",
      padding: "16px 20px",
      background: "#0a0a0a",
      border: "2px solid #262626",
      borderRadius: "12px",
      color: "#e5e7eb",
      fontSize: "16px",
      outline: "none",
      transition: "all 0.3s ease",
      boxSizing: "border-box" as const,
    },
    buttonGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
      marginTop: "32px",
    },
    buttonPrimary: {
      padding: "16px 24px",
      background: "linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)",
      border: "none",
      borderRadius: "12px",
      color: "#0a0a0a",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
      boxShadow: "0 4px 15px rgba(45, 212, 191, 0.3)",
    },
    buttonSecondary: {
      padding: "16px 24px",
      background: "transparent",
      border: "2px solid #2dd4bf",
      borderRadius: "12px",
      color: "#2dd4bf",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
    },
    buttonOutline: {
      padding: "16px 24px",
      background: "transparent",
      border: "2px solid #404040",
      borderRadius: "12px",
      color: "#9ca3af",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px",
    },
    resultBox: {
      marginTop: "32px",
      background: "#0a0a0a",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid #262626",
      overflow: "auto",
    },
    resultTitle: {
      color: "#2dd4bf",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "uppercase" as const,
      letterSpacing: "1px",
      marginBottom: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    resultPre: {
      color: "#a5f3fc",
      fontSize: "13px",
      lineHeight: 1.6,
      margin: 0,
      fontFamily: "'Fira Code', 'Monaco', monospace",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: 600,
    },
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300)
      return { background: "#065f46", color: "#34d399" };
    if (status >= 400) return { background: "#7f1d1d", color: "#fca5a5" };
    return { background: "#1e3a5f", color: "#93c5fd" };
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>✦ Auth Test</h1>
        <p style={styles.subtitle}>Supabase 인증 API 테스트</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>이름</label>
          <input
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = "#2dd4bf";
              e.target.style.boxShadow = "0 0 0 4px rgba(45, 212, 191, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#262626";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>이메일</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = "#2dd4bf";
              e.target.style.boxShadow = "0 0 0 4px rgba(45, 212, 191, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#262626";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>비밀번호</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = "#2dd4bf";
              e.target.style.boxShadow = "0 0 0 4px rgba(45, 212, 191, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#262626";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            onClick={handleSignup}
            disabled={loading}
            style={{
              ...styles.buttonPrimary,
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(45, 212, 191, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(45, 212, 191, 0.3)";
            }}
          >
            {loading ? "..." : "회원가입"}
          </button>
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.buttonSecondary,
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "rgba(45, 212, 191, 0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "..." : "로그인"}
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            style={{
              ...styles.buttonOutline,
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = "#6b7280";
                e.currentTarget.style.color = "#e5e7eb";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#404040";
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            로그아웃
          </button>
          <button
            onClick={handleGetUser}
            disabled={loading}
            style={{
              ...styles.buttonOutline,
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = "#6b7280";
                e.currentTarget.style.color = "#e5e7eb";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#404040";
              e.currentTarget.style.color = "#9ca3af";
            }}
          >
            내 정보
          </button>
        </div>

        {result && (
          <div style={styles.resultBox}>
            <div style={styles.resultTitle}>
              <span>◈ Response</span>
              {result.status && (
                <span
                  style={{
                    ...styles.statusBadge,
                    ...getStatusColor(result.status),
                  }}
                >
                  {result.status}
                </span>
              )}
            </div>
            <pre style={styles.resultPre}>
              {JSON.stringify(result.data || result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
