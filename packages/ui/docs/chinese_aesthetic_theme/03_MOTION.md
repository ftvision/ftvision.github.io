# Phase 3: Motion Tokens (书法)

## Philosophy

### The Brushstroke as Prototype

Watch a calligrapher write a single horizontal stroke (横 héng):

The brush touches paper suddenly—full contact, maximum pressure, *attack*. Then it glides, steady and controlled. As it approaches the end, it slows, lifts slightly, and pauses—a moment of held breath. Finally, it lifts away, leaving a tail that whispers of its departure.

This is not mechanical motion. This is *shi* (势)—momentum, energy, life force made visible.

Our motion system encodes this organic rhythm: **fast attack, controlled middle, slow release**.

### Why Not Western Easing?

Standard CSS easings are mathematical constructs:
- `ease-in-out`: Symmetric acceleration and deceleration
- `ease-out`: Starts fast, slows to stop
- `ease-in`: Starts slow, accelerates to stop

These are fine for mechanical interfaces. But they feel *constructed*—like an engineer plotted points on a curve. They lack the organic quality of living movement.

Calligraphic motion has different characteristics:
- **Decisive beginning**: The brush commits immediately
- **Controlled sustain**: The stroke has purpose and direction
- **Lingering end**: The brush doesn't stop; it *releases*

This creates curves that feel alive rather than computed.

### Three Laws of 书法 Motion

**1. 笔断意连 (Bǐ duàn yì lián) — "Brush breaks, intent connects"**

In calligraphy, when the brush lifts between strokes, the energy continues invisibly. The next stroke begins where the previous one's momentum would have carried it.

For UI: transitions should feel like continuous motion even when separated. A card lifting on hover and settling on click should feel like one gesture, not two.

**2. 疾如风，徐如林 (Jí rú fēng, xú rú lín) — "Swift as wind, slow as forest"**

From Sun Tzu, but applicable: know when to be fast, when to be slow. Micro-interactions (hover states) should be swift and responsive. Major transitions (modal entry, page changes) should be measured and deliberate.

**3. 留白是节奏 (Liúbái shì jiézòu) — "Empty space is rhythm"**

Motion without pause is exhausting. Strategic stillness—moments where nothing moves—creates rhythm. Not everything should animate. The things that don't move define the things that do.

---

## Architecture

### Duration Scale

Our durations are *longer* than typical UI systems, reflecting the contemplative aesthetic:

| Token | Value | Usage | Feeling |
|-------|-------|-------|---------|
| `instant` | 0ms | No transition | Immediate |
| `swift` | 100ms | Micro-interactions: hover states | Responsive but felt |
| `brush` | 200ms | **Default**. Standard transitions | The natural brushstroke |
| `deliberate` | 350ms | Emphasis: reveals, focus changes | Considered, purposeful |
| `contemplative` | 500ms | Major transitions: modals, sections | Measured, unhurried |
| `meditative` | 800ms | Dramatic reveals, scroll animations | Slow, intentional |
| `ceremonial` | 1200ms | Rare: page entrances, special moments | Ritualistic |

**Note**: Most interactions use `swift` or `brush`. Reaching for `contemplative` or beyond should prompt: "Is this motion earning its time?"

### Calligraphic Easing Curves

These curves encode the brushstroke rhythm:

| Token | Value | Curve Character | Usage |
|-------|-------|-----------------|-------|
| `brush-enter` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Fast attack, slow release | **Default entry**. Elements appearing |
| `brush-exit` | `cubic-bezier(0.4, 0.0, 1, 1)` | Slow gather, fast release | Elements leaving |
| `brush-move` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Balanced | Elements transforming in place |
| `ink-spread` | `cubic-bezier(0.0, 0.0, 0.1, 1)` | Very fast attack, very slow fade | Ink dissolving, content revealing |
| `lift` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slight overshoot | Cards lifting, hover states |
| `settle` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Gentle landing | Returning to rest |
| `breath` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Symmetric, organic | Breathing animations, pulsing |

### The Default Pairing

