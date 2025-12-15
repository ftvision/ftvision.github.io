# Phase 5: Accessibility

## Philosophy

### Universal Welcome (有教无类)

*有教无类* (yǒu jiào wú lèi) — "Education without discrimination."

Confucius taught that wisdom should be accessible to all, regardless of social status. This ancient principle extends to our digital design: the scholar's studio welcomes every reader, regardless of ability.

Accessibility is not an accommodation bolted onto an aesthetic. It is a fundamental expression of hospitality. A design that excludes readers with disabilities has failed at its most basic purpose—communication.

### The Contemplative Aesthetic as Accessibility Ally

The Chinese aesthetic philosophy already aligns with many accessibility principles:

- **Generous spacing** (留白) improves readability for everyone
- **High contrast** (黑墨白纸) is the foundation of Chinese visual culture
- **Slow motion** respects vestibular sensitivity by default
- **Clear hierarchy** aids cognitive processing

Our task is to ensure these natural alignments are fully realized, and to address areas where traditional aesthetics might conflict with modern accessibility requirements.

### Three Laws of Accessible Hospitality

**1. 己所不欲，勿施于人 (Jǐ suǒ bù yù, wù shī yú rén) — "What you do not wish for yourself, do not impose on others"**

If we would struggle with low contrast, motion sickness, or keyboard-only navigation, we should not impose these struggles on our readers. Empathy is the foundation of accessibility.

**2. 因材施教 (Yīn cái shī jiào) — "Teach according to aptitude"**

Different readers have different needs. Some need larger text. Some need reduced motion. Some need high contrast. Our system must adapt to serve each reader appropriately.

**3. 礼尚往来 (Lǐ shàng wǎng lái) — "Courtesy demands reciprocity"**

When readers invest their time and attention, we owe them a usable experience. Accessibility is not generosity—it is courtesy, the minimum respect we owe to our guests.

---

## Contrast Requirements

### WCAG Standards

| Content Type | Minimum Ratio | Our Target |
|--------------|---------------|------------|
| Normal text (<18px) | 4.5:1 | 5:1+ |
| Large text (≥18px bold, ≥24px) | 3:1 | 4:1+ |
| UI components & graphics | 3:1 | 3.5:1+ |
| Focus indicators | 3:1 | 3.5:1+ |

**Our philosophy:** Aim for AAA where practical. The ink-on-paper aesthetic naturally supports high contrast.

### Contrast Audit

#### Light Mode

| Token Pairing | Ratio | Status | Notes |
|---------------|-------|--------|-------|
| `text.primary` on `bg.primary` | 11.2:1 | ✓ AAA | Excellent |
| `text.secondary` on `bg.primary` | 6.3:1 | ✓ AA | Good |
| `text.muted` on `bg.primary` | 4.6:1 | ✓ AA | Acceptable |
| `seal.red` on `bg.primary` | 5.8:1 | ✓ AA | Links/accents pass |
| `celadon.primary` on `bg.primary` | 3.2:1 | ~ | Large text only |
| `text.primary` on `surface.code` | 10.8:1 | ✓ AAA | Code blocks |
| `text.primary` on `surface.quote` | 10.9:1 | ✓ AAA | Blockquotes |

#### Dark Mode

| Token Pairing | Ratio | Status | Notes |
|---------------|-------|--------|-------|
| `text.primary` on `bg.primary` | 14.8:1 | ✓ AAA | Excellent |
| `text.secondary` on `bg.primary` | 8.1:1 | ✓ AA | Good |
| `text.muted` on `bg.primary` | 5.2:1 | ✓ AA | Acceptable |
| `seal.red-light` on `bg.primary` | 5.1:1 | ✓ AA | Dark mode accent |
| `celadon.light` on `bg.primary` | 4.8:1 | ✓ AA | Passes in dark mode |

### Areas Requiring Attention

**Celadon on light backgrounds**: The secondary green accent doesn't meet AA for small text. Solutions:
1. Use only for large text/decorative elements
2. Use `celadon.dark` for text applications
3. Reserve celadon for non-text uses (borders, backgrounds)

**Recommendation**: Celadon should not be used for body text. Use for decorative borders, success states with icon+text (where icon carries meaning), and large decorative elements.

