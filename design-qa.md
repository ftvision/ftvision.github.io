# Editorial Home Prototype — Design QA

> **Evidence ledger, not specification.** This file preserves visual-review
> history, including rejected and superseded passes. The canonical current
> rules are `plan/docs/EDITORIAL_TYPOGRAPHY.md` and
> `plan/docs/EDITORIAL_RESPONSIVE_COMPOSITION.md`. When entries disagree, the
> newer dated correction and the canonical specifications take precedence.

## Modernist typography study — 2026-08-02

- Stories: `Explorations / Publication Systems / Modernist Typeface Study` and
  `System Lab`
- Candidates: Schibsted Grotesk, Archivo, Instrument Sans, and the rejected
  Arial Narrow baseline
- Controlled role: Source Serif 4 remained the Latin continuous-reading face;
  each candidate changed the display, supporting-headline, and apparatus roles
- Tested works: landing, Rejection Letter, Product Commandments, and 100 Vision
  Papers

### Decisions and comparison findings

- The initial Arial Narrow stack was rejected. Its compressed proportions,
  generic browser-era drawing, 800/700 weight pairing, and forced uppercase
  made Modernist look like a caricature of a poster rather than a publication
  system.
- Schibsted Grotesk is the current provisional default: display 650,
  supporting headline 520, and apparatus 620. Archivo remains the more
  mechanical alternative at 680/560/620; Instrument Sans remains the quieter
  contemporary alternative at 620/520/600.
- Authored title casing is preserved. Uppercase remains available to real
  classification and control apparatus rather than being imposed on every
  title and section heading.
- The typeface switch changes a complete role system—including family, role
  weights, title tracking, heading tracking, and display leading—not only one
  `font-family` value.
- Chinese is an independent role rather than a Latin fallback. Modernist
  Chinese title leaves use loaded Noto Sans SC Variable at 650; continuous
  Chinese reading remains Noto Serif SC with 1.92 leading.

### Responsive and functional evidence

- All three candidate webfonts and Noto Sans SC reported loaded through the
  browser font set; computed display and apparatus families changed with the
  Storybook selector.
- The type specimen and every Modernist work measured zero document overflow
  at 1440 x 900 and 390 x 844. The Product Commandments title was additionally
  checked at 320 px.
- The wider grotesks exposed a 55 px Product Commandments overflow at 390 px.
  The accepted correction uses a content-fit mobile title scale and a stable
  number/title plus deck composition instead of breaking the word
  `Commandments` or shrinking every Modernist title.
- Product Commandments was checked immediately around the 480, 832, and 1024
  px structural boundaries. Its title size remains continuous, its line group
  does not jump at 1024/1025 px, and overflow remains zero.
- Browser logs contained only Vite connection/HMR and React DevTools info;
  there were no warnings or errors from the typography implementation.

Result: Schibsted Grotesk is the provisional default for the comparison, not a
promoted production token. The Storybook study intentionally keeps Archivo,
Instrument Sans, and the rejected baseline visible for editorial selection.

## Fine Press / Modernist renderer comparison — 2026-08-02

- Stories: `Explorations / Publication Systems / System Lab` and the eight
  standalone Fine Press / Modernist work stories
- Systems: Fine Press and Modernist
- Real works: landing front table, Rejection Letter, Product Commandments, and
  100 Vision Papers
- Tested viewports: 1440 x 900 and 390 x 844
- Tested states: system/work resolution, English/Chinese, full/spine, atlas,
  searchable index, method, and local Modernist light/dark mode

### Architecture and content findings

- A token theme could not express the intended difference. Fine Press and
  Modernist therefore use independent renderers and CSS while sharing authored
  MDX, work identity, accessibility semantics, reading-depth capability, and
  Vision 100 data.
- Renderer resolution passed in the order `slug → presentation → kind →
fallback`. The Storybook system lab ended on Fine Press / Rejection Letter
  after traversing both systems and all work-specific states.
- Product Commandments preserved the complete English and Chinese MDX. Chinese
  full mode rendered ten commandment headings; Chinese spine preserved the
  opening and ten-part index; the actual reading region exposed
  `lang="zh-Hans"`.
- Rejection Letter preserved four authored sections and the documentary email.
  The evidence figure remained between the two MDX segments at its authored
  position after `The email`; no raw `XEmbed` or `ZoomableImage` component text
  leaked into the reading surface.
- Vision 100 used the complete 100-paper dataset and real map. The custom index
  returned nine papers for `Hubel`, matching author-name search rather than
  only first-author counting, and the method view exposed three source/limits
  sections.

### Typography and responsive evidence

- Fine Press remained on the established contract: Vollkorn 560 for the lead
  title and Newsreader 440 for the publication premise.
- Modernist used a separate grotesk display stack and Source Serif 4 for Latin
  continuous reading. Chinese continuous reading explicitly used Noto Serif SC
  and 1.92 leading rather than an accidental browser fallback.
- Document horizontal overflow measured zero for all four Modernist works at
  the inspected 1440 px and 390 px states. At 390 px, the Rejection Letter body
  and deck both occupied the deliberate 358 px content frame; Vision 100 method
  retained all three sections; Chinese full mode retained all ten headings.
- The Modernist dark control changed only the renderer root to dark mode
  (`rgb(20, 20, 20)` paper / `rgb(242, 239, 229)` ink); the document theme
  remained light, confirming system-local mode isolation.

### Functional validation

- The Storybook `SystemLab` interaction completed in a fresh browser tab with
  no console warnings or errors.
- TypeScript, targeted ESLint, Prettier for new implementation files,
  Storybook production build, and `git diff --check` passed.
- Storybook build retained existing repository warnings about ignored
  module-level `use client` directives and large chunks; neither originated in
  this renderer comparison.

Final result: passed as a Storybook architecture and visual comparison;
production system selection remains intentionally staged.

## Landing tonal-hierarchy correction — 2026-07-18

- Story: `Explorations / Editorial Home / Fine Press`
- Source visual truth:
  `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-313f85cc-5809-4ecf-8eb4-eda76e0c87ba.png`
- Final desktop implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-tonal-hierarchy/after-1440.png`
- Final mobile implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-tonal-hierarchy/after-390.png`
- Tested state: light theme, dark theme, and return to light
- Tested viewports: 1440 x 900 and 390 x 844

### Comparison history and findings

- **P2 — scale hierarchy existed without tonal hierarchy:** the source showed
  the publication premise at Newsreader 570, lead title at Vollkorn 560, and
  article deck at Newsreader 570. All three layers had nearly the same dark
  page color, so the premise and deck behaved like additional headlines. Fix:
  keep the lead title unchanged as the sole dark anchor; reduce the premise to
  Newsreader 440 at a smaller scale with 1.18 leading, and reduce the deck to
  Newsreader 450 with 1.45 leading.
- Post-fix full-view comparison shows the premise receding into an introductory
  voice and the deck becoming readable supporting copy while the lead title
  retains its established mass and blue italic emphasis. No actionable P0,
  P1, or P2 issue remains.

### Required fidelity surfaces

- Fonts and typography: all three established families remain unchanged. At
  1440 px the premise computes to 32.4 px / 440 and the deck to 23.76 px / 450;
  at 390 px they compute to 23.2 px / 440 and 20 px / 450 respectively. The
  Vollkorn title remains 560.
- Spacing and layout rhythm: grid tracks, section spacing, text measures, and
  the lead title's line formation are unchanged. More open supporting leading
  reduces density without changing composition.
- Colors and tokens: paper, ink, accent, rule, and focus colors are unchanged.
- Image quality and assets: not applicable; the opening contains no image
  assets.
- Copy and content: unchanged.

### Functional and responsive QA

- Source and desktop implementation were inspected together in one comparison
  input; the mobile implementation was inspected separately at native size.
- Document horizontal overflow is zero at both 1440 px and 390 px.
- At 390 px the premise, title, deck, link, and date remain inside the 358 px
  content frame with no clipped glyphs.
- Theme control passed Light to Dark and back to Light.
- Browser console contains no warnings or errors from the story.
- Storybook production build, Prettier, and `git diff --check` passed.

Final result: passed

## Landing premise and imprint separation — 2026-07-18

- Story: `Explorations / Editorial Home / Fine Press`
- The opening identity statement is now a publication premise: `Writings on
intelligent systems, product judgment, and the work of building.` It tells
  readers what the publication contains without repeating the author credit.
- The closing publisher note is now an imprint: `Algo Mind is an independent
publication by Feitong Yang. The views expressed here are my own.` It states
  authorship and independence without repeating the subject list or About-page
  biography.
- Typography, layout, links, colors, and responsive composition are unchanged.
- Story assertions, Storybook production build, Prettier, and
  `git diff --check` passed.

Final result: passed

## Landing publisher-note type correction — 2026-07-18

- Story: `Explorations / Editorial Home / Fine Press`
- Source visual truth:
  `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-bc97c471-5fd0-4c3d-8f91-85744dade11c.png`
