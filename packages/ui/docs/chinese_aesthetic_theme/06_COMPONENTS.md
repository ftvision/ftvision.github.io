# Phase 6: Component Vocabulary

## Philosophy

### The Scholar's Tools (文房四宝)

The traditional scholar's studio contained the "Four Treasures of the Study": brush (笔), ink (墨), paper (纸), and inkstone (砚). These tools were not merely functional—they were aesthetic objects, chosen for beauty and quality, handled with reverence.

Our components are the digital equivalent. Each component should feel like a carefully chosen tool in the scholar's studio: purposeful, beautiful, and worthy of respect.

### Components as Vessels (器)

In Chinese philosophy, the concept of *qi* (器)—vessel, tool, container—is deeply considered. Confucius said *君子不器* (jūnzǐ bù qì): "The noble person is not a mere vessel," meaning humans should not be limited to single functions.

But vessels themselves are honored. A well-made vessel serves its purpose with grace. Our components should be:
- **Purposeful**: Clear function, no ambiguity
- **Beautiful**: Aesthetic value beyond mere utility
- **Harmonious**: Working together as a coherent set
- **Reverent**: Handling content with respect

### Three Laws of Scholar's Components

**1. 文质彬彬 (Wén zhì bīn bīn) — "Refined substance and elegant form in balance"**

Components must balance function (质) and form (文). Over-styling creates empty beauty; under-styling neglects the aesthetic. The balance is everything.

**2. 小中见大 (Xiǎo zhōng jiàn dà) — "See the great within the small"**

Even the smallest component—a button, a badge—should embody the entire design philosophy. The system's character should be recognizable in any single element.

**3. 相得益彰 (Xiāng dé yì zhāng) — "Complement each other to enhance brilliance"**

Components should work together harmoniously. The card should feel like it belongs with the button; the blockquote should feel like it comes from the same hand as the caption.

---

## Component Taxonomy

### Layer Model

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 4: TEMPLATES                                     │
│  Full page layouts, article templates                   │
│  (ArticleLayout, AnnotationLayout, GalleryLayout)       │
├─────────────────────────────────────────────────────────┤
│  LAYER 3: PATTERNS                                      │
│  Complex, multi-element compositions                    │
│  (Callout, Modal, ScrollProgress, MarginNote)           │
├─────────────────────────────────────────────────────────┤
│  LAYER 2: PRIMITIVES                                    │
│  Basic UI building blocks                               │
│  (Button, Card, Input, Badge, BrushStroke)              │
├─────────────────────────────────────────────────────────┤
│  LAYER 1: TOKENS                                        │
│  Design decisions as variables                          │
│  (@blog/tokens - chinese-aesthetic theme)               │
└─────────────────────────────────────────────────────────┘
```

**Rule:** Components only import from same or lower layers.

---

## Theme-Specific Components

These components are unique to or specially designed for the Chinese aesthetic theme:

### 1. Seal Stamp (印章 / SealStamp)

The author's signature, rendered as a traditional red seal stamp.

**Anatomy:**
```
┌───────────┐
│ ╔═══════╗ │
│ ║ 作者名 ║ │
│ ╚═══════╝ │
└───────────┘
```

**Variants:**
- `round`: Circular seal (more casual)
- `square`: Square seal (more formal)
- `relief`: Characters in relief (white on red)
- `intaglio`: Characters incised (red outline on white)

**Props:**
```tsx
interface SealStampProps {
  name: string;           // 1-4 Chinese characters
  variant?: 'round' | 'square';
  style?: 'relief' | 'intaglio';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;     // Stamp animation on mount
}
```

**Token Usage:**
- Background: `seal.red`
- Text: `paper.silk` (for relief) or `seal.red` (for intaglio)
- Border: `seal.red-dark`

**Usage:**
```tsx
<article>
  <h1>文章标题</h1>
  <div className="byline">
    <SealStamp name="范同" variant="square" style="relief" />
    <span>March 2024</span>
  </div>
  {/* content */}
