import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.publicPages.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-07-15"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/squarecampus/" ? 0.9 : 0.7,
  }));
}
