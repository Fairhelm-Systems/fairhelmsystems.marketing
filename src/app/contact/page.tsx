import { Check, ShieldCheck } from "lucide-react";
import { ContactInquiry } from "@/components/site/contact-inquiry";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact Fairhelm Systems",
  description:
    "Discuss SquareCampus, ETL and ELT pipelines, custom dashboards, or governed operational intelligence with Fairhelm Systems.",
  path: "/contact/",
});

const goodFit = [
  "A school or trust workflow that needs governed ownership",
  "An operating process held together by spreadsheets and manual reconciliation",
  "A data pipeline or dashboard leadership cannot yet trust",
  "A product or internal system that must survive scale and scrutiny",
] as const;

function FitList() {
  return (
    <ul className="flex flex-col">
      {goodFit.map((item) => (
        <li
          key={item}
          className="flex gap-4 border-b border-border py-4 text-sm leading-6 text-muted-foreground last:border-b-0 last:pb-0 first:pt-0"
        >
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary">
            <Check aria-hidden="true" className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact/" },
        ])}
      />

      <section className="relative overflow-hidden border-b border-border py-10 sm:py-16 lg:py-24">
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute -top-48 right-0 size-[34rem] rounded-full bg-primary/8 blur-3xl"
        />

        <Container className="relative grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Start with the concrete version of the problem.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Tell us what needs to work better, what is breaking down, and
              where the current system is creating drag. The useful conversation
              starts there.
            </p>

            <div className="mt-7 lg:hidden">
              <Accordion>
                <AccordionItem value="good-fit">
                  <AccordionTrigger aria-label="Is this a good fit for Fairhelm?">
                    <span className="flex items-center gap-3">
                      <ShieldCheck
                        aria-hidden="true"
                        className="size-4 text-primary"
                      />
                      Is this a good fit for Fairhelm?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <FitList />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactInquiry />
          </div>

          <Card className="mt-2 hidden border border-border bg-card/60 lg:col-start-1 lg:row-start-2 lg:block">
            <CardHeader>
              <p className="eyebrow">Good fit</p>
              <CardTitle className="mt-2 text-xl">
                Problems worth bringing to the table
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FitList />
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="border-b border-border bg-card/25 py-8 sm:py-12">
        <Container className="grid gap-3 text-sm leading-6 text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-center">
          <p>
            {siteConfig.legalName} · {siteConfig.incorporationStatus}. GSTIN
            details will be published after incorporation and applicable
            registration.
          </p>
          <p className="font-mono text-xs text-muted-foreground/80">
            No hidden submission · no data capture
          </p>
        </Container>
      </section>
    </>
  );
}
