# Phase 1: Typographic Foundation

## Philosophy

### Type is Structure

In brutalist design, typography is not a choice for aesthetics—it is the visible skeleton of the page. A monospace font does not say "I am friendly." It says "I am precise." Every character occupies equal space, exposing the underlying grid that other typefaces hide.

When a reader encounters a brutalist headline, they do not feel warmth. They feel clarity. This is intentional.

### The Three Laws of Brutalist Typography

**1. The Grid Must Be Visible**

Proportional fonts create an illusion of organic flow. Monospace fonts reject this illusion. Every letter is a brick. Every line is a row. The grid is not hidden—it is the design.

**2. Contrast is Binary**

Brutalism does not deal in subtle gradations. Text is either bold or normal. Headlines are either large or they are body text. There is no "slightly emphasized." Hierarchy is achieved through decisive contrast, not gentle suggestion.

**3. Simplicity is Non-Negotiable**

One typeface. Maybe two. Monospace for everything, or monospace for headlines with a geometric sans for body. That's it. Variety is noise. Consistency is architecture.

---

## Architecture

### The Semantic Type System

We define types by *function*, not by mood:

```
┌─────────────────────────────────────────────────────────┐
│  DISPLAY                                                │
│  Hero text, major announcements                         │
│  Monospace, uppercase, maximum weight                   │
├─────────────────────────────────────────────────────────┤
│  HEADING 1                                              │
│  Page titles, section headers                           │
│  Bold, underlined or bordered                           │
├─────────────────────────────────────────────────────────┤
│  HEADING 2                                              │
│  Major subsections                                      │
│  Bold, clear separation from body                       │
├─────────────────────────────────────────────────────────┤
│  HEADING 3                                              │
│  Minor subsections, card titles                         │
│  Medium weight, less dramatic                           │
├─────────────────────────────────────────────────────────┤
│  HEADING 4                                              │
│  List headings, inline titles                           │
│  Same size as body, weight differentiated               │
├─────────────────────────────────────────────────────────┤
│  BODY                                                   │
│  Primary reading text                                   │
│  Generous line-height for monospace legibility          │
├─────────────────────────────────────────────────────────┤
│  BODY SMALL                                             │
│  Secondary content, metadata                            │
│  Same face, reduced size                                │
├─────────────────────────────────────────────────────────┤
│  CAPTION                                                │
│  Labels, footnotes, timestamps                          │
│  Smallest readable size                                 │
├─────────────────────────────────────────────────────────┤
│  CODE                                                   │
│  Code blocks, technical content                         │
│  Same as body (it's all monospace anyway)               │
├─────────────────────────────────────────────────────────┤
│  OVERLINE                                               │
│  Category markers, section labels                       │
│  Uppercase, letter-spaced                               │
└─────────────────────────────────────────────────────────┘
```

### Font Selection

#### Primary: Monospace

The brutalist theme uses monospace as its primary (and potentially only) typeface.

**Recommended Stack:**
```
font-family:
  'JetBrains Mono',    /* Modern, designed for screens */
  'Fira Code',         /* Alternative with ligatures */
  'IBM Plex Mono',     /* Excellent x-height */
  'SF Mono',           /* macOS system mono */
  'Cascadia Code',     /* Windows system mono */
  'Consolas',          /* Windows fallback */
  'Monaco',            /* Legacy macOS */
  monospace;           /* System default */
```

**Why these fonts:**
- JetBrains Mono: Clear letterforms, designed for extended reading
- Fira Code: Popular, well-kerned
- IBM Plex Mono: Part of a coherent family if sans is needed
- System fonts: No loading penalty

#### Alternative: Geometric Sans for Body

If pure monospace proves fatiguing for long-form content:

```
font-family:
  'IBM Plex Sans',     /* Pairs with IBM Plex Mono */
  'Inter',             /* Highly legible, neutral */
  'Roboto',            /* Geometric, no-nonsense */
  system-ui,
  sans-serif;
```

