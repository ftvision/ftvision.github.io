# Phase 1: Typographic Foundation

## Philosophy

### The Dual Nature of Chinese Typography

Chinese typography operates under different laws than Western typography. A single Chinese character is not a letter—it is a complete morpheme, a visual unit that carries meaning independently. This fundamental difference shapes everything from line height to character spacing to the relationship between headline and body.

When a reader encounters a Chinese headline, they do not spell out sounds—they recognize shapes. The character 書 (shū, "book/writing") is a picture before it is a word. This pictographic heritage means Chinese typography must honor visual weight differently than alphabetic systems.

### The Challenge of Bilingual Design

Most blog content will mix Chinese and English. This creates a typographic tension:

- Chinese characters occupy a square em-space; Latin letters vary wildly in width
- Chinese has no uppercase/lowercase distinction; Latin derives hierarchy from case
- Chinese characters are typically denser; Latin text is more linear
- Optimal line heights differ significantly between scripts

Our type system must serve both traditions without forcing either to compromise.

### Three Laws of Scholar's Typography

**1. 字如其人 (Zì rú qí rén) — "Characters reflect the person"**

Type choice is self-expression. The scholar's studio theme uses serif faces that suggest brush-origin—letter forms that remember they were once written by hand, not constructed by machine. We choose type that has memory.

**2. 疏密得当 (Shū mì dé dàng) — "Sparse and dense, appropriately balanced"**

Chinese composition theory emphasizes the interplay between density and openness. Headlines should be dense and weighty; body text should breathe. The spacing between characters (字距) and between lines (行距) creates rhythm. Too tight, the eye stumbles. Too loose, coherence dissolves.

**3. 主次分明 (Zhǔ cì fēn míng) — "Primary and secondary, clearly distinguished"**

Hierarchy must be unambiguous. A reader should know at a glance what is most important, what is supporting, what is auxiliary. This is achieved not through shouting (larger! bolder!) but through proportion and placement.

---

## Architecture

### Font Family Strategy

#### Primary Stack: Serif with CJK Support

```css
font-family:
  "Noto Serif CJK SC",     /* Primary CJK */
  "Source Han Serif SC",    /* Alternative CJK */
  "Songti SC",              /* macOS fallback */
  "SimSun",                 /* Windows fallback */
  Georgia,                  /* Latin serif */
  "Times New Roman",        /* Latin fallback */
  serif;
```

**Rationale**: Noto Serif CJK provides excellent character coverage and harmonious design between CJK and Latin glyphs. The Songti/宋体 style echoes woodblock printing tradition—appropriate for scholarly content.

#### Secondary Stack: Sans-Serif for UI

```css
font-family:
  "Noto Sans CJK SC",
  "Source Han Sans SC",
  "PingFang SC",            /* macOS */
  "Microsoft YaHei",        /* Windows */
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;
```

**Usage**: Form labels, navigation, UI elements. Not for body text.

#### Monospace Stack: Code and Technical Content

```css
font-family:
  "Noto Sans Mono",
  "Source Code Pro",
  "Menlo",
  "Consolas",
  monospace;
```

**Note**: CJK monospace is complex. Most code will be Latin; inline Chinese in code blocks is rare.

### The Semantic Type System

We define types by *purpose*, honoring both Chinese and Western naming:

```
┌─────────────────────────────────────────────────────────┐
│  DISPLAY (题额 tí'é — inscribed tablet)                 │
│  Hero headlines, feature titles                         │
│  The inscription above the scholar's door               │
├─────────────────────────────────────────────────────────┤
│  HEADING 1 (标题 biāotí — main title)                   │
│  Article headlines, page titles                         │
│  Primary structural marker                              │
├─────────────────────────────────────────────────────────┤
│  HEADING 2 (副标 fùbiāo — sub-heading)                  │
│  Section headers within articles                        │
│  Secondary structural marker                            │
├─────────────────────────────────────────────────────────┤
│  HEADING 3 (小标 xiǎobiāo — small heading)              │
│  Subsection headers, card titles                        │
│  Tertiary structural marker                             │
├─────────────────────────────────────────────────────────┤
│  HEADING 4 (细目 xìmù — detailed item)                  │
│  Minor headers, list group titles                       │
│  Quaternary structural marker                           │
├─────────────────────────────────────────────────────────┤
│  BODY (正文 zhèngwén — main text)                       │
│  Primary reading text                                   │
│  Optimized for long-form Chinese and English            │
├─────────────────────────────────────────────────────────┤
│  BODY SMALL (小字 xiǎozì — small characters)            │
│  Secondary content, sidebar text                        │
│  Reduced emphasis, still readable                       │
├─────────────────────────────────────────────────────────┤
│  CAPTION (注释 zhùshì — annotation)                     │
│  Image captions, footnotes, metadata                    │
│  Auxiliary information                                  │
├─────────────────────────────────────────────────────────┤
│  LABEL (标签 biāoqiān — label)                          │
│  Form labels, UI text, buttons                          │
│  Functional, not editorial                              │
├─────────────────────────────────────────────────────────┤
│  MARGIN NOTE (眉批 méipī — margin commentary)           │
│  Sidenotes, scholarly annotations                       │
│  Traditional commentary placement                       │
└─────────────────────────────────────────────────────────┘
```

