import {
  BarChart3,
  Boxes,
  CloudCog,
  DatabaseZap,
  GraduationCap,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { MobileBrief } from "@/components/site/mobile-brief";
import { SectionHeading } from "@/components/site/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "About Fairhelm Systems",
  description:
    "Fairhelm Systems is a product-first technology company in India. It builds and operates SquareCampus, its School Operating System, and selectively takes on data engineering and operational dashboard work.",
  path: "/about/",
});

const capabilities = [
  {
    icon: GraduationCap,
    title: "SquareCampus",
    description:
      "The flagship product: a School Operating System for schools, universities, and multi-campus educational institutions, developed and operated by Fairhelm.",
    href: siteConfig.product.page,
  },
  {
    icon: DatabaseZap,
    title: "Data engineering",
    description:
      "ETL and ELT systems built around accuracy, reconciliation, observability, and accountable production refresh.",
  },
  {
    icon: BarChart3,
    title: "Operational intelligence",
    description:
      "Decision infrastructure that connects trusted metrics to drilldowns, exceptions, ownership, and action.",
  },
  {
    icon: CloudCog,
    title: "Platform engineering",
    description:
      "Product and platform engineering, taken on only where it clearly aligns with Fairhelm's data and product focus.",
  },
];

const mobileBriefs = [
  {
    label: "Company",
    title: "Systems that survive scrutiny",
    description:
      "Fairhelm starts with the operating reality, establishes authority, makes data defensible, and engineers predictable behavior under pressure.",
    bullets: ["Systems before screens", "Governance before automation"],
  },
  {
    label: "Capability",
    title: "Product, data, and platform depth",
    description:
      "SquareCampus product engineering, ETL/ELT systems, operational dashboards, and aligned platform engineering.",
    bullets: [
      "One operating standard across the stack",
      "Privacy and reliability by design",
    ],
  },
  {
    label: "Scope",
    title: "Product first. Services by exception.",
    description: siteConfig.services.summary,
    bullets: siteConfig.services.outOfScope.map(
      (item) => `Not offered: ${item}`,
    ),
    href: siteConfig.product.url,
    linkLabel: "Evaluate SquareCampus on squarecampus.com",
  },
  {
    label: "Execution",
    title: "Sharp diagnosis, explicit tradeoffs",
    description:
      "The objective is not maximum software. It is the minimum governed system that reliably advances operating maturity.",
    bullets: [
      "No premature automation",
      "No architecture more expensive than the problem",
    ],
    href: "/contact/",
    linkLabel: "Bring us the operating problem",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about/" },
        ])}
      />
      <Hero
        eyebrow="About Fairhelm Systems"
        title="A product-first technology company for serious operations."
        description="Fairhelm Systems builds and operates software products and governed data systems. Its flagship product is SquareCampus, a School Operating System for educational institutions. Alongside it, Fairhelm selectively takes on data engineering and dashboard work where reliability, privacy, and execution discipline are not negotiable."
        primary={{ label: "Work with Fairhelm", href: "/contact/" }}
        secondary={{ label: "Explore SquareCampus", href: "/squarecampus/" }}
      >
        <div className="rounded-3xl border border-border bg-card/75 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-foreground p-3 shadow-lg shadow-primary/5">
              <Image
                src="/brand/fairhelm-logo.svg"
                alt="Fairhelm Systems logo mark"
                width={562}
                height={892}
                className="h-full w-auto"
                priority
              />
            </div>
            <div>
              <p className="eyebrow">Built for governed execution</p>
              <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-foreground">
                Fairhelm Systems
              </p>
            </div>
          </div>
          <p className="mt-7 text-xl font-semibold text-foreground">
            {siteConfig.legalName}
          </p>
          <p className="mt-2 text-sm text-primary">
            {siteConfig.incorporationStatus}
          </p>
          <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            Registered office: {siteConfig.address.full}. GSTIN and statutory
            particulars are available on request.
          </p>
        </div>
      </Hero>

      <MobileBrief
        eyebrow="Fairhelm in brief"
        title="The company, without the biography."
        description="Open the part you need: company standard, capability, or execution model."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="The company"
            title="We build systems that survive scale, scrutiny, and boardrooms."
            description="The Fairhelm standard is simple: understand the operating reality, establish clear authority, make the data defensible, and engineer the system to behave predictably under pressure."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                Waypoints,
                "Systems before screens",
                "A polished interface cannot rescue weak process, ambiguous ownership, or unreliable data.",
              ],
              [
                ShieldCheck,
                "Governance before automation",
                "Automation should operate inside explicit authority, audit, and privacy boundaries.",
              ],
              [
                Boxes,
                "Products with operating context",
                "SquareCampus begins with the cycles and constraints of Indian educational institutions.",
              ],
              [
                CloudCog,
                "Engineering with economic judgment",
                "Architecture, service levels, and cloud cost should align to the value and risk of the workload.",
              ],
            ].map(([Icon, title, description]) => {
              const TypedIcon = Icon as typeof Waypoints;
              return (
                <div
                  key={String(title)}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <TypedIcon
                    aria-hidden="true"
                    className="size-5 text-primary"
                  />
                  <h3 className="mt-6 font-semibold text-foreground">
                    {String(title)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {String(description)}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Capability"
            title="Product thinking, data depth, and operating discipline in one room."
            description="Fairhelm works across the layers that determine whether an institutional system creates clarity or simply relocates chaos."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <FeatureCard key={capability.title} {...capability} />
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Scope"
            title="Product first. Services by exception."
            description={siteConfig.services.summary}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">
                Is Fairhelm a product company or a services company?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {siteConfig.positioning.is} It is not{" "}
                {siteConfig.positioning.isNot.join(", ")}.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">
                Who operates SquareCampus?
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {siteConfig.product.relationship} Institutions should evaluate
                it at{" "}
                <a
                  href={siteConfig.product.url}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  squarecampus.com
                </a>
                .
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">
                What engineering work does Fairhelm take on?
              </h3>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-muted-foreground">
                {siteConfig.services.lanes.map((lane) => (
                  <li key={lane.href}>
                    <Link
                      href={lane.href}
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {lane.name}
                    </Link>
                  </li>
                ))}
                <li>
                  Product or platform engineering where it clearly aligns with
                  that focus
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-semibold text-foreground">
                What is outside Fairhelm's scope?
              </h3>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-muted-foreground">
                {siteConfig.services.outOfScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="How we operate"
            title="Sharp diagnosis. Explicit tradeoffs. Disciplined execution."
          />
          <div className="grid gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              We are comfortable saying a requirement is premature, a metric is
              unsafe, an automation needs tighter control, or an architecture is
              more expensive than the problem justifies.
            </p>
            <p>
              The objective is not maximum software. It is the minimum governed
              system that can reliably carry the institution to the next level
              of operating maturity.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Bring the operating problem—not a pre-selected buzzword."
        description="We will help frame the system, the controls, the data, and the execution sequence that the outcome actually requires."
      />
    </>
  );
}
