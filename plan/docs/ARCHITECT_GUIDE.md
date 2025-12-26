# Architect Guide

This guide is for **design system architects** who maintain and extend the foundational layers (1-3) of the design system.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ Layer 5: Pages (apps/blog/app/)                                 │
│   Route handlers, metadata, data fetching                       │
├─────────────────────────────────────────────────────────────────┤
│ Layer 4: App Components (apps/blog/components/)                 │
│   Blog-specific: EssayHeader, Note, Filters                     │
├─────────────────────────────────────────────────────────────────┤
│ Layer 3: Patterns (packages/ui/)                                │
│   Composite: Modal, Tabs, Accordion, Dropdown                   │
├─────────────────────────────────────────────────────────────────┤
│ Layer 2: Primitives (packages/ui/)                              │
│   Basic: Button, Card, Badge, Input, Blockquote                 │
├─────────────────────────────────────────────────────────────────┤
│ Layer 1: Tokens (packages/tokens/)                              │
│   Values: colors, typography, spacing, motion                   │
└─────────────────────────────────────────────────────────────────┘

Dependencies flow DOWN only. Lower layers never import from higher layers.
```

---

## Layer 1: Design Tokens

### File Structure

```
packages/tokens/
├── src/
│   ├── primitives/           # Raw design values
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── motion.json
│   │   ├── radius.json
│   │   └── infrastructure.json
│   │
│   ├── semantic/             # Meaningful aliases
│   │   ├── base.json         # Colors, radius, borders
│   │   ├── typography.json   # Type scale
│   │   ├── spacing.json      # Layout spacing
│   │   └── motion.json       # Animation presets
│   │
│   └── themes/               # Theme overrides
│       ├── nyt/
│       ├── chinese-aesthetic/
│       └── brutalism/
│
├── style-dictionary.config.js
└── package.json
```

### Adding a New Primitive Token

1. **Add to primitives file:**

```json
// src/primitives/spacing.json
{
  "primitive": {
    "spacing": {
      "4xl": { "value": "96px" }  // New token
    }
  }
}
```

2. **Build tokens:**

```bash
pnpm --filter @blog/tokens build
```

3. **Verify output in `build/css/primitives.css`**

### Adding a Semantic Token

1. **Reference the primitive:**

```json
// src/semantic/spacing.json
{
  "spacing": {
    "section": {
      "value": "{primitive.spacing.4xl}",
      "$description": "Spacing between major page sections"
    }
  }
}
```

2. **Build and verify**

### Adding a Theme Override

1. **Create override in theme file:**

```json
// src/themes/nyt/light.json
{
  "color": {
    "text": {
      "primary": { "value": "{primitive.color.nyt-black}" }
    }
  },
  "font": {
    "family": {
      "heading": { "value": "{primitive.font.family.serif}" },
      "body": { "value": "{primitive.font.family.serif}" }
    }
  }
}
```

2. **The build process generates:**
   - `theme-nyt-light.css` with selectors `[data-theme="nyt"][data-mode="light"]`

### Token Naming Conventions

| Category | Pattern | Examples |
|----------|---------|----------|
| Colors | `color.{semantic}.{variant}` | `color.text.primary`, `color.bg.secondary` |
| Typography | `font.{property}.{scale}` | `font.size.display`, `font.weight.h1` |
| Spacing | `spacing.{scale}` | `spacing.xs`, `spacing.2xl` |
| Motion | `motion.{property}.{speed}` | `motion.duration.fast`, `motion.easing.bounce` |

---

## Layer 2-3: UI Components

### File Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Modal/           # Pattern (Layer 3)
│   │   └── ...
│   │
│   ├── foundations/         # Token documentation stories
│   │   ├── Typography.stories.tsx
│   │   ├── Color.stories.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   └── utils.ts         # cn() utility
│   │
│   └── index.tsx            # Public exports
│
└── package.json
```

### Adding a New Primitive Component

1. **Create component directory:**

```bash
mkdir -p packages/ui/src/components/NewComponent
```

2. **Create component file:**

```tsx
// packages/ui/src/components/NewComponent/NewComponent.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const newComponentVariants = cva(
  // Base styles using tokens
  'inline-flex items-center justify-center rounded-[var(--radius-default)]',
  {
    variants: {
      variant: {
        primary: 'bg-action-primary text-figure-inverse',
        secondary: 'bg-action-secondary text-figure-primary',
      },
      size: {
        sm: 'h-8 px-3 text-body-sm',
        md: 'h-10 px-4 text-body',
        lg: 'h-12 px-6 text-body',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface NewComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newComponentVariants> {
  /** Component-specific prop */
  customProp?: string;
}

export const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(newComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

NewComponent.displayName = 'NewComponent';
```

3. **Create story:**

```tsx
// packages/ui/src/components/NewComponent/NewComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { NewComponent } from './NewComponent';

const meta: Meta<typeof NewComponent> = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New Component',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <NewComponent variant="primary">Primary</NewComponent>
      <NewComponent variant="secondary">Secondary</NewComponent>
    </div>
  ),
};
```

4. **Create index export:**

```tsx
// packages/ui/src/components/NewComponent/index.ts
export { NewComponent, type NewComponentProps } from './NewComponent';
```

5. **Add to main export:**

```tsx
// packages/ui/src/index.tsx
export { NewComponent, type NewComponentProps } from './components/NewComponent';
```

