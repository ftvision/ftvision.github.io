# Blog Redesign Architecture

## Overview

Personal blog rebuild from Hugo/PaperMod to Next.js + MDX with a themeable design system monorepo.

**Design Aesthetic**: Synthesis of Gwern.net (sidenotes, dense information), Maggie Appleton (warmth, illustrations), and NYT (typography excellence).

---

## Design Principles

1. **Minimal by default** - Start with the smallest viable implementation, extend as needed
2. **Themeable** - Support multiple visual themes (NYT-style, Brutalist, etc.) for experimentation
3. **Layer separation** - Lower layers never import from higher layers
4. **Co-location** - Stories live with components, tests live with code

---

## Content Model

### Three Content Types

The blog has three distinct content types, each serving a different purpose:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT ARCHITECTURE                         │
├─────────────────┬─────────────────┬─────────────────────────────┤
│     Essays      │    Periodics    │       References            │
│   (original)    │   (recurring)   │      (evergreen)            │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ Long-form       │ Time-indexed    │ Curated resource            │
│ original        │ content series  │ compilations                │
│ writing         │ (digests, logs) │ (bibliographies, lists)     │
├─────────────────┼─────────────────┼─────────────────────────────┤
│ /essays/*       │ /periodics/*    │ /references/*               │
│ Point-in-time   │ Sequential      │ Living documents            │
│ publishing      │ issues          │ (updated over time)         │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

| Content Type | Purpose | Update Pattern | Examples |
|--------------|---------|----------------|----------|
| **Essays** | Original long-form writing | Published once, rarely updated | Blog posts, opinion pieces, guides |
| **Periodics** | Time-indexed recurring content | Sequential issues over time | Reading digests, changelogs, weekly notes |
| **References** | Curated evergreen resources | Living documents, updated as needed | Paper lists, tool collections, reading lists |

---

### Essays (Original Writing)

Essays are categorized by **type** (how it's written) and **topics** (what it's about).

**Type** (mutually exclusive - pick one):

| Type | Description | Reader Expectation |
|------|-------------|-------------------|
| `guide` | How X works, teaching | "I'll understand this topic" |
| `deep-dive` | Why X happened, detailed analysis | "I'll see the deeper picture" |
| `opinion` | What I think about X, takes | "I'll hear a perspective" |
| `review` | Evaluating X (tools, books, papers) | "I'll know if X is worth it" |
| `narrative` | What happened, storytelling | "I'll experience something" |

**Topics** (can have multiple):

| Topic | Covers |
|-------|--------|
| `technical` | Engineering, systems, code, how things are built |
| `ai` | ML, AI products, models, the AI landscape |
| `product` | Product thinking, market, startup, business |
| `career` | Work, jobs, companies, professional life |

**Frontmatter:**
```yaml
---
title: "10000行代码后对软件工程的思考"
description: "A reflection on software engineering..."
date: 2024-01-15
type: narrative
topics: [technical, career]
lang: zh
translationOf: 10k-code-en  # Links to English version (optional)
---
```

---

### Periodics (Recurring Content)

Periodics are time-indexed content series, typically reading digests or logs.

**Type** (mutually exclusive):

| Type | Description | Example |
|------|-------------|---------|
| `digest` | Curated links with commentary | Weekly reading roundups |
| `changelog` | Project/life updates | Monthly updates |
| `notes` | Shorter observations | Weekly notes |

**Frontmatter:**
```yaml
---
title: "Digest #022"
description: "Articles on AI, neuroscience, and tools"
date: 2024-12-15
issue: 22
type: digest
topics: [technical, ai]
lang: zh
---
```

**Display:** Chronological archive view, newest first.

---

### References (Evergreen Resources)

References are curated resource pages that serve as authoritative lists or bibliographies.

**Category** (mutually exclusive):

| Category | Description | Example |
|----------|-------------|---------|
| `resources` | General resource compilation | System design interview prep |
| `bibliography` | Academic paper lists | 100 vision research papers |
| `reading-list` | Curated article/book lists | Psychology writing collection |
| `tools` | Tool/software collections | Developer productivity tools |

**Frontmatter:**
```yaml
---
title: "100 Vision Research Papers"
description: "Curated list of influential papers in vision science"
date: 2024-01-01
updated: 2024-12-15  # Living document - tracks updates
category: bibliography
topics: [research, technical]
lang: en
itemCount: 100  # Optional metadata
---
```

**Display:** Category-based browsing, shows last updated date.

---

### Extended Topics

To support Periodics and References, the topics taxonomy is extended:

| Topic | Covers |
|-------|--------|
| `technical` | Engineering, systems, code, how things are built |
| `ai` | ML, AI products, models, the AI landscape |
| `product` | Product thinking, market, startup, business |
| `career` | Work, jobs, companies, professional life |
| `research` | Academic papers, science, neuroscience |
| `design` | UX, visual design, information design |
| `learning` | Educational resources, courses, tutorials |

---

### URL Structure

**English (default):**
```
/                      → English home
/essays                → Essay index
/essays/[slug]         → Essay page
/periodics             → Periodics archive
/periodics/[slug]      → Periodic entry (e.g., digest-022)
/references            → References index
/references/[slug]     → Reference page
/about                 → About page
```

**Chinese (`/zh` prefix):**
```
/zh                    → Chinese home
/zh/essays             → Chinese essay index
/zh/essays/[slug]      → Chinese essay
/zh/periodics          → Chinese periodics archive
/zh/periodics/[slug]   → Chinese periodic entry
/zh/references         → Chinese references index
/zh/references/[slug]  → Chinese reference page
/zh/about              → Chinese about page
```

**Language Behavior:**
- Default is English (no prefix)
- Chinese uses `/zh` prefix for all routes
- Language preference stored in localStorage
- When user selects language, all navigation uses that language's routes
- Content lists show all items with language badges (preferred language sorted first)
- Language switcher navigates to translation if exists, otherwise to language's index

---

### Content File Organization

```
content/
├── essays/
│   ├── 10k-code-zh.mdx
│   ├── job-search-reflection.mdx
│   └── ...
├── periodics/
│   ├── digest-001-zh.mdx
│   ├── digest-022-zh.mdx
│   └── ...
└── references/
    ├── vision-100-papers-zh.mdx
    ├── system-design-interview.mdx
    └── ...
```

**Naming Convention:**
- Use `-zh` suffix for Chinese content (e.g., `10k-code-zh.mdx`)
- No suffix needed for English content (e.g., `job-search-reflection.mdx`)
- The `lang` field in frontmatter is authoritative for language detection
- Slug is the filename without `.mdx`

---

## 5-Layer Design System

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 5: PAGES (apps/blog/app/)                                 │
│ Route handlers, data fetching, page composition                 │
├─────────────────────────────────────────────────────────────────┤
│ Layer 4: APP COMPONENTS (apps/blog/components/)                 │
│ Blog-specific components with domain knowledge                  │
├─────────────────────────────────────────────────────────────────┤
│ Layer 3: PATTERNS (packages/ui/) ✓ EXISTS                       │
│ Modal, Tabs, Accordion, Dropdown, Tooltip, Toast                │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2: PRIMITIVES (packages/ui/) ✓ EXISTS                     │
│ Button, Card, Badge, Figure, CodeBlock, Callout, Blockquote     │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1: TOKENS (packages/tokens/) ✓ EXISTS                     │
│ Colors, Typography, Spacing, Motion, Themes (NYT light/dark)    │
└─────────────────────────────────────────────────────────────────┘
```

**Rule**: Lower layers never import from higher layers.

---

## Token Architecture

### 3-Layer Token Model

```
Primitives (raw values)  →  Semantic (meaning)  →  Themes (variations)
```

- **Primitives**: Raw design values (colors, font stacks, spacing scale)
- **Semantic**: Meaning-based tokens that reference primitives
- **Themes**: Remap semantic tokens for different visual styles

### Tailwind Color Naming: Ground & Figure

| Category | Purpose | Example classes |
|----------|---------|-----------------|
| `ground` | Background/surface colors | `bg-ground-primary`, `bg-ground-inverse` |
| `figure` | Text/foreground colors | `text-figure-primary`, `text-figure-muted` |
| `border` | Border colors | `border-border`, `border-border-strong` |
| `action` | Interactive element colors | `bg-action-primary`, `hover:bg-action-primary-hover` |
| `status` | Semantic status colors | `bg-status-info-bg`, `text-status-danger` |

---

## Layer 4: App Components

### Layout Components

| Component | Purpose |
|-----------|---------|
| `SiteHeader` | Logo, navigation, theme/lang toggles |
| `SiteFooter` | Links, copyright |
| `SiteNav` | Navigation links |
| `ThemeToggle` | Light/dark mode switch |
| `LanguageToggle` | en/zh dropdown with globe icon |
| `LanguageProvider` | Language context + localStorage persistence |
| `MobileMenu` | Responsive navigation |

### Essay Components

| Component | Purpose |
|-----------|---------|
| `EssayCard` | Preview card in list view |
| `EssayList` | Grid/list of essays |
| `EssayHeader` | Title, type badge, topics, date, reading time |
| `EssayFilters` | Filter UI for type/topic |
| `EssayLayout` | Wide container with sidenote margins |

### Content Components (MDX)

| Component | Purpose |
|-----------|---------|
| `Note` | Numbered sidenotes (desktop: margin, mobile: expandable) |
| `Marginnote` | Unnumbered margin annotations |
| `Reference` | Citation with [n] format, links to References section |
| `References` | Auto-generated references section from citations |
| `WideBlock` | Content that breaks out of main column |

### About Components

| Component | Purpose |
|-----------|---------|
| `NowSection` | What I'm doing currently |
| `Timeline` | Career/education timeline |
| `ResumeSection` | Collapsible CV details |

---

## Notes vs References

| Component | Purpose | Display |
|-----------|---------|---------|
| `<Note>` | Explanatory sidenotes, tangential thoughts | Superscript ¹, content in margin |
| `<Reference>` | Academic citations | [n] inline, full citation in References section |

### Note Behavior

- **Desktop (≥1024px)**: Notes appear in right margin, aligned with reference point
- **Mobile (<1024px)**: Notes collapse to expandable inline elements

---

## Essay Page Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo]              Essays   About              [Theme] [Lang]     │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│           GUIDE · AI, TECHNICAL                                    │
│                                                                    │
│           How Transformers Work                                    │
│           December 14, 2024 · 15 min read                          │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  The transformer architecture              ¹ This refers to        │
│  changed everything.¹                      the seminal paper       │
│                                            by Vaswani et al.       │
│  Recent work [1] has shown...                                      │
│                                            ² Side note about       │
│  This is important because...²             implementation...       │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │     [Wide diagram/figure breaks out of main column]         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  ## References                                                     │
│  [1] Vaswani, A., et al. (2017)                                    │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│                         [Footer]                                   │
└────────────────────────────────────────────────────────────────────┘
```

**Layout approach (Tufte CSS-inspired):**
- Content has `max-w-prose` (65ch) for readability
- Container has `pr-[340px]` right padding to create margin space
- Sidenotes use `float: right` + `mr-[-320px]` negative margin to flow into the padding
- Mobile: Single column, sidenotes collapse inline and expand on tap

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Variant management | CVA | Clean API for variants, ~2KB |
| Accessibility | Radix UI | For Tabs/Modal/Accordion |
| Dark mode | data-mode attribute | Works with existing token system |
| Token generation | Style Dictionary | Multi-format output |
| MDX processing | next-mdx-remote | Proven solution |
| i18n routing | Manual subdirectory | Works with static export, no i18n library needed |
| Language persistence | localStorage | Simple, no server needed |

---

## Internationalization (i18n) Architecture

### Design Decisions

1. **Subdirectory routing** (`/zh/*`) instead of subdomain or parameters
   - Better SEO (accumulates domain authority)
   - Works with static export
   - Clear URL structure for users

2. **No i18n library** - manual implementation
   - Next.js i18n doesn't work with `output: 'export'`
   - Simple enough to implement manually
   - Full control over behavior

3. **File-based language detection** with frontmatter override
   - Filename suffix: `essay.zh.mdx` indicates Chinese
   - Frontmatter `lang` field is authoritative
   - `translationOf` field links translations

### Language Context

```typescript
interface LanguageContextValue {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
  t: (key: string) => string;  // Simple translation function
}
```

### UI Localization

Translation data is separated from code for maintainability:

```
lib/i18n/
├── locales/
│   ├── en.json         # English strings (data)
│   └── zh.json         # Chinese strings (data)
├── translations.ts     # Utility functions (code)
├── language.ts         # Language utilities
├── context.tsx         # LanguageProvider
└── index.ts            # Re-exports
```

**Locale files** (`locales/*.json`):
```json
{
  "nav.essays": "Essays",
  "nav.about": "About",
  "essay.readingTime": "{minutes} min read",
  "filter.all": "All"
}
```

**Benefits of JSON separation:**
- Easy to edit without touching code
- Can be sent to translators
- Tooling support (Crowdin, Lokalise)
- Clear separation of data and logic

**Utility functions** (`translations.ts`):
- `translate(lang, key, params?)` - Get translated string with interpolation
- `getTypeLabel(lang, type)` - Localized essay type
- `getTopicLabel(lang, topic)` - Localized topic
- `formatDate(lang, dateString)` - Locale-aware date formatting
- `formatReadingTime(lang, minutes)` - Reading time display
- `formatResultsCount(lang, count)` - Pluralized results count

### Chinese Typography

Chinese content uses adjusted typography:
- Font: `"Noto Serif SC", "Source Han Serif CN", serif`
- Line height: 1.8-2.0 (vs 1.6 for English)
- Paragraph spacing adjusted for Chinese reading flow

---

## Implementation Status

### Completed
- [x] Phase 1: Monorepo Foundation
- [x] Phase 2: Token Architecture
- [x] Phase 3: UI Package (22+ components)
- [x] Phase 4: Blog App Foundation
- [x] Phase 5A: Site Layout Components (SiteHeader, SiteFooter, SiteNav)
- [x] Phase 5B: Theme System (ThemeProvider, ThemeToggle, lib/theme.ts)
- [x] Storybook integration for blog components (with Playwright tests)
- [x] Phase 6A: Essay Page & Layout (EssayLayout, EssayHeader, essay page route)
- [x] Phase 6B: Content Components (Note, Marginnote, Reference, WideBlock)
- [x] Phase 7A: Essay List & Filters (EssayCard, EssayList, EssayFilters, /essays page)
- [x] Phase 7B: Home Page (Recent essays section)
- [x] Phase 8A: About Page (NowSection, Timeline, ResumeSection)
- [x] Phase 8B: Mobile Navigation & Accessibility (MobileMenu, responsive SiteHeader)
- [x] Phase 9A: Language Infrastructure (LanguageProvider, LanguageToggle, /zh routes)
- [x] Phase 9B: Content Migration (9 essays migrated from Hugo to MDX)
- [x] Phase 9C: UI Localization & Polish (Chinese typography, hreflang tags)
- [x] Phase 9D: Testing & Validation (117 vitest tests, 6 Playwright tests for i18n)

### Current
- [ ] Phase 10: Deployment

### Future
- [ ] Phase 11: Periodics & References (migrate digest/, collection/, library/)

---

## Related Documents

- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Phase-by-phase tasks with parallel workstreams
- [BLOG_APP_STRUCTURE.md](./BLOG_APP_STRUCTURE.md) - Detailed file structure, types, and code patterns
- [MDX_COMPONENTS.md](./MDX_COMPONENTS.md) - MDX component specifications

---

## References

- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [CVA](https://cva.style/docs)
- [Radix UI](https://www.radix-ui.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [Tufte CSS](https://edwardtufte.github.io/tufte-css/) (sidenote inspiration)
