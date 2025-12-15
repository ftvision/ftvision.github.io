# Phase 7: Infrastructure Tokens

> The invisible scaffolding that makes layouts work.

## Overview

Phases 1–6 established the expressive vocabulary: type, color, spacing, motion. But production layouts need **structural vocabulary**—the tokens that control depth, layering, containment, and proportion. Without these, developers reach for arbitrary values, and the system fractures.

---

## 1. Elevation (Shadows)

### Philosophy

Shadows are not decoration—they are **information**. A shadow tells the user: this element is above that one. In editorial design, elevation is restrained. We use it to:
- Lift interactive elements (dropdowns, tooltips)
- Create focus (modals, overlays)
- Suggest interactivity (hoverable cards)

We do **not** use shadows for:
- Visual interest alone
- Brand expression
- Every card or container

### Token Specification

| Token | Use Case | Value (Light) | Value (Dark) |
|-------|----------|---------------|--------------|
| `shadow.none` | Reset, flat elements | `none` | `none` |
| `shadow.sm` | Subtle lift (hover states, cards) | `0 1px 2px rgba(0,0,0,0.05)` | `0 1px 2px rgba(0,0,0,0.3)` |
| `shadow.md` | Interactive elements (dropdowns, popovers) | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` | `0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.2)` |
| `shadow.lg` | Elevated panels (dialogs, sheets) | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | `0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -2px rgba(0,0,0,0.2)` |
| `shadow.xl` | Maximum elevation (modals, command palettes) | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` | `0 20px 25px -5px rgba(0,0,0,0.6), 0 10px 10px -5px rgba(0,0,0,0.2)` |

### Dark Mode Consideration

Shadows in dark mode must be significantly stronger—light doesn't cast visible shadows on dark surfaces. The dark mode values use higher opacity and sometimes subtle outer glow effects for better perception.

### Usage Guidelines

```
Card at rest:         shadow.none or shadow.sm
Card on hover:        shadow.md
Dropdown menu:        shadow.md
Sticky header:        shadow.sm
Modal:                shadow.xl
Toast notification:   shadow.lg
```

---

## 2. Z-Index Scale

### Philosophy

Z-index is a **naming problem**, not a numbers problem. When developers pick arbitrary values (`z-index: 9999`), they're working around a missing vocabulary. We provide semantic layers.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `z.base` | `0` | Default stacking context |
| `z.raised` | `10` | Cards, slightly elevated content |
| `z.dropdown` | `100` | Dropdown menus, select options |
| `z.sticky` | `200` | Sticky headers, fixed sidebars |
| `z.overlay` | `300` | Overlay backgrounds, scrims |
| `z.modal` | `400` | Modal dialogs, sheets |
| `z.popover` | `500` | Popovers, tooltips that must clear modals |
| `z.tooltip` | `600` | Tooltips (always on top) |
| `z.toast` | `700` | Toast notifications |
| `z.max` | `9999` | Emergency escape hatch (use sparingly) |

### Stacking Order Visualization

```
Toast notifications    ─── z.toast (700)
Tooltips               ─── z.tooltip (600)
Popovers               ─── z.popover (500)
Modals                 ─── z.modal (400)
Overlays/Scrims        ─── z.overlay (300)
Sticky headers         ─── z.sticky (200)
Dropdowns              ─── z.dropdown (100)
Raised cards           ─── z.raised (10)
Base content           ─── z.base (0)
```

### Guidelines

1. **Never use raw numbers** in components. Always reference `z.*` tokens.
2. **Prefer lower values**. Most elements should be `z.base` or `z.raised`.
3. **Modal + tooltip** is the highest legitimate stack (modal content has tooltip).
4. **`z.max` is a code smell**. If you need it, the stacking context is broken.

---

## 3. Container Widths

### Philosophy

Content needs boundaries. A line of text at 1400px is unreadable. A 300px article is claustrophobic. Container tokens encode **optimal reading and viewing widths**.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `container.xs` | `20rem` (320px) | Mobile-first minimum |
| `container.sm` | `24rem` (384px) | Small cards, narrow sidebars |
| `container.md` | `28rem` (448px) | Medium content blocks |
| `container.prose` | `65ch` | **Long-form reading** (optimal line length) |
| `container.content` | `48rem` (768px) | Standard article content |
| `container.wide` | `64rem` (1024px) | Wide content with media |
| `container.max` | `80rem` (1280px) | Maximum site width |
| `container.full` | `100%` | Full-bleed content |

### The `65ch` Prose Width

Research shows optimal reading happens at 45–75 characters per line. `65ch` targets the sweet spot. This is a **character-based** measurement—it adapts to font size.

### Usage Examples

```css
/* Long-form article body */
.article-body { max-width: var(--container-prose); }

/* Site layout */
.site-wrapper { max-width: var(--container-max); margin: 0 auto; }

/* Full-bleed hero */
.hero { max-width: var(--container-full); }
```

---

## 4. Prose Styles

### Philosophy

