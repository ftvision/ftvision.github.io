# @blog/tokens

Design tokens for the blog design system. Implements a 3-layer architecture (primitives → semantic → themes) using Style Dictionary.

## Installation

This package is private and consumed via workspace dependencies.

```bash
pnpm --filter @blog/tokens build
```

## Usage

### CSS Variables

```tsx
// Import all token CSS
import '@blog/tokens/css';

// Or import specific layers
import '@blog/tokens/css/primitives';
import '@blog/tokens/css/semantic';
import '@blog/tokens/css/theme-nyt-light';
```

### JavaScript Values

```tsx
import { color, spacing, typography } from '@blog/tokens';
import { primitives } from '@blog/tokens/primitives';
import { semantic } from '@blog/tokens/semantic';
```

### Applying Themes

Themes are applied via data attributes on the root element:

```html
<html data-theme="nyt" data-mode="light">
```

## Token Architecture

### Layer 1: Primitives

Raw design values shared across all themes.

| File | Contents |
|------|----------|
| `colors.json` | Color palette (grays, brand, status, data-viz) |
| `typography.json` | Font families, sizes, weights, line-heights |
| `spacing.json` | Spacing scale (0-24 in 0.25rem increments) |
| `motion.json` | Durations and easing curves |
| `radius.json` | Border radius values |

### Layer 2: Semantic

Meaningful token names that reference primitives.

| Category | Examples |
|----------|----------|
| `bg` | `primary`, `secondary`, `tertiary`, `inverse` |
| `text` | `primary`, `secondary`, `muted`, `inverse` |
| `action` | `primary`, `primary-hover`, `secondary` |
| `border` | `default`, `muted`, `strong` |
| `status` | `info`, `success`, `warning`, `danger` |

### Layer 3: Themes

Override semantic tokens per theme/mode.

```
src/themes/
├── nyt/
│   ├── light.json
│   └── dark.json
└── _template.json
```

## CSS Variable Naming

```
--{category}-{property}-{variant}-{state}

Examples:
--color-bg-primary
--color-text-muted
--color-action-primary-hover
--font-family-heading
--spacing-stack-md
```

## Adding a New Theme

1. Copy `src/themes/_template.json` to `src/themes/{name}/light.json`
2. Create `src/themes/{name}/dark.json`
3. Override semantic values as needed
4. Run `pnpm build`

See [packages/guide/theming.md](../guide/theming.md) for detailed theming guide.

## Build Output

```
build/
├── css/
│   ├── index.css           # All imports
│   ├── primitives.css      # Primitive variables
│   ├── semantic.css        # Semantic variables
│   ├── theme-nyt-light.css # Theme overrides
│   └── theme-nyt-dark.css
└── js/
    ├── tokens.js           # Combined exports
    ├── primitives.js       # Primitive values
    └── semantic.js         # Semantic values
```

## Scripts

```bash
pnpm build  # Build all token outputs
pnpm clean  # Remove build directory
```
