# Theming Guide

This guide explains how to create custom themes and manage light/dark mode in the design system.

## Theme Architecture

Themes work by overriding semantic tokens while keeping primitives unchanged. This allows consistent design language with visual variations.

```
Primitives (unchanged) → Semantic (defaults) → Theme (overrides)
```

## Applying Themes

Themes are applied via data attributes on the HTML element:

```html
<html data-theme="nyt" data-mode="light">
```

### Theme Attribute Values

| Attribute | Values | Default |
|-----------|--------|---------|
| `data-theme` | `nyt`, custom themes | `nyt` |
| `data-mode` | `light`, `dark` | `light` |

### Runtime Theme Switching

```tsx
function setTheme(theme: string, mode: 'light' | 'dark') {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.mode = mode;
}

// Examples
setTheme('nyt', 'light');
setTheme('nyt', 'dark');
```

## Creating a New Theme

### 1. Create Theme Directory

```bash
mkdir -p packages/tokens/src/themes/mytheme
```

### 2. Create Light Mode File

```json
// src/themes/mytheme/light.json
{
  "color": {
    "bg": {
      "primary": { "value": "#ffffff" },
      "secondary": { "value": "#f5f5f5" },
      "tertiary": { "value": "#e5e5e5" },
      "inverse": { "value": "#1a1a1a" }
    },
    "text": {
      "primary": { "value": "#1a1a1a" },
      "secondary": { "value": "#4a4a4a" },
      "muted": { "value": "#737373" },
      "inverse": { "value": "#ffffff" }
    },
    "action": {
      "primary": { "value": "#0066cc" },
      "primary-hover": { "value": "#0052a3" },
      "secondary": { "value": "#f0f0f0" },
      "secondary-hover": { "value": "#e0e0e0" }
    },
    "border": {
      "default": { "value": "#e0e0e0" },
      "muted": { "value": "#f0f0f0" },
      "strong": { "value": "#c0c0c0" }
    },
    "status": {
      "info": { "value": "#0ea5e9" },
      "info-bg": { "value": "#f0f9ff" },
      "success": { "value": "#22c55e" },
      "success-bg": { "value": "#f0fdf4" },
      "warning": { "value": "#f59e0b" },
      "warning-bg": { "value": "#fffbeb" },
      "danger": { "value": "#ef4444" },
      "danger-bg": { "value": "#fef2f2" }
    }
  }
}
```

### 3. Create Dark Mode File

```json
// src/themes/mytheme/dark.json
{
  "color": {
    "bg": {
      "primary": { "value": "#0a0a0a" },
      "secondary": { "value": "#171717" },
      "tertiary": { "value": "#262626" },
      "inverse": { "value": "#fafafa" }
    },
    "text": {
      "primary": { "value": "#fafafa" },
      "secondary": { "value": "#a3a3a3" },
      "muted": { "value": "#737373" },
      "inverse": { "value": "#0a0a0a" }
    },
    "action": {
      "primary": { "value": "#3b82f6" },
      "primary-hover": { "value": "#60a5fa" },
      "secondary": { "value": "#262626" },
      "secondary-hover": { "value": "#404040" }
    },
    "border": {
      "default": { "value": "#404040" },
      "muted": { "value": "#262626" },
      "strong": { "value": "#525252" }
    },
    "status": {
      "info": { "value": "#38bdf8" },
      "info-bg": { "value": "#0c1929" },
      "success": { "value": "#4ade80" },
      "success-bg": { "value": "#0a1f0f" },
      "warning": { "value": "#fbbf24" },
      "warning-bg": { "value": "#1f1a0a" },
      "danger": { "value": "#f87171" },
      "danger-bg": { "value": "#2a0f0f" }
    }
  }
}
```

### 4. Build Tokens

```bash
pnpm --filter @blog/tokens build
```

### 5. Import in Application

```tsx
import '@blog/tokens/css/theme-mytheme-light';
import '@blog/tokens/css/theme-mytheme-dark';
```

