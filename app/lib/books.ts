import Parser from 'rss-parser';

export type Book = {
  id: string;
  title: string;
  author: string;
  rating: number;
  dateRead: string;
  coverUrl: string;
  review: string;
  goodreadsUrl: string;
};

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  authorName: string;
  bookId: string;
  userRating: string;
  userReadAt: string;
  userReview: string;
};

const GOODREADS_USER_ID = '57996253';

function extractCoverUrl(html: string): string {
  const match = html.match(/src="(https?:\/\/[^"]*i\.gr-assets\.com[^"]*)"/);
  if (!match) return '';
  return match[1].replace(/\._S[XY]\d+_/, '._SY475_');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

function formatDateRead(raw: string): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

async function fetchPage(page: number): Promise<Book[]> {
  const parser = new Parser<Record<string, never>, FeedItem>({
    customFields: {
      item: [
        ['author_name', 'authorName'],
        ['book_id', 'bookId'],
        ['user_rating', 'userRating'],
        ['user_read_at', 'userReadAt'],
        ['user_review', 'userReview'],
      ],
    },
  });

  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=read&page=${page}`;

  try {
    const feed = await parser.parseURL(url);
    if (!feed.items.length) return [];

    return feed.items.map((item) => ({
      id: item.bookId || `${page}-${item.title}`,
      title: item.title || '',
      author: item.authorName || '',
      rating: parseInt(item.userRating || '0', 10),
      dateRead: formatDateRead(item.userReadAt || item.pubDate || ''),
      coverUrl: extractCoverUrl(item.content || ''),
      review: stripHtml(item.userReview || ''),
      goodreadsUrl: item.link || '',
    }));
  } catch {
    return [];
  }
}

export async function getBooks(): Promise<Book[]> {
  const [page1, page2] = await Promise.all([fetchPage(1), fetchPage(2)]);
  return [...page1, ...page2];
}

export async function getCurrentlyReading(): Promise<Book[]> {
  const parser = new Parser<Record<string, never>, FeedItem>({
    customFields: {
      item: [
        ['author_name', 'authorName'],
        ['book_id', 'bookId'],
        ['user_rating', 'userRating'],
        ['user_read_at', 'userReadAt'],
        ['user_review', 'userReview'],
      ],
    },
  });

  const url = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=currently-reading`;

  try {
    const feed = await parser.parseURL(url);
    if (!feed.items.length) return [];

    return feed.items.map((item) => ({
      id: item.bookId || item.title,
      title: item.title || '',
      author: item.authorName || '',
      rating: 0,
      dateRead: '',
      coverUrl: extractCoverUrl(item.content || ''),
      review: '',
      goodreadsUrl: item.link || '',
    }));
  } catch {
    return [];
  }
}