Typography tokens (Phase 1) define individual text styles. Prose tokens define **the experience of sustained reading**. They optimize:
- Line length (already set via `container.prose`)
- Paragraph spacing
- Heading rhythm within text flow
- List and blockquote integration

### Token Specification

| Token | Value | Purpose |
|-------|-------|---------|
| `prose.p-spacing` | `1.5em` | Space between paragraphs |
| `prose.heading-mt` | `2em` | Margin-top for headings in prose |
| `prose.heading-mb` | `0.75em` | Margin-bottom for headings in prose |
| `prose.list-pl` | `1.5em` | List padding-left |
| `prose.list-spacing` | `0.5em` | Space between list items |
| `prose.blockquote-pl` | `1em` | Blockquote padding-left |
| `prose.hr-my` | `3em` | Horizontal rule vertical margin |

### Prose Class

These tokens compose into a `.prose` utility class:

```css
.prose {
  max-width: var(--container-prose);
}

.prose > p + p {
  margin-top: var(--prose-p-spacing);
}

.prose > h2, .prose > h3, .prose > h4 {
  margin-top: var(--prose-heading-mt);
  margin-bottom: var(--prose-heading-mb);
}

.prose > ul, .prose > ol {
  padding-left: var(--prose-list-pl);
}

.prose > li + li {
  margin-top: var(--prose-list-spacing);
}

.prose > blockquote {
  padding-left: var(--prose-blockquote-pl);
}

.prose > hr {
  margin-top: var(--prose-hr-my);
  margin-bottom: var(--prose-hr-my);
}
```

---

## 5. Icon Sizes

### Philosophy

Icons should align with the type scale. An icon next to `type-body` text should feel **naturally proportioned**—not squeezed or dominant.

### Token Specification

| Token | Value | Pairs With |
|-------|-------|------------|
| `icon.xs` | `0.75rem` (12px) | caption, label |
| `icon.sm` | `1rem` (16px) | body-sm |
| `icon.md` | `1.25rem` (20px) | body |
| `icon.lg` | `1.5rem` (24px) | h4 |
| `icon.xl` | `2rem` (32px) | h3 |
| `icon.2xl` | `2.5rem` (40px) | h2, display elements |

### Alignment Tip

For inline icons next to text, use `vertical-align: -0.125em` to optically center the icon with the x-height of the text.

---

## 6. Aspect Ratios

### Philosophy

Media without defined proportions cause layout shift and inconsistency. Aspect ratio tokens ensure images, videos, and embeds maintain predictable shapes.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `aspect.square` | `1 / 1` | Thumbnails, avatars |
| `aspect.photo` | `4 / 3` | Standard photography |
| `aspect.video` | `16 / 9` | Video embeds, hero images |
| `aspect.wide` | `21 / 9` | Cinematic, ultra-wide heroes |
| `aspect.portrait` | `3 / 4` | Portrait photography |
| `aspect.story` | `9 / 16` | Mobile-first story format |

### Usage

```css
.video-embed {
  aspect-ratio: var(--aspect-video);
}

.thumbnail {
  aspect-ratio: var(--aspect-square);
}
```

---

## 7. Interactive State Tokens

### Philosophy

Phases 1–5 covered the primary states (default, hover, active, focus, disabled). Production components need additional states:

### Token Specification

**Selected State** (for selectable items like tabs, toggles, list items):

| Token | Value |
|-------|-------|
| `selected.bg` | `ground.secondary` |
| `selected.text` | `figure.primary` |
| `selected.border` | `action.primary` |

**Loading State** (for async operations):

| Token | Value |
|-------|-------|
| `loading.opacity` | `0.6` |
| `loading.cursor` | `wait` |

**Dragging State** (for drag-and-drop):

| Token | Value |
|-------|-------|
| `dragging.shadow` | `shadow.lg` |
| `dragging.opacity` | `0.8` |
| `dragging.scale` | `1.02` |

---

## Implementation Order

1. **Shadows** — Most impactful. Components like Card, Modal, Dropdown need them immediately.
2. **Z-Index** — Required for Modal, Dropdown, Tooltip, Toast to stack correctly.
3. **Container Widths** — Layout components need this for article/page structure.
4. **Prose Styles** — Essential for the blog's primary use case: long-form reading.
5. **Aspect Ratios** — Required for media components (Figure, Video, Hero).
6. **Icon Sizes** — Lower priority; can be added when Icon component is built.
7. **Interactive States** — Extend existing components as needed.

---

## Success Criteria

- [ ] Shadow tokens integrated into Card, Modal, Dropdown, Toast components
- [ ] Z-index tokens used consistently across all elevated components
- [ ] Container width tokens available in Tailwind config
- [ ] `.prose` class available and documented in Storybook
- [ ] Aspect ratio tokens available for media components
- [ ] No arbitrary z-index or shadow values in component code

---

*"A system is not complete when there is nothing left to add, but when there is nothing left to take away—except for the things that were never there in the first place."*
