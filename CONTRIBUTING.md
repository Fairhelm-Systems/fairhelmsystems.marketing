# Contributing

This repository is open source, but the site it builds is Fairhelm Systems' production marketing site — changes go through review before merging.

## Workflow

1. Fork the repository and create a branch off `main`.
2. Make your change. Keep the diff focused on one thing.
3. Run the checks locally before opening a pull request:

   ```bash
   bun install --frozen-lockfile
   bun run lint
   bun run typecheck
   bun run test
   bun run build
   ```

4. Open a pull request against `main` using the pull request template. Direct pushes to `main` are disabled; every change lands through a reviewed PR.

## Guidelines

- Match the existing code style; Biome (`bun run format`) enforces formatting.
- Company facts (legal name, address, positioning, product claims) live in [`src/lib/site-config.ts`](src/lib/site-config.ts) — don't hardcode them elsewhere.
- Don't add customer data, credentials, or internal-only operational details (account IDs, resource ARNs, infrastructure identifiers) to any tracked file. This repository is public.
- New Insights articles go in `src/content/insights/`; see the README for the front-matter format.

## Reporting bugs

Open an issue with steps to reproduce. For security vulnerabilities, see [SECURITY.md](SECURITY.md) instead of opening a public issue.
