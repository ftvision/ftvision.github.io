# Phase 2: Spacing System (留白)

## Philosophy

### The Radical Embrace of Emptiness

*留白* (liúbái) — "leaving white" — is not a technique. It is a worldview.

In Western design, whitespace is functional: it creates hierarchy, groups related elements, improves readability. It is defined by what it surrounds. It is the *absence* of content.

In Chinese aesthetics, empty space is substantive. The void has weight. The areas of a painting without ink are not negative space waiting to be filled—they are positive presence, as compositionally important as the brushstrokes themselves. The viewer's imagination fills the void, and in that filling, the artwork becomes alive.

*计白当黑* (jì bái dāng hēi) — "Count the white as black."

Our spacing system must encode this philosophy. Not "generous margins for readability" but *intentional emptiness that carries meaning*.

### The Three Laws of 留白

**1. Emptiness Creates Fullness**

A page that is 60% empty space is not a page that failed to fill. It is a page that knows what matters. The content that remains becomes more precious by virtue of its isolation. A single sentence in a sea of white demands attention that a crowded paragraph never receives.

**2. Asymmetry Creates Movement**

Perfect symmetry is static—a Western classical ideal. Chinese composition prefers dynamic asymmetry: elements placed off-center, margins unequal, the visual center shifted. This creates *shi* (势)—momentum, energy, life. Asymmetric spacing is not imbalance; it is directed flow.

**3. Rhythm Emerges from Variation**

A heartbeat is not metronomic. Breath has natural variation. The spacing between elements should feel organic, not mechanical. Between a heading and its paragraph: close, intimate, belonging. Between sections: vast, contemplative, a pause for thought. The variation is the rhythm.

---

## Architecture

### Semantic Spacing Categories

We expand the standard spacing categories with philosophically grounded terminology:

```
┌─────────────────────────────────────────────────────────┐
│  STACK (堆叠 duīdié)                                    │
│  Vertical spacing between stacked elements              │
│  "The height of silence between thoughts"               │
│                                                         │
│  ┌─────────┐                                            │
│  │ Element │                                            │
│  └─────────┘                                            │
│       ↕ stack                                           │
│  ┌─────────┐                                            │
│  │ Element │                                            │
│  └─────────┘                                            │
├─────────────────────────────────────────────────────────┤
│  INLINE (行内 hángnèi)                                  │
│  Horizontal spacing between inline elements             │
│  "The pause between words in speech"                    │
│                                                         │
│  ┌───┐ ← inline → ┌───┐ ← inline → ┌───┐               │
│  │ A │            │ B │            │ C │               │
│  └───┘            └───┘            └───┘               │
├─────────────────────────────────────────────────────────┤
│  INSET (内距 nèijù)                                     │
│  Internal padding within a container                    │
│  "The breathing room within a frame"                    │
│                                                         │
│  ┌────────────────────┐                                 │
│  │ ↔ inset            │                                 │
│  │ ↕        ┌───────┐ │                                 │
│  │ inset    │Content│ │                                 │
│  │ ↕        └───────┘ │                                 │
│  │            inset ↔ │                                 │
│  └────────────────────┘                                 │
├─────────────────────────────────────────────────────────┤
│  VOID (虚 xū) — NEW                                     │
│  Dramatic empty space for contemplation                 │
│  "The emptiness that gives meaning"                     │
│                                                         │
│  Not just large spacing—philosophically distinct.       │
│  Used where emptiness *is* the content.                 │
├─────────────────────────────────────────────────────────┤
│  BREATH (气 qì) — NEW                                   │
│  Generous spacing for visual rest                       │
│  "Space to let the eye breathe"                         │
│                                                         │
│  Larger than standard, smaller than void.               │
│  For creating contemplative rhythm without drama.       │
├─────────────────────────────────────────────────────────┤
│  MARGIN-SPACE (边白 biānbái) — NEW                      │
│  Asymmetric margin for annotation areas                 │
│  "The scholar's margin for commentary"                  │
│                                                         │
│  Specifically for the traditional practice of           │
│  margin annotations (眉批).                              │
└─────────────────────────────────────────────────────────┘
```

