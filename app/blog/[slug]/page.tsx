import Nav from "../../components/Nav";
import { getPosts, getPost, renderMarkdown } from "../../lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  const posts = getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.content);

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
          maxWidth: "760px",
          margin: "0 auto",
          padding: "48px 40px 100px",
          width: "100%",
        }}
      >
        {/* Back link */}
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            color: "#a78bfa",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "40px",
            opacity: 0.8,
          }}
        >
          ← All posts
        </Link>

        {/* Post header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.35)",
              margin: "0 0 16px",
              letterSpacing: "0.04em",
            }}
          >
            {formatDate(post.date)}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "rgba(255,255,255,0.9)",
              margin: 0,
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(167,139,250,0.15)",
            marginBottom: "48px",
          }}
        />

        {/* Post content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <style>{`
        .post-content {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.75);
        }
        .post-content p {
          margin: 0 0 1.4em;
        }
        .post-content h1,
        .post-content h2,
        .post-content h3 {
          font-family: var(--font-dm-serif), serif;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin: 1.8em 0 0.6em;
          line-height: 1.2;
        }
        .post-content h1 { font-size: 36px; }
        .post-content h2 { font-size: 28px; }
        .post-content h3 { font-size: 22px; }
        .post-content a {
          color: #a78bfa;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .post-content strong {
          color: #ffffff;
          font-weight: 600;
        }
        .post-content em {
          font-style: italic;
        }
        .post-content ul,
        .post-content ol {
          padding-left: 1.5em;
          margin: 0 0 1.4em;
        }
        .post-content li {
          margin-bottom: 0.4em;
        }
        .post-content blockquote {
          border-left: 3px solid #7c3aed;
          margin: 1.6em 0;
          padding: 0.4em 0 0.4em 1.2em;
          color: rgba(255, 255, 255, 0.55);
          font-style: italic;
        }
        .post-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.6em 0;
          display: block;
        }
        .post-content hr {
          border: none;
          border-top: 1px solid rgba(167, 139, 250, 0.15);
          margin: 2em 0;
        }
        .post-content pre,
        .post-content code {
          font-family: monospace;
          font-size: 14px;
          background: rgba(124, 58, 237, 0.12);
          border-radius: 4px;
          padding: 2px 6px;
          color: #c4b5fd;
        }
        .post-content pre {
          padding: 16px 20px;
          overflow-x: auto;
          margin: 1.4em 0;
        }
        .post-content pre code {
          background: none;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
