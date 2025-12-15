# Phase 6: Component Maturity

## Philosophy

### Components are Contracts

A component is a promise. When a developer uses `<Button>`, they are trusting that it will:
- Look correct in every theme
- Work with keyboard and screen readers
- Handle edge cases gracefully
- Behave consistently everywhere it appears

Broken promises erode trust. A design system with unreliable components is worse than no system at all—it creates false confidence.

### The NYT Component Ethos

**1. Editorial First, UI Second**

This is a blog, not a SaaS dashboard. Our component library must prioritize editorial needs:
- Long-form reading
- Image-heavy layouts
- Pull quotes and blockquotes
- Bylines and attribution
- Data visualization contexts

Standard UI components (buttons, forms) are necessary but secondary.

**2. Composition Over Configuration**

A component with 47 props is not flexible—it is fragile. We prefer small, composable primitives that combine into larger patterns:

```tsx
// ❌ Mega-component with endless props
<Card
  title="..."
  subtitle="..."
  image="..."
  imagePosition="left"
  showBorder={true}
  ...
/>

// ✓ Composable primitives
<Card>
  <CardImage src="..." />
  <CardContent>
    <CardTitle>...</CardTitle>
    <CardDescription>...</CardDescription>
  </CardContent>
</Card>
```

**3. Tokens All the Way Down**

No component may use hardcoded colors, sizes, or spacing. Every visual property must reference a token. This is non-negotiable.

```tsx
// ❌ Hardcoded values
className="p-4 text-gray-700 bg-gray-50"

// ✓ Token references
className="p-inset-md text-figure-secondary bg-ground-secondary"
```

---

## Component Taxonomy

### Layer Model

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 4: TEMPLATES                                     │
│  Full page layouts, article templates                   │
│  (ArticleLayout, LandingPage)                          │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: PATTERNS                                      │
│  Complex, multi-element compositions                    │
│  (Callout, Modal, Accordion, Tabs)                     │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: PRIMITIVES                                    │
│  Basic UI building blocks                               │
│  (Button, Card, Input, Badge)                          │
├─────────────────────────────────────────────────────────┤
│  LAYER 1: TOKENS                                        │
│  Design decisions as variables                          │
│  (@blog/tokens)                                        │
└─────────────────────────────────────────────────────────┘
```

**Rule:** Components only import from same or lower layers.

---

## Current State

### Existing Components

| Component | Layer | Status | Notes |
|-----------|-------|--------|-------|
| Button | Primitive | ✓ Complete | CVA variants, accessible |
| Card | Primitive | ✓ Complete | Composition pattern |
| Callout | Pattern | ✓ Complete | Status variants |

### Gaps

**Missing Primitives:**
- Input, Textarea, Select (forms)
- Checkbox, Radio, Switch (toggles)
- Badge, Tag (labels)
- Avatar (identity)
- Separator (visual breaks)

**Missing Patterns:**
- Modal, Dialog (overlays)
- Tabs, Accordion (disclosure)
- Tooltip, Popover (contextual)
- Toast, Alert (notifications)
- Dropdown, Menu (navigation)

**Missing Editorial Components:**
- Blockquote, Pullquote (quotations)
- Figure, Caption (images)
- Byline, Dateline (attribution)
- Footnote, Sidenote (annotations)
- CodeBlock (syntax highlighting)
- Table (data display)

---

## Component Specifications

### Tier 1: Form Primitives

#### Input

Text input field for single-line data entry.

**Variants:**
- `default` — Standard text input
- `error` — With error state styling

**Sizes:** `sm`, `md`, `lg`

**States:** default, hover, focus, disabled, error

**Anatomy:**
```
┌─────────────────────────────────────┐
│ Label (optional)                    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [Icon] Placeholder text         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Helper text or error message        │
└─────────────────────────────────────┘
```

**Token Usage:**
- Background: `ground.secondary`
- Border: `border.default` → `border.strong` (focus) → `status.danger` (error)
- Text: `figure.primary`
- Placeholder: `figure.muted`
- Focus ring: `focus.ring`

---

#### Textarea

Multi-line text input.

**Inherits:** All Input properties
**Additional:** Auto-resize option, character count

---

#### Select

Dropdown selection field.

**Variants:** `default`, `error`
**Sizes:** `sm`, `md`, `lg`

**Note:** Native `<select>` for accessibility, custom styling via CSS.

---

#### Checkbox & Radio

Toggle inputs for single or multiple selection.

**States:** unchecked, checked, indeterminate (checkbox only), disabled

**Token Usage:**
- Unchecked: `ground.primary` with `border.default`
- Checked: `action.primary` background
- Checkmark: `figure.inverse`

---

#### Switch

Binary toggle for on/off states.

**Sizes:** `sm`, `md`
**States:** off, on, disabled

---

### Tier 2: Display Primitives

#### Badge

Small label for status, counts, or categories.

**Variants:**
- `default` — Neutral
- `info`, `success`, `warning`, `danger` — Status
- `outline` — Border only

**Sizes:** `sm`, `md`

**Token Usage:**
- Background: `status.{variant}-bg`
- Text: `status.{variant}`
- Border: `status.{variant}` (outline variant)

---

#### Avatar

User or entity representation.

**Sizes:** `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (64px)

