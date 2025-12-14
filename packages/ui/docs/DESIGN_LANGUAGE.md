# Design Language

## Color Naming: Ground & Figure

We use **ground** and **figure** as semantic color categories to avoid redundant Tailwind class names.

### The Problem

If we named our token categories `bg` and `text`, we'd get awkward class names:
- `bg-bg-primary` (background using background color)
- `text-text-primary` (text using text color)

### The Solution

Rename categories using Gestalt psychology terminology:

**Ground** = Background/surface colors (what things sit ON)
- Page backgrounds, card surfaces, input fields
- The "canvas" or "stage"
- Usage: `bg-ground-primary`, `bg-ground-secondary`

**Figure** = Foreground/content colors (what you SEE)
- Text, icons, labels
- The "actors" on the stage
- Usage: `text-figure-primary`, `text-figure-muted`

### Examples

```tsx
// Clear, readable classes
<div className="bg-ground-secondary text-figure-primary">
  <h2 className="text-figure-primary">Title</h2>
  <p className="text-figure-muted">Description</p>
</div>

// vs what we avoided
<div className="bg-bg-secondary text-text-primary">
```

### One-Directional Usage

The naming is intentionally constrained:
- `ground` only with `bg-` → `bg-ground-*`
- `figure` only with `text-` → `text-figure-*`

You would never write `bg-figure-*` or `text-ground-*`.

### Full Color Palette

| Category | CSS Variable Pattern | Tailwind Usage |
|----------|---------------------|----------------|
| Ground | `--color-bg-*` | `bg-ground-{variant}` |
| Figure | `--color-text-*` | `text-figure-{variant}` |
| Border | `--color-border-*` | `border-border-{variant}` |
| Action | `--color-action-*` | `bg-action-*`, `text-action-*` |
| Status | `--color-status-*` | `bg-status-*`, `text-status-*` |

### Variants

**Ground variants:**
- `primary` - Main page background
- `secondary` - Elevated surfaces (cards, modals)
- `tertiary` - Nested surfaces
- `inverse` - Dark backgrounds for contrast

**Figure variants:**
- `primary` - Main text color
- `secondary` - Supporting text
- `muted` - De-emphasized text
- `inverse` - Text on dark backgrounds

## Typography

Font families are assigned semantically:

| Token | Usage |
|-------|-------|
| `font-heading` | Headlines, titles |
| `font-body` | Body text, UI labels |
| `font-code` | Code blocks, inline code |

```tsx
<h1 className="font-heading">Article Title</h1>
<p className="font-body">Body content...</p>
<code className="font-code">const x = 1</code>
```

## Spacing & Sizing

Spacing uses Tailwind's default scale. Border radius and widths use semantic tokens:

```tsx
// Radius
<div className="rounded">     {/* default */}
<div className="rounded-sm">  {/* small */}
<div className="rounded-lg">  {/* large */}
<div className="rounded-full">{/* pill/circle */}

// Border width
<div className="border">       {/* default */}
<div className="border-thick"> {/* emphasized */}
```

## Theming

All colors support theming via CSS custom properties. Themes override these variables:

```css
/* NYT Light theme */
[data-theme="nyt"][data-mode="light"] {
  --color-bg-primary: #ffffff;
  --color-text-primary: #121212;
}

/* NYT Dark theme */
[data-theme="nyt"][data-mode="dark"] {
  --color-bg-primary: #121212;
  --color-text-primary: #f5f5f5;
}
```

Components automatically adapt to theme changes without code modifications.
