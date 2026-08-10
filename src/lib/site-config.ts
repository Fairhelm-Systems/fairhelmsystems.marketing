export const siteConfig = {
  name: "Fairhelm Systems",
  legalName: "FAIRHELM SYSTEMS (OPC) PRIVATE LIMITED",
  // Title-case rendering of the legal name, for running prose and the
  // copyright line where the all-caps MCA form would read as shouting.
  legalNameDisplay: "Fairhelm Systems (OPC) Private Limited",
  // Corporate Identity Number allotted by the MCA. Required on business
  // letters, billheads and all public notices under s.12(3)(c) of the
  // Companies Act, 2013.
  cin: "U62099KA2026OPC225579",
  incorporationDate: "2026-08-05",
  incorporationDateDisplay: "5 August 2026",
  incorporationStatus:
    "Incorporated in India on 5 August 2026 under the Companies Act, 2013 · One Person Company",
  gstinStatus: "Statutory registration particulars available on request",
  trademarkNotice:
    "SquareCampus™ is a trademark (registration pending) of Fairhelm Systems (OPC) Private Limited.",
  shortName: "Fairhelm",
  url: "https://fairhelmsystems.com",
  description:
    "Fairhelm Systems builds governed software systems, data pipelines, and operational intelligence for institutions where reliability is non-negotiable.",
  contactEmail: "hello@fairhelmsystems.com",
  contactEmailIsPlaceholder: false,
  // Statutory contact telephone. Left empty until a line is provisioned; every
  // surface that renders it (footer, /contact, Organization JSON-LD) omits the
  // row while it is empty rather than publishing a placeholder number.
  phone: "" as string,
  // Grievance channel for Data Principal requests under the DPDP Act, 2023.
  // Addressed to the office, not to a named individual.
  grievanceEmail: "hello@fairhelmsystems.com",
  grievanceContactName:
    "Grievance Officer, Fairhelm Systems (OPC) Private Limited",
  // Contact-handling endpoint (API Gateway → Lambda → SquareCampus CRM). Empty
  // until the CRM proxy is deployed with platform credentials; while empty, the
  // inquiry form falls back to opening the visitor's mail client via mailto.
  contactEndpoint: "",
  location: "India",
  // Registered office (MCA). Display uses `full`; the structured fields feed the
  // PostalAddress in the Organization JSON-LD and any future contact markup.
  address: {
    full: "No. 33, 4th Floor, 1st Main, Road 3, Ganganagar, R T Nagar, Bangalore North, Bangalore – 560032, Karnataka, India",
    street:
      "No. 33, 4th Floor, 1st Main, Road 3, Ganganagar, R T Nagar, Bangalore North",
    locality: "Bangalore",
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
    { label: "Refunds", href: "/refund-policy/" },
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
    "/refund-policy/",
    "/security/",
    "/ai/",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
