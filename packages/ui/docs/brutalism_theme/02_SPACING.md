# Phase 2: Spacing System

## Philosophy

### Space is Structure

In brutalist design, spacing is not about comfort—it is about clarity. The distance between elements is a deliberate architectural decision. Too little space and elements collide. Too much and they lose relationship. There is no "roughly enough" space. There is only the right space.

### The Three Laws of Brutalist Spacing

**1. The Grid is Absolute**

Brutalism demands a rigid spacing grid. No arbitrary 13px gaps. No "a little more padding here." Every measurement must fall on the grid. The grid is typically based on a base unit (8px) and its multiples. Nothing exists between grid lines.

**2. Contrast Over Gradation**

Just as brutalist typography uses bold vs. normal (not subtle weights), brutalist spacing uses tight vs. generous (not five sizes of "medium"). If elements need different spacing, the difference should be obvious—not a 4px distinction that nobody notices.

**3. Whitespace is Intentional**

In editorial design, whitespace suggests elegance. In brutalism, whitespace is functional breathing room. It exists to separate concerns, not to soothe. Large margins around a text block say "this is its own thing." Tight margins say "these belong together." Whitespace communicates structure.

---

## Architecture

### The Base Unit

Brutalism uses an **8px base unit**. All spacing derives from this:

```
1 unit  = 8px  = 0.5rem
2 units = 16px = 1rem
3 units = 24px = 1.5rem
4 units = 32px = 2rem
...
```

This creates a strict grid. Designers and developers cannot invent intermediate values.

### Semantic Spacing Categories

Like the NYT theme, we use intent-based spacing—but with brutalist values:

```
┌─────────────────────────────────────────────────────────┐
│  STACK                                                  │
│  Vertical spacing between stacked elements              │
│                                                         │
│  In brutalism: Generous. Elements don't crowd.          │
│                                                         │
│  ┌─────────────────────┐                                │
│  │ ████████████████████│                                │
│  └─────────────────────┘                                │
│          ↕ stack                                        │
│  ┌─────────────────────┐                                │
│  │ ████████████████████│                                │
│  └─────────────────────┘                                │
├─────────────────────────────────────────────────────────┤
│  INLINE                                                 │
│  Horizontal spacing between inline elements             │
│                                                         │
│  In brutalism: Deliberate gaps between items.           │
│                                                         │
│  ┌───┐       ┌───┐       ┌───┐                         │
│  │ A │← gap →│ B │← gap →│ C │                         │
│  └───┘       └───┘       └───┘                         │
├─────────────────────────────────────────────────────────┤
│  INSET                                                  │
│  Internal padding within containers                     │
│                                                         │
│  In brutalism: Uniform, visible. Often generous.        │
│                                                         │
│  ┌─────────────────────────────┐                        │
│  │ ↔ inset                     │                        │
│  │    ┌───────────────────┐    │                        │
│  │ ↕  │     Content       │    │                        │
│  │    └───────────────────┘    │                        │
│  │                       inset │                        │
│  └─────────────────────────────┘                        │
├─────────────────────────────────────────────────────────┤
│  GUTTER                                                 │
│  Space between grid columns                             │
│                                                         │
│  In brutalism: Wide enough to clearly separate.         │
│                                                         │
│  ┌─────┐         ┌─────┐         ┌─────┐               │
│  │     │← gutter →│     │← gutter →│     │               │
│  └─────┘         └─────┘         └─────┘               │
├─────────────────────────────────────────────────────────┤
│  SECTION                                                │
│  Large-scale spacing between page regions               │
│                                                         │
│  In brutalism: Dramatic. Sections are clearly bounded.  │
│                                                         │
│  ════════════════════════════════                       │
│       Content Block A                                   │
│  ════════════════════════════════                       │
│                                                         │
│              ↕ section (large)                          │
│                                                         │
│  ════════════════════════════════                       │
│       Content Block B                                   │
│  ════════════════════════════════                       │
└─────────────────────────────────────────────────────────┘
```

### Size Scale

A condensed, decisive scale with clear jumps:

