# Editorial Typography Specification

**Version:** 0.3
**Status:** Canonical vocabulary and current Storybook contract; production promotion remains staged
**Applies to:** Landing, Essays, Series/reference works, About, long-form MDX, and interactive reading surfaces
**Does not replace:** Generic application and control typography in the existing design system

This specification defines the editorial typography subsystem for Algo Mind. It
separates publication typography from generic website typography and gives the
team one vocabulary for describing, implementing, and reviewing type.

The words **must**, **should**, and **may** are normative:

- **Must** means required for an editorial surface.
- **Should** means the default; deviation requires a visible reason.
- **May** means optional or progressive enhancement.

## 1. Core decision: two related typography systems

Algo Mind has two typography systems that share colors and spacing but serve
different reading conditions.

| System               | Purpose                                                  | Typical surfaces                                                        |
| -------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
| UI typography        | Navigation, controls, forms, filters, short utility copy | Masthead, tabs, buttons, search, map/table controls                     |
| Editorial typography | Hierarchy and sustained reading                          | Title leaves, essays, series introductions, references, notes, captions |

Editorial surfaces must not inherit a generic `display = bold 700` treatment by
default. Their hierarchy depends on optical size, typographic color, measure,
leading, paragraph composition, and editorial apparatus—not weight alone.

The existing global `type-*` classes remain valid for application UI. The
editorial subsystem should eventually expose its own semantic tokens instead of
overwriting generic H1 and body tokens.

## 2. Canonical vocabulary

Use the Chinese terms in visual review and the paired English terms in code,
tokens, and cross-language discussion. The mapping is role-based rather than a
claim that every publishing tradition uses one identical term.

### 2.1 Publication anatomy and journal terminology

| Canonical Chinese term  | English term                       | Meaning and Algo Mind usage                                               |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| 刊名 / 刊头             | Nameplate / wordmark               | The publication identity, currently `Algo Mind`                           |
| 刊物定位语 / 出版命题   | Publication premise                | A reader-facing statement of subjects and editorial scope                 |
| 眉题 / 分类标           | Eyebrow / classification label     | Optional form or subject above a title; never automatic decoration        |
| 引题 / 肩题             | Kicker                             | A short semantic lead-in before the main title                            |
| 主标题                  | Main headline / display title      | The primary authored title and dominant typographic anchor                |
| 副标题                  | Subtitle                           | A factual extension of the main title                                     |
| 提要 / 导语             | Deck / standfirst                  | Short introductory copy near a title; display composition, not body prose |
| 署名                    | Byline                             | Author or contributor credit                                              |
| 图题 / 图注             | Figure title / caption             | Identification and explanation attached to a figure                       |
| 出版说明 / 刊记         | Imprint statement / publisher line | Brief statement of independent publication and responsibility             |
| 版权页 / 版记           | Colophon                           | Fuller publication, production, type, copyright, and credit information   |
| 书眉                    | Running head                       | Repeated page or section identification                                   |
| 页码区                  | Folio                              | Page numbering and its supporting position                                |
| 编排附属信息 / 编校装置 | Editorial apparatus                | Dates, sources, labels, indices, reading states, and useful metadata      |

`Front table` is the project's internal metaphor for the homepage: a publisher's
selection of what to read now. It is not a visible department label or a claim
that the site follows a formal historical issue structure.

### 2.2 Composition and type vocabulary

