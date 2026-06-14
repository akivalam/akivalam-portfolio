import Nav from "../components/Nav";
import { getBooks, getCurrentlyReading, Book } from "../lib/books";
import ShelfSection, { YearGroup } from "./ShelfSection";

export const revalidate = 3600;

function groupByYear(books: Book[]): YearGroup[] {
  const map = new Map<number, Book[]>();
  for (const book of books) {
    if (!book.dateRead) continue;
    const year = Number(book.dateRead.split(' ').at(-1));
    if (isNaN(year)) continue;
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(book);
  }
  return Array.from(map.entries())
    .map(([year, books]) => ({ year, books }))
    .sort((a, b) => b.year - a.year);
}

export default async function BooksPage() {
  const [books, currentlyReading] = await Promise.all([
    getBooks(),
    getCurrentlyReading(),
  ]);

  const groups = groupByYear(books);
  const totalBooks = books.length;
  const yearCount = groups.length;
  const minYear = groups.length ? groups[groups.length - 1].year : new Date().getFullYear();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a0d36' }}>
      <Nav />

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 60px 100px',
        width: '100%',
      }}>

        {/* ── Header ── */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '40px',
          paddingBottom: '40px',
          marginBottom: '48px',
          borderBottom: '1px solid rgba(167,139,250,0.12)',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-dm-serif), serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 10px',
            }}>
              What I read
            </h1>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
            }}>
              Everything I&apos;ve read, arranged by the year it found me.
            </p>
          </div>

          {/* Stat trio */}
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {[
              { value: totalBooks, label: 'Books' },
              { value: yearCount, label: 'Years' },
              { value: minYear, label: 'Since' },
            ].map(({ value, label }, i) => (
              <div key={label} style={{
                paddingLeft: i > 0 ? '32px' : '0',
                borderLeft: i > 0 ? '1px solid rgba(167,139,250,0.15)' : 'none',
                marginLeft: i > 0 ? '32px' : '0',
              }}>
                <p style={{
                  fontFamily: 'var(--font-dm-serif), serif',
                  fontSize: '40px',
                  fontWeight: 400,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1,
                }}>
                  {value}
                </p>
                <p style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.35)',
                  margin: '6px 0 0',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ── Currently reading hero(es) ── */}
        {currentlyReading.length > 0 && (
          <div style={{ marginBottom: '56px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentlyReading.map((book) => (
              <div key={book.id} style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(167,139,250,0.25)',
                background: 'linear-gradient(105deg, rgba(58,38,92,0.6) 0%, rgba(33,21,58,0.7) 55%, rgba(26,16,46,0.8) 100%)',
                position: 'relative',
              }}>
                {/* Glow layer */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(60% 140% at 11% 50%, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0) 60%)',
                  animationName: 'glowPulse',
                  animationDuration: '6s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  pointerEvents: 'none',
                }} />

                {/* Inner content */}
                <div style={{
                  display: 'flex',
                  gap: '36px',
                  alignItems: 'center',
                  padding: '32px 40px',
                  flexWrap: 'wrap',
                  position: 'relative',
                }}>
                  {/* Cover */}
                  <a
                    href={book.goodreadsUrl || 'https://www.goodreads.com/akivalam'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', flexShrink: 0 }}
                  >
                    <div
                      className="currently-reading-cover"
                      style={{
                        width: '120px',
                        height: '180px',
                        borderRadius: '4px 6px 6px 4px',
                        overflow: 'hidden',
                        transform: 'rotate(-3deg)',
                        boxShadow: '0 26px 50px -12px rgba(0,0,0,0.65), -8px 0 18px -8px rgba(0,0,0,0.5)',
                        transition: 'transform .4s ease',
                        backgroundColor: 'rgba(167,139,250,0.1)',
                      }}
                    >
                      {book.coverUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                    </div>
                  </a>

                  {/* Meta */}
                  <div style={{ flex: '1 1 300px' }}>
                    <p style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.14em',
                      color: '#a78bfa',
                      margin: '0 0 12px',
                      textTransform: 'uppercase',
                    }}>
                      ● Currently reading
                    </p>
                    <h2 style={{
                      fontFamily: 'var(--font-dm-serif), serif',
                      fontSize: 'clamp(22px, 3vw, 32px)',
                      fontWeight: 400,
                      lineHeight: 1.1,
                      color: '#ffffff',
                      margin: '0 0 8px',
                    }}>
                      {book.title}
                    </h2>
                    <p style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.5)',
                      margin: 0,
                    }}>
                      {book.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Bookshelves ── */}
        <ShelfSection groups={groups} />

      </main>
    </div>
  );
}
