import {
  BarChart3,
  Blocks,
  Building2,
  Check,
  CloudCog,
  DatabaseZap,
  Eye,
  Gauge,
  GraduationCap,
  IndianRupee,
  LockKeyhole,
  Network,
  Scale,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { MobileBrief } from "@/components/site/mobile-brief";
import { SectionHeading } from "@/components/site/section-heading";
import { SystemPanel } from "@/components/site/system-panel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: `Fairhelm Systems — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

const credibility = [
  "School Operating System",
  "ETL / ELT",
  "Dashboards",
  "Governed Intelligence",
  "Platform Engineering",
  "Auditability",
];

const cycles = [
  "Academic year",
  "Attendance",
  "Fees",
  "Exams",
  "Reporting",
  "Parent communication",
  "Trust governance",
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Governance-first",
    description:
      "Access, change, and intelligence are designed around authority—not bolted on later.",
  },
  {
    icon: Network,
    title: "Systems thinking",
    description:
      "We design around operating cycles, dependencies, failure modes, and the humans accountable for outcomes.",
  },
  {
    icon: IndianRupee,
    title: "Cost-aware cloud execution",
    description:
      "Architecture earns its spend. Capacity, observability, and refresh cadence match operational value.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy-conscious architecture",
    description:
      "Least privilege, tenant separation, and explicit data boundaries are product decisions.",
  },
  {
    icon: Building2,
    title: "Indian institutional realities",
    description:
      "Built for trusts, multi-entity operations, uneven source systems, and real administrative pressure.",
  },
  {
    icon: Sparkles,
    title: "AI without theatre",
    description:
      "Intelligence stays explainable, role-aware, audit-backed, and inside customer governance.",
  },
];

