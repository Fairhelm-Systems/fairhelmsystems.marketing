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

function CyclesIllustration() {
  const nodes = [
    [280, 30, "YEAR"],
    [438, 110, "FEES"],
    [280, 190, "EXAMS"],
    [122, 110, "ATTEND"],
  ] as const;

  return (
    <g>
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
        rx="143"
        ry="62"
        fill="none"
        stroke="url(#flow-cycles)"
        strokeWidth="2"
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
  return (
    <g>
      <path
        className="svg-flow-dash"
        d="M76 58 C166 58 166 110 246 110 S330 162 484 162"
        fill="none"
        stroke="url(#flow-pipeline)"
        strokeWidth="2"
      />
      <path
        className="svg-flow-dash svg-delay"
        d="M76 162 C166 162 170 110 246 110 S334 58 484 58"
        fill="none"
        stroke="var(--chart-2)"
        strokeWidth="1.5"
      />
      {[
        [76, 58],
        [76, 162],
        [246, 110],
        [484, 58],
        [484, 162],
      ].map(([x, y], index) => (
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
          <circle cx={x} cy={y} r="4" fill="var(--primary)" />
        </g>
      ))}
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
  return (
    <g>
      <circle cx="280" cy="110" r="78" fill="none" stroke="var(--border)" />
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
      {[
        [170, 110, "RBAC"],
        [390, 110, "AUDIT"],
        [280, 20, "PRIVACY"],
        [280, 200, "CONTROL"],
      ].map(([x, y, label], index) => (
        <g
          key={String(label)}
          className="svg-node-pulse"
          style={{ animationDelay: `${index * 480}ms` }}
        >
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
