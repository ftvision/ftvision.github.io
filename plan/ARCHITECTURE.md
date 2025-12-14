# Blog Redesign Architecture

## Overview

Personal blog rebuild from Hugo/PaperMod to Next.js + MDX with a themeable design system monorepo.

---

## Design Principles

1. **Minimal by default** - Start with the smallest viable implementation, extend as needed
2. **Themeable** - Support multiple visual themes (NYT-style, Brutalist, etc.) for experimentation
3. **Layer separation** - Lower layers never import from higher layers
4. **Co-location** - Stories live with components, tests live with code

---

## 5-Layer Design System

```
Layer 5: Pages/Views        → apps/blog/app/
         Route handlers, full pages, layouts

Layer 4: App Components     → apps/blog/components/
         Blog-specific: PostCard, DigestList, PaperNote

Layer 3: Pattern Components → packages/ui/ (complex)
         Reusable patterns: Tabs, Accordion, Modal
         (Uses Radix UI for accessibility)

Layer 2: Primitive Components → packages/ui/ (basic)
         Generic UI: Button, Card, Callout
         (No external dependencies beyond CVA)

Layer 1: Design Tokens      → packages/tokens/
         Primitives → Semantic → Themes
```

**Rule**: Lower layers never import from higher layers.

---

## Token Architecture

### 3-Layer Token Model

```
Primitives (raw values)
    ↓
Semantic (meaning)
    ↓
Themes (variations)
```

**Primitives**: Raw design values (colors, font stacks, spacing scale)
```json
{ "gray-900": "#18181b", "blue-600": "#2563eb" }
```

**Semantic**: Meaning-based tokens that reference primitives
```json
{ "color-text-primary": "{gray-900}", "color-action": "{blue-600}" }
```

**Themes**: Remap semantic tokens for different visual styles
```json
// brutalist theme
{ "color-action": "{red-600}", "font-heading": "{font-mono}" }
```

### Theme × Mode Matrix

Each theme supports light and dark modes independently:

```
              Light    Dark
NYT           ✓        ✓
Brutalist     ✓        ✓
Minimal       ✓        ✓
```

### Token Categories

| Category | Themeable | Notes |
|----------|-----------|-------|
| Color | Yes | Defines personality |
| Typography | Yes | Font family, not sizes |
| Radius | Yes | Sharp vs rounded |
| Border | Yes | Width, style |
| Spacing | No | Shared across themes |
| Motion | No | Shared across themes |

### Directory Structure

```
packages/tokens/
├── src/
│   ├── primitives/           # Raw values (shared)
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   └── radius.json
│   │
│   ├── semantic/             # Default semantic mapping
│   │   └── base.json
│   │
│   ├── themes/               # Theme overrides
│   │   ├── nyt/
│   │   │   ├── light.json
│   │   │   └── dark.json
│   │   ├── brutalist/
│   │   │   ├── light.json
│   │   │   └── dark.json
│   │   └── _template.json    # Copy to create new theme
│   │
│   └── index.ts              # Theme metadata & types
│
├── config.js                 # Style Dictionary config
└── build/
    ├── primitives.css
    ├── semantic.css
    ├── theme-nyt-light.css
    ├── theme-nyt-dark.css
    └── ...
```

### CSS Custom Properties Naming

```css
--{category}-{property}-{variant}-{state}

/* Examples */
--color-bg-primary
--color-text-primary
--color-text-muted
--color-action-primary
--color-action-primary-hover
--font-family-heading
--font-family-body
--radius-default
--border-width-default
```

---

## UI Package Architecture

### Structure (Nested + Co-located)

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   ├── Card.stories.tsx
│   │   │   └── index.ts
│   │   └── Callout/
│   │       ├── Callout.tsx
│   │       ├── Callout.stories.tsx
│   │       └── index.ts
│   │
│   ├── lib/
│   │   └── utils.ts          # cn() utility
│   │
│   └── index.tsx             # Public exports
│
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

### MVP Components

**Layer 2 (Primitives):**
- `Button` - Actions, theme toggle, copy code
- `Card` - Content containers

