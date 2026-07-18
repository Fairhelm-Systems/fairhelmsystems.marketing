import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalDocument } from "@/components/site/legal-document";
import { legalUpdated, termsSections } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Website Terms",
  description:
    "Interim terms for access to the Fairhelm Systems public website, including product-description limits, acceptable use, intellectual property, and signed agreements.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/" },
          { name: "Terms", path: "/terms/" },
        ])}
      />
      <Hero
        eyebrow="Legal · Interim terms"
        title="Website terms"
        description="Interim terms for the Fairhelm Systems public website. Contracted products and services are governed only by their signed agreements."
        compact
      />
      <LegalDocument
        current="/terms/"
        statusTitle="Interim terms status"
        statusDescription={`${siteConfig.legalName} is incorporated in India as a One Person Company. These public-site terms are a transparent interim position pending formal legal review and final statutory particulars.`}
        sections={termsSections}
        lastUpdated={legalUpdated}
      />
    </>
  );
}
