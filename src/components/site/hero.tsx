import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/site/container";
import { MotionField } from "@/components/site/motion-field";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 h-[32rem]"
      />
      <MotionField />
      <Container
        className={cn(
          "relative grid items-center gap-8 py-12 sm:gap-12 sm:py-24 lg:grid-cols-[1.12fr_0.88fr] lg:py-32",
          compact && "lg:grid-cols-1 lg:py-24",
        )}
      >
        <div className="flex max-w-4xl flex-col gap-5 sm:gap-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-7xl lg:leading-[1.02]">
            {title}
          </h1>
          <p className="max-w-3xl text-pretty text-[0.95rem] leading-6 text-muted-foreground sm:text-lg sm:leading-8 lg:text-xl">
            {description}
          </p>
          {primary || secondary ? (
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {primary ? (
                <Link
                  href={primary.href}
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
                >
                  {primary.label}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              ) : null}
              {secondary ? (
                <Link
                  href={secondary.href}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "rounded-full",
                  )}
                >
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
        {children ? (
          <div className={cn("hidden md:block", compact && "md:hidden")}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
