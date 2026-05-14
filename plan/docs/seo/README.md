# SEO Audit — `ftvisionhub.io`

Source-of-truth for the SEO audit performed on the Next.js blog at `apps/blog/`.
The audit reads the App Router metadata, layouts, MDX content frontmatter, and `public/` assets.

## Files in this folder

| File | Contents |
|------|----------|
| [p0-critical.md](./p0-critical.md) | Bleeders. Fix first. Indexing, metadata base, language tagging, descriptions. |
| [p1-high-impact.md](./p1-high-impact.md) | Structured data, OG/Twitter cards, hreflang `x-default`, canonical, RSS, fallback page noindex. |
| [p2-polish.md](./p2-polish.md) | Alt text, internal linking, analytics, manifest, redirect/static-export gotchas. |
| [order-of-operations.md](./order-of-operations.md) | Suggested PR sequencing. |
| [measurement.md](./measurement.md) | How to measure SEO — Search Console, lab tools, crawl audits, analytics, monthly metrics. |

## TL;DR

1. There is no sitemap, no `robots.txt`, and no `metadataBase`. Social previews and indexing maps are silently broken.
2. The canonical production domain is unclear (`CNAME` contains `ftvision.github.io`, which is not a custom domain). Everything downstream depends on resolving this.
3. The `<html lang>` is hardcoded to `en` for the entire site — including `/zh/*` — so Chinese essays are being indexed as English.
4. Roughly half of essays ship with `description: ""`, killing snippet quality and social CTR.
5. No JSON-LD, no Open Graph images, no Twitter cards, no RSS, no favicon, no analytics, no Search Console verification.

## How to use these docs

- Read [p0-critical.md](./p0-critical.md) first. It contains the items that block all others.
- Each finding lists: the symptom, the file/line where the issue is observable, the impact, and the recommended fix.
- [order-of-operations.md](./order-of-operations.md) groups items into deliverable PRs.
