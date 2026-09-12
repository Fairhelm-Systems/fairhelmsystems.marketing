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
import { FaqList } from "@/components/site/faq-list";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { SectionHeading } from "@/components/site/section-heading";
import { SystemPanel } from "@/components/site/system-panel";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { companyFaq } from "@/content/faq";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { faqSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

const homeTitle =
  "Fairhelm Systems | Software Product & Data Engineering Company, Bangalore";

export const metadata = {
  ...createPageMetadata({
    title: homeTitle,
    description:
      "Product-first technology company in Bangalore, India. Fairhelm Systems builds and operates SquareCampus, a School Operating System, and delivers governed data pipelines and operational dashboards.",
    path: "/",
  }),
  title: { absolute: homeTitle },
};

const credibility = [
  "School Operating System",
  "ETL / ELT pipelines",
  "Operational dashboards",
  "Governed intelligence",
  "Platform engineering",
  "RBAC & auditability",
  "Bangalore, India",
];

const cycles = [
  "Academic year",
  "Admissions",
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
      "Access, change and intelligence are designed around authority, not bolted on later.",
  },
  {
    icon: Network,
    title: "Systems thinking",
    description:
      "We design around operating cycles, dependencies, failure modes and the humans accountable for outcomes.",
  },
  {
    icon: IndianRupee,
    title: "Cost-aware cloud execution",
    description:
      "Architecture earns its spend. Capacity, observability and refresh cadence match operational value.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy-conscious architecture",
    description:
      "Least privilege, tenant separation and explicit data boundaries are product decisions.",
  },
  {
    icon: Building2,
    title: "Indian institutional realities",
    description:
      "Built for trusts, multi-entity operations, uneven source systems and real administrative pressure.",
  },
  {
    icon: Sparkles,
    title: "AI without theatre",
    description:
      "Intelligence stays explainable, role-aware, audit-backed and inside customer governance.",
  },
];

