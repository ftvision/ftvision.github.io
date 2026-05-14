# P1 — High impact, moderate effort.

These ship rich results, fix social previews, and clean up indexable duplicates. Land them after P0 so the canonical domain and language signals are in place.

---

## 8. No JSON-LD structured data

**Symptom**
No `<script type="application/ld+json">` is emitted anywhere. Grep for `application/ld+json` returns zero results.

**Impact**
The blog publishes articles but never emits `Article`, `BlogPosting`, `Person`, `WebSite`, or `BreadcrumbList`. This forfeits:

- Author byline and headshot in SERP
- Article rich result eligibility
- Sitelinks search box on the homepage
- Breadcrumb display in mobile results

**Fix**

- Add `WebSite` + `Person` JSON-LD in `apps/blog/app/layout.tsx`.
- Add `BlogPosting` JSON-LD in `apps/blog/app/essays/[slug]/page.tsx`, `apps/blog/app/periodics/[slug]/page.tsx`, and `apps/blog/app/series/[slug]/page.tsx`. Use `headline`, `datePublished`, `dateModified`, `author`, `image`, `mainEntityOfPage`, `description`, `keywords` from the essay frontmatter.
- Add `BreadcrumbList` on detail pages.

All three live inside the server component output (a `<script>` tag is fine in RSC).

---

## 9. No Open Graph or Twitter card images

**Symptom**
None of the `generateMetadata` functions set `openGraph.images` or a `twitter` block.

**Impact**
Social previews are plain text. Cards on Twitter/X, LinkedIn, Slack render with no image — far lower CTR.

**Fix**
Two options:

1. **Minimum viable**: ship one branded card at `/og-default.png` (1200×630) and reference it from the root layout's `openGraph.images` and `twitter.card = 'summary_large_image'`.
2. **Better**: generate per-essay OG images with `next/og`. Works at build time with `output: 'export'` because it's evaluated during the static build. Template: essay title + author + a brand mark.

Also add `twitter: { card: 'summary_large_image', creator: '@<handle>' }`.

---

## 10. Hreflang is missing `x-default`

**Symptom**
`apps/blog/app/essays/[slug]/page.tsx:37` and `apps/blog/app/zh/essays/[slug]/page.tsx:37` declare `en` and `zh` alternates only.

**Impact**
Google explicitly recommends `x-default` for language-picker / locale-fallback pages. Without it, Search Console reports "duplicate without user-selected canonical" and search picks an arbitrary language version for international users.

**Fix**
Add an `x-default` entry pointing to the English version (or a language-picker page if you build one):
```ts
alternates: {
  languages: {
    'en': `/essays/${slug}`,
    'zh': `/zh/essays/${zhTranslation.slug}`,
    'x-default': `/essays/${slug}`,
  },
}
```
Apply the same in periodics and series detail pages, and in the locale index pages.

---

## 11. Chinese-only-content fallback page is indexable

**Symptom**
`apps/blog/app/essays/[slug]/page.tsx:111` renders `<ChineseVersionAvailable />` with status 200 and no `robots: noindex` when an English essay is missing. Same for `EnglishVersionAvailable` in `apps/blog/app/zh/essays/[slug]/page.tsx:111`, and the analogous fallbacks in periodics and series.

**Impact**
Google will index dozens of near-duplicate "This essay is written in Chinese" pages and treat them as thin content. This can reduce overall site quality scoring.

**Fix**
In the metadata branch where the fallback is rendered, return:
```ts
return {
  title: 'Content in Chinese',
  robots: { index: false, follow: true },
  // ...
};
```
Or, simpler: have the page return a `notFound()` instead of the fallback UI, and let `not-found.tsx` handle the "translation only" case with `noindex`. Whichever is chosen, apply consistently to all three content types and both locales.

---

## 12. No RSS / Atom feed

**Symptom**
No `/feed.xml`, no `app/feed.xml/route.ts`.

**Impact**
For a personal essay blog, a feed is both a discoverability win (Feedly, NetNewsWire, Substack imports) and an indexing signal. Many AI agents and aggregators only consume feeds.

**Fix**
Add `apps/blog/app/feed.xml/route.ts` that returns an Atom feed built from `getAllEssays()`. With static export, register a `generateStaticParams` equivalent — Next 14 supports static route handlers as long as they have no dynamic params. Alternatively, emit `out/feed.xml` from a build script.

Add a `<link rel="alternate" type="application/atom+xml">` in the root layout `<head>` so feed readers can auto-discover it.

---

## 13. No canonical URLs

**Symptom**
`alternates.canonical` is never set in any `generateMetadata`.

**Impact**
With `trailingSlash: true` (`apps/blog/next.config.js:12`) and a static export, the slash-vs-no-slash duplicate is real, plus tracking-parameter variants. Without an explicit canonical, Google picks one — sometimes wrong.

**Fix**
Set `alternates.canonical` on every page that has stable content. Detail pages should canonicalize to themselves (with trailing slash to match `next.config.js`):
```ts
alternates: {
  canonical: `/essays/${slug}/`,
  languages: { ... },
}
```

---

## 14. No favicon / app icons

**Symptom**
Nothing in `apps/blog/app/` matches the Next 14 file conventions (`icon.png`, `apple-icon.png`, `favicon.ico`). The `public/images/` directory holds essay assets only.

**Impact**
Browser tab shows a default globe. Apple touch icon is missing on home-screen pins. Minor SEO impact, real brand impact, and a missing `application-name` signal for Microsoft.

**Fix**
Drop these into `apps/blog/app/`:

- `icon.png` (32×32 or 512×512)
- `apple-icon.png` (180×180)
- `favicon.ico`

Next 14 picks them up automatically and generates the `<link>` tags.
