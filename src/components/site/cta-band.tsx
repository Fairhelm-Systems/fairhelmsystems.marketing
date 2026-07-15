import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title = "Bring operational clarity to the systems that matter.",
  description = "Talk to Fairhelm Systems about a governed platform, a reliable data foundation, or a command surface your leadership can trust.",
  label = "Contact Fairhelm Systems",
  href = "/contact/",
}: {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="border-t border-border py-10 sm:py-24">
      <Container>
        <div className="cta-panel relative overflow-hidden rounded-3xl border border-border p-6 sm:p-10 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-14">
          <div
            aria-hidden="true"
            className="hero-grid absolute inset-0 opacity-30"
          />
          <div className="relative max-w-3xl">
            <p className="eyebrow">The next move</p>
            <h2 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "relative mt-7 w-full shrink-0 rounded-full sm:w-auto lg:mt-0",
            )}
          >
            {label}
            <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
