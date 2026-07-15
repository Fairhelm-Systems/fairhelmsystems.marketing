"use client";

import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type MobileBriefItem = {
  title: string;
  label?: string;
  description: string;
  bullets?: readonly string[];
  href?: string;
  linkLabel?: string;
};

export function MobileBrief({
  eyebrow = "Explore",
  title = "Choose what matters.",
  description = "Open only the topic you want. The full detail is one tap away.",
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: readonly MobileBriefItem[];
}) {
  return (
    <section className="border-b border-border py-10 md:hidden">
      <div className="mx-auto w-full max-w-7xl px-5">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] text-foreground">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <Accordion className="mt-6 border-border bg-card/60" defaultValue={[]}>
          {items.map((item, index) => (
            <AccordionItem key={item.title} value={`brief-${index}`}>
              <AccordionTrigger className="items-center p-5 hover:no-underline">
                <span className="flex min-w-0 flex-col gap-1">
                  {item.label ? (
                    <span className="font-mono text-[0.65rem] tracking-[0.16em] text-primary uppercase">
                      {item.label}
                    </span>
                  ) : null}
                  <span className="text-base font-semibold text-foreground">
                    {item.title}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground [&_a]:no-underline">
                <p className="leading-6">{item.description}</p>
                {item.bullets?.length ? (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5">
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-3.5 shrink-0 text-primary"
                        />
                        <span className="leading-5">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.href && item.linkLabel ? (
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "mt-5 w-full rounded-full",
                    )}
                  >
                    {item.linkLabel}
                    <ArrowUpRight data-icon="inline-end" />
                  </Link>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
