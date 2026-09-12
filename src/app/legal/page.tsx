import {
  Bot,
  FileCheck2,
  FileLock2,
  FileText,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/site/container";
import { FeatureCard } from "@/components/site/feature-card";
import { GovernanceVisual } from "@/components/site/governance-visual";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalNavBand } from "@/components/site/legal-document";
import { SectionHeading } from "@/components/site/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Legal and Governance Center",
  description:
    "Fairhelm Systems' indexed legal and governance center for privacy, website terms, acceptable use, AI, data processing, and security posture.",
  path: "/legal/",
});

const documents = [
  {
    icon: FileLock2,
    title: "Privacy policy",
    href: "/privacy/",
    description:
      "Website data, inquiries, customer ownership, AI-training boundaries, service providers, retention, and requests.",
  },
  {
    icon: Scale,
    title: "Website terms",
    href: "/terms/",
    description:
      "Public-site use, product-description limits, intellectual property, responsibility, and signed-agreement priority.",
  },
  {
    icon: FileCheck2,
    title: "Acceptable use",
    href: "/acceptable-use/",
    description:
      "Responsible use, prohibited conduct, security research, customer responsibilities, and response boundaries.",
  },
  {
    icon: Bot,
    title: "AI policy",
    href: "/ai-policy/",
    description:
      "AEGIS product direction, human oversight, customer-data controls, responsible design, and public AI agents.",
  },
  {
    icon: FileText,
    title: "Data processing",
    href: "/data-processing/",
    description:
      "The contractual questions to resolve before processing customer data. A public overview, not a signed DPA.",
  },
  {
    icon: ReceiptText,
    title: "Cancellation and refunds",
    href: "/refund-policy/",
    description:
      "Cancelling a subscription or engagement, what is refundable, how to request a refund, and how an approved refund is paid.",
  },
  {
    icon: ShieldCheck,
    title: "Security posture",
    href: "/security/",
    description:
      "RBAC, auditability, least privilege, tenant separation, privacy-first handling, and deliberate intelligence limits.",
  },
] as const;

export default function LegalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/" },
        ])}
      />
      <Hero
        eyebrow="Legal · Privacy · Governance"
        title="Legal clarity without the footer hunt."
        description="One indexed center for Fairhelm's public legal documents, security posture, data boundaries, and governed-intelligence commitments."
        primary={{ label: "Read privacy policy", href: "/privacy/" }}
        secondary={{ label: "Review security posture", href: "/security/" }}
        visualLabel={null}
      >
        <div className="panel p-2.5 sm:p-3">
          <GovernanceVisual
            nodes={[
              [170, 110, "PRIVACY"],
              [390, 110, "TERMS"],
              [280, 20, "AUP"],
              [280, 200, "DPA"],
            ]}
            chips={["Indexed", "Public posture", "Versioned"]}
          />
          <div className="flex items-center justify-between gap-4 px-3 pt-4 pb-2 sm:px-4">
            <div>
              <p className="eyebrow text-[0.6rem]">Public posture</p>
              <p className="mt-2 font-heading text-lg text-foreground">
                Authority should remain visible.
              </p>
            </div>
            <span className="chip">Indexed</span>
          </div>
        </div>
      </Hero>

      <LegalNavBand current="/legal/" />

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Legal center"
            title="Choose the document. Keep the context."
            description="Every document stays one tab away, with a section index for fast scanning on any screen."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {documents.map((document) => (
              <FeatureCard key={document.href} {...document} />
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-border bg-card p-5 text-sm leading-6 text-muted-foreground sm:p-6">
            <p className="eyebrow">Publishing entity</p>
            <p className="mt-2">
              {siteConfig.legalName} (CIN {siteConfig.cin}) is the legal entity
              operating as Fairhelm Systems, incorporated in India on{" "}
              {siteConfig.incorporationDateDisplay} under the Companies Act,
              2013 as a One Person Company, with its registered office at{" "}
              {siteConfig.address.full}. Every document below is published by
              that entity; a signed customer agreement takes precedence over
              these public pages for its own subject matter.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
