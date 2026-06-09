// src/react-app/pages/LandingPage.tsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={page}>

      {/* HERO SECTION */}
      <section style={hero}>
        <div style={badge}>✨ AI-Powered Generation Engine</div>
        <h1 style={h1}>
          Content That Sells — <span style={gradientText}>Instantly</span>
        </h1>

        <p style={sub}>
          Create product descriptions, ads, and content that actually converts.
          No writing skills needed.
        </p>

        <button onClick={() => navigate("/login")} style={btnMain}>
          Start Free
        </button>
      </section>

      {/* PROBLEM */}
      <section style={section}>
        <h2 style={h2}>Most content doesn’t sell</h2>
        <p style={text}>
          Weak product descriptions. Low-performing ads. Generic copy that gets ignored.
          You don’t need more content — you need better content.
        </p>
      </section>

      {/* SOLUTION */}
      <section style={section}>
        <h2 style={h2}>The solution</h2>
        <p style={text}>
          NOAH Commerce turns basic ideas into high-converting content in seconds.
          Just describe your product — we handle the rest.
        </p>
      </section>

      {/* FEATURES */}
      <section style={gridSection}>
        {[
          "Product descriptions that convert",
          "High-performing ad copy",
          "SEO-optimized content",
          "Brand stories",
          "Tone & style control",
          "Multi-language support",
        ].map((f, i) => (
          <div key={i} style={cardBlue}>
            <h3 style={cardTitle}>{f}</h3>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section style={stepSection}>
        <h2 style={h2}>How it works</h2>
        <div style={stepsGrid}>
          <div style={stepItem}><span style={stepNum}>1</span><p style={stepText}>Enter your product or idea</p></div>
          <div style={stepItem}><span style={stepNum}>2</span><p style={stepText}>Choose what you need</p></div>
          <div style={stepItem}><span style={stepNum}>3</span><p style={stepText}>Get ready-to-use content instantly</p></div>
        </div>
      </section>

      {/* VALUE */}
      <section style={gridSection}>
        {[
          "Increase conversions",
          "Save hours of writing",
           "Stay consistent",
        ].map((v, i) => (
          <div key={i} style={cardPink}>
            <h3 style={cardTitle}>{v}</h3>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={cta}>
        <h2 style={h2Large}>Start creating content that sells</h2>
        <button onClick={() => navigate("/login")} style={btnMain}>
          Start Free
        </button>
      </section>

    </div>
  );
}

/* 🎨 THEME STYLES (SKY BLUE & COTTON-CANDY PINK) */

const page = {
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  background: "linear-gradient(180deg, #F0F9FF 0%, #FDF2F8 100%)",
  paddingBottom: "80px",
  color: "#0c4a6e",
};

const hero = {
  textAlign: "center" as const,
  padding: "140px 20px 100px 20px",
  maxWidth: "900px",
  margin: "0 auto",
};

const badge = {
  display: "inline-block",
  padding: "6px 16px",
  background: "#E0F2FE",
  color: "#0369a1",
  borderRadius: "9999px",
  fontSize: "13px",
  fontWeight: 700,
  marginBottom: "24px",
  border: "1px solid #bae6fd",
  letterSpacing: "0.02em",
};

const h1 = {
  fontSize: "64px",
  fontWeight: 900,
  lineHeight: 1.05,
  color: "#0f172a",
  letterSpacing: "-0.03em",
};

const gradientText = {
  background: "linear-gradient(90deg, #0284c7 0%, #db2777 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const sub = {
  fontSize: "20px",
  color: "#475569",
  marginTop: "24px",
  lineHeight: 1.5,
  maxWidth: "600px",
  marginRight: "auto",
  marginLeft: "auto",
};

const section = {
  maxWidth: "800px",
  margin: "60px auto",
  padding: "40px 32px",
  textAlign: "center" as const,
  background: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderRadius: "24px",
  border: "1px solid rgba(255,255,255,0.6)",
};

const h2 = {
  fontSize: "32px",
  fontWeight: 800,
  color: "#0f172a",
  letterSpacing: "-0.02em",
  marginBottom: "14px",
};

const h2Large = {
  fontSize: "40px",
  fontWeight: 900,
  color: "#0f172a",
  letterSpacing: "-0.02em",
  marginBottom: "14px",
};

const text = {
  fontSize: "17px",
  color: "#475569",
  lineHeight: 1.6,
};

const gridSection = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "24px",
  maxWidth: "1050px",
  margin: "40px auto",
  padding: "0 20px",
};

const cardBlue = {
  background: "#ffffff",
  padding: "32px 24px",
  borderRadius: "20px",
  border: "1px solid #e0f2fe",
  boxShadow: "0 4px 20px -2px rgba(186, 230, 253, 0.3)",
  transition: "all 0.2s ease",
};

const cardPink = {
  background: "#ffffff",
  padding: "32px 24px",
  borderRadius: "20px",
  border: "1px solid #fce7f3",
  boxShadow: "0 4px 20px -2px rgba(252, 231, 243, 0.4)",
  transition: "all 0.2s ease",
};

const cardTitle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#1e293b",
  lineHeight: 1.4,
};

const stepSection = {
  maxWidth: "900px",
  margin: "80px auto",
  textAlign: "center" as const,
};

const stepsGrid = {
  display: "flex",
  flexDirection: "row" as const,
  justifyContent: "space-between",
  gap: "20px",
  marginTop: "40px",
  flexWrap: "wrap" as const,
};

const stepItem = {
  flex: "1 1 250px",
  background: "#ffffff",
  padding: "24px",
  borderRadius: "20px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 2px 12px rgba(0,0,0,0.02)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const stepNum = {
  width: "36px",
  height: "36px",
  background: "linear-gradient(135deg, #bae6fd 0%, #fbcfe8 100%)",
  color: "#0369a1",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 800,
  fontSize: "16px",
  marginBottom: "16px",
};

const stepText = {
  fontSize: "15px",
  fontWeight: 600,
  color: "#334155",
};

const cta = {
  textAlign: "center" as const,
  padding: "100px 20px",
  maxWidth: "700px",
  margin: "60px auto 0 auto",
  background: "linear-gradient(135deg, #E0F2FE 0%, #FCE7F3 100%)",
  borderRadius: "32px",
  border: "1px solid #ffffff",
  boxShadow: "0 10px 30px -5px rgba(2, 132, 199, 0.08)",
};

const btnMain = {
  marginTop: "24px",
  padding: "16px 36px",
  background: "linear-gradient(90deg, #0284c7 0%, #be185d 100%)",
  color: "#ffffff",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 700,
  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.25)",
  transition: "transform 0.15s ease",
};
