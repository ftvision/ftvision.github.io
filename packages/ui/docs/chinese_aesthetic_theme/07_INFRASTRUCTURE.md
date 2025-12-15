# Phase 7: Infrastructure Tokens

> The invisible scaffolding of the scholar's studio.

## Overview

Phases 1–6 established the expressive vocabulary: type, color, spacing, motion, accessibility, components. But production layouts need **structural vocabulary**—the tokens that control depth, layering, containment, and proportion.

In the scholar's studio, the invisible infrastructure matters: how scrolls are stored, how light falls, how the room is organized. Our infrastructure tokens are the digital equivalent—unseen but essential.

---

## 1. Elevation (Shadows / 影)

### Philosophy

*影随形生* (yǐng suí xíng shēng) — "Shadow follows form."

In traditional Chinese painting, shadows are rarely depicted directly. Instead, depth is suggested through atmospheric perspective, overlapping forms, and value gradients. Our shadows should feel like ink wash—soft, diffuse, organic—not harsh drop shadows.

### Token Specification

Shadows in this theme are softer and warmer than typical UI shadows:

| Token | Use Case | Light Mode | Dark Mode |
|-------|----------|------------|-----------|
| `shadow.none` | Reset, flat elements | `none` | `none` |
| `shadow.ink-sm` | Subtle lift | `0 1px 3px rgba(26,26,26,0.05)` | `0 1px 3px rgba(0,0,0,0.3)` |
| `shadow.ink-md` | Interactive elements | `0 4px 12px rgba(26,26,26,0.08)` | `0 4px 12px rgba(0,0,0,0.4)` |
| `shadow.ink-lg` | Elevated panels | `0 8px 24px rgba(26,26,26,0.1)` | `0 8px 24px rgba(0,0,0,0.5)` |
| `shadow.ink-xl` | Maximum elevation | `0 16px 48px rgba(26,26,26,0.12)` | `0 16px 48px rgba(0,0,0,0.6)` |

**Key differences from standard shadows:**
- Warmer base color (ink-tinted, not pure black)
- Softer blur (larger blur radius for same offset)
- Lower opacity in light mode (subtler effect)
- Higher opacity in dark mode (shadows need strength on dark surfaces)

### Shadow Character

Our shadows should feel like:
- **Ink wash**: Soft edges, gradual falloff
- **Paper lifting**: Cards feel like sheets lifting from the surface
- **Stone depth**: In dark mode, shadows suggest depth in rock

```css
/* Example: Card shadow progression */
.card {
  box-shadow: var(--shadow-ink-sm);
  transition: box-shadow var(--motion-duration-swift) var(--motion-easing-lift);
}

.card:hover {
  box-shadow: var(--shadow-ink-md);
}
```

### Usage Guidelines

| Context | Shadow Token |
|---------|--------------|
| Card at rest | `shadow.none` or `shadow.ink-sm` |
| Card on hover | `shadow.ink-md` |
| Dropdown menu | `shadow.ink-md` |
| Sticky header | `shadow.ink-sm` |
| Modal | `shadow.ink-xl` |
| Toast notification | `shadow.ink-lg` |
| Tooltip | `shadow.ink-md` |

---

## 2. Z-Index Scale (层叠 / Layering)

### Philosophy

*层峦叠嶂* (céng luán dié zhàng) — "Layered peaks and ridges."

Chinese landscape paintings create depth through layered planes—near mountains dark and detailed, distant mountains faint and simplified. Our z-index system encodes this layering explicitly.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `z.base` | `0` | Default stacking context |
| `z.raised` | `10` | Cards, slightly elevated content |
| `z.dropdown` | `100` | Dropdown menus, select options |
| `z.sticky` | `200` | Sticky headers, fixed sidebars |
| `z.overlay` | `300` | Overlay backgrounds, scrims |
| `z.modal` | `400` | Modal dialogs, sheets |
| `z.popover` | `500` | Popovers (must clear modals) |
| `z.tooltip` | `600` | Tooltips (always on top) |
| `z.toast` | `700` | Toast notifications |
| `z.landscape` | `800` | Scroll progress landscape (fixed) |
| `z.max` | `9999` | Emergency escape hatch |

### Stacking Visualization

