# Phase 5: Accessibility

## Philosophy

### Accessibility is Not a Feature

Accessibility is not a checklist item. It is not a "nice to have." It is not something we add after the design is done.

Accessibility is the design.

When the New York Times publishes a story, it reaches millions of readers—including those who navigate by keyboard, those who use screen readers, those with low vision, those with cognitive differences, those in bright sunlight, those on slow connections. A design system that excludes any of these readers has failed.

### The Four Pillars

The Web Content Accessibility Guidelines (WCAG) are built on four principles. Our token system must serve all of them:

**1. Perceivable** — Information must be presentable in ways users can perceive
- Sufficient color contrast
- Text alternatives for non-text content
- Content adaptable to different presentations

**2. Operable** — Interface must be operable by all users
- Keyboard accessible
- Adequate time to interact
- No seizure-inducing content
- Clear navigation

**3. Understandable** — Content must be understandable
- Readable text
- Predictable behavior
- Input assistance

**4. Robust** — Content must be robust enough for assistive technologies
- Compatible with current and future tools
- Valid, semantic markup

### What Tokens Can Control

Design tokens directly impact:
- Color contrast (perceivable)
- Focus visibility (operable)
- Text sizing and spacing (perceivable, understandable)
- Motion preferences (operable)
- Touch target sizing (operable)

---

## Contrast Requirements

### WCAG AA Standards

| Content Type | Minimum Ratio | Our Target |
|--------------|---------------|------------|
| Normal text (<18px) | 4.5:1 | 5:1+ |
| Large text (≥18px bold, ≥24px) | 3:1 | 4:1+ |
| UI components & graphics | 3:1 | 3.5:1+ |
| Focus indicators | 3:1 | 3.5:1+ |

**Our philosophy:** Meet AA, aim for AAA where practical. We target slightly above minimums because edge cases (color calibration, ambient light) erode margins.

### Current Issues

