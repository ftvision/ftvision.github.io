# Phase 2: Spacing System

## Philosophy

### The Invisible Grid

Great editorial design has a secret: everything aligns to something you cannot see. The space between a headline and body text is not arbitrary—it is calculated. The padding inside a card is not "whatever looks good"—it is part of a system. The gutter between columns is not a guess—it is a relationship.

When spacing is systematic, the page feels *inevitable*. When spacing is ad-hoc, the page feels *assembled*.

### The Three Laws of Editorial Spacing

**1. Vertical Rhythm is Non-Negotiable**

In music, rhythm is the scaffolding that holds melody together. In typography, vertical rhythm serves the same purpose. Every element—headlines, paragraphs, images, captions—must sit on a consistent baseline grid. When rhythm breaks, the eye stumbles.

**2. Proximity Creates Meaning**

Elements that are close together are perceived as related. Elements that are far apart are perceived as separate. This is Gestalt 101—but it has profound implications for spacing tokens. The space *between* a heading and its paragraph must be smaller than the space *between* that paragraph and the next section. Spacing encodes hierarchy.

**3. Consistency Builds Trust**

When a reader encounters a card with 24px padding, and then another card with 20px padding, and then another with 32px—they don't consciously notice. But something feels *off*. Inconsistent spacing erodes trust at a subconscious level. Tokens eliminate this variance.

---

## Architecture

### Semantic Spacing Categories

Raw spacing values (4px, 8px, 16px) are meaningless without context. We define spacing by *intent*:

```
┌─────────────────────────────────────────────────────────┐
│  STACK                                                  │
│  Vertical spacing between stacked elements              │
│  "How much air between this and the next thing?"        │
│                                                         │
│  ┌─────────┐                                            │
│  │ Element │                                            │
│  └─────────┘                                            │
│       ↕ stack                                           │
│  ┌─────────┐                                            │
│  │ Element │                                            │
│  └─────────┘                                            │
├─────────────────────────────────────────────────────────┤
│  INLINE                                                 │
│  Horizontal spacing between inline elements             │
│  "How much air between this and the thing beside it?"   │
│                                                         │
│  ┌───┐ ← inline → ┌───┐ ← inline → ┌───┐               │
│  │ A │            │ B │            │ C │               │
│  └───┘            └───┘            └───┘               │
├─────────────────────────────────────────────────────────┤
│  INSET                                                  │
│  Internal padding within a container                    │
│  "How much breathing room inside this box?"             │
│                                                         │
│  ┌────────────────────┐                                 │
│  │ ↔ inset            │                                 │
│  │ ↕        ┌───────┐ │                                 │
│  │ inset    │Content│ │                                 │
│  │ ↕        └───────┘ │                                 │
│  │            inset ↔ │                                 │
│  └────────────────────┘                                 │
├─────────────────────────────────────────────────────────┤
│  GUTTER                                                 │
│  Space between columns or grid items                    │
│  "How much air between grid cells?"                     │
│                                                         │
│  ┌─────┐         ┌─────┐         ┌─────┐               │
│  │     │← gutter →│     │← gutter →│     │               │
│  │     │         │     │         │     │               │
│  └─────┘         └─────┘         └─────┘               │
├─────────────────────────────────────────────────────────┤
│  SECTION                                                │
│  Large-scale spacing between major page sections        │
│  "How much air between this section and the next?"      │
│                                                         │
│  ════════════════════════════════                       │
│       Section A                                         │
│  ════════════════════════════════                       │
│              ↕ section                                  │
│  ════════════════════════════════                       │
│       Section B                                         │
│  ════════════════════════════════                       │
└─────────────────────────────────────────────────────────┘
```

### Size Scale

Each category uses a consistent size scale:

| Size | Value | Ratio | Usage |
|------|-------|-------|-------|
| `xs` | 0.25rem (4px) | — | Tight: icon-to-text, dense UI |
| `sm` | 0.5rem (8px) | 2× | Small: related items, compact cards |
| `md` | 1rem (16px) | 2× | Medium: default spacing |
| `lg` | 1.5rem (24px) | 1.5× | Large: section breaks, generous cards |
| `xl` | 2rem (32px) | 1.33× | Extra large: major separations |
| `2xl` | 3rem (48px) | 1.5× | Massive: page sections |
| `3xl` | 4rem (64px) | 1.33× | Hero: major page divisions |

The scale follows a loosely geometric progression, doubling or multiplying by 1.5 at each step.

### Token Structure

```
spacing.stack.{size}     → Vertical margins between elements
spacing.inline.{size}    → Horizontal margins between elements
spacing.inset.{size}     → Padding inside containers
spacing.gutter.{size}    → Grid/column gaps
spacing.section.{size}   → Large-scale page divisions
```

### Usage Guidelines

| Context | Category | Recommended Size |
|---------|----------|------------------|
| Between icon and label | inline | xs |
| Between form fields | stack | sm |
| Between paragraphs | stack | md |
| Between heading and body | stack | sm |
| Between sections | stack | xl or 2xl |
| Card padding | inset | md or lg |
| Modal padding | inset | lg |
| Grid columns | gutter | md or lg |
| Page sections | section | 2xl or 3xl |

### Relationship to Typography

