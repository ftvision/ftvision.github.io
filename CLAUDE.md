# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Repository Overview

This is a monorepo for a personal blog with a 5-layer design system architecture.

```
repo-root/
├── apps/
│   ├── blog/          # Next.js blog application
│   └── storybook/     # Component documentation
├── packages/
│   ├── tokens/        # Design tokens (Layer 1)
│   ├── ui/            # UI components (Layer 2-3)
│   └── config/        # Shared Tailwind config
└── plan/              # Architecture documentation
```

## Common Commands

```bash
# Install dependencies
pnpm install

# Build tokens (required after token changes)
pnpm --filter @blog/tokens build

# Run blog dev server
pnpm --filter @blog/blog dev

# Run Storybook
pnpm --filter @blog/storybook dev

# Run tests
npx playwright test
npx playwright test --project=blog
npx playwright test --project=foundations
```

## Blog Development

### Quick Reference

| Task | Location | Import From |
|------|----------|-------------|
| Use basic UI | - | `import { Button, Card } from '@blog/ui'` |
| Use blog components | `apps/blog/components/` | `import { EssayCard } from '@/components/essay'` |
| Add translations | `apps/blog/lib/i18n/locales/` | `en.json`, `zh.json` |
| Add content | `apps/blog/content/` | `essays/`, `periodics/`, `references/` |

### Typography Classes

**Always use `type-*` for headings** (includes size, weight, line-height, font-family):

```tsx
<h1 className="type-display text-figure-primary">Hero</h1>
<h2 className="type-h2 text-figure-primary">Section</h2>
<p className="type-body text-figure-primary">Body</p>
```

**Color utilities:**

```tsx
// Backgrounds
bg-ground-primary    // Main background
bg-ground-secondary  // Card backgrounds

// Text
text-figure-primary    // Main text
text-figure-secondary  // Supporting text
text-figure-muted      // De-emphasized
```

### Creating New Pages

1. Create page component in `apps/blog/components/pages/`
2. Create route in `apps/blog/app/`
3. Add i18n route in `apps/blog/app/zh/` if needed

### Creating New Components

1. Check if component exists in `@blog/ui` first
2. Create in `apps/blog/components/{feature}/`
3. Add Storybook story with `ThemeProvider` and `LanguageProvider` decorators

### Documentation

- [Developer Guide](./plan/docs/DEVELOPER_GUIDE.md) - Building pages and features
- [Design System](./plan/docs/DESIGN_SYSTEM.md) - Architecture overview

---

## Blog Design System

### 5-Layer Architecture

```
Layer 5: Pages          apps/blog/app/
Layer 4: App Components apps/blog/components/
Layer 3: Patterns       packages/ui/ (Modal, Tabs, Accordion)
Layer 2: Primitives     packages/ui/ (Button, Card, Badge)
Layer 1: Tokens         packages/tokens/
```

**Rule:** Dependencies flow DOWN only. Never import from a higher layer.

### Token Flow

```
Primitives → Semantic → Themes → CSS Variables
```

Example:
```
primitive.font.weight.bold (700)
    ↓
font.weight.display → "{primitive.font.weight.bold}"
    ↓
--font-weight-display: 700
    ↓
.type-display { font-weight: var(--font-weight-display) }
```

### Key Files

| Purpose | Location |
|---------|----------|
| Primitive tokens | `packages/tokens/src/primitives/` |
| Semantic tokens | `packages/tokens/src/semantic/` |
| Theme overrides | `packages/tokens/src/themes/{theme}/` |
| Tailwind utilities | `packages/config/tailwind.config.js` |
| UI components | `packages/ui/src/components/` |

### Adding Tokens

1. Add to `packages/tokens/src/primitives/{file}.json`
2. Add semantic alias in `packages/tokens/src/semantic/{file}.json`
3. Run `pnpm --filter @blog/tokens build`

### Adding Components to @blog/ui

1. Create `packages/ui/src/components/{Name}/{Name}.tsx`
2. Create story file
3. Export from `packages/ui/src/index.tsx`

### Documentation

- [Architect Guide](./plan/docs/ARCHITECT_GUIDE.md) - Modifying the design system
- [Design System](./plan/docs/DESIGN_SYSTEM.md) - Full architecture

---

## Testing

### Playwright Test Structure

```
tests/
├── foundations/       # Token verification
│   ├── motion.spec.ts
│   └── spacing.spec.ts
├── blog/              # Blog component tests
│   ├── content-components.spec.ts
│   ├── essay-components.spec.ts
│   └── layout-components.spec.ts
└── themes/
    └── nyt/
        └── typography.spec.ts
```

### Running Tests

```bash
# All tests
npx playwright test

# By project
npx playwright test --project=blog
npx playwright test --project=foundations
npx playwright test --project=themes-nyt

# Single file
npx playwright test tests/blog/essay-components.spec.ts
```

### Test Requirements

- Tests run against Storybook at `http://localhost:6006`
- Start Storybook before running tests: `pnpm --filter @blog/storybook dev`
- Stories need `ThemeProvider` and `LanguageProvider` decorators

---

## i18n

### Supported Languages

- `en` - English (default)
- `zh` - Chinese

### URL Structure

```
/           → English home
/zh/        → Chinese home
/essays/    → English essays
/zh/essays/ → Chinese essays
```

### Translation Files

- `apps/blog/lib/i18n/locales/en.json`
- `apps/blog/lib/i18n/locales/zh.json`

### Using Translations

```tsx
import { useLanguage } from '@/lib/i18n';

function Component() {
  const { t, formatDate } = useLanguage();
  return <h1>{t('page.title')}</h1>;
}
```

---

## Themes

### Available Themes

- `nyt` - New York Times (serif, classic editorial)
- `chinese-aesthetic` - Traditional Chinese design
- `brutalism` - Bold, geometric, high contrast

### Theme Switching

Themes are applied via `data-theme` and `data-mode` attributes on `<html>`.

```html
<html data-theme="nyt" data-mode="light">
```

### Theme Files

Each theme has light and dark mode:
- `packages/tokens/src/themes/{theme}/light.json`
- `packages/tokens/src/themes/{theme}/dark.json`
