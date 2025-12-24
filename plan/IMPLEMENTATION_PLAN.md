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
| 6 | Essay Core | ✅ Complete | ✅ Complete | Phase 5 |
| 7 | Essay Index & Home | ✅ Complete | ✅ Complete | Phase 6 |
| 8 | About & Polish | ✅ Complete | ✅ Complete | Phase 7 |
| **9** | i18n & Content | ✅ Complete | ✅ Complete | Phase 8 |
| **10** | Deployment | Single stream | - | Phase 9 |
| **11** | Periodics & References | ✅ Complete | ✅ Complete | Phase 10 |

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

## Phase 6: Essay Core ✅

**Goal:** Full essay page with sidenote layout, notes, and references.

### Workstream 6A: Essay Page & Layout ✅

**Files created:**
```
apps/blog/
├── app/
│   └── essays/
│       └── [slug]/
│           └── page.tsx
├── components/
│   └── essay/
│       ├── EssayLayout.tsx
│       ├── EssayLayout.stories.tsx
│       ├── EssayHeader.tsx
│       ├── EssayHeader.stories.tsx
│       └── index.ts
└── styles/
    └── essay.css
```

**Tasks:**
- [x] Create `EssayLayout` with Tufte CSS-inspired approach:
  - Content has `max-w-prose` (65ch) for readability
  - Container has `pr-[340px]` right padding for margin space
  - Sidenotes use `float: right` + `mr-[-320px]` negative margin
  - Responsive: collapse to single column < 1024px
- [x] Create `EssayHeader` with:
  - Type badge (GUIDE, DEEP-DIVE, etc.)
  - Topic badges
  - Title (h1)
  - Description
  - Date + reading time (calculated)
- [x] Create `app/essays/[slug]/page.tsx`:
  - `generateStaticParams()` for SSG
  - Fetch essay by slug
  - Render with `EssayLayout`
- [x] Set up MDX rendering with `next-mdx-remote/rsc`
- [x] Add Storybook stories for EssayLayout and EssayHeader

**Uses from @blog/ui:** Badge

### Workstream 6B: Content Components ✅

**Files created:**
```
apps/blog/components/
├── content/
│   ├── Note.tsx
│   ├── Note.stories.tsx
│   ├── Marginnote.tsx
│   ├── Marginnote.stories.tsx
│   ├── Reference.tsx
│   ├── Reference.stories.tsx
│   ├── References.tsx
│   ├── WideBlock.tsx
│   ├── WideBlock.stories.tsx
│   ├── NoteContext.tsx
│   ├── ReferenceContext.tsx
│   └── index.ts
└── mdx/
    ├── MDXComponents.tsx
    └── index.ts
```

**Tasks:**
- [x] Create `NoteContext` for sidenote numbering
- [x] Create `Note` component:
  - Desktop: float into right margin with negative margin (Tufte CSS approach)
  - Mobile: expandable inline element with tap-to-expand
  - Superscript number in text (¹, ², etc.)
- [x] Create `Marginnote` (same positioning as Note but unnumbered, italic, uses ⁺ symbol)
- [x] Create `ReferenceContext` for citation numbering
- [x] Create `Reference` component:
  - Renders as `[n]` inline
  - Links to References section
- [x] Create `References` component:
  - Subscribes to ReferenceContext
  - Renders formatted citation list
- [x] Create `WideBlock` component for images/diagrams that break out
- [x] Create `MDXComponents.tsx` mapping all components
- [x] Add Storybook stories for all content components
- [x] Add Playwright tests (52 tests covering desktop/mobile behavior)

**Validation:**
- [x] Essay page renders MDX content at `/essays/test-essay`
- [x] Sidenotes appear in margin (desktop, ≥1024px)
- [x] Sidenotes expand inline (mobile, <1024px)
- [x] References render with [n] format
- [x] Wide blocks break out of column
- [x] All 52 Playwright tests pass

---

## Phase 7: Essay Index & Home ✅

**Goal:** Browseable essay list with filtering, minimal home page.

