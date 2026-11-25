---
name: resource-article
description: Draft one Resources article (regulatory guide) for the LAV PHARMA site from official sources, in English and Spanish, with a claims table and review questions for Laura. Use when asked to write the next article from content/resources/_backlog.md.
---

# Resource article playbook

## Before you start

1. Read `docs/resources-plan.md` and `content/resources/_backlog.md`. Pick the next planned item.
2. Read the country ledger in `content/resources/_facts/<country>.md`. Re-check any fact older than 90 days.
3. Work on a branch `resources/<slug>`. Never commit to main.

## Research rules

- Use official sources only: the authority's website, laws and regulations as published in the Diario Oficial, COMIECO/SIECA resolutions, official tariff lists and official notices.
- Every regulatory claim must trace to a source you actually opened. Quote the source text in REVIEW.md.
- Never invent fees, timelines, article numbers or dates. If the authority does not publish it, say so in plain words ("not officially published") and invite the reader to ask us.
- Omit "common rejection reasons" unless Laura supplies them.
- Prefer the final published text over drafts (for example, a WTO notification draft of an RTCA can differ from the final resolution).

## Files

```
content/resources/<slug>/en.md
content/resources/<slug>/es.md
content/resources/<slug>/REVIEW.md   (not published)
```

Frontmatter (validated at build time by `src/lib/resources/validate.ts` and `scripts/check-resources.mjs`):
title, description (140 to 160 chars), answer, targetQuery, type (guide|explainer|hub|digest), countries[], sector (human|vet), published, updated, lastVerified (YYYY-MM-DD), faq[{q,a}] (4 to 6), sources[{title,publisher,url,accessed}] (3 or more), related[] (slugs). Leave `reviewedBy` unset until Laura approves.

## Article structure

1. `answer`: 2 to 4 sentences, shown under the H1.
2. Key facts table (authority, legal basis, validity, who can hold, language; fees and timelines only if officially published).
3. Who regulates; the rules that apply; who can hold the registration.
4. Step by step.
5. Documents from the foreign manufacturer.
6. Country specifics (alternate manufacturers, recognition routes, fees, validity and renewal).
7. FAQ and sources come from the frontmatter.

Cite with `<sup><a href="#source-N">N</a></sup>`, where N is the position in `sources`.

## Style

- Plain language. Short sentences. Keep official Spanish names (with the English meaning the first time in en.md).
- No em dashes anywhere. Use commas, colons or periods. The prebuild check fails on them.
- Brand is "LAV PHARMA".

## REVIEW.md and PR template

REVIEW.md holds:

1. A claims table: `| # | Claim | Source | Source text |`, with the quoted Spanish source text.
2. A list of what could not be verified.
3. Up to 5 yes/no questions for Laura.

The PR description repeats the claims table and the questions, plus the preview link for the Spanish article. When Laura confirms, apply her answers, add `reviewedBy: "Laura Vidal"` to both locales and update the ledger.

## Verify

`npm test`, `npm run lint`, `npm run build`, then open both locales of the article and check the OG image, sitemap and both RSS feeds.
