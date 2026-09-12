import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The family's standard card: an optional mono index or label, an icon in a
 * soft tile, a Sora title and a short description. When `href` is given the
 * whole card is the link.
 */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  meta,
  index,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description: string;
  href?: string;
  meta?: string;
  index?: string;
  className?: string;
}) {
  const external = href ? /^https?:/.test(href) : false;
  const linkClass =
    "after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none";

  return (
    <div
      data-slot="card"
      className={cn(
        "group/card relative flex h-full flex-col rounded-3xl border border-border bg-card p-5 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-secondary text-primary">
            <Icon aria-hidden="true" className="size-4" />
          </span>
        ) : index ? (
          <span className="index">{index}</span>
        ) : (
          <span />
        )}
        {href ? (
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-muted-foreground transition-colors group-hover/card:text-primary"
          />
        ) : null}
      </div>
      {Icon && index ? <span className="index mt-5 block">{index}</span> : null}
      <h3 className={cn("display-3", Icon && !index ? "mt-5" : "mt-3")}>
        {href ? (
          external ? (
            <a href={href} className={linkClass}>
              {title}
            </a>
          ) : (
            <Link href={href} className={linkClass}>
              {title}
            </Link>
          )
        ) : (
          title
        )}
      </h3>
      <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {meta ? (
        <p className="mt-5 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
          {meta}
        </p>
      ) : null}
    </div>
  );
}
