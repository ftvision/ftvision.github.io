# Phase 1: Typographic Foundation

## Philosophy

### Type is Not a Choice—It is a Commitment

When a reader encounters a Times headline, they do not consciously register "this is Georgia at 36px bold with 1.2 line-height." They simply feel: *this is important*. That feeling is not magic. It is the accumulated weight of a consistent system applied thousands of times until it becomes invisible.

Our type tokens must create that same inevitability.

### The Three Laws of Editorial Typography

**1. Hierarchy Must Be Unambiguous**

If two text elements could be confused for the same level, the system has failed. `h1` and `h2` must be visually distinct at a glance—not through subtle 2px differences, but through clear, confident contrast in size and weight.

**2. Reading is Rhythm**

Body text exists to be consumed in long stretches. The interplay of font size, line height, and line length creates a cadence. Too tight, the eye stumbles. Too loose, attention drifts. The tokens must encode optimal reading rhythm, not just sizes.

**3. Scale Creates Harmony**

A 1.25 or 1.333 type scale is not arbitrary—it is musical. Each step relates to the others mathematically. Random sizes (14px here, 17px there) create visual dissonance. Our scale will be deliberate.

---

## Architecture

### The Semantic Type System

We define types by *purpose*, not measurement:

```
┌─────────────────────────────────────────────────────────┐
│  DISPLAY                                                │
│  Hero headlines, feature titles                         │
│  The first thing you see                                │
├─────────────────────────────────────────────────────────┤
│  HEADING 1                                              │
│  Article headlines, section titles                      │
│  Primary structural marker                              │
├─────────────────────────────────────────────────────────┤
│  HEADING 2                                              │
│  Section headers within articles                        │
│  Secondary structural marker                            │
├─────────────────────────────────────────────────────────┤
│  HEADING 3                                              │
│  Subsection headers, card titles                        │
│  Tertiary structural marker                             │
├─────────────────────────────────────────────────────────┤
│  HEADING 4                                              │
│  Minor headers, list group titles                       │
│  Quaternary structural marker                           │
├─────────────────────────────────────────────────────────┤
│  BODY                                                   │
│  Primary reading text                                   │
│  Optimized for long-form consumption                    │
├─────────────────────────────────────────────────────────┤
│  BODY SMALL                                             │
│  Secondary content, sidebar text                        │
│  Reduced emphasis, still readable                       │
├─────────────────────────────────────────────────────────┤
│  CAPTION                                                │
│  Image captions, footnotes, metadata                    │
│  Auxiliary information                                  │
├─────────────────────────────────────────────────────────┤
│  LABEL                                                  │
│  Form labels, UI text, buttons                          │
│  Functional, not editorial                              │
├─────────────────────────────────────────────────────────┤
│  OVERLINE                                               │
│  Category tags, section markers                         │
│  Small caps or uppercase treatments                     │
└─────────────────────────────────────────────────────────┘
```

### Token Structure

Each semantic type will have three properties:

```
font.size.{name}       → The size (rem)
font.lineHeight.{name} → The leading (unitless ratio)
font.weight.{name}     → The weight (numeric)
```

This creates composable but constrained combinations.

### The Scale

We adopt a **1.25 (Major Third)** type scale, anchored at `1rem` (16px) for body text.

| Step | Multiplier | Size (rem) | Size (px) | Usage |
|------|------------|------------|-----------|-------|
| -2   | 1/1.25²    | 0.64       | ~10px     | — (too small) |
| -1   | 1/1.25     | 0.8        | ~13px     | caption, label |
| 0    | 1          | 1          | 16px      | body |
| +1   | 1.25       | 1.25       | 20px      | body-lg, h4 |
| +2   | 1.25²      | 1.563      | 25px      | h3 |
| +3   | 1.25³      | 1.953      | 31px      | h2 |
| +4   | 1.25⁴      | 2.441      | 39px      | h1 |
| +5   | 1.25⁵      | 3.052      | 49px      | display |

*Note: Values rounded for practicality.*

### Line Height Pairing

Larger text needs tighter leading. Smaller text needs room to breathe.