For 80% of interactions: `duration: brush` (200ms) + `easing: brush-enter`

This combination creates the feeling: "Responsive but not anxious. Present but not demanding."

### Token Structure

```
motion.duration.{speed}    → Time in milliseconds
motion.easing.{curve}      → CSS timing function
```

### Common Patterns

| Pattern | Duration | Easing | Example |
|---------|----------|--------|---------|
| Hover color change | swift | brush-enter | Button background |
| Focus ring appear | swift | brush-enter | Input focus |
| Dropdown open | brush | ink-spread | Menu appearing |
| Dropdown close | swift | brush-exit | Menu disappearing |
| Modal enter | contemplative | brush-enter | Dialog appearing |
| Modal exit | brush | brush-exit | Dialog closing |
| Tooltip appear | brush | brush-enter | Help text |
| Card lift (hover) | swift | lift | Shadow + transform |
| Card settle | swift | settle | Return from hover |
| Scroll reveal | deliberate | ink-spread | Content appearing on scroll |
| Section transition | meditative | breath | Major page changes |
| Ink stroke animation | deliberate | ink-spread | Decorative strokes |

---

## Animated Brushstroke System

A distinctive feature of this theme: decorative elements that *draw themselves*.

### Stroke Animation Components

**Horizontal Rule (Animated):**
```
Before: ─────────────────────────
During: ════════════════────────  (stroke draws left to right)
After:  ═════════════════════════
```

**Section Divider (Calligraphic):**
A brushstroke SVG path that animates using `stroke-dasharray` and `stroke-dashoffset`:

```svg
<path
  d="M 0 0 Q 50 10 100 0"
  class="animate-stroke"
  stroke="var(--color-accent-primary)"
  stroke-width="2"
  fill="none"
/>
```

```css
.animate-stroke {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw var(--motion-duration-deliberate) var(--motion-easing-ink-spread) forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

### Ink Dissolve Loading State

Instead of spinners, ink spreads:

```css
.ink-loading {
  background: radial-gradient(
    circle at center,
    var(--color-ink-primary) 0%,
    transparent 100%
  );
  animation: ink-spread var(--motion-duration-contemplative) var(--motion-easing-ink-spread) infinite;
}