---

## Focus Indicators

### The Challenge

The contemplative aesthetic uses subtle, organic styling. Focus indicators must be visible *without* being jarring.

### Our Approach: Seal Red Focus

The seal stamp is already a distinctive element of the aesthetic. We use `seal.red` for focus rings—creating consistency with the accent system while ensuring visibility.

**Token Structure:**
```
focus.ring.color        → seal.red
focus.ring.width        → 2px
focus.ring.offset       → 2px
focus.ring.offset-color → bg.primary
```

**CSS Implementation:**
```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* Ensure visibility on all backgrounds */
:focus-visible {
  box-shadow: 0 0 0 var(--focus-ring-offset) var(--focus-ring-offset-color);
}
```

### Focus-Visible vs Focus

We use `:focus-visible` to show focus rings only for keyboard navigation, not mouse clicks. This maintains the clean aesthetic for mouse users while ensuring keyboard users can navigate.

**Fallback for older browsers:**
```css
/* Fallback for browsers without :focus-visible */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Dark Mode Focus

In dark mode, the seal red remains visible against stone backgrounds, but we add a subtle inner glow:

```css
[data-theme="dark"] :focus-visible {
  outline-color: var(--color-seal-red-light);
  box-shadow:
    0 0 0 var(--focus-ring-offset) var(--color-bg-primary),
    0 0 8px var(--color-seal-red-light);
}
```

---

## Motion Accessibility

### Baseline is Already Contemplative

Our motion system defaults to slower, gentler transitions than typical UI. This is inherently more accessible to users with vestibular disorders.

**Default durations:**
- `swift`: 100ms
- `brush`: 200ms
- `contemplative`: 500ms

These are already gentler than aggressive 150ms transitions common in modern UI.

### Respecting `prefers-reduced-motion`

Even with contemplative defaults, we fully respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* Reduce all motion to near-instant */
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable stroke animations entirely */
  .animate-stroke {
    stroke-dashoffset: 0 !important;
    animation: none !important;
  }

  /* Keep opacity changes (non-motion feedback) */
  .transition-opacity {
    transition-duration: 100ms !important;
  }
}
```

### What Remains with Reduced Motion

Even with `prefers-reduced-motion: reduce`, users still get:
- Instant state changes (hover colors, focus states)
- Opacity fades (gentler than movement)
- Immediate content appearance (no scroll reveals)
- All interactive feedback (just instant, not animated)

---

## Typography Accessibility

### Minimum Sizes for CJK

Chinese characters are more complex than Latin letters and require larger minimum sizes:

| Context | Minimum | Recommended |
|---------|---------|-------------|
| Body text | 18px | 18px (already our default) |
| Caption text | 14px | 16px |
| Button text | 16px | 16px |
| Form labels | 16px | 16px |
| Margin notes | 14px | 16px |

**Note**: Our typography system uses 18px (1.125rem) as body text base, exceeding minimum requirements.

### Line Height for Readability

Chinese characters are denser than Latin letters. Our line heights are generous:

- Body: 1.8 (exceeds WCAG 1.4.12 requirement of 1.5)
- Body-sm: 1.7
- Captions: 1.6

### Line Length

Optimal reading: 45-75 characters for English, 35-45 characters for Chinese.

Our `container.prose` uses `65ch`, which accommodates:
- ~65 Latin characters
- ~40 Chinese characters (characters are wider)

Both are within optimal ranges.

### User Override Support

**WCAG 1.4.12 (Text Spacing)**: Users must be able to adjust spacing without loss of content. Our system supports this by:

1. Using relative units (`rem`, `em`) not fixed `px`
2. Not using fixed heights on text containers
3. Allowing text to reflow naturally
4. Testing with 200% text spacing override

---

## Keyboard Navigation

### All Interactive Elements Must Be Keyboard Accessible

| Element | Keyboard Interaction |
|---------|---------------------|
| Links | Enter to activate |
| Buttons | Enter or Space to activate |
| Inputs | Tab to focus, type to input |
| Dropdowns | Enter to open, arrows to navigate, Enter to select |
| Modals | Tab cycles within, Escape closes |
| Tabs | Arrows to switch, Tab to enter panel |
| Accordions | Enter/Space to toggle |

