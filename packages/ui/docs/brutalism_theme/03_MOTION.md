# Phase 3: Motion Tokens

## Philosophy

### Motion is Optional

The NYT theme uses motion to create smooth, polished experiences. Brutalism takes a different stance: **motion is suspect**.

Every transition is a delay. Every animation is time the user spends watching instead of doing. Brutalism asks: does this motion serve a purpose? If the answer is "it feels nice," the motion should be removed.

### The Brutalist Motion Ethos

**1. Instant is the Default**

When a button changes state, it should change *now*. Not in 150ms. Not with an ease-out curve. The user clicked; the state changed; done. Transitions imply uncertainty. Brutalism is certain.

**2. Motion Must Earn Its Place**

Some motion is necessary:
- Loading states (something is happening)
- Large layout changes (prevent disorientation)
- Scroll-linked effects (natural physics)

Everything else is negotiable.

**3. If Motion Exists, It Should Be Abrupt**

When motion is necessary, it should be quick and linear. No easing curves that suggest personality. No spring physics that suggest playfulness. Movement is mechanical, purposeful, and brief.

---

## Architecture

### The Spectrum of Motion

Unlike traditional design systems with 5-6 duration tiers, brutalism operates on a simpler scale:

```
┌─────────────────────────────────────────────────────────┐
│  INSTANT                                                │
│  The default. State changes immediately.                │
│  Used for: button states, focus rings, hover colors     │
├─────────────────────────────────────────────────────────┤
│  FAST                                                   │
│  When instant feels jarring (layout shifts).            │
│  Used for: accordion expand, dropdown appear            │
├─────────────────────────────────────────────────────────┤
│  FUNCTIONAL                                             │
│  When the user needs to track movement.                 │
│  Used for: modal entry, page transitions                │
└─────────────────────────────────────────────────────────┘
```

### Duration Scale

| Token | Value | Usage |
|-------|-------|-------|
| `instant` | 0ms | Default. Button hover, focus, active states |
| `fast` | 50ms | Near-instant with minimal smoothing |
| `quick` | 100ms | Dropdown appearance, small reveals |
| `functional` | 200ms | Modal entry, significant layout changes |
| `deliberate` | 400ms | Rare: major page transitions only |

**Note:** The NYT theme's "normal" is 200ms. Brutalism's "functional" matches this but is used sparingly. Most interactions use `instant` or `fast`.

### Easing Curves

Brutalism prefers **linear** motion. When easing is necessary, it should be minimal:

| Token | Value | Usage |
|-------|-------|-------|
| `linear` | `linear` | Default. Mechanical, honest movement |
| `ease-out` | `cubic-bezier(0.0, 0.0, 0.58, 1)` | When something enters (less dramatic than typical) |
| `ease-in` | `cubic-bezier(0.42, 0.0, 1, 1)` | When something exits |
| `step` | `steps(1)` | For intentionally discontinuous changes |

**What brutalism does NOT use:**
- Spring physics
- Bounce effects
- Elaborate ease-in-out curves
- Staggered animations
- Any easing that suggests personality

### Token Structure

```
motion.duration.instant     → 0ms
motion.duration.fast        → 50ms
motion.duration.quick       → 100ms
motion.duration.functional  → 200ms
motion.duration.deliberate  → 400ms

motion.easing.linear        → linear
motion.easing.out           → cubic-bezier(0.0, 0.0, 0.58, 1)
motion.easing.in            → cubic-bezier(0.42, 0.0, 1, 1)
motion.easing.step          → steps(1)
```

---

## Motion Decisions by Component

### Button

| State Change | Duration | Easing | Rationale |
|--------------|----------|--------|-----------|
| Default → Hover | instant | — | Immediate feedback |
| Hover → Default | instant | — | No lingering |
| Default → Active | instant | — | Click = response |
| Default → Focus | instant | — | Focus is binary |
| Default → Disabled | instant | — | State is fact |

**Implementation:**
```css
.button {
  transition: none; /* Brutalist buttons don't animate */
}
```

Or if slight smoothing is desired:
```css
.button {
  transition: background-color var(--motion-duration-fast) linear,
              color var(--motion-duration-fast) linear;
}
```

### Dropdown/Menu

| Action | Duration | Easing | Rationale |
|--------|----------|--------|-----------|
| Open | quick | out | Content appearing needs slight ease |
| Close | fast | in | Disappearing can be abrupt |

**Implementation:**
```css
.dropdown-content {
  transition: opacity var(--motion-duration-quick) var(--motion-easing-out);
}
```

### Modal

| Action | Duration | Easing | Rationale |
|--------|----------|--------|-----------|
| Open | functional | out | User needs to register the new context |
| Close | quick | in | Dismissal can be fast |
| Backdrop fade | functional | linear | Linear keeps it mechanical |

### Accordion

| Action | Duration | Easing | Rationale |
|--------|----------|--------|-----------|
| Expand | quick | out | Content revealing |
| Collapse | fast | in | Content hiding |

### Tooltip

| Action | Duration | Easing | Rationale |
|--------|----------|--------|-----------|
| Appear | fast | out | Should feel immediate |
| Disappear | instant | — | No lingering |
| Delay before appearing | 100ms | — | Prevent accidental triggers |

---

## What Does NOT Animate

In brutalism, many things that typically animate do not:

