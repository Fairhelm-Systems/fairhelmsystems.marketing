import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

// We *want* to be crawled, indexed, and cited. With a small team, discovery via
// search engines and AI answer/recommendation engines is leverage, not a risk —
// so nothing is disallowed and the major agents are named explicitly to make
// the welcome unambiguous (several default to blocked unless a site opts in).
const welcomedAgents = [
  "*",
  // Search engines
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "Slurp",
  "DuckDuckBot",
  "YandexBot",
  "Applebot",
  // AI training / answer / recommendation engines
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Amazonbot",
  "Applebot-Extended",
  "cohere-ai",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: welcomedAgents.map((userAgent) => ({ userAgent, allow: "/" })),
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
