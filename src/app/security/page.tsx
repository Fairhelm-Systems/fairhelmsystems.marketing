import {
  BadgeCheck,
  BetweenHorizontalStart,
  Eye,
  FileClock,
  KeyRound,
  LockKeyhole,
  ScanEye,
  ShieldCheck,
} from "lucide-react";
import { AnimatedSystemIllustration } from "@/components/site/animated-system-illustration";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { LegalNavBand } from "@/components/site/legal-document";
import { MobileBrief } from "@/components/site/mobile-brief";
import { SectionHeading } from "@/components/site/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Security and Governance Posture",
  description:
    "Fairhelm Systems' security posture covers RBAC, auditability, least privilege, tenant separation, secure cloud deployment, and privacy-first data handling.",
  path: "/security/",
});

const principles = [
  {
    icon: KeyRound,
    title: "Role-based access control",
    description:
      "Access should follow explicit roles, scopes, and responsibilities rather than convenience or broad defaults.",
  },
  {
    icon: FileClock,
    title: "Auditability",
    description:
      "Material actions and sensitive interactions should produce intelligible, reviewable records.",
  },
  {
    icon: LockKeyhole,
    title: "Least privilege",
    description:
      "People, services, and automation receive only the access necessary for the approved operating purpose.",
  },
  {
    icon: BetweenHorizontalStart,
    title: "Tenant separation",
    description:
      "Customer and institutional boundaries are treated as architectural concerns, not naming conventions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure cloud deployment",
    description:
      "Encryption, controlled network paths, managed secrets, monitored services, and recoverable operations guide deployments.",
  },
  {
    icon: ScanEye,
    title: "Privacy-first handling",
    description:
      "Collection, use, retention, sharing, and deletion should remain proportionate, explicit, and governed.",
  },
];

const mobileBriefs = [
  {
    label: "Access and evidence",
    title: "Governed by design",
    description:
      "Role-based access, least privilege, auditability, tenant separation, secure cloud deployment, and privacy-first handling define the posture.",
    bullets: [
      "Explicit scopes instead of broad defaults",
      "Material action should leave an intelligible record",
    ],
  },
  {
    label: "Customer data",
    title: "Data is not inventory",
    description:
      "Schools and trusts retain ownership. Fairhelm operates only inside the agreed service and processing scope.",
    bullets: [
      "No selling student or parent data",
      "No AI training on customer data by default",
    ],
  },
  {
    label: "AEGIS",
    title: "Deliberate intelligence limits",
    description:
      "AEGIS is read-only first, RBAC-aware, audit-backed, and explainable, with autonomous writes outside the v1 posture.",
    bullets: [
      "Human approval remains decisive",
      "This posture is not a fake certification claim",
    ],
    href: "/contact/",
    linkLabel: "Discuss governance requirements",
  },
] as const;

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Security", path: "/security/" },
        ])}
      />
      <Hero
        eyebrow="Security · Privacy · Governance"
        title="Trust is an architecture, not a badge."
        description="Fairhelm Systems approaches security through explicit authority, least privilege, auditable action, protected data boundaries, and cloud operations designed to remain predictable under scrutiny."
        primary={{ label: "Discuss security requirements", href: "/contact/" }}
        secondary={{ label: "Read privacy posture", href: "/privacy/" }}
      >
        <div className="rounded-3xl border border-border bg-card/75 p-6 shadow-2xl backdrop-blur sm:p-8">
          <AnimatedSystemIllustration variant="governance" className="mb-6" />
          <BadgeCheck aria-hidden="true" className="size-8 text-primary" />
          <p className="mt-7 text-xl font-semibold text-foreground">
            Posture over performance
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We describe the controls we intend to design and operate. We do not
            present unearned certifications, generic badges, or contractual
            assurances on a public marketing page.
          </p>
        </div>
      </Hero>

      <LegalNavBand current="/security/" />

      <MobileBrief
        eyebrow="Security in brief"
        title="Choose the trust question."
        description="Open the control area you need without reading a wall of security copy."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Core principles"
            title="Governed access. Traceable action. Clear data boundaries."
            description="The exact control set depends on product maturity, deployment scope, customer requirements, and contract. These principles define the direction of travel."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <FeatureCard key={principle.title} {...principle} />
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="SquareCampus data commitments"
            title="Student, parent, and institutional data are not inventory."
            description="Our product posture starts from customer ownership and explicit permission."
          />
          <div className="grid gap-4">
            {[
              [
                "No selling student or parent data",
                "Fairhelm does not treat personal or institutional data as a hidden monetization stream.",
              ],
              [
                "No training AI on customer data by default",
                "Customer data will not be used to train AI systems unless that use is explicitly contracted and governed.",
              ],
              [
                "Customer data belongs to the school or trust",
                "The customer retains ownership; Fairhelm acts only within the agreed service and processing scope.",
              ],
              [
                "No governance bypass",
                "Intelligence and automation are designed to respect role, scope, approval, and audit requirements.",
              ],
            ].map(([title, description], index) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-border bg-background/55 p-5"
              >
                <span className="font-mono text-xs text-primary">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="AEGIS controls"
              title="Governed intelligence begins with deliberate limits."
              description="The AEGIS product direction is read-only first, RBAC-aware, audit-backed, and explainable. Autonomous writes are outside the v1 posture."
            />
          </div>
          <Alert>
            <Eye />
            <AlertTitle>No fake compliance claims</AlertTitle>
            <AlertDescription>
              This page is a public security and governance posture. It is not a
              certification, audit report, data processing agreement, security
              addendum, or warranty. Contract-specific controls must be
              documented in the relevant agreement.
            </AlertDescription>
          </Alert>
        </Container>
      </section>

      <CtaBand
        title="Bring security into the system conversation early."
        description="Share the data classification, roles, deployment constraints, audit needs, and customer obligations before architecture hardens."
        label="Discuss governance requirements"
      />
    </>
  );
}
