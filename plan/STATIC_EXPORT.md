# Static Export Plan

## Overview

This document outlines the plan to convert the blog to a fully static-generated site compatible with GitHub Pages deployment.

**Goal:** All routes should be static (`○` or `●` in Next.js build output), enabling `output: 'export'` for zero-cost hosting.

---

## Current State

Build output shows:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    144 B           360 kB
├ ○ /_not-found                          871 B          88.2 kB
├ ○ /about                               145 B           360 kB
├ ƒ /essays                              144 B           360 kB    ← PROBLEM
├ ● /essays/[slug]                       145 B           352 kB
├ ○ /zh                                  145 B           360 kB
├ ○ /zh/about                            144 B           360 kB
├ ƒ /zh/essays                           145 B           360 kB    ← PROBLEM
└ ● /zh/essays/[slug]                    145 B           352 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
ƒ  (Dynamic)  server-rendered on demand
```

**Problem:** `/essays` and `/zh/essays` are dynamic because they use `searchParams` prop in the page component.

### Root Cause

Both essay index pages (`app/essays/page.tsx` and `app/zh/essays/page.tsx`) accept `searchParams` as a prop:

```tsx
interface EssaysPageProps {
  searchParams: Promise<{ type?: string; topics?: string }>;
}

export default async function EssaysPage({ searchParams }: EssaysPageProps) {
  const params = await searchParams;
  // ... uses params for server-side filtering
}
```

This forces Next.js to render these pages dynamically since `searchParams` is only known at request time.

---

## Solution: Client-Side Filtering

Move filter state management entirely to the client. The server renders all essays; the client handles URL params and filtering.

### Key Insight

`EssayFilters` is already a client component that:
- Uses `useSearchParams()` to read URL state
- Uses `router.push()` to update URL
- Has all necessary data attributes for testing (`data-type`, `data-topic`, `data-selected`)

The filtering logic in `EssaysIndexPage` just needs to move to a client component wrapper.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ /essays/page.tsx (Server Component)                         │
│ - Exports metadata only                                     │
│ - Renders EssaysIndexPage with language prop                │
│ - NO searchParams                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ EssaysIndexPage (Server Component)                          │
│ - Fetches ALL essays at build time                          │
│ - Passes data to client component                           │
│ - NO filtering (moved to client)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ EssaysPageContent (New Client Component)                    │
│ - Reads URL via useSearchParams()                           │
│ - Filters essays in useMemo                                 │
│ - Renders EssayFilters + EssayList                          │
│ - Wrapped in Suspense for SSR compatibility                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Task 1: Create Client Component for Essay Filtering

**File:** `apps/blog/components/pages/EssaysPageContent.tsx`

Create a client component that:
1. Accepts all essays as props
2. Reads filter state from URL via `useSearchParams()`
3. Filters essays client-side
4. Renders `EssayFilters` and `EssayList`

Key considerations:
- Wrap `useSearchParams()` usage in Suspense boundary (required for static export)
- Reuse existing `EssayFiltersSkeleton` for loading state
- Import validation helpers from existing code (`ESSAY_TYPES`, `TOPICS`)

### Task 2: Update EssaysIndexPage

**File:** `apps/blog/components/pages/EssaysIndexPage.tsx`

Changes:
- Remove `selectedType` and `selectedTopics` props
- Remove server-side filtering logic
- Pass all essays to new client component
- Keep page header (static content)

### Task 3: Simplify Page Components

**Files:**
- `apps/blog/app/essays/page.tsx`
- `apps/blog/app/zh/essays/page.tsx`

Changes:
- Remove `searchParams` prop from both pages
- Simplify to just render `EssaysIndexPage` with language

### Task 4: Update Next.js Config

**File:** `apps/blog/next.config.js`

Add static export configuration:

```js
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,  // Always true for static export
  },
  // ... existing config
};
```

### Task 5: Add Build Scripts

**File:** `apps/blog/package.json`

Add/update scripts:

```json
{
  "scripts": {
    "build": "next build",
    "serve:static": "npx serve out",
    "clean": "rm -rf .next out"
  }
}
```

### Task 6: Create Post-Export Script

**File:** `apps/blog/scripts/post-export.js`

Creates `.nojekyll` file for GitHub Pages compatibility.

### Task 7: Create GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

Workflow that:
1. Checks out code
2. Sets up pnpm (auto-detects version from `packageManager` field)
3. Installs dependencies
4. Builds project
5. Adds `.nojekyll`
6. Deploys to GitHub Pages via `actions/deploy-pages@v4`

---

## Validation Checklist

After implementation, verify:

### Build Output
- [ ] `pnpm --filter @blog/blog build` succeeds
- [ ] All routes show `○` or `●` (no `ƒ`)
- [ ] Static files generated in `apps/blog/out/`

### File Structure
- [ ] `out/essays/index.html` exists
- [ ] `out/zh/essays/index.html` exists
- [ ] `out/essays/[slug]/index.html` for each essay

### Local Testing
- [ ] `npx serve apps/blog/out` serves the site
- [ ] All pages load without errors
- [ ] Filtering works client-side

### Filter Functionality
- [ ] Type filter updates URL (`?type=guide`)
- [ ] Topic filter updates URL (`?topics=technical,ai`)
- [ ] Combined filters work (`?type=guide&topics=technical`)
- [ ] Clear filters resets URL
- [ ] Direct navigation to filtered URL works
- [ ] Refresh preserves filter state

### Both Languages
- [ ] `/essays/` works with filters
- [ ] `/zh/essays/` works with filters
- [ ] Language toggle still works

---

## Expected Build Output After Changes

```
Route (app)                              Size     First Load JS
┌ ○ /                                    XXX B           XXX kB
├ ○ /_not-found                          XXX B           XXX kB
├ ○ /about                               XXX B           XXX kB
├ ○ /essays                              XXX B           XXX kB  ← Changed from ƒ to ○
├ ● /essays/[slug]                       XXX B           XXX kB
├ ○ /zh                                  XXX B           XXX kB
├ ○ /zh/about                            XXX B           XXX kB
├ ○ /zh/essays                           XXX B           XXX kB  ← Changed from ƒ to ○
└ ● /zh/essays/[slug]                    XXX B           XXX kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
```

---

## GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Add .nojekyll
        run: touch apps/blog/out/.nojekyll

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: apps/blog/out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## Troubleshooting

### Build fails with "Page couldn't be rendered statically"
- Ensure no `searchParams`, `headers()`, or `cookies()` in server components
- Check that `useSearchParams()` is wrapped in Suspense

### Hydration mismatch with useSearchParams
- Client component using `useSearchParams()` must be wrapped in `<Suspense>`
- This handles the initial SSR where search params are unknown

### 404 on direct navigation
- Ensure `trailingSlash: true` in next.config.js
- GitHub Pages requires trailing slashes for directory routing

### Images not loading
- Ensure `images.unoptimized: true`
- Use relative paths for images

---

## Future Enhancements

| Feature | Static-Compatible Solution |
|---------|---------------------------|
| Full-text search | [Pagefind](https://pagefind.app/) |
| Comments | [Giscus](https://giscus.app/) |
| Analytics | [Plausible](https://plausible.io/) or [Umami](https://umami.is/) |
| Newsletter | [Buttondown](https://buttondown.email/) embed |

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overall system design
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Phase-by-phase tasks
- [BLOG_APP_STRUCTURE.md](./BLOG_APP_STRUCTURE.md) - File structure details
