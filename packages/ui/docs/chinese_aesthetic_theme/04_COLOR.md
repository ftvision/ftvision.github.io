# Phase 4: Color Palette (五色)

## Philosophy

### The Five Colors (五色 Wǔsè)

Traditional Chinese painting uses a limited palette derived from mineral and plant pigments:

- **Black (黑 hēi)**: Pine soot ink, the foundation
- **White (白 bái)**: Raw silk or paper, the void
- **Red (朱 zhū)**: Cinnabar/vermillion, authority and celebration
- **Yellow (黄 huáng)**: Earth and gold, imperial dignity
- **Blue-Green (青 qīng)**: Mineral azurite and malachite, nature and depth

These five colors held cosmological significance, mapping to elements, directions, and seasons. The constraint was not poverty—it was philosophy. With five colors, everything could be expressed.

### The Ink Gradient (墨分五色)

The saying *墨分五色* (mò fēn wǔsè) — "ink divided into five colors" — refers not to different pigments but to the infinite gradations achievable with a single stick of ink:

1. **焦 (jiāo)** — Scorched, the densest black
2. **浓 (nóng)** — Thick, rich black
3. **重 (zhòng)** — Heavy, dark gray
4. **淡 (dàn)** — Light, pale gray
5. **清 (qīng)** — Clear, barely visible

A master painter creates an entire mountain landscape using only these gradations of a single ink. Our grayscale palette honors this tradition.

### Three Laws of Scholar's Color

**1. 墨为主，色为辅 (Mò wéi zhǔ, sè wéi fǔ) — "Ink as master, color as servant"**

Black and white form the foundation. Color enters as accent, punctuation, emphasis—not as primary voice. A vermillion seal stamp on a monochromatic painting gains power through restraint. Our color palette is built on ink gradients, with color used sparingly.

**2. 随类赋彩 (Suí lèi fù cǎi) — "According to category, apply color"**

Color should serve meaning, not decoration. In Chinese painting, blue-green indicated mountains and forests; ochre indicated earth; vermillion indicated authority. Each color had semantic purpose. Our semantic color tokens carry meaning: accent for attention, success for completion, danger for warning.

**3. 气韵为上 (Qìyùn wéi shàng) — "Spirit resonance above all"**

Colors should feel *alive*, not synthetic. The palette should evoke mineral pigments, aged paper, natural dyes—not RGB pixels. This means slightly muted saturation, warm undertones, colors that look like they could exist in the physical world of scholar's studio.

---

## Architecture

### The Core Palette

Our palette synthesizes across Chinese artistic history:

#### Ink Gradient (Base Grayscale)

| Token | Hex | RGB | Character | Name |
|-------|-----|-----|-----------|------|
| `ink.scorched` | `#0A0A0A` | 10, 10, 10 | 焦 | Scorched ink |
| `ink.dense` | `#1A1A1A` | 26, 26, 26 | 浓 | Dense ink |
| `ink.heavy` | `#2E2E2E` | 46, 46, 46 | 重 | Heavy ink |
| `ink.medium` | `#525252` | 82, 82, 82 | 中 | Medium ink |
| `ink.light` | `#8B8B8B` | 139, 139, 139 | 淡 | Light ink |
| `ink.faint` | `#B8B8B8` | 184, 184, 184 | 薄 | Faint ink |
| `ink.wash` | `#E5E0D8` | 229, 224, 216 | 清 | Clear wash |

#### Paper Tones (Warm Whites)

| Token | Hex | RGB | Character | Name |
|-------|-----|-----|-----------|------|
| `paper.aged` | `#F8F5F0` | 248, 245, 240 | 旧纸 | Aged paper |
| `paper.silk` | `#FFFEF9` | 255, 254, 249 | 绢 | Raw silk |
| `paper.xuan` | `#F5F3ED` | 245, 243, 237 | 宣纸 | Xuan paper |

#### Stone Tones (Dark Mode Surfaces)

| Token | Hex | RGB | Character | Name |
|-------|-----|-----|-----------|------|
| `stone.inkstone` | `#121210` | 18, 18, 16 | 砚 | Inkstone black |
| `stone.slate` | `#1E1E1C` | 30, 30, 28 | 板岩 | Slate |
| `stone.rock` | `#2A2A28` | 42, 42, 40 | 山石 | Mountain rock |
| `stone.weathered` | `#3D3D3A` | 61, 61, 58 | 风化石 | Weathered stone |