### No Animation For:
- **Card hover lift**: Cards don't lift. They may change border color instantly.
- **Link underlines**: Underlines don't slide in. They are present or absent.
- **Color transitions**: Colors change immediately.
- **Shadow transitions**: Shadows change immediately (if shadows exist at all).
- **Transform on hover**: Elements don't scale up or shift.
- **Page section reveals**: Content is present when scrolled to. No fade-in.
- **Loading spinners**: Use progress bars or determinate indicators instead.

### Why No Animation:
Each decision to remove animation serves the brutalist ethos:
- Animations suggest the interface is performative
- Animations take time
- Animations can distract from content
- Animations imply the interface wants to be liked

Brutalism doesn't need to be liked. It needs to work.

---

## Implementation Plan

### Step 1: Create Motion Primitives

**File**: `packages/tokens/src/primitives/motion.json`

```json
{
  "primitive": {
    "motion": {
      "duration": {
        "0": { "value": "0ms" },
        "50": { "value": "50ms" },
        "100": { "value": "100ms" },
        "200": { "value": "200ms" },
        "400": { "value": "400ms" }
      },
      "easing": {
        "linear": { "value": "linear" },
        "ease-out": { "value": "cubic-bezier(0.0, 0.0, 0.58, 1)" },
        "ease-in": { "value": "cubic-bezier(0.42, 0.0, 1, 1)" },
        "step": { "value": "steps(1)" }
      }
    }
  }
}
```

### Step 2: Create Brutalist Motion Semantics

**File**: `packages/tokens/src/themes/brutalism/motion.json`

```json
{
  "motion": {
    "duration": {
      "instant": { "value": "{primitive.motion.duration.0}" },
      "fast": { "value": "{primitive.motion.duration.50}" },
      "quick": { "value": "{primitive.motion.duration.100}" },
      "functional": { "value": "{primitive.motion.duration.200}" },
      "deliberate": { "value": "{primitive.motion.duration.400}" }
    },
    "easing": {
      "default": { "value": "{primitive.motion.easing.linear}" },
      "enter": { "value": "{primitive.motion.easing.ease-out}" },
      "exit": { "value": "{primitive.motion.easing.ease-in}" },
      "step": { "value": "{primitive.motion.easing.step}" }
    }
  }
}
```

### Step 3: Create Tailwind Configuration

**File**: `packages/ui/tailwind.config.js` (brutalism preset)

```js
transitionDuration: {
  'instant': 'var(--motion-duration-instant)',
  'fast': 'var(--motion-duration-fast)',
  'quick': 'var(--motion-duration-quick)',
  'functional': 'var(--motion-duration-functional)',
  'deliberate': 'var(--motion-duration-deliberate)',
},
transitionTimingFunction: {
  'default': 'var(--motion-easing-default)',
  'enter': 'var(--motion-easing-enter)',
  'exit': 'var(--motion-easing-exit)',
  'step': 'var(--motion-easing-step)',
},
```

### Step 4: Respect Reduced Motion

Even brutalism must respect user preferences:

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

Since brutalism already minimizes motion, this primarily affects the few components that do animate (modals, accordions).

### Step 5: Create Component Presets

**File**: `packages/ui/src/styles/brutalism/motion.css`

```css
/* Brutalist motion defaults */
.brutalism-no-transition {
  transition: none !important;
}

.brutalism-transition-colors {
  transition-property: background-color, border-color, color;
  transition-duration: var(--motion-duration-fast);
  transition-timing-function: linear;
}

.brutalism-transition-opacity {
  transition-property: opacity;
  transition-duration: var(--motion-duration-quick);
  transition-timing-function: var(--motion-easing-enter);
}

.brutalism-transition-layout {
  transition-property: height, max-height;
  transition-duration: var(--motion-duration-quick);
  transition-timing-function: var(--motion-easing-enter);
}
```

### Step 6: Document Motion Decisions

**File**: `packages/ui/docs/brutalism_theme/03a_MOTION_DECISIONS.md`

Document:
- Why each component does/doesn't animate
- The philosophical reasoning
- How to extend for custom components
- When to break the rules (and why you probably shouldn't)

---

## Success Criteria

1. **Default No-Animation**: Most state changes are instant
2. **Token Integration**: All durations and easings reference tokens
3. **Reduced Motion**: `prefers-reduced-motion` is respected
4. **Consistent Philosophy**: Motion decisions are documented and coherent
5. **Component Audit**: All components follow brutalist motion guidelines
6. **No Gratuitous Animation**: No hover lifts, no fade-ins, no springs

---

## Open Questions

1. **Loading States**: How do we indicate loading without spinners? Progress bars? Skeleton screens? Or just... waiting?

2. **Scroll-Linked Animation**: Is scroll-triggered animation (like parallax) ever acceptable in brutalism? Or is it inherently decorative?

3. **Focus Animation**: Should focus outlines animate in, or appear instantly? Instant is more brutalist, but the sudden appearance can be jarring.

4. **Theme Switching**: When switching between light/dark modes, should colors transition or change instantly?

---

## The Destination

When this system is complete, the interface will feel immediate:

```tsx
// ❌ Polished, transitional
<button className="transition-all duration-200 ease-in-out hover:bg-gray-100 hover:scale-105">

// ✓ Immediate, certain
<button className="hover:bg-action-primary-hover">
```

No delays. No curves. No apologies.

The interface responds when you act. It does not perform.

---

*"A building should be designed for its primary functions first, not for its symbolic meanings."*
— Reyner Banham

In brutalist interfaces, the primary function is response. Animation is rarely that function.
