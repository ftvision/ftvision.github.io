# Token Architecture Guide

This guide explains the 3-layer token architecture and how to work with design tokens.

## Overview

The token system uses Style Dictionary to transform JSON source files into CSS variables and JavaScript exports. The architecture separates concerns into three layers:

1. **Primitives** - Raw, unchanging values
2. **Semantic** - Contextual meaning
3. **Themes** - Visual variations

## Layer 1: Primitives

Primitives are the raw building blocks of the design system. They are shared across all themes and never change based on context.

### Colors (`src/primitives/colors.json`)

```json
{
  "color": {
    "gray": {
      "50": { "value": "#fafafa" },
      "100": { "value": "#f4f4f5" },
      "950": { "value": "#09090b" }
    },
    "nyt": {
      "blue": { "value": "#326891" },
      "blue-dark": { "value": "#1a4a6e" }
    },
    "status": {
      "info": { "value": "#0ea5e9" },
      "success": { "value": "#22c55e" },
      "warning": { "value": "#f59e0b" },
      "danger": { "value": "#ef4444" }
    }
  }
}
```

### Typography (`src/primitives/typography.json`)

```json
{
  "font": {
    "family": {
      "sans": { "value": "system-ui, -apple-system, sans-serif" },
      "serif": { "value": "Georgia, Cambria, serif" },
      "mono": { "value": "ui-monospace, Menlo, monospace" }
    },
    "size": {
      "xs": { "value": "0.75rem" },
      "sm": { "value": "0.875rem" },
      "base": { "value": "1rem" },
      "lg": { "value": "1.125rem" },
      "xl": { "value": "1.25rem" },
      "2xl": { "value": "1.5rem" },
      "3xl": { "value": "1.875rem" },
      "4xl": { "value": "2.25rem" }
    },
    "weight": {
      "normal": { "value": "400" },
      "medium": { "value": "500" },
      "semibold": { "value": "600" },
      "bold": { "value": "700" }
    }
  }
}
```

### Spacing (`src/primitives/spacing.json`)

Follows a 4px grid system:

```json
{
  "spacing": {
    "0": { "value": "0" },
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "4": { "value": "1rem" },
    "8": { "value": "2rem" },
    "16": { "value": "4rem" }
  }
}
```

### Motion (`src/primitives/motion.json`)

```json
{
  "motion": {
    "duration": {
      "instant": { "value": "0ms" },
      "fast": { "value": "100ms" },
      "normal": { "value": "200ms" },
      "slow": { "value": "300ms" }
    },
    "easing": {
      "default": { "value": "cubic-bezier(0.4, 0, 0.2, 1)" },
      "in": { "value": "cubic-bezier(0.4, 0, 1, 1)" },
      "out": { "value": "cubic-bezier(0, 0, 0.2, 1)" }
    }
  }
}
```

## Layer 2: Semantic Tokens

Semantic tokens provide meaning to primitive values. They define how tokens are used in context.

### Color Categories (`src/semantic/base.json`)

```json
{
  "color": {
    "bg": {
      "primary": { "value": "{color.gray.50}" },
      "secondary": { "value": "{color.gray.100}" },
      "tertiary": { "value": "{color.gray.200}" },
      "inverse": { "value": "{color.gray.900}" }
    },
    "text": {
      "primary": { "value": "{color.gray.900}" },
      "secondary": { "value": "{color.gray.700}" },
      "muted": { "value": "{color.gray.500}" },
      "inverse": { "value": "{color.gray.50}" }
    },
    "action": {
      "primary": { "value": "{color.nyt.blue}" },
      "primary-hover": { "value": "{color.nyt.blue-dark}" }
    }
  }
}
```

### Spacing Categories (`src/semantic/spacing.json`)