- Pre-change implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-publisher-note/before-1440.png`
- Final desktop implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-publisher-note/after-1440.png`
- Final mobile implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-publisher-note/after-390.png`
- Tested state: light theme; publisher note and About link in view
- Tested viewports: 1440 x 900 and 390 x 844

### Finding and correction

- **P2 — the enlarged Source Serif paragraph looked loose and generic:** its
  body-text texture did not support the more deliberate Vollkorn/Newsreader
  hierarchy above it. Fix: treat this short publisher note as a supporting
  statement in Newsreader 520 with optical size 48, slightly tightened
  tracking, balanced wrapping, and a quiet 1.4 line height. It remains a
  supporting layer through its smaller scale, measure, and page position and
  does not compete with the lead titles.

### Required fidelity surfaces

- Fonts and typography: Source Serif changed to Newsreader only for the short
  publisher statement; its computed desktop size is 26.64 px and its mobile
  size is 21.6 px.
- Spacing and layout rhythm: the section frame, rule, link, and surrounding
  spacing are unchanged; only the statement's internal line formation changed.
- Colors and tokens: unchanged.
- Image quality and assets: not applicable; this region has no image assets.
- Copy and content: unchanged.

### Functional and responsive QA

- Source, pre-change, desktop final, and mobile final captures were compared
  for type color, line formation, and hierarchy.
- Document horizontal overflow is zero at both tested widths.
- At 390 px the statement remains within the 358 px content frame and wraps
  without clipped glyphs or orphaned overflow.
- The About link and all interactions are unchanged.
- Storybook production build, Prettier check, and `git diff --check` passed.

Final result: passed

## Landing front-table system synchronization — 2026-07-18

- Story: `Explorations / Editorial Home / Fine Press`
- Source visual truth: the synchronized Essays catalogue and Series prospectus
  captures in
  `/Users/planeyang/.codex/visualizations/2026/07/18/publication-pages-system/`
- Pre-change implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-system-sync/landing-before-1440.png`
- Final desktop implementation:
  `/Users/planeyang/.codex/visualizations/2026/07/18/landing-system-sync/landing-after-1440.png`
- Final mobile evidence: `landing-after-390-fold.png`,
  `landing-after-390-essays.png`, and `landing-after-390-series.png` in the
  same directory
- Tested state: light theme, dark theme, and return to light
- Tested widths: 390, 640, 800, 801, 831, 832, 833, 1024, and 1440 px

### Findings and comparison history

- **P2 — the homepage still used Newsreader as both display and supporting
  face:** this contradicted the type roles established on Essays, Series, and
  About. Fix: Vollkorn 560 now owns the lead title, Essays display, and Vision
  Papers title; Newsreader 570/580 owns the publication premise, navigation,
  decks, row titles, and metadata values; Source Serif owns descriptions and
  the publisher note.
- **P2 — structural copy repeated information already carried by the page:**
  the lead had a second generic note, Essays explained that it was a selected
  front table, and `Browse both series` promoted an inventory count. Fix:
  remove the lead note and section explanation; the only archive-routing copy
  is now `All essays` and `All series`.
- **P2 — the publisher line retained rejected framing:** the landing described
  machine and human intelligence as `the same project`. Fix: replace it with a
  factual statement about essays drawing on AI-building practice and a
  cognitive-psychology background; link directly to `About Feitong Yang`.

### Full-view and focused comparison evidence

- Desktop before/after captures were inspected together for title rhythm,
  section hierarchy, rules, and alignment with the publication pages.
- Mobile focused captures inspected the lead fold, complete Essays selection,
  Series title/metadata, and About transition independently.
- The numeral `100` remains because it is part of the authored series title,
  not a generated ordering or aggregate inventory label.

### Required fidelity surfaces

- Fonts and typography: computed lead title is Vollkorn Variable at weight 560;
  deck is Newsreader Variable at 570; row descriptions are Source Serif 4.
- Spacing and layout rhythm: the lead remains a spread at wide widths and a
  stacked edition below the content-fit breakpoint. Essays now has a clean
  title/link header; its rows and Series metadata retain their ledger rules.
- Colors and tokens: the existing paper, ink, rule, accent, secondary, and
  focus tokens remain unchanged.
- Image quality and assets: not applicable; the front table remains complete
  without decorative imagery.
- Copy and content: article and series descriptions remain intact. Only
  redundant structural prose and the rejected publisher framing changed.

### Functional and responsive QA

- Document horizontal overflow is zero at every tested width.
- At 390 px, masthead navigation, lead, Essays rows, Series metadata, and About
  copy all remain inside the 358 px content frame.
- Theme control passed Light to Dark and back to Light; the rendered background
  changed from `rgb(247, 247, 245)` to `rgb(39, 39, 42)` and back.
- Story assertions verify that the old structural explanation and rejected
  publisher framing are absent and that `All series` is visible.
- Storybook production build and `git diff --check` passed.

Final result: passed

## Essays catalogue and Series prospectus system pass — 2026-07-18

- Stories: `Explorations / Editorial Publication Pages / Essays Catalogue` and
  `Series Prospectus`
- Source visual truth: the established About system at
  `/Users/planeyang/.codex/visualizations/2026/07/18/publication-pages-system/about-source-1440.png`
  and `about-source-390.png`, plus the pre-change page captures
  `essays-before-1440.png`, `essays-before-390.png`,
  `series-before-1440.png`, and `series-before-390.png` in the same directory
- Final implementation screenshots:
  `essays-after-1440-final.png`, `essays-after-390-final.png`,
  `series-after-1440-final.png`, and `series-after-390-final.png` in
  `/Users/planeyang/.codex/visualizations/2026/07/18/publication-pages-system/`
- Tested state: light theme; catalogue and prospectus default states
- Tested viewports: 390, 640, 800, 801, 831, 832, 833, 1023, 1024, 1025,
  1087, 1088, 1089, and 1440 px wide

### Findings and comparison history

- **P2 — redundant sequence numbers competed with real publication order:**
  Essays repeated chronology with generated `01–09` numbers even though year
  and date already established order. Series likewise presented two unrelated
  reference collections as `01 / 02`. Fix: remove both number systems. Essays
  is now ordered by year/date; each Series entry is identified by its title,
  scope, extent, coverage, and first-publication date.
- **P2 — narrow catalogue rows gave four elements one line:** at 390 px the
  old number/title/date grid reduced titles and descriptions to a narrow text
  strip and visually collided dates with titles. Fix: catalogue rows now use a
  title/date row followed by a full-measure description. At 390 px the first
  title is 291.13 px wide, its date is 54.88 px wide, and a 12 px gap remains;
  document overflow is zero.
- **P2 — the first redesign imposed empty hero height rather than inheriting
  About's content-led opening:** the initial implementation used a fixed fluid
  minimum height, leaving the short Essays and Series decks stranded in a large
  field. Fix: remove the minimum height and align title/deck at the top. The
  page opening is now governed by content and the shared bottom padding/rule.

### Full-view and focused comparison evidence

- Full-view source and implementation screenshots were inspected together for
  hierarchy, page rhythm, rules, and the Vollkorn/Newsreader role split.
- Focused catalogue evidence used the rendered first row at each responsive
  boundary: title/date remain separate at 390–1088 px and the three-column
  title/description/date ledger activates at 1089 px.
- Focused Series evidence used the first prospectus entry: it is one column
  through 1024 px and becomes a 933.8 / 354.2 px body/metadata spread at
  1440 px. The title and metadata tracks remain within the viewport.

### Required fidelity surfaces

- Fonts and typography: Vollkorn Variable at weight 560 owns monumental page
  and series titles; Newsreader Variable owns decks and row headings; Source
  Serif 4 owns explanatory prose; mono remains limited to years, dates, and
  genuine metadata.
- Spacing and layout rhythm: both pages inherit the About title/deck opening,
  shared outer frame, rules, and folio. Catalogue rows share one ledger;
  prospectus entries share one two-track spread.
- Colors and tokens: existing paper, ink, secondary, rule, accent, and focus
  tokens are unchanged.
- Image quality and assets: not applicable; neither page uses image assets or
  custom icons.
- Copy and content: all essay and series descriptions remain. Only aggregate
  counts and generated sequence labels were removed.

### Functional and responsive QA

- Navigation passed Essays → Series → Essays; the theme control passed Light →
  Dark and was restored to Light.
- Links retain visible hover/focus states and keyboard focus outlines.
- No horizontal overflow at any tested width.
- The catalogue structural boundaries at 832/833 px and 1088/1089 px keep a
  continuous title scale and viable text measures.
- Browser console reported no warnings or errors.
- Storybook production build and `git diff --check` passed.

final result: passed

## About: section-deck subtraction — 2026-07-18

- Story: `Explorations / Editorial Publication Pages / About Vollkorn Pairing`
- Source visual truth: `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-00210d4c-aefd-4eca-95b0-e1900fe33b27.png` and `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-e058ebff-d683-47c3-8692-6682e751f55e.png`
- Corrected Experience: `/Users/planeyang/.codex/visualizations/2026/07/18/about-section-deck-subtraction/experience-no-deck-1440.png`
- Corrected Education: `/Users/planeyang/.codex/visualizations/2026/07/18/about-section-deck-subtraction/education-no-deck-1440.png`
- Mobile evidence: `/Users/planeyang/.codex/visualizations/2026/07/18/about-section-deck-subtraction/education-no-deck-390.png`
- Tested state: light theme; Experience and Education section entries closed
- Tested viewports: 1440 × 900 desktop and 390 × 844 mobile

### Findings and comparison history

- **P2 — low-information decks created unresolved whitespace:** Experience and
  Education each placed a generic one-line deck in a separate two-column header
  grid above a three-column ledger. The deck aligned to none of the ledger's
  vertical axes, so the full-measure rule made the remaining right-side space
  look accidental. Fix: remove both generic decks. The section title now owns
  the spread and the full-measure rule connects directly to the aligned ledger.
  The meaningful quotation beside Resume of failures remains.

### Required fidelity surfaces

- Fonts and typography: all established typeface roles and scales are
  unchanged; only redundant deck copy was removed.
- Spacing and layout rhythm: title, full-measure rule, and ledger retain their
  existing positions. Empty space is now anchored by the title rather than a
  stranded short text block.
- Colors and tokens: unchanged.
- Image quality and assets: not applicable; this page has no image assets.
- Copy and content: two inferable section summaries were removed. All CV data
  and the narratively meaningful failure quotation remain.

### Functional and responsive QA

- Experience and Education headers each contain only their `h2`.
- No horizontal overflow at 1440 px or 390 px.
- Desktop and mobile source/implementation captures were inspected together.
- The optional-deck rule is codified in `plan/docs/EDITORIAL_TYPOGRAPHY.md`.

