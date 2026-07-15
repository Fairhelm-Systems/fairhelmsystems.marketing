import {
  ArrowUpRight,
  Mail,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/json-ld";
import { MobileBrief } from "@/components/site/mobile-brief";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "Contact Fairhelm Systems",
  description:
    "Discuss SquareCampus, ETL and ELT pipelines, custom dashboards, or governed operational intelligence with Fairhelm Systems.",
  path: "/contact/",
});

const mailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Fairhelm Systems — project discussion")}`;

const mobileBriefs = [
  {
    label: "Useful first note",
    title: "What should I include?",
    description:
      "Give us the operating problem, affected users, current systems, important data sources, risk, timeline, and decision owner.",
    bullets: [
      "What is failing today",
      "What must be true for the work to count as successful",
    ],
    href: mailto,
    linkLabel: `Email ${siteConfig.shortName}`,
  },
  {
    label: "Safety",
    title: "What should I avoid sending?",
    description:
      "Keep the first note high-level. Sensitive material belongs in an agreed secure channel after scope and authority are clear.",
    bullets: [
      "No credentials or secrets",
      "No student, financial, or other sensitive records",
    ],
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />
      <Hero
        eyebrow="Contact Fairhelm Systems"
        title="Bring us the operating problem."
        description="Whether the need is a School OS, a reliable data foundation, or a command surface leadership can trust, start with the institutional reality and the outcome that matters."
        primary={{ label: `Email ${siteConfig.shortName}`, href: mailto }}
        compact
      />

      <MobileBrief
        eyebrow="Make the first note useful"
        title="Two things before you write."
        description={`The working contact is ${siteConfig.contactEmail}. This static site does not submit or store form data.`}
        items={mobileBriefs}
      />

      <section className="hidden py-20 md:block sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <Mail aria-hidden="true" className="size-6 text-primary" />
              <h2 className="mt-6 text-2xl font-semibold text-foreground">
                Start by email
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Include your organization, current system landscape, decision
                deadline, and what must be true for the work to count as
                successful.
              </p>
              <Link
                href={mailto}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-7 rounded-full",
                )}
              >
                Email {siteConfig.shortName}
                <ArrowUpRight data-icon="inline-end" />
              </Link>
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {siteConfig.contactEmail}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-5">
                <MessageSquareText
                  aria-hidden="true"
                  className="size-5 text-primary"
                />
                <h3 className="mt-5 font-semibold text-foreground">
                  Useful first note
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Problem, users, systems, data sources, risk, timeline, and
                  decision owner.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <ShieldCheck
                  aria-hidden="true"
                  className="size-5 text-primary"
                />
                <h3 className="mt-5 font-semibold text-foreground">
                  Please avoid
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Do not send credentials, student data, financial records, or
                  other sensitive material by email.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Alert className="mb-8">
              <Mail />
              <AlertTitle>Static project brief</AlertTitle>
              <AlertDescription>
                This site does not submit or store form data. The fields below
                are a planning shell; use the email action to send your brief
                through your own mail client.
              </AlertDescription>
            </Alert>
            <form aria-label="Static project brief preview">
              <FieldSet disabled>
                <FieldLegend>What a useful project brief covers</FieldLegend>
                <FieldDescription>
                  These controls are intentionally disabled because no form
                  backend is configured.
                </FieldDescription>
                <FieldGroup>
                  <Field data-disabled>
                    <FieldLabel htmlFor="contact-name">
                      Name and organization
                    </FieldLabel>
                    <Input
                      id="contact-name"
                      disabled
                      placeholder="Your name · Organization"
                    />
                  </Field>
                  <Field data-disabled>
                    <FieldLabel htmlFor="contact-email">Work email</FieldLabel>
                    <Input
                      id="contact-email"
                      type="email"
                      disabled
                      placeholder="you@organization.com"
                    />
                  </Field>
                  <Field data-disabled>
                    <FieldLabel htmlFor="contact-brief">
                      Operating problem
                    </FieldLabel>
                    <Textarea
                      id="contact-brief"
                      disabled
                      rows={7}
                      placeholder="What is failing today, who is affected, what systems are involved, and what outcome is required?"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </form>
            <Link
              href={mailto}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 rounded-full",
              )}
            >
              Open email with subject
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-card/30 py-8 sm:py-16">
        <Container className="text-sm leading-6 text-muted-foreground">
          <p>
            {siteConfig.legalName} · {siteConfig.incorporationStatus}. GSTIN
            details will be published after incorporation and applicable
            registration.
          </p>
        </Container>
      </section>
    </>
  );
}
