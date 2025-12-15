# Phase 7: Infrastructure Tokens

> The structural vocabulary that makes layouts work.

## Overview

Phases 1–6 established the expressive language: type, spacing, motion, color, accessibility, and components. But production layouts need **infrastructure**—the tokens that control depth, layering, containment, and proportion.

In brutalism, infrastructure is minimal. No elaborate shadow systems. No complex elevation hierarchies. The structure is flat, honest, and explicit.

---

## 1. Borders as Elevation

### Philosophy

Traditional design systems use **shadows** to create depth. Brutalism uses **borders**.

A shadow says "this element floats above the page." A border says "this element has boundaries." The brutalist approach is more honest: nothing floats. Everything is on the same plane. Elements are distinguished by their containment, not their altitude.

### Token Specification

Since brutalism relies on borders rather than shadows, our "elevation" is expressed through border weight:

| Token | Value | Use Case |
|-------|-------|----------|
| `border.weight.default` | 2px | Standard containers |
| `border.weight.strong` | 4px | Emphasized elements |
| `border.weight.heavy` | 6px | Maximum emphasis |
| `border.weight.thin` | 1px | Subtle dividers (rare) |

### Shadow Tokens (Minimal)

For cases where shadows are unavoidable (e.g., dropdown menus that must clear content), brutalism uses **hard shadows**—not soft, realistic ones:

| Token | Value | Use Case |
|-------|-------|----------|
| `shadow.none` | `none` | Default (most elements) |
| `shadow.hard-sm` | `4px 4px 0 var(--color-border-default)` | Small hard offset |
| `shadow.hard-md` | `8px 8px 0 var(--color-border-default)` | Medium hard offset |
| `shadow.hard-lg` | `12px 12px 0 var(--color-border-default)` | Large hard offset |

**Hard shadows:**
- No blur radius (0)
- Solid color (not rgba)
- Diagonal offset (looks like a physical shadow from a harsh light)
- Optional: inverted colors in dark mode