</article>
```

---

### 2. Brush Stroke Divider (墨迹 / BrushDivider)

An animated SVG divider that draws itself like a calligraphic stroke.

**Variants:**
```
horizontal:  ═══════════════════════════════
wave:        ～～～～～～～～～～～～～～～～
dot:         · · · · · · · · · · · ·
flick:       ────────────────────────╲
```

**Props:**
```tsx
interface BrushDividerProps {
  variant?: 'horizontal' | 'wave' | 'dot' | 'flick';
  animated?: boolean;         // Draw animation
  triggerOn?: 'mount' | 'viewport' | 'hover';
  color?: 'ink' | 'accent';
}
```

**Token Usage:**
- Stroke: `ink.light` (default) or `seal.red` (accent)
- Animation: `duration.deliberate` + `easing.ink-spread`

---

### 3. Margin Note (眉批 / MarginNote)

Annotation that appears in the margin, following scholarly tradition.

**Anatomy:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Main text continues here with normal flow.    │ 眉批：此处 │
│   The margin note appears alongside without     │ 的注释说明 │
│   interrupting the reading experience.          │ 读者的思考 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Variants:**
- `sidenote`: Reader annotation (secondary color)
- `author`: Author note (accent color marker)
- `reference`: Citation/reference (muted styling)

**Props:**
```tsx
interface MarginNoteProps {
  id: string;             // For anchor linking
  variant?: 'sidenote' | 'author' | 'reference';
  marker?: string;        // Custom marker (e.g., "※", "按")
  children: React.ReactNode;
}
```

**Token Usage:**
- Text: `text.secondary`
- Marker: `seal.red` (author) or `text.muted` (sidenote)
- Font: `font.size.margin-note`

**Mobile Behavior:**
On narrow screens, margin notes become inline expandable elements:
```
Main text with note trigger¹...

¹ [Expanded note appears inline when tapped]
```

---

### 4. Scroll Progress Landscape (山水进度 / ScrollLandscape)

Progress indicator styled as a traditional landscape painting that unrolls as you scroll.

**Anatomy:**
```
Reading Progress:
┌──────────────────────────────────────────────────┐
│ 🏔️ ~~~  ⛰️  ~~~  🌲  ~~~  🏔️ ~~~  ⛰️  │ (simplified representation)
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░ │ (actual: SVG with gradient)
└──────────────────────────────────────────────────┘
```

**Props:**
```tsx
interface ScrollLandscapeProps {
  variant?: 'mountains' | 'river' | 'minimal';
  position?: 'top' | 'bottom' | 'floating';
  showPercentage?: boolean;
}
```

**Implementation:**
- SVG path representing mountain silhouettes
- Clip-path or gradient reveals the landscape as scroll progresses
- Color shifts from `ink.wash` (unread) to `ink.heavy` (read)

---

### 5. Moon Gate Frame (月门 / MoonGate)

Circular or arch-shaped frame for images, inspired by garden architecture.

**Anatomy:**
```
        ╭─────────────────╮
       ╱                   ╲
      │                     │
      │    [Image inside]   │
      │                     │
       ╲                   ╱
        ╰─────────────────╯
```

**Variants:**
- `full`: Complete circle
- `arch`: Traditional arch shape
- `window`: Rectangular with rounded top

**Props:**
```tsx
interface MoonGateProps {
  variant?: 'full' | 'arch' | 'window';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: React.ReactNode;
}
```

**Token Usage:**
- Frame: `ink.wash` border or shadow
- Background: `bg.secondary` (for letterboxing)

---

### 6. Tea Time Mode Toggle (茶歇模式 / TeaTimeToggle)

Button that activates ultra-contemplative reading mode.

**Effects when enabled:**
- Typography size increases 10%
- Margins expand significantly
- Color palette mutes further
- All animations pause
- Optional: subtle paper texture appears

**Props:**
```tsx
interface TeaTimeToggleProps {
  defaultEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}
