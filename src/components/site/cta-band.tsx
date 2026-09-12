import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function CtaBand({
  eyebrow = "Next move",
  title = "Bring operational clarity to the systems that matter.",
  description = "Talk to Fairhelm Systems about SquareCampus, a reliable data foundation, or a command surface your leadership can trust.",
  label = "Start a conversation",
  href = "/contact/",
  secondaryLabel = "Visit squarecampus.com",
  secondaryHref = siteConfig.product.url,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  label?: string;
  href?: string;
  secondaryLabel?: string | null;
  secondaryHref?: string;
}) {
  const external = /^https?:/.test(secondaryHref);
  return (
    <section className="section pt-4 sm:pt-8 lg:pt-10">
      <Container>
        <div className="cta-panel relative overflow-hidden rounded-3xl border border-border p-6 sm:p-10 lg:p-14">
          <div
            aria-hidden="true"
            className="hero-grid absolute inset-0 opacity-40"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="display-2 mt-4">{title}</h2>
              <p className="lead mt-4 max-w-2xl">{description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link
                href={href}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                {label}
                <ArrowRight data-icon="inline-end" />
              </Link>
              {secondaryLabel ? (
                external ? (
                  <a
                    href={secondaryHref}
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "w-full sm:w-auto",
                    )}
                  >
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link
                    href={secondaryHref}
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "w-full sm:w-auto",
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                )
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
