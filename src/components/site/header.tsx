"use client";

import { animate } from "animejs/animation";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 48);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const shell = shellRef.current;
    if (
      !shell ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const transition = animate(shell, {
      y: { from: isScrolled ? -8 : 6 },
      scale: { from: isScrolled ? 0.985 : 1.01 },
      duration: 480,
      ease: "out(4)",
    });

    return () => {
      transition.cancel();
    };
  }, [isScrolled]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-18 transition-colors duration-300",
        isScrolled
          ? "bg-transparent"
          : "border-b border-border/70 bg-background/88 backdrop-blur-xl",
      )}
    >
      <Container
        ref={shellRef}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between transition-[height,max-width,margin,padding,border-radius,background-color,border-color,box-shadow] duration-500 ease-out",
          isScrolled
            ? "mt-3 h-14 max-w-5xl rounded-full border border-border bg-background/92 px-2.5 shadow-2xl shadow-background/50 backdrop-blur-xl sm:px-3 lg:px-3"
            : "h-18",
        )}
      >
        <span className="nav-progress" aria-hidden="true" />
        <Logo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact/"
          className={cn(
            buttonVariants({ size: "sm" }),
            "hidden rounded-full lg:inline-flex",
          )}
        >
          Start a conversation
          <ArrowUpRight data-icon="inline-end" />
        </Link>
        <details className="group relative lg:hidden">
          <summary className="flex size-10 list-none items-center justify-center rounded-full border border-border bg-secondary text-foreground [&::-webkit-details-marker]:hidden">
            <Menu aria-hidden="true" className="size-4" />
            <span className="sr-only">Open navigation</span>
          </summary>
          <div className="absolute top-13 right-0 w-[min(21rem,calc(100vw-2.5rem))] rounded-2xl border border-border bg-popover p-3 shadow-2xl">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-popover-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact/"
                className={cn(buttonVariants(), "mt-2 w-full rounded-full")}
              >
                Start a conversation
              </Link>
            </nav>
          </div>
        </details>
      </Container>
    </header>
  );
}
