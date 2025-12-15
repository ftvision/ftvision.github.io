# Phase 6: Component Expression

## Philosophy

### Components Are Honest

In brutalism, a component does not pretend to be anything other than what it is. A button is a rectangle with a border. A card is a bordered box. An input is a bordered rectangle where you type.

There are no shadows suggesting depth that doesn't exist. No gradients implying three-dimensionality. No rounded corners softening the edges of what is, fundamentally, a rectangular interface.

### The Brutalist Component Ethos

**1. Borders Define Boundaries**

Every container has a visible border. Cards have borders. Inputs have borders. Buttons have borders. The border is not decoration—it is the definition of where the element begins and ends.

**2. States Are Distinct**

Hover is not a "slightly lighter shade." Hover is an inversion, or a clear color change. Focus is not a subtle glow. Focus is a thick outline. Active is not a darkening. Active is a visible press. States must be unmistakable.

**3. No Decoration**

Components have:
- Content
- Borders
- Backgrounds (usually solid colors)
- States

Components do not have:
- Shadows
- Gradients
- Icons for decoration
- Ornamental elements

---

## Component Taxonomy

### Layer Model

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 4: TEMPLATES                                     │
│  Full page layouts                                      │
│  (ArticleLayout, DashboardLayout)                       │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: PATTERNS                                      │
│  Multi-element compositions                             │
│  (Modal, Tabs, Accordion)                               │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: PRIMITIVES                                    │
│  Single-purpose building blocks                         │
│  (Button, Card, Input)                                  │
├─────────────────────────────────────────────────────────┤
│  LAYER 1: TOKENS                                        │
│  Design decisions as variables                          │
│  (@blog/tokens)                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Primitive Components

### Button

The button is a bordered rectangle. Nothing more.

**Anatomy:**
```
┌─────────────────────────────────────┐
│                                     │
│         BUTTON LABEL                │
│                                     │
└─────────────────────────────────────┘
  ↑ 2px solid border
```

**Variants:**

| Variant | Background | Text | Border | Usage |
|---------|------------|------|--------|-------|
| Primary | ground.inverse | figure.inverse | border.default | Primary actions |
| Secondary | transparent | figure.primary | border.default | Secondary actions |
| Danger | status.danger | figure.inverse | status.danger | Destructive actions |

**States:**

