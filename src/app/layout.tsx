import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { ogImage } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { siteGraph } from "@/lib/structured-data";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: siteConfig.url },
  icons: {
    icon: [{ url: "/brand/fairhelm-logo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
  other: {
    "ai-content-declaration": absoluteUrl("/ai/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${manrope.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        {/*
          Pointer to the machine-readable company summary. `rel="describedby"`
          is the relation the llms.txt convention uses: /llms.txt describes
          this site without claiming to be an alternate representation of the
          page — `rel="alternate"` is reserved for the per-page Markdown,
          emitted through `alternates.types` in metadata.
        */}
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/*
          One entity graph on every page: the company (#org), this site
          (#website) and the SquareCampus product entity as published on
          squarecampus.com, with the relationship stated explicitly.
        */}
        <JsonLd data={siteGraph} />
        <a
          href="#main-content"
          className="fixed top-3 left-3 z-50 -translate-y-20 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