## What Can Be Themed

### Themeable (Override in themes)

- **Colors**: All semantic color categories
- **Typography families**: Heading, body, code fonts
- **Border radius**: Component roundness
- **Border width**: Line thickness

### Not Themeable (Fixed in primitives)

- **Spacing**: Consistent across all themes
- **Typography scale**: Font sizes stay consistent
- **Motion**: Animation timing consistent
- **Breakpoints**: Responsive behavior

## Theme Token Categories

### Required Overrides

At minimum, themes should override these for proper light/dark contrast:

```json
{
  "color": {
    "bg": {
      "primary": {},
      "secondary": {},
      "inverse": {}
    },
    "text": {
      "primary": {},
      "secondary": {},
      "muted": {},
      "inverse": {}
    },
    "action": {
      "primary": {},
      "primary-hover": {}
    },
    "border": {
      "default": {}
    }
  }
}
```

### Optional Overrides

```json
{
  "color": {
    "surface": {
      "code": {},
      "quote": {},
      "elevated": {}
    },
    "link": {
      "default": {},
      "hover": {},
      "visited": {}
    },
    "accent": {
      "primary": {},
      "secondary": {}
    }
  }
}
```

## Storybook Theme Testing

Storybook includes a theme switcher toolbar:

1. Run Storybook: `pnpm --filter @blog/docs dev`
2. Use the toolbar dropdown to switch themes
3. Use the mode toggle for light/dark

### Adding New Themes to Storybook

Edit `apps/docs/.storybook/preview.tsx`:

```tsx
globalTypes: {
  theme: {
    defaultValue: 'nyt',
    toolbar: {
      items: ['nyt', 'mytheme', 'brutalist'],
    },
  },
}
```

## CSS Generation

The build process generates theme CSS with data attribute selectors:

```css
/* build/css/theme-mytheme-light.css */
[data-theme="mytheme"][data-mode="light"] {
  --color-bg-primary: #ffffff;
  --color-text-primary: #1a1a1a;
  /* ... */
}

/* build/css/theme-mytheme-dark.css */
[data-theme="mytheme"][data-mode="dark"] {
  --color-bg-primary: #0a0a0a;
  --color-text-primary: #fafafa;
  /* ... */
}
```

## Best Practices

### Color Contrast

Ensure sufficient contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text**: 3:1 minimum
- **UI components**: 3:1 minimum

### Dark Mode Guidelines

1. Don't just invert colors - carefully select dark backgrounds
2. Reduce contrast slightly in dark mode to avoid eye strain
3. Use slightly desaturated colors for better readability
4. Test with actual content, not just components

### Theme Consistency

1. Maintain the same semantic meaning across themes
2. Keep interaction patterns consistent
3. Only vary visual appearance, not behavior

## Example: Brutalist Theme

A high-contrast, geometric theme:

```json
// light.json
{
  "color": {
    "bg": {
      "primary": { "value": "#ffffff" },
      "secondary": { "value": "#f0f0f0" }
    },
    "text": {
      "primary": { "value": "#000000" }
    },
    "action": {
      "primary": { "value": "#000000" },
      "primary-hover": { "value": "#333333" }
    },
    "border": {
      "default": { "value": "#000000" },
      "strong": { "value": "#000000" }
    }
  },
  "radius": {
    "default": { "value": "0" },
    "sm": { "value": "0" },
    "lg": { "value": "0" }
  }
}
```

## Troubleshooting

### Theme Not Applying

1. Check data attributes are set correctly
2. Verify CSS is imported
3. Check CSS specificity (data selectors need to win)

### Wrong Colors in Dark Mode

1. Ensure both light.json and dark.json exist
2. Check all required overrides are present
3. Verify mode attribute matches file name

### Storybook Issues

1. Clear Storybook cache: `rm -rf node_modules/.cache`
2. Rebuild tokens: `pnpm --filter @blog/tokens build`
3. Restart Storybook
