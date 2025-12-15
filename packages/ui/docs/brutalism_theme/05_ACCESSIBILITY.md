# Phase 5: Accessibility

## Philosophy

### Brutalism is Accessible by Default

Here's the irony: brutalist design, often perceived as harsh or user-hostile, is actually **more accessible** than most modern interfaces.

Why? Because brutalism optimizes for the fundamentals:
- **High contrast** — Black on white is maximum contrast (21:1)
- **Clear boundaries** — Thick borders make element boundaries obvious
- **No mystery meat navigation** — Interactive elements look interactive
- **No decorative distractions** — Content is content
- **Immediate response** — No animations that can disorient

The challenge is maintaining these advantages while meeting formal accessibility standards.

### The Brutalist Accessibility Ethos

**1. Contrast is Not Optional**

WCAG AA requires 4.5:1 contrast for normal text. Brutalism delivers 21:1 with pure black on white. We are not trying to meet the standard. We are exceeding it by default.

**2. Focus States Must Scream**

In polished interfaces, focus rings are subtle. In brutalism, focus rings are **unmissable**. A 3px solid accent-colored outline with visible offset. You cannot navigate without seeing where you are.

**3. Structure is Explicit**

Screen readers understand heading hierarchies, landmark regions, and semantic HTML. Brutalist design reinforces this: a heading *looks* like a heading. A button *looks* like a button. Visual hierarchy matches semantic hierarchy.

---

## Contrast Compliance

### WCAG Standards

| Content Type | Minimum Ratio | Brutalism Achieves |
|--------------|---------------|-------------------|
| Normal text (<18px) | 4.5:1 | 21:1 (black on white) |
| Large text (≥18px bold, ≥24px) | 3:1 | 21:1 |
| UI components & graphics | 3:1 | 21:1 |
| Focus indicators | 3:1 | Accent on white: ~4.5:1 |

### Color Pairing Matrix

