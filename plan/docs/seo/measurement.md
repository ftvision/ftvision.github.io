# Measuring SEO

SEO measurement has three layers, each answering a different question. You want all three. This doc lists the tools, what they're for, how to set them up, and what to actually look at.

If you're picking one thing to do first: **verify Google Search Console**. Until that's done, you're flying blind on what actually ranks.

---

## Layer 1: Authoritative — what Google actually does

Ground truth. These tools show what search engines saw, indexed, and showed to users.

### Google Search Console (GSC)

**URL:** [search.google.com/search-console](https://search.google.com/search-console)

The single most important SEO tool. Free.

**What it gives you:**

- **Performance** — impressions, clicks, average position, CTR for every query/page/country/device. Filterable. Exportable. The closest thing to a "how is my SEO" dashboard that exists.
- **Coverage** — which pages are indexed, which are excluded, and *why* (noindex, redirect, duplicate, soft 404, crawled-not-indexed). Catches indexation bugs early.
- **Sitemaps** — submit your sitemap and watch it get crawled.
- **Core Web Vitals** — real-user performance data from Chrome (CrUX). Drives ranking.
- **Mobile Usability** — flags pages with mobile issues.
- **Manual Actions / Security Issues** — alerts if Google has penalized the site.
- **Links** — top external and internal links, anchor text.

**Setup (once DNS is live):**

1. Add property → choose **Domain** (not URL prefix). Covers `www`, `non-www`, `http`, `https` in one shot.
2. Verify via DNS TXT record at your domain registrar. Or use the HTML meta tag method — easier, can be wired through `metadata.verification.google` in `apps/blog/app/layout.tsx`.
3. Submit `https://feitong.phd/sitemap.xml` under Sitemaps.
4. Wait 3–7 days for data to populate.

**What to look at, week by week:**

- Coverage → Excluded → is anything wrong (404s, soft 404s, indexed-elsewhere)?
- Performance → Queries with `position` between 5 and 15 → these are the *opportunities*. A small content tweak can lift them onto page 1.
- Performance → Pages with high impressions but low CTR → title/description needs a rewrite.

### Bing Webmaster Tools

**URL:** [bing.com/webmasters](https://www.bing.com/webmasters)

Same idea, smaller audience but **increasingly important**: Bing powers DuckDuckGo, Ecosia, and is reportedly the search backend ChatGPT uses for web answers. 2-minute setup. Submit sitemap. Forget about it until you want to debug Bing-specific issues.

### IndexNow

**URL:** [indexnow.org](https://www.indexnow.org)

Push protocol — when you publish, ping search engines so they re-crawl immediately. Supported by Bing/Yandex; Google ignores it for now. Optional. A static blog with weekly cadence doesn't urgently need this.

---

## Layer 2: Lab tools — test code without waiting for crawlers

Run these against the production URL after each deploy. Zero setup. Bookmark them.

| Tool | URL | What it checks |
|------|-----|----------------|
| **PageSpeed Insights** | [pagespeed.web.dev](https://pagespeed.web.dev) | Lighthouse score + real CrUX field data. The same Core Web Vitals Google uses for ranking. |
| **Rich Results Test** | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) | Validates JSON-LD. Relevant after P1 ships. |
| **Schema.org Validator** | [validator.schema.org](https://validator.schema.org) | Generic schema validation, more permissive than Google's tool. |
| **Mobile-Friendly Test** | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) | Mobile rendering. |
| **Open Graph Debugger** | [opengraph.dev](https://opengraph.dev) | Verifies social card actually renders. |
| **LinkedIn Post Inspector** | [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/) | LinkedIn caches aggressively; this clears their cache. |
| **X/Twitter Card Validator** | [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) | Twitter preview check. Login required. |
| **Chrome DevTools → Lighthouse** | local | Local Lighthouse run; "SEO" category covers most lab checks. |

### Practical workflow

After any deploy that changes a layout, head tag, or content type:

1. PageSpeed Insights on the homepage *and* on the longest essay. Two URLs, ~30 seconds.
2. If you shipped JSON-LD or OG changes, Rich Results Test + OG Debugger.
3. Compare Core Web Vitals to the prior snapshot — regressions matter.

---

## Layer 3: Crawl audits — find issues at scale

Full-site sweeps. Run monthly or after a major content push.

### Screaming Frog SEO Spider

**URL:** [screamingfrog.co.uk/seo-spider](https://www.screamingfrog.co.uk/seo-spider/)

Desktop app. Free for ≤500 URLs (you're well under). Crawls every page on the site and reports:

- Missing or duplicate `<title>` / meta description
- Pages with thin content (low word count)
- Missing `alt` on images
- Broken links (internal and external)
- Redirect chains and loops
- Hreflang errors (mismatched return links, missing `x-default`, etc.)
- Pages with no internal links pointing at them ("orphan pages")

The fastest way to catch SEO regressions across a whole site.

### Ahrefs Webmaster Tools

**URL:** [ahrefs.com/webmaster-tools](https://ahrefs.com/webmaster-tools)

Free if you verify site ownership. Use it for:

- **Backlinks** — who links to your essays. The only way to track authority growth.
- **Site audit** — similar to Screaming Frog but cloud-based, runs on schedule.

Skip the paid Ahrefs plans for a personal blog; the free webmaster tier is enough.

### Link checking (CI-friendly)

For a static site you can lint links in CI:

- **`lychee`** ([github.com/lycheeverse/lychee](https://github.com/lycheeverse/lychee)) — Rust, very fast, can be added as a GitHub Action.
- **`linkinator`** — Node, slower but easy.

Catches dead external links before users do. Cheap insurance.

---

## Real-user analytics

GSC tells you what search did. Analytics tells you what users did after they clicked. You need both.

| Tool | Privacy | Cost | Verdict |
|------|---------|------|---------|
| **Plausible** | First-party, cookieless, GDPR-friendly | $9/mo or self-host | Good default for a personal blog |
| **Umami** | Self-hosted, cookieless | Free if self-hosted | Best if you already run a small server |
| **Google Analytics 4** | Cookies, complex | Free | Powerful but invasive; only if you're already on GA |
| **Cloudflare Web Analytics** | Cookieless, lives in Cloudflare dashboard | Free | Trivially easy if Cloudflare-fronted |

What to track:

- **Top entry pages** — where do search visitors land? Those need the best internal linking.
- **Bounce rate / time on page** — high bounce + short time = title/description over-promised.
- **Outbound links** — which "Related essays" links actually get clicked? Use this to tune internal linking.

---

## What to track over time

After ~30 days of GSC + analytics data, the metrics that matter:

| Metric | Source | What it tells you |
|--------|--------|-------------------|
| Indexed pages count | GSC → Coverage | Essays actually in the index |
| Impressions trend | GSC → Performance | Reach growing or not |
| Queries with position 5–15 | GSC → Performance, filter position | Best opportunities — small lifts move them onto page 1 |
| Top queries with low CTR | GSC → Performance | Titles/descriptions need rewriting |
| Core Web Vitals pass rate | GSC → Experience | Real-user perf, ranking signal |
| Backlinks count | Ahrefs Webmaster Tools | Authority growth |
| Time on page / scroll depth | Plausible/Umami | Whether content holds attention |

Snapshot these monthly. The trend matters more than any one value.

---

## How SEO measurement maps to this repo

| When you ship... | Measure with... |
|---|---|
| Layout / metadata changes | Lighthouse SEO category, PageSpeed Insights |
| JSON-LD (P1) | Rich Results Test, Schema.org Validator |
| OG images (P1) | OG Debugger, LinkedIn Post Inspector, Twitter Card Validator |
| New essay | PageSpeed on the new URL; GSC indexed-status after a week |
| Sitemap changes | GSC → Sitemaps → re-submit, watch crawl rate |
| `<html lang>` route-group refactor | Screaming Frog hreflang report; GSC International Targeting (if available) |
| Internal-linking refactor | Screaming Frog orphan-page report; analytics outbound clicks |

---

## Setup checklist (in order)

Day 0 — DNS live:

- [ ] Verify Google Search Console (domain property)
- [ ] Verify Bing Webmaster Tools
- [ ] Submit `https://feitong.phd/sitemap.xml` in both
- [ ] Run PageSpeed Insights on `/` and one essay → save the scores as a baseline
- [ ] Add analytics (Plausible or Umami)

Week 1:

- [ ] Verify Ahrefs Webmaster Tools (for backlinks)
- [ ] Run Screaming Frog over the full site, log any flagged issues
- [ ] Spot-check OG previews with the OG Debugger

Month 1:

- [ ] Review GSC Performance — write down top queries, top pages, current average position
- [ ] Review Coverage — anything unexpectedly excluded
- [ ] Compare Core Web Vitals to the Week 1 baseline

Ongoing:

- [ ] Re-run Screaming Frog after major content pushes
- [ ] Quarterly: review what's ranking 5–15 and tune titles/descriptions on those
