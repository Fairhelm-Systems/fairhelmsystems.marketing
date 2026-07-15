import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type IllustrationVariant = "cycles" | "pipeline" | "signals" | "governance";

export function AnimatedSystemIllustration({
  variant,
  className,
}: {
  variant: IllustrationVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "system-illustration relative overflow-hidden rounded-2xl border border-border bg-background/55",
        className,
      )}
    >
      <svg viewBox="0 0 560 220" className="h-auto w-full" role="presentation">
        <defs>
          <linearGradient id={`flow-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--chart-2)" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id={`glow-${variant}`}>
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="0.7" stopColor="var(--primary)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sweep-${variant}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="0.6" stopColor="var(--primary)" stopOpacity="0.05" />
            <stop offset="1" stopColor="var(--primary)" stopOpacity="0.34" />
          </linearGradient>
          <pattern
            id={`grid-${variant}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="560"
          height="220"
          fill={`url(#grid-${variant})`}
          opacity="0.7"
        />
        {variant === "cycles" ? <CyclesIllustration /> : null}
        {variant === "pipeline" ? <PipelineIllustration /> : null}
        {variant === "signals" ? <SignalsIllustration /> : null}
        {variant === "governance" ? <GovernanceIllustration /> : null}
      </svg>
    </div>
  );
}

// A small dot that rides an SVG path via CSS `offset-path`. Motion is applied
// by the `.svg-traveler` class, which only exists inside the reduced-motion
// `no-preference` block — so reduced-motion users see a static dot parked at
// the path start. `offset-distance` animation stays cheap: a single tiny mark.
function Traveler({
  path,
  r = 3,
  fill = "var(--primary)",
  opacity = 1,
  dur = 7,
  delay = 0,
}: {
  path: string;
  r?: number;
  fill?: string;
  opacity?: number;
  dur?: number;
  delay?: number;
}) {
  return (
    <circle
      className="svg-traveler"
      cx="0"
      cy="0"
      r={r}
      fill={fill}
      opacity={opacity}
      style={
        {
          offsetPath: `path("${path}")`,
          offsetRotate: "0deg",
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
        } as CSSProperties
      }
    />
  );
}