### Skip Links

For keyboard users navigating long pages:

```html
<a href="#main-content" class="skip-link">
  跳至主要内容 / Skip to main content
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--spacing-inset-md);
  z-index: var(--z-max);
}

.skip-link:focus {
  top: 0;
}
```

### Focus Order

Focus order follows visual reading order:
1. Skip link (when focused)
2. Navigation
3. Main content
4. Sidebar (if present)
5. Footer

Use natural DOM order; avoid `tabindex` manipulation.

---

## Screen Reader Considerations

### Semantic HTML

Use proper semantic elements:

```html
<!-- ✓ Correct -->
<article>
  <header>
    <h1>文章标题 / Article Title</h1>
    <p class="byline">By Author Name</p>
  </header>
  <main>...</main>
  <footer>...</footer>
</article>

<!-- ✗ Incorrect -->
<div class="article">
  <div class="header">
    <span class="title">文章标题</span>
  </div>
</div>
```

### Bilingual Content

For bilingual content, use `lang` attributes:

```html
<h1>
  <span lang="zh">虚室生白</span>
  <span lang="en">In emptiness, light is born</span>
</h1>
```

This allows screen readers to switch pronunciation modes.

### Decorative Elements

Decorative brushstroke SVGs should be hidden from screen readers:

```html
<svg aria-hidden="true" class="brush-divider">
  <!-- decorative path -->
</svg>
```

### Image Handling

The contemplative aesthetic often uses evocative images. All must have appropriate alt text:

```html
<!-- Informative image -->
<img
  src="mountain-landscape.jpg"
  alt="山水画：远山隐于雾中 / Mountain landscape with distant peaks hidden in mist"
/>

<!-- Decorative image -->
<img
  src="paper-texture.jpg"
  alt=""
  role="presentation"
/>
```

---

## Touch & Click Targets

### Minimum Sizes

**WCAG 2.5.5 (Target Size)**: Interactive elements should be at least 44×44 CSS pixels.

| Element | Minimum Size | Our Default |
|---------|--------------|-------------|
| Buttons | 44×44px | 48×48px |
| Links (inline) | Inherent | Generous padding |
| Icon buttons | 44×44px | 48×48px |
| Form inputs | 44px height | 48px height |

### Spacing Between Targets

Adjacent clickable elements need spacing to prevent accidental activation:

```
spacing.touch.gap → 8px minimum between adjacent targets
```

### Large Touch Targets in Contemplative UI

The generous spacing (留白) of our design naturally creates large touch targets. Components sit with breathing room, making accidental touches rare.

---

## Color Independence

### Never Rely on Color Alone

Color should reinforce meaning, not carry it alone:

```html
<!-- ✓ Color + Icon + Text -->
<div class="callout callout-danger">
  <svg class="icon"><!-- warning icon --></svg>
  <span>警告 / Warning: This action cannot be undone</span>
</div>

<!-- ✗ Color alone -->
<div style="color: red;">
  This action cannot be undone
</div>
```

### Status Indicators

| Status | Color | Icon | Text |
|--------|-------|------|------|
| Info | Blue | ℹ️ | "Note:" or "注：" |
| Success | Green | ✓ | "Success:" or "成功：" |
| Warning | Gold | ⚠ | "Warning:" or "警告：" |
| Danger | Red | ✕ | "Error:" or "错误：" |

---

## High Contrast Mode Support

### Windows High Contrast

Windows High Contrast Mode overrides colors. We ensure components remain usable:

```css
@media (forced-colors: active) {
  /* Ensure borders are visible */
  .card {
    border: 2px solid currentColor;
  }

  .button {
    border: 2px solid currentColor;
  }

  /* Focus remains visible */
  :focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}
```

### High Contrast Theme Variant (Optional)

