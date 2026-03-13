import Parser from "rss-parser";

type CustomItem = {
  "content:encoded": string;
  "content:encodedSnippet": string;
};

const parser = new Parser<Record<string, unknown>, CustomItem>({
  customFields: {
    item: ["content:encoded", "content:encodedSnippet"],
  },
});

export type Post = {
  title: string;
  date: string;
  slug: string;
  content: string;
  snippet: string;
};

export async function getPosts(): Promise<Post[]> {
  const feed = await parser.parseURL("https://akivalam.substack.com/feed");
  return feed.items.map((item) => ({
    title: item.title || "",
    date: item.pubDate || "",
    slug: item.link?.split("/p/")[1]?.replace(/\/$/, "") || "",
    content: item["content:encoded"] || "",
    snippet: item.contentSnippet?.slice(0, 200) || "",
  }));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