| Canonical Chinese term | English term                   | Meaning                                                                   |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| 展示字体               | Display typeface               | A face selected for large titles, not merely an enlarged body face        |
| 正文字体               | Text face / body typeface      | A face optimized for continuous reading                                   |
| 字阶                   | Type scale                     | Size hierarchy between title, section, body, note, and apparatus roles    |
| 版面灰度 / 文字灰度    | Typographic color / page color | Perceived tonal density of a page or block of type                        |
| 字面率                 | Face-to-body proportion        | How much of the em square is occupied by the visible glyph                |
| 字距                   | Tracking / letter-spacing      | Uniform expansion or contraction between characters                       |
| 行距                   | Leading / line-height          | Distance between consecutive text baselines                               |
| 行长                   | Measure / text measure         | Width available to one line of continuous text                            |
| 首行基线对齐           | First-baseline alignment       | Alignment of differently sized text on the first baseline                 |
| 齐头散尾               | Flush left, ragged right       | Fixed left edge and a deliberately variable right edge                    |
| 行尾轮廓               | Rag                            | Overall contour of a ragged text edge                                     |
| 齐头齐尾 / 两端齐行    | Justification                  | Composition that fills both line edges except the final line              |
| 连字符断词             | Hyphenation                    | Language-aware word division at a line ending                             |
| 标点避头尾 / 标点禁则  | Strict line breaking / kinsoku | Rules preventing unsuitable punctuation at line starts or ends            |
| 悬挂标点               | Hanging punctuation            | Punctuation projecting beyond the measure for optical alignment           |
| 白河                   | River                          | Accidental vertical channels of whitespace in justified text              |
| 段落构成               | Paragraph composition          | Combined result of measure, breaking, spacing, hyphenation, and alignment |

### 2.3 Chinese-native review vocabulary

These terms describe visible relationships rather than CSS properties:

- **章法** — the overall organization of a page or spread;
- **行款** — the arrangement of lines, headings, signatures, indentation, and
  textual order;
- **布白** — the active organization of whitespace rather than empty remainder;
- **疏密** — the rhythm of dense and open regions;
- **黑白关系** — the relationship between type, rules, and unprinted space;
- **虚实** — the relative presence of dominant and supporting material;
- **气口** — an opening that lets adjacent text groups separate and breathe.

Use these terms only when the visible relationship is named precisely. “More
breathing room” is not a substitute for identifying the measure, leading, grid,
or proximity relationship that must change.

Avoid using “alignment” as a catch-all. Grid alignment, baseline alignment,
optical alignment, paragraph composition, and Chinese line-breaking rules are
separate systems.

## 3. Typeface roles

### 3.1 Normative role map

| Role                         | Current face                                           |                 Default weight | Use                                                                   |
| ---------------------------- | ------------------------------------------------------ | -----------------------------: | --------------------------------------------------------------------- |
| Latin monumental display     | Vollkorn Variable                                      |                            560 | Title leaves and major section displays                               |
| Latin supporting headline    | Newsreader Variable                                    |                        560–580 | Numbered propositions, section headings, row titles, and navigation   |
| CJK editorial headline       | Noto Serif SC with Source Han Serif / Songti fallbacks |                            600 | Chinese title leaves and section headings                             |
| Latin editorial body         | Source Serif 4                                         |                            400 | English long-form prose and quotations                                |
| CJK editorial body           | Theme heading/serif stack with CJK coverage            |                            400 | Chinese long-form prose                                               |
| Editorial deck / standfirst  | Newsreader Variable                                    |                        520–570 | Article and reference-work title leaves                               |
| Homepage publication premise | Newsreader Variable                                    |                            440 | Quiet opening statement above the lead work                           |
| Homepage lead deck           | Newsreader Variable                                    |                            450 | Supporting introduction beside the lead title                         |
| Homepage publisher statement | Newsreader Variable                                    |                            520 | Smaller imprint statement; weight compensates for its reduced scale   |
| Editorial apparatus          | Code/monospace stack                                   | 600 for labels; 400 for values | Classification, numbering, folios, metadata, source labels, tab times |
| Interactive control text     | Existing UI/body stack                                 |       Existing semantic weight | Buttons, tabs, search, toggles, map/table controls                    |

### 3.2 Rules

- Latin display text must enable optical sizing when the font supports it.
- A body face must not be promoted into a headline merely by setting weight 700.
- CJK headline and body roles must be evaluated separately; a Latin headline
  decision does not automatically transfer to Chinese.
- Apparatus text should remain small, restrained, and structurally useful. It
  must not become decorative badge language.
