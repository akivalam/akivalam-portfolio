import Link from "next/link";

export default function Nav({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "20px 24px" : "28px 60px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-dm-serif), serif",
          fontStyle: "italic",
          fontSize: "20px",
          fontWeight: 400,
          color: "#ffffff",
          textDecoration: "none",
          letterSpacing: "-0.02em",
          opacity: 0.9,
        }}
      >
        akivalam
      </Link>

      <div style={{ display: "flex", gap: isMobile ? "20px" : "36px", alignItems: "center", flexWrap: "wrap" }}>
        {[
          { label: "How I got here", href: "/timeline" },
          { label: "How I work", href: "/resume" },
          { label: "How I think", href: "/blog" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
