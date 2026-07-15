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
      <span className="flex size-10 items-center justify-center rounded-lg bg-foreground p-2 shadow-sm">
        <Image
          src="/brand/fairhelm-logo.svg"
          alt=""
          width={562}
          height={892}
          className="h-full w-auto"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
          Fairhelm
        </span>
        <span className="mt-1 text-[0.61rem] font-medium tracking-[0.32em] text-muted-foreground uppercase">
          Systems
        </span>
      </span>
    </Link>
  );
}