**Layer 3 (Patterns):**
- `Callout` - Info/warning/danger boxes

### Component Implementation

- **CVA (class-variance-authority)** for variant management
- **Tailwind CSS** with semantic token classes
- **forwardRef** for all components
- **Full TypeScript** types

Example pattern:
```tsx
// Button uses semantic tokens via Tailwind
<button className="bg-action text-action-contrast rounded-default">
```

### Future Components (Add As Needed)

Layer 2: Badge, Input, Prose
Layer 3: Tabs, Accordion, Modal (use Radix UI)

---

## Storybook Architecture

### Co-located Stories

Stories live alongside components in `packages/ui/`:
```
packages/ui/src/components/Button/
├── Button.tsx
└── Button.stories.tsx    # Co-located
```

### Aggregator App

`apps/docs/` aggregates stories from all packages:
```
apps/docs/
├── .storybook/
│   └── main.ts           # Points to packages/ui/**/*.stories.tsx
├── stories/
│   └── README.md         # How to add stories
└── package.json
```

### Configuration

```ts
// apps/docs/.storybook/main.ts
export default {
  stories: [
    '../../packages/ui/src/**/*.stories.tsx',
    // Future: '../../apps/blog/components/**/*.stories.tsx'
  ],
  // ...
}
```

---

## Blog App Architecture

### Directory Structure

```
apps/blog/
├── app/
│   ├── layout.tsx
│   ├── globals.css           # Import tokens, Tailwind
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── ...
│
├── components/
│   ├── PostCard.tsx          # Layer 4 - uses Card, Badge
│   ├── PostList.tsx
│   ├── ThemeToggle.tsx
│   └── mdx/                   # MDX-specific components
│       ├── index.ts
│       └── README.md
│
├── lib/
│   ├── mdx.ts
│   ├── content.ts
│   └── i18n.ts
│
├── content/                   # MDX files
├── mdx-components.tsx
├── next.config.js
└── tailwind.config.js
```

### Theme Integration

```tsx
// apps/blog/app/layout.tsx
import '@blog/tokens/build/primitives.css'
import '@blog/tokens/build/semantic.css'
import '@blog/tokens/build/theme-nyt-light.css'
import '@blog/tokens/build/theme-nyt-dark.css'
// Additional themes loaded as needed

export default function RootLayout({ children }) {
  return (
    <html data-theme="nyt" data-mode="light">
      <body>{children}</body>
    </html>
  )
}
```

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Variant management | CVA | Clean API for Button variants, ~2KB |
| Accessibility | Radix UI (future) | For Tabs/Modal/Accordion only |
| Dark mode | next-themes | Handles SSR flash, ~1KB |
| Token generation | Style Dictionary | Already in stack, multi-format output |
| Stories | Co-located | Easier maintenance, industry standard |
| Folder structure | Nested | Scales better, supports sub-components |

### What We're NOT Using (Yet)

- Radix UI for primitives (Button, Card don't need it)
- Extensive component library (add as needed)
- Component-level tokens (use semantic tokens directly)

---

## Implementation Phases

### Phase 1: Foundation ✓
- [x] Monorepo setup (Turborepo + pnpm)
- [x] packages/config (TypeScript configs)
- [x] packages/tokens (basic tokens)

### Phase 2: Token Architecture
- [ ] Restructure tokens: primitives → semantic → themes
- [ ] Create NYT theme (light/dark)
- [ ] Update Style Dictionary config for multi-theme

### Phase 3: UI Package
- [ ] packages/ui scaffold
- [ ] Button component (CVA)
- [ ] Card component
- [ ] Callout component
- [ ] Storybook setup (apps/docs)

### Phase 4: Blog App Skeleton
- [ ] Next.js app with App Router
- [ ] Theme integration (next-themes)
- [ ] Basic layout with theme switching

### Phase 5+: Content & Features
- [ ] MDX configuration
- [ ] Content migration
- [ ] Additional components as needed

---

## References

- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [CVA](https://cva.style/docs)
- [Radix UI](https://www.radix-ui.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