Final result: passed

## About: disclosure and cross-section alignment — 2026-07-18

- Story: `Explorations / Editorial Publication Pages / About Vollkorn Pairing`
- Source visual truth: `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-903a5849-a10a-4041-8262-618245796bf8.png`
- Pre-fix implementation: `/Users/planeyang/.codex/visualizations/2026/07/18/about-disclosure-alignment/before-596.png`
- Corrected closed and open states: `/Users/planeyang/.codex/visualizations/2026/07/18/about-disclosure-alignment/after-closed-596.png` and `after-open-596.png`
- Cross-section evidence: `academic-aligned-1280.png` and `failures-aligned-1280.png` in the same directory
- Tested state: light theme; Experience closed/open; Teaching open; Job applications open
- Tested viewports: 596 × 400 compact and 1280 × 720 desktop

### Findings and comparison history

- **P2 — the Experience disclosure marker looked detached and
  unprofessional:** The native triangle occupied a separate 32 × 35 px control
  below the role on compact layouts and floated in the third grid track on
  wider layouts. It neither aligned with the title nor made the whole record an
  obvious target. Fix: the complete date/role/employer row is now the native
  `summary`; browser markers are removed. Hover and focus shift the title and
  date to the publication accent, and keyboard focus adds a restrained bottom
  rule. The full row is clickable.
- **P2 — record columns drifted between sections:** Experience, Education,
  Teaching, and Resume of failures used three different column definitions, so
  dates, titles, and descriptions started at inconsistent x positions. Fix:
  all record families now consume one shared three-track grid and gap. At 1280
  px, every first track begins at 40 px, every title track at 247.38 px, and
  every description/result track at 654.31 px. Academic and failure disclosure
  headings also begin at the common 40 px page edge.

### Required fidelity surfaces

- Fonts and typography: unchanged Vollkorn, Newsreader, Source Serif, and mono
  apparatus roles; only interaction color state changed.
- Spacing and layout rhythm: one shared record grid now governs Experience,
  Education, Teaching, and Failures. Compact layouts collapse every record to
  the same one-column sequence.
- Colors and tokens: hover/open focus feedback uses the existing publication
  accent and focus tokens; no new color was introduced.
- Image quality and assets: not applicable; no image or icon asset remains in
  the disclosure treatment.
- Copy and content: unchanged.

### Functional and responsive QA

- The Experience summary has no rendered marker (`::marker` content is empty)
  and occupies the full 564 px row at the 596 px viewport.
- The interaction story opens Founding Engineer and Publications successfully.
- Closed, open, hover/focus CSS, and keyboard-focus styling remain distinct.
- No horizontal overflow at 596 px or 1280 px.
- Source crop, compact before/after captures, and both desktop section captures
  were inspected together.

Final result: passed

## About: date apparatus legibility — 2026-07-18

- Story: `Explorations / Editorial Publication Pages / About Vollkorn Pairing`
- Source visual truth: `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-850552cc-5b1c-4b29-ad26-810947961daa.png`
- Pre-fix implementation: `/Users/planeyang/.codex/visualizations/2026/07/18/about-date-apparatus/date-before-1280.png`
- Corrected desktop implementation: `/Users/planeyang/.codex/visualizations/2026/07/18/about-date-apparatus/date-after-1280.png`
- Corrected mobile implementation: `/Users/planeyang/.codex/visualizations/2026/07/18/about-date-apparatus/date-after-375.png`
- Tested state: light theme; `Academic background` in view; `Teaching` expanded
- Tested viewports: 1280 × 720 desktop and 375 × 667 mobile

### Findings and comparison history

- **P2 — dates fell below the readable secondary hierarchy:** The shared date
  role used muted color, a 10.56 px desktop size, regular weight, and wide
  `0.06em` tracking. In the supplied Teaching crop and the pre-fix browser
  capture, dates read as incidental footnotes rather than useful scan anchors.
  Fix: promote the shared Experience, Education, Academic background, and
  Failure date role to semantic secondary color, 12.16–13.44 px responsive
  sizing, weight 500, and tighter `0.035em` tracking. Post-fix evidence shows a
  legible but still subordinate monospace apparatus beside Newsreader titles.

### Required fidelity surfaces

- Fonts and typography: the mono apparatus family is unchanged; only its
  optical size, weight, tracking, and semantic color were corrected. Vollkorn,
  Newsreader, and Source Serif roles are unchanged.
- Spacing and layout rhythm: the three-track desktop grid and mobile stack are
  unchanged; the larger date remains within its existing track.
- Colors and tokens: dates now use the existing secondary-text token rather
  than introducing a new color.
- Image quality and assets: not applicable; the page has no image assets.
- Copy and content: unchanged.

### Functional and responsive QA

- Desktop computed date style: 13.44 px, weight 500, 0.4704 px tracking.
- Mobile computed date style: 12.16 px, weight 500, 0.4256 px tracking.
- No horizontal overflow at 1280 px or 375 px.
- The Teaching disclosure remained operable after the shared style change.
- Full-view comparison was used to verify hierarchy and grid fit; the supplied
  crop and visible first Teaching row provided the focused typography evidence.

Final result: passed

## About: editorial subtraction pass — 2026-07-18

- Story: `Explorations / Editorial Publication Pages / About Vollkorn Pairing`
- Source visual truth: the four user captures at `codex-clipboard-242cddd9-6ffe-4976-91a7-36d1c0533318.png`, `codex-clipboard-ce51b0ba-d35c-447f-b94a-460259503555.png`, `codex-clipboard-9eaa1389-d955-4bfd-880c-c91b26f7c709.png`, and `codex-clipboard-c0acdfb4-4116-4eb8-a3af-1dde2c93ad3b.png`
- Folded Experience: `/Users/planeyang/.codex/visualizations/2026/07/18/about-subtraction-pass/experience-clean-1280.png`
- Folded Academic background: `/Users/planeyang/.codex/visualizations/2026/07/18/about-subtraction-pass/academic-background-clean-1280.png`
- Expanded Publications: `/Users/planeyang/.codex/visualizations/2026/07/18/about-subtraction-pass/publications-clean-open-1280.png`
- Clean failure groups: `/Users/planeyang/.codex/visualizations/2026/07/18/about-subtraction-pass/failures-clean-1280.png`
- Mobile evidence: `experience-clean-375.png`, `academic-background-clean-375.png`, and `failures-clean-375.png` in the same directory
- Tested state: light theme; 1280 × 720 desktop and 375 × 667 mobile

### Findings and comparison history

- **P2 — disclosure apparatus outweighed the content:** Experience repeated
  `Responsibilities` and a note count on every row. Fix: the visible summary is
  now the complete date/role/employer row; a visually hidden role-specific label
  preserves its accessible name. Post-fix evidence shows the role and employer
  remain primary while hover and focus carry the optional-detail cue.
- **P2 — academic record was fragmented and over-counted:** Research and
  Teaching were separate major sections, each academic group carried an entry
  count, and citations added ornamental sequence numbers. Fix: Research,
  Publications, Talks, Posters, Grants and awards, and Teaching now live under
  one `Academic background` section. All counts and generated citation numbers
  are removed. Post-fix evidence shows six baseline-aligned disclosure rows.
- **P2 — failure disclosures used unnecessary metadata:** the failure groups
  repeated counts even though the category names already communicate their
  purpose. Fix: counts removed; the existing quiet ruled-list treatment is
  retained.

### Required fidelity surfaces

- Fonts and typography: unchanged Vollkorn display, Newsreader supporting
  hierarchy, Source Serif 4 reading text, and monospace dates.
- Spacing and layout rhythm: Experience retains its three-track desktop grid;
  academic summaries and failure summaries share the same page edge. Mobile
  uses one full-width disclosure row with no detached marker.
- Colors and tokens: unchanged semantic paper, ink, rule, muted, and accent
  colors.
- Image quality and assets: not applicable; this page has no image assets.
- Copy and content: no CV content was removed. Only redundant UI labels,
  quantities, and generated sequence numbers were deleted; Teaching moved into
  Academic background.

### Functional and responsive QA

- Default state: all 5 Experience disclosures, 6 Academic background groups,
  and 3 Resume of failures groups are closed.
- Interaction story opens the Founding Engineer detail and Publications; the
  rendered state reports one Experience and one academic disclosure open.
- No visible `notes` or `entries` labels remain, and publication `::before`
  content computes to `none`.
- No horizontal overflow at 1280 px or 375 px.
- Browser console reported no warnings or errors.
- Storybook production build and `git diff --check` passed.

Final result: passed

## About: Vollkorn + Newsreader pairing — 2026-07-18

- Source visual truth: `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-5c509c94-becd-40c6-b9a5-84eea955351f.png` and `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-b733e76c-8aa6-4bb0-ab83-e1a9d14e0591.png`
- Corrected desktop implementation: `/Users/planeyang/.codex/visualizations/2026/07/18/about-vollkorn-scale-correction/about-vollkorn-1280.png`
- Focused section evidence: `/Users/planeyang/.codex/visualizations/2026/07/18/about-vollkorn-scale-correction/about-vollkorn-top-1200.png`
- Storybook mobile preset: `/Users/planeyang/.codex/visualizations/2026/07/18/about-vollkorn-scale-correction/about-vollkorn-mobile-375-manager.png`
- Story: `Explorations / Editorial Publication Pages / About Vollkorn Pairing`
- Tested state: light theme, About title leaf and Experience section
- Tested viewports: 1280 × 720 desktop and Storybook's 375 × 667 mobile canvas

### Typeface contract

This is a role pairing, not a global font replacement. Vollkorn Variable owns
only the monumental display layer: `About` and the major biographical section
headings. Newsreader Variable owns supporting editorial hierarchy: navigation,
the contents strip, professional roles, compact research headings, disclosure
summaries, and Elsewhere links. Source Serif 4 remains the continuous-reading
face. Dates and counts remain monospace apparatus.

