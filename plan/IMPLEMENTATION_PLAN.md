# Implementation Plan

## Overview

This document outlines the step-by-step implementation plan for rebuilding the blog with Next.js + MDX, building on top of the existing design system (Layers 1-3).

**Key principle**: Each phase has parallel workstreams (A and B) that can be developed concurrently without conflicts.

---

## Phase Summary

| Phase | Focus | Workstream A | Workstream B | Dependencies |
|-------|-------|--------------|--------------|--------------|
| 1-3 | Foundation | ✅ Complete | ✅ Complete | - |
| 4 | Blog App Foundation | ✅ Complete | ✅ Complete | Phase 3 |
| 5 | Layout & Theme | ✅ Complete | ✅ Complete | Phase 4 |
| **6** | Essay Core | Essay page & layout | Content components | Phase 5 |
| **7** | Essay Index & Home | List & filters | Home page | Phase 6 |
| **8** | About & Polish | About page | Mobile & a11y | Phase 7 |
| **9** | Content Migration | Single stream | - | Phase 8 |
| **10** | Deployment | Single stream | - | Phase 9 |

---

## Phase 1-3: Foundation (Complete)

### Phase 1: Monorepo Foundation ✅
- [x] Turborepo + pnpm workspace setup
- [x] packages/config (TypeScript, Tailwind configs)
- [x] packages/tokens (basic tokens)

### Phase 2: Token Architecture ✅
- [x] 3-layer token system (primitives → semantic → themes)
- [x] NYT theme (light/dark)
- [x] Style Dictionary multi-theme build

### Phase 3: UI Package ✅
- [x] 22+ components in packages/ui
- [x] Storybook setup (apps/storybook)
- [x] Editorial components (Blockquote, Figure, CodeBlock, etc.)

---

## Phase 4: Blog App Foundation ✅

**Goal:** Working Next.js app with type definitions and content loading infrastructure.

### Workstream 4A: Next.js Scaffold ✅

**Files created:**
```
apps/blog/
├── app/
│   ├── layout.tsx          # Root layout with theme data attributes
│   ├── page.tsx            # Home page placeholder
│   └── globals.css         # Token CSS imports + prose styles
├── next.config.js          # Transpile packages config
├── tailwind.config.js      # Extends @blog/config
├── tsconfig.json           # Extends @blog/config
└── package.json            # All dependencies
```

**Tasks:**
- [x] Create `apps/blog/package.json` with dependencies
- [x] Create `next.config.js` with `transpilePackages: ['@blog/ui', '@blog/tokens']`
- [x] Create `tailwind.config.js` extending `@blog/config`
- [x] Create `tsconfig.json` extending `@blog/config`
- [x] Create minimal `app/layout.tsx` with theme data attributes
- [x] Create `app/globals.css` importing token CSS
- [x] Create placeholder `app/page.tsx`
- [x] Add `blog` to turbo.json pipeline

**Validation:**
- [x] `pnpm --filter @blog/blog dev` starts on localhost:3000
- [x] Tailwind classes work
- [x] Token CSS variables available in browser

### Workstream 4B: Types & Content Infrastructure ✅

**Files created:**
```
apps/blog/
├── types/
│   └── content.ts          # Essay types with validation
├── lib/
│   ├── essays.ts           # Content fetching functions
│   └── mdx.ts              # MDX compilation utilities
└── content/
    └── essays/
        └── _example.mdx    # Example essay with all frontmatter
```

**Tasks:**
- [x] Define TypeScript types in `types/content.ts`
- [x] Create `lib/essays.ts` with functions:
  - `getAllEssays()` - returns all essay metadata
  - `getEssayBySlug(slug)` - returns single essay with content
  - `getEssaySlugs()` - returns all slugs for static generation
  - `getEssaysByType()` - filter by type
  - `getEssaysByTopic()` - filter by topic
  - `getRecentEssays()` - for home page
- [x] Create `lib/mdx.ts` with MDX compilation helpers
- [x] Create example MDX file `content/essays/_example.mdx` with all frontmatter fields

**Validation:**
- [x] `getAllEssays()` returns parsed frontmatter
- [x] `getEssayBySlug()` returns compiled MDX
- [x] TypeScript enforces frontmatter schema
- [x] All 53 tests pass

---

## Phase 5: Layout & Theme ✅

**Goal:** Site header, footer, navigation, and theme switching.

### Workstream 5A: Site Layout Components ✅

