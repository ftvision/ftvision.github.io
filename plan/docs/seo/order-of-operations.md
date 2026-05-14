# Suggested Order of Operations

Each step is a deliverable PR. Steps are ordered so each PR unblocks the next.

---

## PR 1 — Decide the canonical production URL

Blocks everything else. Without a real domain, `metadataBase`, sitemap URLs, hreflang, canonical tags, and OG images all guess.

**Tasks**

- Resolve the `CNAME` situation (currently contains `ftvision.github.io`).
- Pick the final host: custom domain, `*.github.io`, or migrate to Cloudflare/Vercel.
- Store as `NEXT_PUBLIC_SITE_URL` in env, or hardcode in one place.

**Files touched**: `CNAME`, env config.

---

## PR 2 — Indexing foundations

Smallest possible win, biggest immediate impact.

**Tasks**

- Add `apps/blog/app/sitemap.ts` enumerating all essays, periodics, series, locale variants.
- Add `apps/blog/app/robots.ts` pointing at the sitemap.
- Add `metadataBase` in `apps/blog/app/layout.tsx` and `apps/blog/app/zh/layout.tsx`.

**Files touched**: `apps/blog/app/sitemap.ts` (new), `apps/blog/app/robots.ts` (new), root + zh layouts.

---

## PR 3 — Language + canonical signals

**Tasks**

- Render `<html lang>` per-segment so `/zh/*` produces `<html lang="zh">` server-side.
- Add `x-default` to `alternates.languages` on all detail pages and index pages.
- Add `alternates.canonical` on every page with stable content.
- Mark Chinese-only and English-only fallback pages `robots: { index: false }`.

**Files touched**:

- `apps/blog/app/layout.tsx`
- `apps/blog/app/essays/[slug]/page.tsx`
- `apps/blog/app/zh/essays/[slug]/page.tsx`
- `apps/blog/app/periodics/[slug]/page.tsx`
- `apps/blog/app/zh/periodics/[slug]/page.tsx`
- `apps/blog/app/series/[slug]/page.tsx`
- `apps/blog/app/zh/series/[slug]/page.tsx`

---

## PR 4 — Content: descriptions + branded titles

**Tasks**

- Fill empty `description:` frontmatter (see [p0-critical.md](./p0-critical.md#5-empty-descriptions-on-50-of-essays) for the file list).
- Replace `default: 'Essays'` and `'文章'` with branded titles.
- Replace `authors: [{ name: 'Author' }]` with real name + URL.
- Optional: extend `validateFrontmatter` in `apps/blog/lib/essays.ts` to require non-empty `description` in production.

**Files touched**: 6+ MDX files, root + zh layouts, optionally `apps/blog/lib/essays.ts`.

---

## PR 5 — Rich results: JSON-LD + OG/Twitter + favicons + RSS

**Tasks**

- `WebSite` + `Person` JSON-LD in root layout.
- `BlogPosting` + `BreadcrumbList` JSON-LD on essay/periodic/series detail pages.
- `openGraph.images` (start with one `/og-default.png`, then move to per-essay `next/og`).
- `twitter` card metadata.
- `icon.png`, `apple-icon.png`, `favicon.ico` in `apps/blog/app/`.
- `apps/blog/app/feed.xml/route.ts` + `<link rel="alternate" type="application/atom+xml">` in head.
- `apps/blog/app/manifest.ts`.

**Files touched**: layouts, all `[slug]/page.tsx` files, new icon files, new feed route, new manifest.

---

## PR 6 — Measurement

**Tasks**

- Verify ownership in Google Search Console and Bing Webmaster Tools (`metadata.verification`).
- Submit the sitemap built in PR 2.
- Add Plausible or Umami analytics in `apps/blog/app/layout.tsx`.

**Files touched**: root layout.

---

## After PR 6

Iterate from data. Search Console will surface real ranking opportunities (queries you almost rank for, pages with high impressions and low CTR — those need better titles/descriptions). Analytics will surface internal-linking opportunities (popular pages with no outbound essay links).

The P2 items (alt-text audit, internal linking, fallback heading cleanup, redirect strategy) can be picked up opportunistically.