```json
{
  "spacing": {
    "stack": {
      "xs": { "value": "{spacing.1}" },
      "sm": { "value": "{spacing.2}" },
      "md": { "value": "{spacing.4}" },
      "lg": { "value": "{spacing.8}" }
    },
    "inline": {
      "xs": { "value": "{spacing.1}" },
      "sm": { "value": "{spacing.2}" },
      "md": { "value": "{spacing.4}" }
    },
    "inset": {
      "xs": { "value": "{spacing.1}" },
      "sm": { "value": "{spacing.2}" },
      "md": { "value": "{spacing.4}" }
    }
  }
}
```

### Typography Styles (`src/semantic/typography.json`)

```json
{
  "typography": {
    "display": {
      "family": { "value": "{font.family.serif}" },
      "size": { "value": "{font.size.4xl}" },
      "weight": { "value": "{font.weight.bold}" },
      "lineHeight": { "value": "1.1" }
    },
    "body": {
      "family": { "value": "{font.family.sans}" },
      "size": { "value": "{font.size.base}" },
      "weight": { "value": "{font.weight.normal}" },
      "lineHeight": { "value": "1.6" }
    }
  }
}
```

## Layer 3: Themes

Themes override semantic tokens to create visual variations. Each theme has light and dark modes.

### Theme Structure

```
src/themes/
├── nyt/
│   ├── light.json    # Light mode overrides
│   └── dark.json     # Dark mode overrides
└── _template.json    # Template for new themes
```

### NYT Light Theme (`src/themes/nyt/light.json`)

```json
{
  "color": {
    "bg": {
      "primary": { "value": "#ffffff" },
      "secondary": { "value": "#f7f7f7" }
    },
    "action": {
      "primary": { "value": "#326891" },
      "primary-hover": { "value": "#1a4a6e" }
    }
  }
}
```

### NYT Dark Theme (`src/themes/nyt/dark.json`)

```json
{
  "color": {
    "bg": {
      "primary": { "value": "#121212" },
      "secondary": { "value": "#1e1e1e" }
    },
    "text": {
      "primary": { "value": "#e8e8e8" },
      "secondary": { "value": "#b3b3b3" }
    }
  }
}
```

## CSS Output

### Variable Naming Convention

```
--{category}-{property}-{variant}-{state}
```

Examples:
```css
--color-bg-primary
--color-text-muted
--color-action-primary-hover
--font-family-heading
--spacing-stack-md
--radius-default
--motion-duration-fast
```

### Theme Application

Themes are applied using data attributes:

```css
/* Default (primitives + semantic) */
:root {
  --color-bg-primary: #fafafa;
}

/* Theme-specific */
[data-theme="nyt"][data-mode="light"] {
  --color-bg-primary: #ffffff;
  --color-action-primary: #326891;
}

[data-theme="nyt"][data-mode="dark"] {
  --color-bg-primary: #121212;
  --color-action-primary: #4a7fa8;
}
```

## JavaScript Output

```typescript
// Import all tokens
import tokens from '@blog/tokens';

// Import specific layers
import { primitives } from '@blog/tokens/primitives';
import { semantic } from '@blog/tokens/semantic';

// Access values
tokens.color.bg.primary // CSS variable reference
primitives.color.gray['50'] // Raw value
```

## Build Process

The build is orchestrated by `build.js`:

1. Load primitive JSON files
2. Load semantic JSON files (reference primitives)
3. Load theme JSON files (override semantic)
4. Transform using Style Dictionary
5. Output CSS and JS files

```bash
# Build tokens
pnpm --filter @blog/tokens build

# Clean build output
pnpm --filter @blog/tokens clean
```

## Adding New Tokens

### Adding a Primitive

1. Edit the appropriate file in `src/primitives/`
2. Run `pnpm build`

### Adding a Semantic Token

1. Edit `src/semantic/base.json` or category file
2. Reference primitives using `{category.name}` syntax
3. Run `pnpm build`

### Creating a New Theme

See [Theming Guide](./theming.md).

## Best Practices

1. **Never use primitive tokens directly in components** - Always use semantic tokens
2. **Keep primitives theme-agnostic** - Primitives should work in any theme
3. **Use meaningful semantic names** - Names should describe purpose, not appearance
4. **Maintain the reference chain** - Semantic → Primitive, Theme → Semantic