**When to use hard shadows:**
- Dropdowns that need to "pop" from content
- Modals (if overlay isn't sufficient)
- Hover states where you want a "lift" effect

**When NOT to use:**
- Cards at rest (use borders)
- Buttons (use borders and state changes)
- Any element that doesn't need to clear other content

---

## 2. Z-Index Scale

### Philosophy

Z-index in brutalism is straightforward. Since there's no elevation hierarchy (everything is flat), z-index is only needed for overlays and dropdowns—not for creating depth illusions.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `z.base` | `0` | Default, in-flow content |
| `z.sticky` | `100` | Sticky headers |
| `z.dropdown` | `200` | Dropdown menus |
| `z.overlay` | `300` | Modal backdrops |
| `z.modal` | `400` | Modal dialogs |
| `z.tooltip` | `500` | Tooltips |
| `z.toast` | `600` | Toast notifications |

**Note:** The scale has fewer levels than typical systems because brutalism has fewer overlapping elements.

### Stacking Order

```
Toast notifications    ─── z.toast (600)
Tooltips               ─── z.tooltip (500)
Modals                 ─── z.modal (400)
Overlays               ─── z.overlay (300)
Dropdowns              ─── z.dropdown (200)
Sticky elements        ─── z.sticky (100)
Everything else        ─── z.base (0)
```

---

## 3. Container Widths

### Philosophy

Brutalism respects optimal reading widths. A full-width monospace paragraph is unreadable. Content needs boundaries.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `container.xs` | `20rem` (320px) | Minimum mobile width |
| `container.sm` | `24rem` (384px) | Narrow sidebars |
| `container.md` | `32rem` (512px) | Medium content |
| `container.prose` | `60ch` | Long-form reading (character-based) |
| `container.content` | `48rem` (768px) | Standard article width |
| `container.wide` | `64rem` (1024px) | Wide content with media |
| `container.max` | `80rem` (1280px) | Maximum site width |
| `container.full` | `100%` | Full-bleed content |

### The `60ch` Prose Width

For monospace text, 60ch is slightly narrower than the typical 65ch for proportional fonts. This accounts for the uniform character width, which makes long lines feel longer.

### Usage

```css
/* Article body */
.article-body {
  max-width: var(--container-prose);
  margin: 0 auto;
}

/* Full layout */
.page-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--spacing-inset-lg);
}

/* Full-bleed section */
.hero {
  max-width: var(--container-full);
}
```

---

## 4. Prose Styles

### Philosophy

Prose tokens define the **reading experience**—the vertical rhythm, paragraph spacing, and flow of long-form content.

### Token Specification

| Token | Value | Purpose |
|-------|-------|---------|
| `prose.p-spacing` | `1.5em` | Space between paragraphs |
| `prose.heading-mt` | `2.5em` | Margin-top for headings in prose |
| `prose.heading-mb` | `0.75em` | Margin-bottom for headings in prose |
| `prose.list-pl` | `2em` | List padding-left |
| `prose.list-spacing` | `0.75em` | Space between list items |
| `prose.blockquote-pl` | `1.5em` | Blockquote padding-left |
| `prose.blockquote-border` | `4px` | Blockquote left border width |
| `prose.hr-my` | `3em` | Horizontal rule vertical margin |

### Prose Class Implementation

```css
.prose {
  max-width: var(--container-prose);
}

.prose > * + * {
  margin-top: var(--prose-p-spacing);
}

.prose > h2,
.prose > h3,
.prose > h4 {
  margin-top: var(--prose-heading-mt);
  margin-bottom: var(--prose-heading-mb);
}

.prose > ul,
.prose > ol {
  padding-left: var(--prose-list-pl);
}

.prose > li + li {
  margin-top: var(--prose-list-spacing);
}

.prose > blockquote {
  padding-left: var(--prose-blockquote-pl);
  border-left: var(--prose-blockquote-border) solid var(--color-border-default);
}

.prose > hr {
  margin-top: var(--prose-hr-my);
  margin-bottom: var(--prose-hr-my);
  border: none;
  border-top: 2px solid var(--color-border-default);
}
```

---

## 5. Grid System

### Philosophy

Brutalism often uses rigid grids—exposed, visible structure. For blog layouts, we provide a simple column system.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `grid.columns` | `12` | Standard grid columns |
| `grid.gutter` | `var(--spacing-gutter-md)` | Column gap |
| `grid.margin` | `var(--spacing-section-sm)` | Page margins |

### Implementation

```css
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns, 12), 1fr);
  gap: var(--grid-gutter);
  padding: 0 var(--grid-margin);
}

.col-span-full { grid-column: 1 / -1; }
.col-span-8 { grid-column: span 8; }
.col-span-6 { grid-column: span 6; }
.col-span-4 { grid-column: span 4; }
```

---

## 6. Aspect Ratios

### Philosophy

Media elements need consistent proportions. Brutalism doesn't change this requirement—it just applies it without decoration.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `aspect.square` | `1 / 1` | Thumbnails, avatars |
| `aspect.photo` | `4 / 3` | Standard photography |
| `aspect.video` | `16 / 9` | Video embeds |
| `aspect.wide` | `21 / 9` | Cinematic headers |
| `aspect.portrait` | `3 / 4` | Portrait images |

### Usage

```css
.video-container {
  aspect-ratio: var(--aspect-video);
  border: 2px solid var(--color-border-default);
}

.thumbnail {
  aspect-ratio: var(--aspect-square);
  border: 2px solid var(--color-border-default);
}
```

---

## 7. Icon Sizes

### Philosophy

Icons should align with the type scale. In a monospace system, icons can feel oversized—they need to be sized carefully.

### Token Specification

| Token | Value | Pairs With |
|-------|-------|------------|
| `icon.xs` | `0.75rem` (12px) | caption |
| `icon.sm` | `1rem` (16px) | body-sm |
| `icon.md` | `1.25rem` (20px) | body |
| `icon.lg` | `1.5rem` (24px) | h4 |
| `icon.xl` | `2rem` (32px) | h3 |

### Icon Style

Brutalist icons should be:
- **Outlined** or **solid**, not filled with gradients
- **Geometric** shapes preferred
- **Monochrome** (inherit text color)
- **No decorative variants**

---

## 8. Interactive State Tokens

### Philosophy

Beyond hover/focus/active, production interfaces need additional states.

### Token Specification

**Selected State:**

| Token | Value |
|-------|-------|
| `selected.bg` | `ground.inverse` |
| `selected.text` | `figure.inverse` |
| `selected.border` | `border.default` |

In brutalism, selection is typically **inverted colors**.

**Loading State:**

| Token | Value |
|-------|-------|
| `loading.opacity` | `0.5` |
| `loading.cursor` | `wait` |

No spinners—just dimmed content and a wait cursor.

**Dragging State:**

| Token | Value |
|-------|-------|
| `dragging.shadow` | `shadow.hard-md` |
| `dragging.border` | `4px solid accent.primary` |

Dragged items get a hard shadow and accent border.

---

## 9. Print Styles

### Philosophy

Brutalism translates well to print. Black and white, sharp edges, clear hierarchy—these are print virtues.

### Token Considerations

```css
@media print {
  /* Remove backgrounds */
  * {
    background: white !important;
    color: black !important;
  }

  /* Ensure borders print */
  .card, .callout, .blockquote {
    border-color: black !important;
  }

  /* Remove interactive elements */
  button, .tooltip, .dropdown {
    display: none !important;
  }

  /* Optimize page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  .card, blockquote, figure {
    page-break-inside: avoid;
  }
}
```

---

## Implementation Order

1. **Border Weights** — Foundation for all container definitions
2. **Z-Index** — Required for dropdowns, modals, tooltips
3. **Container Widths** — Layout structure
4. **Prose Styles** — Long-form reading (primary use case)
5. **Grid System** — Layout flexibility
6. **Aspect Ratios** — Media components
7. **Icon Sizes** — When icons are added
8. **Interactive States** — Extended component states
9. **Print Styles** — Final polish

---

## Success Criteria

- [ ] Border weight tokens available and documented
- [ ] Hard shadow tokens (for rare use) defined
- [ ] Z-index scale implemented consistently
- [ ] Container widths available in Tailwind
- [ ] `.prose` class functional with all prose tokens
- [ ] Grid system available for layouts
- [ ] Aspect ratios available for media
- [ ] No arbitrary z-index or shadow values in code
- [ ] Print styles tested and functional

---

## File Structure

After implementation, the brutalism theme should have:

```
packages/tokens/src/themes/brutalism/
├── light.json           # Light mode colors
├── dark.json            # Dark mode colors
├── base.json            # Theme-wide overrides
├── typography.json      # Type scale and fonts
├── spacing.json         # Spacing overrides (if any)
├── motion.json          # Motion tokens
├── focus.json           # Focus ring tokens
├── border.json          # Border weight tokens
├── shadow.json          # Hard shadow tokens
├── z-index.json         # Z-index scale
├── container.json       # Container widths
├── prose.json           # Prose styles
└── icons.json           # Icon sizes
```

---

## The Destination

When infrastructure is complete, layouts are predictable:

```tsx
<div className="max-w-container-max mx-auto px-grid-margin">
  <header className="sticky top-0 z-sticky bg-ground-primary border-b-2 border-border">
    <nav>...</nav>
  </header>

  <main className="grid grid-cols-12 gap-gutter-md">
    <article className="col-span-8 prose">
      <h1>Article Title</h1>
      <p>Content flows with proper prose spacing...</p>
    </article>

    <aside className="col-span-4 border-l-2 border-border pl-inset-md">
      <h2>Related</h2>
      ...
    </aside>
  </main>

  <footer className="border-t-4 border-border mt-section-lg pt-section-md">
    ...
  </footer>
</div>
```

Every layout decision has a token. Every token has a reason.

---

*"I have learned that what I have not drawn, I have never really seen."*
— Frederick Franck

In brutalist infrastructure, what is not tokenized has never really been designed.