| Rendered role     | Computed result                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| `About`           | Vollkorn Variable, 560, 163.84 px, 124.52 px leading, -10.65 px tracking |
| `Experience`      | Vollkorn Variable, 560, 81.92 px, 75.37 px leading, -3.28 px tracking    |
| Numeric hierarchy | `About / Experience = 2.0`, identical to the Newsreader comparison story |

All three editorial font files reported loaded in the rendered story. The
two user captures and the corrected implementation were inspected together.

### Comparison history

- **P2 — inconsistent display hierarchy:** the first Vollkorn candidate added a
  title-only `9.4vw` override. At desktop this reduced the numeric
  `About / Experience` ratio from the base system's `2.0` to `1.47`; at the
  mobile breakpoint its higher selector specificity also overrode the shared
  responsive title rule.
- **Fix:** removed the Vollkorn-specific size, tracking, and leading block. Both
  stories now use the same title and section scale; the candidate changes only
  the display family.
- **Post-fix evidence:** at 1280 px, both stories compute `About = 163.84px` and
  `Experience = 81.92px`. The corrected desktop and focused section captures
  show the restored two-level hierarchy.

### Required fidelity surfaces

- Fonts and typography: corrected; family is the only comparison variable and
  title/section size ratio is identical between stories.
- Spacing and layout rhythm: unchanged from the existing About composition.
- Colors and tokens: unchanged semantic paper, ink, rule, and accent tokens.
- Image quality and assets: not applicable; this page contains no image assets.
- Copy and content: unchanged by this correction.

### Functional and responsive QA

- The existing `About Colophon` story remains available for direct comparison.
- The new story adds the pairing through one explicit `typefacePairing` prop.
- Theme control passed Dark → Light → Dark reset behavior.
- The Experience contents link lands its section heading at the top edge.
- The Job applications disclosure expands successfully.
- The 375 px Storybook canvas switches to the mobile single-column composition;
  the title, prose, and navigation remain within the canvas width.
- Browser console reported no warnings or errors.
- Storybook production build and `git diff --check` passed.

Final result: passed

## About as a complete biographical record — 2026-07-18

> **Current for content completeness; superseded for display typography.** The
> later `About: Vollkorn + Newsreader pairing` entry replaces the Newsreader
> monumental-title assignment recorded in this pass.

- Content source of truth: `apps/blog/components/about/aboutData.ts`
- Rejected composition: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-landing-about/apparatus-reduction/about-reduced-1440-viewport.png`
- Corrected first viewport: `/Users/planeyang/.codex/visualizations/2026/07/18/about-record-redesign/about-desktop-1440.png`
- Corrected complete page: `/Users/planeyang/.codex/visualizations/2026/07/18/about-record-redesign/about-full-1440.png`
- Expanded failures evidence: `/Users/planeyang/.codex/visualizations/2026/07/18/about-record-redesign/about-failures-open-1440.png`
- Mobile evidence: `/Users/planeyang/.codex/visualizations/2026/07/18/about-record-redesign/about-mobile-390.png`
- Viewports: 1440 × 1024 desktop and 390 × 844 mobile

### Correction

The previous pass invented `The same project` and `A parallel record` as document sections, then reduced the repository's complete biography to a selected record. That changed the page's meaning and omitted real material. The corrected page restores the user's complete introduction without promoting either phrase into a section concept. The user's line about success and failure is set as an italic quotation introducing `Resume of failures`; it is no longer rewritten into a section concept.

The page now renders the full English record from the repository data: five professional positions, four degrees, three research experiences, three publications, two talks, five posters, six grants and awards, nine teaching entries, 24 failed job applications, eight failed education applications, and four rejected publications or fellowships. Failure categories are native expandable sections so the data remains complete without making the page unnavigable.

### Typographic conformance

| Role                                | Implementation                                                                           | Result |
| ----------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| Monumental title and major sections | Newsreader Variable, weight 560, optical sizing, normative negative tracking and leading | Passed |
| Compact record headings             | Newsreader Variable, weight 580, first-baseline row alignment                            | Passed |
| Continuous and supporting text      | Source Serif 4, weight 400, bounded measure and language-appropriate line composition    | Passed |
| Title-leaf introduction             | Ragged right with `text-wrap: pretty`; no forced justification or hyphenation            | Passed |
| Dates, counts, and folio            | Existing monospace apparatus role; no decorative eyebrow labels                          | Passed |

### Functional and responsive QA

- About contents navigation exposes Experience, Education, Research, Teaching, Resume of failures, and Elsewhere.
- The `Resume of failures` anchor leaves sufficient scroll clearance for the full heading.
- Job applications disclosure expands and exposes the complete 24-entry record.
- Theme control changes Dark to Light and resets successfully.
- No horizontal overflow at 390 px; document width and viewport width both measure 390 px.
- Storybook production build passed.
- Browser console contains no warning or error entries.
- The rejected and corrected first viewports, expanded-failures state, and mobile state were inspected together.

Final result: passed.

## Editorial apparatus reduction — 2026-07-18

> **Superseded content pass.** The subtraction principle remains current, but
> the later landing premise/imprint entries restore one concise publisher
> statement because it carries independent publication and responsibility
> information rather than decorative classification.

- Reference crops: `codex-clipboard-79c95434-003e-45b4-bae1-19995d942517.png`, `codex-clipboard-68183476-260d-4b98-a7b5-ec8e4233112f.png`, `codex-clipboard-c6b495fd-c35a-4464-ae38-aec08c765655.png`, and `codex-clipboard-44e4d1e4-b128-4e4c-bc9b-d4468c01b219.png`
- Final landing viewport: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-landing-about/apparatus-reduction/landing-reduced-1440-viewport.png`
- Final About viewport: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-landing-about/apparatus-reduction/about-reduced-1440-viewport.png`
- Mobile evidence: `landing-reduced-390.png` and `about-reduced-390.png` in the same directory
- Viewports: 1440 px desktop and 390 px mobile

### Reduction rule

The first viewport now spends no editorial-apparatus budget on information already supplied by navigation, title, authorship, or adjacent copy. Landing removes `Independent publication`, the duplicate `Essays · Series · About` line, the profession summary, `New essay`, `Recently published`, and the Series classification pair. About removes `Colophon`, `Author & publisher`, and `Feitong Yang` from the title leaf. Meaningful document divisions such as `The same project` and `Selected record` are expressed as Newsreader `h2` headings rather than blue uppercase metadata.

The reusable rule is codified in `plan/docs/EDITORIAL_TYPOGRAPHY.md`: a title leaf may have at most one optional classification row and two labels, and every label must add an independent information axis that cannot be inferred locally.

### Comparison and browser QA

| Check                                        | Result                                                                                                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing reference crop versus final viewport | Repeated publication and navigation labels removed; author proposition and lead essay now establish hierarchy directly                               |
| About reference crop versus final viewport   | Three redundant labels removed; `About` and the first-person introduction carry the title leaf                                                       |
| Semantic structure                           | About continuation uses six real headings: `About`, `The same project`, `Selected record`, `Selected research`, `A parallel record`, and `Elsewhere` |
| Desktop and mobile overflow                  | None at 1440 px or 390 px on Landing or About                                                                                                        |
| Theme control                                | Dark to Light and reset passed                                                                                                                       |
| Connected navigation                         | About to Essays to Series to About passed                                                                                                            |
| Browser diagnostics                          | Vite debug and React DevTools info only; no warning or error entries                                                                                 |
| Storybook production build                   | Passed                                                                                                                                               |
| Diff whitespace check                        | Passed                                                                                                                                               |

Final result: passed.

## Legacy fine-press homepage baseline — superseded

> This block records the first accepted direction and its original Source Serif
> display treatment. Later landing, publication-page, and Vollkorn/Newsreader
> entries replace its typography and inventory details.

- Source visual truth: `/Users/planeyang/.codex/generated_images/019f5a27-7f1c-7701-9939-2f78da3f083d/exec-1a9f33b7-bad4-4388-9045-4bf5bce3e23d.png`
- Implementation URL: `http://localhost:6006/iframe.html?id=explorations-editorial-home--fine-press&viewMode=story`
- Desktop implementation screenshot: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-desktop-viewport.png`
- Full-page implementation screenshot: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-desktop.png`
- Mobile implementation screenshot: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-mobile.png`
- Combined comparison: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-comparison.png`
- Viewports: 1440 × 1024 desktop; 390 × 844 mobile
- State: light theme; dark-theme toggle interaction also exercised

## Scope and source truth

The earlier accepted visual is the source for the masthead, author identity, lead story, typography hierarchy, rule treatment, and first-viewport balance. The catalogue below the lead is a deliberate extension requested after the source was accepted: it applies the same fine-press grammar to all nine published English essays. It does not introduce issues, volumes, fake departments, cards, cover art, or additional generated imagery.

## Comparison evidence

The source and 1440 × 1024 implementation were normalized and inspected together in `editorial-home-comparison.png`. The full desktop and mobile captures were also inspected at original size.

Focused crops were not required: the hero typography, masthead, catalogue heading, first catalogue row, dates, and rules are readable in the original-size captures. The full-page image provides the additional evidence for the complete catalogue rhythm.

### Fidelity ledger

