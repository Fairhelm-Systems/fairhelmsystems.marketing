import Link from "next/link";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

const footerGroups = [
  {
    label: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Security", href: "/security/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    label: "Capabilities",
    links: [
      { label: "SquareCampus", href: "/squarecampus/" },
      { label: "Data Engineering", href: "/services/data-engineering/" },
      { label: "Dashboards", href: "/services/dashboards/" },
    ],
  },
  {
    label: "Trust & legal",
    links: [
      { label: "Legal center", href: "/legal/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "AI policy", href: "/ai-policy/" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Governed software systems for institutions that need reliability,
              auditability, and execution discipline.
            </p>
            <address className="mt-6 text-sm not-italic leading-6 text-muted-foreground">
              <span className="block text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                Registered office
              </span>
              <span className="mt-2 block">{siteConfig.address.full}</span>
            </address>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <p className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  {group.label}
                </p>
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-9" />
        <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            {siteConfig.legalName} · {siteConfig.incorporationStatus}
          </p>
        </div>
      </Container>
    </footer>
  );
}
