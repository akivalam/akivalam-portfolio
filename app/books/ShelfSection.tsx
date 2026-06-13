'use client';

import { useState } from 'react';
import { Book } from '../lib/books';

export type YearGroup = { year: number; books: Book[] };

const SPINE_COLORS = [
  '#3f6b62', '#7a3b42', '#b8893f', '#4a6b3f', '#46587a', '#a5563f',
  '#6b4570', '#c3b79c', '#565568', '#7a7642', '#8a4a32', '#384a6e',
  '#9c8a52', '#5a3a55', '#4d7a72', '#a06a3a',
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function spineColor(id: string) { return SPINE_COLORS[hash(id) % SPINE_COLORS.length]; }
function spineHeight(id: string) { return 84 + (hash(id + 'h') % 51); }
function spineWidth(id: string) { return 10 + (hash(id + 'w') % 7); }
function showFoil(id: string) { return hash(id + 'f') % 100 < 58; }

type PopoverState = { book: Book; x: number; y: number } | null;

function StarsMini({ rating }: { rating: number }) {
  if (!rating) return null;
  return (
    <div style={{ display: 'flex', gap: '2px', marginTop: '6px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="9" height="9" viewBox="0 0 24 24"
          fill={i <= rating ? '#a78bfa' : 'none'}
          stroke={i <= rating ? '#a78bfa' : 'rgba(167,139,250,0.25)'}
          strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function ShelfSection({ groups }: { groups: YearGroup[] }) {
  const [popover, setPopover] = useState<PopoverState>(null);

  return (
    <div style={{ marginTop: '72px', position: 'relative' }}>
      {/* Section header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '8px',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-dm-serif), serif',
          fontSize: '26px',
          fontWeight: 400,
          color: '#ffffff',
          margin: 0,
        }}>
          By the year
        </h2>
        <span style={{
          fontFamily: 'var(--font-dm-sans), sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>
          Each spine = one book
        </span>
      </div>

      {/* Year rows */}
      {groups.map(({ year, books }) => (
        <div key={year} style={{
          display: 'flex',
          gap: '36px',
          alignItems: 'flex-end',
          padding: '30px 0 14px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          {/* Year meta */}
          <div style={{ flex: '0 0 132px', paddingBottom: '18px' }}>
            <p style={{
              fontFamily: 'var(--font-dm-serif), serif',
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 0.9,
              color: '#ffffff',
              margin: 0,
            }}>
              {year}
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.38)',
              marginTop: '10px',
              marginBottom: 0,
            }}>
              {books.length} {books.length === 1 ? 'book' : 'books'}
            </p>
          </div>

          {/* Shelf */}
          <div style={{ flex: 1, overflowX: 'auto' }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '4px',
              height: '138px',
              minWidth: 'max-content',
            }}>
              {books.map((book) => (
                <a
                  key={book.id}
                  href={book.goodreadsUrl || 'https://www.goodreads.com/akivalam'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="spine"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setPopover({ book, x: rect.left + rect.width / 2, y: rect.top });
                  }}
                  onMouseLeave={() => setPopover(null)}
                  style={{
                    flex: '0 0 auto',
                    width: `${spineWidth(book.id)}px`,
                    height: `${spineHeight(book.id)}px`,
                    borderRadius: '2px 2px 1px 1px',
                    backgroundColor: spineColor(book.id),
                    backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.02) 18%, rgba(0,0,0,0.10) 75%, rgba(0,0,0,0.26) 100%)',
                    boxShadow: '0 8px 16px -6px rgba(0,0,0,0.45)',
                    cursor: 'pointer',
                    transition: 'transform .25s cubic-bezier(.2,.8,.2,1), filter .25s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: showFoil(book.id) ? '16px' : '0',
                    gap: '3px',
                  }}
                >
                  {showFoil(book.id) && (
                    <>
                      <div style={{ width: '62%', height: '2px', background: 'rgba(255,255,255,0.42)', borderRadius: '1px' }} />
                      <div style={{ width: '46%', height: '2px', background: 'rgba(255,255,255,0.28)', borderRadius: '1px' }} />
                    </>
                  )}
                </a>
              ))}
            </div>
            {/* Ledge */}
            <div style={{
              height: '7px',
              borderRadius: '2px',
              background: 'linear-gradient(180deg, #3a2a5c 0%, #22153f 100%)',
              boxShadow: '0 10px 22px -6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
            }} />
          </div>
        </div>
      ))}

      {/* Hover popover */}
      {popover && (
        <div style={{
          position: 'fixed',
          left: popover.x,
          top: popover.y - 16,
          transform: 'translate(-50%, -100%)',
          zIndex: 100,
          background: 'rgba(21, 12, 39, 0.97)',
          border: '1px solid rgba(167,139,250,0.22)',
          borderRadius: '10px',
          padding: '12px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          maxWidth: '220px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          pointerEvents: 'none',
        }}>
          {popover.book.coverUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={popover.book.coverUrl}
              alt={popover.book.title}
              style={{ width: '48px', height: '72px', objectFit: 'cover', borderRadius: '3px', flexShrink: 0 }}
            />
          )}
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: '#f3edf9',
              margin: '0 0 3px',
              lineHeight: 1.3,
            }}>
              {popover.book.title}
            </p>
            <p style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              color: '#9a85c4',
              margin: 0,
            }}>
              {popover.book.author}
            </p>
            <StarsMini rating={popover.book.rating} />
          </div>
        </div>
      )}
    </div>
  );
}