Consider a high-contrast variant with:
- Pure black (#000000) on pure white (#FFFFFF)
- Increased border widths
- Enlarged focus indicators
- Saturated status colors

---

## Testing Requirements

### Automated Testing

| Tool | Usage |
|------|-------|
| axe-core | Integrate into Storybook and CI |
| Lighthouse | Accessibility score ≥95 |
| Pa11y | Automated WCAG checking |
| Color contrast analyzers | Build-time contrast validation |

### Manual Testing

| Test | Method | Frequency |
|------|--------|-----------|
| Keyboard navigation | Tab through entire UI without mouse | Every component |
| Screen reader | Test with VoiceOver (Mac), NVDA (Windows) | Every component |
| Zoom | Test at 200% and 400% zoom | Every page template |
| Reduced motion | Test with `prefers-reduced-motion` enabled | Motion-heavy components |
| High contrast | Test in Windows High Contrast Mode | All components |
| Chinese screen reader | Test with Chinese TTS enabled | Bilingual content |

### Browser Support

Test accessibility features across:
- Safari + VoiceOver (Mac, iOS)
- Chrome + ChromeVox
- Firefox + NVDA
- Edge + Narrator

---

## Implementation Plan

### Step 1: Audit Current Contrast

Run all color token combinations through a contrast checker.

**Deliverable**: Contrast matrix documenting all pairings.

### Step 2: Implement Focus Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/focus.json`

```json
{
  "focus": {
    "ring": {
      "color": { "value": "{color.seal.red}" },
      "width": { "value": "2px" },
      "offset": { "value": "2px" },
      "offset-color": { "value": "{color.bg.primary}" }
    }
  }
}
```

### Step 3: Add Reduced Motion Support

**File**: `packages/ui/src/styles/accessibility.css`

Include `prefers-reduced-motion` rules in base styles.

### Step 4: Create Accessibility Utilities

**File**: `packages/ui/src/lib/accessibility.css`

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

.not-sr-only {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Step 5: Create Skip Link Component

**File**: `packages/ui/src/components/SkipLink.tsx`

Bilingual skip link with proper styling.

### Step 6: Document Accessibility Patterns

**File**: `packages/ui/docs/chinese_aesthetic_theme/05a_ACCESSIBILITY_GUIDE.md`

Document:
- How to implement accessible components
- Bilingual screen reader considerations
- Testing checklist
- Common mistakes to avoid

### Step 7: Component Audit

Review each component for:
- Keyboard operability
- Focus visibility
- Screen reader labels
- Touch target sizes
- Color contrast
- Reduced motion support

---

## Success Criteria

1. **Contrast Compliance**: All text/background pairings meet WCAG AA (4.5:1)
2. **Focus Visibility**: All interactive elements have visible, aesthetic focus states
3. **Keyboard Navigation**: Complete site navigation without mouse
4. **Screen Reader Clarity**: Content makes sense when read aloud
5. **Motion Respect**: `prefers-reduced-motion` fully honored
6. **Touch Targets**: All interactive elements ≥44px
7. **Testing**: Automated and manual testing integrated into workflow

---

## Open Questions

1. **Bilingual Screen Reader Experience**: Should we provide parallel Chinese/English text, or toggleable language? How do screen readers handle mixed content?

2. **Seal Stamp as Focus**: Is the red seal aesthetic appropriate for focus states, or should focus use a more neutral indicator?

3. **Decorative vs Informative**: How do we distinguish decorative brushstrokes from meaningful content for screen readers?

4. **CJK-Specific Accessibility Tools**: Are there accessibility testing tools specifically designed for CJK content?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Font sizes must meet minimum readability |
| Phase 2 (Spacing) | Generous spacing aids readability |
| Phase 3 (Motion) | Reduced motion is accessibility requirement |
| Phase 4 (Color) | Contrast is core concern |
| Phase 6 (Components) | Components must implement accessible patterns |
| Phase 7 (Infrastructure) | Touch targets defined here |

---

## The Destination

When this phase is complete:

- **Every reader can read.** Text is never too faint, too small, or too cramped.
- **Every user can navigate.** Keyboard, touch, voice, switch—all work.
- **Every interaction is visible.** Focus states are clear and aesthetically appropriate.
- **Every preference is respected.** Reduced motion, high contrast, zoom—all honored.
- **Every language is welcome.** Chinese and English content both accessible.

The scholar's studio is open to all scholars.

---

*"有朋自远方来，不亦乐乎？"*
*"Is it not delightful to have friends coming from distant quarters?"*
— 论语 (The Analerta)

Our readers come from many places, with many abilities. To welcome them all is our joy.