**The rule:** Headlines remain monospace. Body may be geometric sans. Never serif. Never humanist.

### Token Structure

```
font.family.mono     → Monospace stack
font.family.sans     → Geometric sans stack (if used)
font.size.{name}     → Size in rem
font.lineHeight.{name} → Leading (unitless)
font.weight.{name}   → Weight (numeric)
font.letterSpacing.{name} → Tracking
```

### The Scale

Brutalism favors a **1.333 (Perfect Fourth)** scale—slightly more dramatic than the gentle 1.25 major third.

| Step | Multiplier | Size (rem) | Size (px) | Usage |
|------|------------|------------|-----------|-------|
| -2   | 1/1.333²   | 0.563      | ~9px      | — (too small) |
| -1   | 1/1.333    | 0.75       | ~12px     | caption |
| 0    | 1          | 1          | 16px      | body |
| +1   | 1.333      | 1.333      | ~21px     | h4 |
| +2   | 1.333²     | 1.777      | ~28px     | h3 |
| +3   | 1.333³     | 2.369      | ~38px     | h2 |
| +4   | 1.333⁴     | 3.157      | ~51px     | h1 |
| +5   | 1.333⁵     | 4.209      | ~67px     | display |

*Note: More aggressive jumps create the decisive contrast brutalism requires.*

### Line Height Pairing

Monospace requires more generous line heights than proportional fonts. The fixed-width characters benefit from vertical breathing room.

| Size Token | Line Height | Rationale |
|------------|-------------|-----------|
| display    | 1.1         | Tight for impact |
| h1         | 1.2         | Headlines stay compact |
| h2         | 1.25        | Clear but not loose |
| h3         | 1.3         | Transitioning to body |
| h4         | 1.4         | Near-body rhythm |
| body       | 1.7         | Generous for mono legibility |
| body-sm    | 1.6         | Slightly tighter |
| caption    | 1.5         | Compact metadata |
| code       | 1.6         | Code blocks need vertical clarity |
| overline   | 1.3         | Uppercase needs less |

### Weight Assignment

Brutalism uses **fewer weights** with **higher contrast** between them.

| Usage | Weight | Value | Rationale |
|-------|--------|-------|-----------|
| display | bold | 700 | Maximum presence |
| h1 | bold | 700 | Unmistakable hierarchy |
| h2 | bold | 700 | Consistent with h1 |
| h3 | medium | 500 | Clear step down |
| h4 | medium | 500 | Consistent with h3 |
| body | normal | 400 | Reading baseline |
| body-sm | normal | 400 | Consistency |
| caption | normal | 400 | Unobtrusive |
| code | normal | 400 | Technical neutrality |
| overline | bold | 700 | Compensate for small size |

### Letter Spacing

Monospace typography benefits from adjusted tracking in certain contexts.

| Context | Value | Rationale |
|---------|-------|-----------|
| display | 0.02em | Slight expansion for large sizes |
| overline | 0.1em | Wide tracking for uppercase |
| body | 0 | Natural spacing |
| code | 0 | Natural spacing |

---

## Implementation Plan

### Step 1: Define Font Primitives

**File**: `packages/tokens/src/primitives/typography.json`

Add brutalist font stacks:

```json
{
  "primitive": {
    "font": {
      "family": {
        "mono": {
          "value": "'JetBrains Mono', 'Fira Code', 'IBM Plex Mono', 'SF Mono', 'Cascadia Code', 'Consolas', 'Monaco', monospace"
        },
        "geometric": {
          "value": "'IBM Plex Sans', 'Inter', 'Roboto', system-ui, sans-serif"
        }
      }
    }
  }
}
```

### Step 2: Create Theme Typography Overrides

**File**: `packages/tokens/src/themes/brutalism/base.json`

Override semantic font mappings:

