# Fairhelm Systems marketing site

Production marketing website for **Fairhelm Systems**, an enterprise software and
systems company building governed software for institutions that cannot afford
operational chaos.

- Canonical site: [fairhelmsystems.com](https://fairhelmsystems.com)
- India domain: [fairhelmsystems.in](https://fairhelmsystems.in) — permanent redirect
  to the canonical site
- GitHub: [fairhelmsystems/fairhelmsystems.marketing](https://github.com/fairhelmsystems/fairhelmsystems.marketing)
- Company status: Fairhelm Systems (OPC) Pvt Ltd, incorporation in progress
- GSTIN status: pending incorporation and registration

The public site positions Fairhelm Systems as a product and systems company,
SquareCampus as its flagship School OS for India, and Fairhelm's data engineering
and operational-intelligence work as governed decision infrastructure.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Company positioning, capabilities, SquareCampus, AEGIS, and primary calls to action |
| `/squarecampus/` | Sovereign, cycle-native School OS product direction |
| `/services/data-engineering/` | ETL/ELT, data platforms, quality, lineage, and observability |
| `/services/dashboards/` | Executive and operational command surfaces |
| `/about/` | Company identity, operating principles, and product posture |
| `/contact/` | Static contact shell and clearly identified email action |
| `/security/` | Governance, privacy, RBAC, auditability, and deployment posture |
| `/legal/` | Indexed legal and governance navigation |
| `/privacy/`, `/terms/`, `/acceptable-use/` | Public policy shells |
| `/ai-policy/`, `/data-processing/` | AI and data-processing posture |
| `/ai/` | Human-readable information for AI agents and researchers |
| `/llms.txt`, `/llms-full.txt` | LLM-friendly company and product information |
| `/robots.txt`, `/sitemap.xml` | Search-engine discovery outputs |

All public content is statically rendered and crawlable. Product-direction copy is
deliberately phrased to avoid claiming features or certifications that have not been
formally delivered or verified.

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
bun run lint       # Biome validation for maintained application code
bun run build      # TypeScript check and static export
bun run preview    # serve the generated out/ directory locally
bun run format     # apply Biome formatting
```

## Repository structure

```text
src/app/                    Routes, metadata outputs, and static pages
src/components/site/        Shared site shell, motion, legal, and content components
src/content/                Structured legal content
src/lib/                    Site configuration, SEO, and structured-data helpers
public/brand/               Fairhelm vector logo and social assets
public/llms*.txt            AI-agent discovery documents
infrastructure/cloudfront/  Viewer-request redirect and clean-route function
scripts/                    Idempotent AWS deployment entry point
docs/                       Deployment and operations documentation
```

The Fairhelm identity and contact configuration live in
[`src/lib/site-config.ts`](src/lib/site-config.ts). The public contact address remains
an explicit placeholder until the new corporate mailbox is tested end to end.

## SEO and AI discoverability

The site includes:

- canonical metadata rooted at `https://fairhelmsystems.com`;
- page-specific titles and descriptions;
- Open Graph and Twitter cards;
- Organization, WebSite, Service, breadcrumb, and software/product JSON-LD;
- static robots and sitemap outputs;
- concise and expanded LLM documents; and
- a human-readable `/ai/` page linking canonical public sources.

Changes to company facts, contact information, legal identity, product completion,
or security claims must be updated consistently across page copy, metadata,
structured data, and the LLM documents.

## Production deployment

Production uses one deployment implementation:

```bash
bun run deploy:aws-static
```

The script at [`scripts/deploy-aws-static.sh`](scripts/deploy-aws-static.sh):

1. validates AWS identity and configuration;
2. installs dependencies only when needed;
3. runs Biome and the static build;
4. creates or safely reuses the dedicated S3, ACM, CloudFront, OAC, Function, and
   Route 53 resources;
5. uploads documents with revalidation headers and fingerprinted assets as
   immutable;
6. invalidates CloudFront; and
7. prints the exact resource and verification summary.

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
- Add CIN, registered-office details, and GSTIN only after formal issuance and
  verification.

The standard is simple: systems that survive scale, scrutiny, and boardrooms.
