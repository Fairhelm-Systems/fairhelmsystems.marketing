# Writing an Insight

Add a Markdown file to `src/content/insights/` named after the URL slug (`the-kpi-contract.md` → `/insights/the-kpi-contract/`). Front matter:

```yaml
---
title: "The KPI contract: definition, grain, owner, target, guardrail"
description: "One or two sentences; this is the meta description and the card dek."
date: "2026-09-10"
category: "Decision systems"          # Data engineering · Decision systems · Governance · Company
lane: "/services/dashboards/"          # the site page the note belongs to
laneLabel: "Operational dashboards"
---
```

The body supports `##`/`###` headings, paragraphs, bullet and numbered lists, `>` blockquotes (rendered as a pull-quote panel), pipe tables, horizontal rules and inline bold, emphasis, code and links. Do not add an H1; the page renders the title. Word count and reading time are computed; `##` headings become the "On this page" index.

Cover images are optional: drop `public/insights/<slug>.webp` (1600 × 900) and the card and article pick it up automatically. There is no cover image generation tooling in this repository — produce covers with whatever tool you prefer, matching the visual style of the existing covers.

The stale-claim tests (`bun run test`) run over every article, so the same rules apply as to page copy: no customer evidence, no certifications, hypothetical worked examples labelled as such.
