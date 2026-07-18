import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalDocument } from "@/components/site/legal-document";
import { legalUpdated, privacySections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Interim privacy notice for the Fairhelm Systems website, inquiries, customer data, AI training boundaries, retention, and institutional data handling.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/" },
          { name: "Privacy", path: "/privacy/" },
        ])}
      />
      <Hero
        eyebrow="Legal · Interim notice"
        title="Privacy policy"
        description="A plain-language interim notice for the Fairhelm Systems public website. Product and customer engagements require contract-specific privacy and data-processing terms."
        compact
      />
      <LegalDocument
        current="/privacy/"
        statusTitle="Interim policy status"
        statusDescription={`${siteConfig.legalName} is incorporated in India as a One Person Company. This public notice is a responsible interim position, not a substitute for formal legal review before material personal-data collection or production processing begins.`}
        sections={privacySections}
        lastUpdated={legalUpdated}
      />
    </>
  );
}