**Files created:**
```
apps/blog/components/
└── layout/
    ├── SiteHeader.tsx
    ├── SiteHeader.stories.tsx
    ├── SiteFooter.tsx
    ├── SiteFooter.stories.tsx
    ├── SiteNav.tsx
    ├── SiteNav.stories.tsx
    └── index.ts
```

**Tasks:**
- [x] Create `SiteHeader` with:
  - Logo/site name (link to home)
  - Navigation slot
  - Actions slot (for theme toggle)
- [x] Create `SiteNav` with links: Essays, About
- [x] Create `SiteFooter` with copyright, optional social links
- [x] Update `app/layout.tsx` to use layout components
- [x] Basic responsive styles (mobile hamburger deferred to Phase 8)
- [x] Add Storybook stories for all layout components
- [x] Add Playwright tests for blog component stories (8 tests)

**Uses from @blog/ui:** Button, Separator, cn utility

### Workstream 5B: Theme System ✅

**Files created:**
```
apps/blog/
├── components/
│   └── layout/
│       ├── ThemeToggle.tsx
│       ├── ThemeToggle.stories.tsx
│       └── ThemeProvider.tsx
├── lib/
│   └── theme.ts
└── __tests__/
    └── theme.test.ts
```

**Tasks:**
- [x] Create `ThemeProvider` context:
  - Read system preference
  - Read localStorage preference
  - Provide toggle function
  - Set `data-mode` on `<html>`
- [x] Create `ThemeToggle` component (sun/moon icon button)
- [x] Create `lib/theme.ts` with helpers
- [x] Integrate into `SiteHeader`
- [x] Handle SSR (avoid hydration mismatch with suppressHydrationWarning or script)

**Uses from @blog/ui:** Button, Tooltip

**No conflicts:** 5A builds static layout, 5B adds interactivity. Both touch `SiteHeader` but 5A creates structure, 5B adds toggle.

---

## Phase 6: Essay Core

**Goal:** Full essay page with sidenote layout, notes, and references.

### Workstream 6A: Essay Page & Layout

**Files to create:**
```
apps/blog/
├── app/
│   └── essays/
│       └── [slug]/
│           └── page.tsx
└── components/
    └── essay/
        ├── EssayLayout.tsx
        ├── EssayHeader.tsx
        └── index.ts
```

**Tasks:**
- [ ] Create `EssayLayout` with 3-column CSS grid:
  ```css
  grid-template-columns: 1fr min(65ch, 100%) 300px;
  ```
  - Left margin (empty, for balance)
  - Main content (max 65ch)
  - Right margin (sidenotes, 300px)
  - Responsive: collapse to single column < 1024px
- [ ] Create `EssayHeader` with:
  - Type badge (GUIDE, DEEP-DIVE, etc.)
  - Topic badges
  - Title (h1)
  - Description
  - Date + reading time (calculated)
- [ ] Create `app/essays/[slug]/page.tsx`:
  - `generateStaticParams()` for SSG
  - Fetch essay by slug
  - Render with `EssayLayout`
- [ ] Set up MDX rendering with `next-mdx-remote`

**Uses from @blog/ui:** Badge, Byline

### Workstream 6B: Content Components

**Files to create:**
```
apps/blog/components/
├── content/
│   ├── Note.tsx
│   ├── Marginnote.tsx
│   ├── Reference.tsx
│   ├── References.tsx
│   ├── WideBlock.tsx
│   ├── NoteContext.tsx
│   ├── ReferenceContext.tsx
│   └── index.ts
└── mdx/
    └── MDXComponents.tsx
```

**Tasks:**
- [ ] Create `NoteContext` for sidenote numbering
- [ ] Create `Note` component:
  - Desktop: position in right margin using CSS
  - Mobile: expandable inline element
  - Superscript number in text
- [ ] Create `Marginnote` (same as Note but unnumbered)
- [ ] Create `ReferenceContext` for citation numbering
- [ ] Create `Reference` component:
  - Renders as `[n]` inline
  - Links to References section
- [ ] Create `References` component:
  - Collects all registered references
  - Renders formatted citation list
- [ ] Create `WideBlock` component for images/diagrams that break out
- [ ] Create `MDXComponents.tsx` mapping all components

**Uses from @blog/ui:** Tooltip (mobile note fallback)

**No conflicts:** 6A builds page structure/layout, 6B builds content components that go inside the layout.

---

## Phase 7: Essay Index & Home

**Goal:** Browseable essay list with filtering, minimal home page.

### Workstream 7A: Essay List & Filters