| Surface                | Source evidence                                                            | Rendered evidence                                                                                        | Result                |
| ---------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| Copy and hierarchy     | Masthead, two-line identity, one dominant essay title, deck, date          | Same first-viewport copy and order; `Essays` begins below the lead                                       | Passed                |
| Typography             | High-contrast editorial serif with italic emphasis and mono-like metadata  | Source Serif 4 display face, italic `Rejection`, serif body, mono dates and indices                      | Passed                |
| Layout rhythm          | Wide page margins, asymmetric lead, horizontal rules, large negative space | Same open-page container model; catalogue continues with year margin and ruled rows                      | Passed                |
| Palette and tokens     | Near-white paper, dark ink, restrained colored metadata                    | Existing semantic surface/text/border/accent tokens; no gradients or image tint                          | Passed                |
| Image treatment        | Imagery is non-essential; one tiny cover appeared in the earlier direction | No imagery in the code-first extension, per the user's instruction                                       | Intentional deviation |
| Catalogue completeness | Earlier source showed only three secondary titles                          | Lead plus eight remaining published English essays, grouped by real publication year                     | Passed extension      |
| Responsive behavior    | Desktop source only                                                        | 390 px layout preserves title hierarchy, readable dates, rules, and all rows with no horizontal overflow | Passed                |
| Motion and interaction | Static editorial composition                                               | No background animation; theme control changes `data-mode` and its label                                 | Passed                |

Above-the-fold copy diff: no unapproved hero copy was added, removed, renamed, or reordered. The `Essays / 09 published` catalogue heading is the requested below-the-fold extension.

## Comparison history

### Pass 1

- P1: Only three secondary essays were visible, making the site look like it had four pieces total.
- Fix: Replaced the three-column teaser strip with a complete eight-row backlist under the lead article.
- Post-fix evidence: `editorial-home-desktop.png` and `editorial-home-mobile.png` show all nine published English essays.
- P2: Georgia made the lead display title materially heavier and less refined than the accepted fine-press direction.
- Fix: Applied the already-loaded Source Serif 4 face to display headings and essay titles while retaining semantic theme fonts for body and UI text.
- Post-fix evidence: `editorial-home-comparison.png` shows a closer stroke contrast and italic character.

### Pass 2

No actionable P0, P1, or P2 mismatch remained. The catalogue is intentionally a new continuation rather than a pixel-matched part of the earlier first-screen source.

## Functional and browser QA

- Page identity and meaningful content: passed.
- Framework overlay: none.
- Catalogue rows: eight below the lead; years present: 2026, 2023, 2017.
- Horizontal overflow: none at desktop or mobile viewport.
- Theme interaction: `Dark` changes the document mode to `dark` and the control label to `Light`; reset to light also passed.
- Page errors: none.
- Console: one non-app 404 for Storybook's `/favicon.ico`; no failed content response and no runtime error.
- Browser path: the Browser plugin initialization failed with `Cannot redefine property: process`; the user allowed Playwright fallback. Playwright 1.57 used installed Chrome because the bundled Playwright Chromium executable was not present.

## Remaining intentional deviations

- The earlier source's tiny cover thumbnail and arrows are omitted because this version is explicitly code-first and image-free.
- The source used `EN` and a moon icon; the prototype retains the repo's bilingual `中文` link and text theme control so both behaviors remain explicit and testable.

## Publication pages extension — legacy baseline

> The page-role decisions remain useful evidence. Later catalogue, prospectus,
> About, and Vollkorn/Newsreader entries supersede the numbered inventory and
> Source Serif display treatment recorded here.

