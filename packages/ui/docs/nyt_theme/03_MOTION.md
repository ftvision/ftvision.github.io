# Phase 3: Motion Tokens

## Philosophy

### Motion is Meaning

Animation is not decoration. When a card lifts on hover, it is communicating: *I am interactive*. When a modal fades in, it is saying: *I have arrived from elsewhere*. When a toast slides away, it announces: *I am leaving, but gently*.

Every motion in an interface carries semantic weight. Uncoordinated animation—where one element bounces while another slides, where durations vary randomly—creates cognitive noise. The reader feels something is wrong without knowing why.

### The NYT Motion Ethos

The New York Times is not a startup landing page. It does not bounce. It does not wiggle. It does not demand attention through movement.

NYT motion is:
- **Subtle**: You notice its absence more than its presence
- **Purposeful**: Every animation answers "why am I moving?"
- **Quick**: Readers came to read, not to wait
- **Consistent**: One hand controls all motion

### The Three Laws of Editorial Motion

**1. Duration Reflects Distance**

A tooltip appearing beside a button should be near-instant—it travels no conceptual distance. A modal emerging from the center of consciousness should take longer—it represents a context shift. Duration is not arbitrary; it maps to cognitive distance.

**2. Easing Reflects Intent**

- `ease-out`: The element is arriving (fast start, gentle landing)
- `ease-in`: The element is departing (gentle start, fast exit)
- `ease-in-out`: The element is transforming in place
- `linear`: Mechanical, inhuman—use sparingly

**3. Less is More**

The best animation is the one you remove. If an interaction works without animation, question whether animation adds value. The Times is not an amusement park.

---

## Architecture

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 0ms | Immediate state changes, no transition |
| `fast` | 100ms | Micro-interactions: hover states, focus rings |
| `normal` | 200ms | Standard transitions: dropdowns, tooltips |
| `slow` | 300ms | Emphasis transitions: modals appearing |
| `deliberate` | 500ms | Major transitions: page sections, reveals |
| `dramatic` | 800ms | Rare: hero animations, onboarding |

**Note**: Most interactions should use `fast` or `normal`. Reaching for `slow` or beyond should prompt the question: "Is this motion earning its time?"

### Easing Curves

| Token | Value | Usage |
|-------|-------|-------|
| `ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | **Default**. Elements entering, appearing |
| `ease-in` | `cubic-bezier(0.4, 0.0, 1, 1)` | Elements exiting, disappearing |
| `ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | Elements transforming in place |
| `linear` | `linear` | Progress bars, continuous animations |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful interactions (use sparingly) |

**Default Pairing**: `duration.fast` + `easing.ease-out`

This combination covers 80% of UI interactions.

### Token Structure

```
motion.duration.{speed}   → Time in milliseconds
motion.easing.{curve}     → CSS timing function
```

### Common Patterns

| Pattern | Duration | Easing | Example |
|---------|----------|--------|---------|
| Hover color change | fast | ease-out | Button background |
| Focus ring appear | fast | ease-out | Input focus |
| Dropdown open | normal | ease-out | Menu appearing |
| Dropdown close | fast | ease-in | Menu disappearing |
| Modal enter | slow | ease-out | Dialog appearing |
| Modal exit | normal | ease-in | Dialog closing |
| Tooltip appear | normal | ease-out | Help text |
| Card lift (hover) | fast | ease-out | Shadow + transform |
| Accordion expand | normal | ease-in-out | Content revealing |
| Page section reveal | deliberate | ease-out | Scroll animation |

### What We Don't Animate

Some things should not move:

- **Body text**: Never animate paragraph appearance with fade/slide
- **Navigation**: Core nav should be instant and stable
- **Critical information**: Errors, warnings—no delays
- **Repeated actions**: If a user will do it 100 times, don't animate it

---

## Implementation Plan

### Step 1: Create Motion Primitive Tokens

**File**: `packages/tokens/src/primitives/motion.json` (new file)

Define raw duration and easing values:

```json
{
  "primitive": {
    "motion": {
      "duration": {
        "0": { "value": "0ms" },
        "100": { "value": "100ms" },
        "200": { "value": "200ms" },
        "300": { "value": "300ms" },
        "500": { "value": "500ms" },
        "800": { "value": "800ms" }
      },
      "easing": {
        "linear": { "value": "linear" },
        "ease-out": { "value": "cubic-bezier(0.0, 0.0, 0.2, 1)" },
        "ease-in": { "value": "cubic-bezier(0.4, 0.0, 1, 1)" },
        "ease-in-out": { "value": "cubic-bezier(0.4, 0.0, 0.2, 1)" },
        "spring": { "value": "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      }
    }
  }
}
```

### Step 2: Create Semantic Motion Tokens

**File**: `packages/tokens/src/semantic/motion.json` (new file)

Map primitives to semantic names:

