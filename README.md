# Fairhelm Systems marketing site

The production marketing website for [Fairhelm Systems](https://fairhelmsystems.com), a product-first technology company. Statically exported with the Next.js App Router and served from S3 + CloudFront.

## Stack

- Next.js (App Router) and TypeScript
- React
- Tailwind CSS, shadcn/ui, Base UI
- Biome for linting and formatting
- Bun for package management and scripts

The site uses `output: "export"` so the generated `out/` directory can be hosted without a Node.js runtime.

## Getting started

Prerequisites: [Bun](https://bun.sh) and a Node.js version compatible with the pinned Next.js release.

```bash
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000).

```bash
bun run lint       # Biome
bun run typecheck  # TypeScript
bun run test       # regression tests
bun run build      # static export + post-build checks
bun run preview    # serve the generated out/ directory locally
bun run format     # apply Biome formatting
```

## Repository structure

```text
src/app/                    Routes, metadata, and static pages
src/components/site/        Shared site shell and content components
src/content/                Structured content, SEO/llms.txt generation
src/content/insights/       Insights articles (Markdown with front matter)
src/lib/                    Canonical company facts and the JSON-LD entity graph
infrastructure/             Edge (CloudFront) and backend (contact API) source
scripts/                    Build, deploy, and content tooling
tests/                      Regression tests
docs/                       Architecture and operations notes
```

Company facts (legal name, address, positioning, product relationship) are centralized in [`src/lib/site-config.ts`](src/lib/site-config.ts); page copy, metadata, and structured data all derive from it.

## Deployment

Production deploys to a private S3 bucket behind CloudFront via `bun run deploy:aws-static`. See [`docs/aws-static-deployment.md`](docs/aws-static-deployment.md) for the architecture and runbook.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md) for how to report a vulnerability.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