```
Scroll progress landscape ─── z.landscape (800)
Toast notifications       ─── z.toast (700)
Tooltips                  ─── z.tooltip (600)
Popovers                  ─── z.popover (500)
Modals                    ─── z.modal (400)
Overlays/Scrims           ─── z.overlay (300)
Sticky headers            ─── z.sticky (200)
Dropdowns                 ─── z.dropdown (100)
Raised cards              ─── z.raised (10)
Base content              ─── z.base (0)
```

### Guidelines

1. **Use semantic tokens**, never raw numbers
2. **Prefer lower values**—most elements should be `z.base` or `z.raised`
3. **`z.max` is a code smell**—indicates broken stacking context

---

## 3. Container Widths (容器 / Containment)

### Philosophy

*方寸之间* (fāng cùn zhī jiān) — "Within a square inch."

Chinese artists created entire landscapes within small formats—album leaves, hand scrolls. Containment is not limitation; it is focus. Our container widths define the boundaries within which content breathes.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `container.xs` | `20rem` (320px) | Mobile-first minimum |
| `container.sm` | `24rem` (384px) | Small cards, narrow sidebars |
| `container.md` | `32rem` (512px) | Medium content blocks |
| `container.prose` | `42rem` (672px) | **Long-form reading** (wider for CJK) |
| `container.content` | `48rem` (768px) | Standard article with media |
| `container.wide` | `64rem` (1024px) | Wide content layouts |
| `container.max` | `80rem` (1280px) | Maximum site width |
| `container.full` | `100%` | Full-bleed content |

### The `42rem` Prose Width

Standard Western recommendation is `65ch` (~65 characters). For Chinese content:
- Chinese characters are approximately 1.5× wider than Latin letters
- Optimal Chinese reading: 35-45 characters per line
- `42rem` accommodates both scripts comfortably

### Annotation Layout Width

For the scholarly annotation layout (main + margin):

| Token | Value | Purpose |
|-------|-------|---------|
| `container.main-column` | `70%` | Primary content |
| `container.annotation-column` | `30%` | Margin annotations |
| `container.annotation-gap` | `2rem` | Gap between columns |

---

## 4. Prose Styles (文章排版)

### Philosophy

*书卷气* (shūjuàn qì) — "The air of books and scrolls."

Prose styling creates the experience of sustained reading—the gentle rhythm of paragraph following paragraph, the clear markers of sections, the integration of figures and quotes.

### Token Specification

| Token | Value | Purpose |
|-------|-------|---------|
| `prose.p-spacing` | `1.5em` | Space between paragraphs |
| `prose.heading-mt` | `2.5em` | Margin-top for headings in prose |
| `prose.heading-mb` | `0.75em` | Margin-bottom for headings |
| `prose.list-pl` | `1.5em` | List padding-left |
| `prose.list-spacing` | `0.75em` | Space between list items |
| `prose.blockquote-pl` | `1.25em` | Blockquote padding-left |
| `prose.blockquote-my` | `2em` | Blockquote vertical margin |
| `prose.figure-my` | `2.5em` | Figure vertical margin |
| `prose.hr-my` | `3em` | Horizontal rule vertical margin |
| `prose.code-py` | `1em` | Code block vertical padding |
| `prose.code-px` | `1.25em` | Code block horizontal padding |

### The `.prose` Class

These tokens compose into a prose utility:

```css
.prose {
  max-width: var(--container-prose);
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--font-line-height-body);
  color: var(--color-text-primary);
}

.prose > p + p {
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
  margin-top: var(--prose-p-spacing);
  margin-bottom: var(--prose-p-spacing);
}

.prose > li + li {
  margin-top: var(--prose-list-spacing);
}

.prose > blockquote {
  padding-left: var(--prose-blockquote-pl);
  margin-top: var(--prose-blockquote-my);
  margin-bottom: var(--prose-blockquote-my);
  border-left: 3px solid var(--color-accent-primary);
}

.prose > figure {
  margin-top: var(--prose-figure-my);
  margin-bottom: var(--prose-figure-my);
}

.prose > hr {
  margin-top: var(--prose-hr-my);
  margin-bottom: var(--prose-hr-my);
  border: none;
  border-top: 1px solid var(--color-border-muted);
}

.prose > pre {
  padding: var(--prose-code-py) var(--prose-code-px);
  margin-top: var(--prose-p-spacing);
  margin-bottom: var(--prose-p-spacing);
  background: var(--color-surface-code);
  border-radius: var(--radius-md);
  overflow-x: auto;
}
```

---

## 5. Aspect Ratios (比例)