| Size Token | Line Height | Rationale |
|------------|-------------|-----------|
| display    | 1.1         | Massive type, minimal leading |
| h1         | 1.15        | Headlines stay compact |
| h2         | 1.2         | Still headline-like |
| h3         | 1.25        | Transitioning to text |
| h4         | 1.3         | Approaching body rhythm |
| body       | 1.6         | Optimal long-form reading |
| body-sm    | 1.5         | Slightly tighter for density |
| caption    | 1.4         | Compact but legible |
| label      | 1.4         | UI-focused |
| overline   | 1.3         | Uppercase needs less |

### Weight Assignment

| Usage | Weight | Value | Rationale |
|-------|--------|-------|-----------|
| display | bold | 700 | Maximum impact |
| h1 | bold | 700 | Clear hierarchy |
| h2 | semibold | 600 | Distinct from h1 |
| h3 | semibold | 600 | Consistent with h2 |
| h4 | medium | 500 | Lighter touch |
| body | normal | 400 | Reading comfort |
| body-sm | normal | 400 | Consistency |
| caption | normal | 400 | Unobtrusive |
| label | medium | 500 | UI needs presence |
| overline | semibold | 600 | Compensate for small size |

---

## Implementation Plan

### Step 1: Extend Primitive Typography Tokens

**File**: `packages/tokens/src/primitives/typography.json`

Add the missing font sizes to the primitive layer. These are raw values without semantic meaning.

**New sizes to add**:
- `5xl`: 3.052rem (display)
- Update scale to use 1.25 ratio consistently

**New line heights to add**:
- `tighter`: 1.1 (for display)
- `snug`: 1.3 (for small headings)

### Step 2: Create Semantic Typography Tokens

**File**: `packages/tokens/src/semantic/typography.json` (new file)

Define the semantic mappings:
- `font.size.display` → `{primitive.font.size.5xl}`
- `font.size.h1` → `{primitive.font.size.4xl}`
- etc.

Also define line-height and weight semantics:
- `font.lineHeight.display` → `{primitive.font.lineHeight.tighter}`
- `font.weight.display` → `{primitive.font.weight.bold}`

### Step 3: Update Build Configuration

**File**: `packages/tokens/build.js`

Ensure the new `typography.json` semantic file is included in the build pipeline.

### Step 4: Create Tailwind Typography Utilities

**File**: `packages/ui/tailwind.config.js`

Extend Tailwind with semantic font size classes that include line-height:
- `text-display` → size + line-height + weight
- `text-h1` → size + line-height + weight

This may require custom Tailwind plugins or careful use of `@apply`.

### Step 5: Document the Type System

**File**: `packages/ui/docs/nyt_theme/01a_TYPE_SCALE.md`

Visual documentation showing:
- The complete scale with examples
- Usage guidelines for each level
- Do's and don'ts

### Step 6: Update Components

Audit existing components (Button, Card, Callout) to use the new semantic typography tokens where appropriate.

---

## Success Criteria

1. **Completeness**: All 10 semantic type levels are defined with size, line-height, and weight
2. **Build Integration**: Tokens compile to CSS and JS without errors
3. **Tailwind Integration**: Semantic classes available (`text-display`, `text-h1`, etc.)
4. **Documentation**: Type scale is visually documented
5. **Zero Ambiguity**: A developer can implement any text element by selecting exactly one semantic token

---

## Open Questions

1. **Responsive Typography**: Should `display` and `h1` scale down on mobile? If so, how do we encode that in tokens?

2. **Font Loading**: Georgia is a system font, but if we later adopt a custom serif (e.g., NYT Cheltenham), how do we handle font loading states?

3. **Prose vs. UI**: Should `body` and `label` diverge more significantly? In editorial contexts, body text is sacred. In UI contexts (modals, forms), different rules may apply.

---

## Next Steps

After this phase is complete, Phase 2 (Spacing System) will build on the typographic rhythm to establish consistent vertical spacing throughout the system.

*"Typography is the craft of endowing human language with a durable visual form."*
— Robert Bringhurst
