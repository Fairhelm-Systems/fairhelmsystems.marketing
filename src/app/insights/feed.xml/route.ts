export const dynamic = "force-static";

import { getInsights, INSIGHTS_PATH } from "@/content/insights";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RSS 2.0 feed of the Insights articles, generated at build time. */
export function GET() {
  const posts = getInsights();
  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(post.path)}</link>
      <guid isPermaLink="true">${absoluteUrl(post.path)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <description>${escapeXml(post.description)}</description>
    </item>`,
    )
    .join("\n");
  const lastBuild = posts[0]
    ? new Date(`${posts[0].date}T00:00:00Z`).toUTCString()
    : new Date(0).toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} · Insights</title>
    <link>${absoluteUrl(INSIGHTS_PATH)}</link>
    <atom:link href="${absoluteUrl(`${INSIGHTS_PATH}feed.xml`)}" rel="self" type="application/rss+xml"/>
    <description>Practice notes on data engineering, decision systems and governance from ${escapeXml(siteConfig.name)}.</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
