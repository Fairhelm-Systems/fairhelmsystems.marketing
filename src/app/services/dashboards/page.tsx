import {
  BellRing,
  ChartNoAxesCombined,
  CircleGauge,
  GitBranch,
  ListFilter,
  SearchCheck,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { CommandSurfaceVisual } from "@/components/site/command-surface-visual";
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
  "Fairhelm Systems builds executive and operational dashboards with governed KPIs, trusted data, drilldowns, alerts, exception tracking, and decision workflows.";

export const metadata = createPageMetadata({
  title: "Operational Dashboards and Decision Systems",
  description,
  path: "/services/dashboards/",
});

const capabilities = [
  {
    icon: CircleGauge,
    title: "KPI design",
    description:
      "Define the decision, metric contract, grain, owner, target, and guardrail before designing the chart.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Executive reporting",
    description:
      "Boardroom-ready views that explain state, direction, variance, risk, and the operating implication.",
  },
  {
    icon: GitBranch,
    title: "Drilldowns",
    description:
      "Move from portfolio signal to segment, institution, team, transaction, or exception without losing context.",
  },
  {
    icon: Siren,
    title: "Exception tracking",
    description:
      "Surface what is outside tolerance, why it matters, who owns it, and whether resolution is moving.",
  },
  {
    icon: BellRing,
    title: "Alerts",
    description:
      "Notify on material conditions with thresholds and escalation designed to reduce noise, not generate it.",
  },
  {
    icon: ListFilter,
    title: "Semantic models",
    description:
      "Keep metric logic consistent across views with governed dimensions, measures, and calculation rules.",
  },
  {
    icon: SearchCheck,
    title: "Data trust",
    description:
      "Expose freshness, reconciliation, definitions, and caveats so users know what the dashboard can support.",
  },
  {
    icon: ShieldCheck,
    title: "Decision workflows",
    description:
      "Connect insight to review, ownership, follow-up, and evidence without bypassing operating controls.",
  },
];

const mobileBriefs = [
  {
    label: "Define",
    title: "Start with the decision",
    description:
      "Establish the KPI contract, grain, source, owner, target, guardrail, and operating implication before drawing a chart.",
    bullets: [
      "Governed semantic models",
      "Shared definitions across leadership levels",
    ],
  },
  {
    label: "Trust",
    title: "Expose the evidence",
    description:
      "Show freshness, completeness, reconciliation, definitions, and caveats so users know what the data can support.",
    bullets: [
      "If the data cannot be trusted, the dashboard is theatre",
      "Data quality is visible, not hidden",
    ],
    href: "/services/data-engineering/",
    linkLabel: "Fix the data foundation",
  },
  {
    label: "Act",
    title: "Design the command surface",
    description:
      "Connect portfolio signals to drilldowns, material alerts, exceptions, owners, follow-up, and closure evidence.",
    bullets: [
      "Executive and operational altitude",
      "Less alert noise, clearer accountability",
    ],
  },
  {
    label: "Avoid",
    title: "No vanity-chart theatre",
    description:
      "A visual earns its place by reducing decision time, surfacing risk, or clarifying operating responsibility.",
    bullets: ["No chart-count optimization", "No manufactured confidence"],
    href: "/contact/",
    linkLabel: "Design a command surface",
  },
] as const;

export default function DashboardsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Operational Dashboards and Decision Systems",
            description,
            path: "/services/dashboards/",
            serviceType:
              "Operational dashboards, governed analytics, and decision systems",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services/dashboards/" },
            { name: "Dashboards", path: "/services/dashboards/" },
          ]),
        ]}
      />
      <Hero
        eyebrow="Dashboards · Operational intelligence"
        title="Dashboards that behave like command surfaces."
        description="We build executive and operational dashboards around governed metrics, trusted data, exceptions, ownership, and the decisions that follow—not around a gallery of charts."
        primary={{ label: "Design a command surface", href: "/contact/" }}
        secondary={{
          label: "Fix the data foundation",
          href: "/services/data-engineering/",
        }}
      >
        <CommandSurfaceVisual className="shadow-2xl" />
      </Hero>

      <MobileBrief
        eyebrow="Dashboards in brief"
        title="What should the dashboard do?"
        description="Open the decision layer you need—definition, trust, action, or redesign."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="The standard"
            title="If the data cannot be trusted, the dashboard is theatre."
            description="A serious dashboard makes the metric contract, source state, refresh context, and exception path visible enough for accountable decisions."
          />
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                [
                  "Metric contract",
                  "What exactly is measured, at what grain, under which rule?",
                ],
                [
                  "Decision context",
                  "What changed, against which target, and why does it matter now?",
                ],
                [
                  "Trust state",
                  "How fresh, complete, reconciled, and qualified is the underlying data?",
                ],
                [
                  "Action route",
                  "Who owns the exception, what happens next, and how is closure evidenced?",
                ],
              ].map(([title, detail], index) => (
                <div key={title}>
                  <span className="font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Decision infrastructure"
            title="Every layer should move the user closer to a defensible action."
            description="From metric semantics to exception ownership, the dashboard is designed as part of the operating system."
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
            eyebrow="Designed for the room"
            title="The same truth, at the right altitude."
            description="A board, trust, executive, finance, sales, and frontline operations team should share metric logic while seeing the context appropriate to their responsibility."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Executive",
                "Direction, target, variance, risk, and strategic implication.",
              ],
              [
                "Operational",
                "Throughput, queues, bottlenecks, exceptions, and owners.",
              ],
              [
                "Trust / school",
                "Portfolio comparison with institutional drilldown and governance context.",
              ],
              [
                "Finance / sales",
                "Plan, actuals, pipeline, collections, margins, and exception movement.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="What we avoid"
            title="Vanity charts. Ambiguous metrics. Alert spam."
          />
          <div className="grid gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              We do not optimize for chart count or visual novelty. A visual
              earns its place by reducing decision time, surfacing risk, or
              making operating accountability clearer.
            </p>
            <p>
              Where source quality is weak, we expose and address the gap. A
              polished surface must never manufacture confidence the evidence
              cannot support.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Turn reporting into an operating advantage."
        description="Bring the recurring deck, the metric dispute, or the dashboard nobody acts on. We will redesign the decision system around it."
        label="Discuss your dashboard"
      />
    </>
  );
}
