import Nav from "../components/Nav";
import PdfWrapper from "./PdfWrapper";

export default function Resume() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a0d36",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "48px 40px 80px",
          width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "36px" }}>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              margin: 0,
              color: "#ffffff",
            }}
          >
            How I work
          </h1>
          <a
            href="/Malavika_Krishnaswamy_Resume.pdf"
            download
            className="subscribe-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DOWNLOAD
          </a>
        </div>

        {/* PDF rendered as canvas — desktop only */}
        <div className="resume-pdf-desktop">
          <PdfWrapper />
        </div>

        {/* Mobile: download fallback */}
        <div className="resume-pdf-mobile" style={{ display: "none", flexDirection: "column", alignItems: "center", gap: "20px", padding: "40px 0", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
            PDF preview isn&apos;t great on mobile.
            <br />Tap below to download instead.
          </p>
          <a href="/Malavika_Krishnaswamy_Resume.pdf" download className="subscribe-btn">
            DOWNLOAD RESUME
          </a>
        </div>
      </main>

      <style>{`
        .react-pdf__Page {
          margin-bottom: 16px;
          border-radius: 6px;
          overflow: hidden;
        }
        .react-pdf__Page canvas {
          width: 100% !important;
          height: auto !important;
        }
        @media (max-width: 639px) {
          .resume-pdf-desktop { display: none !important; }
          .resume-pdf-mobile { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
