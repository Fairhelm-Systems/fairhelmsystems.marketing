export const siteConfig = {
  name: "Fairhelm Systems",
  legalName: "Fairhelm Systems (OPC) Pvt Ltd",
  incorporationStatus: "Incorporation in progress",
  gstinStatus: "Pending incorporation and registration",
  shortName: "Fairhelm",
  url: "https://fairhelmsystems.com",
  description:
    "Fairhelm Systems builds governed software systems, data pipelines, and operational intelligence for institutions that cannot afford chaos.",
  // Placeholder until the Fairhelm Systems mailbox is confirmed.
  contactEmail: "hello@fairhelmsystems.com",
  contactEmailIsPlaceholder: true,
  location: "India",
  product: {
    name: "SquareCampus",
    url: "/squarecampus/",
    description: "A sovereign, cycle-native School OS for Indian institutions.",
  },
  navigation: [
    { label: "SquareCampus", href: "/squarecampus/" },
    { label: "Data Engineering", href: "/services/data-engineering/" },
    { label: "Dashboards", href: "/services/dashboards/" },
    { label: "Security", href: "/security/" },
    { label: "About", href: "/about/" },
  ],
  legalNavigation: [
    { label: "Overview", href: "/legal/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Acceptable use", href: "/acceptable-use/" },
    { label: "AI policy", href: "/ai-policy/" },
    { label: "Data processing", href: "/data-processing/" },
    { label: "Security", href: "/security/" },
  ],
  publicPages: [
    "/",
    "/squarecampus/",
    "/services/data-engineering/",
    "/services/dashboards/",
    "/about/",
    "/contact/",
    "/legal/",
    "/privacy/",
    "/terms/",
    "/acceptable-use/",
    "/ai-policy/",
    "/data-processing/",
    "/security/",
    "/ai/",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
