"use client";

import Nav from "./components/Nav";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a0d36",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav isMobile={isMobile} />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "32px 24px 48px" : "40px 60px 60px",
          width: "100%",
          gap: isMobile ? "40px" : "80px",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Left — text + buttons */}
        <div style={{ flex: isMobile ? "unset" : "0 1 480px", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif), serif",
              fontSize: isMobile ? "52px" : "clamp(56px, 6vw, 84px)",
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
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 36px",
              maxWidth: isMobile ? "100%" : "400px",
            }}
          >
            I build things that work and fix things that don&apos;t. Technical
            enough to go deep, businessy enough to see the full picture.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <PurpleButton href="/timeline">HOW I GOT HERE</PurpleButton>
            <PurpleButton href="/resume">HOW I WORK</PurpleButton>
            <PurpleButton href="/blog">
              HOW I THINK
            </PurpleButton>
          </div>
        </div>

        {/* Right — photo + social */}
        <div
          style={{
            flex: isMobile ? "unset" : "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            width: isMobile ? "100%" : "auto",
          }}
        >
          {/* Photo frame */}
          <div
            style={{
              position: "relative",
              width: isMobile ? "260px" : "340px",
              height: isMobile ? "300px" : "460px",
            }}
          >
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
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "block",
        width: "100%",
        padding: "16px 24px",
        backgroundColor: "#7c3aed",
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "13px",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textDecoration: "none",
        borderRadius: "6px",
      }}
    >
      {children}
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