function CyclesIllustration() {
  const nodes = [
    [280, 30, "YEAR"],
    [438, 110, "FEES"],
    [280, 190, "EXAMS"],
    [122, 110, "ATTEND"],
  ] as const;
  const orbit = "M423 110 A143 62 0 1 1 137 110 A143 62 0 1 1 423 110";

  return (
    <g>
      {nodes.map(([x, y], index) => (
        <line
          key={`spoke-${x}-${y}`}
          className="svg-spoke"
          x1="280"
          y1="110"
          x2={x}
          y2={y}
          stroke="var(--primary)"
          strokeWidth="1"
          style={{ animationDelay: `${index * 400}ms` }}
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
      <ellipse
        className="svg-flow-dash"
        cx="280"
        cy="110"
        rx="143"
        ry="62"
        fill="none"
        stroke="url(#flow-cycles)"
        strokeWidth="2"
      />
      <Traveler path={orbit} r={3.5} dur={9} />
      <Traveler path={orbit} r={2} opacity={0.55} dur={9} delay={-4.5} />
      <circle
        className="svg-core-glow"
        cx="280"
        cy="110"
        r="46"
        fill="url(#glow-cycles)"
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
          <circle cx={x} cy={y} r="26" fill="url(#glow-cycles)" opacity="0.7" />
          <circle
            cx={x}
            cy={y}
            r="18"
            fill="var(--background)"
            stroke="var(--primary)"
            strokeOpacity="0.65"
          />
          <text
            x={x}
            y={y + 3}
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="7"
            letterSpacing="1"
          >
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}

function PipelineIllustration() {
  const main = "M76 58 C166 58 166 110 246 110 S330 162 484 162";
  const back = "M76 162 C166 162 170 110 246 110 S334 58 484 58";
  const nodes = [
    [76, 58],
    [76, 162],
    [246, 110],
    [484, 58],
    [484, 162],
  ] as const;

  return (
    <g>
      <path
        className="svg-flow-dash"
        d={main}
        fill="none"
        stroke="url(#flow-pipeline)"
        strokeWidth="2"
      />
      <path
        className="svg-flow-dash svg-delay"
        d={back}
        fill="none"
        stroke="var(--chart-2)"
        strokeWidth="1.5"
      />
      <Traveler path={main} r={3.5} dur={6} />
      <Traveler path={main} r={2.5} opacity={0.7} dur={6} delay={-2} />
      <Traveler path={main} r={2} opacity={0.5} dur={6} delay={-4} />
      <Traveler
        path={back}
        r={2.5}
        fill="var(--chart-2)"
        opacity={0.8}
        dur={7.5}
        delay={-3}
      />
      {nodes.map(([x, y], index) => (
        <g
          key={`${x}-${y}`}
          className="svg-node-pulse"
          style={{ animationDelay: `${index * 360}ms` }}
        >
          <rect
            x={x - 26}
            y={y - 18}
            width="52"
            height="36"
            rx="10"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <circle
            cx={x}
            cy={y}
            r="13"
            fill="url(#glow-pipeline)"
            opacity="0.7"
          />
          <circle cx={x} cy={y} r="4" fill="var(--primary)" />
        </g>
      ))}
      <circle
        className="svg-ping"
        cx="246"
        cy="110"
        r="16"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />
      <text
        x="76"
        y="31"
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize="9"
        letterSpacing="2"
      >
        SOURCES
      </text>
      <text
        x="246"
        y="76"
        textAnchor="middle"
        fill="var(--foreground)"
        fontSize="10"
        letterSpacing="1.5"
      >
        VALIDATE
      </text>
      <text
        x="484"
        y="110"
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize="9"
        letterSpacing="2"
      >
        MODELS
      </text>
    </g>
  );
}

function SignalsIllustration() {
  const bars = [34, 58, 46, 82, 70, 108, 96, 132] as const;
  return (
    <g>
      <line x1="54" y1="176" x2="506" y2="176" stroke="var(--border)" />
      {bars.map((height, index) => (
        <rect
          key={height}
          className="svg-signal-bar"
          style={{ animationDelay: `${index * 110}ms` }}
          x={72 + index * 54}
          y={176 - height}
          width="24"
          height={height}
          rx="5"
          fill="var(--primary)"
          opacity={0.22 + index * 0.07}
        />
      ))}
      <path
        className="svg-signal-line"
        d="M76 132 L130 116 L184 126 L238 83 L292 98 L346 54 L400 70 L454 31"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="svg-node-pulse"
        cx="454"
        cy="31"
        r="6"
        fill="var(--primary)"
      />
      <text
        x="54"
        y="202"
        fill="var(--muted-foreground)"
        fontSize="9"
        letterSpacing="2"
      >
        SIGNAL → EXCEPTION → OWNER → ACTION
      </text>
    </g>
  );
}

function GovernanceIllustration() {
  const nodes = [
    [170, 110, "RBAC"],
    [390, 110, "AUDIT"],
    [280, 20, "PRIVACY"],
    [280, 200, "CONTROL"],
  ] as const;

  return (
    <g>
      <circle cx="280" cy="110" r="78" fill="none" stroke="var(--border)" />
      <g className="svg-radar">
        <path
          d="M280 110 L346.7 83 A72 72 0 0 1 346.7 137 Z"
          fill="url(#sweep-governance)"
        />
        <line
          x1="280"
          y1="110"
          x2="356"
          y2="110"
          stroke="var(--primary)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          strokeLinecap="round"
        />
      </g>
      <circle
        className="svg-governance-orbit"
        cx="280"
        cy="110"
        r="66"
        fill="none"
        stroke="url(#flow-governance)"
        strokeWidth="2"
        strokeDasharray="14 12"
      />
      <circle
        className="svg-orbit-reverse"
        cx="280"
        cy="110"
        r="52"
        fill="none"
        stroke="var(--chart-2)"
        strokeWidth="1.25"
        strokeDasharray="3 10"
        opacity="0.6"
      />
      <circle
        className="svg-core-glow"
        cx="280"
        cy="112"
        r="44"
        fill="url(#glow-governance)"
      />
      <path
        d="M280 58 L324 78 V111 C324 139 306 157 280 168 C254 157 236 139 236 111 V78 Z"
        fill="var(--card)"
        stroke="var(--primary)"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <path
        d="M260 111 L274 125 L302 94"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {nodes.map(([x, y, label], index) => (
        <g
          key={String(label)}
          className="svg-node-pulse"
          style={{ animationDelay: `${index * 480}ms` }}
        >
          <circle
            cx={Number(x)}
            cy={Number(y)}
            r="14"
            fill="url(#glow-governance)"
            opacity="0.7"
          />
          <circle cx={Number(x)} cy={Number(y)} r="5" fill="var(--primary)" />
          <text
            x={Number(x)}
            y={Number(y) - 12}
            textAnchor="middle"
            fill="var(--muted-foreground)"
            fontSize="8"
            letterSpacing="1.4"
          >
            {label}
          </text>
        </g>
      ))}
    </g>
  );
}
