import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

/**
 * Section opener: optional running number, mono eyebrow, Sora title and a
 * lead. `number` gives long pages a visible sequence ("01 · The problem").
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  number,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  number?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3">
        {number ? (
          <>
            <span className="text-primary">{number}</span>
            <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
          </>
        ) : null}
        <span>{eyebrow}</span>
      </p>
      <h2 className="display-2">{title}</h2>
      {description ? (
        <p className="lead max-w-2xl text-pretty">{description}</p>
      ) : null}
    </Reveal>
  );
}
