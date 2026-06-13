import Nav from "../components/Nav";
import { getBooks } from "../lib/books";

function Stars({ rating }: { rating: number }) {
  if (rating === 0) return null;
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#a78bfa" : "none"}
          stroke={i <= rating ? "#a78bfa" : "rgba(167,139,250,0.25)"}
          strokeWidth="2"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default async function BooksPage() {
  const books = await getBooks();

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
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "64px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-dm-serif), serif",
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                margin: "0 0 8px",
                color: "#ffffff",
              }}
            >
              What I read
            </h1>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.35)",
                margin: 0,
              }}
            >
              {books.length} books
            </p>
          </div>
          <a
            href="https://www.goodreads.com/akivalam"
            target="_blank"
            rel="noopener noreferrer"
            className="subscribe-btn"
          >
            VIEW ON GOODREADS
          </a>
        </div>

        {books.length === 0 ? (
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            No books found.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {books.map((book, i) => (
              <a
                key={book.id}
                href={book.goodreadsUrl || "https://www.goodreads.com/akivalam"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    padding: "24px 0",
                    borderBottom: "1px solid rgba(167,139,250,0.12)",
                    borderTop:
                      i === 0 ? "1px solid rgba(167,139,250,0.12)" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                  }}
                >
                  {/* Cover */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: "52px",
                      height: "78px",
                      borderRadius: "3px",
                      overflow: "hidden",
                      backgroundColor: "rgba(167,139,250,0.08)",
                      border: "1px solid rgba(167,139,250,0.12)",
                    }}
                  >
                    {book.coverUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "24px",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "16px",
                            fontWeight: 500,
                            letterSpacing: "-0.01em",
                            color: "rgba(255,255,255,0.85)",
                            margin: "0 0 4px",
                            lineHeight: 1.3,
                          }}
                        >
                          {book.title}
                        </h2>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.38)",
                            margin: "0 0 8px",
                          }}
                        >
                          {book.author}
                        </p>
                        <Stars rating={book.rating} />
                        {book.review && (
                          <p
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "13px",
                              lineHeight: 1.65,
                              color: "rgba(255,255,255,0.45)",
                              margin: "10px 0 0",
                              fontStyle: "italic",
                            }}
                          >
                            &ldquo;
                            {book.review.length > 200
                              ? book.review.slice(0, 200) + "…"
                              : book.review}
                            &rdquo;
                          </p>
                        )}
                      </div>

                      <div
                        style={{
                          flexShrink: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "8px",
                        }}
                      >
                        {book.dateRead && (
                          <span
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "12px",
                              color: "rgba(255,255,255,0.3)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {book.dateRead}
                          </span>
                        )}
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
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