### Philosophy

*黄金分割* (huángjīn fēngē) — "Golden division."

Traditional Chinese painting uses distinctive proportions—hand scrolls are extremely horizontal (often 10:1 or more), hanging scrolls are tall and vertical. We provide ratios for both traditional and modern formats.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `aspect.square` | `1 / 1` | Thumbnails, avatars, seal stamps |
| `aspect.photo` | `4 / 3` | Standard photography |
| `aspect.video` | `16 / 9` | Video embeds, hero images |
| `aspect.wide` | `21 / 9` | Cinematic, ultra-wide heroes |
| `aspect.portrait` | `3 / 4` | Portrait photography |
| `aspect.story` | `9 / 16` | Mobile-first story format |
| `aspect.handscroll` | `3 / 1` | Horizontal scroll format (卷轴) |
| `aspect.hanging` | `1 / 2` | Vertical scroll format (挂轴) |
| `aspect.album` | `5 / 4` | Album leaf format (册页) |

### Traditional Format Usage

```css
/* Hero banner in hand scroll format */
.hero-handscroll {
  aspect-ratio: var(--aspect-handscroll);
  overflow: hidden;
}

/* Portrait image in hanging scroll format */
.portrait-hanging {
  aspect-ratio: var(--aspect-hanging);
}
```

---

## 6. Border Radius (圆角)

### Philosophy

Chinese aesthetic balances sharp and soft—the corner of a scholar's desk is sharp, but jade is polished smooth. Our radii are subtle, never pill-shaped.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `radius.none` | `0` | Sharp corners (structured elements) |
| `radius.sm` | `0.25rem` (4px) | Subtle rounding (inputs) |
| `radius.md` | `0.5rem` (8px) | Standard rounding (cards, buttons) |
| `radius.lg` | `0.75rem` (12px) | Generous rounding (modals) |
| `radius.xl` | `1rem` (16px) | Prominent rounding |
| `radius.full` | `9999px` | Circular elements (avatars, seal stamps) |

### Guidelines

- **Cards**: `radius.md`
- **Buttons**: `radius.sm` or `radius.md`
- **Inputs**: `radius.sm`
- **Modals**: `radius.lg`
- **Seal stamps**: `radius.full` (circular) or `radius.none` (square)

---

## 7. Border Widths (边框)

### Philosophy

*勾勒* (gōulè) — "Outline drawing."

In Chinese painting, the outline can be bold or fine, present or absent. Our border widths follow this flexibility.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `border.none` | `0` | No border |
| `border.hairline` | `0.5px` | Barely visible dividers |
| `border.thin` | `1px` | Standard borders |
| `border.medium` | `2px` | Emphasized borders |
| `border.thick` | `3px` | Blockquote markers, strong emphasis |
| `border.brush` | `4px` | Brush-stroke-like borders |

---

## 8. Opacity Scale (透明度)

### Philosophy

*虚实* (xū shí) — "Empty and solid."

Opacity creates the atmospheric perspective of Chinese painting—distant elements fade, near elements are solid.

### Token Specification

| Token | Value | Use Case |
|-------|-------|----------|
| `opacity.transparent` | `0` | Fully transparent |
| `opacity.ghost` | `0.05` | Barely visible (hover hints) |
| `opacity.faint` | `0.1` | Subtle overlays |
| `opacity.mist` | `0.3` | Atmospheric distance |
| `opacity.haze` | `0.5` | Scrim overlays |
| `opacity.translucent` | `0.7` | Prominent overlays |
| `opacity.solid` | `1` | Fully opaque |

---

## 9. Breakpoints (断点)

### Philosophy

Responsive design adapts to the scroll being viewed—on a narrow mobile screen or a wide desktop monitor.

### Token Specification

| Token | Value | Description |
|-------|-------|-------------|
| `breakpoint.sm` | `640px` | Small devices (large phones) |
| `breakpoint.md` | `768px` | Medium devices (tablets) |
| `breakpoint.lg` | `1024px` | Large devices (laptops) |
| `breakpoint.xl` | `1280px` | Extra large (desktops) |
| `breakpoint.2xl` | `1536px` | Very large displays |

### Responsive Behavior Notes

- **Margin notes**: Collapse to inline on `< breakpoint.lg`
- **Scroll progress**: Simplified or hidden on `< breakpoint.md`
- **留白 spacing**: Reduced (but still generous) on mobile
- **Annotation layout**: Single column on `< breakpoint.lg`

