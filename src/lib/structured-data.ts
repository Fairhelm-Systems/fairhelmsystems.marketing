import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  logo: absoluteUrl("/brand/fairhelm-logo.svg"),
  description: siteConfig.description,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "School operating systems",
    "ETL and ELT pipelines",
    "Operational intelligence",
    "Custom dashboards",
    "Data governance",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { "@id": `${siteConfig.url}/#organization` },
  inLanguage: "en-IN",
};

export const squareCampusSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SquareCampus",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "School operating system",
  operatingSystem: "Web",
  url: absoluteUrl("/squarecampus/"),
  description:
    "SquareCampus is Fairhelm Systems' sovereign, cycle-native School OS for Indian schools, multi-school groups, and educational trusts.",
  creator: { "@id": `${siteConfig.url}/#organization` },
  featureList: [
    "Cycle-native school operations",
    "Role-aware workflows",
    "Trust governance",
    "Auditability",
    "AEGIS governed intelligence",
  ],
};

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