| Size | Units | Value | Ratio | Usage |
|------|-------|-------|-------|-------|
| `none` | 0 | 0 | — | Reset, flush alignment |
| `xs` | 1 | 8px (0.5rem) | — | Tight: within components |
| `sm` | 2 | 16px (1rem) | 2× | Related items |
| `md` | 3 | 24px (1.5rem) | 1.5× | Default spacing |
| `lg` | 4 | 32px (2rem) | 1.33× | Clear separation |
| `xl` | 6 | 48px (3rem) | 1.5× | Section breaks |
| `2xl` | 8 | 64px (4rem) | 1.33× | Major divisions |
| `3xl` | 12 | 96px (6rem) | 1.5× | Page-level separation |

**Note:** The scale jumps decisively. There's no "slightly more than medium." You either need more space or you don't.

### Token Structure

```
spacing.stack.{size}     → Vertical margins
spacing.inline.{size}    → Horizontal margins
spacing.inset.{size}     → Padding
spacing.gutter.{size}    → Grid gaps
spacing.section.{size}   → Large-scale divisions
```

### Brutalist Usage Guidelines

| Context | Category | Size | Rationale |
|---------|----------|------|-----------|
| Between paragraphs | stack | md | Generous for monospace readability |
| Between heading and body | stack | sm | Heading owns its content |
| Between sections | stack | xl or 2xl | Clear structural boundary |
| Inside cards | inset | md or lg | Content needs breathing room |
| Inside buttons | inset | sm (y), md (x) | Functional, not cramped |
| Icon to text | inline | xs | Tight relationship |
| Between buttons | inline | sm | Clear separation |
| Grid columns | gutter | md or lg | Obvious column separation |
| Page margins | section | xl | Content bounded from edges |

### Relationship to Typography

In brutalism, the spacing system must respect the monospace grid. Body text at 16px with 1.7 line-height creates a vertical rhythm:

```
Line height = 16px × 1.7 = 27.2px ≈ 28px (rounds to grid)
```

**Paragraph spacing should be a multiple of this rhythm:**
- Between paragraphs: `stack.md` (24px) — close to line-height
- Between sections: `stack.xl` (48px) — ~2 lines

```
┌──────────────────────────────────────┐
│ The first paragraph ends here.       │
└──────────────────────────────────────┘
     ↕ 24px (stack.md)
┌──────────────────────────────────────┐
│ The second paragraph begins here.    │
└──────────────────────────────────────┘

     ↕ 48px (stack.xl) ← Section break

┌──────────────────────────────────────┐
│ NEW SECTION HEADING                  │
└──────────────────────────────────────┘
```

---

## Implementation Plan

### Step 1: Verify Primitive Grid

**File**: `packages/tokens/src/primitives/spacing.json`

Ensure all values align to the 8px grid:

```json
{
  "primitive": {
    "spacing": {
      "0": { "value": "0" },
      "1": { "value": "0.5rem" },   // 8px
      "2": { "value": "1rem" },     // 16px
      "3": { "value": "1.5rem" },   // 24px
      "4": { "value": "2rem" },     // 32px
      "6": { "value": "3rem" },     // 48px
      "8": { "value": "4rem" },     // 64px
      "12": { "value": "6rem" }     // 96px
    }
  }
}
```

### Step 2: Create Brutalist Semantic Spacing

**File**: `packages/tokens/src/themes/brutalism/spacing.json`

```json
{
  "spacing": {
    "stack": {
      "none": { "value": "0" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.3}" },
      "lg": { "value": "{primitive.spacing.4}" },
      "xl": { "value": "{primitive.spacing.6}" },
      "2xl": { "value": "{primitive.spacing.8}" },
      "3xl": { "value": "{primitive.spacing.12}" }
    },
    "inline": {
      "none": { "value": "0" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.3}" },
      "lg": { "value": "{primitive.spacing.4}" },
      "xl": { "value": "{primitive.spacing.6}" }
    },
    "inset": {
      "none": { "value": "0" },
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.3}" },
      "lg": { "value": "{primitive.spacing.4}" },
      "xl": { "value": "{primitive.spacing.6}" }
    },
    "gutter": {
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.3}" },
      "lg": { "value": "{primitive.spacing.4}" }
    },
    "section": {
      "sm": { "value": "{primitive.spacing.6}" },
      "md": { "value": "{primitive.spacing.8}" },
      "lg": { "value": "{primitive.spacing.12}" }
    }
  }
}
```

### Step 3: Create Tailwind Integration

**File**: `packages/ui/tailwind.config.js` (brutalism preset)

