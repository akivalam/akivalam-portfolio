import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        akivalam
      </Link>

      <div className="nav-links">
        {[
          { label: "How I got here", href: "/timeline" },
          { label: "How I work", href: "/resume" },
          { label: "How I think", href: "/blog" },
          { label: "What I read", href: "/books" },
        ].map(({ label, href }) => (
          <Link key={label} href={href} className="nav-link">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
