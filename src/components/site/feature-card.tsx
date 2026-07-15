import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  href,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  meta?: string;
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
          <Icon aria-hidden="true" className="size-4" />
        </div>
        <CardTitle>{title}</CardTitle>
        {href ? (
          <CardAction>
            <Link
              href={href}
              aria-label={`Explore ${title}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </CardAction>
        ) : null}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {meta ? (
        <CardContent>
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {meta}
          </p>
        </CardContent>
      ) : null}
    </Card>
  );
}
