import Parser from "rss-parser";
import fs from "fs";
import path from "path";

const SUBSTACK_URL = "https://akivalam.substack.com/feed";
const POSTS_DIR = path.join(process.cwd(), "content/posts");

const parser = new Parser({
  customFields: { item: ["content:encoded"] },
});

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toISODate(dateStr) {
  return new Date(dateStr).toISOString().split("T")[0];
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function htmlToMarkdown(html) {
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (_, inner) =>
      inner.replace(/<li[^>]*>(.*?)<\/li>/gis, (_, item) => `- ${stripHtml(item).trim()}\n`)
    )
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (_, inner) => {
      let i = 1;
      return inner.replace(/<li[^>]*>(.*?)<\/li>/gis, (_, item) => `${i++}. ${stripHtml(item).trim()}\n`);
    })
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, (_, inner) =>
      stripHtml(inner).trim().split("\n").map(l => `> ${l}`).join("\n") + "\n"
    )
    .replace(/<hr[^>]*\/?>/gi, "\n---\n")
    .replace(/<br[^>]*\/?>/gi, "\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gis, (_, inner) => `\n${inner.trim()}\n`)
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  console.log("Fetching Substack feed...");
  const feed = await parser.parseURL(SUBSTACK_URL);

  const existingFiles = fs.readdirSync(POSTS_DIR);
  const existingSlugs = new Set(existingFiles.map(f => f.replace(/\.md$/, "")));

  let added = 0;

  for (const item of feed.items) {
    const title = item.title || "Untitled";
    const date = toISODate(item.pubDate || new Date().toISOString());
    const slug = slugify(title);
    const content = item["content:encoded"] || item.contentSnippet || "";
    const markdown = htmlToMarkdown(content);
    const excerpt = stripHtml(content).slice(0, 200).replace(/\s+/g, " ").trim();

    // Check if any existing file contains this slug
    const alreadyExists = existingFiles.some(f => f.includes(slug));
    if (alreadyExists) {
      console.log(`  skipping: "${title}" (already exists)`);
      continue;
    }

    // Find next available number prefix
    const numbers = existingFiles
      .map(f => parseInt(f.split("-")[0]))
      .filter(n => !isNaN(n));
    const nextNum = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;

    const filename = `${nextNum}-${slug}.md`;
    const frontmatter = `---\ntitle: ${title}\ndate: ${date}\nexcerpt: ${excerpt}\n---\n\n`;

    fs.writeFileSync(path.join(POSTS_DIR, filename), frontmatter + markdown);
    console.log(`  added: ${filename}`);
    added++;
  }

  if (added === 0) {
    console.log("Nothing new to add.");
  } else {
    console.log(`\nDone! Added ${added} post${added > 1 ? "s" : ""}. Commit and push to deploy.`);
  }
}

main().catch(console.error);
