import Link from "next/link";
import { Container } from "@/components/site/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="hero-grid absolute inset-0 opacity-50"
      />
      <Container className="relative max-w-3xl text-center">
        <p className="font-mono text-sm text-primary">404 · Route not found</p>
        <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
          This path is outside the system.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          The page may have moved, or the address may be incomplete. Return to
          the canonical Fairhelm Systems site.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full")}
        >
          Return home
        </Link>
      </Container>
    </section>
  );
}
