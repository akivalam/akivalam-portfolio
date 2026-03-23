import Nav from "./components/Nav";
import Image from "next/image";

export default function Home() {
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

      <main className="home-main">
        {/* Left — text + buttons */}
        <div className="home-text">
          <h1
            className="home-h1"
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
              color: "#ffffff",
            }}
          >
            Hello,
            <br />
            I&apos;m{" "}
            <em style={{ fontStyle: "italic", color: "#a78bfa" }}>Malavika</em>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 12px",
              letterSpacing: "0.01em",
            }}
          >
            Runner. Builder. Problem solver.
          </p>

          <p
            className="home-desc"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 36px",
            }}
          >
            I build things that work and fix things that don&apos;t. Technical
            enough to go deep, businessy enough to see the full picture.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <PurpleButton href="/timeline">HOW I GOT HERE</PurpleButton>
            <PurpleButton href="/resume">HOW I WORK</PurpleButton>
            <PurpleButton href="/blog">HOW I THINK</PurpleButton>
          </div>
        </div>

        {/* Right — photo + social */}
        <div className="home-photo-col">
          {/* Photo frame */}
          <div className="home-photo-frame">
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                right: "8px",
                bottom: "-8px",
                border: "2px solid rgba(167,139,250,0.45)",
                borderRadius: "4px",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "4px",
                border: "2px solid rgba(167,139,250,0.3)",
                zIndex: 1,
              }}
            >
              <Image
                src="/profile.png"
                alt="Malavika"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "-14px",
                right: "-14px",
                width: "28px",
                height: "28px",
                backgroundColor: "#7c3aed",
                zIndex: 2,
              }}
            />
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <SocialLink href="mailto:you@email.com" label="Email">
              <EmailIcon />
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/akivalam" label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href="https://www.instagram.com/akivalam" label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://akivalam.substack.com" label="Substack" external>
              <SubstackIcon />
            </SocialLink>
          </div>
        </div>
      </main>
    </div>
  );
}

function PurpleButton({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <>
      <style>{`
        .purple-btn {
          display: block;
          width: 100%;
          padding: 16px 24px;
          background-color: #7c3aed;
          color: #ffffff;
          text-align: center;
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-decoration: none;
          border-radius: 6px;
          transition: background-color 0.15s ease, transform 0.1s ease;
        }
        .purple-btn:hover {
          background-color: #6d28d9;
        }
        .purple-btn:active {
          background-color: #5b21b6;
          transform: scale(0.98);
        }
      `}</style>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="purple-btn"
      >
        {children}
      </a>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external || href.startsWith("http") ? "_blank" : undefined}
      rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 6.037H2v2.138h20V6.037zm0 4.938H2v2.138h20v-2.138zM2 15.912v6.088l10-4.428 10 4.428v-6.088H2z" />
    </svg>
  );
}