**Variants:**
- Image — Photo
- Initials — Text fallback
- Icon — Generic user icon

---

#### Separator

Visual divider between content sections.

**Orientation:** horizontal, vertical
**Token Usage:** `border.muted`

---

### Tier 3: Overlay Patterns

#### Modal

Overlay dialog for focused interactions.

**Anatomy:**
```
┌─────────────────────────────────────┐
│ [X]                     Close button│
├─────────────────────────────────────┤
│ Title                               │
├─────────────────────────────────────┤
│                                     │
│ Content area                        │
│                                     │
├─────────────────────────────────────┤
│              [Cancel] [Confirm]     │
└─────────────────────────────────────┘
```

**Requirements:**
- Focus trap (keyboard cannot escape)
- Escape key closes
- Click outside closes (optional)
- Body scroll lock
- ARIA `role="dialog"`, `aria-modal="true"`

**Token Usage:**
- Backdrop: `overlay.scrim`
- Surface: `ground.primary`
- Entry animation: `duration.slow` + `ease.enter`
- Exit animation: `duration.normal` + `ease.exit`

---

#### Tooltip

Contextual information on hover/focus.

**Placement:** top, right, bottom, left (auto-flip)
**Trigger:** hover, focus

**Requirements:**
- Delay before appearing (~300ms)
- ARIA `role="tooltip"`
- `aria-describedby` connection

---

#### Popover

Rich content overlay triggered by click.

**Similar to Tooltip but:**
- Click-triggered (not hover)
- Can contain interactive content
- Explicit close action

---

### Tier 4: Disclosure Patterns

#### Tabs

Content organization via tabbed interface.

**Anatomy:**
```
┌─────┬─────┬─────┬─────────────────┐
│ Tab │ Tab │ Tab │                 │ ← Tab list
├─────┴─────┴─────┴─────────────────┤
│                                   │
│ Tab panel content                 │ ← Panel
│                                   │
└───────────────────────────────────┘
```

**Requirements:**
- Arrow key navigation between tabs
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Only active panel in DOM (or hidden with `aria-hidden`)

---

#### Accordion

Expandable content sections.

**Anatomy:**
```
┌───────────────────────────────────┐
│ ▶ Section title                   │ ← Trigger (collapsed)
├───────────────────────────────────┤
│ ▼ Section title                   │ ← Trigger (expanded)
│ ┌───────────────────────────────┐ │
│ │ Section content               │ │ ← Panel
│ └───────────────────────────────┘ │
├───────────────────────────────────┤
│ ▶ Section title                   │
└───────────────────────────────────┘
```

**Modes:**
- Single — Only one section open at a time
- Multiple — Any number can be open

**Requirements:**
- Enter/Space to toggle
- `aria-expanded` on trigger
- `aria-controls` linking trigger to panel

---

### Tier 5: Editorial Components

#### Blockquote

Standard quotation with optional attribution.

**Anatomy:**
```
┌───────────────────────────────────┐
│ │ "Quote text goes here, often   │
│ │  spanning multiple lines..."   │
│ │                                │
│ │              — Attribution     │
└───────────────────────────────────┘
```

**Token Usage:**
- Border: `accent.primary` or `border.strong`
- Background: `surface.quote`
- Quote text: `figure.primary`, `type-body` (possibly italic)
- Attribution: `figure.secondary`, `type-caption`

---

#### Pullquote

Emphasized quotation pulled from article body, typically larger and centered.

**Distinction from Blockquote:**
- Blockquote: Inline with content, subtle
- Pullquote: Breaks content flow, dramatic

**Token Usage:**
- Text: `type-h2` or `type-h3`, serif
- No background (or minimal)
- Decorative quotation marks (optional)

---

#### Figure

Image container with caption support.

**Anatomy:**
```
┌───────────────────────────────────┐
│                                   │
│         [Image]                   │
│                                   │
├───────────────────────────────────┤
│ Caption text describing the image │
│ Photo credit: Photographer Name   │
└───────────────────────────────────┘
```

**Requirements:**
- `<figure>` and `<figcaption>` semantic elements
- Responsive image handling
- Optional lightbox trigger

---

#### Byline

Author attribution for articles.