const mobileBriefs = [
  {
    label: "Flagship product",
    title: "SquareCampus",
    description:
      "Fairhelm's School Operating System for schools, universities, and multi-campus educational institutions. Product detail and pricing live on squarecampus.com.",
    bullets: [
      "Developed and operated by Fairhelm Systems",
      "Connected operations, governance, and institutional visibility",
    ],
    href: "/squarecampus/",
    linkLabel: "Explore SquareCampus",
  },
  {
    label: "Selective engineering work",
    title: "ETL / ELT and data engineering",
    description:
      "Production pipelines that make fragmented operational data accurate, reconciled, observable, and usable.",
    bullets: [
      "APIs, databases, spreadsheets, and legacy systems",
      "Quality, lineage, refresh, and cloud cost control",
    ],
    href: "/services/data-engineering/",
    linkLabel: "Explore data engineering",
  },
  {
    label: "Selective engineering work",
    title: "Operational dashboards",
    description:
      "Command surfaces built around governed KPIs, trusted data, exceptions, owners, and action.",
    bullets: [
      "Executive and operational views",
      "Drilldowns, alerts, and exception tracking",
    ],
    href: "/services/dashboards/",
    linkLabel: "Explore dashboards",
  },
  {
    label: "Governed intelligence",
    title: "AEGIS",
    description:
      "Adaptive Enterprise Governance & Intelligence System: governed intelligence inside SquareCampus that surfaces answers without bypassing institutional authority.",
    bullets: [
      "Read-only first and RBAC-aware",
      "Audit-backed with no autonomous writes in v1",
    ],
    href: "/security/",
    linkLabel: "Review the governance posture",
  },
  {
    label: "Operating standard",
    title: "Why Fairhelm",
    description:
      "A product-first company: it builds and operates its own products and takes on only technically aligned engineering work.",
    bullets: [
      "Built for Indian institutional realities",
      "AI where it is governed, not theatrical",
    ],
    href: "/about/",
    linkLabel: "About Fairhelm Systems",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Software products · Data systems · Operational intelligence"
        title="Governed software systems for institutions where reliability is non-negotiable."
        description="Fairhelm Systems builds and operates software products—including SquareCampus, its School Operating System for educational institutions—and selectively takes on production data pipelines and decision dashboards for organizations that need reliability, governance, and operational clarity."
        primary={{ label: "Explore SquareCampus", href: "/squarecampus/" }}
        secondary={{ label: "Discuss Data & Dashboards", href: "/contact/" }}
      >
        <SystemPanel />
      </Hero>

      <section
        aria-label="Core capabilities"
        data-md-skip
        className="border-b border-border bg-card/20"
      >
        <Container className="no-scrollbar flex flex-nowrap justify-start gap-2 overflow-x-auto py-4 max-md:scroll-fade-x max-md:scroll-fade-s-[0px] md:flex-wrap md:justify-center md:py-5 lg:justify-between">
          {credibility.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="shrink-0 rounded-full px-3 py-1.5"
            >
              {item}
            </Badge>
          ))}
        </Container>
      </section>

      <MobileBrief
        eyebrow="Choose a lane"
        title="What do you need to solve?"
        description="Five focused briefs. Open one, then follow the detail only if it matters."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="One flagship product. A bounded engineering practice."
            description="SquareCampus is the product Fairhelm builds and operates. Data engineering and operational dashboards are the engineering work it selectively takes on alongside it—one operating standard across all three."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={GraduationCap}
              title="SquareCampus"
              description="A School Operating System for schools, universities, and multi-campus educational institutions, developed and operated by Fairhelm Systems."
              href="/squarecampus/"
              meta="Flagship product"
            />
            <FeatureCard
              icon={DatabaseZap}
              title="Data Engineering"
              description="Production ETL and ELT pipelines with reconciliation, lineage, observability, and cloud cost discipline."
              href="/services/data-engineering/"
              meta="Selective engineering work"
            />
            <FeatureCard
              icon={BarChart3}
              title="Operational Dashboards"
              description="Executive and operational command surfaces built around trusted KPIs, exceptions, and accountable action."
              href="/services/dashboards/"
              meta="Selective engineering work"
            />
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="SquareCampus"
              title="Schools do not run linearly. They run in cycles."
              description="A School Operating System should understand recurring operating pressure rather than force every institution into a generic module list. SquareCampus is built around the cycles schools actually govern."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/squarecampus/"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full",
                )}
              >
                See how SquareCampus works
              </Link>
              <a
                href={siteConfig.product.url}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-full",
                )}
              >
                Visit squarecampus.com
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {cycles.map((cycle, index) => (
              <div
                key={cycle}
                className="rounded-2xl border border-border bg-background/60 p-4 sm:p-5"
              >
                <span className="font-mono text-xs text-primary">
                  0{index + 1}
                </span>
                <p className="mt-5 text-sm font-medium text-foreground">
                  {cycle}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <div className="max-w-2xl">
            <p className="eyebrow">AEGIS · Governed intelligence</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Ask AEGIS. Don&apos;t chase reports.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Adaptive Enterprise Governance &amp; Intelligence System is the
              governed intelligence layer inside SquareCampus. It surfaces
              answers without bypassing institutional authority.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                  AEGIS posture
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Intelligence under control
                </p>
              </div>
              <Eye aria-hidden="true" className="size-5 text-primary" />
            </div>
            <div className="grid gap-4 pt-5 sm:grid-cols-2">
              {[
                "Read-only first",
                "RBAC-aware",
                "Audit-backed",
                "No autonomous writes in v1",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Data engineering"
            title="Data pipelines leadership can trust."
            description="From messy operational sources to reconciled, observable models: we engineer the movement, validation, and refresh discipline between raw data and serious decisions."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Blocks,
                "Ingest",
                "APIs, databases, spreadsheets, and legacy systems",
              ],
              [
                Workflow,
                "Transform",
                "Validated business logic and durable models",
              ],
              [
                Scale,
                "Reconcile",
                "Control totals, exceptions, and source alignment",
              ],
              [
                CloudCog,
                "Operate",
                "Refresh, lineage, observability, and cost control",
              ],
            ].map(([Icon, title, description]) => {
              const TypedIcon = Icon as typeof Blocks;
              return (
                <div
                  key={String(title)}
                  className="rounded-2xl border border-border bg-background/55 p-5"
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
          <Link
            href="/services/data-engineering/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-8 rounded-full",
            )}
          >
            Explore data engineering
          </Link>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div
            data-md-skip
            role="img"
            aria-label="Illustrative example of an operational dashboard. The figures are sample data, not customer results."
            className="rounded-3xl border border-border bg-card p-5 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs text-muted-foreground">
                  Operational command surface
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  Decision state
                </p>
              </div>
              <span className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase">
                  Illustrative data
                </span>
                <Gauge aria-hidden="true" className="size-5 text-primary" />
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ["Exceptions", "12", "Needs ownership"],
                ["Data trust", "98.4%", "Reconciled"],
                ["Cycle state", "On track", "Current window"],
              ].map(([label, value, meta]) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-background/60 p-4"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-3 text-xl font-semibold text-foreground">
                    {value}
                  </p>
                  <p className="mt-1 text-[0.65rem] text-primary">{meta}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-border bg-background/60 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-foreground">
                  Operational signal
                </p>
                <span className="text-[0.65rem] text-muted-foreground">
                  Last 8 periods
                </span>
              </div>
              <div className="mt-5 flex h-24 items-end gap-2">
                {[
                  { period: "p1", height: 36 },
                  { period: "p2", height: 52 },
                  { period: "p3", height: 44 },
                  { period: "p4", height: 66 },
                  { period: "p5", height: 59 },
                  { period: "p6", height: 78 },
                  { period: "p7", height: 72 },
                  { period: "p8", height: 91 },
                ].map(({ period, height }, index) => (
                  <div
                    key={period}
                    className="flex-1 rounded-t-sm bg-primary/70"
                    style={{
                      height: `${height}%`,
                      opacity: 0.45 + index * 0.06,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Operational dashboards"
              title="Not decoration. Command surfaces."
              description="Executive and operating teams need more than charts. They need KPI definitions, drilldowns, alerts, exception ownership, and a clear route from signal to action."
            />
            <p className="mt-6 text-sm font-semibold text-foreground">
              If the data cannot be trusted, the dashboard is theatre.
            </p>
            <Link
              href="/services/dashboards/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-7 rounded-full",
              )}
            >
              Explore dashboards
            </Link>
          </div>
        </Container>
      </section>

      <section className="hidden border-t border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why Fairhelm"
            title="Discipline is a product feature."
            description="We bring product judgment, systems engineering, and operating realism to environments where weak controls become expensive quickly."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <FeatureCard key={reason.title} {...reason} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
