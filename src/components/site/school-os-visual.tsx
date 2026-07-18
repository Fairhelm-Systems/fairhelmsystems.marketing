"use client";

import { ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/**
 * SquareCampus's operating model as one picture: institutional cycles orbit a
 * single governed core. A dot rides the orbit and each cycle node breathes in
 * sequence (reusing the `.svg-*` animation classes in globals.css); the panel
 * and caption stage in via `.viz-reveal`.
 */

// Five cycle nodes evenly placed on the orbit ellipse (center 280,110).
const nodes = [
  [280, 30, "ACADEMIC"],
  [440, 85, "ATTENDANCE"],
  [379, 175, "FEES"],
  [181, 175, "EXAMS"],
  [120, 85, "REPORTING"],
] as const;

const orbit = "M448 110 A168 80 0 1 1 112 110 A168 80 0 1 1 448 110";

export function SchoolOsVisual({ className }: { className?: string }) {
  const ref = useReveal(0.2);

  return (
    <div ref={ref} className={cn("viz-reveal", className)}>
      <div className="viz-panel rounded-3xl border border-border bg-card/70 p-4 backdrop-blur sm:p-5">
        <div className="viz-cap" />

        <div data-rise style={{ "--d": "80ms" } as CSSProperties}>
          <svg
            viewBox="0 0 560 220"
            className="h-auto w-full"
            role="img"
            aria-label="Institutional cycles orbiting a single governed School OS core"
          >
            <defs>
              <linearGradient id="school-flow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0.9" />
                <stop offset="1" stopColor="var(--chart-2)" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="school-glow">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {nodes.map(([x, y]) => (
              <line
                key={`spoke-${x}-${y}`}
                className="svg-spoke"
                x1="280"
                y1="110"
                x2={x}
                y2={y}
                stroke="var(--primary)"
                strokeWidth="1"
              />
            ))}

            <ellipse
              cx="280"
              cy="110"
              rx="168"
              ry="80"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <ellipse
              className="svg-flow-dash"
              cx="280"
              cy="110"
              rx="168"
              ry="80"
              fill="none"
              stroke="url(#school-flow)"
              strokeWidth="2"
            />
            <ellipse
              className="svg-flow-dash svg-flow-reverse"
              cx="280"
              cy="110"
              rx="156"
              ry="71"
              fill="none"
              stroke="var(--chart-2)"
              strokeWidth="1.25"
              opacity="0.5"
            />

            <circle
              className="svg-traveler"
              cx="0"
              cy="0"
              r="3.5"
              fill="var(--primary)"
              style={
                {
                  offsetPath: `path("${orbit}")`,
                  animationDuration: "9s",
                } as CSSProperties
              }
            />
            <circle
              className="svg-traveler"
              cx="0"
              cy="0"
              r="2"
              fill="var(--primary)"
              opacity="0.55"
              style={
                {
                  offsetPath: `path("${orbit}")`,
                  animationDuration: "9s",
                  animationDelay: "-4.5s",
                } as CSSProperties
              }
            />

            <circle
              className="svg-core-glow"
              cx="280"
              cy="110"
              r="46"
              fill="url(#school-glow)"
            />
            <circle
              cx="280"
              cy="110"
              r="40"
              fill="var(--card)"
              stroke="var(--primary)"
              strokeOpacity="0.55"
            />
            <text
              x="280"
              y="106"
              textAnchor="middle"
              fill="var(--foreground)"
              fontSize="13"
              fontWeight="600"
            >
              SCHOOL OS
            </text>
            <text
              x="280"
              y="124"
              textAnchor="middle"
              fill="var(--muted-foreground)"
              fontSize="9"
              letterSpacing="2"
            >
              ONE STATE
            </text>

            {nodes.map(([x, y, label], index) => (
              <g
                key={label}
                className="svg-node-pulse"
                style={{ animationDelay: `${index * 420}ms` }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill="url(#school-glow)"
                  opacity="0.7"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="17"
                  fill="var(--background)"
                  stroke="var(--primary)"
                  strokeOpacity="0.65"
                />
                <text
                  x={x}
                  y={Number(y) + 3}
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize="7"
                  letterSpacing="0.5"
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div
          data-rise
          style={{ "--d": "520ms" } as CSSProperties}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {["Cycle-native", "Trust-aware", "Role-scoped"].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground uppercase"
            >
              <ShieldCheck className="size-3 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
