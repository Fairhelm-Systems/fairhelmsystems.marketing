import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { InsightCard } from "@/components/site/insight-card";
import { Reveal } from "@/components/site/reveal";
import {
  getInsights,
  INSIGHTS_PATH,
  insightsForLane,
} from "@/content/insights";
import { cn } from "@/lib/utils";

function hasCover(slug: string) {
  return existsSync(join(process.cwd(), "public", "insights", `${slug}.webp`));
}

/**
 * Up to three Insights for a page. With `lane` set, the notes that belong to
 * that page; without it, the newest notes. Renders nothing when there are
 * none, so a page never shows an empty shelf.
 */
export function RelatedInsights({
  lane,
  eyebrow = "Insights",
  title = "Practice notes on this work.",
  number,
  className,
}: {
  lane?: string;
  eyebrow?: string;
  title?: string;
  number?: string;
  className?: string;
}) {
  const posts = lane ? insightsForLane(lane) : getInsights().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className={cn("section border-t border-border", className)}>
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-3">
              {number ? (
                <>
                  <span className="text-primary">{number}</span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6 bg-border-strong"
                  />
                </>
              ) : null}
              <span>{eyebrow}</span>
            </p>
            <h2 className="display-2 mt-4">{title}</h2>
          </div>
          <Link
            href={INSIGHTS_PATH}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            All insights
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <Reveal
          stagger
          className={cn(
            "mt-8 grid gap-4",
            posts.length === 1
              ? "lg:grid-cols-[minmax(0,2fr)_1fr]"
              : posts.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {posts.map((post) => (
            <InsightCard
              key={post.slug}
              post={post}
              hasCover={hasCover(post.slug)}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
