import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
        color: "#064e3b",
      }}
    >
      {/* HERO */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "90px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div>
          <h1 style={{ fontSize: "54px", fontWeight: 900, lineHeight: 1.1 }}>
            Learn Languages
            <br />
            <span style={{ color: "#059669" }}>
              With Maps, Voice & Braille
            </span>
          </h1>

          <p style={{ fontSize: "18px", marginTop: "20px", lineHeight: 1.6 }}>
            Tap a country on the map, hear pronunciation, translate instantly,
            and convert text into Braille dots. Built for real learning.
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "25px" }}>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "14px 28px",
                background: "#059669",
                color: "white",
                borderRadius: "10px",
                border: "none",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Start Learning
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "14px 22px",
                background: "white",
                color: "#059669",
                border: "2px solid #059669",
                borderRadius: "10px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          style={{
            background: "#ffffff",
            padding: "16px",
            borderRadius: "20px",
            border: "2px solid #a7f3d0",
          }}
        >
          <img
            src="/og.png"
            alt="NOAH preview"
            style={{
              width: "100%",
              borderRadius: "12px",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* FEATURES (3 IN A ROW) */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {[
            {
              title: "🌍 World Map Learning",
              desc: "Tap countries to learn languages instantly.",
              color: "#d1fae5",
            },
            {
              title: "🎤 Voice Input",
              desc: "Speak and hear pronunciation instantly.",
              color: "#e0f2fe",
            },
            {
              title: "🔵 Braille Mode",
              desc: "Convert text into Braille dots.",
              color: "#ede9fe",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: item.color,
                padding: "24px",
                borderRadius: "16px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
                border: "1px solid rgba(0,0,0,0.05)",
                transition: "0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-6px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              <h3 style={{ fontSize: "18px", fontWeight: 900 }}>
                {item.title}
              </h3>
              <p style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}