**Anatomy:**
```
By [Author Name] | [Date] | [Read time]
```

**Variants:**
- Inline — Single line
- Stacked — Multi-line with avatar

**Token Usage:**
- Text: `figure.secondary`, `type-caption`
- Link: `link.default`

---

#### CodeBlock

Syntax-highlighted code display.

**Features:**
- Language detection/specification
- Line numbers (optional)
- Copy button
- Horizontal scroll for long lines

**Token Usage:**
- Background: `surface.code`
- Text: `figure.primary`, `font-code`
- Line numbers: `figure.muted`

---

## Implementation Plan

### Phase 6a: Form Primitives

1. **Input** — Text input with all states
2. **Textarea** — Multi-line input
3. **Select** — Native dropdown with custom styling
4. **Checkbox** — With label support
5. **Radio** — Radio group pattern
6. **Switch** — Toggle component

**Timeline marker:** Form-complete

---

### Phase 6b: Display Primitives

1. **Badge** — Status and category labels
2. **Avatar** — User/entity representation
3. **Separator** — Content dividers

**Timeline marker:** Display-complete

---

### Phase 6c: Overlay Patterns

1. **Modal** — Focus-trapped dialog
2. **Tooltip** — Hover information
3. **Popover** — Click-triggered overlay
4. **Toast** — Notification system

**Timeline marker:** Overlay-complete

---

### Phase 6d: Disclosure Patterns

1. **Tabs** — Tabbed interface
2. **Accordion** — Collapsible sections
3. **Dropdown** — Menu system

**Timeline marker:** Disclosure-complete

---

### Phase 6e: Editorial Components

1. **Blockquote** — Inline quotations
2. **Pullquote** — Dramatic quotations
3. **Figure** — Image with caption
4. **Byline** — Author attribution
5. **CodeBlock** — Syntax highlighting
6. **Table** — Data display

**Timeline marker:** Editorial-complete

---

## Quality Requirements

### Every Component Must Have:

1. **TypeScript types** — Full prop typing with VariantProps
2. **Ref forwarding** — `forwardRef` for all components
3. **Semantic HTML** — Correct elements, ARIA where needed
4. **Keyboard support** — Full keyboard operability
5. **Focus management** — Visible focus states
6. **Token compliance** — Zero hardcoded values
7. **Storybook stories** — All variants documented
8. **Responsive behavior** — Works at all breakpoints
9. **Theme support** — Correct in light and dark modes

### Testing Checklist

For each component:

- [ ] Renders correctly in Storybook
- [ ] All variants visible and distinct
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus states visible
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] No hardcoded colors/spacing
- [ ] Responsive at mobile/tablet/desktop
- [ ] TypeScript compiles without errors

---

## Success Criteria

1. **Primitive Coverage:** All 6 form primitives + 3 display primitives complete
2. **Pattern Coverage:** Modal, Tabs, Accordion, Tooltip complete
3. **Editorial Coverage:** Blockquote, Figure, Byline, CodeBlock complete
4. **Accessibility:** All components pass axe-core audit
5. **Documentation:** Storybook complete with usage examples
6. **Token Compliance:** Zero hardcoded values in any component

---

## Open Questions

1. **Headless vs Styled:** Should we provide headless (unstyled) variants for maximum flexibility, or only styled components?

2. **Animation Library:** For complex animations (Modal enter/exit, Accordion expand), should we use CSS transitions or a library like Framer Motion?

3. **Form Library Integration:** Should components integrate with react-hook-form, Formik, or remain library-agnostic?

4. **Compound Components vs Props:** For complex components like Tabs, should we use compound components (`<Tab>`, `<TabPanel>`) or prop-based API?

---

## The Destination

When this phase is complete, an editorial article can be built entirely from system components:

```tsx
<ArticleLayout>
  <Byline author="Jane Doe" date="2024-01-15" readTime="5 min" />

  <Typography variant="h1">Article Headline</Typography>

  <Typography variant="body">
    Opening paragraph with <Link href="...">inline links</Link>...
  </Typography>

  <Figure
    src="/images/hero.jpg"
    alt="Description"
    caption="Photo caption here"
    credit="Photographer Name"
  />

  <Typography variant="body">
    More content...
  </Typography>

  <Pullquote>
    "A powerful statement pulled from the article."
  </Pullquote>

  <Blockquote attribution="Source Name">
    A longer quotation from an external source...
  </Blockquote>

  <CodeBlock language="javascript">
    {`const example = true;`}
  </CodeBlock>

  <Callout type="info" title="Note">
    Additional context for readers.
  </Callout>
</ArticleLayout>
```

No custom CSS. No design decisions. Just content.

---

*"Good design is as little design as possible."*
— Dieter Rams