@keyframes ink-spread {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

---

## Scroll-Triggered Reveals

Content should appear like sections of a scroll being unrolled:

### The Unrolling Pattern

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  [Already visible content]                       │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │  ← Viewport edge
│  [Content appearing]                             │
│  opacity: 0 → 1                                  │
│  transform: translateY(20px) → translateY(0)    │
│                                                  │
│  Timing: meditative (800ms)                      │
│  Easing: ink-spread                              │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  [Content not yet visible]                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Staggered List Reveals

For lists or card grids, elements appear in sequence:

```
Item 1: delay 0ms      ────████████████████
Item 2: delay 100ms         ────████████████████
Item 3: delay 200ms              ────████████████████
Item 4: delay 300ms                   ────████████████████
```

**Token:**
```
motion.stagger.delay → 100ms (base delay between items)
motion.stagger.max → 500ms (cap the maximum delay)
```

---

## What Does Not Move

Equally important: defining stillness.

### Never Animate

- **Body text**: Paragraphs do not fade, slide, or transform. Text is sacred.
- **Navigation core**: Primary navigation is stable, anchored, trustworthy.
- **Reading content**: Once visible, article content does not shift or bounce.
- **Critical information**: Errors, warnings, important notices appear instantly.

### Rarely Animate

- **Headers**: Sticky headers may shadow-change, but don't bounce.
- **Form interactions**: Validation appears, but inputs don't shake or pulse.
- **Data displays**: Charts may draw on load, but don't constantly animate.

### Always Animate (When Appropriate)

- **State changes**: Hover, focus, active—always acknowledge interaction.
- **Reveals**: Content entering the viewport should be graceful.
- **Transitions**: Modal entry/exit, tab switches, accordion expansion.
- **Feedback**: Successful actions, loading states, progress indicators.

---

## Respecting 无为 (Wúwéi) — Non-Action

*无为* doesn't mean doing nothing—it means acting without forcing. Motion should feel effortless, inevitable, like water flowing downhill.

### The Reduced Motion Philosophy

Our baseline is already contemplative. When `prefers-reduced-motion` is active:

1. **Don't eliminate motion entirely** — reduce to the essential
2. **Replace movement with opacity** — fade instead of slide
3. **Keep duration, remove distance** — timing remains, position doesn't change

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    /* Don't eliminate—reduce */
    animation-duration: 150ms !important;
    transition-duration: 150ms !important;

    /* Remove transforms, keep opacity */
    transform: none !important;
  }

  /* Stroke animations become instant */
  .animate-stroke {
    stroke-dashoffset: 0;
    animation: none;
  }
}
```

---

## Implementation Plan

### Step 1: Create Motion Primitive Tokens

**File**: `packages/tokens/src/primitives/motion.json`

```json
{
  "primitive": {
    "motion": {
      "duration": {
        "0": { "value": "0ms" },
        "100": { "value": "100ms" },
        "200": { "value": "200ms" },
        "350": { "value": "350ms" },
        "500": { "value": "500ms" },
        "800": { "value": "800ms" },
        "1200": { "value": "1200ms" }
      },
      "easing": {
        "linear": { "value": "linear" },
        "brush-enter": { "value": "cubic-bezier(0.0, 0.0, 0.2, 1)" },
        "brush-exit": { "value": "cubic-bezier(0.4, 0.0, 1, 1)" },
        "brush-move": { "value": "cubic-bezier(0.4, 0.0, 0.2, 1)" },
        "ink-spread": { "value": "cubic-bezier(0.0, 0.0, 0.1, 1)" },
        "lift": { "value": "cubic-bezier(0.34, 1.56, 0.64, 1)" },
        "settle": { "value": "cubic-bezier(0.25, 0.1, 0.25, 1)" },
        "breath": { "value": "cubic-bezier(0.45, 0.05, 0.55, 0.95)" }
      }
    }
  }
}
```

### Step 2: Create Semantic Motion Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/motion.json`

```json
{
  "motion": {
    "duration": {
      "instant": { "value": "{primitive.motion.duration.0}" },
      "swift": { "value": "{primitive.motion.duration.100}" },
      "brush": { "value": "{primitive.motion.duration.200}" },
      "deliberate": { "value": "{primitive.motion.duration.350}" },
      "contemplative": { "value": "{primitive.motion.duration.500}" },
      "meditative": { "value": "{primitive.motion.duration.800}" },
      "ceremonial": { "value": "{primitive.motion.duration.1200}" }
    },
    "easing": {
      "default": { "value": "{primitive.motion.easing.brush-enter}" },
      "enter": { "value": "{primitive.motion.easing.brush-enter}" },
      "exit": { "value": "{primitive.motion.easing.brush-exit}" },
      "move": { "value": "{primitive.motion.easing.brush-move}" },
      "reveal": { "value": "{primitive.motion.easing.ink-spread}" },
      "lift": { "value": "{primitive.motion.easing.lift}" },
      "settle": { "value": "{primitive.motion.easing.settle}" },
      "breath": { "value": "{primitive.motion.easing.breath}" }
    },
    "stagger": {
      "delay": { "value": "100ms" },
      "max": { "value": "500ms" }
    }
  }
}
```

### Step 3: Create Tailwind Motion Utilities

**File**: `packages/ui/tailwind.config.js`

```js
transitionDuration: {
  'instant': 'var(--motion-duration-instant)',
  'swift': 'var(--motion-duration-swift)',
  'brush': 'var(--motion-duration-brush)',
  'deliberate': 'var(--motion-duration-deliberate)',
  'contemplative': 'var(--motion-duration-contemplative)',
  'meditative': 'var(--motion-duration-meditative)',
  'ceremonial': 'var(--motion-duration-ceremonial)',
},
transitionTimingFunction: {
  'brush-enter': 'var(--motion-easing-enter)',
  'brush-exit': 'var(--motion-easing-exit)',
  'brush-move': 'var(--motion-easing-move)',
  'ink-spread': 'var(--motion-easing-reveal)',
  'lift': 'var(--motion-easing-lift)',
  'settle': 'var(--motion-easing-settle)',
  'breath': 'var(--motion-easing-breath)',
},
```

