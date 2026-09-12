"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked entrance for section content. `stagger` reveals each direct
 * child in sequence (see `.reveal-stagger` in globals.css). Content is in the
 * DOM at all times — only opacity and a small translate change — and
 * reduced-motion users see the final state immediately.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  threshold = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  threshold?: number;
}) {
  const ref = useReveal<HTMLDivElement>(threshold);
  return (
    <div
      ref={ref}
      className={cn(stagger ? "reveal-stagger" : "reveal", className)}
      style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
