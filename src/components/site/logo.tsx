import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Fairhelm Systems home"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-[#f4f6fa] p-1.5 shadow-sm">
        <Image
          src="/brand/fairhelm-logo.svg"
          alt=""
          width={562}
          height={892}
          className="h-full w-auto"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[1.02rem] tracking-[-0.02em] text-foreground">
          Fairhelm Systems
        </span>
        <span className="mt-1 hidden font-mono text-[0.56rem] tracking-[0.26em] text-muted-foreground uppercase sm:block">
          Software · Data · Governance
        </span>
      </span>
    </Link>
  );
}
