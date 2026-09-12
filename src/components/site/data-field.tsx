/**
 * The faint wall of operational tokens behind a hero — reconciliation states,
 * audit marks, role scopes — the family's background texture. Rows render
 * from a `data-row` attribute through a CSS pseudo-element, so none of this
 * text enters the DOM, the Markdown alternates or a crawler's view of the
 * page. Deterministic: the same rows on server and client.
 */
const tokens = [
  "RECONCILED",
  "✓ ✓",
  "AUDIT",
  "RBAC",
  "LINEAGE OK",
  "09:40",
  "ROUTED",
  "OWNER SET",
  "T2",
  "SCOPE",
  "REFRESH 06:00",
  "Δ 0",
  "LOGGED",
  "ENFORCED",
  "→",
  "REVIEWED",
  "CONTROL TOTAL",
  "·",
  "IDEMPOTENT",
  "SLA OK",
  "RETRY 0",
  "TENANT A",
  "SIGNED OFF",
  "FRESH",
] as const;

function row(seed: number, length = 26) {
  const out: string[] = [];
  let x = seed * 9301 + 49297;
  for (let i = 0; i < length; i += 1) {
    x = (x * 1103515245 + 12345) % 2147483648;
    out.push(tokens[x % tokens.length]);
  }
  return out.join("  ");
}

const rows = Array.from({ length: 22 }, (_, i) => row(i + 1));

export function DataField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-md-skip
      className={className ? `data-field ${className}` : "data-field"}
    >
      {rows.map((text, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: rows are static and never reorder
          key={index}
          className="data-field-row"
          data-row={text}
        />
      ))}
    </div>
  );
}