### Workstream 7A: Essay List & Filters ✅

**Files created:**
```
apps/blog/
├── app/
│   └── essays/
│       └── page.tsx
└── components/
    └── essay/
        ├── EssayCard.tsx
        ├── EssayCard.stories.tsx
        ├── EssayList.tsx
        ├── EssayList.stories.tsx
        ├── EssayFilters.tsx
        └── EssayFilters.stories.tsx
```

**Tasks:**
- [x] Create `EssayCard` component:
  - Type badge
  - Title (link to essay)
  - Description (truncated to 2 lines with line-clamp)
  - Date
  - Topic badges
  - Variants: default, compact
- [x] Create `EssayList` component (grid/list layouts)
- [x] Create `EssayFilters` component:
  - Type filter (button group: All, Guide, Deep-Dive, etc.)
  - Topic filter (toggleable badges)
  - Client-side filtering with URL searchParams
  - Clear all filters button
- [x] Create `app/essays/page.tsx`:
  - Fetch all essays
  - Render filters + list
  - Handle filter state via searchParams
  - Results count display
- [x] Add Storybook stories for all components

**Uses from @blog/ui:** Card, Badge, Button

### Workstream 7B: Home Page ✅

**Files modified:**
```
apps/blog/app/page.tsx     # Enhanced with recent essays
```

**Tasks:**
- [x] Design minimal home layout:
  - Site title/name (Essays)
  - One-line description/tagline
  - Recent essays (5 most recent)
  - Link to all essays
- [x] Implement home page:
  - Fetch recent essays with getRecentEssays()
  - Render with EssayList component
  - Hero section with navigation buttons
- [x] Styling using design tokens

**Uses from @blog/ui:** Button, EssayList from 7A

---

## Phase 8: About & Polish ✅

**Goal:** About page, mobile navigation, accessibility review.

### Workstream 8A: About Page ✅

**Files created:**
```
apps/blog/
├── app/
│   └── about/
│       └── page.tsx
└── components/
    └── about/
        ├── NowSection.tsx
        ├── NowSection.stories.tsx
        ├── Timeline.tsx
        ├── Timeline.stories.tsx
        ├── ResumeSection.tsx
        ├── ResumeSection.stories.tsx
        └── index.ts
```

**Tasks:**
- [x] Create `NowSection` component:
  - Current role/focus
  - What I'm working on
  - Inspired by nownownow.com
- [x] Create `Timeline` component:
  - Career/education milestones
  - Visual timeline with dots and connecting line
- [x] Create `ResumeSection` component:
  - Collapsible sections (Work, Education, Publications)
  - Uses Accordion from @blog/ui
- [x] Create `app/about/page.tsx`:
  - Personal intro
  - Now section
  - Timeline
  - Collapsible resume

**Uses from @blog/ui:** Accordion, Badge, Separator

### Workstream 8B: Mobile & Accessibility ✅

**Files created/modified:**
```
apps/blog/components/layout/
├── SiteHeader.tsx          # Modified for mobile menu integration
├── MobileMenu.tsx          # New - slide-down mobile navigation
└── MobileMenu.stories.tsx  # New - Storybook stories
```

**Tasks:**
- [x] Create `MobileMenu` component:
  - Hamburger button trigger (integrated in SiteHeader)
  - Slide-down menu with backdrop
  - Close on navigation, outside click, or Escape key
- [x] Update `SiteHeader` for responsive:
  - Hide desktop nav on mobile (< 768px)
  - Show hamburger on mobile
  - Mobile menu state management
- [x] Accessibility features:
  - Focus management (first link on open)
  - Keyboard navigation (Tab, Enter, Escape)
  - ARIA attributes (role="dialog", aria-modal, aria-label)
  - aria-expanded on toggle button
- [x] Playwright tests added:
  - 10 tests for MobileMenu component
  - 19 tests for About components (NowSection, Timeline, ResumeSection)

**Uses from @blog/ui:** Button (implicitly via theme toggle)