- Numeric weight is not visual hierarchy by itself. Optical size, face design,
  scale, leading, measure, and page position determine whether a role recedes.
- Fallback stacks must preserve serif/sans intent and include the appropriate
  writing-system coverage.

## 4. Editorial type scale

The current prototypes establish these working ranges. They are semantic ranges,
not permission for every page to invent a different size.

| Role                         | Desktop size                                   |                                       Weight |                         Tracking |     Leading |
| ---------------------------- | ---------------------------------------------- | -------------------------------------------: | -------------------------------: | ----------: |
| Monumental Latin title       | `clamp(4.2rem, 7.2–9.4vw, 9.8rem)`             |                                          560 |          `-0.04em` to `-0.045em` | `0.84–0.90` |
| Monumental CJK title         | `clamp(6rem, 11vw, 11rem)`                     |                                          600 | up to `-0.055em` after visual QA |      `0.95` |
| Major section display        | `clamp(3.8rem, 6–7vw, 6.5rem)`                 |                                          560 |                        `-0.04em` | `0.92–0.94` |
| Numbered essay heading       | `clamp(2.1rem, 3.6–3.8vw, 3.6rem)`             |                                          560 |                       `-0.025em` | `1.05–1.10` |
| Compact reference heading    | `clamp(1.5rem, 2.2vw, 2.1rem)`                 |                                          580 |                       `-0.015em` |      `1.15` |
| Article/reference deck       | page-specific within the supporting scale      |                                      520–570 |        reviewed at rendered size | `1.30–1.45` |
| Homepage premise             | `clamp(1.45rem, 2.25vw, 2.35rem)`              |                                          440 |                       `-0.016em` |      `1.18` |
| Homepage lead deck           | `clamp(1.25rem, 1.65vw, 1.6rem)`               |                                          450 |                       `-0.008em` |      `1.45` |
| Homepage publisher statement | `clamp(1.35rem, 1.85vw, 1.7rem)`               |                                          520 |                       `-0.012em` |      `1.40` |
| English body                 | `clamp(1.12rem, 1.35vw, 1.24rem)`              |                                          400 |                              `0` | `1.72–1.76` |
| Chinese body                 | same optical size as English, adjusted by face |                                          400 |                              `0` | `1.90–1.95` |
| English lead paragraph       | `clamp(1.28rem, 1.8vw, 1.6rem)`                | 400, italic only when editorially meaningful |                  up to `-0.02em` |      `1.55` |
| Supporting prose             | `0.85–0.98rem`                                 |                                          400 |                              `0` | `1.50–1.60` |
| Apparatus                    | `0.60–0.70rem`                                 |                                      400–600 |                    `0.06–0.11em` | `1.30–1.50` |

Rules:

- Headline tracking must be reviewed at the rendered size; negative tracking is
  not a transferable constant.
- Chinese negative tracking must be used more conservatively than Latin and
  requires punctuation and mixed-script review.
- Body tracking should remain at the font default. Correct body color through
  face, size, measure, and leading before changing letter-spacing.
- Fluid display sizes must have explicit mobile bounds.

## 5. Measure and page geometry

### 5.1 Page frame

- The editorial page may expand to `90rem` for title leaves, apparatus, maps,
  indices, and multi-column reference material.
- Desktop inline gutters are currently `2.5rem` per side.
- At `52rem` and below, inline gutters collapse to `1rem` per side.
- Wide page geometry must not be mistaken for the body-text measure.

### 5.2 Continuous reading measure

| Language / context             | Working maximum | Reading target                                                       |
| ------------------------------ | --------------: | -------------------------------------------------------------------- |
| English long-form MDX          |         `46rem` | Approximately 60–75 characters per line, including spaces            |
| English separately bound essay |         `43rem` | Same target, with room for contents and marginal apparatus           |
| Chinese long-form MDX          |         `50rem` | Approximately 30–42 Han characters per line at the working body size |
| Reference explanation          | `50rem` maximum | May be shorter when paired with a source column                      |

The body measure should be selected before justification is enabled. Increasing
word spacing cannot repair an over-wide measure.