```js
spacing: {
  'stack-xs': 'var(--spacing-stack-xs)',
  'stack-sm': 'var(--spacing-stack-sm)',
  'stack-md': 'var(--spacing-stack-md)',
  'stack-lg': 'var(--spacing-stack-lg)',
  'stack-xl': 'var(--spacing-stack-xl)',
  'stack-2xl': 'var(--spacing-stack-2xl)',
  'stack-3xl': 'var(--spacing-stack-3xl)',
  // ... inline, inset, gutter, section
}
```

### Step 4: Create Layout Primitives (Optional)

Consider creating simple layout components:

```tsx
// Stack component enforces vertical spacing
<Stack gap="md">
  <Heading>Title</Heading>
  <Paragraph>Content...</Paragraph>
</Stack>

// Inline component enforces horizontal spacing
<Inline gap="sm">
  <Button>Save</Button>
  <Button variant="secondary">Cancel</Button>
</Inline>
```

### Step 5: Document the Spacing Grid

**File**: `packages/ui/docs/brutalism_theme/02a_SPACING_GRID.md`

Visual documentation:
- The 8px base unit visualized
- All sizes with visual representation
- Grid overlay showing alignment
- Common patterns (card, section, form)

### Step 6: Update Components

Audit existing components to use brutalist spacing:
- **Card**: `inset-lg` (generous padding)
- **Button**: `inset-sm` vertical, `inset-md` horizontal
- **Callout**: `inset-md` with `stack-sm` between icon and text

---

## Success Criteria

1. **Grid Compliance**: All spacing values fall on 8px grid
2. **Build Integration**: Tokens compile without errors
3. **Tailwind Integration**: Semantic spacing classes available
4. **Documentation**: Visual spacing guide complete
5. **Component Adoption**: All components use semantic spacing
6. **Zero Arbitrary Values**: No hardcoded px/rem in components

---

## Brutalist Spacing Patterns

### The Card Pattern

```
┌───────────────────────────────────────────┐
│                                           │ ← border: 2px solid
│   ┌───────────────────────────────────┐   │
│   │  CARD TITLE                       │   │ ← inset-lg all around
│   └───────────────────────────────────┘   │
│         ↕ stack-sm                        │
│   ┌───────────────────────────────────┐   │
│   │  Card content goes here. The      │   │
│   │  text has room to breathe.        │   │
│   └───────────────────────────────────┘   │
│                                           │
└───────────────────────────────────────────┘
```

### The Section Pattern

```
════════════════════════════════════════════
          ↕ section-lg (top of page)
┌───────────────────────────────────────────┐
│  SECTION HEADING                          │
│  ═══════════════════                      │ ← underline
└───────────────────────────────────────────┘
          ↕ stack-md
┌───────────────────────────────────────────┐
│  Section content...                       │
└───────────────────────────────────────────┘
          ↕ section-md (between sections)
┌───────────────────────────────────────────┐
│  NEXT SECTION                             │
└───────────────────────────────────────────┘
```

### The Form Pattern

```
┌───────────────────────────────────────────┐
│  LABEL                                    │
└───────────────────────────────────────────┘
          ↕ stack-xs (tight relationship)
┌───────────────────────────────────────────┐
│  ┌───────────────────────────────────┐    │
│  │                                   │    │ ← Input with border
│  └───────────────────────────────────┘    │
└───────────────────────────────────────────┘
          ↕ stack-md (between fields)
┌───────────────────────────────────────────┐
│  ANOTHER LABEL                            │
└───────────────────────────────────────────┘
```

---

## Open Questions

1. **Asymmetric Insets**: Should cards have more horizontal padding than vertical? Or maintain strict uniformity for grid alignment?

2. **Responsive Spacing**: Should `section.lg` shrink on mobile? If so, how do we maintain the architectural feel?

3. **Borders as Spacing**: Thick borders (2-4px) contribute to visual spacing. Should we account for this in our tokens?

4. **Dense Mode**: Should we provide a `compact` variant for data-heavy interfaces?

---

## The Destination

When this system is complete, spacing is no longer a decision—it is a vocabulary:

```tsx
// ❌ Arbitrary, inconsistent
<div className="p-5 mb-7 gap-3">

// ✓ Structural, intentional
<div className="p-inset-lg mb-stack-xl gap-gutter-md">
```

The numbers disappear. The grid remains.

---

*"Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep."*
— Le Corbusier

In brutalism, space is not luxury. It is necessity.