- Shared visual source: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-desktop-viewport.png`
- Essays URL: `http://localhost:6006/iframe.html?id=explorations-editorial-publication-pages--essays-catalogue&viewMode=story`
- Series URL: `http://localhost:6006/iframe.html?id=explorations-editorial-publication-pages--series-prospectus&viewMode=story`
- About URL: `http://localhost:6006/iframe.html?id=explorations-editorial-publication-pages--about-colophon&viewMode=story`
- Desktop screenshots: `editorial-essays-desktop.png`, `editorial-series-desktop.png`, `editorial-about-desktop.png`
- Desktop viewport screenshots: `editorial-essays-desktop-viewport.png`, `editorial-series-desktop-viewport.png`, `editorial-about-desktop-viewport.png`
- Mobile screenshots: `editorial-essays-mobile.png`, `editorial-series-mobile.png`, `editorial-about-mobile.png`
- Four-page comparison: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-publication-comparison.png`
- Viewports: 1440 × 1024 desktop; 390 × 844 mobile

### Page grammar

The accepted homepage is the shared house style rather than a page template. Each destination uses a different historical publication role:

| Page   | Publication model                | Information behavior                                                                                          |
| ------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Essays | Publisher's chronological list   | All nine published English works, arranged by year with title, short description, date, and stable numbering  |
| Series | Prospectus / monograph catalogue | Two long-lived reading collections treated as substantial works with scope, editorial note, and extent ledger |
| About  | Colophon / author record         | First-person position, practice and training record, selected papers, links, and a parallel failures record   |

The pages deliberately do not introduce issue numbers, volume rhythms, topic filters, departments, cover art, or cards. The present inventory does not support those devices, and using them would imply an editorial institution that does not yet exist.

### Shared-language comparison

The homepage and three destinations were inspected together at 1440 × 1024 in `editorial-publication-comparison.png`.

| Surface                | Evidence                                                                                           | Result |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ------ |
| Masthead continuity    | Identical wordmark, navigation positions, language link, theme control, and header rule            | Passed |
| Typographic hierarchy  | Source Serif 4 display voice, serif reading text, mono metadata, restrained italic editorial note  | Passed |
| Material and palette   | Near-white paper, near-black ink, fine gray rules, and blue catalogue metadata                     | Passed |
| Layout system          | Same 90rem open-page container and asymmetric columns without cards or boxed modules               | Passed |
| Page differentiation   | Essays is dense and exhaustive; Series is sparse and monumental; About is biographical and linear  | Passed |
| Responsive translation | All page roles collapse into readable single-column sequences at 390 px without horizontal scroll  | Passed |
| Content grounding      | Essay, series, biography, education, employment, and publication details come from repository data | Passed |

No focused crops were required. The full viewport comparison contains the masthead, primary title, page premise, and first content unit for every page at a readable scale; full-page captures cover the continuation rhythm.

### Publication-page comparison history

#### Pass 1

- P1: Reusing the homepage's lead-story-plus-list structure would make all destinations interchangeable.
- Fix: Assigned a distinct publication role and density model to each page before implementation.
- P1: Topic categories and magazine issue conventions would overstate the current inventory.
- Fix: Kept Essays chronological, made Series the only collection layer, and removed issue/volume/category chrome.
- P2: A conventional resume or tabbed biography would break the fine-press language on About.
- Fix: Converted About into a colophon-like author record with practice and training on one timeline and a separate parallel-failures note.

#### Pass 2

The four-page board showed consistent masthead geometry, display voice, rules, page material, and editorial apparatus. The different page densities remain legible as one publication family. No actionable P0, P1, or P2 visual mismatch remained.

### Publication-page functional QA

- Essays, Series, and About page identity and meaningful content: passed.
- Connected navigation story: switching Essays → Series → About passed.
- Active navigation state: passed on all three destinations.
- Theme interaction: changed `data-mode` to `dark` and the control label to `LIGHT`; passed.
- Horizontal overflow: none at desktop or mobile on all three pages.
- Page errors: none.
- Console: only Storybook's non-app `/favicon.ico` 404 on Essays; no application runtime errors.
- Browser path: the Browser plugin initialization failed with `Cannot redefine property: process`; the previously approved Playwright fallback used installed Chrome.

## Reading pages extension — legacy baseline

> The distinction between reference work and standalone essay remains current.
> Later product-capable reading-surface and typography entries supersede the
> static interaction model and display-face assignments recorded here.

- Vision 100 source: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-series-desktop-viewport.png`
- Essay source: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-home-desktop-viewport.png`
- Vision 100 URL: `http://localhost:6006/iframe.html?id=explorations-editorial-reading-pages--vision-100-reference-work&viewMode=story`
- Essay URL: `http://localhost:6006/iframe.html?id=explorations-editorial-reading-pages--rejection-letter-essay&viewMode=story`
- Desktop screenshots: `editorial-vision-desktop.png`, `editorial-essay-desktop.png`
- Desktop viewport screenshots: `editorial-vision-desktop-viewport.png`, `editorial-essay-desktop-viewport.png`
- Mobile screenshots: `editorial-vision-mobile.png`, `editorial-essay-mobile.png`
- Focused screenshots: `editorial-vision-index-desktop.png`, `editorial-essay-figure-desktop.png`
- Combined comparison: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-reading-comparison.png`
- Viewports: 1440 × 1024 desktop; 390 × 844 mobile
- State: light-theme comparison; dark theme exercised through the connected interaction path

### Reading-page grammar

These pages extend the accepted publication family without treating the house style as one reusable page template:

| Page       | Publication model                 | Reader's primary action                                                                                                 |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Vision 100 | Reference work / critical edition | Orient within the field, filter the subject register, preserve original rank, reorder chronologically, inspect citation |
| Essay      | Separately bound long-form essay  | Enter through a title leaf, read at a narrow measure, follow numbered turns, inspect documentary evidence and notes     |

Vision 100 uses the repository's complete 100-paper dataset, real topic assignments, ranks, years, authors, titles, journals, and volume information. The essay uses the published `Stop Being Your Own Rejection Letter` argument, structure, metadata, and real redacted email image.

### Reading-page fidelity ledger

The two accepted source pages and two reading-page implementations were normalized at 1440 × 1024 and inspected together in `editorial-reading-comparison.png`. Focused index and documentary-figure screenshots were inspected separately because their typography and image treatment were too small to judge on the four-page board.

| Surface               | Source evidence                                                                      | Rendered evidence                                                                                                      | Result           |
| --------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Masthead continuity   | Same centered Essays / Series / About navigation and paper-width header rule         | Both reading pages retain identical wordmark, nav placement, active state, utilities, and rule                         | Passed           |
| Display typography    | Monumental Source Serif title, italic emphasis, blue mono apparatus                  | Vision title becomes a reference-book title page; essay preserves the exact lead title and italic `Rejection`          | Passed extension |
| Spacing and rhythm    | Wide 90rem open-page container, asymmetric columns, large negative space, fine rules | Title leaves preserve the container while reading sections adopt page-specific density                                 | Passed           |
| Colors and tokens     | Near-white paper, dark ink, gray rules, restrained blue metadata                     | Existing semantic surface, text, border, focus, and accent tokens only; no cards, gradients, or decorative background  | Passed           |
| Image and asset       | Accepted system is image-light                                                       | Essay uses the real 2227 × 1073 redacted email image, framed as documentary Fig. 01; no generated or placeholder asset | Passed           |
| Reference apparatus   | Series prospectus establishes extent and editorial note                              | Vision adds a bibliographic ledger, editor's note, subject register, rank/chronology switch, and real citation rows    | Passed extension |
| Long-form readability | Homepage establishes the essay's display voice and deck                              | 43rem body measure, section numbers, drop cap, restrained blockquote, figure caption, endnote, and next-work folio     | Passed extension |
| Responsive behavior   | Accepted reference is desktop                                                        | Both 390px pages preserve hierarchy, legible metadata, complete controls, real image, and no horizontal overflow       | Passed           |
| Copy and content      | Existing lead copy and real series inventory                                         | No fake papers, fake publications, issue numbers, or institutional claims                                              | Passed           |

Above-the-fold copy diff:

- Essay title and deck are unchanged from the accepted homepage lead. Author, publication date, and reading time are added as article-specific apparatus.
- `List of 100 vision papers` is normalized to the display title `100 Vision Papers`; `Series 02 / Bibliography` preserves its catalogue position and content type. This is an intentional editorial normalization.
- The social embed is omitted from the static essay prototype, while the acquisition statement and explanatory note remain. The real documentary email image is included.

### Focused-region evidence

- `editorial-vision-index-desktop.png`: subject register, active state, counts, rank/chronology controls, citation hierarchy, years, journal details, rule rhythm, and reading width are visibly legible.
- `editorial-essay-figure-desktop.png`: sticky contents, body typography, real email crop, figure number, caption, marginal editorial note, section transition, and evidence-to-prose spacing are visibly legible.

### Reading-page comparison history

#### Pass 1

- P1 risk: Carrying the existing subway-map metaphor forward would make Vision 100 read as a data visualization demo rather than a durable publication.
- Fix: Recast it as a reference work with title leaf, ledger, editor's note, subject register, original-rank order, chronological order, and bibliographic entries.
- P1 risk: Reusing the publication index grid for an individual essay would fragment the reading experience.
- Fix: Gave the essay one narrow central measure and moved contents and editorial apparatus into subordinate margins.
- P2 risk: Mocking documentary evidence would undermine the essay's factual register.
- Fix: Imported and rendered the repository's real redacted email image; confirmed its natural dimensions are 2227 × 1073.

#### Pass 2

The combined board and focused screenshots showed consistent type personality, paper/ink/accent palette, masthead geometry, rules, and editorial apparatus. Vision 100 is visibly denser and navigational; the essay is visibly quieter and sequential. No actionable P0, P1, or P2 mismatch remained.

### Reading-page functional QA

- Page identity and meaningful content: passed for both pages.
- Framework overlay: none.
- Subject filter: selecting `Attention` changed the active state and count to 24 papers.
- Order control: selecting `Chronology` changed its pressed state.
- Expansion: `Show all 24 papers` rendered 24 citation rows.
- Connected navigation: Series / Vision 100 → Essays / Rejection Letter passed.
- Theme interaction: changed `data-mode` to `dark` and the control label to `LIGHT`.
- Documentary image: loaded completely at 2227 × 1073.
- Horizontal overflow: none at 1440px or 390px on either page.
- Page errors: none.
- Console: one generic Storybook shell 404 message on Vision 100, with no failed story response and no application runtime error; Essay was clean.
- Browser path: the Browser plugin initialization failed with `Cannot redefine property: process`; the previously approved Playwright fallback used installed Chrome.

## Bilingual Product Commandments extension — superseded static pass

### Scope and implementation

- Source essays: `apps/blog/content/essays/ten-commandments-for-product.mdx` and `apps/blog/content/essays/ten-commandments-for-product-zh.mdx`
- English Storybook URL: `http://localhost:6006/iframe.html?id=explorations-editorial-reading-pages-product-commandments--english&viewMode=story`
- Chinese Storybook URL: `http://localhost:6006/iframe.html?id=explorations-editorial-reading-pages-product-commandments--chinese&viewMode=story`
- English screenshots: `editorial-commandments-en-desktop-viewport.png`, `editorial-commandments-en-desktop.png`, `editorial-commandments-en-mobile-viewport.png`, `editorial-commandments-en-mobile.png`
- Chinese screenshots: `editorial-commandments-zh-desktop-viewport.png`, `editorial-commandments-zh-desktop.png`, `editorial-commandments-zh-mobile-viewport.png`, `editorial-commandments-zh-mobile.png`
- Focused evidence: `editorial-commandments-en-index.png`, `editorial-commandments-zh-index.png`, `editorial-commandments-en-body.png`, `editorial-commandments-zh-body.png`
- Combined comparison: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-commandments-comparison.png`
- Viewports: 1440 × 1024 desktop; 390 × 844 mobile

### Editorial model

This essay is treated as a manifesto or charter, not as another narrative essay. The title leaf introduces the work as a compact declaration; the complete ten-item index lets the reader grasp the argument at once; the body turns every commandment into a numbered article with a large blue numeral. English and Chinese are two states of the same publication page, sharing structure and controls while using language-specific title scale, line height, measure, and typographic texture.

This first prototype included all ten real bilingual headings but used representative abbreviations of the published prose. The user rejected that limitation because it erased the existing three-pass reading model and did not expose the complete essay. The corrected implementation is documented below.

### Fidelity ledger

| Surface                       | Accepted evidence                                                                | Product Commandments evidence                                                                                | Result                         |
| ----------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| Masthead geometry             | Centered Essays / Series / About navigation, paper-width rule, compact utilities | Identical wordmark, navigation, active state, and rule; utilities extend to a real EN / 中文 state switch    | Passed extension               |
| Display typography            | Monumental Source Serif narrative title with italic emphasis                     | English title becomes a three-line declaration; Chinese uses a two-line monumental ideographic lockup        | Passed extension               |
| Editorial apparatus           | Blue mono classification, metadata ledger, contents, marginal labels             | Essay number, category, author/date/extent ledger, full ten-item index, article numerals, closing and folio  | Passed extension               |
| Paper and rules               | Near-white surface, black ink, gray hairlines, restrained blue accent            | Same semantic tokens, double rules at major boundaries, no cards, gradients, badges, capsules, or animation  | Passed                         |
| Structural distinction        | Narrative essay uses one sequential reading measure                              | Manifesto exposes all ten propositions first, then gives each one a separate numbered field                  | Passed extension               |
| English / Chinese equivalence | Existing reading family established in English                                   | Both languages preserve identical information architecture while using language-specific typography and copy | Passed                         |
| Responsive behavior           | Accepted source reference is desktop                                             | Both 390px states preserve hierarchy, controls, title impact, metadata, and no horizontal overflow           | Passed                         |
| Copy grounding                | Published essays are repository source of truth                                  | All headings and displayed passages are grounded in the real English and Chinese MDX sources                 | Passed with noted abbreviation |

### Comparison history

#### Pass 1

- P1 risk: Reusing the narrative essay's drop cap, sticky contents, and documentary-evidence rhythm would make a list of principles feel like a memoir.
- Fix: Recast the work as a manifesto: complete proposition index, monumental numerals, one article per commandment, and a formal closing statement.
- P1 risk: Treating Chinese as a literal skin over the English layout would produce weak title proportion and poor reading texture.
- Fix: Kept one information architecture but gave Chinese its own title scale, body line height, heading rhythm, and metadata spacing.

#### Pass 2

The three-page first-viewport board showed continuity with the accepted narrative source while preserving a visibly different publication model. Focused index and first-article screenshots confirmed legibility, numbering hierarchy, fine-rule rhythm, and bilingual parity. No actionable P0, P1, or P2 mismatch remained.

### Intentional asset deviation

The repository's existing `ten-commandments-for-product-cover.png` is a dark social-card composition with heavy slab typography and illustrated monoliths. It is intentionally omitted from this fine-press reading prototype because it would introduce a second, incompatible visual system. The page remains image-free and derives its identity from type, spacing, rules, and editorial apparatus.

### Functional QA

- Page identity and meaningful content: passed in English and Chinese.
- Commandment count: 10 articles in both language states.
- Language control: EN → 中文 updated the H1 and `aria-pressed` state.
- Index navigation: first Chinese proposition scrolled to `#commandment-1`.
- Theme control: changed `data-mode` to `dark` and label to `LIGHT`.
- Horizontal overflow: none at 1440px or 390px in either language.
- Page errors: none.
- Console: one generic Storybook shell 404 message on the first English load, with no failed story response and no application runtime error; subsequent Chinese load was clean.
- Browser path: the Browser plugin initialization failed with `Cannot redefine property: process`; the previously approved Playwright fallback used installed Chrome.

## Product-capable reading surfaces correction

### Source and rendered evidence