## 6. Paragraph composition

### 6.1 English long-form prose

English continuous prose must use:

```css
hyphens: auto;
hyphenate-limit-chars: 6 3 3;
text-align: justify;
text-align-last: start;
text-justify: inter-word;
text-wrap: pretty;
```

It may use:

```css
hanging-punctuation: first allow-end;
```

Requirements:

- The containing reading region must declare `lang="en"`.
- The final line remains flush left and must not be expanded.
- Automatic hyphenation must be visually reviewed; consecutive hyphenated lines
  and conspicuous short fragments are failures even when technically valid.
- Short decks, metadata, captions, controls, and isolated statements should
  remain ragged-right unless the rendered result justifies an exception.

### 6.2 Chinese long-form prose

Chinese continuous prose must use:

```css
hyphens: none;
line-break: strict;
overflow-wrap: break-word;
text-align: justify;
text-align-last: start;
text-justify: inter-character;
word-break: normal;
```

It should progressively enhance mixed-script spacing with:

```css
text-autospace: normal;
```

Requirements:

- The containing reading region must declare `lang="zh-Hans"`.
- Latin-style hyphenation must not be applied to Chinese prose.
- Opening and closing punctuation must be inspected at line boundaries.
- Latin names, abbreviations, and parenthetical English must not create document
  overflow or isolated punctuation.

### 6.3 Short decks and standfirsts

Short editorial decks are display composition, not miniature body paragraphs.
They must remain flush left and ragged right; they must not inherit long-form
justification.

```css
text-align: start;
text-wrap: balance;
```

Requirements:

- A deck is optional. It must add a premise, scope, or reading instruction that
  cannot already be inferred from the section heading and adjacent content.
  Generic summaries such as “a complete record” should be removed rather than
  used to fill the opposite side of a spread.
- Section-level decks that sit above a ledger must align to an established
  ledger track. Do not introduce a separate two-column header grid that leaves
  the deck between the ledger's vertical axes.
- Balance the complete statement across its available lines rather than
  stretching word spaces to force a hard right edge.
- Review the rag at every responsive measure. A one-word final line or an
  abrupt short tail is a composition failure, even when no text overflows.
- Use `text-wrap: balance` only for short display copy. Continuous prose keeps
  the language-specific composition rules above.
- Adjust the deck measure before inserting presentational line breaks into the
  content. Manual breaks are reserved for editorially fixed titles or verse.

### 6.4 Paragraph rhythm

- Long-form paragraphs use space between paragraphs rather than first-line
  indentation in the current web edition.
- The working paragraph gap is `1.6em`.
- Do not combine a full paragraph gap with a conventional first-line indent.
- Section boundaries may use larger editorial spacing and rules; they must not
  be simulated by repeated blank paragraphs.
- Lead paragraphs may be larger or italic, but remain part of the body measure.

## 7. Grid and baseline alignment

The detailed responsive state model, breakpoint acceptance criteria, and QA
matrix live in
[Editorial Responsive Composition](./EDITORIAL_RESPONSIVE_COMPOSITION.md).

### 7.1 Title leaves

- Classification, title, numeral, and premise must be assigned to explicit grid
  rows and columns.
- A shared outer bottom edge is not sufficient evidence of alignment.
- When a numeral and title form a semantic unit, their row relationship should
  be encoded in the grid rather than approximated with margins.
- Desktop title grids must collapse into a deliberate single-column reading
  order by `52rem`; an individual title may require an earlier content-fit
  breakpoint.
- A title leaf contains a title, deck/premise, title metadata, and an optional
  classification when the publication form is not already evident.
  The first body section must follow the title grid rather than living inside
  one of its columns; otherwise the reading entry changes between stacked and
  spread layouts.
- Responsive state changes must be selected by content fit, not a generic
  device width. A spread must not activate until its title column preserves the
  intended editorial line breaks.
- The narrative working breakpoint is `56rem`: below it the title and deck form
  a stacked edition; above it they form a two-column spread. The fluid title
  scale must remain continuous across that boundary.