**Light Mode:**
| Token | Current | Background | Ratio | Status |
|-------|---------|------------|-------|--------|
| `text.primary` | gray-900 (#18181b) | white | 16.8:1 | ✓ Pass |
| `text.secondary` | gray-600 (#52525b) | white | 7.0:1 | ✓ Pass |
| `text.muted` | gray-400 (#a1a1aa) | white | 3.0:1 | ✗ **Fail** |
| `text.muted` | gray-400 (#a1a1aa) | gray-50 | 2.7:1 | ✗ **Fail** |

**Dark Mode:**
| Token | Current | Background | Ratio | Status |
|-------|---------|------------|-------|--------|
| `text.primary` | gray-100 (#f4f4f5) | gray-950 | 17.4:1 | ✓ Pass |
| `text.secondary` | gray-400 (#a1a1aa) | gray-950 | 6.9:1 | ✓ Pass |
| `text.muted` | gray-500 (#71717a) | gray-950 | 4.1:1 | ~ Borderline |

### Required Fixes

**`text.muted` must be adjusted:**
- Light mode: Change from gray-400 to gray-500 (#71717a) — achieves 4.6:1
- Alternative: Use gray-500 for muted, restrict usage to large text or non-essential content

**Guidance for muted text:**
"Muted" should mean "de-emphasized," not "unreadable." If content is important enough to display, it's important enough to be legible.

---

## Focus Indicators

### The Problem with Default Focus

Browser default focus rings are:
- Inconsistent across browsers
- Often too subtle
- Sometimes hidden by `outline: none` (a common anti-pattern)

### Our Focus Strategy

**Principle:** Focus must be visible, consistent, and beautiful.

**Token structure:**
```
color.focus.ring         → The ring color
color.focus.offset       → The offset (gap between element and ring)
focus.ring.width         → Ring thickness
focus.ring.offset-width  → Offset distance
```

**Default values:**
- `focus.ring`: `color.accent.primary` (NYT blue) or high-contrast variant
- `focus.ring.width`: 2px
- `focus.ring.offset`: 2px
- `focus.offset-color`: `color.bg.primary` (maintains visibility)

**Implementation:**
```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--color-focus-ring);
  outline-offset: var(--focus-ring-offset-width);
}
```

**Note:** Use `:focus-visible`, not `:focus`, to avoid showing focus rings on mouse clicks while maintaining keyboard visibility.

---

## Motion Accessibility

### Respecting User Preferences

Some users experience vestibular disorders, migraines, or other conditions where motion causes discomfort or harm. The `prefers-reduced-motion` media query lets us respect their preferences.

**Required implementation:**
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

**Token-level support:**
```
motion.duration.reduced   → 0.01ms (near-instant)
```

Components should check this preference and use `motion.duration.reduced` when active.

### What Still Moves

Even with reduced motion, some feedback is necessary:
- Instant color changes (no transition needed)
- Immediate state changes
- Essential loading indicators (prefer opacity over movement)

---

## Typography Accessibility

### Minimum Sizes

| Context | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 16px | 18px for long-form |
| Caption text | 12px | 13px+ |
| Button text | 14px | 16px |
| Form labels | 14px | 16px |

**Token enforcement:** Our `font.size.caption` should not go below 12px. Our `font.size.body` should be 16px minimum.

### Line Height & Spacing

**WCAG 1.4.12 (Text Spacing):** Users must be able to adjust:
- Line height to at least 1.5× font size
- Paragraph spacing to at least 2× font size
- Letter spacing to at least 0.12× font size
- Word spacing to at least 0.16× font size

**Our approach:** Design with generous defaults so user adjustments don't break layouts.
- Body line height: 1.6 (exceeds 1.5 requirement)
- Paragraph margins: Use `stack.md` (16px) or larger
- Don't use fixed heights on text containers

### Line Length

Optimal reading: 45-75 characters per line. Maximum: 80 characters.

**Token consideration:** While not a token per se, our layout system should enforce `max-width` on prose containers:
```css
.prose {
  max-width: 65ch; /* ~65 characters */
}
```

---

## Touch & Click Targets

### Minimum Sizes

**WCAG 2.5.5 (Target Size):** Interactive elements should be at least 44×44 CSS pixels.

**Our tokens:**
```
size.touch.minimum     → 44px (2.75rem)
size.touch.comfortable → 48px (3rem)
```

**Application:**
- Buttons: Minimum height 44px
- Clickable cards: Full surface clickable
- Form inputs: Minimum height 44px
- Icon buttons: 44×44px minimum (icon can be smaller, tap target cannot)

### Spacing Between Targets

Adjacent interactive elements need spacing to prevent mis-taps:
```
spacing.touch.gap      → 8px minimum between adjacent targets
```

---

## Screen Reader Considerations

### What Tokens Can't Do

Screen readers rely on:
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA attributes
- Logical reading order
- Alt text

Tokens don't control these—components do. But our component documentation must mandate accessibility.

### What Tokens Support

**Visually hidden content:**
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

This utility class (powered by fixed values, not tokens) allows content visible to screen readers but hidden visually.

---

## High Contrast Mode

### Windows High Contrast

Windows High Contrast Mode overrides colors. We should:
- Not rely solely on color to convey information
- Ensure borders/outlines exist (not just background color)
- Test in high contrast mode

### Forced Colors

```css
@media (forced-colors: active) {
  /* Ensure critical borders are visible */
  .button {
    border: 2px solid currentColor;
  }
}
```

### Token Support

Consider a high-contrast theme variant:
```
themes/
  nyt/
    light.json
    dark.json
    high-contrast.json  ← New
```

This theme would:
- Maximize contrast (pure black/white)
- Increase border widths
- Enlarge focus indicators

---

## Implementation Plan

### Step 1: Audit Current Contrast

Run every foreground/background token combination through a contrast checker.

**Deliverable:** Contrast matrix documenting all pairings and their ratios.

### Step 2: Fix Failing Tokens

Adjust colors that fail WCAG AA:
- `text.muted`: gray-400 → gray-500 (light mode)
- Review all status colors on their backgrounds
- Review link colors on all backgrounds

### Step 3: Implement Focus Tokens

**File:** `packages/tokens/src/semantic/base.json`

Add:
```json
"focus": {
  "ring": { "value": "{color.accent.primary}" },
  "ring-width": { "value": "2px" },
  "ring-offset": { "value": "2px" },
  "ring-offset-color": { "value": "{color.bg.primary}" }
}
```

### Step 4: Add Reduced Motion Support

**File:** `packages/tokens/build/css/base.css` (or equivalent)

Include the `prefers-reduced-motion` reset in the base CSS output.

### Step 5: Define Touch Target Tokens

**File:** `packages/tokens/src/semantic/sizing.json` (new)

```json
"size": {
  "touch": {
    "minimum": { "value": "2.75rem" },
    "comfortable": { "value": "3rem" }
  }
}
```

### Step 6: Create Accessibility Utilities

**File:** `packages/ui/src/lib/accessibility.css`

Include:
- `.sr-only` (screen reader only)
- `.not-sr-only` (undo sr-only)
- `.focus-visible` styles
- `prefers-reduced-motion` overrides

### Step 7: Document Accessible Pairings

**File:** `packages/ui/docs/nyt_theme/05a_CONTRAST_MATRIX.md`

Visual documentation showing:
- Every valid foreground/background pairing
- Contrast ratios
- Usage guidance

### Step 8: Component Audit

Review each component for:
- Keyboard operability
- Focus visibility
- Screen reader labels
- Touch target sizes
- Color contrast

---

## Success Criteria

1. **Contrast Compliance:** All text/background pairings meet WCAG AA (4.5:1)
2. **Focus Visibility:** All interactive elements have visible focus states
3. **Motion Respect:** `prefers-reduced-motion` fully supported
4. **Touch Targets:** All interactive elements ≥44px
5. **Documentation:** Contrast matrix and accessibility guidelines complete
6. **Component Compliance:** All components pass accessibility audit

---

## Testing Requirements

### Automated Testing

- **axe-core:** Integrate into Storybook and CI
- **Lighthouse:** Accessibility score ≥95
- **Color contrast:** Automated checking in build

### Manual Testing

- **Keyboard:** Navigate entire UI without mouse
- **Screen reader:** Test with VoiceOver (Mac), NVDA (Windows)
- **Zoom:** Test at 200% and 400% zoom
- **High contrast:** Test in Windows High Contrast Mode
- **Reduced motion:** Test with preference enabled

---

## Open Questions

1. **Muted Text Purpose:** Should `text.muted` be restricted to non-essential decorative text only? Or should we raise its contrast and allow broader use?

2. **Focus Ring Style:** Should focus rings be solid or use a double-ring (inner/outer) for maximum visibility across backgrounds?

3. **Dark Mode Contrast:** Dark mode often has lower contrast by design (easier on eyes). Should we maintain the same contrast ratios, or allow slightly lower ratios in dark mode?

4. **Animation Alternatives:** For users with reduced motion, should we provide alternative feedback (e.g., color flash instead of slide animation)?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Font sizes must meet minimum readability requirements |
| Phase 2 (Spacing) | Touch targets and spacing affect operability |
| Phase 3 (Motion) | `prefers-reduced-motion` is an accessibility requirement |
| Phase 4 (Color) | Contrast is the core accessibility concern for color |
| Phase 6 (Components) | Components must implement accessible patterns |

---

## The Destination

When this phase is complete:

- **Every reader can read.** No text is too faint, too small, or too cramped.
- **Every user can navigate.** Keyboard, mouse, touch, voice—all work.
- **Every interaction is visible.** Focus states are clear and consistent.
- **Every preference is respected.** Reduced motion, high contrast, zoom—all honored.

Accessibility is not accommodation. It is hospitality.

---

*"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."*
— Tim Berners-Lee