**No conflicts:** 8A is about page content, 8B is cross-cutting UX. Different focus areas.

---

## Phase 9: Internationalization & Content Migration

**Goal:** Add bilingual support (English default, Chinese at `/zh`) and migrate Hugo content to MDX.

### Workstream 9A: Language Infrastructure ✅

**Files created:**
```
apps/blog/
├── lib/
│   └── i18n/
│       ├── language.ts        # Language utilities (storage, path helpers)
│       ├── translations.ts    # UI string translations
│       ├── context.tsx        # LanguageProvider context
│       └── index.ts
├── components/
│   └── layout/
│       ├── LanguageToggle.tsx
│       └── LanguageToggle.stories.tsx
├── app/
│   └── zh/
│       ├── layout.tsx         # Chinese layout wrapper
│       ├── page.tsx           # Chinese home
│       ├── essays/
│       │   ├── page.tsx       # Chinese essay index
│       │   └── [slug]/
│       │       └── page.tsx   # Chinese essay page
│       └── about/
│           └── page.tsx       # Chinese about page
└── types/
    └── content.ts             # Updated with translationOf field
```

**Tasks:**
- [x] Create `lib/i18n/language.ts` with language utilities:
  - `getStoredLanguage()`, `setStoredLanguage()`, `applyLanguage()`
  - `getLanguageFromPath()`, `localizePathname()`
  - `LANGUAGE_CODES`, `LANGUAGE_NAMES`, `DEFAULT_LANGUAGE`
- [x] Create `lib/i18n/locales/` with JSON translation files:
  - `en.json` - English UI strings
  - `zh.json` - Chinese UI strings
  - Navigation labels, filter labels, date/time formats, footer text
- [x] Create `lib/i18n/translations.ts` with utility functions:
  - `translate()` function with interpolation (loads from JSON)
  - `getTypeLabel()`, `getTopicLabel()` helpers
  - `formatDate()`, `formatReadingTime()`, `formatResultsCount()`
- [x] Create `LanguageProvider` context:
  - Store language preference in localStorage (`language-preference`)
  - Provide `language`, `setLanguage`, `toggleLanguage`, `t()` function
  - Read from URL path (`/zh/*` → Chinese)
  - Handle hydration safely (like ThemeProvider)
  - `useLanguage()` and `useLanguageMounted()` hooks
- [x] Create `LanguageToggle` component:
  - Globe icon + target language code (EN/中文)
  - Click navigates to equivalent route in selected language
  - Hydration-safe rendering
- [x] Update `types/content.ts`:
  - Add `translationOf?: string` field to EssayMeta
  - Update validation function
- [x] Update `lib/essays.ts`:
  - Add `getEssaysByLanguage(lang: Language)` function
  - Add `getTranslation(slug: string, targetLang: Language)` function
  - Add `getEssaySlugsByLanguage(lang)` function
  - Update `getAllEssays()` with optional `language` filter
- [x] Create `/zh` route group:
  - `/zh/layout.tsx` - sets Chinese metadata
  - `/zh/page.tsx` - Chinese home page
  - `/zh/essays/page.tsx` - Chinese essay index
  - `/zh/essays/[slug]/page.tsx` - Chinese essay page
  - `/zh/about/page.tsx` - Chinese about page
- [x] Update `SiteHeader`:
  - Add LanguageToggle alongside ThemeToggle in HeaderActions
- [x] Update essay components for language support:
  - `EssayCard` - add `basePath` prop
  - `EssayList` - add `basePath` prop
  - `EssayFilters` - add `language` prop, localized labels
  - `EssayHeader` - add `language` prop, localized date/time
- [x] Update `lib/constants.ts`:
  - Add localized labels (`ESSAY_TYPE_LABELS_ZH`, `TOPIC_LABELS_ZH`)
  - Add `getEssayTypeLabel(type, lang)`, `getTopicLabel(topic, lang)` functions
