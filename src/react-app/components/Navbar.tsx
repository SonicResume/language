import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Hide "Start Free" inside the app
  const insideApp =
    location.pathname.startsWith("/workspace") ||
    location.pathname.startsWith("/translate");

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        maxWidth: "1100px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        gap: "20px",
        flexWrap: "wrap",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* LEFT BRAND */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          minWidth: "220px",
        }}
      >
        <img
          src="/logo.png"
          style={{ width: "32px", height: "32px", objectFit: "contain" }}
          alt="Logo"
        />

        <Link
          to="/"
          style={{
            fontWeight: 800,
            textDecoration: "none",
            color: "#0c4a6e",
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          NOAH Global Language
        </Link>
      </div>

      {/* CENTER LINKS */}
      <div
        style={{
          display: "flex",
          gap: "28px",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 1 300px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/" style={link}>
          Home
        </Link>

        <Link to="/blog" style={link}>
          Blog
        </Link>

        <Link to="/pricing" style={link}>
          Pricing
        </Link>

        <Link to="/contact" style={link}>
          Contact
        </Link>
      </div>

      {/* RIGHT BUTTON */}
      {!insideApp && (
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={button}>Start Free</button>
          </Link>
        </div>
      )}
    </nav>
  );
}

/* LINKS */
const link = {
  textDecoration: "none",
  color: "#475569",
  fontSize: "14px",
  fontWeight: "600",
  whiteSpace: "nowrap",
};

/* BLUE-GREEN BUTTON */
const button = {
  padding: "10px 18px",
  background: "linear-gradient(135deg, #06b6d4 0%, #22c55e 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
  boxShadow: "0 6px 18px rgba(34,197,94,0.25)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};