const pipeline = [
  [Blocks, "Ingest", "APIs, databases, spreadsheets and legacy systems"],
  [Workflow, "Transform", "Validated business logic and durable models"],
  [Scale, "Reconcile", "Control totals, exceptions and source alignment"],
  [CloudCog, "Operate", "Refresh, lineage, observability and cost control"],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema("/", companyFaq)} />

      <Hero
        eyebrow="Software products · Data systems · Bangalore"
        title="Governed software systems for institutions where reliability is non-negotiable."
        highlight="reliability is non-negotiable"
        description="Fairhelm Systems is a product-first technology company. It builds and operates SquareCampus, its School Operating System for educational institutions, and selectively takes on production data pipelines and decision dashboards for organisations that need governance and operational clarity."
        primary={{ label: "Explore SquareCampus", href: "/squarecampus/" }}
        secondary={{ label: "Discuss data & dashboards", href: "/contact/" }}
        bullets={[
          "Builds and operates its own flagship product",
          "Data engineering and dashboards, selectively",
          "RBAC, audit trails and tenant separation by design",
          "Incorporated in Bangalore, Karnataka, India",
        ]}
      >
        <SystemPanel />
      </Hero>

      <section
        aria-label="Core capabilities"
        data-md-skip
        className="border-y border-border section-alt"
      >
        <Container className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto py-4 md:flex-wrap md:justify-center lg:justify-between">
          {credibility.map((item) => (
            <Badge key={item} variant="chip" className="shrink-0">
              {item}
            </Badge>
          ))}
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="One flagship product. A bounded engineering practice."
            description="SquareCampus is the product Fairhelm builds and operates. Data engineering and operational dashboards are the engineering work it selectively takes on alongside it, under one operating standard."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={GraduationCap}
              index="01"
              title="SquareCampus"
              description="A School Operating System for schools, universities and multi-campus educational institutions, developed and operated by Fairhelm Systems."
              href="/squarecampus/"
              meta="Flagship product"
            />
            <FeatureCard
              icon={DatabaseZap}
              index="02"
              title="Data engineering"
              description="Production ETL and ELT pipelines with reconciliation, lineage, observability and cloud cost discipline."
              href="/services/data-engineering/"
              meta="Selective engineering work"
            />
            <FeatureCard
              icon={BarChart3}
              index="03"
              title="Operational dashboards"
              description="Executive and operational command surfaces built around trusted KPIs, exceptions and accountable action."
              href="/services/dashboards/"
              meta="Selective engineering work"
            />
          </div>
        </Container>
      </section>

      <section className="section border-y border-border section-alt">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="SquareCampus"
              title="Schools do not run linearly. They run in cycles."
              description="A School Operating System should understand recurring operating pressure rather than force every institution into a generic module list. SquareCampus is built around the cycles schools actually govern."
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/squarecampus/"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                See how SquareCampus works
              </Link>
              <a
                href={siteConfig.product.url}
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                Visit squarecampus.com
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {cycles.map((cycle, index) => (
              <div
                key={cycle}
                className="rounded-2xl border border-border bg-card p-4 sm:p-5"
              >
                <span className="index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 text-sm font-medium text-foreground">
                  {cycle}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <SectionHeading
            eyebrow="AEGIS · Governed intelligence"
            title="Ask AEGIS. Don't chase reports."
            description="Adaptive Enterprise Governance & Intelligence System is the governed intelligence layer inside SquareCampus. It surfaces answers without bypassing institutional authority."
          />
          <div className="panel p-2.5 sm:p-3">
            <div className="panel-inner p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="eyebrow text-[0.6rem]">AEGIS posture</p>
                  <p className="mt-1.5 font-heading text-base text-foreground">
                    Intelligence under control
                  </p>
                </div>
                <Eye aria-hidden="true" className="size-5 text-primary" />
              </div>
              <div className="grid gap-3 pt-5 sm:grid-cols-2">
                {[
                  "Read-only first",
                  "RBAC-aware",
                  "Audit-backed",
                  "No autonomous writes in v1",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card/70 p-3 text-sm text-foreground"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal/12 text-teal">
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section border-y border-border section-alt">
        <Container>
          <SectionHeading
            eyebrow="Data engineering"
            title="Data pipelines leadership can trust."
            description="From messy operational sources to reconciled, observable models: we engineer the movement, validation and refresh discipline between raw data and serious decisions."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pipeline.map(([Icon, title, description], index) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display-3 mt-5">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/services/data-engineering/"
            className={cn(buttonVariants({ variant: "outline" }), "mt-8")}
          >
            Explore data engineering
          </Link>
        </Container>
      </section>

      <section className="section">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div
            data-md-skip
            role="img"
            aria-label="Illustrative example of an operational dashboard. The figures are sample data, not customer results."
            className="panel order-2 p-2.5 sm:p-3 lg:order-1"
          >
            <div className="panel-inner p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="eyebrow text-[0.6rem]">
                    Operational command surface
                  </p>
                  <p className="mt-1.5 font-heading text-base text-foreground">
                    Decision state
                  </p>
                </div>
                <span className="flex items-center gap-2">
                  <span className="chip">Illustrative</span>
                  <Gauge aria-hidden="true" className="size-4 text-primary" />
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ["Exceptions", "12", "Needs ownership", "text-amber"],
                  ["Data trust", "98.4%", "Reconciled", "text-teal"],
                  ["Cycle state", "On track", "Current window", "text-teal"],
                ].map(([label, value, meta, tone]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-card/70 p-4"
                  >
                    <p className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {label}
                    </p>
                    <p className="mt-3 font-heading text-2xl text-foreground">
                      {value}
                    </p>
                    <p className={cn("mt-1 text-[0.7rem]", tone)}>{meta}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-border bg-card/70 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-medium text-foreground">
                    Operational signal
                  </p>
                  <span className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                    Last 8 periods
                  </span>
                </div>
                <div className="mt-5 flex h-24 items-end gap-2">
                  {[36, 52, 44, 66, 59, 78, 72, 91].map((height, index) => (
                    <div
                      key={`p${height}`}
                      className="flex-1 rounded-t-sm bg-linear-to-t from-brand to-teal"
                      style={{
                        height: `${height}%`,
                        opacity: 0.4 + index * 0.075,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Operational dashboards"
              title="Not decoration. Command surfaces."
              description="Executive and operating teams need more than charts. They need KPI definitions, drilldowns, alerts, exception ownership and a clear route from signal to action."
            />
            <p className="mt-6 font-heading text-lg text-foreground">
              If the data cannot be trusted, the dashboard is theatre.
            </p>
            <Link
              href="/services/dashboards/"
              className={cn(buttonVariants({ variant: "outline" }), "mt-7")}
            >
              Explore dashboards
            </Link>
          </div>
        </Container>
      </section>

      <section className="section border-y border-border section-alt">
        <Container>
          <SectionHeading
            eyebrow="Why Fairhelm"
            title="Discipline is a product feature."
            description="We bring product judgment, systems engineering and operating realism to environments where weak controls become expensive quickly."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <FeatureCard key={reason.title} {...reason} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Frequently asked"
            title="Straight answers about the company."
            description="What Fairhelm Systems is, where it operates from, what it builds and where its engineering work stops."
          />
          <div className="mt-10">
            <FaqList items={companyFaq} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