| State | Primary Changes | Secondary Changes |
|-------|-----------------|-------------------|
| Default | Black bg, white text | Transparent bg, black border |
| Hover | Dark gray bg (#333) | Light gray bg (#F5F5F5) |
| Active | Darker gray bg (#1A1A1A) | Darker gray bg (#E5E5E5) |
| Focus | 3px accent outline | 3px accent outline |
| Disabled | Gray bg (#999), no pointer | Gray border (#999), no pointer |

**Specifications:**
- Height: 48px (comfortable touch target)
- Padding: 16px horizontal, 12px vertical
- Border: 2px solid
- Text: Uppercase, medium weight, letter-spaced
- Corners: 0px (no radius)

**Implementation:**
```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium uppercase tracking-wide border-2 px-inset-md py-inset-sm min-h-touch transition-none',
  {
    variants: {
      variant: {
        primary: 'bg-ground-inverse text-figure-inverse border-border hover:bg-gray-800 active:bg-gray-900',
        secondary: 'bg-transparent text-figure-primary border-border hover:bg-ground-secondary active:bg-ground-tertiary',
        danger: 'bg-status-danger text-figure-inverse border-status-danger hover:bg-red-700 active:bg-red-800',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);
```

---

### Card

A bordered container for grouped content.

**Anatomy:**
```
┌─────────────────────────────────────────┐
│                                         │
│   CARD TITLE                            │ ← Bold, uppercase
│   ─────────────────────────             │ ← Optional separator
│                                         │
│   Card content goes here. The text      │
│   lives within the bordered container.  │
│                                         │
│   [ACTION]                              │ ← Optional footer
│                                         │
└─────────────────────────────────────────┘
  ↑ 2px solid border (all sides)
```

**Variants:**

| Variant | Border | Background | Usage |
|---------|--------|------------|-------|
| Default | 2px black | white | Standard card |
| Elevated | 4px black | white | Emphasized card |
| Inverted | 2px black | black | High-contrast callout |

**Specifications:**
- Border: 2px solid (default), 4px solid (elevated)
- Padding: inset-lg (32px)
- Background: ground.primary (default), ground.inverse (inverted)
- Corners: 0px

**Implementation:**
```tsx
const cardVariants = cva(
  'border-border p-inset-lg',
  {
    variants: {
      variant: {
        default: 'border-2 bg-ground-primary',
        elevated: 'border-4 bg-ground-primary',
        inverted: 'border-2 bg-ground-inverse text-figure-inverse',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
```

---

### Input

A bordered rectangle for text entry.

**Anatomy:**
```
┌───────────────────────────────────────────┐
│ LABEL                                     │ ← Uppercase, outside input
└───────────────────────────────────────────┘
┌───────────────────────────────────────────┐
│                                           │
│ Placeholder or entered text               │ ← Monospace
│                                           │
└───────────────────────────────────────────┘
  ↑ 2px solid border
┌───────────────────────────────────────────┐
│ Helper text or error message              │ ← Below input
└───────────────────────────────────────────┘
```

**States:**

| State | Border | Background |
|-------|--------|------------|
| Default | border.default | ground.primary |
| Hover | border.default | ground.secondary |
| Focus | accent.primary | ground.primary |
| Error | status.danger | ground.primary |
| Disabled | border.muted | ground.secondary |

**Specifications:**
- Height: 48px
- Padding: 12px horizontal
- Border: 2px solid
- Font: Monospace (matches theme)
- Corners: 0px

---

### Checkbox & Radio

Selection controls with visible structure.

**Anatomy (Checkbox):**
```
┌───┐
│ ✓ │  Label text
└───┘
  ↑ 2px solid border, 20x20px
```

**Anatomy (Radio):**
```
┌───┐
│ ● │  Label text
└───┘
  ↑ 2px solid border, 20x20px (still square in brutalism)
```

**Note:** Brutalist radios are **square**, not circular. The circle suggests organic softness. Squares are honest geometry.

**States:**
- Unchecked: Empty bordered square
- Checked: Bordered square with solid fill or checkmark
- Focus: 3px accent outline around the control

---

### Badge

A small label for status or category.

**Anatomy:**
```
┌─────────┐
│ STATUS  │
└─────────┘
  ↑ 2px border, uppercase text
```

**Variants:**

| Variant | Background | Border | Text |
|---------|------------|--------|------|
| Default | transparent | border.default | figure.primary |
| Info | status.info-bg | status.info | status.info |
| Success | status.success-bg | status.success | status.success |
| Warning | status.warning-bg | status.warning | figure.primary |
| Danger | status.danger-bg | status.danger | status.danger |

**Specifications:**
- Height: 24px
- Padding: 4px horizontal
- Border: 1px solid
- Font: Uppercase, small, letter-spaced
- Corners: 0px

---

### Separator

A visible divider between content.

**Anatomy:**
```
────────────────────────────────────────────
  ↑ 2px solid border (not 1px!)
```

**Specifications:**
- Height: 2px (horizontal) or width: 2px (vertical)
- Color: border.default
- Margin: stack-md or inline-md

In brutalism, separators are **visible**. No subtle 1px hairlines.

---

## Pattern Components

### Modal

A centered dialog with heavy overlay.

**Anatomy:**
```
┌─────────────────────────────────────────────────────────────┐
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│░░░░░░┌────────────────────────────────────────────┐░░░░░░░░│
│░░░░░░│ ×                                          │░░░░░░░░│ ← Close button
│░░░░░░├────────────────────────────────────────────┤░░░░░░░░│
│░░░░░░│ MODAL TITLE                                │░░░░░░░░│
│░░░░░░├────────────────────────────────────────────┤░░░░░░░░│
│░░░░░░│                                            │░░░░░░░░│
│░░░░░░│ Modal content goes here.                   │░░░░░░░░│
│░░░░░░│                                            │░░░░░░░░│
│░░░░░░├────────────────────────────────────────────┤░░░░░░░░│
│░░░░░░│              [CANCEL] [CONFIRM]            │░░░░░░░░│
│░░░░░░└────────────────────────────────────────────┘░░░░░░░░│
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└─────────────────────────────────────────────────────────────┘
           ↑ overlay.scrim (80% black)
```

**Specifications:**
- Overlay: 80% black (heavier than typical 50%)
- Modal: 4px border, no shadow
- Animation: Quick fade-in, or instant
- Close: X button or clicking outside

---

### Tabs

Segmented navigation with clear active state.

**Anatomy:**
```
┌─────────┬─────────┬─────────┐
│ TAB ONE │  TAB 2  │  TAB 3  │
├─────────┼─────────┼─────────┘
│ ████████│         │
│ ████████│ Content for active tab
│ ████████│
└─────────┘
  ↑ Active tab has bottom border removed, or inverted colors
```

**Active State Options:**

1. **Underline removed**: Active tab's bottom border disappears, merging with content
2. **Inverted colors**: Active tab has inverted background
3. **Thick underline**: Active tab has 4px bottom border

**Recommendation:** Option 3 (thick underline) is most brutalist—it adds emphasis through weight, not removal.

---

### Accordion

Expandable sections with clear indicators.

**Anatomy:**
```
┌─────────────────────────────────────────┐
│ ▸ SECTION TITLE                         │ ← Collapsed, arrow pointing right
├─────────────────────────────────────────┤
│ ▾ SECTION TITLE                         │ ← Expanded, arrow pointing down
│ ┌─────────────────────────────────────┐ │
│ │ Section content is revealed.        │ │
│ │ No smooth animation—it appears.     │ │
│ └─────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ ▸ SECTION TITLE                         │
└─────────────────────────────────────────┘
```

**Specifications:**
- Sections separated by borders
- Arrow indicator (▸/▾) or +/- symbols
- Animation: Quick or instant
- Content has inset padding

---

### Tooltip

Contextual information on hover/focus.

**Anatomy:**
```
              ┌─────────────────────┐
              │ Tooltip content     │
              └─────────────────────┘
                       ▲
                    Element
```

**Specifications:**
- Background: ground.inverse
- Text: figure.inverse
- Border: 2px solid (same color as background)
- No shadow
- Appears quickly (50ms), disappears instantly

---

## Editorial Components

### Blockquote

A bordered quotation.

**Anatomy:**
```
┌───────────────────────────────────────────────┐
│ ║                                             │
│ ║  "Quote text goes here. It may span        │
│ ║   multiple lines of content."              │
│ ║                                             │
│ ║                      — Attribution          │
└───────────────────────────────────────────────┘
  ↑ 4px left border (accent or black)
```

**Specifications:**
- Left border: 4px solid
- Padding: inset-md
- Quote text: Body size, possibly italic
- Attribution: Caption size, secondary color

---

### Code Block

Monospace code display.

**Anatomy:**
```
┌───────────────────────────────────────────────┐
│                                               │
│  1  const message = 'Hello, World';          │
│  2  console.log(message);                    │
│                                               │
└───────────────────────────────────────────────┘
  ↑ 2px border, background: surface.code
```

**Specifications:**
- Border: 2px solid
- Background: surface.code (light gray)
- Font: Monospace (already theme default)
- Line numbers: Optional, muted color
- Padding: inset-md

**Note:** In a monospace theme, code blocks feel native. They don't need special treatment beyond containment.

---

### Figure

Image with caption.

**Anatomy:**
```
┌───────────────────────────────────────────────┐
│                                               │
│                   [IMAGE]                     │
│                                               │
├───────────────────────────────────────────────┤
│ Caption describing the image.                 │
│ Credit: Photographer Name                     │
└───────────────────────────────────────────────┘
  ↑ Border around entire figure
```

**Specifications:**
- Border: 2px solid around container
- Caption: Below image, inset padding
- Caption text: Small, secondary color

---

### Callout

Highlighted information block.

**Anatomy:**
```
┌───────────────────────────────────────────────┐
│ ████████████████████████████████████████████ │ ← Header bar (inverted)
│ █  ⚠  WARNING                              █ │
│ ████████████████████████████████████████████ │
│                                               │
│  This is important information that needs    │
│  the reader's attention.                     │
│                                               │
└───────────────────────────────────────────────┘
  ↑ 2px border all around
```

**Variants:**
- Info (blue header)
- Success (green header)
- Warning (yellow header)
- Danger (red header)

---

## Implementation Checklist

### For Each Component

- [ ] Uses only semantic tokens (no hardcoded values)
- [ ] Has visible borders where appropriate
- [ ] States are distinct and immediate
- [ ] No shadows unless specifically justified
- [ ] No border-radius
- [ ] Keyboard accessible
- [ ] Focus state visible (3px accent outline)
- [ ] Works in light and dark mode
- [ ] Storybook stories complete

---

## Success Criteria

1. **Visual Consistency**: All components share the brutalist aesthetic
2. **Token Compliance**: Zero hardcoded colors, spacing, or typography
3. **Accessibility**: All components pass axe-core audit
4. **State Clarity**: Every state is visually distinct
5. **Documentation**: Storybook stories demonstrate all variants and states
6. **Border Presence**: Every container has visible boundaries

---

## The Destination

When this phase is complete, an article built from these components will look like a document—structured, honest, and clear:

```tsx
<article className="border-2 border-border p-inset-lg">
  <header>
    <Badge>TECHNICAL</Badge>
    <h1 className="text-h1 font-bold uppercase">Article Title</h1>
    <Byline author="Jane Doe" date="2024-01-15" />
  </header>

  <Separator />

  <section className="prose">
    <p>Body text in monospace...</p>

    <Blockquote attribution="Someone Important">
      "A meaningful quotation."
    </Blockquote>

    <CodeBlock language="typescript">
      {`const truth = 'Structure is visible.'`}
    </CodeBlock>

    <Callout variant="warning" title="Important">
      Critical information for the reader.
    </Callout>
  </section>

  <footer className="border-t-2 border-border pt-stack-md">
    <Button>SUBSCRIBE</Button>
  </footer>
</article>
```

No decoration. No pretense. Just content in containers.

---

*"God is in the details."*
— Ludwig Mies van der Rohe

In brutalist components, every detail serves structure.