### Size Scale

Our scale is more generous than typical Western systems, with additional steps for dramatic spacing:

| Size | Value | Ratio | Usage | Chinese Name |
|------|-------|-------|-------|--------------|
| `none` | 0 | — | Reset, collapsed elements | 无 |
| `xs` | 0.25rem (4px) | — | Tight: icon-to-text, dense UI | 极小 |
| `sm` | 0.5rem (8px) | 2× | Small: related items | 小 |
| `md` | 1rem (16px) | 2× | Medium: default spacing | 中 |
| `lg` | 1.5rem (24px) | 1.5× | Large: comfortable cards | 大 |
| `xl` | 2rem (32px) | 1.33× | Extra large: section starts | 特大 |
| `2xl` | 3rem (48px) | 1.5× | Massive: major separations | 巨大 |
| `3xl` | 4rem (64px) | 1.33× | Hero: page sections | 宏大 |
| `4xl` | 6rem (96px) | 1.5× | **Breath**: contemplative rest | 气 |
| `5xl` | 8rem (128px) | 1.33× | **Void**: dramatic emptiness | 虚 |
| `6xl` | 12rem (192px) | 1.5× | **Vast void**: maximum emptiness | 大虚 |

### Token Structure

```
spacing.stack.{size}      → Vertical margins between elements
spacing.inline.{size}     → Horizontal margins between elements
spacing.inset.{size}      → Padding inside containers
spacing.breath            → Generous contemplative spacing (4xl)
spacing.void              → Dramatic philosophical emptiness (5xl)
spacing.margin-left       → Left margin for annotation column
spacing.margin-right      → Right margin for annotation column
```

### Asymmetric Margin System

Traditional Chinese scholarly texts left generous margins for reader annotations (*眉批 méipī* — margin commentary). We encode this as a first-class layout pattern:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   ┌───────────────────────────────────────────┐  ┌────────────┐ │
│   │                                           │  │            │ │
│   │   Main content column (60-70%)            │  │ Annotation │ │
│   │                                           │  │ margin     │ │
│   │   This is where the primary text lives.   │  │ (30-40%)   │ │
│   │   Optimized for reading at 65ch.          │  │            │ │
│   │                                           │  │ Reader     │ │
│   │   ...                                     │  │ notes go   │ │
│   │                                           │  │ here       │ │
│   └───────────────────────────────────────────┘  └────────────┘ │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Token specification:**
```
spacing.margin-annotation → 30% of container width
spacing.margin-content    → 70% of container width
```

### Usage Guidelines

| Context | Category | Recommended Size | Rationale |
|---------|----------|------------------|-----------|
| Between icon and label | inline | xs | Intimate connection |
| Between form fields | stack | sm | Related inputs |
| Between paragraphs | stack | md | Natural reading flow |
| Between heading and body | stack | sm | Heading owns its content |
| Between sections | stack | xl or 2xl | Clear break |
| Between major page areas | stack | breath (4xl) | Contemplative pause |
| Hero → first content | stack | void (5xl) | Dramatic entrance |
| Page top/bottom | inset | breath (4xl) | Frame the experience |
| Card padding | inset | lg | Comfortable reading |
| Modal padding | inset | xl | Focused attention |
| Annotation margin | margin-space | 30% | Scholarly tradition |

### Relationship to Typography

Spacing and typography create rhythm together. The relationship between text elements encodes meaning:

**Heading-to-Body Relationship (Intimate):**
```
┌──────────────────────────┐
│ 章节标题                  │  Heading
│ Section Heading          │
└──────────────────────────┘
     ↕ stack.sm (8px)        ← Tight: heading owns what follows
┌──────────────────────────┐
│ 正文第一段落。这里是主要内容。│  Body
│ First paragraph of text. │
└──────────────────────────┘
```

**Paragraph-to-Paragraph Relationship (Natural):**
```
┌──────────────────────────┐
│ 第一段落。                 │
│ First paragraph.         │
└──────────────────────────┘
     ↕ stack.md (16px)       ← Natural: breathing between thoughts
┌──────────────────────────┐
│ 第二段落。                 │
│ Second paragraph.        │
└──────────────────────────┘
```

