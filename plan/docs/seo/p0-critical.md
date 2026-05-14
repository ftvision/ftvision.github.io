# P0 — Critical. Fix first.

These items either block indexing, break social previews entirely, or send wrong signals to search engines at scale. Everything in P1/P2 depends on resolving the canonical-domain question (item 3) first.

---

## 1. No `sitemap.xml` and no `robots.txt`

**Symptom**
Neither file exists in `apps/blog/public/` and there is no `app/sitemap.ts` or `app/robots.ts`.

**Impact**
Search engines can crawl the site, but you give them no map of what exists and no signal about which paths are indexable. New essays take longer to be discovered, and you have no way to exclude draft / fallback routes.

**Fix**
With `output: 'export'` (`apps/blog/next.config.js:6`), use the Next 14 file conventions:

- `apps/blog/app/sitemap.ts` — enumerate essays, periodics, series, plus locale variants.
- `apps/blog/app/robots.ts` — allow all, point at the sitemap.

Both run at build time and emit static files into `out/`.

---

## 2. No `metadataBase` set in the root layout

**Symptom**
`apps/blog/app/layout.tsx:14` defines `metadata` but does not set `metadataBase`.

**Impact**
Every Open Graph URL and image becomes a relative path. Crawlers cannot resolve them, so social previews silently break on Twitter/X, LinkedIn, Slack, iMessage, and Discord. Next prints a build-time warning, but the site still ships.

**Fix**
```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://<canonical-domain>'),
  // ...
};
```
Same on `apps/blog/app/zh/layout.tsx`.

---

## 3. Production domain looks misconfigured

**Symptom**
`CNAME` at the repo root contains `ftvision.github.io`.

**Impact**
A `CNAME` file is meant for a *custom* domain (e.g. `blog.example.com`). Putting the github.io host in there is a no-op at best and can collide with GitHub's apex routing. Until the canonical production URL is decided, sitemap URLs, OG image URLs, hreflang URLs, and canonical tags are all guesses.

**Fix**
Pick the canonical host (custom domain or `ftvisionhub.github.io` or `ftvision.github.io`) and:

- Update `CNAME` to that host *only if it is a custom domain*; otherwise delete it.
- Set `NEXT_PUBLIC_SITE_URL` (or hardcode) consistently everywhere.
- Update `metadataBase` to match.

---

## 4. `<html lang="en">` is hardcoded for `/zh/*` routes

**Symptom**
`apps/blog/app/layout.tsx:54` renders `<html lang="en" data-theme="nyt" data-mode="light">`. The Chinese subtree at `/zh/*` inherits this. The inline `<script>` (lines 57–81) updates `document.documentElement.lang` after mount based on `localStorage`, but Googlebot reads the *server-rendered* HTML, which is `en`.

**Impact**
Google uses `lang` as a strong language signal. Chinese essays are currently being indexed as English content. This kills Chinese-language ranking and confuses hreflang.

**Fix**
Compute `lang` per-segment. Easiest approach with App Router: keep one root `<html>` but read the URL segment in a server component and pass `lang` down. Or, split the root layout so `/zh/*` renders `<html lang="zh">`. The client script can still adjust other attributes.

---

## 5. Empty descriptions on ~50% of essays

**Symptom**
Files with `description: ""` (audit run via `grep '^description:' apps/blog/content/essays`):

- `agent-skills-richness.mdx`
- `evolution-cc-prompt.mdx`
- `learning-frontend.mdx`
- `make-ai-speak-zh.mdx`
- `a-few-mindset-towards-llm.mdx`
- `a-few-mindset-towards-llm-zh.mdx`
- `my-honest-opinion-mcp.mdx` (has `"MCP"` only — effectively empty)

**Impact**
With no description, Google autogenerates snippets from body text (often suboptimal) and Open Graph cards fall back to nothing on most social platforms.

**Fix**
Every essay needs a 140–160-character description tuned for both keywords *and* click-through. Treat this as a content task: it is a one-time fill plus a frontmatter validator that fails the build if `description` is empty.

Optional hardening: extend `validateFrontmatter` in `apps/blog/lib/essays.ts:146` to require non-empty `description` in production builds.

---

## 6. Generic site title

**Symptom**
`apps/blog/app/layout.tsx:16`:
```ts
title: {
  default: 'Essays',
  template: '%s | Essays',
}
```

**Impact**
"Essays" is unbrandable and competes with millions of pages. It will never rank for itself and never builds brand recall in the SERP.

**Fix**
Use a branded default and a branded template, e.g.:
```ts
title: {
  default: 'Feitong Yang — Essays on AI, Product, Engineering',
  template: '%s | Feitong Yang',
}
```
Mirror on `apps/blog/app/zh/layout.tsx:5` (currently `'文章'` / `'%s | 文章'`).

---

## 7. Placeholder author name

**Symptom**
`apps/blog/app/layout.tsx:21`:
```ts
authors: [{ name: 'Author' }],
```

**Impact**
No real author identity for Google Knowledge Graph, no E-E-A-T signal, no byline rich result eligibility.

**Fix**
Replace with real name and a URL pointing to `/about`:
```ts
authors: [{ name: 'Feitong Yang', url: 'https://<canonical>/about' }],
```
This pairs with the `Person` JSON-LD added in P1.
