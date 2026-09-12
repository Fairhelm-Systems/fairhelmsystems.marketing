import { existsSync } from "node:fs";
import { join } from "node:path";
import { Rss } from "lucide-react";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { Hero } from "@/components/site/hero";
import { InsightCard } from "@/components/site/insight-card";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import {
  getInsights,
  INSIGHTS_PATH,
  insightCategories,
} from "@/content/insights";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { blogSchema, breadcrumbSchema } from "@/lib/structured-data";

const baseMetadata = createPageMetadata({
  title: "Insights on Data Engineering, Dashboards and Governance",
  description:
    "Practice notes from Fairhelm Systems: reconciliation in ETL/ELT pipelines, KPI contracts and exception ownership for dashboards, audit trails and governance, and how a product-first company works.",
  path: INSIGHTS_PATH,
});

// The series cover (public/insights/cover.webp) is the social image for the
// index when it exists; otherwise the site-wide OG image stands.
const seriesCover = existsSync(
  join(process.cwd(), "public", "insights", "cover.webp"),
)
  ? { url: "/insights/cover.webp", width: 1600, height: 900, alt: "Insights" }
  : null;

export const metadata = seriesCover
  ? {
      ...baseMetadata,
      openGraph: { ...baseMetadata.openGraph, images: [seriesCover] },
      twitter: { ...baseMetadata.twitter, images: [seriesCover.url] },
    }
  : baseMetadata;

function hasCover(slug: string) {
  return existsSync(join(process.cwd(), "public", "insights", `${slug}.webp`));
}

export default function InsightsPage() {
  const posts = getInsights();
  const [latest, ...rest] = posts;
  const categories = insightCategories();

  return (
    <>
      <JsonLd
        data={[
          blogSchema(posts),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: INSIGHTS_PATH },
          ]),
        ]}
      />
      <Hero
        eyebrow="Insights · Practice notes"
        title="How governed data systems are actually built."
        highlight="actually built"
        description="Long-form notes on data engineering, decision systems and governance from the team that builds and operates SquareCampus. Frameworks and checklists you can apply with or without Fairhelm; no vendor pitches, no invented case studies."
        compact
      />

      <section className="section border-t border-border">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Topics</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="chip normal-case tracking-normal"
                  >
                    <span className="font-sans text-xs text-foreground">
                      {category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={`${INSIGHTS_PATH}feed.xml`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Rss aria-hidden="true" className="size-4 text-primary" />
              RSS feed
            </a>
          </div>

          {latest ? (
            <Reveal className="mt-8">
              <InsightCard
                post={latest}
                featured
                hasCover={hasCover(latest.slug)}
              />
            </Reveal>
          ) : null}

          {rest.length ? (
            <Reveal
              stagger
              className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {rest.map((post) => (
                <InsightCard
                  key={post.slug}
                  post={post}
                  hasCover={hasCover(post.slug)}
                />
              ))}
            </Reveal>
          ) : null}
        </Container>
      </section>

      <section className="section border-y border-border section-alt">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="How to read these notes"
            title="Standards we hold ourselves to, written down before the case studies exist."
            description={`${siteConfig.name} is a young company. These notes describe the practice it applies to its own product and to the engineering work it takes on; they cite no customers because none are published. Worked examples are hypothetical and say so.`}
          />
          <Reveal stagger className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Vendor-neutral",
                "Frameworks, checklists and decision tests that hold regardless of which tools an organisation runs.",
              ],
              [
                "Machine-readable",
                `Every note has a Markdown alternate and is listed in ${absoluteUrl("/llms.txt").replace("https://", "")}, so agents read the same text a person does.`,
              ],
              [
                "Checkable",
                "Company facts derive from one canonical record. Nothing unverified is published, here or anywhere on the site.",
              ],
              [
                "Written to be acted on",
                "Each note ends with what to do next: a checklist, a test, or a question to put to a vendor in writing.",
              ],
            ].map(([title, detail]) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-5 sm:p-6"
              >
                <h3 className="display-3">{title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                  {detail}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Recognise your operating problem in one of these notes?"
        description="Bring the concrete version of it. Scope and success measure are agreed in writing before work begins."
      />
    </>
  );
}