**Light Mode:**

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| figure.primary (#000) | ground.primary (#FFF) | 21:1 | ✓ Excellent |
| figure.primary (#000) | ground.secondary (#F5F5F5) | 19.3:1 | ✓ Excellent |
| figure.secondary (#333) | ground.primary (#FFF) | 12.6:1 | ✓ Excellent |
| figure.muted (#666) | ground.primary (#FFF) | 5.7:1 | ✓ Pass |
| accent.primary (#F00) | ground.primary (#FFF) | 4:1 | ~ Large text only |
| accent.primary (#F00) | ground.inverse (#000) | 5.3:1 | ✓ Pass |

**Dark Mode:**

| Foreground | Background | Ratio | Status |
|------------|------------|-------|--------|
| figure.primary (#FFF) | ground.primary (#000) | 21:1 | ✓ Excellent |
| figure.primary (#FFF) | ground.secondary (#0A0A0A) | 19.8:1 | ✓ Excellent |
| figure.secondary (#CCC) | ground.primary (#000) | 16.4:1 | ✓ Excellent |
| figure.muted (#999) | ground.primary (#000) | 10:1 | ✓ Excellent |
| accent.primary (#F00) | ground.primary (#000) | 5.3:1 | ✓ Pass |

### Accent Color Consideration

Pure red (#FF0000) on white has a contrast ratio of ~4:1, which fails for small text. Options:

1. **Use accent only for large text and UI components** — Acceptable at 3:1
2. **Darken accent for small text** — Use #CC0000 (~5.9:1) for body links
3. **Require underlines** — Visual distinction beyond color

**Recommendation:** Links always have underlines. The accent color provides additional emphasis but is not the sole indicator.

---

## Focus Indicators

### The Brutalist Focus Style

Default browser focus styles are inconsistent and often invisible. Brutalist focus is:

```css
:focus-visible {
  outline: 3px solid var(--color-accent-primary);
  outline-offset: 3px;
}
```

**Characteristics:**
- **3px width** — Thick enough to see at any size
- **Accent color** — High visibility, consistent with interactive element styling
- **3px offset** — Gap between element and ring prevents visual collision
- **No transition** — Focus appears instantly

### Focus Visibility by Component

| Component | Focus Style | Notes |
|-----------|-------------|-------|
| Button | 3px accent outline, 3px offset | Standard |
| Link | 3px accent outline, 3px offset | Plus underline |
| Input | 3px accent outline, 3px offset | Border becomes accent too |
| Checkbox/Radio | 3px accent outline, 3px offset | Wraps the entire control |
| Card (if interactive) | 3px accent outline, 3px offset | Wraps entire card |

### High Contrast Mode

Windows High Contrast Mode overrides colors. Ensure:

```css
@media (forced-colors: active) {
  :focus-visible {
    outline: 3px solid CanvasText;
    outline-offset: 3px;
  }

  .button {
    border: 2px solid ButtonText;
  }
}
```

Brutalism's reliance on borders (not just background colors) means it handles forced colors well.

---

## Motion Accessibility

### Reduced Motion

Brutalism already minimizes motion, but we still respect preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Since brutalism uses `instant` or `fast` durations by default, reduced motion mainly affects:**
- Modal/dialog entry
- Accordion expand/collapse
- Any scroll-linked effects

### No Vestibular Triggers

Brutalism avoids:
- Parallax scrolling
- Auto-playing animations
- Bouncing elements
- Scale transforms on hover

These are accessibility hazards that happen to also be non-brutalist.

---

## Typography Accessibility

### Minimum Sizes

| Context | Brutalism Size | Minimum Standard |
|---------|----------------|------------------|
| Body text | 16px (1rem) | 16px ✓ |
| Caption | 12px (0.75rem) | 12px ✓ |
| Button text | 16px | 14px ✓ |
| Form labels | 14px (0.875rem) | 14px ✓ |

### Line Height & Spacing

Brutalist typography uses **generous line heights** for monospace readability:

| Element | Line Height | WCAG 1.4.12 Requirement |
|---------|-------------|------------------------|
| Body | 1.7 | ≥ 1.5 ✓ |
| Heading | 1.2–1.3 | N/A for headings |
| Caption | 1.5 | ≥ 1.5 ✓ |

**Paragraph spacing:** `stack-md` (24px) exceeds the 2× font-size requirement (32px for 16px text).

### Line Length

Brutalism containers use `max-width: 65ch` for prose, within the 45-75 character optimal range.

```css
.prose {
  max-width: 65ch; /* Approximately 65 characters */
}
```

### Resizable Text

Brutalism uses `rem` units throughout, ensuring text scales with user preferences. No fixed pixel sizes that would break zoom.

---

## Touch & Click Targets

### Minimum Sizes

| Element | Brutalism Size | WCAG 2.5.5 Minimum |
|---------|----------------|-------------------|
| Button | 48px height | 44px ✓ |
| Icon button | 48×48px | 44×44px ✓ |
| Checkbox/Radio | 48×48px (tap area) | 44×44px ✓ |
| Link (in prose) | Line height provides vertical target | — |

### Touch Target Tokens

```
size.touch.minimum     → 44px (2.75rem)
size.touch.comfortable → 48px (3rem)
```

### Spacing Between Targets

Adjacent interactive elements need 8px minimum spacing:

```css
.button-group > * + * {
  margin-left: var(--spacing-inline-xs); /* 8px */
}
```

---

## Screen Reader Considerations

### Semantic HTML

Brutalism's emphasis on structure aligns with accessibility:

| Visual | Semantic HTML | Screen Reader Announcement |
|--------|---------------|---------------------------|
| Bold headline | `<h1>` | "Heading level 1" |
| Bordered card | `<article>` or `<section>` | "Article" or "Section" |
| Button | `<button>` | "Button, [label]" |
| Thick border input | `<input>` with `<label>` | "[Label], edit text" |

### ARIA Patterns

| Component | ARIA Requirements |
|-----------|------------------|
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| Accordion | `aria-expanded`, `aria-controls` |
| Alert | `role="alert"` for critical messages |

### Visually Hidden Content

For content that screen readers need but visual users don't:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Implementation Plan

### Step 1: Audit Contrast Ratios

Create a contrast matrix for all color pairings:

**File**: `packages/ui/docs/brutalism_theme/05a_CONTRAST_MATRIX.md`

Document every foreground/background combination with:
- Hex values
- Contrast ratio
- Pass/fail status
- Usage guidance

### Step 2: Implement Focus Tokens

**File**: `packages/tokens/src/themes/brutalism/base.json`

```json
{
  "focus": {
    "ring": { "value": "{color.accent.primary}" },
    "ring-width": { "value": "3px" },
    "ring-offset": { "value": "3px" },
    "ring-offset-color": { "value": "{color.ground.primary}" }
  }
}
```

### Step 3: Create Focus Styles

**File**: `packages/ui/src/styles/brutalism/focus.css`

```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* For elements where outline doesn't work well */
.focus-ring-inset:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 var(--focus-ring-width) var(--focus-ring);
}
```

### Step 4: Add Reduced Motion Support

**File**: `packages/ui/src/styles/brutalism/motion.css`

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Step 5: Define Touch Target Tokens

**File**: `packages/tokens/src/themes/brutalism/sizing.json`

```json
{
  "size": {
    "touch": {
      "minimum": { "value": "2.75rem" },
      "comfortable": { "value": "3rem" }
    }
  }
}
```

### Step 6: Component Audit

Audit each component for:
- [ ] Keyboard navigation
- [ ] Focus visibility
- [ ] Screen reader labels
- [ ] Touch target sizes
- [ ] Color contrast
- [ ] Semantic HTML

### Step 7: Testing Integration

- **axe-core**: Integrate into Storybook
- **Lighthouse**: Target ≥95 accessibility score
- **Manual testing**: VoiceOver, NVDA, keyboard-only

---

## Success Criteria

1. **Contrast Compliance**: All text/background pairings meet WCAG AA
2. **Focus Visibility**: All interactive elements have visible 3px focus states
3. **Motion Respect**: `prefers-reduced-motion` fully supported
4. **Touch Targets**: All interactive elements ≥44px
5. **Semantic HTML**: All components use correct elements and ARIA
6. **Documentation**: Contrast matrix and guidelines complete
7. **Testing**: All components pass axe-core audit

---

## The Brutalist Advantage

Brutalism accidentally achieves what "accessible design" struggles for:

| Common A11y Problem | How Brutalism Avoids It |
|--------------------|------------------------|
| Low contrast text | Pure black on white |
| Subtle focus states | 3px accent outlines |
| Mystery navigation | Thick borders, clear labels |
| Motion sickness | Minimal animation |
| Small touch targets | Generous sizing by default |
| Unclear hierarchy | Bold weights, size contrast |

Brutalism isn't accessible *despite* its aesthetic. It's accessible *because* of it.

---

## Open Questions

1. **Pure Black Eye Strain**: Some users report discomfort with #000 on #FFF. Should we offer a "softened" mode (#111 on #FAFAFA)?

2. **Focus Color Choice**: Red accent may be confused with error states. Should focus use a different color, or is the outline shape sufficient differentiation?

3. **Link Indication**: With red links and underlines, is there enough differentiation from body text for colorblind users? Should we use additional indicators (e.g., bold)?

4. **Form Error States**: How do we indicate form errors when our accent is already red? Use icon + text, or shift error to a different red?

---

## The Destination

When this phase is complete, brutalism will be accessibility-first without trying:

```tsx
// Every focus state is unmissable
<button className="focus:outline-accent focus:outline-3 focus:outline-offset-3">
  SUBMIT
</button>

// Every contrast ratio exceeds requirements
<p className="text-figure-primary bg-ground-primary">
  Black text on white background. 21:1 contrast.
</p>

// Every interactive element is reachable by keyboard
<Tab.List>
  {/* Arrow keys navigate, Enter/Space select */}
</Tab.List>
```

Accessibility is not an add-on. It is the architecture.

---

*"The test of the morality of a society is what it does for its children."*
— Dietrich Bonhoeffer

The test of a design system is what it does for users who need it most.