- [x] Update `app/layout.tsx`:
  - Add anti-flash script for language
  - Wrap with LanguageProvider
  - HeaderActions with both toggles
- [x] Add Storybook stories for LanguageToggle
- [x] Verify build passes and Playwright tests pass

**Uses from @blog/ui:** Button, Tooltip

### Workstream 9B: Content Migration ✅

**Files created/modified:**
```
apps/blog/content/essays/
├── 10k-code-zh.mdx             # Chinese: 10000行代码 (slug: 10k-code-zh)
├── 10k-cpp-zh.mdx              # Chinese: 10000行C++ (slug: 10k-cpp-zh)
├── job-search-reflection.mdx   # English: Job Search Reflection
├── offer-negotiation.mdx       # English: Offer Negotiation
├── meeting-how-to-zh.mdx       # Chinese: 开会指南 (slug: meeting-how-to-zh)
├── programmer-quality-zh.mdx   # Chinese: 程序员素质 (slug: programmer-quality-zh)
├── programming-ai-zh.mdx       # Chinese: 编程增强智能 (slug: programming-ai-zh)
├── short-pr-zh.mdx             # Chinese: PR简短 (slug: short-pr-zh)
├── reverse-interview-zh.mdx    # Chinese: 反向面试 (slug: reverse-interview-zh)
└── ...
```

**Naming Convention:**
- Chinese essays: use `-zh` suffix (e.g., `10k-code-zh.mdx` → slug `10k-code-zh`)
- English essays: no suffix (e.g., `job-search-reflection.mdx` → slug `job-search-reflection`)
- The `lang` field in frontmatter is authoritative for language detection

**Tasks:**
- [x] Audit existing Hugo content (69 files):
  - `blog/` - 11 files (priority: migrate all)
  - `digest/` - 23 files (defer to Phase 11)
  - `library/` - 17 files (defer to Phase 11)
  - `about/` - 6 files (integrate into About page)
  - `collection/` - 6 files (defer to Phase 11)
- [x] Create migration script or checklist per post:
  - Convert `.md` to `.mdx`
  - Update frontmatter to new schema:
    - Add `description` field
    - Add `type` field (guide/narrative/opinion/review/deep-dive)
    - Add `topics` array (technical/ai/product/career)
    - Add `lang` field (en/zh)
    - Add `translationOf` if translation exists
  - Convert Hugo shortcodes to MDX components
  - Update internal links
  - Verify code blocks work
- [x] Migrate blog posts (9 files):

| File | Language | Type | Topics | New Slug |
|------|----------|------|--------|----------|
| `10k-code.md` | zh | narrative | technical, career | `10k-code-zh` |
| `10k-cpp.md` | zh | guide | technical | `10k-cpp-zh` |
| `job_search_reflection.en.md` | en | narrative | career | `job-search-reflection` |
| `offer_negotiation.en.md` | en | guide | career | `offer-negotiation` |
| `meeting-how-to.md` | zh | guide | career | `meeting-how-to-zh` |
| `programmer_quality.md` | zh | opinion | technical, career | `programmer-quality-zh` |
| `programming_augmenting_intelligence.md` | zh | opinion | technical, ai | `programming-ai-zh` |
| `reverse-interview.md` | zh | guide | career | `reverse-interview-zh` |
| `short_pr.md` | zh | guide | technical | `short-pr-zh` |

- [x] Update About page content:
  - Integrate `about/_index.md` (Chinese) into `/zh/about`
  - Integrate `about/_index.en.md` (English) into `/about`
  - Migrate resume content if applicable
- [x] Link translations where both versions exist
- [x] Test all migrated content renders correctly
- [ ] Remove/archive old Hugo `content/` folder after migration (deferred)

### Workstream 9C: UI Localization & Polish ✅

**Tasks:**
- [x] Localize EssayFilters:
  - Type labels (Guide → 指南, Deep-Dive → 深度分析, etc.)
  - Topic labels (Technical → 技术, Career → 职业, etc.)
  - "All" button text
  - Results count text
