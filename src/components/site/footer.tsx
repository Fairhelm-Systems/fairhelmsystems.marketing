import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/site/container";
import { Logo } from "@/components/site/logo";
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
      { label: "Data engineering", href: "/services/data-engineering/" },
      { label: "Operational dashboards", href: "/services/dashboards/" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Insights", href: "/insights/" },
      { label: "Security", href: "/security/" },
      { label: "Contact", href: "/contact/" },
      {
        label: "GitHub",
        href: "https://github.com/Fairhelm-Systems",
      },
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
      { label: "Acceptable use", href: "/acceptable-use/" },
      { label: "Refunds", href: "/refund-policy/" },
      { label: "AI policy", href: "/ai-policy/" },
      { label: "Data processing", href: "/data-processing/" },
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
    <div className="flex flex-col gap-1.5">
      <span className="eyebrow text-[0.6rem]">{label}</span>
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
        <span className="mt-1 flex items-start gap-2">
          <MapPin
            aria-hidden="true"
            className="mt-1.5 size-3.5 shrink-0 text-primary"
          />
          {siteConfig.address.full}
        </span>
      </DisclosureField>
      <DisclosureField label="CIN">
        <span className="font-mono text-[0.8rem] tracking-tight text-foreground">
          {siteConfig.cin}
        </span>
        <span className="mt-1 block">{siteConfig.incorporationStatus}</span>
      </DisclosureField>
      <div className="flex flex-col gap-4">
        <DisclosureField label="Email">
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Mail aria-hidden="true" className="size-3.5 text-primary" />
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
    <footer className="border-t border-border">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {siteConfig.description}
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin aria-hidden="true" className="size-3.5 text-primary" />
              Bangalore, Karnataka, India
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3">
                <p className="eyebrow text-[0.6rem]">{group.label}</p>
                {group.links.map((link) =>
                  /^https?:/.test(link.href) ? (
                    <a
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="my-9 h-px bg-border" />
        <CompanyDisclosure />
        <div className="my-9 h-px bg-border" />
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