- Fine-press source screenshots: `editorial-commandments-en-desktop-viewport.png` and `editorial-vision-index-desktop.png`
- Corrected Product Commandments screenshots: `editorial-commandments-reading-depth-desktop.png`, `editorial-commandments-reading-depth-spine.png`, `editorial-commandments-full-body-desktop.png`, `editorial-commandments-full-body-zh-desktop.png`, `editorial-commandments-reading-depth-mobile.png`, and `editorial-commandments-reading-depth-mobile-control.png`
- Corrected Vision 100 screenshots: `editorial-vision100-explorer-desktop.png`, `editorial-vision100-table-search.png`, `editorial-vision100-method.png`, and `editorial-vision100-explorer-mobile.png`
- Full comparison board: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/editorial-product-requirements-comparison.png`
- Viewports: 1440 × 1024 desktop and 390 × 844 mobile
- State: light theme; Product Commandments Full, Spine, Argument, English, and Chinese; Vision 100 map, table search, method, and catalogue filter

### Corrected product model

The fine-press design is now a shell around two different application cores:

| Surface              | Publication role                   | Application core                                                                                                              |
| -------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Product Commandments | Manifesto / separately bound essay | Existing `ReadingDepth` state machine with Spine, Argument, and complete Full modes                                           |
| Vision 100           | Critical edition / field atlas     | Real `Vision100Map`, subway-map and table states, filtering, search, sortable bibliography, catalogue, and method explanation |

Product Commandments Full mode imports the canonical English and Chinese MDX files directly. The English Spine and Argument modes use the existing `content/essay-reading/ten-commandments-for-product.mdx` sidecar. Because no Chinese sidecar exists, the Chinese condensed modes are mechanically derived from the canonical Chinese introduction, ten-item index, and first paragraph under each numbered commandment; no substitute essay prose is invented.

### Required fidelity surfaces

| Surface                   | Comparison evidence                                                                                                                                                                                                               | Result           |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Fonts and typography      | The comparison board preserves the monumental Source Serif title, Noto Serif Chinese hierarchy, serif reading measure, and blue mono apparatus; the new controls use the same heading/code pairing rather than generic app chrome | Passed           |
| Spacing and layout rhythm | Title-leaf geometry is unchanged; the reading-depth rail occupies the former double-rule transition and the Vision guide occupies the former subject-register column                                                              | Passed extension |
| Colors and tokens         | Paper, ink, gray hairlines, and restrained blue active states remain token-driven; the real multicolour Vision routes appear only inside the scientific map                                                                       | Passed extension |
| Image and asset fidelity  | No target image was replaced; Product Commandments remains intentionally image-free and Vision 100 uses the repository's real SVG/data visualization rather than a recreated diagram                                              | Passed           |
| Copy and content          | Full mode renders 41 canonical paragraphs and 11 H2 headings, including commandment ten, in both languages; method copy is grounded in the published Vision 100 source note                                                       | Passed           |
| States and affordances    | Three reading tabs, language state, internal map/table toggle, table search, high-level explorer/catalogue/method tabs, topic filter, and selected states are visible and functional                                              | Passed           |
| Responsive behavior       | Product text wraps without exposing raw Markdown URLs; the 700px scientific map remains horizontally scrollable inside its own viewport without widening the 390px document                                                       | Passed after fix |
| Accessibility             | Real buttons/tabs expose `aria-selected` or `aria-pressed`; SVG decade/category filters remain keyboard reachable; the mobile controls retain practical target height                                                             | Passed           |

### Comparison history

#### Pass 1 — product-model failure

- P1: Product Commandments showed abbreviated excerpts and had no three-pass reading control, so it could not satisfy the existing Read it three times product behavior.
- Fix: Imported canonical English and Chinese MDX as raw source, rendered complete paragraphs/headings/links/notes, and composed those sources through the production `ReadingDepth` and `PassContent` components.
- P1: Vision 100 exposed only a bespoke catalogue; the real map, map/table switch, hover/focus inspection, search, and explanatory method were absent.
- Fix: Embedded the production `Vision100Map` and organized the page into Explore map, Catalogue, and Method & limits publication surfaces.

#### Pass 2 — rendered defects

- P1: The first inline renderer shared a global regular expression across recursive Note/italic parsing. A note reset the outer expression and crashed the browser page.
- Fix: Scoped the tokenizer per render call; the story then loaded with no page errors.
- P2: Markdown links inside italic introductory prose were displayed as raw `[label](URL)` text, which also caused mobile horizontal overflow.
- Fix: Recursively parsed inline content inside strong and emphasis nodes. The introduction now displays normal linked prose and the 390px document has no overflow.
- P2: The real Vision map's intentional 700px minimum width leaked into document width on mobile.
- Fix: Clipped overflow at the map shell and preserved horizontal scrolling on the inner map viewport. The document remains 390px wide while the scientific map is still pannable.

#### Pass 3 — final comparison

The combined board shows the same masthead, title geometry, page material, rules, display typography, mono apparatus, and open-page rhythm before and after. The differences are purposeful product additions: a ruled reading-depth rail in the manifesto and a map-plus-guide field atlas in Vision 100. Focused body, table-search, and method screenshots are legible at native size. No actionable P0, P1, or P2 issue remains.

### Functional QA

- Product Commandments Full: 41 visible paragraphs and 11 H2 headings; final English and Chinese commandments visible.
- Product Commandments Spine: selected state passed; 2 opening paragraphs and all 10 index items visible.
- Product Commandments Argument: selected state passed; 12 paragraphs and 10 numbered headings visible.
- Vision 100 Table: selected state passed; searching `Hubel` returned 9 rows.
- Vision 100 Method & limits: selected state and third explanation section visible.
- Vision 100 Catalogue: `Attention` selected and `24 papers` result visible.
- Horizontal overflow: none at 1440px or 390px on either surface.
- Page errors: none.
- Console: Vision 100 clean; Product Commandments emitted only the generic Storybook shell 404 with no failed story response or application runtime error.
- Browser path: the Browser plugin invocation failed with `Cannot redefine property: process`; the previously approved installed-Chrome Playwright fallback captured and exercised all states.

final result: passed

## Landing and About rearrangement — 2026-07-18 — superseded type pass

> The front-table and complete-record structures remain current. Later entries
> replace the Newsreader monumental-display assignment with Vollkorn display,
> Newsreader supporting roles, and the quieter homepage premise/deck weights.

### Source and final evidence

- Previous landing: `editorial-home-desktop-viewport.png`.
- Previous About: `editorial-about-desktop-viewport.png`.
- Final landing: `editorial-landing-about/landing-final-1440-viewport.png`,
  `editorial-landing-about/landing-final-1440.png`, and
  `editorial-landing-about/landing-final-390.png`.
- Final About: `editorial-landing-about/about-final-1440-viewport.png`,
  `editorial-landing-about/about-final-1440.png`, and
  `editorial-landing-about/about-final-390.png`.
- Intermediate breakpoint evidence:
  `editorial-landing-about/landing-after-920-viewport.png` and
  `editorial-landing-about/about-after-920-viewport.png`.
- Previous and final 1440px viewport images were inspected together in one
  four-image comparison input.

### Editorial correction

- The landing page no longer duplicates the complete essay catalogue. It now
  reads as a publisher's front table: publication premise, one lead essay,
  three recent essays, one reference work, and a concise colophon.
- Numeric ranking was removed from the landing inventory. Classification is
  limited to publication form and useful context; dates remain only where they
  establish publication chronology.
- About now behaves as a colophon and provenance record rather than a long CV:
  author premise, one unifying thesis, selected practice and training, selected
  research, the parallel failures record, and external profiles.
- Newsreader Variable owns Latin display and section headings at a deliberately
  stronger weight. Source Serif 4 Variable remains the reading and explanatory
  face; the shared mono apparatus continues to carry dates and classifications.
- Both pages reuse `EditorialClassification` and `EditorialLabel`, the same
  page width, rules, accent treatment, and the 56rem content-fit breakpoint.

### Responsive and functional verification

- Landing and About both report document width equal to viewport width at
  1440px, 920px, and 390px.
- At 920px the intended two-column spreads remain viable; below 56rem both
  pages become single-column editions without changing semantic order.
- At 390px, inspected title, introduction, lead copy, recent rows, record,
  research, and closing sections all remain within the 358px content measure.
- Landing theme control changes `data-mode` light → dark → light and updates
  the button label in both directions.
- Publication navigation switches Essays → Series → About with the correct
  active state and H1. The duplicate `Essays` accessible name in About was
  removed by renaming the external link `Read essays`; a fresh run reports no
  warning or error logs.
- Targeted Storybook build completes. Existing sourcemap and module-directive
  warnings remain non-blocking and unrelated to these pages.

final result: passed

## Short-deck rag correction — 2026-07-18

### Current-render audit

- Source: `codex-clipboard-69b0e1c1-1c80-48b3-b60f-018e62b193fa.png`.
- The Vision 100 standfirst remained correctly flush left and ragged right, but
  its narrow-column wrap ended in a conspicuous short tail. This was a rag
  problem, not a page-grid or baseline-alignment problem.
- Full justification was rejected for this short display statement because it
  would trade the short tail for visibly expanded word spaces.

### Composition correction

- The shared `.type-system__deck` role now uses `text-wrap: balance` while
  retaining `text-align: start`.
- The editorial typography specification now distinguishes short decks from
  long-form paragraphs: decks are balanced display composition and never
  inherit prose justification by default.
- The rule applies to both reference-work and essay decks that consume the
  shared prototype role.

### Rendered verification

- After: `vollkorn-editorial-system/deck-rag/02-after-1024.png`.
- At the 1024px desktop-narrow breakpoint, the four line boxes measure 237px,
  229px, 220px, and 241px. No line is left as an abrupt one-word tail.
- At 390px, the three line boxes measure 355px, 333px, and 241px; document
  width equals the viewport width, so the correction introduces no overflow.
- Computed composition: `text-wrap: balance`, `text-align: start`.
- The copy, typeface, weight, size, leading, column geometry, and metadata are
  unchanged.

final result: passed

## Publication-header system codification — 2026-07-18

### Evidence

- Source visual truth:
  - `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-4d81e070-3fa6-4293-8a40-122b4937696f.png`
  - `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-295af8a0-1dba-4815-80d2-a7c77fe4bb46.png`
  - `/var/folders/sv/v1t7hpkn64x2cqvybw97t5j80000gn/T/codex-clipboard-b55cc2af-58ea-4c66-8d20-af867299af8c.png`
- Implementation URL: `http://localhost:6006/iframe.html?globals=viewport%3Adesktop&id=explorations-editorial-reading-pages--vollkorn-editorial-system&viewMode=story`
- Before full view: `/Users/planeyang/.codex/visualizations/2026/07/13/019f5a27-7f1c-7701-9939-2f78da3f083d/vollkorn-editorial-system/holistic-codification/01-before-full-page.png`
- Focused post-fix evidence:
  - `02-after-reference-header.png`
  - `03-after-narrative-header.png`
  - `04-after-archive-header.png`