---

## 10. Interactive State Tokens (状态)

### Extended States

Beyond hover/active/focus/disabled, we need:

**Selected State** (for selectable items):
| Token | Value |
|-------|-------|
| `selected.bg` | `surface.aside` |
| `selected.text` | `text.primary` |
| `selected.border` | `seal.red` |

**Loading State**:
| Token | Value |
|-------|-------|
| `loading.opacity` | `0.6` |
| `loading.cursor` | `wait` |

**Reading Mode State** (Tea Time mode):
| Token | Value |
|-------|-------|
| `reading.text-scale` | `1.1` |
| `reading.spacing-scale` | `1.25` |
| `reading.opacity-muted` | `0.5` |

---

## Implementation Order

1. **Shadows** — Cards, modals, dropdowns need them immediately
2. **Z-Index** — Required for stacking overlay components
3. **Container Widths** — Layout foundation
4. **Prose Styles** — Essential for blog primary use case
5. **Border Radius** — Standard component styling
6. **Aspect Ratios** — Media component support
7. **Breakpoints** — Responsive implementation
8. **Border Widths & Opacity** — Refinement tokens
9. **Interactive States** — Extended interaction support

---

## Implementation Plan

### Step 1: Create Infrastructure Primitives

**File**: `packages/tokens/src/primitives/infrastructure.json`

```json
{
  "primitive": {
    "shadow": {
      "ink-sm": { "value": "0 1px 3px rgba(26,26,26,0.05)" },
      "ink-md": { "value": "0 4px 12px rgba(26,26,26,0.08)" },
      "ink-lg": { "value": "0 8px 24px rgba(26,26,26,0.1)" },
      "ink-xl": { "value": "0 16px 48px rgba(26,26,26,0.12)" }
    },
    "radius": {
      "none": { "value": "0" },
      "sm": { "value": "0.25rem" },
      "md": { "value": "0.5rem" },
      "lg": { "value": "0.75rem" },
      "xl": { "value": "1rem" },
      "full": { "value": "9999px" }
    },
    "z": {
      "base": { "value": "0" },
      "raised": { "value": "10" },
      "dropdown": { "value": "100" },
      "sticky": { "value": "200" },
      "overlay": { "value": "300" },
      "modal": { "value": "400" },
      "popover": { "value": "500" },
      "tooltip": { "value": "600" },
      "toast": { "value": "700" },
      "landscape": { "value": "800" },
      "max": { "value": "9999" }
    }
  }
}
```

### Step 2: Create Semantic Infrastructure Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/infrastructure.json`

Map primitives to semantic names and add theme-specific values.

### Step 3: Create Prose CSS

**File**: `packages/ui/src/styles/prose.css`

Implement the `.prose` class with all prose tokens.

### Step 4: Update Tailwind Configuration

Add all infrastructure tokens to Tailwind config.

### Step 5: Document Infrastructure

**File**: `packages/ui/docs/chinese_aesthetic_theme/07a_INFRASTRUCTURE_GUIDE.md`

Document usage patterns and guidelines.

---

## Success Criteria

- [ ] Ink shadows integrated into Card, Modal, Dropdown, Toast
- [ ] Z-index tokens used consistently across elevated components
- [ ] Container widths available and documented
- [ ] `.prose` class available and tested with CJK content
- [ ] Aspect ratios include traditional Chinese formats
- [ ] All breakpoints defined and documented
- [ ] No arbitrary infrastructure values in component code

---

## The Destination

When this phase is complete, layouts will feel like the invisible architecture of a scholar's studio—every element has its place, every space its purpose, every layer its meaning.

```tsx
<div className="container-max mx-auto">
  <article className="prose">
    <header className="mb-breath">
      {/* content */}
    </header>

    <div
      className="grid gap-annotation-gap"
      style={{
        gridTemplateColumns: 'var(--container-main-column) var(--container-annotation-column)'
      }}
    >
      <main className="max-w-prose">
        {/* main content */}
      </main>
      <aside className="sticky top-stack-xl">
        {/* margin notes */}
      </aside>
    </div>
  </article>
</div>
```

The infrastructure disappears. Only the content remains.

---

*"大巧若拙，大辩若讷。"*
*"Great skill appears clumsy; great eloquence seems like stammering."*
— 道德经 (Tao Te Ching)

The best infrastructure is invisible. It simply works.
