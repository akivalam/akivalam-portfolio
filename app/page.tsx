import Nav from "./components/Nav";
import Image from "next/image";
import Link from "next/link";

const entries = [
  { num: "01", label: "How I got here", desc: "The non-linear route and what it taught me.", href: "/timeline" },
  { num: "02", label: "How I work",     desc: "Process, principles, and how I ship.",          href: "/resume" },
  { num: "03", label: "How I think",    desc: "Notes, essays, and half-formed ideas.",          href: "/blog" },
  { num: "04", label: "What I read",    desc: "Books I've loved, and what I'm reading now.",    href: "/books" },
];

const socials = [
  { label: "Email",     href: "mailto:krishnaswamy.malavika@gmail.com", icon: <EmailIcon /> },
  { label: "LinkedIn",  href: "https://linkedin.com/in/akivalam",        icon: <LinkedInIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/akivalam",      icon: <InstagramIcon /> },
];

export default function Home() {
  return (
    <div className="home-page">
      <Nav />

      <main className="home-main-grid">
        {/* Left — text + index + socials */}
        <div className="home-left">
          <h1 className="home-h1">
            Hello,<br />
            I&apos;m <em style={{ fontStyle: "italic", color: "#b79be8" }}>Malavika</em>
          </h1>

          <p className="home-tagline">Runner. Builder. Problem solver.</p>

          <p className="home-desc">
            I build things that work and fix things that don&apos;t. Technical
            enough to go deep, businessy enough to see the full picture.
          </p>

          <div className="home-index">
            {entries.map((e) => (
              <Link key={e.num} href={e.href} className="home-index-entry">
                <span className="home-index-num">{e.num}</span>
                <span>
                  <span className="home-index-label">{e.label}</span>
                  <span className="home-index-desc">{e.desc}</span>
                </span>
                <span className="home-index-arrow">→</span>
              </Link>
            ))}
          </div>

          <div className="home-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="home-social-btn"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right — portrait */}
        <div className="home-portrait-wrap">
          <div className="home-portrait-ratio">
            <div className="home-portrait-accent-frame" />
            <div className="home-portrait-gold" />
            <div className="home-portrait-img">
              <Image
                src="/profile.png"
                alt="Malavika"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function EmailIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9.5h4V21H3zM10 9.5h3.8v1.6h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.74V21h-4v-4.9c0-1.17-.02-2.67-1.7-2.67-1.7 0-1.96 1.27-1.96 2.58V21H10z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