**Section-to-Section Relationship (Contemplative):**
```
┌──────────────────────────┐
│ End of Section A         │
│ 第一章节结束               │
└──────────────────────────┘

     ↕ spacing.breath (96px)  ← Contemplative: visual silence

┌──────────────────────────┐
│ 第二章节标题               │
│ Section B Heading        │
└──────────────────────────┘
```

**Page Opening (Dramatic):**
```
═══════════════════════════════════════════════════════════════════

     ↕ spacing.void (128px)   ← Dramatic: the vast emptiness

┌──────────────────────────┐
│ 文章标题                   │
│ Article Title            │
└──────────────────────────┘
```

---

## Implementation Plan

### Step 1: Extend Spacing Primitives

**File**: `packages/tokens/src/primitives/spacing.json`

Add the contemplative spacing values:

```json
{
  "primitive": {
    "spacing": {
      "0": { "value": "0" },
      "1": { "value": "0.25rem" },
      "2": { "value": "0.5rem" },
      "4": { "value": "1rem" },
      "6": { "value": "1.5rem" },
      "8": { "value": "2rem" },
      "12": { "value": "3rem" },
      "16": { "value": "4rem" },
      "24": { "value": "6rem" },
      "32": { "value": "8rem" },
      "48": { "value": "12rem" }
    }
  }
}
```

### Step 2: Create Semantic Spacing Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/spacing.json`

```json
{
  "spacing": {
    "stack": {
      "none": { "value": "{primitive.spacing.0}" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.4}" },
      "lg": { "value": "{primitive.spacing.6}" },
      "xl": { "value": "{primitive.spacing.8}" },
      "2xl": { "value": "{primitive.spacing.12}" },
      "3xl": { "value": "{primitive.spacing.16}" }
    },
    "inline": {
      "none": { "value": "{primitive.spacing.0}" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.4}" },
      "lg": { "value": "{primitive.spacing.6}" },
      "xl": { "value": "{primitive.spacing.8}" }
    },
    "inset": {
      "none": { "value": "{primitive.spacing.0}" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.4}" },
      "lg": { "value": "{primitive.spacing.6}" },
      "xl": { "value": "{primitive.spacing.8}" },
      "2xl": { "value": "{primitive.spacing.12}" }
    },
    "breath": { "value": "{primitive.spacing.24}" },
    "void": { "value": "{primitive.spacing.32}" },
    "vast-void": { "value": "{primitive.spacing.48}" },
    "annotation-margin": { "value": "30%" }
  }
}
```

### Step 3: Create Tailwind Spacing Utilities

**File**: `packages/ui/tailwind.config.js`

```js
spacing: {
  // Standard scale
  'stack-xs': 'var(--spacing-stack-xs)',
  'stack-sm': 'var(--spacing-stack-sm)',
  'stack-md': 'var(--spacing-stack-md)',
  'stack-lg': 'var(--spacing-stack-lg)',
  'stack-xl': 'var(--spacing-stack-xl)',
  'stack-2xl': 'var(--spacing-stack-2xl)',
  'stack-3xl': 'var(--spacing-stack-3xl)',

  // Inset variants
  'inset-xs': 'var(--spacing-inset-xs)',
  'inset-sm': 'var(--spacing-inset-sm)',
  'inset-md': 'var(--spacing-inset-md)',
  'inset-lg': 'var(--spacing-inset-lg)',
  'inset-xl': 'var(--spacing-inset-xl)',

  // Philosophical spacing
  'breath': 'var(--spacing-breath)',
  'void': 'var(--spacing-void)',
  'vast-void': 'var(--spacing-vast-void)',
}
```

### Step 4: Create Asymmetric Layout Utility

**File**: `packages/ui/src/lib/layouts/AnnotationLayout.tsx`

```tsx
/**
 * Traditional scholarly layout with main content and annotation margin.
 * Based on 眉批 (margin commentary) tradition.
 */
export function AnnotationLayout({ children, annotations }) {
  return (
    <div className="grid grid-cols-[1fr_var(--spacing-annotation-margin)]">
      <main className="prose-column">
        {children}
      </main>
      <aside className="annotation-column">
        {annotations}
      </aside>
    </div>
  );
}
```

