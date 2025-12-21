# Static Export Plan

## Overview

This document outlines the plan to convert the blog to a fully static-generated site compatible with GitHub Pages deployment.

**Goal:** All routes should be static (`○` or `●` in Next.js build output), enabling `output: 'export'` for zero-cost hosting.

---

## Current State

| Route | Status | Issue |
|-------|--------|-------|
| `/` | ○ Static | None |
| `/essays/[slug]` | ● SSG | None (has `generateStaticParams`) |
| `/essays` | ƒ Dynamic | Uses `searchParams` prop |

The `/essays` page is dynamic because it reads URL search params on the server. This blocks static export.

### Current Architecture Analysis

**`/essays/page.tsx`:**
- Server component that accepts `searchParams: Promise<{ type?: string; topics?: string }>`
- Awaits params and filters essays server-side
- Wraps `EssayFilters` in Suspense with `EssayFiltersSkeleton` fallback

**`EssayFilters` component:**
- Already a client component (`'use client'`)
- Already uses `useSearchParams()` internally for URL state management
- Accepts `selectedType` and `selectedTopics` props for initial/current state
- Handles URL updates via `router.push()`

**Key insight:** `EssayFilters` already handles client-side URL state. The server component just needs to stop reading `searchParams` and delegate filtering to the client.

---

## Solution: Client-Side Filtering

Move filtering logic from server to client. The page fetches all essays at build time; filtering happens in the browser.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ /essays/page.tsx (Server Component)                         │
│ - Fetches ALL essays at build time                          │
│ - Passes data to client component                           │
│ - No searchParams access                                    │
│ - No Suspense wrapper (moved to client)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ EssaysPageClient.tsx (Client Component)                     │
│ - Reads URL via useSearchParams()                           │
│ - Filters essays in useMemo                                 │
│ - Passes state to EssayFilters (for consistency)            │
│ - Wrapped in Suspense boundary                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ EssayFilters + EssayList (existing components)              │
│ - EssayFilters: receives props, manages URL updates         │
│ - EssayList: pure presentation                              │
└─────────────────────────────────────────────────────────────┘
```

### Benefits

- Full static export compatibility
- Instant client-side filtering (no server round-trip)
- URL state preserved (shareable filter links)
- Progressive enhancement friendly

---

## Implementation Tasks

### Task 1: Create Client Component for Essays Page

**File:** `apps/blog/app/essays/EssaysPageClient.tsx`

```tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import { EssayFilters, EssayFiltersSkeleton, EssayList } from '@/components/essay';
import { ESSAY_TYPES, TOPICS } from '@/lib/constants';
import type { EssayMeta, EssayType, Topic } from '@/types/content';

/**
 * Parse and validate type parameter
 */
function parseTypeParam(type: string | null): EssayType | null {
  if (!type) return null;
  return ESSAY_TYPES.includes(type as EssayType) ? (type as EssayType) : null;
}

/**
 * Parse and validate topics parameter
 */
function parseTopicsParam(topics: string | null): Topic[] {
  if (!topics) return [];
  return topics
    .split(',')
    .filter((t): t is Topic => TOPICS.includes(t as Topic));
}

/**
 * Inner component that uses useSearchParams
 * Separated to allow Suspense boundary around useSearchParams usage
 */
function EssaysContent({ essays }: { essays: EssayMeta[] }) {
  const searchParams = useSearchParams();

  const selectedType = parseTypeParam(searchParams.get('type'));
  const selectedTopics = parseTopicsParam(searchParams.get('topics'));

  const filteredEssays = useMemo(() => {
    let result = essays;

    if (selectedType) {
      result = result.filter((essay) => essay.type === selectedType);
    }

    if (selectedTopics.length > 0) {
      result = result.filter((essay) =>
        selectedTopics.some((topic) => essay.topics.includes(topic))
      );
    }

    return result;
  }, [essays, selectedType, selectedTopics]);

  return (
    <>
      <EssayFilters
        selectedType={selectedType}
        selectedTopics={selectedTopics}
        className="mb-8"
      />

      <div className="mb-6 text-body-sm text-figure-muted">
        {filteredEssays.length} {filteredEssays.length === 1 ? 'essay' : 'essays'}
        {(selectedType || selectedTopics.length > 0) && <span> matching filters</span>}
      </div>

      <EssayList
        essays={filteredEssays}
        layout="list"
        emptyMessage="No essays match the selected filters. Try adjusting your filters."
      />
    </>
  );
}