Spacing and typography are deeply connected. The `stack` spacing between a heading and its body text should be *less* than the `stack` spacing between paragraphs—because the heading belongs to its content.

**Heading-to-Body Relationship:**
```
┌──────────────────────────┐
│ Heading                  │
└──────────────────────────┘
     ↕ stack.sm (8px)        ← Tight: heading owns what follows
┌──────────────────────────┐
│ First paragraph of body  │
│ text continues here...   │
└──────────────────────────┘
     ↕ stack.md (16px)       ← Normal: paragraph break
┌──────────────────────────┐
│ Second paragraph begins  │
│ with appropriate space   │
└──────────────────────────┘
```

**Section Relationship:**
```
┌──────────────────────────┐
│ End of Section A         │
└──────────────────────────┘
     ↕ stack.2xl (48px)      ← Large: clear section break
┌──────────────────────────┐
│ Section B Heading        │
└──────────────────────────┘
```

---

## Implementation Plan

### Step 1: Audit Current Spacing Primitives

**File**: `packages/tokens/src/primitives/spacing.json`

Current state:
- Values 0–24 exist (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- These are sufficient as primitives

No changes needed to primitives—they provide adequate raw material.

### Step 2: Create Semantic Spacing Tokens

**File**: `packages/tokens/src/semantic/spacing.json` (new file)

Define the five semantic categories with size variants:

```json
{
  "spacing": {
    "stack": {
      "xs": { "value": "{primitive.spacing.1}" },
      "sm": { "value": "{primitive.spacing.2}" },
      "md": { "value": "{primitive.spacing.4}" },
      "lg": { "value": "{primitive.spacing.6}" },
      "xl": { "value": "{primitive.spacing.8}" },
      "2xl": { "value": "{primitive.spacing.12}" },
      "3xl": { "value": "{primitive.spacing.16}" }
    },
    "inline": { ... },
    "inset": { ... },
    "gutter": { ... },
    "section": { ... }
  }
}
```

### Step 3: Update Build Configuration

**File**: `packages/tokens/build.js`

Include `semantic/spacing.json` in the build pipeline alongside `semantic/base.json` and `semantic/typography.json`.

### Step 4: Create Tailwind Spacing Utilities

**File**: `packages/ui/tailwind.config.js`

Extend Tailwind's spacing scale with semantic tokens:

```js
spacing: {
  'stack-xs': 'var(--spacing-stack-xs)',
  'stack-sm': 'var(--spacing-stack-sm)',
  // ...
  'inset-md': 'var(--spacing-inset-md)',
  // ...
}
```

This enables classes like:
- `mb-stack-md` (margin-bottom: stack medium)
- `p-inset-lg` (padding: inset large)
- `gap-gutter-md` (gap: gutter medium)

### Step 5: Create Spacing Utility Components (Optional)

Consider creating layout primitives that encode spacing rules:

```tsx
<Stack gap="md">
  <Heading>Title</Heading>
  <Paragraph>Content...</Paragraph>
</Stack>
```

This is optional but can enforce consistency better than utility classes alone.

### Step 6: Document the Spacing System

**File**: `packages/ui/docs/nyt_theme/02a_SPACING_SCALE.md`

Visual documentation showing:
- The complete scale with visual examples
- Usage guidelines for each category
- Common patterns (card spacing, section spacing, form spacing)
- Anti-patterns to avoid

### Step 7: Update Components

Audit existing components to use semantic spacing:
- **Card**: Use `inset-md` or `inset-lg` for padding
- **Callout**: Use `inset-md` for padding, `inline-sm` for icon gap
- **Button**: Use `inline-sm` for icon-to-text spacing

---

## Success Criteria

1. **Completeness**: All five spacing categories defined with 7 size variants each
2. **Build Integration**: Tokens compile to CSS custom properties
3. **Tailwind Integration**: Semantic spacing classes available
4. **Documentation**: Spacing system visually documented
5. **Component Adoption**: Existing components refactored to use semantic spacing
6. **Zero Raw Values**: No hardcoded px/rem values in component styles

---

## Open Questions

1. **Asymmetric Insets**: Should we support `inset-x` and `inset-y` variants for horizontal/vertical padding independently?

2. **Responsive Spacing**: Should `section.2xl` become `section.xl` on mobile? How do we encode responsive behavior in tokens?

3. **Negative Space**: Do we need negative spacing tokens for overlapping elements, or is that too edge-case?

4. **Component-Specific Spacing**: Should components like `Card` have their own spacing tokens (`spacing.card.padding`), or rely on the generic system?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Spacing complements type scale—vertical rhythm depends on both |
| Phase 3 (Motion) | Spacing changes during animation should use consistent values |
| Phase 4 (Color) | No direct relationship |
| Phase 5 (Accessibility) | Adequate spacing aids readability and touch targets |
| Phase 6 (Components) | All components will consume spacing tokens |

---

## The Destination

When this phase is complete, a developer should never write:

```tsx
// ❌ Arbitrary values
<div className="p-5 mb-7 gap-3">
```

Instead, they will write:

```tsx
// ✓ Semantic spacing
<div className="p-inset-md mb-stack-lg gap-gutter-sm">
```

The class names explain *why* the spacing exists, not just *how much* it is.

---

*"Whitespace is like air: it is necessary for design to breathe."*
— Wojciech Zieliński
