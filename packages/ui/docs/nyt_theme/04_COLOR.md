# Phase 4: Extended Color Palette

## Philosophy

### Color is Editorial Voice

At the New York Times, color is not decoration—it is rhetoric. A red accent on a breaking news banner says *urgent*. A muted sepia in a historical feature says *reflective*. The absence of color in body text says *trust the words*.

Our current token system handles the basics: backgrounds, text, borders, status indicators. But editorial journalism demands more. Data visualizations need coordinated palettes. Interactive elements need accent colors that guide without shouting. Pullquotes need subtle distinction. Code blocks need their own atmosphere.

### The NYT Color Ethos

**1. Restraint is the Default**

The grayscale is sacred. Black text on white paper has communicated news for centuries. Color enters only when it earns its place—to highlight, to differentiate, to signal. Never to decorate.

**2. Color Serves Function**

Every color must answer: *what job does this do?* If the answer is "it looks nice," the color should be removed. Acceptable jobs:
- Indicate interactivity (links, buttons)
- Communicate status (success, error, warning)
- Differentiate data (charts, visualizations)
- Create hierarchy (accent, highlight)

**3. Harmony Over Variety**

A limited, harmonious palette feels intentional. A rainbow of options feels chaotic. We define few colors, but we define them precisely—with clear relationships to each other.

---

## Architecture

### Current State

We have:
```
color.bg.*        → ground colors (primary, secondary, tertiary, inverse)
color.text.*      → figure colors (primary, secondary, muted, inverse)
color.border.*    → border colors (default, muted, strong)
color.action.*    → interactive colors (primary, primary-hover, secondary, secondary-hover)
color.status.*    → feedback colors (info, success, warning, danger + backgrounds)
```

### What's Missing

**1. Accent Colors** — For editorial highlights, data visualization, interactive storytelling

**2. Surface Variants** — For distinct content blocks (code, blockquotes, asides)

**3. Link States** — Visited links, active states

**4. Focus Colors** — Dedicated focus ring styling

**5. Overlay Colors** — For modals, image overlays, scrims

**6. Data Visualization Palette** — Coordinated colors for charts and graphics

---

## Extended Token Structure

### 1. Accent Colors

For highlighting, emphasis, and brand moments:

```
color.accent.primary      → Primary accent (restrained blue or brand color)
color.accent.secondary    → Secondary accent (complementary)
color.accent.tertiary     → Tertiary accent (for data viz variety)
```

**NYT Theme Values:**
- `accent.primary`: A restrained blue (`#326891`)—the classic NYT link blue
- `accent.secondary`: A warm gray or subtle gold for variety
- `accent.tertiary`: Reserved for data visualization

### 2. Surface Colors

For distinct content regions:

```
color.surface.code        → Code block backgrounds
color.surface.quote       → Blockquote backgrounds
color.surface.aside       → Sidebar/aside backgrounds
color.surface.highlight   → Text highlight/selection
color.surface.elevated    → Elevated cards (with shadow context)
```

**Light Mode:**
- `surface.code`: Warm gray (`#f7f7f5`)—slightly warm, distinct from cold UI gray
- `surface.quote`: Near-white with subtle warmth
- `surface.highlight`: Soft yellow (`#fff9c4`)

**Dark Mode:**
- `surface.code`: Deep gray with slight warmth
- `surface.quote`: Elevated from background
- `surface.highlight`: Muted gold

### 3. Link Colors

```
color.link.default        → Unvisited link
color.link.hover          → Link on hover
color.link.visited        → Visited link
color.link.active         → Link being clicked
```

**NYT Theme Values:**
- `link.default`: NYT blue (`#326891`)
- `link.hover`: Darker blue (`#1a4a6e`)
- `link.visited`: Muted purple-gray (`#6b5b7a`)
- `link.active`: Same as hover

### 4. Focus Colors

```
color.focus.ring          → Focus ring color
color.focus.ring-offset   → Offset background (usually page bg)
```

**Rationale:** Focus rings should be visible but not jarring. The NYT blue works, but at reduced opacity or with a subtle offset.

### 5. Overlay Colors

```
color.overlay.scrim       → Modal backdrop (black @ 50%)
color.overlay.light       → Light overlay for images with text
color.overlay.dark        → Dark overlay for images with text
```

### 6. Data Visualization Palette

A sequential and categorical palette for charts:

**Categorical (for distinct categories):**
```
color.data.1              → First data series
color.data.2              → Second data series
color.data.3              → Third data series
color.data.4              → Fourth data series
color.data.5              → Fifth data series
color.data.6              → Sixth data series
```

**Sequential (for gradients/heat maps):**
```
color.data.sequential.1   → Lightest
color.data.sequential.2
color.data.sequential.3
color.data.sequential.4
color.data.sequential.5   → Darkest
```

**Divergent (for positive/negative):**
```
color.data.divergent.negative   → Negative values
color.data.divergent.neutral    → Zero/neutral
color.data.divergent.positive   → Positive values
```

---

## Color Selection Principles

### The NYT Palette

The New York Times uses a restrained palette:

