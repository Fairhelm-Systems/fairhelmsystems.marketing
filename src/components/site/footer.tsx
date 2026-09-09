import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

// Product and engineering are separate groups on purpose: SquareCampus is the
// company's flagship product, not one capability among services.
const footerGroups = [
  {
    label: "Product",
    links: [
      { label: "SquareCampus", href: siteConfig.product.page },
      { label: "squarecampus.com", href: siteConfig.product.url },
    ],
  },
  {
    label: "Engineering",
    links: [
      { label: "Data Engineering", href: "/services/data-engineering/" },
      { label: "Dashboards", href: "/services/dashboards/" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Security", href: "/security/" },
      { label: "Contact", href: "/contact/" },
      { label: "For AI agents", href: "/ai/" },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
  {
    label: "Trust & legal",
    links: [
      { label: "Legal center", href: "/legal/" },
      { label: "Privacy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Refunds", href: "/refund-policy/" },
      { label: "AI policy", href: "/ai-policy/" },
    ],
  },
] as const;

function DisclosureField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
        {label}
      </span>
      <span className="text-sm leading-6 text-muted-foreground">
        {children}
      </span>
    </div>
  );
}

/**
 * Statutory company disclosure. Section 12(3)(c) of the Companies Act, 2013
 * requires the company's name, registered-office address, CIN, telephone and
 * email to be published on its business letters and notices; the site footer
 * is the surface that carries it on every page. It stays visible rather than
 * collapsing behind a link.
 */
function CompanyDisclosure() {
  return (
    <address className="grid gap-6 not-italic sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
      <DisclosureField label="Registered office">
        <span className="block font-medium text-foreground">
          {siteConfig.legalName}
        </span>
        <span className="mt-1 block">{siteConfig.address.full}</span>
      </DisclosureField>
      <DisclosureField label="CIN">
        <span className="font-mono text-[0.8rem] tracking-tight">
          {siteConfig.cin}
        </span>
        <span className="mt-1 block">{siteConfig.incorporationStatus}</span>
      </DisclosureField>
      <div className="flex flex-col gap-4">
        <DisclosureField label="Email">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="transition-colors hover:text-foreground"
          >
            {siteConfig.contactEmail}
          </a>
        </DisclosureField>
        {siteConfig.phone ? (
          <DisclosureField label="Telephone">
            <a
              href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}
              className="transition-colors hover:text-foreground"
            >
              {siteConfig.phone}
            </a>
          </DisclosureField>
        ) : null}
      </div>
    </address>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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
        <CompanyDisclosure />
        <Separator className="my-9" />
        <div className="flex flex-col gap-3 text-xs leading-5 text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalNameDisplay}. All
            rights reserved.
          </p>
          <p className="sm:max-w-sm sm:text-right">
            {siteConfig.trademarkNotice}
          </p>
        </div>
      </Container>
    </footer>
  );
}