### The Scale

We use a **1.25 (Major Third)** type scale, but with slightly larger base size to accommodate CJK readability.

**Base size**: `1.125rem` (18px) — larger than typical Western 16px to accommodate Chinese character complexity.

| Step | Multiplier | Size (rem) | Size (px) | Usage |
|------|------------|------------|-----------|-------|
| -2   | 1/1.25²    | 0.72       | ~13px     | — (too small for CJK) |
| -1   | 1/1.25     | 0.9        | ~16px     | caption, label, margin-note |
| 0    | 1          | 1.125      | 18px      | body |
| +1   | 1.25       | 1.406      | ~22.5px   | body-lg, h4 |
| +2   | 1.25²      | 1.758      | ~28px     | h3 |
| +3   | 1.25³      | 2.197      | ~35px     | h2 |
| +4   | 1.25⁴      | 2.746      | ~44px     | h1 |
| +5   | 1.25⁵      | 3.433      | ~55px     | display |

**Note**: Values rounded for practicality. Chinese characters need more space than Latin letters.

### Line Height for CJK

Chinese characters are denser than Latin letters. Optimal line heights are *higher* for Chinese text.

| Size Token | Line Height | Rationale |
|------------|-------------|-----------|
| display    | 1.2         | Large type, controlled leading |
| h1         | 1.25        | Headlines stay cohesive |
| h2         | 1.3         | Still headline-like |
| h3         | 1.35        | Transitioning to text feel |
| h4         | 1.4         | Approaching body rhythm |
| body       | 1.8         | **Generous** — Chinese needs breathing room |
| body-sm    | 1.7         | Still comfortable |
| caption    | 1.6         | Compact but legible |
| label      | 1.5         | UI-focused |
| margin-note| 1.6         | Sidenote readability |

**Critical**: The `body` line height of `1.8` is noticeably higher than typical Western recommendations (1.5-1.6). This is intentional—Chinese characters are visually denser and require more interlinear space for comfortable reading.

### Weight Assignment

Chinese fonts often have limited weight variants. We work within common constraints:

| Usage | Weight | Value | Rationale |
|-------|--------|-------|-----------|
| display | bold | 700 | Maximum impact |
| h1 | bold | 700 | Clear hierarchy |
| h2 | semibold | 600 | Distinct from h1 |
| h3 | semibold | 600 | Consistent with h2 |
| h4 | medium | 500 | Lighter touch |
| body | normal | 400 | Reading comfort |
| body-sm | normal | 400 | Consistency |
| caption | normal | 400 | Unobtrusive |
| label | medium | 500 | UI presence |
| margin-note | normal | 400 | Gentle annotation |

**Note**: Many CJK fonts only have Regular (400) and Bold (700). Noto Serif CJK offers more weights; fallback stacks may not.

---

## Character Spacing (Letter Spacing)

### The Principle: 疏可走马，密不透风

"Where sparse, a horse can gallop; where dense, wind cannot pass."

This calligraphy principle applies to typography:

- Headlines can be spaced more openly (tracking)
- Body text should be set naturally (no tracking)
- Never compress Chinese characters—they need their full square

### Token Structure

```
font.tracking.{name}   → Letter spacing adjustments
```

| Token | Value | Usage |
|-------|-------|-------|
| tracking.tight | -0.01em | **Avoid for CJK** — Latin display only |
| tracking.normal | 0 | Body text, most content |
| tracking.relaxed | 0.025em | Headlines, display text |
| tracking.wide | 0.05em | All-caps Latin, overlines |

**Warning**: Negative tracking (compression) should never be applied to Chinese text. Characters lose legibility when compressed.

---

## Implementation Plan

### Step 1: Define Font Family Tokens

**File**: `packages/tokens/src/primitives/typography.json`

```json
{
  "primitive": {
    "font": {
      "family": {
        "serif-cjk": {
          "value": "'Noto Serif CJK SC', 'Source Han Serif SC', 'Songti SC', 'SimSun', Georgia, 'Times New Roman', serif"
        },
        "sans-cjk": {
          "value": "'Noto Sans CJK SC', 'Source Han Sans SC', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif"
        },
        "mono": {
          "value": "'Noto Sans Mono', 'Source Code Pro', Menlo, Consolas, monospace"
        }
      }
    }
  }
}
```

### Step 2: Define Size Scale

Extend primitives with CJK-optimized sizes:

```json
{
  "primitive": {
    "font": {
      "size": {
        "xs": { "value": "0.9rem" },
        "sm": { "value": "1rem" },
        "base": { "value": "1.125rem" },
        "lg": { "value": "1.406rem" },
        "xl": { "value": "1.758rem" },
        "2xl": { "value": "2.197rem" },
        "3xl": { "value": "2.746rem" },
        "4xl": { "value": "3.433rem" }
      }
    }
  }
}
```

### Step 3: Create Semantic Typography Tokens

**File**: `packages/tokens/src/themes/chinese-aesthetic/typography.json`

