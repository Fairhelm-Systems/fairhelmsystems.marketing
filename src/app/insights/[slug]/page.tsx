import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowLeft, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardMotif } from "@/components/site/card-motif";
import { Container } from "@/components/site/container";
import { CtaBand } from "@/components/site/cta-band";
import { DataField } from "@/components/site/data-field";
import {
  InsightCard,
  insightCover,
  motifForCategory,
} from "@/components/site/insight-card";
import { JsonLd } from "@/components/site/json-ld";
import { PageNav } from "@/components/site/page-nav";
import { Prose } from "@/components/site/prose";
import { Reveal } from "@/components/site/reveal";
import {
  formatInsightDate,
  getInsight,
  getInsights,
  INSIGHTS_PATH,
} from "@/content/insights";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getInsights().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  const base = createPageMetadata({
    title: post.title,
    description: post.description,
    path: post.path,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: `${post.date}T00:00:00Z`,
      authors: [siteConfig.founder.name],
      section: post.category,
    },
  };
}

function hasCover(slug: string) {
  return existsSync(join(process.cwd(), "public", "insights", `${slug}.webp`));
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const all = getInsights();
  const index = all.findIndex((p) => p.slug === post.slug);
  const next = all[index + 1] ?? all[0];
  const related = all
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const cover = hasCover(post.slug);

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: INSIGHTS_PATH },
            { name: post.title, path: post.path },
          ]),
        ]}
      />

      <article>
        <div className="hero-bleed relative isolate overflow-hidden border-b border-border">
          <div
            aria-hidden="true"
            className="hero-grid absolute inset-0 -z-10 opacity-45"
          />
          <div
            aria-hidden="true"
            className="hero-glow absolute inset-x-0 top-0 -z-10 h-[32rem]"
          />
          <DataField className="-z-10" />
          <Container className="relative max-w-5xl pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16">
            <Link
              href={INSIGHTS_PATH}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All insights
            </Link>
            <div className="hero-enter mt-8 flex flex-col gap-5">
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-primary">{post.category}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-6 bg-border-strong"
                />
                <time dateTime={post.date}>{formatInsightDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 aria-hidden="true" className="size-3" />
                  {post.minutes} min read
                </span>
              </p>
              <h1 className="display-1 max-w-4xl">{post.title}</h1>
              <p className="lead max-w-3xl text-pretty">{post.description}</p>
              <p className="flex items-center gap-3 pt-1 text-sm text-muted-foreground">
                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary font-mono text-[0.62rem] tracking-[0.1em] text-foreground">
                  {siteConfig.founder.initials}
                </span>
                <span>
                  <span className="font-medium text-foreground">
                    {siteConfig.founder.name}
                  </span>
                  <span className="mx-1.5">·</span>
                  {siteConfig.founder.title}, {siteConfig.name}
                </span>
              </p>
            </div>
          </Container>
        </div>

        {cover ? (
          <Container className="max-w-5xl">
            <div className="relative -mt-6 aspect-[16/7] overflow-hidden rounded-3xl border border-border bg-secondary shadow-[var(--shadow-2)] sm:-mt-10">
              <Image
                src={insightCover(post.slug)}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        ) : null}

        <Container className="max-w-5xl">
          <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[13rem_1fr] lg:gap-16">
            <aside className="min-w-0 self-start lg:sticky lg:top-28">
              <p className="eyebrow">On this page</p>
              <nav
                aria-label="Article sections"
                className="no-scrollbar mt-4 flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
              >
                {post.headings.map((heading, i) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground lg:rounded-lg lg:border-transparent lg:py-2 lg:text-sm lg:whitespace-normal lg:hover:bg-accent"
                  >
                    <span className="mr-2 font-mono text-[0.62rem] text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {heading.text}
                  </a>
                ))}
              </nav>
              <div className="mt-8 hidden rounded-3xl border border-border bg-card p-5 lg:block">
                <p className="eyebrow text-[0.6rem]">Related lane</p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {post.laneLabel}
                </p>
                <Link
                  href={post.lane}
                  className="mt-3 inline-flex text-sm text-primary hover:underline"
                >
                  How Fairhelm works on this
                </Link>
              </div>
            </aside>

            <div className="min-w-0">
              <Prose blocks={post.blocks} />

              <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-7">
                <CardMotif motif={motifForCategory(post.category)} />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary font-mono text-xs tracking-[0.1em] text-foreground">
                      {siteConfig.founder.initials}
                    </span>
                    <div>
                      <p className="font-heading text-lg text-foreground">
                        {siteConfig.founder.name}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {siteConfig.founder.title}, {siteConfig.name}.{" "}
                        {siteConfig.founder.bio}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={post.lane}
                    className="shrink-0 text-sm font-medium text-primary hover:underline"
                  >
                    {post.laneLabel} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </article>

      {related.length ? (
        <section className="section border-t border-border section-alt">
          <Container>
            <p className="eyebrow">More in {post.category}</p>
            <Reveal stagger className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <InsightCard
                  key={p.slug}
                  post={p}
                  hasCover={hasCover(p.slug)}
                />
              ))}
            </Reveal>
          </Container>
        </section>
      ) : null}

      <PageNav
        items={[
          {
            eyebrow: "Next note",
            title: next.title,
            description: next.description,
            href: next.path,
          },
          {
            eyebrow: "Related lane",
            title: post.laneLabel,
            description: "How Fairhelm applies this standard in its own work.",
            href: post.lane,
          },
        ]}
      />

      <CtaBand
        title="Recognise this problem in your own operation?"
        description="Bring the concrete version of it. Scope and success measure are agreed in writing before work begins."
      />
    </>
  );
}
