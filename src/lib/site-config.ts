export const siteConfig = {
  name: "Fairhelm Systems",
  legalName: "Fairhelm Systems (OPC) Private Limited",
  incorporationStatus: "Incorporated in India · One Person Company",
  gstinStatus: "Statutory registration particulars available on request",
  shortName: "Fairhelm",
  url: "https://fairhelmsystems.com",
  description:
    "Fairhelm Systems builds governed software systems, data pipelines, and operational intelligence for institutions where reliability is non-negotiable.",
  contactEmail: "hello@fairhelmsystems.com",
  contactEmailIsPlaceholder: false,
  // Contact-handling endpoint (API Gateway → Lambda → SquareCampus CRM). Empty
  // until the CRM proxy is deployed with platform credentials; while empty, the
  // inquiry form falls back to opening the visitor's mail client via mailto.
  contactEndpoint: "",
  location: "India",
  // Registered office (MCA). Display uses `full`; the structured fields feed the
  // PostalAddress in the Organization JSON-LD and any future contact markup.
  address: {
    full: "No. 33, 4th Floor, 1st Main, Ganganagar Gramatana, HMT Layout, CBI Road, Bengaluru – 560032",
    street:
      "No. 33, 4th Floor, 1st Main, Ganganagar Gramatana, HMT Layout, CBI Road",
    locality: "Bengaluru",
    region: "Karnataka",
    postalCode: "560032",
    country: "IN",
  },
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