### Step 4: Create Animated Brushstroke Components

**File**: `packages/ui/src/components/BrushStroke.tsx`

```tsx
/**
 * Animated SVG brushstroke for section dividers and decorative elements.
 * Draws itself on mount or when triggered.
 */
export function BrushStroke({
  variant = 'horizontal',
  trigger = 'viewport',
  className
}) {
  // Implementation with IntersectionObserver
  // or explicit trigger prop
}
```

### Step 5: Create Scroll Reveal Utility

**File**: `packages/ui/src/hooks/useScrollReveal.ts`

```tsx
/**
 * Hook for scroll-triggered content reveals.
 * Returns ref and animation state.
 */
export function useScrollReveal(options?: {
  threshold?: number;
  delay?: number;
  stagger?: boolean;
}) {
  // IntersectionObserver implementation
}
```

### Step 6: Document Motion Patterns

**File**: `packages/ui/docs/chinese_aesthetic_theme/03a_MOTION_COOKBOOK.md`

Document:
- When to use each duration/easing pairing
- Brushstroke animation examples
- Scroll reveal patterns
- Reduced motion handling
- Anti-patterns to avoid

### Step 7: Update Components

Audit existing components for calligraphic motion:

- **Button**: `transition-colors duration-swift ease-brush-enter`
- **Card**: Hover lift with `duration-swift ease-lift`, settle with `ease-settle`
- **Modal**: Enter with `duration-contemplative ease-brush-enter`
- **Callout**: No motion—static informational element

---

## Success Criteria

1. **Organic Feel**: Motion feels like brushstrokes, not computed curves
2. **Contemplative Pace**: Default transitions are unhurried but responsive
3. **Brushstroke Components**: Animated stroke dividers working
4. **Scroll Reveals**: Content appearance feels like unrolling a scroll
5. **Reduced Motion**: Graceful degradation that respects preferences
6. **Token Consistency**: All animations use motion tokens
7. **No Jitter**: Smooth performance on all devices

---

## Open Questions

1. **Frame Rate Concerns**: Should `meditative` (800ms) and `ceremonial` (1200ms) animations be 60fps, or is 30fps acceptable for slow motion?

2. **Scroll Hijacking**: Should we ever take control of scroll for cinematic reveals, or is that too intrusive?

3. **Sound Design**: Subtle audio feedback on certain interactions? A soft "ink touch" sound on hover?

4. **Spring Physics**: The `lift` easing approximates spring physics. Should we use a JS physics library for true spring motion?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Text does not animate; containers and reveals only |
| Phase 2 (Spacing) | Space changes during animation use spacing tokens |
| Phase 4 (Color) | Color transitions are common; ink-spread works for fades |
| Phase 5 (Accessibility) | `prefers-reduced-motion` is mandatory |
| Phase 6 (Components) | All interactive components use motion tokens |

---

## The Destination

When this phase is complete, motion will feel like watching a calligrapher work:

```tsx
// ❌ Mechanical, computed
<button className="transition-all duration-150 ease-in-out">
<div className="animate-spin">
<modal className="transition duration-300">

// ✓ Organic, calligraphic
<button className="transition-colors duration-swift ease-brush-enter">
<div className="animate-ink-spread">
<modal className="transition-opacity duration-contemplative ease-brush-enter">
```

The motion is not noticed. It is *felt*—like the lingering energy after a brushstroke leaves the paper.

---

*"书法之妙，在于神韵，不在于形似。"*
*"The wonder of calligraphy lies in spirit resonance, not formal likeness."*
— 王羲之 (Wang Xizhi), the Sage of Calligraphy

*"Every stroke is a mark of being fully present in the moment."*
— Contemporary interpretation
