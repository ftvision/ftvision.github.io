# NYT Theme: Design Vision & Roadmap

## Philosophy

### The Essence

The New York Times is not merely a newspaper—it is an institution of clarity. For over 170 years, its design has served a singular purpose: **to disappear**. The best design at the Times is invisible. It does not announce itself. It simply *works*, allowing the journalism to speak.

This theme carries that ethos into the interactive age.

### Three Principles

**1. Typography is Architecture**

At the Times, type is not decoration—it is the structure itself. The relationship between a Cheltenham headline and a Georgia body creates a visual grammar that readers trust before they consciously notice it. Our tokens must encode this hierarchy as law, not suggestion.

**2. Restraint is Confidence**

A sharp corner says "we have nothing to prove." A serif font says "we have earned your time." Every rounded corner, every gratuitous animation, every splash of brand color is a small apology—an admission of insecurity. The NYT theme makes no apologies.

**3. The Grid is Sacred**

Editorial design lives and dies by vertical rhythm. When a caption aligns with body text across columns, when whitespace breathes consistently, when every element sits on an invisible baseline—that is when design becomes trustworthy. Arbitrary spacing is visual noise.

---

## The Gap Between Now and Excellence

### What We Have

A solid foundation:
- Three-layer token architecture (primitives → semantic → themes)
- Ground/figure color naming (elegant, thoughtful)
- Serif typography declaration
- Sharp corners (radius: none)
- Light and dark mode parity

### What We Lack

**The Typographic Stack**: We have font families but no scale. No one has said "this is h1, this is body, this is caption." Without a declared hierarchy, every developer invents their own. The result is chaos dressed as flexibility.

**Vertical Rhythm**: Spacing exists as raw numbers (0–24). But spacing without system is noise. We need semantic spacing that enforces rhythm—`stack`, `inline`, `gutter`—not just sizes.

**Motion Language**: Interactive journalism requires movement. But uncoordinated animation is worse than none. We need duration and easing tokens that feel like *one hand* controlled every transition.

**The Extended Palette**: Status colors (info, warning, danger) are utility colors. But what about the storytelling colors? The subtle highlight behind a blockquote? The accent that draws the eye to an interactive element? Editorial design needs more than error states.

**Accessibility as Foundation**: `text.muted` on white background fails WCAG AA. This is not a detail—it is a broken promise to readers. Accessibility must be baked into token definitions, not bolted on later.

---

## The Roadmap

### Phase 1: Typographic Foundation

**Goal**: Establish an unambiguous type hierarchy that requires no interpretation.

**Deliverables**:
- Semantic font size tokens: `display`, `h1`–`h4`, `body`, `body-sm`, `caption`, `label`
- Line height pairings for each size (tighter for headlines, relaxed for body)
- Font weight assignments (heading: bold, body: normal, emphasis: medium)
- A type scale document showing every combination

**Success Criteria**: A developer can implement any headline or paragraph by choosing a single token. No size/weight/leading decisions required.

---

### Phase 2: Spacing System

**Goal**: Replace arbitrary spacing with a system that enforces vertical rhythm.

**Deliverables**:
- Semantic spacing tokens:
  - `stack` (vertical spacing between elements)
  - `inline` (horizontal spacing)
  - `inset` (internal padding)
  - `gutter` (column/grid gaps)
- Size variants: `xs`, `sm`, `md`, `lg`, `xl`
- Documentation showing spacing in context

**Success Criteria**: Components use named spacing. Raw pixel/rem values are forbidden in component code.

---

### Phase 3: Motion Tokens

**Goal**: Unify all animation under a single motion language.

**Deliverables**:
- Duration tokens: `instant` (0), `fast` (150ms), `normal` (300ms), `slow` (500ms), `deliberate` (800ms)
- Easing tokens: `ease-out` (default), `ease-in-out` (emphasis), `spring` (playful interactions)
- Guidelines: when to use which duration/easing pairing

**Success Criteria**: Every transition and animation references a motion token. No magic numbers.

---

### Phase 4: Extended Color Palette

**Goal**: Support editorial and interactive storytelling beyond basic UI.

**Deliverables**:
- `accent` color group (3–5 hues for data viz, highlights, interactive elements)
- `surface` variants for blockquotes, code blocks, pullquotes
- `highlight` for text selection and emphasis
- `link.visited` state (often forgotten, always needed)

**Success Criteria**: A data visualization or interactive piece can be styled entirely within the token system.

---

### Phase 5: Accessibility Audit & Remediation

**Goal**: Guarantee WCAG AA compliance across all token combinations.

**Deliverables**:
- Contrast audit of every foreground/background pairing
- Adjusted `muted` and `secondary` values where needed
- Focus state tokens (`focus.ring`, `focus.offset`)
- Documentation of accessible color pairings

**Success Criteria**: Automated contrast checking passes. No reader is excluded.

---

### Phase 6: Component Maturity

**Goal**: Bring components to publication quality.

**Deliverables**:
- Expand primitive components: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`
- Add pattern components: `Tabs`, `Accordion`, `Modal`, `Tooltip`
- Add editorial components: `Blockquote`, `Pullquote`, `Figure`, `Caption`, `Byline`
- Full keyboard navigation and ARIA support

**Success Criteria**: A complete article can be built using only system components.

---

## Principles for Implementation

### When Adding a Token, Ask:

1. **Is it semantic?** Tokens describe *intent*, not values. `color.action.primary` not `color.blue.600`.
2. **Is it necessary?** Every token is maintenance burden. Can an existing token serve?
3. **Is it accessible?** Has it been contrast-checked in both light and dark modes?
4. **Is it documented?** An undocumented token is a time bomb.

### When Building a Component, Ask:

1. **Does it use only semantic tokens?** No hardcoded colors, no raw spacing.
2. **Does it support both modes?** Light and dark must be first-class.
3. **Is it keyboard accessible?** If it can be clicked, it can be tabbed.
4. **Does it have stories?** Untested variants are undocumented bugs.

---

## The Destination

When this system is complete, a designer should be able to describe a page in token names alone:

> "The headline is `display` weight `bold` with `stack.lg` below. The body is `body` at `relaxed` leading. The card sits on `ground.secondary` with `inset.md` padding and `border.default`. On hover, it lifts with `shadow.md` over `duration.fast` and `ease-out`."

And a developer should be able to implement it without asking a single question.

That is the standard.

---

## Future Work

Beyond the initial six phases, the following vocabulary gaps have been identified for production-ready layouts:

### Infrastructure Tokens

**Shadows & Elevation** — Cards need lift. Modals need presence. An elevation system (`shadow.sm` through `shadow.xl`) provides depth without decoration.

**Z-Index Scale** — Semantic layering (`z.dropdown`, `z.modal`, `z.tooltip`) prevents stacking conflicts and makes the layer hierarchy explicit.

**Container Widths** — Content boundaries for optimal reading: `container.prose` (65ch), `container.content`, `container.wide`, `container.full`.

**Prose Styles** — Long-form reading optimization: paragraph spacing, heading rhythm within articles, list integration.

### Extended Vocabulary

**Icon Sizes** — Aligned to the type scale so icons feel naturally proportioned alongside text.

**Aspect Ratios** — Consistent media proportions: `aspect.video` (16/9), `aspect.photo` (4/3), `aspect.square`.

**Interactive States** — Beyond hover/active/disabled: `selected`, `loading`, `dragging` for rich interactions.

See `07_INFRASTRUCTURE.md` for detailed specifications.

---

*"The role of the designer is to be a good host, to anticipate the needs of the guest."*
— Charles Eames

Our readers are our guests. This system is how we welcome them.