| Role | Hex | Notes |
|------|-----|-------|
| NYT Blue | `#326891` | Links, interactive elements |
| NYT Dark Blue | `#1a4a6e` | Hover states |
| NYT Black | `#121212` | Body text |
| NYT Gray | `#666666` | Secondary text |
| NYT Light Gray | `#f7f7f5` | Subtle backgrounds |
| NYT Red | `#d93a3a` | Breaking news, alerts |

### Accessibility Requirements

All color combinations must meet WCAG AA:
- Normal text: 4.5:1 contrast ratio minimum
- Large text (18px+): 3:1 contrast ratio minimum
- UI components: 3:1 against adjacent colors

**Known Issues to Fix:**
- `color.text.muted` (gray-400) fails on white backgrounds
- Must be adjusted to gray-500 or darker

### Dark Mode Considerations

Dark mode is not simply "invert everything." Principles:

1. **Reduce contrast slightly** — Pure white (#fff) on pure black (#000) is harsh. Use off-white on dark gray.
2. **Desaturate bright colors** — Saturated colors vibrate on dark backgrounds. Reduce saturation ~10-20%.
3. **Maintain semantic meaning** — Red still means danger, green still means success.
4. **Adjust surface hierarchy** — In dark mode, "elevated" surfaces are *lighter*, not darker.

---

## Implementation Plan

### Step 1: Extend Color Primitives

**File**: `packages/tokens/src/primitives/colors.json`

Add new primitive colors:
- NYT-specific blues (326891, 1a4a6e)
- Visited link purple
- Highlight yellows
- Data visualization palette (6 categorical + 5 sequential)

### Step 2: Create Extended Semantic Colors

**File**: `packages/tokens/src/semantic/base.json` (extend existing)

Add new semantic mappings:
- `color.accent.*`
- `color.surface.*`
- `color.link.*`
- `color.focus.*`
- `color.overlay.*`
- `color.data.*`

### Step 3: Update Theme Files

**Files**:
- `packages/tokens/src/themes/nyt/light.json`
- `packages/tokens/src/themes/nyt/dark.json`

Map the new semantic colors to appropriate values for each mode.

### Step 4: Fix Accessibility Issues

Audit and adjust:
- `color.text.muted`: Increase contrast
- `color.text.secondary`: Verify contrast
- All new colors: Run through contrast checker

### Step 5: Update Tailwind Configuration

**File**: `packages/ui/tailwind.config.js`

Add new color utilities:
```js
colors: {
  accent: {
    primary: 'var(--color-accent-primary)',
    secondary: 'var(--color-accent-secondary)',
    tertiary: 'var(--color-accent-tertiary)',
  },
  surface: {
    code: 'var(--color-surface-code)',
    quote: 'var(--color-surface-quote)',
    // ...
  },
  link: {
    DEFAULT: 'var(--color-link-default)',
    hover: 'var(--color-link-hover)',
    visited: 'var(--color-link-visited)',
  },
  // ...
}
```

### Step 6: Document Color Usage

**File**: `packages/ui/docs/nyt_theme/04a_COLOR_PALETTE.md`

Create visual documentation:
- Complete color swatches
- Contrast ratios for all pairings
- Usage guidelines
- Do's and don'ts

### Step 7: Create Color Stories

Add Storybook stories demonstrating:
- All color tokens in context
- Light/dark mode comparison
- Data visualization examples

---

## Success Criteria

1. **Completeness**: All six new color categories defined
2. **Accessibility**: Every foreground/background pairing meets WCAG AA
3. **Theme Parity**: Light and dark modes have equivalent coverage
4. **Build Integration**: All tokens compile without errors
5. **Tailwind Integration**: All colors available as utilities
6. **Documentation**: Visual color documentation complete
7. **Data Viz Ready**: Charts can be styled entirely with tokens

---

## Open Questions

1. **Brand Alignment**: Should `accent.primary` use the exact NYT blue, or a harmonious alternative that avoids trademark concerns?

2. **Color Naming**: Should data visualization colors have semantic names (`data.category.1`) or descriptive names (`data.blue`, `data.coral`)?

3. **Transparency**: Should we provide alpha variants (e.g., `overlay.scrim` as `rgba(0,0,0,0.5)` or as separate color + opacity tokens)?

4. **High Contrast Mode**: Should we provide a `prefers-contrast: high` variant with increased saturation and contrast?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Text colors apply to type; ensure contrast at all sizes |
| Phase 2 (Spacing) | No direct relationship |
| Phase 3 (Motion) | Color transitions are a primary motion use case |
| Phase 5 (Accessibility) | Color contrast is a core accessibility requirement |
| Phase 6 (Components) | Components consume all color tokens |

---

## The Destination

When this phase is complete, every color question has an answer:

```tsx
// ❌ Arbitrary colors, guesswork
<blockquote className="bg-gray-50 border-l-4 border-blue-500">
<pre className="bg-slate-100">
<a className="text-blue-600 visited:text-purple-600">

// ✓ Semantic colors, intentional
<blockquote className="bg-surface-quote border-l-4 border-accent-primary">
<pre className="bg-surface-code">
<a className="text-link hover:text-link-hover visited:text-link-visited">
```

The palette is no longer a suggestion. It is a vocabulary.

---

*"Color does not add a pleasant quality to design—it reinforces it."*
— Pierre Bonnard
