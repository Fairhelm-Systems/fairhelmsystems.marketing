import { Activity, Check, DatabaseZap, ShieldCheck } from "lucide-react";

const signals = [
  { label: "Governance", value: "Enforced", icon: ShieldCheck },
  { label: "Data quality", value: "Observed", icon: DatabaseZap },
  { label: "Operational state", value: "Clear", icon: Activity },
] as const;

export function SystemPanel() {
  return (
    <div
      data-md-skip
      role="img"
      aria-label="Illustrative control-plane panel showing governance, data quality and operational state signals. Decorative, not a live system."
      className="system-panel relative mx-auto max-w-lg rounded-3xl border border-border bg-card/70 p-3 shadow-2xl backdrop-blur sm:p-4"
    >
      <div className="rounded-2xl border border-border bg-background/80 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Fairhelm control plane
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">
              Institutional systems
            </p>
          </div>
          <span className="flex items-center gap-2 text-xs text-primary">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
            Governed
          </span>
        </div>
        <div className="grid gap-3 py-4">
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-secondary/50 p-3.5"
            >
              <span className="flex items-center gap-3 text-sm text-muted-foreground">
                <signal.icon
                  aria-hidden="true"
                  className="size-4 text-primary"
                />
                {signal.label}
              </span>
              <span className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Check aria-hidden="true" className="size-3.5 text-primary" />
                {signal.value}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
          {[
            ["RBAC", "Role-aware"],
            ["Audit", "Traceable"],
            ["Scale", "Disciplined"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-1 text-[0.62rem] text-muted-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