/**
 * Loading skeleton for Suspense fallback
 * Reuses existing EssayFiltersSkeleton and adds list skeleton
 */
function EssaysLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filter skeleton - reuse existing component */}
      <EssayFiltersSkeleton className="mb-8" />

      {/* Results count skeleton */}
      <div className="mb-6">
        <div className="h-4 w-24 bg-ground-secondary rounded animate-pulse" />
      </div>

      {/* List skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-ground-secondary rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

/**
 * Exported client component with Suspense boundary
 *
 * useSearchParams() requires a Suspense boundary in static export mode
 * to handle the initial client-side hydration.
 */
export interface EssaysPageClientProps {
  essays: EssayMeta[];
}

export function EssaysPageClient({ essays }: EssaysPageClientProps) {
  return (
    <Suspense fallback={<EssaysLoadingSkeleton />}>
      <EssaysContent essays={essays} />
    </Suspense>
  );
}
```

**Note:** This reuses the existing `EssayFiltersSkeleton` component and imports constants from `@/lib/constants` instead of hardcoding valid types/topics.

### Task 2: Update Essays Page (Server Component)

**File:** `apps/blog/app/essays/page.tsx`

```tsx
import type { Metadata } from 'next';
import { getAllEssays } from '@/lib/essays';
import { EssaysPageClient } from './EssaysPageClient';

export const metadata: Metadata = {
  title: 'Essays',
  description: 'Essays on technology, AI, product thinking, and career development.',
};

/**
 * Essays index page - displays all essays with client-side filtering
 *
 * This is a static page. All essays are fetched at build time and passed
 * to a client component that handles filtering based on URL params.
 *
 * Changes from previous implementation:
 * - Removed searchParams prop (was making page dynamic)
 * - Removed server-side filtering (now handled client-side)
 * - Removed Suspense wrapper (now in EssaysPageClient)
 */
export default function EssaysPage() {
  // Fetch all essays at build time
  const allEssays = getAllEssays();

  return (
    <main className="mx-auto max-w-5xl px-inset-lg py-12">
      <header className="mb-8">
        <h1 className="text-display font-serif text-figure-primary mb-2">
          Essays
        </h1>
        <p className="text-body-lg text-figure-secondary">
          Thoughts on technology, AI, product thinking, and career development.
        </p>
      </header>

      <EssaysPageClient essays={allEssays} />
    </main>
  );
}
```

**Key changes from current implementation:**
- Removed `searchParams` from props interface
- Removed `parseTypeParam()` and `parseTopicsParam()` (moved to client)
- Removed server-side filtering logic
- Removed `Suspense` wrapper around `EssayFilters` (now in client component)
- Removed `EssayFiltersSkeleton` import (now in client component)

### Task 3: Update Next.js Config for Static Export

**File:** `apps/blog/next.config.js`

```js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export
  output: 'export',

  // Output directory (use 'docs' for GitHub Pages, or 'out' for other hosts)
  distDir: 'out',

  // Add trailing slashes for static file compatibility
  trailingSlash: true,

  // Transpile workspace packages
  transpilePackages: ['@blog/ui', '@blog/tokens'],

  reactStrictMode: true,
  poweredByHeader: false,

  // Images must be unoptimized for static export (unconditionally)
  images: {
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias['@ui'] = path.resolve(__dirname, '../../packages/ui/src');

    if (isServer) {
      config.externals = [...(config.externals || []), {
        'react-syntax-highlighter': 'react-syntax-highlighter',
      }];
    }

    return config;
  },
};