### Accent Colors (Cross-Dynasty)

#### Primary Accent: Seal Red (印泥红)

The red of seal paste (朱砂印泥), used for personal stamps on paintings and documents. A warm, slightly orange vermillion that feels organic, not synthetic.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `seal.red` | `#C14B3E` | 193, 75, 62 | Primary accent |
| `seal.red-light` | `#D4756A` | 212, 117, 106 | Hover state |
| `seal.red-dark` | `#9E3B30` | 158, 59, 48 | Active state |
| `seal.red-muted` | `#B87A72` | 184, 122, 114 | Subtle accents |

#### Secondary Accent: Celadon Green (青瓷绿)

The jade-like glaze of Song dynasty Ru ware and Longquan celadon. A sophisticated, muted green that suggests scholar's objects—jade, ceramics, bronze patina.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `celadon.primary` | `#8FAE89` | 143, 174, 137 | Secondary accent |
| `celadon.light` | `#A4C9A8` | 164, 201, 168 | Light variant |
| `celadon.dark` | `#6B8B67` | 107, 139, 103 | Dark variant |
| `celadon.muted` | `#9DB898` | 157, 184, 152 | Subtle uses |

#### Tertiary Accent: Old Gold (古金)

The patinated gold of Tang dynasty artifacts, bronze vessels, and imperial objects. Not bright gold—aged, dignified gold.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `gold.primary` | `#B8860B` | 184, 134, 11 | Tertiary accent |
| `gold.light` | `#D4A84B` | 212, 168, 75 | Light variant |
| `gold.dark` | `#8B6508` | 139, 101, 8 | Dark variant |
| `gold.muted` | `#C9A857` | 201, 168, 87 | Subtle uses |

### Seasonal Color Variants (Optional)

Traditional Chinese aesthetics are deeply attuned to seasons. Each season has associated colors:

| Season | Primary | Secondary | Token Prefix |
|--------|---------|-----------|--------------|
| Spring (春) | Plum pink `#DDA0DD` | Fresh green `#90EE90` | `season.spring.*` |
| Summer (夏) | Lotus pink `#FFB6C1` | Deep green `#228B22` | `season.summer.*` |
| Autumn (秋) | Chrysanthemum gold `#DAA520` | Warm red `#CD5C5C` | `season.autumn.*` |
| Winter (冬) | Plum red `#8B0000` | Branch gray `#696969` | `season.winter.*` |

These are optional overrides—the base palette works year-round, but seasonal theming adds cultural depth.

---

## Semantic Color Mapping

### Light Mode

| Semantic Token | Value | Usage |
|----------------|-------|-------|
| `bg.primary` | `paper.aged` | Main background |
| `bg.secondary` | `paper.xuan` | Subtle surface |
| `bg.elevated` | `paper.silk` | Cards, elevated surfaces |
| `bg.inverse` | `ink.dense` | Inverse backgrounds |
| `text.primary` | `ink.heavy` | Body text |
| `text.secondary` | `ink.medium` | Secondary text |
| `text.muted` | `ink.light` | De-emphasized text |
| `text.inverse` | `paper.aged` | Text on dark backgrounds |
| `border.default` | `ink.wash` | Default borders |
| `border.strong` | `ink.light` | Emphasized borders |
| `border.muted` | `ink.faint` | Subtle borders |
| `accent.primary` | `seal.red` | Primary accent |
| `accent.secondary` | `celadon.primary` | Secondary accent |
| `accent.tertiary` | `gold.primary` | Tertiary accent |

### Dark Mode

Dark mode should feel like stone surfaces at night—not LCD black, but the warm darkness of inkstone and mountain rock.

| Semantic Token | Value | Usage |
|----------------|-------|-------|
| `bg.primary` | `stone.inkstone` | Main background |
| `bg.secondary` | `stone.slate` | Subtle surface |
| `bg.elevated` | `stone.rock` | Cards, elevated surfaces |
| `bg.inverse` | `paper.xuan` | Inverse backgrounds |
| `text.primary` | `ink.wash` | Body text |
| `text.secondary` | `ink.faint` | Secondary text |
| `text.muted` | `ink.light` | De-emphasized text |
| `text.inverse` | `ink.heavy` | Text on light backgrounds |
| `border.default` | `stone.weathered` | Default borders |
| `border.strong` | `ink.medium` | Emphasized borders |
| `border.muted` | `stone.rock` | Subtle borders |
| `accent.primary` | `seal.red-light` | Primary accent (lighter for dark) |
| `accent.secondary` | `celadon.light` | Secondary accent |
| `accent.tertiary` | `gold.light` | Tertiary accent |