- Review at one pixel on either side of every structural breakpoint. A layout
  that changes title line count, type size, column placement, and section order
  at the same boundary is a failure even when both endpoints look acceptable.

### 7.2 Publication-header contract

When an essay, reference work, series page, or archive needs a classification,
it uses the same relationship between the classification row and title block.
Content type changes the words and display treatment; it must not create a new
apparatus scale or gap. Classification is optional, not a required decoration.

The shared contract is:

| Part                        | Semantic token / component                  | Current value                                                  |
| --------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| Classification text         | `--font-size-editorial-apparatus`           | `0.7rem`                                                       |
| Classification leading      | `--font-line-height-editorial-apparatus`    | `1.3`                                                          |
| Classification weight       | `--font-weight-editorial-apparatus`         | `600`                                                          |
| Classification tracking     | `--font-letter-spacing-editorial-apparatus` | `0.08em`                                                       |
| Classification-to-title gap | `--spacing-editorial-apparatus-to-display`  | `clamp(2rem, 2.5vw, 2.5rem)`                                   |
| Structural implementation   | `EditorialClassification`                   | Primary label, optional secondary label, and the standard gap  |
| Standalone apparatus        | `EditorialLabel`                            | Folios, marginal numerals, source labels, and related metadata |

Rules:

- `EditorialClassification` must be used instead of recreating the flex row on
  individual pages.
- Apply an apparatus budget before adding a classification or standalone label:
  a title leaf may use at most one classification row, and that row may contain
  at most two labels.
- Each label must add information that cannot be inferred from the current
  navigation, page title, author identity, section heading, or adjacent copy.
  Repeating `About` as `Colophon`, repeating the author name above first-person
  prose, or restating `Essays / Series / About` below the same navigation fails
  this test.
- A real document section uses an `h2` or `h3`, not apparatus styling. Apparatus
  identifies publication form, folio, source, state, or metadata; it must not
  become a decorative eyebrow above every heading.
- Two labels are permitted only when they describe independent axes such as
  publication form and subject. A generic descriptor paired with a redundant
  role label should be removed rather than balanced across the page.
- A page must not override classification size, weight, tracking, or the
  classification-to-title gap according to whether it is an essay, reference
  work, series, or archive.
- Primary and secondary labels share the same role. Their position supplies
  meaning; they do not need different type styles.
- Marginal numerals may receive a small writing-system-specific optical offset,
  but must continue to consume the shared apparatus typography tokens.
- The classification row and title must read as one proximity group before
  either is evaluated against the next section.

### 7.3 Numbered headings and rows

- Differently sized number, title, and description elements must use
  `align-items: first baseline` when they share a row.
- Manual top padding must not be used to imitate baseline alignment.
- Grid tracks containing long English words must use `minmax(0, 1fr)` or an
  equivalent zero minimum to prevent min-content overflow.
- A responsive layout must preserve semantic order when columns collapse.

### 7.4 Catalogue and prospectus pages

The archive and series pages share the publication system, but they do not use
the same ordering device.

- An essay archive is a chronological catalogue. Year and publication date
  already establish order, so ordinal item numbers are redundant and must not
  be added as decoration.
- A catalogue row has three content roles: supporting headline, description,
  and date. These roles share one ledger grid; the year is a separate rail for
  the group rather than a fourth value repeated on every row.
- When the catalogue no longer has enough width for three columns, description
  moves to a second row before the year rail collapses. The title and date must
  never overlap or reduce the title to an unusable measure.
- A series page is a prospectus. Each entry is identified by its title and
  scope, not by an arbitrary `01 / 02` sequence.
- Series extent, coverage, and first-publication date are real apparatus. They
  belong in a restrained metadata ledger adjacent to the series description;
  aggregate counts above the page title are omitted unless they change how the
  collection should be read.
- Catalogue and prospectus titles use the monumental display role; row titles,
  decks, and scope statements use the supporting headline role. Neither page
  may promote body text merely by adding bold weight.