### Step 5: Document the 留白 Philosophy

**File**: `packages/ui/docs/chinese_aesthetic_theme/02a_LIUBAI_GUIDE.md`

Create visual documentation showing:
- The philosophy behind each spacing level
- When to use `breath` vs `void`
- How to compose asymmetric layouts
- Anti-patterns (cramped spacing that betrays the aesthetic)

### Step 6: Update Components

Audit existing components to use semantic spacing with 留白 philosophy:

- **Card**: Use `inset-lg` minimum—never cramped
- **Hero sections**: Use `void` before first content
- **Article layout**: Implement annotation margin pattern
- **Section breaks**: Use `breath` between major sections

---

## The Void Spectrum

Not all emptiness is equal. Here's when to use each level:

| Token | Use Case | Feeling |
|-------|----------|---------|
| `stack.xl` | Between sections | "New topic" |
| `stack.2xl` | Major section break | "Different chapter" |
| `stack.3xl` | Page section division | "Let me think" |
| `breath` (4xl) | Between page areas | "Moment of silence" |
| `void` (5xl) | Hero openings, dramatic pauses | "Infinite possibility" |
| `vast-void` (6xl) | Maximum emptiness | "The void speaks" |

### When to Use Maximum Emptiness

The `void` and `vast-void` tokens are not for every page. Use them for:

- **Opening moments**: After a hero image, before the first paragraph
- **Dramatic pauses**: Between an impactful statement and continuation
- **Endings**: After the conclusion, before the footer
- **Single-element pages**: When one thing deserves complete attention

**Do not use for:**

- Standard section breaks (use `breath` or smaller)
- Lists or grids (spacing between items should be modest)
- Dense informational content (documentation, data)

---

## Success Criteria

1. **Philosophical Clarity**: Developers understand *why* the spacing is generous
2. **Token Coverage**: All spacing needs addressed (stack, inline, inset, breath, void)
3. **Asymmetric Support**: Annotation layout pattern implemented and documented
4. **Build Integration**: All tokens compile to CSS custom properties
5. **Tailwind Integration**: Semantic spacing utilities available
6. **Component Adoption**: Components use 留白-conscious spacing
7. **Zero Cramping**: No component feels visually compressed

---

## Open Questions

1. **Responsive 留白**: Should `void` become `breath` on mobile? How do we scale contemplative space on small screens?

2. **Animation of Space**: Should expanding/collapsing content animate the spacing change? What easing feels like "breathing"?

3. **Cultural Override**: For users who prefer denser layouts, should we offer a "compact" variant that reduces 留白?

4. **Vertical Rhythm**: Should all spacing align to a baseline grid, or is organic variation acceptable?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Line height and spacing work together for rhythm |
| Phase 3 (Motion) | Space changes during animation use these tokens |
| Phase 4 (Color) | Empty space colored by background tokens |
| Phase 5 (Accessibility) | Adequate spacing aids readability |
| Phase 6 (Components) | All components consume spacing tokens |
| Phase 7 (Infrastructure) | Container widths define where 留白 lives |

---

## The Destination

When this phase is complete, a page should feel like a breath held and released:

```
                    ↕ void (dramatic opening)

        Scholar's Studio
        书房

                    ↕ breath (contemplative pause)

        The empty space between these words is not
        absence—it is presence. This paragraph has
        room to exist, room to be read slowly.

                    ↕ stack.md (natural paragraph)

        Another thought follows, connected but
        distinct. The spacing tells you: same
        chapter, different breath.

                    ↕ breath (section break)

        A New Section
        新章节

                    ↕ stack.sm (intimate connection)

        This section begins fresh, but the heading
        holds tight to its first paragraph—they
        belong together.
```

The spacing is not noticed. It is *felt*.

---

*"虚室生白，吉祥止止。"*
*"In an empty room, white light is born; good fortune gathers there."*
— 庄子 (Zhuangzi), on the productivity of emptiness