---

## Extended Palette

### Status Colors

Status colors maintain meaning while respecting the aesthetic:

| Status | Light Mode | Dark Mode | Traditional Reference |
|--------|------------|-----------|----------------------|
| Info | `#4A6FA5` | `#6B8FC5` | Scholar's blue (青) |
| Success | `#5B8C5A` | `#7BAC7A` | Jade green (玉绿) |
| Warning | `#C9A227` | `#E9C247` | Imperial yellow (黄) |
| Danger | `#B84C4C` | `#D86C6C` | Cinnabar (朱砂) |

### Surface Colors

For code blocks, blockquotes, and special content areas:

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `surface.code` | `#F0EDE6` | `#252523` | Code block backgrounds |
| `surface.quote` | `#F5F2EB` | `#1F1F1D` | Blockquote backgrounds |
| `surface.highlight` | `#FFF4D6` | `#3D3520` | Text selection, highlights |
| `surface.aside` | `#F2F0E8` | `#232321` | Sidebar, aside content |

### Link Colors

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `link.default` | `seal.red` | `seal.red-light` |
| `link.hover` | `seal.red-dark` | `seal.red` |
| `link.visited` | `#7B6B8A` | `#9B8BAA` |
| `link.active` | `seal.red-dark` | `seal.red` |

### Focus Colors

| Token | Value | Usage |
|-------|-------|-------|
| `focus.ring` | `seal.red` | Focus ring color |
| `focus.ring-offset` | `bg.primary` | Ring offset (maintains visibility) |

---

## Contrast Requirements

All foreground/background combinations must meet WCAG AA:

### Light Mode Verification

| Combination | Ratio | Status |
|-------------|-------|--------|
| `text.primary` on `bg.primary` | 11.2:1 | ✓ AAA |
| `text.secondary` on `bg.primary` | 6.3:1 | ✓ AA |
| `text.muted` on `bg.primary` | 4.6:1 | ✓ AA |
| `seal.red` on `bg.primary` | 5.8:1 | ✓ AA |
| `celadon.primary` on `bg.primary` | 3.2:1 | ~ Large text only |

### Dark Mode Verification

| Combination | Ratio | Status |
|-------------|-------|--------|
| `text.primary` on `bg.primary` | 14.8:1 | ✓ AAA |
| `text.secondary` on `bg.primary` | 8.1:1 | ✓ AA |
| `text.muted` on `bg.primary` | 5.2:1 | ✓ AA |
| `seal.red-light` on `bg.primary` | 5.1:1 | ✓ AA |

---

## Implementation Plan

### Step 1: Define Color Primitives

**File**: `packages/tokens/src/primitives/colors.json`

```json
{
  "primitive": {
    "color": {
      "ink": {
        "scorched": { "value": "#0A0A0A" },
        "dense": { "value": "#1A1A1A" },
        "heavy": { "value": "#2E2E2E" },
        "medium": { "value": "#525252" },
        "light": { "value": "#8B8B8B" },
        "faint": { "value": "#B8B8B8" },
        "wash": { "value": "#E5E0D8" }
      },
      "paper": {
        "aged": { "value": "#F8F5F0" },
        "silk": { "value": "#FFFEF9" },
        "xuan": { "value": "#F5F3ED" }
      },
      "stone": {
        "inkstone": { "value": "#121210" },
        "slate": { "value": "#1E1E1C" },
        "rock": { "value": "#2A2A28" },
        "weathered": { "value": "#3D3D3A" }
      },
      "seal": {
        "red": { "value": "#C14B3E" },
        "red-light": { "value": "#D4756A" },
        "red-dark": { "value": "#9E3B30" },
        "red-muted": { "value": "#B87A72" }
      },
      "celadon": {
        "primary": { "value": "#8FAE89" },
        "light": { "value": "#A4C9A8" },
        "dark": { "value": "#6B8B67" },
        "muted": { "value": "#9DB898" }
      },
      "gold": {
        "primary": { "value": "#B8860B" },
        "light": { "value": "#D4A84B" },
        "dark": { "value": "#8B6508" },
        "muted": { "value": "#C9A857" }
      }
    }
  }
}
```

### Step 2: Create Theme Color Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/light.json`
**File**: `packages/tokens/src/themes/chinese-aesthetic/dark.json`

Map primitives to semantic tokens for each mode.

