"use client";

import {
  Calculator,
  Cloud,
  CreditCard,
  Database,
  Layers,
  LayoutGrid,
  Sheet,
  Workflow,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * The data-engineering story in one picture: the fragmented tools a typical
 * Indian operation already runs — accounting, SaaS suites, payments, CRM,
 * spreadsheets, databases — stream through a governed ETL/ELT engine into
 * decision-ready models. Motion is all CSS/SMIL — connectors draw in, packets
 * travel the paths, cards rise. See the `.viz-reveal` rules in globals.css.
 * Tool names are illustrative of common integration sources, not endorsements.
 */

const sources = [
  { label: "Tally", icon: Calculator, top: "2%" },
  { label: "Zoho", icon: LayoutGrid, top: "18.4%" },
  { label: "Razorpay", icon: CreditCard, top: "34.8%" },
  { label: "Salesforce", icon: Cloud, top: "51.2%" },
  { label: "Google Sheets", icon: Sheet, top: "67.6%" },
  { label: "PostgreSQL", icon: Database, top: "84%" },
] as const;

// Paths from each source (x=178) into the hub (x=400, y=225), viewBox 800x450.
const inPaths = [
  "M178 32 C280 32 320 225 398 225",
  "M178 106 C280 106 320 225 398 225",
  "M178 180 C280 180 330 225 398 225",
  "M178 254 C280 254 330 225 398 225",
  "M178 328 C280 328 320 225 398 225",
  "M178 402 C280 402 320 225 398 225",
] as const;

const outPath = "M472 225 C540 225 560 225 620 225";

export function DataPipelineVisual({ className }: { className?: string }) {
  const ref = useReveal(0.2);

  return (
    <div ref={ref} className={cn("viz-reveal", className)}>
      <div className="viz-panel rounded-3xl border border-border bg-card/70 p-4 backdrop-blur sm:p-6">
        <div className="viz-cap" />

        <div className="relative aspect-800/450 w-full">
          <svg
            viewBox="0 0 800 450"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {inPaths.map((d, index) => (
              <g key={d}>
                <path
                  d={d}
                  data-draw
                  pathLength={1}
                  style={{ "--d": `${150 + index * 80}ms` } as CSSProperties}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.4"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
                {[0, 1.4].map((delay) => (
                  <circle
                    key={delay}
                    data-packet
                    r="3.2"
                    fill="var(--primary)"
                    opacity="0.85"
                  >
                    <animateMotion
                      dur="2.8s"
                      begin={`${delay + index * 0.35}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                ))}
              </g>
            ))}
            <path
              d={outPath}
              data-draw
              pathLength={1}
              style={{ "--d": "700ms" } as CSSProperties}
              fill="none"
              stroke="var(--chart-4)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {[0, 0.9, 1.8].map((delay) => (
              <circle key={delay} data-packet r="3.6" fill="var(--chart-4)">
                <animateMotion
                  dur="1.6s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  path={outPath}
                />
              </circle>
            ))}
          </svg>

          {sources.map((source, index) => (
            <div
              key={source.label}
              data-rise
              style={
                {
                  "--d": `${120 + index * 70}ms`,
                  top: source.top,
                } as CSSProperties
              }
              className="absolute left-0 flex w-[24%] items-center gap-1.5 rounded-full border border-border bg-background/70 px-2 py-1.5 shadow-lg backdrop-blur-md sm:gap-2 sm:px-3 sm:py-2"
            >
              <source.icon className="size-3 shrink-0 text-primary sm:size-4" />
              <span className="truncate text-[0.55rem] font-medium text-foreground sm:text-[0.72rem]">
                {source.label}
              </span>
            </div>
          ))}

          <div
            data-rise
            style={{ "--d": "80ms" } as CSSProperties}
            className="absolute left-1/2 top-1/2 z-10 flex w-[20%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-2xl border border-primary/40 bg-card px-2 py-2.5 text-center shadow-2xl backdrop-blur-xl sm:gap-1.5 sm:py-4"
          >
            <span className="viz-pulse flex size-6 items-center justify-center rounded-full bg-primary/15 sm:size-9">
              <Workflow className="size-3 text-primary sm:size-4.5" />
            </span>
            <span className="font-mono text-[0.44rem] tracking-[0.16em] text-muted-foreground uppercase sm:text-[0.56rem]">
              ETL / ELT engine
            </span>
            <span className="hidden text-[0.62rem] leading-4 text-muted-foreground sm:block">
              Validate · reconcile · model
            </span>
          </div>

          <div
            data-rise
            style={{ "--d": "600ms" } as CSSProperties}
            className="absolute right-0 top-1/2 z-10 w-[25%] -translate-y-1/2 rounded-2xl border border-primary/40 bg-card p-2 shadow-2xl backdrop-blur-xl sm:p-3.5"
          >
            <div className="flex items-center gap-1.5">
              <Layers className="size-3 shrink-0 text-chart-4 sm:size-4" />
              <span className="truncate font-mono text-[0.44rem] tracking-[0.14em] text-muted-foreground uppercase sm:text-[0.56rem]">
                Governed models
              </span>
            </div>
            <div className="mt-1.5 flex items-end gap-1 sm:mt-2.5 sm:gap-1.5">
              {[42, 68, 55, 82, 74].map((h, i) => (
                <span
                  key={h}
                  data-grow
                  className="w-full rounded-t-[3px] bg-linear-to-t from-primary to-chart-4"
                  style={
                    {
                      height: `${h * 0.4}px`,
                      "--d": `${900 + i * 90}ms`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <div className="mt-1.5 grid gap-1 sm:mt-2.5">
              {["Reconciled", "Observable refresh"].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-1 rounded-md bg-secondary/50 px-1.5 py-0.5 sm:px-2 sm:py-1"
                >
                  <span className="truncate text-[0.5rem] text-muted-foreground sm:text-[0.62rem]">
                    {label}
                  </span>
                  <span className="size-1 rounded-full bg-chart-4 sm:size-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div
            data-rise
            style={{ "--d": "1100ms" } as CSSProperties}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[0.42rem] tracking-[0.16em] text-muted-foreground uppercase sm:px-4 sm:py-2 sm:text-[0.56rem]"
          >
            Known sources · explicit boundaries · decision-ready output
          </div>
        </div>
      </div>
    </div>
  );
}
