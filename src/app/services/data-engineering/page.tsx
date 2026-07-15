import {
  Activity,
  Boxes,
  Braces,
  CircleDollarSign,
  GitCompareArrows,
  ListChecks,
  RefreshCw,
  Route,
} from "lucide-react";
import { AnimatedSystemIllustration } from "@/components/site/animated-system-illustration";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { MobileBrief } from "@/components/site/mobile-brief";
import { SectionHeading } from "@/components/site/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structured-data";

const description =
  "Fairhelm Systems designs and operates ETL and ELT pipelines for organizations that need accurate, reconciled, observable data without undisciplined cloud spend.";

export const metadata = createPageMetadata({
  title: "ETL/ELT and Data Engineering Services",
  description,
  path: "/services/data-engineering/",
  keywords: [
    "ETL services India",
    "ELT pipelines",
    "data engineering services",
    "data quality",
    "warehouse modeling",
  ],
});

const capabilities = [
  {
    icon: Braces,
    title: "Source ingestion",
    description:
      "Bring operational databases, APIs, spreadsheets, file drops, and legacy systems into a controlled ingestion model.",
  },
  {
    icon: Boxes,
    title: "Data modeling",
    description:
      "Design warehouse or lakehouse layers around durable business entities, measures, history, and consumption needs.",
  },
  {
    icon: GitCompareArrows,
    title: "Reconciliation",
    description:
      "Prove movement with control totals, record-level exceptions, source-to-target comparisons, and accountable resolution.",
  },
  {
    icon: RefreshCw,
    title: "Pipeline orchestration",
    description:
      "Schedule and coordinate batch or event-driven flows with retries, dependencies, idempotency, and predictable recovery.",
  },
  {
    icon: ListChecks,
    title: "Data quality",
    description:
      "Encode freshness, validity, completeness, uniqueness, and referential checks where failure becomes visible early.",
  },
  {
    icon: Activity,
    title: "Observability",
    description:
      "Monitor lineage, runtime, volume shifts, schema drift, failure, and service-level expectations in production.",
  },
  {
    icon: CircleDollarSign,
    title: "Cloud cost discipline",
    description:
      "Choose storage, compute, cadence, and retention deliberately so pipeline economics stay proportional to value.",
  },
  {
    icon: Route,
    title: "Production refresh",
    description:
      "Move from one-off migration to an owned, documented, repeatable refresh process with clear operating responsibility.",
  },
];

const mobileBriefs = [
  {
    label: "Diagnose",
    title: "Make source ambiguity explicit",
    description:
      "Map owners, grain, extraction boundaries, undocumented rules, dependencies, and decision consumers before moving data.",
    bullets: [
      "Databases, APIs, spreadsheets, files, and legacy systems",
      "Source contracts instead of assumptions",
    ],
  },
  {
    label: "Engineer",
    title: "Build the production pipeline",
    description:
      "Design ingestion, warehouse or lakehouse models, orchestration, retries, recovery, and repeatable refresh.",
    bullets: [
      "Batch or events based on operating need",
      "Idempotent, observable execution",
    ],
  },
  {
    label: "Prove",
    title: "Reconcile and validate",
    description:
      "Use control totals, source-to-target comparisons, quality checks, and exception review to establish trust.",
    bullets: [
      "Freshness, completeness, validity, and uniqueness",
      "Lineage and schema-drift visibility",
    ],
  },
  {
    label: "Operate",
    title: "Keep cost and ownership clear",
    description:
      "Match compute, storage, cadence, retention, monitoring, and runbooks to the value and risk of the workload.",
    bullets: [
      "Cost-conscious cloud execution",
      "Named refresh and recovery ownership",
    ],
    href: "/contact/",
    linkLabel: "Discuss your data estate",
  },
] as const;

export default function DataEngineeringPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "ETL/ELT and Data Engineering Services",
            description,
            path: "/services/data-engineering/",
            serviceType: "Data engineering, ETL, and ELT services",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/data-engineering/" },
            { name: "Data Engineering", path: "/services/data-engineering/" },
          ]),
        ]}
      />
      <Hero
        eyebrow="Data engineering · ETL · ELT"
        title="ETL/ELT pipelines built for accuracy, auditability, and decision velocity."
        description="We turn fragmented operational data into reliable, reconciled, production-grade foundations—without pretending a connector is the same thing as a data system."
        primary={{ label: "Discuss your data estate", href: "/contact/" }}
        secondary={{
          label: "Explore dashboards",
          href: "/services/dashboards/",
        }}
      >
        <div className="rounded-3xl border border-border bg-card/75 p-6 shadow-2xl backdrop-blur sm:p-8">
          <AnimatedSystemIllustration variant="pipeline" className="mb-6" />
          <p className="eyebrow">Pipeline contract</p>
          <div className="mt-6 grid gap-3">
            {[
              ["Input", "Known sources and explicit extraction boundaries"],
              ["Control", "Validated logic, quality rules, and reconciliation"],
              ["Output", "Decision-ready models with observable refresh"],
            ].map(([label, detail], index) => (
              <div
                key={label}
                className="flex gap-4 rounded-xl border border-border bg-background/55 p-4"
              >
                <span className="font-mono text-xs text-primary">
                  0{index + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Hero>

      <MobileBrief
        eyebrow="Data engineering in brief"
        title="Start with the failure you need fixed."
        description="Open the stage that matters now—from source sprawl to production ownership."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="For messy operational data"
            title="The problem is rarely moving bytes. It is establishing trust."
            description="Different systems disagree. Spreadsheets encode undocumented rules. IDs drift. Reports reconcile only after manual intervention. We make those realities explicit, testable, and operable."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Source ambiguity",
                "Identify owners, grain, extraction rules, and the operational meaning of each source.",
              ],
              [
                "Business-rule drift",
                "Move critical transformations out of tribal knowledge and into reviewable models.",
              ],
              [
                "Silent quality failure",
                "Detect freshness, volume, schema, and validity problems before they reach leadership.",
              ],
              [
                "Refresh fragility",
                "Engineer retries, recovery, idempotency, and operating runbooks for the real failure path.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="End-to-end capability"
            title="From extraction to a production refresh leadership can rely on."
            description="Architecture, implementation, validation, and operating discipline are treated as one system."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <FeatureCard key={capability.title} {...capability} />
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Delivery model"
            title="A pipeline is complete when it can be trusted in production."
            description="The delivery sequence is shaped around evidence, control, and ownership—not only code completion."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "01",
                "Map",
                "Sources, owners, grain, rules, dependencies, and decision consumers.",
              ],
              [
                "02",
                "Design",
                "Contracts, models, quality gates, orchestration, and cost envelope.",
              ],
              [
                "03",
                "Prove",
                "Backfills, reconciliation, exception review, performance, and recovery.",
              ],
              [
                "04",
                "Operate",
                "Monitoring, runbooks, refresh ownership, lineage, and change discipline.",
              ],
            ].map(([number, title, detail]) => (
              <li
                key={number}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <span className="font-mono text-xs text-primary">{number}</span>
                <h3 className="mt-7 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Architecture judgment"
            title="Batch when batch is enough. Events when events earn their complexity."
          />
          <div className="grid gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              We choose movement patterns based on latency, correctness,
              recovery, source behavior, team capability, and cost—not trend
              value.
            </p>
            <p>
              The result is a data platform that fits the operating need and
              remains intelligible to the people who must own it after launch.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Make your operational data answerable."
        description="Bring the source sprawl, fragile reports, and reconciliation pain. We will help define a governed route to production."
        label="Discuss data engineering"
      />
    </>
  );
}
