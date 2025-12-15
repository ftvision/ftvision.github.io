# Phase 4: Color Palette

## Philosophy

### Color is Information

In brutalist design, color is not decoration. It is not branding. It is not mood.

Color is **information**.

Black on white maximizes contrast and legibility. A single accent color draws attention to exactly one thing. Status colors (red, green) communicate states without interpretation. Everything else is noise.

### The Brutalist Color Ethos

**1. Monochrome is the Foundation**

The brutalist palette starts with black and white. Not charcoal. Not off-white. Pure black (#000000) and pure white (#FFFFFF). Everything you need to read is rendered in these two colors. Grayscale exists for secondary information, never for primary content.

**2. One Accent, Used Sparingly**

One saturated color is permitted. It marks:
- Interactive elements (buttons, links)
- Critical emphasis
- Selected states

The accent color is functional. It says "pay attention here." If everything has color, nothing has emphasis.

**3. Status Colors Are Functional**

Red means danger/error. Green means success. Yellow means warning. Blue means information. These are conventions, not design choices. We use them because they work, not because they're beautiful.

---

## Architecture

### The Monochrome Base

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `ground.primary` | #FFFFFF (white) | #000000 (black) | Primary background |
| `ground.secondary` | #F5F5F5 (near-white) | #0A0A0A (near-black) | Elevated surfaces, cards |
| `ground.tertiary` | #E5E5E5 (light gray) | #1A1A1A (dark gray) | Deeper nesting |
| `ground.inverse` | #000000 | #FFFFFF | Inverted sections |

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `figure.primary` | #000000 (black) | #FFFFFF (white) | Primary text |
| `figure.secondary` | #333333 | #CCCCCC | Secondary text |
| `figure.muted` | #666666 | #999999 | Tertiary text, metadata |
| `figure.inverse` | #FFFFFF | #000000 | Text on inverse backgrounds |

**Note:** These are pure values. No warm grays. No blue-tinted blacks. Brutalism does not color-correct.

### Border Colors

Borders are structural, not decorative:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `border.default` | #000000 | #FFFFFF | Standard borders (visible!) |
| `border.muted` | #CCCCCC | #333333 | Subtle divisions |
| `border.strong` | #000000 | #FFFFFF | Emphasis (same as default, thicker) |

**The brutalist border philosophy:**
- Borders are **black** (or white in dark mode)
- Borders are **thick** (2px minimum, often 4px)
- Borders are always **visible**

### The Single Accent

Brutalism permits one accent color. The choice depends on the desired feel:

| Option | Hex | Character |
|--------|-----|-----------|
| **Electric Red** | #FF0000 | Urgent, industrial |
| **Cyber Yellow** | #FFFF00 | Warning, construction |
| **Terminal Cyan** | #00FFFF | Technical, digital |
| **Pure Blue** | #0000FF | Classic web, early internet |
| **Hot Magenta** | #FF00FF | Bold, unapologetic |

**Recommended: Electric Red (#FF0000)**

Why red:
- Maximum urgency
- High visibility on both black and white
- References warning/industrial signage
- Unmistakably intentional

| Token | Value | Usage |
|-------|-------|-------|
| `accent.primary` | #FF0000 (red) | Links, buttons, emphasis |
| `accent.hover` | #CC0000 (darker red) | Hover states |
| `accent.active` | #990000 (even darker) | Active/pressed states |

### Status Colors

Functional colors for system states:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `status.info` | #0000FF | #66B2FF | Information states |
| `status.info-bg` | #E6E6FF | #001A33 | Info backgrounds |
| `status.success` | #008000 | #66FF66 | Success states |
| `status.success-bg` | #E6FFE6 | #003300 | Success backgrounds |
| `status.warning` | #FFD700 | #FFD700 | Warning states |
| `status.warning-bg` | #FFFBE6 | #332600 | Warning backgrounds |
| `status.danger` | #FF0000 | #FF6666 | Error states |
| `status.danger-bg` | #FFE6E6 | #330000 | Error backgrounds |

**Note:** In brutalism, status colors should be **pure** and **saturated**. No muted pastels.

### Action Colors

For interactive elements:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `action.primary` | #000000 | #FFFFFF | Primary buttons |
| `action.primary-hover` | #333333 | #E5E5E5 | Primary hover |
| `action.primary-text` | #FFFFFF | #000000 | Text on primary |
| `action.secondary` | transparent | transparent | Secondary buttons |
| `action.secondary-border` | #000000 | #FFFFFF | Secondary border |
| `action.secondary-hover` | #F5F5F5 | #1A1A1A | Secondary hover |

**Primary buttons are inverted by default.** A black button on white page. A white button on black page. Maximum contrast.

---

## Extended Palette

### Surface Colors

For distinct content regions:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `surface.code` | #F5F5F5 | #0A0A0A | Code block backgrounds |
| `surface.quote` | #F5F5F5 | #0A0A0A | Blockquote backgrounds |
| `surface.highlight` | #FFFF00 | #FFFF00 | Text selection (yellow!) |
| `surface.elevated` | #FFFFFF | #0A0A0A | Cards, elevated elements |

### Link Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `link.default` | #FF0000 | #FF0000 | Unvisited links (accent) |
| `link.hover` | #CC0000 | #CC0000 | Hover state |
| `link.visited` | #800080 | #CC66CC | Visited links |
| `link.active` | #CC0000 | #CC0000 | Active/pressed |

**Note:** Links use the accent color. They are always underlined. No hover underlines—underlines are permanent.

### Focus Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `focus.ring` | #FF0000 | #FF0000 | Focus indicator (accent) |
| `focus.offset` | #FFFFFF | #000000 | Ring offset background |

Focus rings in brutalism are **thick** (3px) and use the **accent color** (or black for non-interactive).

### Overlay Colors

| Token | Value | Usage |
|-------|-------|-------|
| `overlay.scrim` | rgba(0, 0, 0, 0.8) | Modal backdrop (heavy) |
| `overlay.light` | rgba(255, 255, 255, 0.8) | Light overlay |

**Note:** Brutalist overlays are heavy. 50% opacity feels tentative. 80% opacity is decisive.

---

## Color Rules

### What Brutalism Does NOT Use

1. **Gradients** — Gradients are decorative. Backgrounds are solid.
2. **Opacity tricks** — No rgba for "subtle" effects. Colors are either there or not.
3. **Color for warmth** — No warm grays to "soften" the interface.
4. **Multiple accent colors** — One accent. If you need another, question the design.
5. **Desaturated accents** — Accent colors are full saturation.

### Color Application Patterns

**The Card Pattern:**
```
┌─────────────────────────────────────┐
│ CARD TITLE                          │  ← figure.primary (black)
│                                     │
│ Card content in black text on       │  ← figure.primary
│ white background.                   │
│                                     │
│ [ACTION BUTTON]                     │  ← Black button, white text
└─────────────────────────────────────┘
     ↑ border: 2px solid black (border.default)
```

**The Callout Pattern:**
```
┌─────────────────────────────────────┐
│ ████████████████████████████████████│  ← ground.inverse (black bar)
│ █  WARNING MESSAGE                 █│  ← figure.inverse (white text)
│ ████████████████████████████████████│
└─────────────────────────────────────┘
```

**The Link Pattern:**
```
This is body text with an [inline link](#) that is
red and underlined. Always underlined.
                    ↑ accent.primary + text-decoration: underline
```

---

## Implementation Plan

### Step 1: Define Color Primitives

**File**: `packages/tokens/src/primitives/colors.json`

Add pure brutalist colors:

```json
{
  "primitive": {
    "color": {
      "pure": {
        "black": { "value": "#000000" },
        "white": { "value": "#FFFFFF" },
        "red": { "value": "#FF0000" },
        "yellow": { "value": "#FFFF00" },
        "cyan": { "value": "#00FFFF" },
        "blue": { "value": "#0000FF" },
        "green": { "value": "#008000" },
        "magenta": { "value": "#FF00FF" }
      },
      "gray": {
        "50": { "value": "#F5F5F5" },
        "100": { "value": "#E5E5E5" },
        "200": { "value": "#CCCCCC" },
        "300": { "value": "#999999" },
        "400": { "value": "#666666" },
        "500": { "value": "#333333" },
        "600": { "value": "#1A1A1A" },
        "700": { "value": "#0A0A0A" }
      }
    }
  }
}
```

### Step 2: Create Brutalism Light Theme

**File**: `packages/tokens/src/themes/brutalism/light.json`

```json
{
  "color": {
    "ground": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "secondary": { "value": "{primitive.color.gray.50}" },
      "tertiary": { "value": "{primitive.color.gray.100}" },
      "inverse": { "value": "{primitive.color.pure.black}" }
    },
    "figure": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "secondary": { "value": "{primitive.color.gray.500}" },
      "muted": { "value": "{primitive.color.gray.400}" },
      "inverse": { "value": "{primitive.color.pure.white}" }
    },
    "border": {
      "default": { "value": "{primitive.color.pure.black}" },
      "muted": { "value": "{primitive.color.gray.200}" },
      "strong": { "value": "{primitive.color.pure.black}" }
    },
    "accent": {
      "primary": { "value": "{primitive.color.pure.red}" },
      "hover": { "value": "#CC0000" },
      "active": { "value": "#990000" }
    },
    "action": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "primary-hover": { "value": "{primitive.color.gray.500}" },
      "primary-text": { "value": "{primitive.color.pure.white}" },
      "secondary": { "value": "transparent" },
      "secondary-hover": { "value": "{primitive.color.gray.50}" }
    }
  }
}
```

### Step 3: Create Brutalism Dark Theme

**File**: `packages/tokens/src/themes/brutalism/dark.json`

```json
{
  "color": {
    "ground": {
      "primary": { "value": "{primitive.color.pure.black}" },
      "secondary": { "value": "{primitive.color.gray.700}" },
      "tertiary": { "value": "{primitive.color.gray.600}" },
      "inverse": { "value": "{primitive.color.pure.white}" }
    },
    "figure": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "secondary": { "value": "{primitive.color.gray.200}" },
      "muted": { "value": "{primitive.color.gray.300}" },
      "inverse": { "value": "{primitive.color.pure.black}" }
    },
    "border": {
      "default": { "value": "{primitive.color.pure.white}" },
      "muted": { "value": "{primitive.color.gray.500}" },
      "strong": { "value": "{primitive.color.pure.white}" }
    },
    "accent": {
      "primary": { "value": "{primitive.color.pure.red}" },
      "hover": { "value": "#FF3333" },
      "active": { "value": "#FF6666" }
    },
    "action": {
      "primary": { "value": "{primitive.color.pure.white}" },
      "primary-hover": { "value": "{primitive.color.gray.100}" },
      "primary-text": { "value": "{primitive.color.pure.black}" },
      "secondary": { "value": "transparent" },
      "secondary-hover": { "value": "{primitive.color.gray.600}" }
    }
  }
}
```

### Step 4: Update Tailwind Configuration

**File**: `packages/ui/tailwind.config.js` (brutalism preset)

```js
colors: {
  ground: {
    primary: 'var(--color-ground-primary)',
    secondary: 'var(--color-ground-secondary)',
    tertiary: 'var(--color-ground-tertiary)',
    inverse: 'var(--color-ground-inverse)',
  },
  figure: {
    primary: 'var(--color-figure-primary)',
    secondary: 'var(--color-figure-secondary)',
    muted: 'var(--color-figure-muted)',
    inverse: 'var(--color-figure-inverse)',
  },
  border: {
    DEFAULT: 'var(--color-border-default)',
    muted: 'var(--color-border-muted)',
    strong: 'var(--color-border-strong)',
  },
  accent: {
    primary: 'var(--color-accent-primary)',
    hover: 'var(--color-accent-hover)',
    active: 'var(--color-accent-active)',
  },
  // ... action, status, surface, link, focus
}
```

### Step 5: Document Color Usage

**File**: `packages/ui/docs/brutalism_theme/04a_COLOR_SWATCHES.md`

Visual documentation:
- Complete swatch chart
- Light/dark mode comparison
- Contrast ratios for all pairings
- Do's and don'ts

---

## Success Criteria

1. **Pure Values**: All primary colors use pure hex values (no alpha, no gradients)
2. **Contrast Compliance**: All text/background pairings meet WCAG AA (this is easy with pure black/white)
3. **Single Accent**: Only one saturated accent color in the palette
4. **Theme Parity**: Light and dark modes are true inverses
5. **Token Compliance**: Zero hardcoded colors in components
6. **Build Integration**: All tokens compile without errors

---

## Open Questions

1. **Accent Choice**: Should the default accent be red, or should we offer multiple brutalist accent palettes (red, yellow, cyan)?

2. **Pure Black Accessibility**: Pure black (#000) on pure white (#FFF) has maximum contrast (21:1) but can cause eye strain for some users. Should we soften slightly in an "accessible brutalism" variant?

3. **Selection Color**: Yellow highlight (#FFFF00) is very bright. Is this too aggressive for text selection?

4. **Link Underlines**: Should links use underlines, or a border-bottom for more control over offset?

---

## The Destination

When this system is complete, color serves only function:

```tsx
// ❌ Decorative, arbitrary
<div className="bg-slate-50 text-slate-700 border-slate-200">

// ✓ Functional, intentional
<div className="bg-ground-primary text-figure-primary border-border">
  <a className="text-accent-primary underline">This is a link</a>
  <button className="bg-action-primary text-action-primary-text">
    ACTION
  </button>
</div>
```

Black. White. One accent. Nothing else needed.

---

*"Less is more."*
— Ludwig Mies van der Rohe

In brutalist color, less isn't a choice. It's a discipline.
