import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fairhelm Systems | Governed software systems",
    template: "%s | Fairhelm Systems",
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
    title: "Fairhelm Systems | Governed software systems",
    description: siteConfig.description,
    images: [
      {
        url: "/brand/fairhelm-og.png",
        width: 1200,
        height: 630,
        alt: "Fairhelm Systems — governed software systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairhelm Systems | Governed software systems",
    description: siteConfig.description,
    images: ["/brand/fairhelm-og.png"],
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
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <JsonLd data={[organizationSchema, websiteSchema]} />
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