**Files to create:**
```
apps/blog/
├── app/
│   └── essays/
│       └── page.tsx
└── components/
    └── essay/
        ├── EssayCard.tsx
        ├── EssayList.tsx
        └── EssayFilters.tsx
```

**Tasks:**
- [ ] Create `EssayCard` component:
  - Type badge
  - Title (link to essay)
  - Description (truncated)
  - Date
  - Topic badges
- [ ] Create `EssayList` component (grid layout)
- [ ] Create `EssayFilters` component:
  - Type filter (button group: All, Guide, Deep-Dive, etc.)
  - Topic filter (toggleable badges)
  - Client-side filtering with URL searchParams
- [ ] Create `app/essays/page.tsx`:
  - Fetch all essays
  - Render filters + list
  - Handle filter state via searchParams

**Uses from @blog/ui:** Card, Badge, Button

### Workstream 7B: Home Page

**Files to modify:**
```
apps/blog/app/page.tsx     # Replace placeholder
```

**Tasks:**
- [ ] Design minimal home layout:
  - Site title/name
  - One-line description/tagline
  - Recent essays (3-5 most recent)
  - Link to all essays
- [ ] Implement home page:
  - Fetch recent essays
  - Render with `EssayCard` (compact variant or reuse)
- [ ] Add any home-specific styling

**Uses from @blog/ui:** Button, components from 7A (EssayCard)

**No conflicts:** 7A builds essay browsing, 7B builds home. 7A creates `EssayCard` first, 7B imports it. Ensure 7A completes `EssayCard` before 7B needs it.

---

## Phase 8: About & Polish

**Goal:** About page, mobile navigation, accessibility review.

### Workstream 8A: About Page

**Files to create:**
```
apps/blog/
├── app/
│   └── about/
│       └── page.tsx
└── components/
    └── about/
        ├── NowSection.tsx
        ├── Timeline.tsx
        ├── ResumeSection.tsx
        └── index.ts
```

**Tasks:**
- [ ] Create `NowSection` component:
  - Current role/focus
  - What I'm working on
  - Inspired by nownownow.com
- [ ] Create `Timeline` component:
  - Career/education milestones
  - Visual timeline or simple list
- [ ] Create `ResumeSection` component:
  - Collapsible sections (Work, Education, Publications)
  - Uses Accordion from @blog/ui
- [ ] Create `app/about/page.tsx`:
  - Personal intro
  - Now section
  - Timeline
  - Collapsible resume

**Uses from @blog/ui:** Card, Accordion, Badge

### Workstream 8B: Mobile & Accessibility

**Files to create/modify:**
```
apps/blog/components/layout/
├── SiteHeader.tsx          # Modify for mobile
├── SiteNav.tsx             # Mobile variant
└── MobileMenu.tsx          # New
```

**Tasks:**
- [ ] Create `MobileMenu` component:
  - Hamburger button trigger
  - Slide-out or dropdown menu
  - Close on navigation or outside click
- [ ] Update `SiteHeader` for responsive:
  - Hide desktop nav on mobile (< 768px)
  - Show hamburger on mobile
- [ ] Accessibility audit:
  - Focus management (especially mobile menu)
  - Keyboard navigation (Tab, Enter, Escape)
  - Screen reader testing
  - Color contrast verification
- [ ] Test all pages at breakpoints: 320px, 768px, 1024px, 1440px
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)

**Uses from @blog/ui:** Modal or Dropdown (for mobile menu), Button

**No conflicts:** 8A is about page content, 8B is cross-cutting UX. Different focus areas.

---

## Phase 9: Content Migration

**Goal:** Migrate existing content from Hugo format to MDX.

**Single workstream** - content work is sequential.

**Tasks:**
- [ ] Audit existing content in `content/` folder
- [ ] Prioritize posts to migrate (start with blog/, defer digest/)
- [ ] Create migration checklist per post:
  - [ ] Update frontmatter to new schema
  - [ ] Add `type` field
  - [ ] Add `topics` array
  - [ ] Convert Hugo shortcodes to MDX components
  - [ ] Review/update formatting
- [ ] Migrate priority posts:

| Post | Type | Topics | Status |
|------|------|--------|--------|
| `10k-code.md` | narrative | technical, career | Pending |
| `10k-cpp.md` | guide | technical | Pending |
| `job_search_reflection.en.md` | narrative | career | Pending |
| `offer_negotiation.en.md` | guide | career | Pending |
| `meeting-how-to.md` | guide | career | Pending |

- [ ] Set up redirects if URLs change
- [ ] Archive old Hugo content folder