```json
{
  "font": {
    "family": {
      "heading": { "value": "{primitive.font.family.mono}" },
      "body": { "value": "{primitive.font.family.mono}" },
      "code": { "value": "{primitive.font.family.mono}" }
    }
  }
}
```

### Step 3: Define Brutalist Type Scale

**File**: `packages/tokens/src/themes/brutalism/typography.json`

Apply the 1.333 scale and generous line heights:

```json
{
  "font": {
    "size": {
      "display": { "value": "4.209rem" },
      "h1": { "value": "3.157rem" },
      "h2": { "value": "2.369rem" },
      "h3": { "value": "1.777rem" },
      "h4": { "value": "1.333rem" },
      "body": { "value": "1rem" },
      "body-sm": { "value": "0.875rem" },
      "caption": { "value": "0.75rem" }
    },
    "lineHeight": {
      "display": { "value": "1.1" },
      "h1": { "value": "1.2" },
      "h2": { "value": "1.25" },
      "h3": { "value": "1.3" },
      "h4": { "value": "1.4" },
      "body": { "value": "1.7" },
      "body-sm": { "value": "1.6" },
      "caption": { "value": "1.5" }
    }
  }
}
```

### Step 4: Create Tailwind Typography Utilities

**File**: `packages/ui/tailwind.config.js` (brutalism preset)

Extend with brutalist type classes:

```js
// In brutalism theme preset
fontFamily: {
  mono: 'var(--font-family-mono)',
  sans: 'var(--font-family-geometric)',
},
fontSize: {
  'display': ['var(--font-size-display)', { lineHeight: 'var(--font-lineHeight-display)' }],
  'h1': ['var(--font-size-h1)', { lineHeight: 'var(--font-lineHeight-h1)' }],
  // ...
}
```

### Step 5: Document Type Specimens

**File**: `packages/ui/docs/brutalism_theme/01a_TYPE_SPECIMENS.md`

Create visual specimens showing:
- All type levels in monospace
- Uppercase treatments for display/overline
- Body text in extended paragraphs
- Code blocks (which look native)

### Step 6: Create Typography Stories

Add Storybook stories demonstrating:
- Each semantic type level
- Long-form reading experience
- Headlines with underlines/borders
- Uppercase treatments

---

## Success Criteria

1. **Font Loading**: Monospace fonts load without FOUT (Flash of Unstyled Text)
2. **Scale Implementation**: All type levels use the 1.333 scale
3. **Legibility**: Body text is comfortable to read for 2000+ word articles
4. **Grid Visibility**: Text alignment exposes the underlying character grid
5. **Weight Contrast**: Clear visual hierarchy through weight alone
6. **Token Compliance**: Zero hardcoded font values in components

---

## Open Questions

1. **Pure Monospace vs. Hybrid**: Should body text use monospace or geometric sans? Testing required with real content.

2. **Variable Fonts**: Should we use variable font versions for smoother weight transitions, or stick to static weights for simplicity?

3. **Font Loading Strategy**: Should we use `font-display: swap`, `optional`, or `block`? Monospace FOUT is particularly jarring.

4. **Uppercase Headings**: Should `display` and `h1` default to uppercase, or is that a variant?

---

## The Destination

When this system is complete, every text element should feel engineered:

```tsx
// Every heading is a monospace declaration
<h1 className="text-h1 font-bold uppercase tracking-wide border-b-4 border-current">
  SYSTEM STATUS
</h1>

// Body text exposes the grid
<p className="text-body leading-relaxed font-mono">
  Every character occupies equal space. The grid is visible.
  Structure is not hidden behind proportional illusions.
</p>

// Code blocks are native citizens
<pre className="text-body bg-surface-code p-inset-md border-2 border-current">
  console.log('Monospace is not a style. It is the truth.');
</pre>
```

The type system does not decorate. It structures.

---

*"Architecture is the learned game, correct and magnificent, of forms assembled in the light."*
— Le Corbusier

In brutalist typography, the forms are characters. The light is the screen. The game is honesty.
