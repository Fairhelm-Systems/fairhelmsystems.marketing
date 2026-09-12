"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/site/logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Close the drawer on navigation and lock body scroll while it is open.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger, not a value the effect reads
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-2.5 pl-3.5 transition-[background-color,border-color,box-shadow] duration-300 sm:h-[3.75rem] sm:pl-4",
          scrolled || open
            ? "border-border-strong bg-surface-raised shadow-[var(--shadow-1)] backdrop-blur-xl"
            : "border-border bg-surface backdrop-blur-xl",
        )}
      >
        <Logo />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-[0.84rem] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                isActive(item.href) && "bg-accent text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact/"
            className={cn(
              buttonVariants({ size: "default" }),
              "hidden sm:inline-flex",
            )}
          >
            Start a conversation
            <ArrowRight data-icon="inline-end" />
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:border-border-strong lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        id="mobile-navigation"
        hidden={!open}
        className="fixed inset-x-0 top-0 bottom-0 z-30 lg:hidden"
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        />
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-3 top-[4.6rem] rounded-3xl border border-border-strong bg-surface-raised p-3 shadow-[var(--shadow-3)] backdrop-blur-xl sm:inset-x-5 sm:top-[5.1rem]"
        >
          <div className="flex flex-col">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-accent",
                  isActive(item.href) && "bg-accent",
                )}
              >
                {item.label}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </Link>
            ))}
          </div>
          <div className="mt-3 grid gap-2 border-t border-border pt-3">
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Start a conversation
              <ArrowRight data-icon="inline-end" />
            </Link>
            <a
              href={siteConfig.product.url}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full",
              )}
            >
              Visit squarecampus.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