- [x] Localize EssayCard:
  - Date format (Jan 15, 2024 → 2024年1月15日)
  - Reading time (5 min read → 阅读时间约5分钟)
- [x] Localize EssayHeader:
  - Type/Topic badges
  - Date and reading time
- [x] Localize SiteFooter:
  - Copyright text
  - Links text
- [x] Localize Home page:
  - Tagline/description
  - "View all essays" link
  - Section headers
- [x] Localize About page:
  - Section headers
  - Timeline content (separate data per locale in aboutData.ts)
- [x] Add Chinese font stack:
  ```css
  --font-serif-zh: "Noto Serif SC", "Source Han Serif CN", "Songti SC", serif;
  ```
- [x] Add language-specific typography styles:
  - Chinese: line-height 1.9
  - Chinese: adjusted paragraph spacing (margin-bottom: 1.5em)
- [x] Add hreflang tags for SEO:
  - Implemented in essay page metadata (alternates.languages)

### Workstream 9D: Testing & Validation ✅

**Tasks:**
- [x] Add Playwright tests for language switching:
  - LanguageToggle component tests (6 tests in layout-components.spec.ts)
  - Toggle shows correct label (EN/中)
  - Dropdown shows language options
  - Shows check icon for current language
- [x] Add tests for essay filtering by language:
  - `getEssaysByLanguage` tests (essays.test.ts)
  - `getEssaySlugsByLanguage` tests (essays.test.ts)
- [x] Add tests for translation linking:
  - `getTranslation` tests (essays.test.ts)
  - Tests bidirectional translation lookup
- [x] Add i18n unit tests:
  - 33 tests in i18n.test.ts covering:
    - `getLanguageFromPath`, `localizePathname`, `toggleLanguage`
    - `translate`, `getTypeLabel`, `getTopicLabel`
    - `formatReadingTime`, `formatDate`, `formatResultsCount`
    - localStorage functions
- [x] Verify all migrated content renders:
  - Chinese essays at `/zh/essays/[slug]`
  - English essays at `/essays/[slug]`
  - Code blocks highlight correctly
  - Internal links work
- [x] Test language toggle in Storybook (6 Playwright tests)

**Validation Checklist:**
- [x] Language toggle appears in header
- [x] Selecting Chinese navigates to `/zh/*`
- [x] Selecting English navigates to `/*` (no prefix)
- [x] Preference persists in localStorage
- [x] All blog posts migrated and rendering
- [x] Chinese typography (font, line-height) applied
- [x] Date/time formatted per language
- [x] Filter labels localized
- [x] hreflang tags present in HTML head (via Next.js metadata)
- [x] All vitest tests pass (117 tests)
- [x] No hydration errors

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

## Phase 11: Periodics & References

**Goal:** Extend the content model to support Periodics (digests) and References (collections), then migrate remaining Hugo content.