```

---

### 7. Seasonal Theme Selector (四季 / SeasonSelector)

Optional component for switching seasonal color accents.

**Options:**
- 春 (Spring): Plum blossom pink
- 夏 (Summer): Lotus pink
- 秋 (Autumn): Chrysanthemum gold
- 冬 (Winter): Plum red

**Props:**
```tsx
interface SeasonSelectorProps {
  current?: 'spring' | 'summer' | 'autumn' | 'winter' | 'auto';
  onSelect?: (season: Season) => void;
}
```

---

## Modified Standard Components

These are standard components styled for the Chinese aesthetic:

### Button (按钮)

**Variants:**
- `primary`: Seal red background, silk text
- `secondary`: Outlined with ink border
- `ghost`: Text only, ink color
- `accent`: Celadon background (success actions)

**Special styling:**
- Slightly rounded corners (not sharp, not pill)
- Brush-like hover transition
- Seal stamp effect for important actions (optional)

**Token Usage:**
```css
.button-primary {
  background: var(--color-seal-red);
  color: var(--color-paper-silk);
  border-radius: var(--radius-md);
  transition: all var(--motion-duration-swift) var(--motion-easing-brush-enter);
}

.button-primary:hover {
  background: var(--color-seal-red-dark);
  transform: translateY(-1px);
}
```

---

### Card (卡片)

**Variants:**
- `default`: Paper-colored surface with subtle shadow
- `elevated`: Lifted with ink shadow
- `bordered`: Ink border, no shadow
- `scroll`: Horizontal scroll-like appearance

**Special styling:**
- Warm paper background
- Ink-like shadows (soft, diffuse)
- Optional decorative corner elements

---

### Blockquote (引用 / 摘录)

**Variants:**
- `inline`: Standard left-border quote
- `pullquote`: Centered, dramatic, larger text
- `attributed`: With source attribution styled as seal

**Anatomy (Pullquote):**
```
                    ❝
    The finest words are those
    that do not need to be spoken.
                    ❞

              — 老子

