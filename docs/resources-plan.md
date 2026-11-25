# Resources (articles) section: plan

> Renamed from "Insights" to "Resources" / "Recursos" during the build. Routes are `/resources` (es) and `/en/resources`. Code lives in `src/lib/resources/`, `src/components/resources/` and `content/resources/`.

Direction from Fable, 2026-11-24. Owner decisions still open are marked OPEN.

## Repo facts that matter
- Next 16.2.4, React 19.2.4, next-intl 4.9, Tailwind 4. Single page site (`src/app/[locale]/page.tsx`) with hash anchors.
- Run `npm install` first, then read `node_modules/next/dist/docs/` as AGENTS.md requires (metadata files, opengraph-image, route handlers, generateStaticParams, sitemap alternates, middleware -> proxy rename; leave middleware.ts as is in this change).
- Routing: `defaultLocale: "es"`, `localePrefix: "as-needed"`: Spanish at `/...`, English at `/en/...`.
- Existing bug: layout canonical/hreflang and sitemap use `https://lavpharma.com/es` for Spanish; should be the root. Fix.
- Navbar/Footer use `href="#servicios"` and logo `href="#"`: break off the home page. Use `Link` from `@/i18n/navigation` with `/#servicios` style hrefs, logo to `/`.
- JsonLd.tsx: add `@id: https://lavpharma.com/#organization`, Nicaragua in areaServed, sameAs (LinkedIn if known, else leave empty array out).
- Hero claims (540+ registrations, 96% approval, Day 76 to 90) must not be repeated in articles as regulatory facts.

## Content strategy
- Each article = most specific, best-sourced English answer to one buyer question, with a visible "last verified" date. Spanish version under same slug (hreflang pair).
- Types: country registration guides (half), buyer-question explainers, regional hubs, monthly digest (later).
- Fixed structure: answer box (2 to 4 sentences under H1); key facts table (authority, legal basis, validity, who can hold, language; fees/timelines only if officially published); step-by-step; documents from foreign manufacturer; common rejection reasons (Laura, only when she supplies them; otherwise omit the section); 4 to 6 FAQs; numbered sources with access dates; author box; CTA.
- Accuracy: every regulatory claim cites an official source (agency site, official gazette, SIECA/COMIECO RTCA). Secondary sources (trade.gov, PAHO, EU) for context only. Never invent fees/timelines: write "not officially published; ask us for a current quote". Add a short "General information, not regulatory advice" line.
- El Salvador: DNM was replaced by the Superintendencia de Regulación Sanitaria (SRS). Verify dates against the law text.
- Backlog (first 8): El Salvador SRS guide; Central America RTCA 11.03.59 explainer; What is a registration holder; Guatemala MSPAS/DRCPFA guide; Vet registration Central America RTCA 65.05.51; CPP/GMP/apostille documents; Ecuador ARCSA guide; Honduras ARSA guide.

## Mechanism
- Plain Markdown + frontmatter (deps: `gray-matter`, `marked`), not MDX.
- `content/resources/<slug>/en.md` and `es.md`; `content/resources/_facts/<country>.md` ledger; `content/resources/_backlog.md`.
- Frontmatter: title, description (140 to 160 chars), answer (the short answer box), targetQuery, type (guide|explainer|hub|digest), countries[], sector (human|vet), published, updated, lastVerified, reviewedBy (only when Laura actually approved), faq[{q,a}], sources[{title,publisher,url,accessed}], related[].
- Routes: `/[locale]/resources` and `/[locale]/resources/[slug]`, same segment both locales, `dynamicParams = false`, `generateStaticParams`, `setRequestLocale`.
- `src/lib/resources/` (content.ts, validate.ts, render.ts): loader + hand-written validator (throws so bad article fails build) + marked renderer (heading ids, table scroll wrapper, rel="noopener" on external links). Unit test for the validator.
- Pages: index = editorial list (featured latest, then rows with type and country chips; not a uniform card grid). Article = generateMetadata (self canonical, hreflang en/es/x-default, openGraph type article), breadcrumb, H1, byline + dates, answer box, body, FAQ, sources, author box, CTA, related, Footer.
- `opengraph-image.tsx` with next/og (navy bg, Fraunces title, country chip). Fallback `src/app/api/og/[locale]/[slug]/route.tsx` if locale routing breaks it.
- `src/components/resources/`: ArticleBody, AuthorBox, ArticleCta, ArticleJsonLd, FaqList, SourcesList (server components).
- `src/app/rss.xml/route.ts` (en) and `src/app/rss-es.xml/route.ts`; optional `src/app/llms.txt/route.ts`.
- `scripts/check-resources.mjs` as `prebuild`: both locales exist, >= 3 dated sources, FAQ present, description length.
- `.claude/skills/resource-article/SKILL.md`: drafting playbook (structure, accuracy rules, PR template with claims table: claim | source URL | quoted Spanish text, and max 5 yes/no questions for Laura).
- Sitemap: Spanish root fix, add index + articles with alternates.languages and lastModified. Layout: canonical fix + RSS alternates.types. messages: Nav.resources + Resources namespace. globals.css: ~40 lines `.article-body` styles matching site fonts (Fraunces headings, Inter body). robots.ts: no change.
- JSON-LD per article: Article (citation[] from sources, publisher by @id), author = Person Laura Vidal ONLY if reviewedBy set, else Organization; BreadcrumbList; FAQPage.
- CTA: "Planning a registration in {country}? Send us your product list" -> `/#contacto` + WhatsApp.
- Author box: DECIDED. Laura Vidal is named ("Pharmaceutical Chemist, CEO & Co-Founder"), photo from `public/team/laura-vidal.jpg` with "LV" initials fallback, LinkedIn only when set in `src/lib/resources/authors.ts`. Her card and the "reviewed by" byline show only when `reviewedBy` is set; otherwise the team byline.
- Section name: "Resources" (en) / "Recursos" (es) (DECIDED).

## Workflow
Claude drafts weekly from official sources -> PR on `resources/<slug>` with claims table + <= 5 questions -> Vercel preview -> Luis forwards Spanish preview + questions to Laura on WhatsApp -> Claude applies answers, sets reviewedBy -> Luis merges. No answers by Thursday: publish under org byline only if no claim is open.

## Risks
- Regulatory accuracy: official sources only, claims table, ledger, visible verified date, disclaimer.
- Vercel Hobby is personal/non-commercial use only: move to Pro or Cloudflare (OPEN).
- Preview deploys may block commits from other authors on Hobby: test with the first PR.
