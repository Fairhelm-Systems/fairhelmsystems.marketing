import {
  ArrowUpRight,
  Bot,
  FileCheck2,
  FileLock2,
  FileText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { GovernanceVisual } from "@/components/site/governance-visual";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalNavBand } from "@/components/site/legal-document";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      >
        <div className="rounded-3xl border border-border bg-card/75 p-5 shadow-2xl backdrop-blur sm:p-7">
          <GovernanceVisual
            nodes={[
              [170, 110, "PRIVACY"],
              [390, 110, "TERMS"],
              [280, 20, "AUP"],
              [280, 200, "DPA"],
            ]}
            chips={["Indexed", "Public posture", "Versioned"]}
          />
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Public posture</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                Authority should remain visible.
              </p>
            </div>
            <span className="rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[0.65rem] text-primary uppercase">
              Indexed
            </span>
          </div>
        </div>
      </Hero>

      <LegalNavBand current="/legal/" />

      <section className="py-14 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Legal center"
            title="Choose the document. Keep the context."
            description="Every document stays one tab away, with a desktop section index and compact mobile disclosure for fast scanning."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {documents.map(({ icon: Icon, ...document }) => (
              <Card key={document.href} className="h-full">
                <CardHeader>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-4" />
                  </div>
                  <CardTitle>{document.title}</CardTitle>
                  <CardDescription>{document.description}</CardDescription>
                  <CardAction>
                    <Link
                      href={document.href}
                      aria-label={`Open ${document.title}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </Link>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-card/55 p-5 text-sm leading-6 text-muted-foreground sm:p-6">
            <p className="font-semibold text-foreground">Interim status</p>
            <p className="mt-2">
              {siteConfig.legalName} is the legal entity operating as Fairhelm
              Systems, incorporated in India as a One Person Company. These
              public documents are written to state responsible boundaries now;
              they require formal legal review before material collection,
              production processing, or customer contracting.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
