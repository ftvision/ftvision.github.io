# P2 — Quality-of-life polish.

Items that don't move the needle alone but compound. Defer until P0 and P1 are done.

---

## 15. Empty `alt` text on MDX images

**Symptom**
`apps/blog/components/mdx/MDXComponents.tsx:220` and `:292`:
```tsx
<FigureImage src={src} alt={alt || ''} />
```
The fallback silently swallows missing alt.

**Impact**
Empty `alt` is correct only for decorative images. For content images this hurts accessibility and Google Image Search ranking. There is no way to know which essays are missing alt because the failure is silent.

**Fix**

- Default to the figure caption (if present) or the filename before falling back to empty.
- Add a build-time warning when an MDX image has no `alt` and no caption.

---

## 16. No internal linking between essays

**Symptom**
Essays don't link to related essays or back to the `/series/*` they belong to in the body or in a "Related" footer.

**Impact**
Internal linking is the single most undervalued SEO lever. It distributes authority, improves crawl depth, and keeps readers on site. Right now each essay is a dead end.

**Fix**
Add a "Related essays" block at the bottom of `apps/blog/app/essays/[slug]/page.tsx`, computed from shared `topics`. Same for periodics and series.

---

## 17. No Search Console verification, no analytics

**Symptom**
No `verification.google` in `metadata`, no analytics script anywhere.

**Impact**
You cannot measure SEO without Search Console (impressions, CTR, index coverage, Core Web Vitals from CrUX, manual actions). Analytics-less means no traffic data either.

**Fix**

- Verify ownership in Google Search Console and Bing Webmaster Tools. Add the meta tag verification in root layout `metadata.verification`.
- Pick a privacy-respecting analytics tool. Plausible or Umami are good defaults; both can be self-hosted or used as SaaS. Add the script tag to `apps/blog/app/layout.tsx`.
- Once verified, submit the sitemap built in P0.

---

## 18. No web manifest

**Symptom**
No `apps/blog/app/manifest.ts` or `public/site.webmanifest`.

**Impact**
The site is not installable. Mobile browsers fall back to defaults for theme color and home-screen icon.

**Fix**
Add `apps/blog/app/manifest.ts`:
```ts
import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Feitong Yang — Essays',
    short_name: 'Essays',
    description: '...',
    start_url: '/',
    display: 'standalone',
    theme_color: '#...',
    background_color: '#...',
    icons: [ /* ... */ ],
  };
}
```

---

## 19. Heading structure inside fallback pages

**Symptom**
`<ChineseVersionAvailable />` and `<EnglishVersionAvailable />` render an `<h1>` ("Content in Chinese" / "英文内容") on a page that is really an error/fallback state.

**Impact**
Multiple `<h1>` taxonomies across many URLs dilute the real article `<h1>`s. Less serious than the indexability issue in P1 #11 but worth fixing while you're in the file.

**Fix**
Either:

- Apply the `noindex` from P1 #11 (preferred) and leave the heading.
- Or downgrade to `<h2>` so the page has no `<h1>`.

---

## 20. Static export + `redirect()` is a meta-refresh, not a 301

**Symptom**
`apps/blog/app/essays/[slug]/page.tsx:139` calls `redirect()` when the essay exists only in the other language. With `output: 'export'` (`apps/blog/next.config.js:6`) Next emits an HTML meta-refresh shim — there is no server to issue a 301.

**Impact**
Crawlers treat meta-refresh as a weak redirect. PageRank passes incompletely, and the original URL can linger in the index.

**Fix**
Two paths:

- Replace `redirect()` with a server-side render of the target essay at the original URL (essentially treat both slugs as equivalent canonical → use `alternates.canonical` to designate the preferred slug).
- Or host on a platform that supports real redirects (Cloudflare Pages, Vercel, Netlify) and add a `_redirects` file. GitHub Pages cannot do this.

This only matters if translation routes drive meaningful traffic. For most personal blogs it's safe to defer.