```json
{
  "motion": {
    "duration": {
      "instant": { "value": "{primitive.motion.duration.0}" },
      "fast": { "value": "{primitive.motion.duration.100}" },
      "normal": { "value": "{primitive.motion.duration.200}" },
      "slow": { "value": "{primitive.motion.duration.300}" },
      "deliberate": { "value": "{primitive.motion.duration.500}" },
      "dramatic": { "value": "{primitive.motion.duration.800}" }
    },
    "easing": {
      "default": { "value": "{primitive.motion.easing.ease-out}" },
      "enter": { "value": "{primitive.motion.easing.ease-out}" },
      "exit": { "value": "{primitive.motion.easing.ease-in}" },
      "move": { "value": "{primitive.motion.easing.ease-in-out}" },
      "linear": { "value": "{primitive.motion.easing.linear}" },
      "spring": { "value": "{primitive.motion.easing.spring}" }
    }
  }
}
```

### Step 3: Update Build Configuration

**File**: `packages/tokens/build.js`

Include both `primitives/motion.json` and `semantic/motion.json` in the build pipeline.

### Step 4: Create Tailwind Motion Utilities

**File**: `packages/ui/tailwind.config.js`

Extend Tailwind with motion tokens:

```js
transitionDuration: {
  'instant': 'var(--motion-duration-instant)',
  'fast': 'var(--motion-duration-fast)',
  'normal': 'var(--motion-duration-normal)',
  'slow': 'var(--motion-duration-slow)',
  'deliberate': 'var(--motion-duration-deliberate)',
  'dramatic': 'var(--motion-duration-dramatic)',
},
transitionTimingFunction: {
  'default': 'var(--motion-easing-default)',
  'enter': 'var(--motion-easing-enter)',
  'exit': 'var(--motion-easing-exit)',
  'move': 'var(--motion-easing-move)',
  'spring': 'var(--motion-easing-spring)',
},
```

This enables classes like:
- `duration-fast ease-enter` (fast appearance)
- `duration-normal ease-exit` (normal disappearance)

### Step 5: Create Transition Presets (Optional)

Consider creating composite transition classes or a utility:

```css
.transition-hover {
  transition-property: background-color, border-color, color;
  transition-duration: var(--motion-duration-fast);
  transition-timing-function: var(--motion-easing-default);
}

.transition-transform {
  transition-property: transform, box-shadow;
  transition-duration: var(--motion-duration-fast);
  transition-timing-function: var(--motion-easing-default);
}
```

### Step 6: Respect User Preferences

**Critical**: Honor `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This should be included in the base token CSS output.

### Step 7: Document Motion Patterns

**File**: `packages/ui/docs/nyt_theme/03a_MOTION_PATTERNS.md`

Document:
- When to use each duration
- When to use each easing curve
- Common patterns with code examples
- Anti-patterns to avoid

### Step 8: Update Components

Audit existing components to use motion tokens:
- **Button**: `transition-colors duration-fast ease-default`
- **Card**: Add hover lift with `duration-fast`
- **Callout**: No motion needed (static informational element)

---

## Success Criteria

1. **Completeness**: Duration and easing tokens defined at both primitive and semantic layers
2. **Build Integration**: Tokens compile to CSS custom properties
3. **Tailwind Integration**: Duration and easing classes available
4. **Accessibility**: `prefers-reduced-motion` respected
5. **Documentation**: Motion patterns documented with examples
6. **Component Adoption**: Existing components use motion tokens
7. **Consistency**: All transitions in the system feel unified

---

## Open Questions

1. **Animation Keyframes**: Should we tokenize keyframe animations (fade-in, slide-up), or leave those as component-specific?

2. **Staggered Animations**: For lists that animate in sequence, should we provide a `stagger-delay` token?

3. **Spring Physics**: The `spring` easing is a CSS approximation. Should we consider a JS animation library (Framer Motion, React Spring) for true physics-based motion?

4. **Theme Variations**: Should different themes have different motion personalities? (e.g., a "brutalist" theme with no transitions)

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 1 (Typography) | Text should not animate; motion is for containers and states |
| Phase 2 (Spacing) | Spacing changes (accordion expand) should use motion tokens |
| Phase 4 (Color) | Color transitions are the most common motion use case |
| Phase 5 (Accessibility) | `prefers-reduced-motion` is an accessibility requirement |
| Phase 6 (Components) | All interactive components will use motion tokens |

---

## The Destination

When this phase is complete, motion will feel like a single author wrote it:

```tsx
// ❌ Inconsistent, arbitrary
<button className="transition-all duration-150 ease-linear">
<div className="transition duration-300 ease-in-out">
<modal className="transition-opacity duration-[400ms]">

// ✓ Unified motion language
<button className="transition-colors duration-fast ease-default">
<div className="transition-transform duration-normal ease-enter">
<modal className="transition-opacity duration-slow ease-enter">
```

The numbers disappear. The intent remains.

---

*"Animation is not about making things move. It's about making things feel alive—but only when they should."*
