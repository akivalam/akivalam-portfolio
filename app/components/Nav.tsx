import Link from "next/link";

export default function Nav() {
  return (
    <>
    <style>{`
      .nav-link {
        display: inline-block;
        position: relative;
        color: rgba(255,255,255,0.6);
        text-decoration: none;
        transition: color 0.15s ease;
      }
      .nav-link::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 1.5px;
        background-color: #a78bfa;
        transition: width 0.2s ease;
      }
      .nav-link:hover {
        color: rgba(255,255,255,0.95);
      }
      .nav-link:hover::after {
        width: 100%;
      }
      .nav-link:active {
        color: #a78bfa;
      }
    `}</style>
    <nav className="nav">
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

      <div className="nav-links">
        {[
          { label: "How I got here", href: "/timeline" },
          { label: "How I work", href: "/resume" },
          { label: "How I think", href: "/blog" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="nav-link"
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
    </>
  );
}