### 7.5 Homepage as front table

The homepage is the publication's front table: it selects what to read now
without reproducing the complete catalogue or inventing an issue structure.

- The working composition is one lead essay, a short selection from Essays,
  one scoped Series entry, a brief publisher note, and an optional working line.
- Vollkorn carries monumental titles and major section displays. Newsreader
  carries the publication premise, decks, navigation, row titles, and a short
  publisher statement. Source Serif carries longer explanatory prose.
  Monospace is reserved for dates, utility text, and real metadata.
- The front table has one dark typographic anchor: its lead title. Publication
  premises and article decks use lighter Newsreader cuts and more open leading;
  scale alone does not establish hierarchy when every layer has the same page
  color.
- A publisher statement on the front table is a supporting display, not body
  copy. The current smaller statement uses Newsreader 520 to preserve texture
  at its reduced scale; it recedes through size, position, and measure rather
  than through a lower numeric weight. If it grows beyond two or three desktop
  lines, return it to Source Serif and treat it as prose instead.
- The publication premise states the subjects offered to the reader; it does
  not need to name the author. The imprint states independent authorship and
  may carry a brief views disclaimer; it does not repeat the subject list or
  summarize the author's background.
- A homepage section should not explain its own information architecture in
  filler copy. Links such as `All essays` and `All series` already establish
  where the complete record lives.
- Counts are omitted when they merely report inventory. A numeral that belongs
  to an authored title, such as `100 Vision Papers`, remains part of the title.
- The homepage may preview Essays, Series, and About, but their destination
  pages retain distinct catalogue, prospectus, and colophon responsibilities.

## 8. Editorial apparatus and interactive publishing

Interactive publication controls are part of the publication, but they are not
continuous prose.

- Reading-depth tabs, map/table controls, search, filters, and toggles use UI
  composition: flush left, never justified.
- Labels, folios, indices, source notes, and reading times use the apparatus
  role, not badges or pills.
- Active state should be expressed through rule, restrained surface change, or
  accent color—not through a new typographic hierarchy.
- Interactive controls must not change the body measure when state changes.
- A scientific map or table may use a wider internal canvas, but it must not
  widen the document viewport.
- Full, spine, and argument reading modes must preserve the same type roles even
  when the amount of prose changes.

## 9. Language and document semantics

- Set `lang` on the actual article or reading region, not only on a language
  switcher or page shell.
- Use `en` for English and `zh-Hans` for Simplified Chinese.
- A quoted passage in another language may override `lang` locally.
- Hyphenation and strict line-breaking are language-dependent behavior; a page
  without correct language semantics has not passed typography QA.

## 10. Progressive enhancement and algorithm boundary

The current system uses native browser composition. `text-wrap: pretty` is a
browser heuristic; it is not Knuth–Plass paragraph optimization.

`hanging-punctuation`, `text-autospace`, `text-justify`, and hyphenation details
vary by browser. They should be treated as progressive enhancement around a
sound fallback: correct language, measure, font, size, leading, and DOM order.

A future Knuth–Plass experiment may be considered for static English long-form
prose only. It must not ship unless it:

1. Improves the full paragraph rather than one screenshot.
2. Avoids visible reflow after load and on resize.
3. Preserves selectable, searchable, accessible text.
4. Does not mutate React-owned DOM unpredictably.
5. Demonstrably reduces bad spacing, rivers, and repeated hyphenation.
6. Leaves Chinese composition and interactive controls under language-native
   browser rules.

## 11. Anti-patterns

Do not:

- Describe every typography problem as “alignment.”
- Apply the generic bold display token to editorial headlines by default.
- Justify navigation, metadata, buttons, tab labels, captions, or short decks.
- Fix an unstable rag only by widening the text block.
- Compensate for the wrong headline face with extreme weight or tracking.
- Center different type sizes vertically when they are meant to read as one
  textual line.
- Use manual padding as a baseline system.
- Force Chinese and English through the same line-breaking rules.
- claim Knuth–Plass behavior when only browser-native wrapping is enabled.

