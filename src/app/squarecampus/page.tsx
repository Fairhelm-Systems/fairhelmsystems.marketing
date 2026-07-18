import {
  BellRing,
  BookOpenCheck,
  Building2,
  CalendarRange,
  ClipboardCheck,
  Eye,
  IndianRupee,
  Languages,
  LockKeyhole,
  MessageSquareText,
  Network,
  ShieldCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { AegisConsoleVisual } from "@/components/site/aegis-console-visual";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { FeatureCard } from "@/components/site/feature-card";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { MobileBrief } from "@/components/site/mobile-brief";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, squareCampusSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "SquareCampus — Sovereign School OS for India",
  description:
    "Explore SquareCampus, Fairhelm Systems' cycle-native School OS for Indian schools, multi-school groups, and educational trusts.",
  path: "/squarecampus/",
  keywords: [
    "School OS India",
    "school management software India",
    "school ERP alternative",
    "educational trust management software",
  ],
});

const operatingCycles = [
  {
    icon: UserRoundPlus,
    title: "Admissions and enrolment",
    description:
      "Connect inquiry, application, documents, offers, enrolment, and the handoff into live academic and fee records.",
  },
  {
    icon: CalendarRange,
    title: "Academic year control",
    description:
      "Structure setup, rollover, promotion, and reporting around explicit academic windows and governed transitions.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance cycles",
    description:
      "Capture, exceptions, corrections, approvals, and communication designed as a recurring operating discipline.",
  },
  {
    icon: IndianRupee,
    title: "Fee cycles",
    description:
      "Model schedules, collections, concessions, reconciliation, and outstanding action without losing institutional context.",
  },
  {
    icon: BookOpenCheck,
    title: "Exams and reporting",
    description:
      "Plan assessments, govern marks workflows, compile outcomes, and produce reporting with clear accountability.",
  },
  {
    icon: MessageSquareText,
    title: "Parent and staff workflows",
    description:
      "Role-aware communication and administrative action that respects school policy and operational boundaries.",
  },
  {
    icon: Building2,
    title: "Trust governance",
    description:
      "A portfolio view for educational trusts and multi-school groups without flattening each institution's authority.",
  },
  {
    icon: Languages,
    title: "Multilingual communication",
    description:
      "Adapt parent-facing communication to language needs while keeping one structured institutional record underneath.",
  },
];

const posture = [
  {
    icon: ShieldCheck,
    title: "Role-aware by design",
    description:
      "Every surface should respect institutional role, scope, and delegated authority.",
  },
  {
    icon: LockKeyhole,
    title: "Privacy and separation",
    description:
      "Customer data boundaries, tenant separation, and least privilege shape the architecture.",
  },
  {
    icon: Eye,
    title: "Auditable operations",
    description:
      "Important actions should leave an intelligible record that authorized teams can review.",
  },
];

const mobileBriefs = [
  {
    label: "Operating model",
    title: "Why cycle-native?",
    description:
      "Schools execute recurring windows, handoffs, deadlines, exceptions, and closure—not a disconnected list of ERP modules.",
    bullets: [
      "Academic year, attendance, fees, exams, and reporting",
      "Role-aware ownership and traceable closure",
    ],
  },
  {
    label: "Institution portfolio",
    title: "Trust Command Center",
    description:
      "A governed view across schools with comparable signals, institutional context, drilldowns, and exception ownership.",
    bullets: [
      "Oversight without blunt centralization",
      "Boardroom-ready operating context",
    ],
  },
  {
    label: "Governed intelligence",
    title: "Ask AEGIS",
    description:
      "AEGIS answers authorized questions without bypassing institutional governance.",
    bullets: [
      "Read-only first, RBAC-aware, and audit-backed",
      "No autonomous writes in v1",
    ],
    href: "/security/",
    linkLabel: "Review security and governance",
  },
  {
    label: "Data posture",
    title: "Privacy and auditability",
    description:
      "Customer ownership, tenant separation, least privilege, and intelligible records are built into the product.",
    bullets: [
      "No selling student or parent data",
      "No AI training on customer data unless explicitly governed",
    ],
    href: "/security/",
    linkLabel: "Read the public posture",
  },
  {
    label: "Rollout",
    title: "Pilot deliberately",
    description:
      "Start with institutional context, roles, data boundaries, and the cycle that matters most—then sequence adoption.",
    bullets: [
      "No big-bang feature theatre",
      "Capabilities remain product direction unless contracted",
    ],
    href: "/contact/",
    linkLabel: "Discuss a pilot",
  },
] as const;