### Content Type Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT ARCHITECTURE                         │
├─────────────────┬─────────────────┬─────────────────────────────┤
│     Essays      │    Periodics    │       References            │
│   (original)    │   (recurring)   │      (evergreen)            │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ ✅ Implemented  │ Phase 11        │ Phase 11                    │
│ /essays/*       │ /periodics/*    │ /references/*               │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

### Workstream 11A: Types & Infrastructure

**Files to create:**
```
apps/blog/
├── types/
│   └── content.ts              # Extended with Periodic, Reference types
├── lib/
│   ├── periodics.ts            # Periodic content fetching
│   └── references.ts           # Reference content fetching
└── content/
    ├── periodics/              # New content directory
    └── references/             # New content directory
```

**Tasks:**
- [ ] Define TypeScript types for Periodics:
  ```typescript
  interface PeriodicMeta {
    title: string;
    description?: string;
    date: string;
    issue: number;
    type: 'digest' | 'changelog' | 'notes';
    topics: Topic[];
    lang: Language;
  }
  ```
- [ ] Define TypeScript types for References:
  ```typescript
  interface ReferenceMeta {
    title: string;
    description: string;
    date: string;
    updated?: string;
    category: 'resources' | 'bibliography' | 'reading-list' | 'tools';
    topics: Topic[];
    lang: Language;
    itemCount?: number;
  }
  ```
- [ ] Extend Topic type with new values:
  ```typescript
  type Topic =
    | 'technical' | 'ai' | 'product' | 'career'  // existing
    | 'research' | 'design' | 'learning';         // new
  ```
- [ ] Create `lib/periodics.ts` with functions:
  - `getAllPeriodics()` - returns all periodic metadata
  - `getPeriodicBySlug(slug)` - returns single periodic with content
  - `getPeriodicSlugs()` - returns all slugs for static generation
  - `getPeriodicsByType(type)` - filter by type
  - `getPeriodicsByLanguage(lang)` - filter by language
- [ ] Create `lib/references.ts` with functions:
  - `getAllReferences()` - returns all reference metadata
  - `getReferenceBySlug(slug)` - returns single reference with content
  - `getReferenceSlugs()` - returns all slugs for static generation
  - `getReferencesByCategory(category)` - filter by category
  - `getReferencesByLanguage(lang)` - filter by language
- [ ] Add unit tests for new content loaders

### Workstream 11B: Routes & Components

**Files to create:**
```
apps/blog/
├── app/
│   ├── periodics/
│   │   ├── page.tsx            # Periodics archive
│   │   └── [slug]/
│   │       └── page.tsx        # Periodic page
│   ├── references/
│   │   ├── page.tsx            # References index
│   │   └── [slug]/
│   │       └── page.tsx        # Reference page
│   └── zh/
│       ├── periodics/
│       │   ├── page.tsx
│       │   └── [slug]/
│       │       └── page.tsx
│       └── references/
│           ├── page.tsx
│           └── [slug]/
│               └── page.tsx
└── components/
    ├── periodic/
    │   ├── PeriodicCard.tsx
    │   ├── PeriodicList.tsx
    │   ├── PeriodicHeader.tsx
    │   └── index.ts
    └── reference/
        ├── ReferenceCard.tsx
        ├── ReferenceList.tsx
        ├── ReferenceHeader.tsx
        └── index.ts
```

**Tasks:**
- [ ] Create `PeriodicCard` component:
  - Issue number badge
  - Title (link to periodic)
  - Date
  - Type badge (digest/changelog/notes)
- [ ] Create `PeriodicList` component (chronological archive view)
- [ ] Create `PeriodicHeader` component:
  - Issue number
  - Title
  - Date
  - Type badge
- [ ] Create `app/periodics/page.tsx` (archive view)
- [ ] Create `app/periodics/[slug]/page.tsx`
- [ ] Create `ReferenceCard` component:
  - Category badge
  - Title (link to reference)
  - Description
  - Last updated date
  - Item count (optional)
- [ ] Create `ReferenceList` component (category-grouped view)
- [ ] Create `ReferenceHeader` component:
  - Category badge
  - Title
  - Description
  - Created/updated dates
- [ ] Create `app/references/page.tsx` (index view)
- [ ] Create `app/references/[slug]/page.tsx`
- [ ] Create Chinese routes (`/zh/periodics/*`, `/zh/references/*`)
- [ ] Update `SiteNav` to include Periodics and References links
- [ ] Add Storybook stories for all new components

### Workstream 11C: Content Migration

**Source content to migrate:**

| Hugo Directory | Files | Target Type | Target Directory |
|----------------|-------|-------------|------------------|
| `content/digest/` | 23 | Periodics | `content/periodics/` |
| `content/collection/` | 6 | References | `content/references/` |
| `content/library/` | 17 | References | `content/references/` |

**Tasks:**
- [ ] Migrate digest content (23 files):

| File | Language | Type | New Slug |
|------|----------|------|----------|
| `digest-001.md` | zh | digest | `digest-001-zh` |
| `digest-002.md` | zh | digest | `digest-002-zh` |
| ... | ... | ... | ... |
| `digest-022.md` | zh | digest | `digest-022-zh` |
| `tech_blog_crowdcast_io.md` | zh | digest | `tech-blog-crowdcast-zh` |

- [ ] Migrate collection content (6 files):

| File | Language | Category | New Slug |
|------|----------|----------|----------|
| `vision-100.md` | zh | bibliography | `vision-100-papers-zh` |
| `psych-writing.md` | zh | reading-list | `psychology-writing-zh` |
| `system_design_interview.en.md` | en | resources | `system-design-interview` |
| `past_writing.md` | zh | reading-list | `past-writing-zh` |
| `_index.md` | zh | - | (skip - index file) |
| `_index.en.md` | en | - | (skip - index file) |

- [ ] Migrate library content (17 files):

| File | Language | Category | Notes |
|------|----------|----------|-------|
| Book/paper notes | zh/en | bibliography | Convert to reference pages |

- [ ] Convert Hugo shortcodes to MDX components:
  - `{{< digest-item >}}` → `<DigestItem>` component
  - `{{< box-highlight >}}` → `<Callout>` component
- [ ] Update frontmatter to new schema:
  - Add `type` or `category` field
  - Add `topics` array
  - Add `lang` field
  - Add `issue` number for digests
  - Add `updated` date for references
- [ ] Update internal links
- [ ] Test all migrated content renders correctly

### Workstream 11D: UI Localization

**Tasks:**
- [ ] Add translations for new content types in JSON locale files:
  ```json
  // lib/i18n/locales/en.json (add these keys)
  {
    "nav.periodics": "Periodics",
    "nav.references": "References",
    "periodic.issue": "Issue #{issue}",
    "periodic.type.digest": "Digest",
    "periodic.type.changelog": "Changelog",
    "periodic.type.notes": "Notes",
    "reference.category.resources": "Resources",
    "reference.category.bibliography": "Bibliography",
    "reference.category.reading-list": "Reading List",
    "reference.category.tools": "Tools",
    "reference.updated": "Updated {date}",
    "reference.items": "{count} items"
  }
  ```
- [ ] Add Chinese translations to `lib/i18n/locales/zh.json`
- [ ] Localize date formats for periodics/references
- [ ] Add topic translations for new topics (research, design, learning)

### Workstream 11E: Testing & Validation

**Tasks:**
- [ ] Add unit tests for `lib/periodics.ts`
- [ ] Add unit tests for `lib/references.ts`
- [ ] Add Playwright tests for periodic components
- [ ] Add Playwright tests for reference components
- [ ] Verify all migrated content renders:
  - Periodics at `/periodics/[slug]` and `/zh/periodics/[slug]`
  - References at `/references/[slug]` and `/zh/references/[slug]`
- [ ] Test navigation links
- [ ] Test language switching for new content types

**Validation Checklist:**
- [ ] Periodic archive page shows all digests chronologically
- [ ] Reference index page shows all references by category
- [ ] Individual periodic/reference pages render correctly
- [ ] Hugo shortcodes converted to MDX components
- [ ] Navigation updated with new sections
- [ ] Language switching works for periodics/references
- [ ] All migrated content renders without errors
- [ ] All tests pass

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
│  Phase 8    │  ✅ Complete
│ 8A ←──→ 8B  │  (parallel)
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│     Phase 9      │  ✅ Complete
│ 9A: i18n infra   │──→ 9C: UI localization
│ 9B: Content      │──→ 9D: Testing
└──────┬───────────┘
       │  (9A/9B parallel, 9C/9D depend on them)
       ▼
   Phase 10
   (sequential)
       │
       ▼
┌──────────────────────┐
│      Phase 11        │
│ 11A: Types & Infra   │──→ 11D: UI localization
│ 11B: Routes & Comps  │──→ 11E: Testing
│ 11C: Content         │
└──────────────────────┘
  (11A/11B/11C parallel, 11D/11E depend on them)
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

### Phase 6 ✅
- [x] Essay page renders MDX content
- [x] Sidenotes appear in margin (desktop)
- [x] Sidenotes expand inline (mobile)
- [x] References render with [n] format
- [x] Wide blocks break out of column
- [x] 52 Playwright tests pass

### Phase 7 ✅
- [x] Essay list shows all essays
- [x] Filters update URL and list
- [x] Home shows recent essays
- [x] All links work
- [x] Storybook stories for EssayCard, EssayList, EssayFilters
- [x] Blog app builds successfully
- [x] Playwright tests pass (29 new tests for essay index components)
- [x] All 81 blog Playwright tests pass

### Phase 8 ✅
- [x] About page renders all sections (NowSection, Timeline, ResumeSection)
- [x] Mobile menu works (slide-down with backdrop)
- [x] Keyboard navigation works (Tab, Enter, Escape)
- [x] Storybook stories for all components
- [x] Playwright tests pass (29 new tests: 19 About + 10 MobileMenu)
- [x] All 184 Playwright tests pass across all projects

### Phase 9A (Language Infrastructure) ✅
- [x] LanguageProvider and LanguageToggle working
- [x] `/zh/*` routes created and functional
- [x] Language preference persists in localStorage
- [x] Navigation links are language-aware via basePath prop
- [x] UI strings localized (filters, dates, reading time)
- [x] Build passes, Playwright tests pass

### Phase 9 (i18n & Content) ✅
- [x] 9A: LanguageProvider and LanguageToggle working
- [x] 9A: `/zh/*` routes created and functional
- [x] 9A: Language preference persists in localStorage
- [x] 9A: UI strings localized (filters, dates, reading time)
- [x] 9B: Content files migrated from Hugo to MDX (9 essays)
- [x] 9B: All blog posts migrated to MDX with proper frontmatter
- [x] 9B: Content renders correctly in both languages
- [x] 9C: Chinese typography applied (font, line-height 1.9)
- [x] 9C: hreflang SEO tags present
- [x] 9D: Playwright tests for LanguageToggle (6 tests)
- [x] 9D: Unit tests for i18n functions (33 tests)
- [x] 9D: Unit tests for language essay functions (9 tests)
- [x] All 117 vitest tests pass
- [x] No hydration errors

### Phase 10
- [ ] Static export succeeds
- [ ] Site works on GitHub Pages
- [ ] All routes accessible

### Phase 11
- [ ] Periodic and Reference types defined
- [ ] Content loaders implemented (`lib/periodics.ts`, `lib/references.ts`)
- [ ] Routes created (`/periodics/*`, `/references/*`, `/zh/periodics/*`, `/zh/references/*`)
- [ ] Components created (PeriodicCard, PeriodicList, ReferenceCard, ReferenceList)
- [ ] Digest content migrated (23 files)
- [ ] Collection content migrated (6 files)
- [ ] Library content migrated (17 files)
- [ ] Hugo shortcodes converted to MDX
- [ ] Navigation updated
- [ ] UI localized
- [ ] All tests pass

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

1. ~~**Language toggle**: Same page with content switch, or separate URL paths (`/zh/essays/...`)?~~
   - **Resolved**: Separate URL paths with `/zh` prefix for Chinese
2. **Search**: Add in Phase 11 or defer to post-launch?
3. **RSS feed**: Add in Phase 11 or defer?
4. **Interactive diagrams (D3)**: Defer to post-Phase 11?
5. ~~**Digest/Library content**: Migrate in Phase 11 or different content type?~~
   - **Resolved**: Three content types (Essays, Periodics, References). Digest → Periodics, Collection/Library → References. Migration planned for Phase 11.

---

## Success Criteria

1. **Functional**: All pages render, navigation works, theme toggles
2. **Content**: Essays display with sidenotes and references
3. **Performance**: Lighthouse score > 90
4. **Accessibility**: No critical a11y errors
5. **Mobile**: Responsive design works at all breakpoints
6. **Internationalization**: English/Chinese switching works seamlessly
7. **Deployment**: Site live on GitHub Pages
