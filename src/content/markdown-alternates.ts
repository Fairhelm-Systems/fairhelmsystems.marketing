/**
 * Pages that ship a Markdown alternate for agents.
 *
 * The Markdown is generated after `next build` by scripts/markdown-alternates.ts
 * from the rendered HTML of each page — the same source the browser gets, with
 * navigation, footer, forms and decorative or illustrative UI removed — so
 * there is no second hand-written copy to maintain. Each page here advertises
 * its alternate with `<link rel="alternate" type="text/markdown">` (see
 * lib/seo.ts), and /llms.txt links to the Markdown URL.
 *
 * URL convention: directory-style pages get `<path>index.md`; the home page
 * is `/index.md`.
 *
 * Keep this list to the pages a buyer or an agent evaluates from. Decorative
 * or low-value routes are not listed to inflate the count.
 */
export const markdownAlternatePaths = [
  "/",
  "/about/",
  "/squarecampus/",
  "/services/data-engineering/",
  "/services/dashboards/",
  "/security/",
  "/contact/",
  "/legal/",
  "/privacy/",
  "/terms/",
  "/ai/",
] as const;

export type MarkdownAlternatePath = (typeof markdownAlternatePaths)[number];

/** Normalise a route to the trailing-slash form the site serves. */
function normalise(path: string) {
  if (path === "" || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function hasMarkdownAlternate(path: string): boolean {
  return (markdownAlternatePaths as readonly string[]).includes(
    normalise(path),
  );
}

/** Site-relative Markdown URL for a route: `/about/` → `/about/index.md`. */
export function markdownAlternatePath(path: string): string {
  return `${normalise(path)}index.md`;
}