```json
{
  "font": {
    "family": {
      "body": { "value": "{primitive.font.family.serif-cjk}" },
      "heading": { "value": "{primitive.font.family.serif-cjk}" },
      "ui": { "value": "{primitive.font.family.sans-cjk}" },
      "code": { "value": "{primitive.font.family.mono}" }
    },
    "size": {
      "display": { "value": "{primitive.font.size.4xl}" },
      "h1": { "value": "{primitive.font.size.3xl}" },
      "h2": { "value": "{primitive.font.size.2xl}" },
      "h3": { "value": "{primitive.font.size.xl}" },
      "h4": { "value": "{primitive.font.size.lg}" },
      "body": { "value": "{primitive.font.size.base}" },
      "body-sm": { "value": "{primitive.font.size.sm}" },
      "caption": { "value": "{primitive.font.size.xs}" },
      "label": { "value": "{primitive.font.size.xs}" },
      "margin-note": { "value": "{primitive.font.size.xs}" }
    },
    "lineHeight": {
      "display": { "value": "1.2" },
      "h1": { "value": "1.25" },
      "h2": { "value": "1.3" },
      "h3": { "value": "1.35" },
      "h4": { "value": "1.4" },
      "body": { "value": "1.8" },
      "body-sm": { "value": "1.7" },
      "caption": { "value": "1.6" },
      "label": { "value": "1.5" },
      "margin-note": { "value": "1.6" }
    },
    "weight": {
      "display": { "value": "700" },
      "h1": { "value": "700" },
      "h2": { "value": "600" },
      "h3": { "value": "600" },
      "h4": { "value": "500" },
      "body": { "value": "400" },
      "body-sm": { "value": "400" },
      "caption": { "value": "400" },
      "label": { "value": "500" },
      "margin-note": { "value": "400" }
    }
  }
}
```

### Step 4: Create Tailwind Typography Utilities

**File**: `packages/ui/tailwind.config.js`

```js
// Typography utilities for Chinese Aesthetic theme
typography: {
  'display': {
    fontSize: 'var(--font-size-display)',
    lineHeight: 'var(--font-line-height-display)',
    fontWeight: 'var(--font-weight-display)',
    fontFamily: 'var(--font-family-heading)',
  },
  'h1': {
    fontSize: 'var(--font-size-h1)',
    lineHeight: 'var(--font-line-height-h1)',
    fontWeight: 'var(--font-weight-h1)',
    fontFamily: 'var(--font-family-heading)',
  },
  // ... etc
}
```

### Step 5: Document Special CJK Considerations

**File**: `packages/ui/docs/chinese_aesthetic_theme/01a_CJK_TYPOGRAPHY.md`

Document:
- Font loading strategies for CJK (files are large)
- Fallback behavior across operating systems
- Mixed-script line breaking rules
- Punctuation handling (Chinese vs Western)

### Step 6: Test Across Platforms

CJK font rendering varies significantly:
- macOS renders CJK beautifully with native fonts
- Windows requires explicit font installation or web fonts
- Linux depends on fontconfig settings
- Mobile has its own complexities

---

## Success Criteria

1. **Bilingual Harmony**: Chinese and English text feel like one voice
2. **CJK Readability**: Body text comfortable at 1.125rem with 1.8 line height
3. **Font Loading**: Web fonts load without layout shift
4. **Cross-Platform**: Acceptable rendering on macOS, Windows, iOS, Android
5. **Hierarchy**: Readers can navigate structure at a glance
6. **Tailwind Integration**: Semantic classes available (`text-display`, `text-body`, etc.)

---

## Open Questions

1. **Variable Fonts**: Should we use variable weight fonts for smoother transitions, given limited CJK weight options?

2. **Vertical Text**: Traditional Chinese can be written vertically. Should we support vertical text mode for certain components (pull quotes, decorative elements)?

3. **Font Loading Strategy**: CJK font files are large (10-20MB). Should we subset fonts, use `unicode-range`, or accept the weight for better typography?

4. **Traditional vs Simplified**: Should we offer parallel font stacks for Traditional Chinese (TC) content?

5. **Punctuation Width**: Chinese punctuation is full-width; mixing with half-width Western punctuation creates rhythm issues. How do we handle this?

---

## Relationship to Other Phases

| Phase | Relationship |
|-------|--------------|
| Phase 2 (Spacing) | Line height and paragraph spacing must harmonize |
| Phase 3 (Motion) | Text should not animate; containers and reveals only |
| Phase 4 (Color) | Text colors must meet CJK contrast requirements |
| Phase 5 (Accessibility) | CJK font sizing and spacing affect readability |
| Phase 6 (Components) | All components inherit typography tokens |

---

## The Destination

When this phase is complete, a reader should feel:

> This text was not merely displayed—it was *set*. Someone cared about how Chinese characters breathe beside English words. The headlines have weight; the body has rhythm. Reading here is not consumption—it is contemplation.

The type does not call attention to itself. It simply serves the words.

---

*"书法为艺术之最高，因其兼具形式与意义。"*
*"Calligraphy is the highest art, for it combines form and meaning."*
— 蔡襄 (Cai Xiang), Song Dynasty calligrapher