### Adding a Pattern Component (Layer 3)

Pattern components use the compound component pattern:

```tsx
// packages/ui/src/components/NewPattern/NewPattern.tsx
import * as React from 'react';

// Context for state sharing
interface NewPatternContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NewPatternContext = React.createContext<NewPatternContextValue | null>(null);

function useNewPatternContext() {
  const context = React.useContext(NewPatternContext);
  if (!context) {
    throw new Error('NewPattern components must be used within NewPattern');
  }
  return context;
}

// Root component
export function NewPattern({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <NewPatternContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NewPatternContext.Provider>
  );
}

// Trigger component
export function NewPatternTrigger({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useNewPatternContext();
  return (
    <button onClick={() => setIsOpen(true)} className="...">
      {children}
    </button>
  );
}

// Content component
export function NewPatternContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useNewPatternContext();
  if (!isOpen) return null;
  return <div className="...">{children}</div>;
}
```

### Token Usage in Components

**DO use CSS variables via Tailwind:**

```tsx
// Good - uses token-backed utilities
<div className="bg-ground-primary text-figure-primary rounded-[var(--radius-default)]">

// Good - uses type utilities
<h1 className="type-display text-figure-primary">
```

**DON'T hardcode values:**

```tsx
// Bad - hardcoded values bypass the token system
<div className="bg-white text-black rounded-md">
<h1 className="text-5xl font-bold">
```

---

## Tailwind Configuration

**Location:** `packages/config/tailwind.config.js`

### Adding Typography Utilities

```js
// packages/config/tailwind.config.js
const typographyPlugin = plugin(function({ addUtilities }) {
  addUtilities({
    '.type-new-scale': {
      fontSize: 'var(--font-size-new-scale)',
      lineHeight: 'var(--font-line-height-new-scale)',
      fontWeight: 'var(--font-weight-new-scale)',
      letterSpacing: 'var(--font-letter-spacing-new-scale)',
      fontFamily: 'var(--font-family-heading)',
    },
  });
});
```

### Adding Color Utilities

```js
// Add to the colors object
const colors = {
  // ... existing colors
  'new-semantic': {
    light: 'var(--color-new-semantic-light)',
    DEFAULT: 'var(--color-new-semantic)',
    dark: 'var(--color-new-semantic-dark)',
  },
};
```

---

## Adding a New Theme

1. **Create theme directory:**

```bash
mkdir -p packages/tokens/src/themes/new-theme
```

2. **Create light mode:**

```json
// packages/tokens/src/themes/new-theme/light.json
{
  "color": {
    "bg": {
      "primary": { "value": "#ffffff" }
    },
    "text": {
      "primary": { "value": "#1a1a1a" }
    }
  },
  "font": {
    "family": {
      "heading": { "value": "'Your Font', sans-serif" },
      "body": { "value": "'Your Font', sans-serif" }
    }
  }
}
```

3. **Create dark mode:**

```json
// packages/tokens/src/themes/new-theme/dark.json
{
  "color": {
    "bg": {
      "primary": { "value": "#1a1a1a" }
    },
    "text": {
      "primary": { "value": "#ffffff" }
    }
  }
}
```

4. **Update Style Dictionary config:**

```js
// packages/tokens/style-dictionary.config.js
// Add your theme to the platforms configuration
```

5. **Update ThemeSelector:**

```tsx
// apps/blog/components/layout/ThemeSelector.tsx
// Add the new theme to the dropdown options
```

---

## Testing

### Running Storybook

```bash
pnpm --filter @blog/storybook dev
```

### Running Token Build

```bash
pnpm --filter @blog/tokens build
```

### Running UI Tests

```bash
# Run foundation tests
npx playwright test --project=foundations

# Run all tests
npx playwright test
```

### Verifying Token Application

Check the built CSS files:

```bash
# View semantic tokens
cat packages/tokens/build/css/semantic.css

# View theme overrides
cat packages/tokens/build/css/theme-nyt-light.css
```

---

## Checklist for Design System Changes

### Adding Tokens

- [ ] Added to appropriate primitives file
- [ ] Added semantic alias if needed
- [ ] Added to relevant theme files if theme-specific
- [ ] Ran `pnpm --filter @blog/tokens build`
- [ ] Verified output in `build/css/`

### Adding Components

- [ ] Uses token-backed Tailwind utilities
- [ ] Has TypeScript interfaces
- [ ] Has Storybook story with all variants
- [ ] Exported from `packages/ui/src/index.tsx`
- [ ] Uses `cn()` for className merging
- [ ] Uses `cva` for variants (recommended)

### Adding Themes

- [ ] Has both light.json and dark.json
- [ ] Overrides all necessary semantic tokens
- [ ] Updated Style Dictionary config
- [ ] Updated ThemeSelector component
- [ ] Tested in Storybook

---

## Architecture Principles

1. **Tokens are the source of truth** - All visual values flow from tokens
2. **Semantic over primitive** - App code uses semantic tokens, not primitives
3. **Dependencies flow down** - Lower layers never import from higher layers
4. **Components are composable** - Build complex from simple
5. **Themes are additive** - Themes override semantic tokens, not primitives

---

## Related Documentation

- [Design System](./DESIGN_SYSTEM.md) - Full architecture overview
- [Developer Guide](./DEVELOPER_GUIDE.md) - For app developers
- [Architecture Plan](../ARCHITECTURE.md) - Original architecture document