## 12. QA checklist

Every editorial reading surface must be checked at a desktop viewport and at
`390px` mobile width.

### Typeface and hierarchy

- [ ] Correct Latin and CJK headline faces are loaded, not fallback fonts.
- [ ] Monumental and compact Latin headline weights compute to the intended
      560/580 roles.
- [ ] Homepage premise, lead deck, and publisher statement compute to their
      quieter 440/450/520 roles instead of inheriting a generic 570 deck.
- [ ] CJK headline weight computes to 600.
- [ ] Body text remains at normal weight with even typographic color.
- [ ] Apparatus remains visibly subordinate but readable.

### Composition

- [ ] English measure is no wider than the appropriate 43–46rem role.
- [ ] Chinese measure is no wider than 50rem at the working body size.
- [ ] Justified text has no obvious rivers or isolated stretched lines.
- [ ] English hyphenation is present when needed and not repetitive.
- [ ] Chinese punctuation respects line-start and line-end constraints.
- [ ] Chinese paragraphs avoid isolated single-character final lines and
      conspicuous punctuation gaps.
- [ ] Mixed Chinese/Latin text preserves spacing, baseline, and full-width /
      half-width punctuation conventions.
- [ ] Final lines remain flush left.
- [ ] Paragraph rhythm is consistent across interactive reading modes.

### Alignment and responsiveness

- [ ] Every classification that remains uses `EditorialClassification`; labels
      that repeat the page title, navigation, or adjacent copy are removed.
- [ ] Number, title, and description rows share a real first baseline.
- [ ] Chronological catalogue rows do not repeat their order with ordinal
      numbers.
- [ ] Prospectus entries use title, scope, and metadata rather than decorative
      sequence numbers.
- [ ] Title-leaf relationships survive responsive collapse.
- [ ] Document horizontal overflow is zero.
- [ ] Long English headline words do not enlarge grid tracks.
- [ ] Internal map/table overflow remains contained within its own viewport.

### Semantics and interaction

- [ ] Actual reading regions expose `lang="en"` or `lang="zh-Hans"`.
- [ ] Tabs, filters, map/table modes, and reading-depth states still work.
- [ ] Focus indicators remain visible.
- [ ] Typography does not change control hit targets or state legibility.

## 13. Current implementation map

The provisional implementation currently lives in:

- `apps/storybook/stories/editorial-reading-prototype.css`
- `apps/storybook/stories/editorial-commandments-prototype.css`
- `apps/storybook/stories/EditorialReadingPrototype.tsx`
- `apps/storybook/stories/EditorialCommandmentsPrototype.tsx`
- `apps/storybook/stories/EditorialMdxReader.tsx`
- `apps/storybook/stories/EditorialPublicationPrototype.tsx`
- `apps/storybook/stories/editorial-publication-prototype.css`
- `packages/ui/src/components/EditorialClassification/`
- `packages/tokens/src/semantic/typography.json`
- `packages/tokens/src/semantic/spacing.json`

Current prototype variables:

```css
--reading-page-max: 90rem;
--reading-display: "Vollkorn Variable", var(--font-family-heading);
--reading-headline:
  "Newsreader Variable", "Source Serif 4", var(--font-family-heading);
--reading-cjk-headline:
  "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
```

The publication apparatus and its title relationship are now promoted as
semantic tokens. The remaining font-family, measure, and body-leading roles
should be promoted after they survive the same cross-surface review:

```css
--editorial-font-display-latin;
--editorial-font-headline-latin;
--editorial-font-headline-cjk;
--editorial-font-body-latin;
--editorial-font-body-cjk;
--editorial-font-apparatus;
--editorial-measure-body-latin;
--editorial-measure-body-cjk;
--editorial-leading-body-latin;
--editorial-leading-body-cjk;
```

Version 0.3 deliberately promotes only the relationship already proven across
an essay, a bilingual essay, a reference work, and the essay archive. It does
not prematurely freeze the remaining typeface experiments.