**Validation:**
- [ ] All migrated content renders correctly
- [ ] Links work
- [ ] Images display
- [ ] Code blocks highlight
- [ ] Notes and references work

---

## Phase 10: Deployment

**Goal:** Static export and deploy to GitHub Pages.

**Single workstream.**

**Tasks:**
- [ ] Configure static export in `next.config.js`:
  ```js
  module.exports = {
    output: 'export',
    distDir: 'docs',
    images: { unoptimized: true },
    trailingSlash: true,
  };
  ```
- [ ] Add build scripts to package.json
- [ ] Ensure `.nojekyll` file in output
- [ ] Preserve CNAME file for custom domain
- [ ] Test local static build
- [ ] Deploy to GitHub Pages
- [ ] Verify all pages accessible
- [ ] Optional: Set up GitHub Actions for auto-deploy

**Validation:**
- [ ] `pnpm build` succeeds
- [ ] Static files in `docs/` directory
- [ ] Site works on GitHub Pages
- [ ] All routes accessible
- [ ] No broken links

---

## Dependency Graph

```
Phase 1-3 (Complete)
       │
       ▼
Phase 4 (Complete)
       │
       ▼
┌──────┴──────┐
│  Phase 5    │
│ 5A ←──→ 5B  │  (parallel)
└──────┬──────┘
       │
       ▼
┌──────┴──────┐
│  Phase 6    │
│ 6A ←──→ 6B  │  (parallel)
└──────┬──────┘
       │
       ▼
┌──────┴──────┐
│  Phase 7    │
│ 7A ──→ 7B   │  (7B waits for EssayCard from 7A)
└──────┬──────┘
       │
       ▼
┌──────┴──────┐
│  Phase 8    │
│ 8A ←──→ 8B  │  (parallel)
└──────┬──────┘
       │
       ▼
   Phase 9
   (sequential)
       │
       ▼
   Phase 10
   (sequential)
```

---

## Validation Checklist

### Phase 4 ✅
- [x] `pnpm --filter @blog/blog dev` starts
- [x] Token CSS variables work
- [x] `getAllEssays()` returns data
- [x] TypeScript types enforce schema

### Phase 5 ✅ (Complete)
- [x] Header/footer render on all pages
- [x] Navigation links work
- [x] Theme toggle persists preference
- [x] No hydration errors
- [x] Unit tests pass (22 theme tests)
- [x] Storybook stories for all layout components (Blog / Layout / *)
- [x] Playwright tests pass (32 total: 8 foundations + 16 brutalism + 8 blog)
- [x] Next.js mocks configured for Storybook (next/navigation, next/link)

### Phase 6
- [ ] Essay page renders MDX content
- [ ] Sidenotes appear in margin (desktop)
- [ ] Sidenotes expand inline (mobile)
- [ ] References render with [n] format
- [ ] Wide blocks break out of column

### Phase 7
- [ ] Essay list shows all essays
- [ ] Filters update URL and list
- [ ] Home shows recent essays
- [ ] All links work

### Phase 8
- [ ] About page renders all sections
- [ ] Mobile menu works
- [ ] Keyboard navigation works
- [ ] Lighthouse accessibility score ≥ 90

### Phase 9
- [ ] Priority posts migrated
- [ ] No broken links
- [ ] Content renders correctly

### Phase 10
- [ ] Static export succeeds
- [ ] Site works on GitHub Pages
- [ ] All routes accessible

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| MDX compilation complexity | Use `next-mdx-remote`, proven solution |
| Sidenote positioning | Start with CSS-only approach, enhance with JS if needed |
| Reference auto-numbering | Use React context, test with example content early |
| Mobile sidenote UX | Prototype in Phase 6, iterate based on testing |
| Theme hydration flash | Use blocking script or `suppressHydrationWarning` |
| Static export limitations | Use `output: 'export'` from start, avoid server features |

---

## Open Questions

1. **Language toggle**: Same page with content switch, or separate URL paths (`/zh/essays/...`)?
2. **Search**: Add in Phase 8 or defer to post-launch?
3. **RSS feed**: Add in Phase 8 or defer?
4. **Interactive diagrams (D3)**: Defer to post-Phase 10?

---

## Success Criteria

1. **Functional**: All pages render, navigation works, theme toggles
2. **Content**: Essays display with sidenotes and references
3. **Performance**: Lighthouse score > 90
4. **Accessibility**: No critical a11y errors
5. **Mobile**: Responsive design works at all breakpoints
6. **Deployment**: Site live on GitHub Pages
