# Fairhelm Systems marketing site

Production marketing website for **Fairhelm Systems**, a product-first technology
company that builds and operates software products and governed data systems. Its
flagship product is SquareCampus, a School Operating System for schools,
universities and multi-campus educational institutions.

- Canonical site: [fairhelmsystems.com](https://fairhelmsystems.com)
- India domain: [fairhelmsystems.in](https://fairhelmsystems.in) — permanent redirect
  to the canonical site
- GitHub: [fairhelmsystems/fairhelmsystems.marketing](https://github.com/fairhelmsystems/fairhelmsystems.marketing)
- Legal entity: Fairhelm Systems (OPC) Private Limited, CIN U62099KA2026OPC225579,
  incorporated in India on 5 August 2026 (canonical facts in
  [`src/lib/site-config.ts`](src/lib/site-config.ts))
- Product site: [squarecampus.com](https://squarecampus.com/) is the canonical
  source for SquareCampus product, security and commercial information

The public site positions Fairhelm Systems as a product-first company that
develops and operates SquareCampus, and that selectively takes on data
engineering, operational dashboard and governed analytics work. It does not
present Fairhelm as a generic software agency, an outsourcing firm, an AI
consultancy or an ERP vendor, and it publishes no customer metrics, logos,
testimonials, awards or certifications.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Company positioning, capabilities, SquareCampus, AEGIS, and primary calls to action |
| `/squarecampus/` | Operator context for SquareCampus; hands over to squarecampus.com |
| `/services/data-engineering/` | ETL/ELT, data platforms, quality, lineage, observability, and how to engage |
| `/services/dashboards/` | Operational dashboards and decision systems |
| `/about/` | Company identity, scope (product first, services by exception), operating principles |
| `/contact/` | Static contact shell and clearly identified email action |
| `/security/` | Governance, privacy, RBAC, auditability, and deployment posture |
| `/legal/` | Indexed legal and governance navigation |
| `/privacy/`, `/terms/`, `/acceptable-use/` | Public policy shells |
| `/ai-policy/`, `/data-processing/` | AI and data-processing posture |
| `/ai/` | Human-readable information for AI agents and researchers |
| `/llms.txt` | Concise machine-readable company summary, generated from `site-config.ts` |
| `/llms-full.txt` | The summary followed by every Markdown alternate, generated after build |
| `<page>/index.md` | Markdown alternate of each key page, generated from the rendered HTML |
| `/robots.txt`, `/sitemap.xml` | Search-engine discovery outputs |

All public content is statically rendered and crawlable. Product-direction copy is
deliberately phrased to avoid claiming features or certifications that have not been
formally delivered or verified. Interface visuals use sample data, are labelled
"Illustrative" on screen, and are excluded from the Markdown alternates.

## Stack

- Next.js 16 App Router and TypeScript
- React 19
- Tailwind CSS 4
- shadcn/ui and Base UI
- Anime.js for restrained interface motion
- Biome for formatting and linting
- Bun for package management and scripts
- Static export to private Amazon S3 behind CloudFront

The site uses `output: "export"`, trailing-slash routes, and unoptimized Next images
so the generated `out/` directory can be hosted without a Node.js runtime.

## Local development

Prerequisites:

- Bun
- Node.js compatible with the pinned Next.js version

Install and run:

```bash
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000).

Useful commands:

```bash
bun run lint       # Biome validation for application code, scripts and tests
bun run typecheck  # TypeScript
bun run test       # canonical-fact, JSON-LD, llms.txt, sitemap and stale-claim tests
bun run build      # static export, Markdown alternates, llms-full.txt, post-build check
bun run preview    # serve the generated out/ directory locally
bun run format     # apply Biome formatting
bun run indexnow:dry-run   # after a build: what IndexNow would submit
```

## Repository structure

```text
src/app/                    Routes, metadata outputs, and static pages
src/components/site/        Shared site shell, motion, legal, and content components
src/content/                Structured legal content, llms.txt generator, Markdown-alternate registry
src/lib/                    Canonical company facts (site-config), SEO, and the JSON-LD entity graph
public/brand/               Fairhelm vector logo and social assets
infrastructure/cloudfront/  Viewer-request redirect and clean-route function
scripts/                    Deployment, Markdown alternates, post-build check, IndexNow
tests/                      Regression tests (bun run test) and the stale-claim fixture
docs/                       Deployment and operations documentation
```

Every company fact — legal name, CIN, incorporation date, registered office,
contact, positioning, the SquareCampus relationship and canonical URL, the bounded
services scope — lives in [`src/lib/site-config.ts`](src/lib/site-config.ts).
Page copy, metadata, JSON-LD, `/llms.txt`, the footer disclosure and the legal
pages derive from it. `sameAs` and `recognitions` are empty on purpose: add a
social profile only after verifying it is the company's own account, and add a
recognition (for example a government startup programme) only after the
certificate is actually issued.

## SEO and AI discoverability

The site includes:

- canonical metadata rooted at `https://fairhelmsystems.com`;
- page-specific titles and descriptions;
- Open Graph and Twitter cards;
- one JSON-LD entity graph on every page: `Organization` (`#org`), `WebSite`
  (`#website`) and the SquareCampus `SoftwareApplication` at its canonical id
  `https://squarecampus.com/#software`, with Fairhelm as creator, publisher and
  provider; Service and breadcrumb nodes per page;
- `<link rel="describedby" href="/llms.txt">` on every page and
  `<link rel="alternate" type="text/markdown">` on pages with a Markdown alternate;
- static robots and sitemap outputs, with git-derived `lastmod`;
- a generated `/llms.txt`, generated Markdown alternates and `/llms-full.txt`;
- a human-readable `/ai/` page linking canonical public sources; and
- IndexNow submission of new, changed and removed URLs at deploy time.

Change company facts in `site-config.ts` only; `bun run test` and the post-build
check (`scripts/check-build.ts`) fail on stale wording, a missing entity id, a
`sameAs` without a verified profile, or a sample figure leaking into a
machine-readable surface.

## Production deployment

Production uses one deployment implementation:

```bash
bun run deploy:aws-static
```

The script at [`scripts/deploy-aws-static.sh`](scripts/deploy-aws-static.sh):

1. validates AWS identity and configuration;
2. installs dependencies only when needed;
3. runs Biome, the static build, the Markdown alternates and the post-build check;
4. creates or safely reuses the dedicated S3, ACM, CloudFront, OAC, Function, and
   Route 53 resources;
5. uploads documents with revalidation headers and fingerprinted assets as
   immutable;
6. uploads Markdown alternates as `text/markdown`;
7. submits new, changed and removed URLs to IndexNow (skipped without a key file);
8. invalidates CloudFront; and
9. prints the exact resource and verification summary.

The S3 origin is private with all public-access blocks enabled. CloudFront handles
TLS, compression, clean-route rewrites, and permanent host redirects while
preserving paths and query strings.

Read [`docs/aws-static-deployment.md`](docs/aws-static-deployment.md) before changing
production infrastructure. It records the architecture, current resource IDs,
configuration variables, verification commands, rollback approach, and cache policy.

## Domain boundaries

- `fairhelmsystems.com` is the canonical website domain.
- `www.fairhelmsystems.com`, `fairhelmsystems.in`, and
  `www.fairhelmsystems.in` redirect permanently to the canonical host.
- `fairhelm.com` is being prepared separately for corporate email. It is not a
  website canonical or redirect target in this repository unless that decision is
  explicitly made later.
- Do not remove a legacy mail domain until the new Microsoft 365 mailbox is verified,
  GitHub's primary/recovery email is migrated, and mail flow is tested.

No AWS credentials, GitHub tokens, mailbox secrets, or account keys belong in this
repository. Deployment configuration uses environment variables and the active AWS
CLI identity.

## Production verification

After deployment, verify at minimum:

```bash
curl -I https://fairhelmsystems.com/
curl -I https://www.fairhelmsystems.com/
curl -I https://fairhelmsystems.in/
curl -I 'https://fairhelmsystems.in/squarecampus?x=1'
curl -I https://fairhelmsystems.com/robots.txt
curl -I https://fairhelmsystems.com/sitemap.xml
curl -I https://fairhelmsystems.com/llms.txt
curl -I https://fairhelmsystems.com/llms-full.txt
```

Expected behavior is documented in
[`docs/aws-static-deployment.md`](docs/aws-static-deployment.md#verification).

## Legal and operational notes

- The policy pages are public working documents, not claims of external
  certification or substitutes for legal review.
- Customer, student, and parent data is not sold.
- AI is positioned as governed, RBAC-aware, explainable, and read-only first.
- Customer data must not be used for AI training unless explicitly contracted.
- CIN and registered-office details are published from `site-config.ts`; GSTIN
  particulars are available on request and are added only after verification.
- Government startup-programme recognition has not been granted. Nothing about it
  may be published until the certificate exists; the `recognitions` slot in
  `site-config.ts` stays empty until then.

The standard is simple: systems that survive scale, scrutiny, and boardrooms.
