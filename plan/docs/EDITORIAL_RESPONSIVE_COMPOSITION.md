# Editorial Responsive Composition

**Version:** 0.2
**Status:** Canonical invariants and QA contract; individual breakpoint values remain working decisions
**Applies to:** Essay, series/reference-work, archive, bilingual, and interactive editorial surfaces

This document defines how an editorial page changes composition as its available
width changes. It does not freeze the current prototype. It separates invariant
publishing relationships from provisional layout values so that a later
rearrangement can change the spread without losing hierarchy, reading order, or
typographic continuity.

The accompanying type roles, measures, paragraph rules, and apparatus tokens
remain defined in the
[Editorial Typography Specification](./EDITORIAL_TYPOGRAPHY.md).

## 1. Responsive principle

An editorial page should not behave like a collection of independently fluid
boxes. It has a small number of deliberate compositions, or editions. Fluid
values operate inside an edition; structural changes happen only when the
content fits the next edition.

The governing rule is:

> Choose structural breakpoints from content fit, then keep typography
> continuous across the boundary.

A breakpoint is not acceptable merely because both distant screenshots look
good. It must also survive inspection immediately before and after the boundary.

## 2. Invariants

These relationships must survive every responsive edition.

### 2.1 Semantic reading order

The document order is:

1. Publication classification and subject
2. Editorial title
3. Deck, premise, or title metadata
4. First body section
5. Subsequent reading or interactive material

CSS may place the title and deck in separate columns. It must not place the
first body section inside the deck column, because that makes the reading entry
depend on viewport width.

### 2.2 Title-leaf anatomy

A title leaf contains only:

- publication apparatus;
- title or title/numeral unit;
- deck or premise;
- title-level metadata such as extent, coverage, author, and date.

The first article section follows the title leaf. It may participate in a new
grid of its own, but it is not part of the title grid.

### 2.3 Hierarchy and line intent

- The intended title-line grouping is an editorial decision, not an accidental
  consequence of a narrow grid column.
- A spread must not activate if its title column introduces an additional title
  line.
- Classification scale and classification-to-title proximity remain constant
  across content types.
- A short deck remains flush left, ragged right, and balanced; it does not
  inherit body-text justification.

### 2.4 Responsive reflow

- DOM order remains meaningful without CSS grid placement.
- No edition may introduce horizontal document overflow.
- Controls and interactive explanations follow their own component logic; they
  must not be compressed into a title-leaf column simply because space exists.
- Language-specific type and composition rules continue to apply after reflow.

## 3. Current narrative editions

The narrative essay prototype currently uses two deliberate editions.

| Edition         | Available width | Composition                                                                       | Purpose                                    |
| --------------- | --------------: | --------------------------------------------------------------------------------- | ------------------------------------------ |
| Stacked edition |      `<= 56rem` | Classification, title, deck, then first section in one reading sequence           | Mobile, tablet, and narrow reading windows |
| Spread edition  |       `> 56rem` | Title and deck share a two-column title grid; the first section begins below both | Desktop editorial spread                   |

`56rem` is a content-fit threshold for the current English title and font pair,
not a universal device breakpoint. A different title, writing system, or typeface
may require an earlier threshold.

### 3.1 Spread edition

Current working geometry:

```css
grid-template-columns: minmax(0, 1.2fr) minmax(22rem, 0.8fr);
gap: clamp(3rem, 8vw, 9rem);
align-items: end;
```

Title treatment:

```css
max-width: 8.5ch;
font-size: clamp(4.5rem, 9vw, 9rem);
line-height: 0.84;
```

The deck occupies the second title column. The first section begins in a
separate grid below the title leaf.

### 3.2 Stacked edition

Current working geometry:

```css
grid-template-columns: 1fr;
gap: clamp(3rem, 8vw, 4.5rem);
```

Title and deck constraints:

```css
/* title */
font-size: clamp(4.5rem, 10vw, 5rem);

/* deck region */
max-width: 34rem;
```

The `5rem` stacked maximum meets the spread scale continuously: the current
computed title changes from `80px` at `896px` to `80.73px` at `897px`.

### 3.3 Independent page-frame change

The page frame currently changes from `2.5rem` inline gutters to `1rem` gutters
at `800px`. That frame adjustment is independent of the narrative composition
threshold. It may move the page edge, but it must not also change title line
count, deck placement, or section order.

## 4. Breakpoint acceptance criteria

A structural breakpoint passes only when all of the following are true:

1. The title preserves its intended line grouping on both sides.
2. The type scale changes continuously; the structural boundary does not also
   produce a conspicuous size jump.
3. The deck has a viable measure and no one-word final line.
4. The first body section remains after the title leaf in DOM and visual order.
5. The layout has no horizontal overflow.
6. The wider edition materially improves composition; it is not merely a way to
   fill available space.
7. The boundary is inspected at `n - 1`, `n`, and `n + 1` pixels.

The failure that established this rule occurred at the old `800px / 801px`
boundary: a one-pixel change altered title line count, title width, deck
placement, section placement, and overall page height simultaneously.

## 5. Required QA matrix

Every rearrangement of an editorial title leaf must be reviewed at these working
widths or their nearest relevant equivalents.

|                         Width | What it proves                                      |
| ----------------------------: | --------------------------------------------------- |
|                       `390px` | Small-screen reading order, title fit, and overflow |
|                       `640px` | Comfortable stacked measure                         |
|           `800px` and `801px` | Page-frame boundary remains compositionally stable  |
| `895px`, `896px`, and `897px` | Narrative edition boundary is intentional           |
|                       `900px` | First stable spread after the boundary              |
|                      `1024px` | Narrow desktop spread                               |
|                      `1440px` | Full desktop hierarchy and whitespace               |

At each width inspect:

- classification/title proximity;
- title line count and optical size;
- deck line count, rag, and measure;
- first-section position;
- page and component overflow;
- language and interactive-state behavior where applicable.

## 6. Rules for the next rearrangement

The following values are provisional and may change:

- whether the spread deck aligns to the title top, optical middle, or bottom;
- the title/deck column ratio;
- the amount of vertical whitespace before the first section;
- whether very wide pages introduce an additional apparatus rail;
- whether reference works use the same threshold as narrative essays.

The following must not change without revising this contract:

- invariant semantic order;
- separation of title leaf and first body section;
- content-fit breakpoint selection;
- continuous type scale across structural boundaries;
- one composition change per boundary;
- breakpoint-adjacent QA.

If the next rearrangement changes title, typeface, language, or deck content,
recalculate the breakpoint from the rendered content rather than preserving
`56rem` by convention.

## 7. Implementation map

| Concern                                      | Current source                                                   |
| -------------------------------------------- | ---------------------------------------------------------------- |
| Narrative semantic structure                 | `apps/storybook/stories/EditorialTypefaceSystemPrototype.tsx`    |
| Narrative grids and responsive threshold     | `apps/storybook/stories/editorial-typeface-system-prototype.css` |
| Apparatus tokens and shared header contract  | `packages/tokens/` and `EditorialClassification`                 |
| Typography, composition, and alignment rules | `plan/docs/EDITORIAL_TYPOGRAPHY.md`                              |
| Rendered breakpoint evidence                 | `design-qa.md`                                                   |