- Mobile post-fix evidence: `05-after-mobile.png`
- Viewports: 1440 × 900 desktop; 390 × 844 mobile.
- State: light theme, Newsreader supporting face selected.

### Findings and comparison history

#### Pass 1

- P1: The same classification role had two unrelated implementations. Reference work, narrative essay, and bilingual essay computed to `9.6px` with a `72px` title gap; the archive computed to `11.2px` with a `36px` gap.
- Impact: The page family could not maintain a stable publication hierarchy, and later pages were likely to repeat whichever local CSS happened to be copied.
- Fix: Added semantic editorial-apparatus typography and apparatus-to-display spacing tokens, then introduced shared `EditorialClassification` and `EditorialLabel` components.
- P2: The archive-specific selector made the visually improved result a one-page exception.
- Fix: Removed all archive-specific classification size, weight, tracking, and spacing overrides. All four title heads now consume the same component contract.

#### Pass 2

- Post-fix computed typography for all four classification rows: `11.2px`, `600`, `0.08em`, and `1.3` leading.
- Post-fix classification-to-title gap for all four title heads: `36px` at 1440px and `32px` at 390px.
- The user-provided Reference work, Essay, and Essay archive crops were opened in the same comparison input as the three post-fix focused implementation screenshots.
- No actionable P0, P1, or P2 difference remains in the named relationship. The large title scale remains intentionally page-specific while the apparatus role is shared.

### Required fidelity surfaces

| Surface                   | Result                                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts and typography      | Passed. All classifications share the mono apparatus role; Vollkorn and Newsreader title/body choices are unchanged.                   |
| Spacing and layout rhythm | Passed. One responsive token now controls label-to-title proximity across reference, essay, bilingual essay, and archive title leaves. |
| Colors and tokens         | Passed. Existing accent and paper/ink tokens remain unchanged; the new values are semantic aliases rather than local colors.           |
| Image quality and assets  | Not applicable. The compared regions contain no raster or illustrative assets.                                                         |
| Copy and content          | Passed. Classification, subject, edition, and title copy are unchanged.                                                                |

### Responsive, interaction, and console QA

- 390px document width equals viewport width; no horizontal overflow.
- All eight primary/secondary classification labels compute to `11.2px` on mobile.
- Reference title grid collapses to one `358px` track.
- Supporting-face switcher: Source Serif 4 selection passed; return to Newsreader passed.
- Final selected state: Newsreader `aria-pressed="true"`, Source Serif 4 `aria-pressed="false"`.
- Console errors: none.

final result: passed

## Body composition correction — 2026-07-15

### Current-render audit

- Before: `vision100-body-ragged-before.png`, `vision100-method-body-ragged-before.png`, `commandments-en-body-ragged-before.png`, and `commandments-zh-body-ragged-before.png`.
- English paragraphs used the browser's default ragged-right composition. The 52rem Product Commandments measure amplified the uneven edge and made long-form lines unnecessarily wide.
- Chinese paragraphs had no explicit inter-character justification, strict line-breaking, or mixed-script spacing policy.
- Short labels, metadata, navigation, and UI copy were intentionally excluded from paragraph justification.

### Language-aware composition

- English long-form prose now uses a 46rem reading measure, inter-word justification, automatic language-aware hyphenation, conservative hyphen limits, hanging punctuation, and a left-aligned final line.
- Chinese long-form prose retains a slightly wider 50rem measure and uses inter-character justification, strict CJK line breaking, normal word breaking, mixed-script auto-spacing, no Latin-style hyphenation, and a left-aligned final line.
- Vision 100 editor's notes, method paragraphs, and the separately bound essay body use the same English composition policy. The title-page deck and interface apparatus remain ragged by design.
- Semantic `lang="en"` and `lang="zh-Hans"` values now reach the actual reading articles, enabling the browser's correct language rules.

### Rendered comparison and verification

- After: `vision100-body-composed-after.png`, `vision100-method-body-composed-after.png`, `commandments-en-body-composed-after.png`, `commandments-zh-body-composed-after.png`, `commandments-en-body-composed-mobile.png`, and `commandments-zh-body-composed-mobile.png`.
- Computed English prose: `text-align: justify`, `text-justify: inter-word`, and `hyphens: auto`.
- Computed Chinese prose: `text-align: justify`, `text-justify: inter-character`, `line-break: strict`, and `hyphens: none`.
- Product Commandments and Vision 100 both report zero document overflow on desktop. English and Chinese Product Commandments report zero overflow at 390px.
- The current-run 390px audit exposed a latent 44px English title-page overflow. The mobile title scale and grid minimum were corrected; the overflow scan is now empty.
- Product Commandments Spine → Full and Vision 100 Method → Explore state transitions preserve their selected states after the typography changes.

final result: passed

## Heading typography and alignment correction — 2026-07-15

### Current-render audit

- Before: `vision100-typography-before.png` and `commandments-typography-before.png`.
- The title system used Source Serif 4 at weight 400, with up to `-0.065em` tracking and `0.79` line-height. At 1440px the Vision title computed to 135.36px with `-8.7984px` letter spacing, producing the visibly thin, compressed result.
- The Vision title-page columns were only bottom-aligned. Classification, numeral, title, and premise therefore shared an outer edge but no meaningful internal baseline.
- Numbered section headings used manual top padding to approximate alignment across unrelated font sizes.

### Type-role correction

- Added self-hosted Newsreader Variable for Latin headlines only, using weight 560/580 and optical sizing. Source Serif 4 remains the long-form reading face, so accepted body typography is unchanged.
- Added an explicit Noto Serif SC headline role at weight 600 for Chinese titles and numbered commandments. The body retains its existing reading role.
- Reduced extreme negative tracking and opened display line-height while keeping the original scale and publication character.

### Alignment correction

- Vision title page now uses a two-row editorial grid: `Series 02` aligns with `100`; `Vision Papers` aligns with the premise.
- Numbered commandments, method sections, article sections, index entries, and paper rows use first-baseline alignment instead of manual top padding.
- Mobile collapses the two-row grid into a deliberate single-column sequence and preserves the existing horizontally scrollable map.

### Rendered comparison and verification

- After: `vision100-typography-after.png`, `vision100-method-typography-after.png`, `commandments-heading-typography-after.png`, and `vision100-typography-mobile-after.png`.
- Typography: Newsreader Variable computed at weight 560 for the Vision H1 and section H2; Chinese commandment headings computed in Noto Serif SC at weight 600.
- Geometry: Vision premise begins at the second title row (`243.30px`), immediately after the numeral row ends (`237.70px`).
- Hierarchy: body copy, metadata, mono apparatus, rules, colors, and interaction labels are unchanged.
- Baselines: numbered headings now share first baselines with their title text at different sizes.
- Responsive behavior: no document overflow at 390px for Vision 100 or Product Commandments.
- Interactions: Vision workspace tabs and the complete Product Commandments reading modes remain intact.

final result: passed

## Narrative title-leaf responsive correction — 2026-07-18

### Current-render audit

- User references: `codex-clipboard-3904bb3d-032c-49e7-8ea1-3ecc19bef78e.png`,
  `codex-clipboard-cd71ac56-262c-4f3f-b9d4-a9fe88d34437.png`,
  `codex-clipboard-4d70816d-5275-41a7-9a9e-2773f6c509f4.png`, and
  `codex-clipboard-5ba3ddb2-8e47-4daf-ae8a-b50fb9d7c566.png`.
- Before evidence: `responsive-narrative/01-before-800.png` and
  `responsive-narrative/02-before-801.png`.
- At 800px the narrative was a 768px stacked column with a 72px title. At
  801px it abruptly became 305px + 352px columns, causing `Stop Being` to split
  into two lines while the deck and first body section jumped into the right
  column.
- The one-pixel boundary simultaneously changed title line count, section
  height, column placement, and reading entry. This was a structural responsive
  failure rather than a typographic-polish issue.

### Composition correction

- The spread now activates at the content-fit threshold of 56rem, where the
  intended title lines survive in the left column.
- The stacked title uses a continuous `clamp(4.5rem, 10vw, 5rem)` scale. At the
  new boundary it changes from 80px to 80.73px rather than changing layout and
  size at once.
- `The email` is now outside the title grid. The title leaf contains the
  classification, title, and deck; the first body section follows in the same
  semantic order at every width.
- The responsive-title-leaf contract is recorded in
  `plan/docs/EDITORIAL_TYPOGRAPHY.md`.

### Rendered verification

- Old breakpoint after: `responsive-narrative/03-after-800.png` and
  `responsive-narrative/04-after-801.png`; both preserve the same stacked
  composition and four intended title lines.
- New content-fit breakpoint: `responsive-narrative/05-after-896.png` and
  `responsive-narrative/06-after-897.png`; the title line pattern and type scale
  remain stable while only the title/deck placement changes.
- Mobile: `responsive-narrative/07-after-390.png`; document width equals the
  390px viewport and the semantic reading order remains title, deck, then first
  section.
- Verified widths: 390, 640, 800, 801, 895, 896, 897, 900, 1024, and 1440px.

final result: passed
