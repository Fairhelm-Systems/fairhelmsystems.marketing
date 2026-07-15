import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalDocument } from "@/components/site/legal-document";
import { dataProcessingSections, legalUpdated } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Data Processing Overview",
  description:
    "A public overview of Fairhelm Systems' intended approach to documented processing instructions, customer responsibilities, subprocessors, retention, and engagement-specific DPAs.",
  path: "/data-processing/",
});

export default function DataProcessingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/" },
          { name: "Data processing", path: "/data-processing/" },
        ])}
      />
      <Hero
        eyebrow="Legal · Data governance"
        title="Data processing overview"
        description="A public view of the contractual questions Fairhelm expects to answer before processing customer personal data. This page is not itself a Data Processing Addendum."
        compact
      />
      <LegalDocument
        current="/data-processing/"
        statusTitle="Public overview — not a signed DPA"
        statusDescription={`${siteConfig.legalName} is currently in the incorporation process. Binding roles, instructions, controls, locations, providers, assistance, and retention must be defined for the specific engagement.`}
        sections={dataProcessingSections}
        lastUpdated={legalUpdated}
      />
    </>
  );
}