```

**Token Usage:**
- Quote text: `text.primary`, `font.size.h3` (for pullquote)
- Border: `seal.red` (left bar)
- Background: `surface.quote`
- Attribution: `text.secondary`, `font.size.caption`

---

### Code Block (代码块)

**Styling:**
- Background: `surface.code` (warm gray, paper-like)
- Border: Subtle `ink.wash` border
- Font: Monospace stack
- Line numbers: `ink.faint`

**Special features:**
- Copy button styled as ink drop icon
- Language tag as small seal-style badge
- Horizontal scroll with fade edges

---

### Figure (图 / Figure)

**Anatomy:**
```
┌───────────────────────────────────────────┐
│                                           │
│              [Image]                      │
│                                           │
├───────────────────────────────────────────┤
│ 图: 山水画示意                             │
│ Image credit: Artist Name                 │
└───────────────────────────────────────────┘
```

**Special styling:**
- Caption uses Chinese figure numbering (图一、图二...)
- Optional moon gate framing
- Credit line in `text.muted`

---

### Callout (提示框)

**Variants:**
- `note`: Ink-colored, informational (默认)
- `tip`: Celadon background (建议)
- `warning`: Gold accent (注意)
- `danger`: Seal red accent (警告)

**Styling:**
- Soft rounded corners
- Icon + text (accessible)
- Generous padding
- Optional brush-stroke top border

---

## Editorial Components

### Byline (作者栏)

**Anatomy:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [SealStamp]  作者姓名                                   │
│               March 15, 2024 · 5 min read               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Props:**
```tsx
interface BylineProps {
  author: {
    name: string;
    chineseName?: string;
    avatar?: string;
  };
  date: Date;
  readTime?: string;
  showSeal?: boolean;
}
```

---

### Table of Contents (目录)

**Styling:**
- Vertical list with ink bullets
- Current section highlighted with seal red marker
- Smooth scroll navigation
- Optional: Styled as scroll index (卷轴目录)

---

### Footnotes (注脚)

**Styling:**
- Superscript numbers in seal red
- Footnotes collected at bottom with horizontal brush divider
- Backlinks to return to reference point

---

## Implementation Plan

### Phase 6a: Theme-Specific Components

1. **SealStamp** — Author signature component
2. **BrushDivider** — Animated stroke dividers
3. **MarginNote** — Scholarly margin annotations
4. **MoonGate** — Decorative image framing

### Phase 6b: Modified Primitives

1. **Button** — Themed variants
2. **Card** — Paper/scroll variants
3. **Input** — Scholar's studio styling
4. **Badge** — Seal-style tags

### Phase 6c: Editorial Components

1. **Blockquote** — Inline and pullquote variants
2. **Figure** — Image with caption system
3. **Byline** — Author attribution
4. **CodeBlock** — Syntax highlighting with aesthetic

### Phase 6d: Navigation Components

1. **ScrollLandscape** — Progress indicator
2. **TableOfContents** — Article navigation
3. **SeasonSelector** — Seasonal theming
4. **TeaTimeToggle** — Reading mode

---

## Quality Requirements

### Every Component Must Have:

1. **TypeScript types** — Full prop typing
2. **Ref forwarding** — `forwardRef` for all
3. **Semantic HTML** — Correct elements, ARIA
4. **Keyboard support** — Full operability
5. **Focus management** — Visible focus states
6. **Token compliance** — Zero hardcoded values
7. **Storybook stories** — All variants documented
8. **Responsive behavior** — Mobile considerations
9. **Theme support** — Light and dark modes
10. **Bilingual support** — Chinese/English text handling

### Testing Checklist

For each component:
- [ ] Renders correctly in Storybook
- [ ] All variants visible and distinct
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus states visible and aesthetic
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No hardcoded colors/spacing/durations
- [ ] Responsive at mobile/tablet/desktop
- [ ] TypeScript compiles without errors
- [ ] Chinese text displays correctly

---

## Success Criteria

1. **Theme-Specific Components**: SealStamp, BrushDivider, MarginNote complete
2. **Editorial Components**: Blockquote, Figure, Byline complete
3. **Navigation Components**: ScrollLandscape, ToC complete
4. **Accessibility**: All components pass axe-core audit
5. **Documentation**: Storybook complete with usage examples
6. **Token Compliance**: Zero hardcoded values
7. **Bilingual Support**: All components handle Chinese/English

---

## Open Questions

1. **Animation Performance**: Should BrushDivider and ScrollLandscape use Canvas/WebGL for complex animations, or stick with SVG?

2. **Margin Notes on Mobile**: Should margin notes become tooltips, expandable sections, or footnote-style on narrow screens?

3. **Seal Stamp Customization**: Should users be able to upload custom seal images, or stick with generated character seals?

4. **Seasonal Theming Scope**: Should season selection affect only accent colors, or also background warmth and imagery?

---

## The Destination

When this phase is complete, a blog article can be built entirely with system components:

```tsx
<ArticleLayout>
  <Byline
    author={{ name: "Author Name", chineseName: "作者名" }}
    date={new Date()}
    readTime="5 min"
    showSeal
  />

  <Typography variant="h1">
    On the Nature of Emptiness
    <br />
    <span lang="zh">论空的本质</span>
  </Typography>

  <BrushDivider variant="wave" animated />

  <Typography variant="body">
    The space between these words...
  </Typography>

  <MarginNote variant="author" marker="按">
    This concept relates to Buddhist śūnyatā.
  </MarginNote>

  <MoonGate variant="arch">
    <Figure
      src="/images/landscape.jpg"
      alt="Mountain landscape"
      caption="图一：远山淡影"
      credit="Artist Name"
    />
  </MoonGate>

  <Blockquote variant="pullquote" attribution="老子">
    道可道，非常道
  </Blockquote>

  <BrushDivider variant="dot" />

  <Callout type="note" title="注">
    Further reading on this topic...
  </Callout>
</ArticleLayout>
```

The components feel like they belong in a scholar's studio—purposeful, beautiful, harmonious.

---

*"工欲善其事，必先利其器。"*
*"A craftsman who wishes to do good work must first sharpen their tools."*
— 论语 (The Analects)

Our components are our tools. We sharpen them with care.
