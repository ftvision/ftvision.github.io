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

### Essay Taxonomy (Two-Axis System)

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

**Languages**: `en` (default), `zh`

### URL Structure

```
/                     → Home
/essays               → Essay index (filterable by type/topic)
/essays/[slug]        → Individual essay
/about                → About page
```

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
| `LanguageToggle` | en/zh switch |
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
├──────────┬─────────────────────────────────┬───────────────────────┤
│          │                                 │                       │
│          │  The transformer architecture   │  ¹ This refers to    │
│  (empty) │  changed everything.¹           │  the seminal paper   │
│          │                                 │  by Vaswani et al.   │
│          │  Recent work [1] has shown...   │                       │
│          │                                 │  ² Side note about   │
│          │  This is important because...²  │  implementation...   │
│          │                                 │                       │
│          │  ┌─────────────────────────────────────────────────┐   │
│          │  │     [Wide diagram/figure breaks out]            │   │
│          │  └─────────────────────────────────────────────────┘   │
│          │                                 │                       │
│          │  ## References                  │                       │
│          │  [1] Vaswani, A., et al. (2017) │                       │
│          │                                 │                       │
├──────────┴─────────────────────────────────┴───────────────────────┤
│                         [Footer]                                   │
└────────────────────────────────────────────────────────────────────┘
```

**Grid**: `[1fr] [min(65ch, 100%)] [300px]` on desktop
**Mobile**: Single column, full width

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Variant management | CVA | Clean API for variants, ~2KB |
| Accessibility | Radix UI | For Tabs/Modal/Accordion |
| Dark mode | data-mode attribute | Works with existing token system |
| Token generation | Style Dictionary | Multi-format output |
| MDX processing | next-mdx-remote | Proven solution |

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

### Current
- [ ] Phase 6: Essay Core

### Future
- [ ] Phase 7: Essay Index & Home
- [ ] Phase 8: About & Polish
- [ ] Phase 9: Content Migration
- [ ] Phase 10: Deployment

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
