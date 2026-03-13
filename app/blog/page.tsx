import Nav from "../components/Nav";
import { getPosts } from "../lib/posts";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const posts = getPosts();

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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 60px 100px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            margin: "0 0 64px",
            color: "#ffffff",
          }}
        >
          How I think
        </h1>

        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            No posts yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    padding: "32px 0",
                    borderBottom: "1px solid rgba(167,139,250,0.12)",
                    borderTop:
                      i === 0 ? "1px solid rgba(167,139,250,0.12)" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "40px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "18px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "rgba(255,255,255,0.85)",
                        margin: "0 0 10px",
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--font-dm-sans), sans-serif",
                          fontSize: "15px",
                          lineHeight: 1.65,
                          color: "rgba(255,255,255,0.5)",
                          margin: 0,
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.3)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(post.date)}
                    </span>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#a78bfa",
                        opacity: 0.6,
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