export default function SquareCampusPage() {
  return (
    <>
      <JsonLd
        data={[
          squareCampusSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "SquareCampus", path: "/squarecampus/" },
          ]),
        ]}
      />
      <Hero
        eyebrow="SquareCampus · Fairhelm Systems flagship product"
        title="A sovereign School OS for Indian institutions."
        description="SquareCampus is Fairhelm Systems' sovereign School OS for schools, multi-school groups, educational trusts, and private institutions that need cycle-native operations, trust-aware governance, and decision-ready intelligence."
        primary={{ label: "Discuss a pilot", href: "/contact/" }}
        secondary={{ label: "Review security posture", href: "/security/" }}
      >
        <div className="rounded-3xl border border-border bg-card/75 p-6 shadow-2xl backdrop-blur sm:p-8">
          <AegisConsoleVisual className="mb-6" />
          <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Operating model
              </p>
              <p className="mt-2 text-xl font-semibold">
                Cycle-native. Trust-aware.
              </p>
            </div>
            <Network aria-hidden="true" className="size-6 text-primary" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Academic",
              "Attendance",
              "Fees",
              "Exams",
              "Reporting",
              "Governance",
            ].map((item) => (
              <Badge key={item} variant="secondary" className="rounded-full">
                {item}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            Not another bloated ERP. A governed operating system shaped around
            how Indian institutions actually plan, execute, review, and repeat.
          </p>
        </div>
      </Hero>

      <MobileBrief
        eyebrow="SquareCampus in brief"
        title="Pick the part you care about."
        description="SquareCampus, compressed for a phone. Open a topic for the operating detail."
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="The problem with generic ERPs"
            title="A module list is not an operating model."
            description="Schools do not simply collect records. They execute recurring cycles under policy, deadlines, role boundaries, parent expectations, and trust oversight. SquareCampus is designed around that reality."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "01",
                "Cycles over screens",
                "Work is organized around windows, handoffs, exceptions, and closure—not isolated forms.",
              ],
              [
                "02",
                "Trust-aware authority",
                "Institution-level autonomy and group-level governance need to coexist without ambiguity.",
              ],
              [
                "03",
                "Operational intelligence",
                "Leadership should see what needs attention, why it matters, and who owns the next action.",
              ],
              [
                "04",
                "Respectful constraints",
                "Sensitive action requires explicit authority, audit context, and predictable boundaries.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <span className="font-mono text-xs text-primary">{number}</span>
                <h3 className="mt-6 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Cycle-native architecture"
            title="Built around the work schools repeat—and the pressure points they cannot ignore."
            description="SquareCampus connects each operating cycle to its owners, evidence, exceptions, and governance context."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {operatingCycles.map((cycle) => (
              <FeatureCard key={cycle.title} {...cycle} />
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Trust Command Center</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              One governed view across the institution portfolio.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              The Trust Command Center is built for oversight without blunt
              centralization: shared definitions, exception visibility,
              institutional context, and accountable drilldowns across schools.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-3">
              {[
                [
                  "Portfolio state",
                  "Understand which institutions are on track and which need intervention.",
                ],
                [
                  "Comparable signals",
                  "Use governed metric definitions without erasing local context.",
                ],
                [
                  "Exception ownership",
                  "Route attention to the right operator with evidence and accountability.",
                ],
                [
                  "Boardroom readiness",
                  "Move from report assembly to a consistent operational narrative.",
                ],
              ].map(([title, description], index) => (
                <div
                  key={title}
                  className="flex gap-4 rounded-xl border border-border bg-background/55 p-4"
                >
                  <span className="font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="AEGIS"
              title="Governed intelligence, not an unsupervised actor."
              description="Adaptive Enterprise Governance & Intelligence System helps authorized users ask better questions across governed institutional data. The v1 posture is deliberately constrained."
            />
            <p className="mt-6 text-xl font-semibold text-foreground">
              Ask AEGIS. Don&apos;t chase reports.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [
                Eye,
                "Read-only first",
                "Retrieve and explain before proposing action.",
              ],
              [
                UsersRound,
                "RBAC-aware",
                "Answers respect the user's authorized scope.",
              ],
              [
                BellRing,
                "Audit-backed",
                "Important interactions are designed for traceability.",
              ],
              [
                LockKeyhole,
                "No autonomous writes in v1",
                "Human approval and established workflows remain decisive.",
              ],
            ].map(([Icon, title, description]) => {
              const TypedIcon = Icon as typeof Eye;
              return (
                <div
                  key={String(title)}
                  className="rounded-2xl border border-border bg-background/55 p-5"
                >
                  <TypedIcon
                    aria-hidden="true"
                    className="size-5 text-primary"
                  />
                  <h3 className="mt-5 font-semibold text-foreground">
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

      <section className="hidden py-20 md:block sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Privacy and auditability"
            title="Institutional data deserves institutional-grade boundaries."
            description="SquareCampus is built with explicit ownership, privacy-conscious handling, and clear records of material action. This is a product posture, not a claim of certification."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {posture.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="hidden border-y border-border bg-card/30 py-20 md:block sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Deployment philosophy"
            title="Deliberate rollout over big-bang theatre."
          />
          <div className="grid gap-6 text-base leading-7 text-muted-foreground sm:grid-cols-2">
            <p>
              Start with institutional context, data boundaries, roles, cycles,
              and the operating outcome that matters. Then sequence capability
              around adoption and control—not a feature checklist.
            </p>
            <p>
              Pilot discussions focus on product fit and design-partner
              alignment. Capabilities described here represent platform
              direction unless confirmed explicitly for a contracted scope.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Build the School OS around the institution—not the other way around."
        description="Talk to Fairhelm Systems about a SquareCampus pilot or design-partner discussion."
        label="Discuss SquareCampus"
      />
    </>
  );
}