module.exports = nextConfig;
```

**Changes from current config:**
- Added `output: 'export'`
- Added `distDir: 'out'`
- Added `trailingSlash: true`
- Changed `images.unoptimized` from conditional to always `true`

### Task 4: Add Build Scripts

**File:** `apps/blog/package.json` (update scripts section)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:run": "vitest run",
    "clean": "rm -rf .next out",
    "serve:static": "npx serve out"
  }
}
```

**Changes:**
- Added `serve:static` script for local testing of static export
- Kept existing scripts intact

### Task 5: Add Static Export Utilities

**File:** `apps/blog/scripts/post-export.js`

```js
#!/usr/bin/env node

/**
 * Post-export script for GitHub Pages compatibility
 *
 * Run after `next build` to add necessary files for GitHub Pages
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../out');

// Add .nojekyll to prevent GitHub from processing with Jekyll
const nojekyllPath = path.join(outDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('Created .nojekyll');
}

// Add CNAME for custom domain (if using one)
// Uncomment and update if you have a custom domain
// const cnamePath = path.join(outDir, 'CNAME');
// fs.writeFileSync(cnamePath, 'yourdomain.com');
// console.log('Created CNAME');

console.log('Post-export complete!');
```

### Task 6: Update GitHub Actions

**File:** `.github/workflows/deploy.yml` (create or update)

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
        # Auto-detects version from packageManager field in package.json (pnpm@9.15.0)

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm --filter @blog/blog build

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

**Changes from original plan:**
- Updated `pnpm/action-setup` to `v4` (auto-detects version from `packageManager` field)
- Removed hardcoded `version: 8` (your repo uses pnpm 9.15.0)

### Task 7: Add E2E Validation Test

**File:** `tests/blog/essays-static.spec.ts`

```ts
import { test, expect } from '@playwright/test';

/**
 * Essays Page Static Export Tests
 *
 * Validates that the essays page works correctly with static export:
 * - Page loads and renders
 * - Client-side filtering works
 * - URL state is preserved
 * - Direct navigation to filtered URLs works
 */
test.describe('Blog: Essays Page (Static Export)', () => {
  test('essays page loads and displays content', async ({ page }) => {
    await page.goto('/essays/');

    // Verify page header
    await expect(page.locator('h1')).toHaveText('Essays');

    // Verify filters are present
    await expect(page.locator('.essay-filters')).toBeVisible();

    // Verify essay list is present
    await expect(page.locator('[role="list"]')).toBeVisible();
  });

  test('type filter updates URL and filters essays', async ({ page }) => {
    await page.goto('/essays/');

    // Click on "Guide" type filter
    await page.click('[data-type="guide"]');

    // Verify URL updated
    await expect(page).toHaveURL(/type=guide/);

    // Verify filter is selected
    await expect(page.locator('[data-type="guide"][data-selected="true"]')).toBeVisible();
  });

  test('topic filter updates URL and filters essays', async ({ page }) => {
    await page.goto('/essays/');

    // Click on "Technical" topic filter
    await page.click('[data-topic="technical"]');

    // Verify URL updated
    await expect(page).toHaveURL(/topics=technical/);

    // Verify filter is selected
    await expect(page.locator('[data-topic="technical"][data-selected="true"]')).toBeVisible();
  });

  test('direct navigation to filtered URL works', async ({ page }) => {
    // Navigate directly to a filtered URL
    await page.goto('/essays/?type=guide&topics=technical');

    // Verify filters are pre-selected
    await expect(page.locator('[data-type="guide"][data-selected="true"]')).toBeVisible();
    await expect(page.locator('[data-topic="technical"][data-selected="true"]')).toBeVisible();
  });

  test('clear filters resets URL', async ({ page }) => {
    await page.goto('/essays/?type=guide&topics=technical');

    // Click clear filters button
    await page.click('.essay-filters-clear-btn');

    // Verify URL is clean
    await expect(page).toHaveURL(/\/essays\/$/);

    // Verify "All" type is selected
    await expect(page.locator('[data-type="all"][data-selected="true"]')).toBeVisible();
  });

  test('filter state persists on page refresh', async ({ page }) => {
    await page.goto('/essays/');

    // Apply filter
    await page.click('[data-type="deep-dive"]');
    await expect(page).toHaveURL(/type=deep-dive/);

    // Refresh page
    await page.reload();

    // Verify filter is still selected
    await expect(page.locator('[data-type="deep-dive"][data-selected="true"]')).toBeVisible();
  });

  test('multiple topic filters work together', async ({ page }) => {
    await page.goto('/essays/');

    // Select multiple topics
    await page.click('[data-topic="technical"]');
    await page.click('[data-topic="ai"]');

    // Verify URL contains both topics
    await expect(page).toHaveURL(/topics=technical.*ai|topics=ai.*technical/);

    // Verify both are selected
    await expect(page.locator('[data-topic="technical"][data-selected="true"]')).toBeVisible();
    await expect(page.locator('[data-topic="ai"][data-selected="true"]')).toBeVisible();
  });
});
```