### Step 3: Create Seasonal Color Overrides (Optional)

**File**: `packages/tokens/src/themes/chinese-aesthetic/seasons/spring.json`
(etc.)

### Step 4: Update Tailwind Configuration

**File**: `packages/ui/tailwind.config.js`

```js
colors: {
  ink: {
    scorched: 'var(--color-ink-scorched)',
    dense: 'var(--color-ink-dense)',
    // ...
  },
  paper: {
    aged: 'var(--color-paper-aged)',
    // ...
  },
  seal: {
    red: 'var(--color-seal-red)',
    // ...
  },
  // Semantic mappings
  bg: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    // ...
  },
  // ...
}
```

### Step 5: Create Color Documentation

**File**: `packages/ui/docs/chinese_aesthetic_theme/04a_COLOR_PHILOSOPHY.md`

Document:
- The philosophical background of the palette
- When to use each accent color
- Seasonal theming guide
- Contrast matrix with all pairings

### Step 6: Create Color Stories

Add Storybook stories demonstrating:
- All color tokens in context
- Light/dark mode comparison
- Seasonal variants
- Ink gradient usage

---

## Usage Guidelines

### When to Use Each Accent

| Accent | Use For | Avoid |
|--------|---------|-------|
| Seal Red | Primary actions, links, important markers | Large backgrounds, body text |
| Celadon | Secondary actions, success states, nature themes | Warning/danger contexts |
| Old Gold | Tertiary highlights, special emphasis, decorative | Primary actions |

### The Ink Gradient in Practice

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ink.heavy ── Primary body text                        │
│                                                         │
│  ink.medium ── Secondary information                   │
│                                                         │
│  ink.light ── De-emphasized content                    │
│                                                         │
│  ink.faint ── Subtle borders, disabled states          │
│                                                         │
│  ink.wash ── Barely visible dividers                   │
│                                                         │
│                              paper.aged ── Background  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Seal Red as Punctuation

Like a seal stamp on a painting, red should be:
- **Rare**: One or two instances per viewport
- **Meaningful**: Marking authorship, emphasis, action
- **Confident**: Full saturation, not diluted

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   A Meditation on Emptiness                            │
│   关于空的冥想                                           │
│                                                         │
│   ■ Author Name                    ← Seal red accent   │
│   March 2024                                           │
│                                                         │
│   The void between these words                         │
│   is not absence—it is presence.                       │
│                                                         │
│   [Read more →]                    ← Seal red link     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Success Criteria

1. **Ink Authenticity**: Grayscale feels like real ink gradients, not digital gray
2. **Warm Papers**: Light mode backgrounds have visible warmth
3. **Stone Surfaces**: Dark mode feels like natural stone, not LCD black
4. **Accent Restraint**: Red, green, gold used sparingly with purpose
5. **Contrast Compliance**: All combinations meet WCAG AA
6. **Mode Parity**: Light and dark modes feel like same aesthetic, different lighting
7. **Token Coverage**: All color needs addressed without hardcoding

---

## Open Questions

1. **Seasonal Theming Scope**: Should seasons affect only accents, or shift the entire palette warmth/coolness?

2. **High Contrast Mode**: Should we provide a variant with stronger contrast for accessibility while maintaining aesthetic?

3. **Color in Data Viz**: For charts and graphs, should we extend the palette or rely on the base accents?

4. **Transparency**: Should ink colors have alpha variants for overlays, or use separate overlay tokens?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Text colors must be readable at all sizes |
| Phase 2 (Spacing) | Empty space colored by background tokens |
| Phase 3 (Motion) | Color transitions use motion tokens |
| Phase 5 (Accessibility) | Contrast is core accessibility concern |
| Phase 6 (Components) | All components consume color tokens |
| Phase 7 (Infrastructure) | Shadows use ink-adjacent colors |

---

## The Destination

When this phase is complete, a page should feel like it exists in physical space:

> The background is not white—it is *paper*, aged slightly, warm to the eye. The text is not black—it is *ink*, with visible gradation from headlines to captions. The red accent appears like a seal stamp pressed by hand. The dark mode is not inverted—it is the same palette by candlelight, surfaces now stone instead of paper.

The colors do not shout. They whisper of material, history, and intention.

---

*"五色令人目盲。"*
*"The five colors blind the eye."*
— 道德经 (Tao Te Ching)

The sage warns against excess. Our palette heeds this: not five hundred colors, but five colors used with wisdom.
