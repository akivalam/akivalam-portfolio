import Nav from "../components/Nav";

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
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 60px 80px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
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
        </div>

        {/* Desktop: PDF embed */}
        <div
          className="resume-pdf-desktop"
          style={{
            flex: 1,
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid rgba(167,139,250,0.2)",
            backgroundColor: "rgba(255,255,255,0.03)",
            minHeight: "800px",
          }}
        >
          <iframe
            src="/Malavika_Krishnaswamy_Resume.pdf"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "800px",
              border: "none",
              display: "block",
            }}
            title="Malavika Krishnaswamy Resume"
          />
        </div>

        {/* Mobile: download fallback */}
        <div
          className="resume-pdf-mobile"
          style={{
            borderRadius: "10px",
            border: "1px solid rgba(167,139,250,0.2)",
            backgroundColor: "rgba(255,255,255,0.03)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
            gap: "20px",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            PDF preview isn&apos;t available on mobile.
            <br />
            Tap below to download instead.
          </p>
          <a
            href="/Malavika_Krishnaswamy_Resume.pdf"
            download
            style={{
              padding: "14px 28px",
              backgroundColor: "#7c3aed",
              borderRadius: "6px",
              textDecoration: "none",
              color: "#ffffff",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </main>

      <style>{`
        @media (max-width: 639px) {
          .resume-pdf-desktop { display: none !important; }
          .resume-pdf-mobile { display: flex !important; }
          main { padding: 24px 20px 60px !important; }
        }
        @media (min-width: 640px) {
          .resume-pdf-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