---

## Validation Checklist

After implementation, verify:

- [ ] `pnpm --filter @blog/blog build` succeeds
- [ ] Build output shows all routes as `○` or `●` (no `ƒ`)
- [ ] Static files generated in `apps/blog/out/`
- [ ] `/essays/` directory contains `index.html`
- [ ] `/essays/[slug]/` directories contain `index.html` for each essay
- [ ] Local test with `npx serve apps/blog/out` works
- [ ] Filtering works in browser (client-side)
- [ ] URL updates when filters change
- [ ] Direct link to filtered URL works (e.g., `/essays/?type=guide`)
- [ ] Refresh preserves filter state
- [ ] E2E tests pass: `pnpm test:e2e tests/blog/essays-static.spec.ts`

---

## Expected Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    X kB         XXX kB
├ ○ /_not-found                          X kB         XXX kB
├ ○ /essays                              X kB         XXX kB  ← Changed from ƒ to ○
└ ● /essays/[slug]                       X kB         XXX kB
    ├ /essays/test-essay
    └ /essays/...

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
```

---

## Troubleshooting

### Common Issues

**1. Build fails with "Page ... couldn't be rendered statically"**
- Ensure no `searchParams` or `headers()` or `cookies()` usage in server components
- Check that all dynamic data fetching happens at build time

**2. useSearchParams causes hydration mismatch**
- Ensure `useSearchParams()` is wrapped in a Suspense boundary
- The client component should handle the initial undefined state gracefully

**3. Images not loading in static export**
- Ensure `images.unoptimized: true` in next.config.js
- Use relative paths or configure `basePath` if deploying to subpath

**4. 404 on direct navigation to routes**
- Ensure `trailingSlash: true` in next.config.js
- GitHub Pages requires trailing slashes for directory-based routing

---

## Future Considerations

### Adding Dynamic Features Later

If you need server features in the future:

1. Remove `output: 'export'` from next.config.js
2. Deploy to Vercel/Netlify instead of GitHub Pages
3. Existing code will work without changes

### Recommended Static-Compatible Enhancements

| Feature | Implementation |
|---------|---------------|
| Full-text search | [Pagefind](https://pagefind.app/) - runs at build time, searches client-side |
| Comments | [Giscus](https://giscus.app/) - GitHub Discussions backed |
| Analytics | [Plausible](https://plausible.io/) or [Umami](https://umami.is/) |
| Newsletter | [Buttondown](https://buttondown.email/) embed |
| View counts | [Supabase](https://supabase.com/) with client-side fetch |

### Base Path (if needed)

If deploying to a subpath (e.g., `username.github.io/blog/`):

```js
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/blog',
  // ...
};
```

---

## Related Documents

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overall system design
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Phase-by-phase tasks
- [BLOG_APP_STRUCTURE.md](./BLOG_APP_STRUCTURE.md) - File structure details
