# Design System Architecture

This document explains the 5-layer design system architecture used in the blog application.

## Quick Reference

| Layer | Location | Purpose | Who Modifies |
|-------|----------|---------|--------------|
| 1. Tokens | `packages/tokens/` | Design primitives (colors, typography, spacing) | Design System Architects |
| 2. Primitives | `packages/ui/src/components/` | Basic UI components (Button, Card, Badge) | Design System Architects |
| 3. Patterns | `packages/ui/src/components/` | Composite components (Modal, Tabs, Accordion) | Design System Architects |
| 4. App Components | `apps/blog/components/` | Blog-specific components (EssayHeader, Note) | App Developers |
| 5. Pages | `apps/blog/app/` | Route pages that compose components | App Developers |

## Layer 1: Design Tokens

**Location:** `packages/tokens/`

Design tokens are the atomic values that define the visual language. They are built using [Style Dictionary](https://amzn.github.io/style-dictionary/).

### Structure

```
packages/tokens/
├── src/
│   ├── primitives/           # Raw values
│   │   ├── colors.json       # Color palette
│   │   ├── typography.json   # Font sizes, weights, line-heights
│   │   ├── spacing.json      # Spacing scale
│   │   ├── motion.json       # Animation timing & easing
│   │   └── radius.json       # Border radius values
│   │
│   ├── semantic/             # Meaningful aliases
│   │   ├── base.json         # Default semantic tokens
│   │   ├── typography.json   # Typography scale (display, h1, body, etc.)
│   │   ├── spacing.json      # Layout spacing
│   │   └── motion.json       # Animation presets
│   │
│   └── themes/               # Theme overrides
│       ├── nyt/              # New York Times theme
│       │   ├── light.json
│       │   └── dark.json
│       ├── chinese-aesthetic/
│       │   ├── light.json
│       │   └── dark.json
│       └── brutalism/
│           ├── light.json
│           └── dark.json
│
└── build/                    # Generated output
    ├── css/
    │   ├── primitives.css
    │   ├── semantic.css
    │   ├── theme-nyt-light.css
    │   └── ...
    └── js/
        └── tokens.js
```

### Token Naming Convention

Tokens follow a hierarchical naming pattern:

```
--{category}-{property}-{variant}

Examples:
--color-text-primary      # Primary text color
--font-size-display       # Display font size
--spacing-lg              # Large spacing
--motion-duration-fast    # Fast animation duration
```

### How Tokens Flow

```
Primitives (raw values)
    ↓ referenced by
Semantic (meaningful names)
    ↓ overridden by
Themes (theme-specific values)
    ↓ compiled to
CSS Variables (runtime)
```

**Example Flow:**

```json
// primitives/typography.json
"font": {
  "weight": {
    "bold": { "value": "700" }
  }
}

// semantic/typography.json
"font": {
  "weight": {
    "display": { "value": "{primitive.font.weight.bold}" }
  }
}

// Output: --font-weight-display: 700
```

---

## Layer 2: Primitive Components

**Location:** `packages/ui/src/components/`

Primitive components are the basic building blocks. They consume tokens via CSS variables and Tailwind utilities.

### Available Primitives

| Component | Purpose | Token Usage |
|-----------|---------|-------------|
| `Button` | Interactive actions | `--color-action-*`, `--font-*` |
| `Card` | Content containers | `--color-bg-*`, `--radius-*` |
| `Badge` | Labels and tags | `--color-*`, `--font-size-label` |
| `Input` | Form text input | `--color-border-*`, `--color-bg-*` |
| `Checkbox` | Boolean input | `--color-action-*` |
| `Blockquote` | Editorial quotes | `--color-surface-quote` |
| `CodeBlock` | Code display | `--color-surface-code`, `--font-family-code` |
| `Figure` | Images with captions | `--font-size-caption` |
| `Callout` | Highlighted information | `--color-status-*` |

### Import Pattern

```tsx
import { Button, Card, Badge } from '@blog/ui';
```

### Component Structure

Each primitive follows this structure:

```
ComponentName/
├── ComponentName.tsx      # Implementation
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts              # Export
```

---

## Layer 3: Pattern Components

**Location:** `packages/ui/src/components/`

Patterns are composite components that combine primitives with interaction logic.

### Available Patterns

| Component | Purpose | Composition |
|-----------|---------|-------------|
| `Modal` | Dialogs and overlays | Trigger + Content + Portal |
| `Tabs` | Tabbed content | TabsList + TabsTrigger + TabsContent |
| `Accordion` | Collapsible sections | AccordionItem + Trigger + Content |
| `Dropdown` | Menus and selects | Trigger + Menu + Items |
| `Tooltip` | Contextual hints | Trigger + Content |
| `Toast` | Notifications | ToastContainer + Toast |

### Compound Component Pattern

Patterns use the compound component pattern for flexibility:

```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader } from '@blog/ui';

<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    {/* Content */}
  </ModalContent>
</Modal>
```

---

## Layer 4: App Components

**Location:** `apps/blog/components/`

App components are specific to the blog application. They compose Layer 2-3 components with domain logic.

### Directory Structure

```
apps/blog/components/
├── layout/           # Site structure
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   ├── ThemeProvider.tsx
│   ├── ModeToggle.tsx
│   └── LanguageToggle.tsx
│
├── content/          # Editorial components
│   ├── Note.tsx          # Tufte-style sidenotes
│   ├── Marginnote.tsx    # Margin annotations
│   ├── Reference.tsx     # Citation links
│   ├── References.tsx    # Bibliography section
│   └── WideBlock.tsx     # Full-width content
│
├── essay/            # Essay display
│   ├── EssayHeader.tsx   # Title, meta, badges
│   ├── EssayLayout.tsx   # Content wrapper
│   ├── EssayCard.tsx     # List item card
│   ├── EssayList.tsx     # Essay listing
│   └── EssayFilters.tsx  # Topic/type filters
│
├── periodic/         # Periodic content
│   ├── PeriodicHeader.tsx
│   ├── PeriodicCard.tsx
│   └── PeriodicList.tsx
│
├── reference/        # Reference content
│   ├── ReferenceHeader.tsx
│   ├── ReferenceCard.tsx
│   └── ReferenceList.tsx
│
├── about/            # About page
│   ├── Timeline.tsx
│   ├── ResumeSection.tsx
│   └── FailuresSection.tsx
│
├── mdx/              # MDX integration
│   └── MDXComponents.tsx
│
└── pages/            # Page-level components
    ├── HomePage.tsx
    ├── AboutPage.tsx
    ├── EssaysIndexPage.tsx
    ├── PeriodicsIndexPage.tsx
    └── ReferencesIndexPage.tsx
```

### Import Pattern

```tsx
// From @blog/ui (Layer 2-3)
import { Button, Card, Badge, Accordion } from '@blog/ui';

// Local utilities
import { cn } from '@/lib/utils';
```

---

## Layer 5: Pages

**Location:** `apps/blog/app/`

Pages are Next.js route handlers that compose Layer 4 components. Pages should contain minimal logic - they primarily:

1. Fetch data
2. Set metadata
3. Compose page components

### Structure

```
apps/blog/app/
├── layout.tsx          # Root layout (imports tokens CSS)
├── page.tsx            # Home page
├── essays/
│   ├── page.tsx        # Essays index
│   └── [slug]/
│       └── page.tsx    # Essay detail
├── periodics/
│   └── ...
├── references/
│   └── ...
├── about/
│   └── page.tsx
└── zh/                 # Chinese localized routes
    └── ...
```

### Page Pattern

```tsx
// apps/blog/app/essays/page.tsx
import { EssaysIndexPage } from '@/components/pages';

export default function EssaysPage() {
  return <EssaysIndexPage language="en" />;
}
```

---

## Tailwind Integration

The design system integrates with Tailwind CSS through the shared config.

**Location:** `packages/config/tailwind.config.js`

### Typography Utilities

Three utility patterns are available:

| Pattern | Example | Provides |
|---------|---------|----------|
| `type-*` | `type-display` | Complete typography (size, weight, line-height, letter-spacing, font-family) |
| `text-*` | `text-display` | Size + line-height + letter-spacing only |
| `font-*` | `font-display` | Font weight only |

**Recommendation:** Use `type-*` for headings and display text. Use `text-*` when you need custom weight or family.

### Color Utilities

Colors use a ground/figure naming convention:

```tsx
// Ground = backgrounds (what things sit ON)
bg-ground-primary      // Main background
bg-ground-secondary    // Secondary/card backgrounds

// Figure = foregrounds (what you SEE)
text-figure-primary    // Main text
text-figure-secondary  // Supporting text
text-figure-muted      // De-emphasized text
```

---

## Theme System

The blog supports multiple themes via CSS custom properties and `data-theme`/`data-mode` attributes.

### Available Themes

| Theme | Description |
|-------|-------------|
| `nyt` | New York Times inspired - serif typography, classic editorial |
| `chinese-aesthetic` | Traditional Chinese design - brush strokes, seasonal colors |
| `brutalism` | Bold, raw design - geometric, high contrast |

### How Theming Works

```html
<!-- Root element -->
<html data-theme="nyt" data-mode="light">
```

CSS selectors apply theme-specific tokens:

```css
[data-theme="nyt"][data-mode="light"] {
  --font-family-heading: Georgia, 'Times New Roman', serif;
  --font-family-body: Georgia, 'Times New Roman', serif;
  --color-text-primary: #121212;
  /* ... */
}
```

### Theme Switching

Use the `ThemeProvider` and toggle components:

```tsx
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ThemeSelector } from '@/components/layout/ThemeSelector';
import { ModeToggle } from '@/components/layout/ModeToggle';
```

---

## Related Documentation

- [Developer Guide](./DEVELOPER_GUIDE.md) - For app developers building pages and features
- [Architect Guide](./ARCHITECT_GUIDE.md) - For design system maintainers
- [MDX Components](../MDX_COMPONENTS.md) - Available components for content authors
