---
name: editorial-publication-design
description: Design, implement, and review Algo Mind publication surfaces, including the landing page, Essays catalogue, Series prospectus and reference works, About colophon, bilingual reading pages, and interactive editorial UI. Use for typography, editorial hierarchy, alignment, responsive composition, apparatus reduction, and Storybook visual QA.
---

# Editorial publication design for Algo Mind

Treat Algo Mind as a high-quality digital publication, not as a generic content
site and not as a simulation of a magazine issue. Typography, whitespace,
rules, hierarchy, responsive behavior, and interaction form one editorial
system.

## Read before acting

Read these sources completely, in this order:

1. `AGENTS.md` for repository boundaries and commands.
2. `plan/docs/EDITORIAL_SYSTEM_ARCHITECTURE.md` when the task adds, replaces,
   or compares complete publication languages or work-specific renderers.
3. `plan/docs/EDITORIAL_TYPOGRAPHY.md` for canonical vocabulary, type roles,
   measures, apparatus, and language-specific composition.
4. `plan/docs/EDITORIAL_RESPONSIVE_COMPOSITION.md` for responsive editions,
   invariants, breakpoint acceptance, and QA widths.
5. The relevant sections of `plan/docs/DESIGN_SYSTEM.md` for layer boundaries
   and token usage.
6. The target component, content source, styles, and Storybook story.
7. `design-qa.md` only when prior rendered evidence is useful.

`design-qa.md` is an evidence ledger containing accepted, rejected, and
superseded passes. It is never the normative source when it conflicts with the
canonical specifications or current content.

## Source-of-truth order

- Authored copy, bibliography, dates, biography, and records come from current
  repository content and data. Do not invent or summarize away source material.
- Design roles and composition rules come from the two canonical editorial
  specifications.
- Reusable values belong in semantic tokens or shared components after they
  survive more than one surface.
- A screenshot proves a rendered state, not a permanent rule.

## Start by naming the page role

Choose the document role before choosing layout:

| Surface        | Publication role           | Primary job                                                                                    |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| Landing        | Front table                | Select what to read now without pretending there is an issue structure                         |
| Essays         | Chronological catalogue    | Expose the complete essay record by date and year                                              |
| Series         | Prospectus                 | Describe long-lived bodies of work by title, scope, and real metadata                          |
| About          | Colophon and author record | Present the biography and optional detailed record without discarding it                       |
| Essay          | Bound reading work         | Preserve the full authored text and its reading modes                                          |
| Reference work | Interactive edition        | Combine explanation, sources, navigation, and exploration without turning them into app chrome |

Do not force different page roles into one template. They share a house style,
not one information architecture.

When comparing a completely different house style, also name the publication
system and the work presentation. Share content and behavioral capabilities;
allow each system to own DOM, grid, typography, apparatus, interaction
presentation, and responsive editions. Resolve work renderers by slug, then
presentation, then kind, then fallback as defined in the architecture document.

## Assign typographic roles before styling

Name each text block as one of:

- nameplate;
- publication premise;
- classification or editorial apparatus;
- display title;
- supporting headline;
- deck or standfirst;
- continuous body;
- imprint statement;
- interactive control text.

Current Latin family contract:

- Vollkorn Variable: monumental titles and major section displays, usually 560.
- Newsreader Variable: supporting headlines, decks, navigation, and short
  statements. Homepage premise, lead deck, and publisher statement use the
  distinct 440 / 450 / 520 roles defined in the typography specification.
- Source Serif 4: continuous English reading and longer explanatory prose.
- Noto Serif SC with documented fallbacks: Chinese editorial headlines.
- The code/monospace stack: real dates, folios, sources, indices, and utility
  metadata only.

Numeric weight is not hierarchy by itself. Judge face, optical size, scale,
leading, measure, position, and page color together.

## Use publication vocabulary precisely

In review, distinguish:

- grid, baseline, and optical alignment;
- type scale, leading, measure, tracking, and typographic color;
- flush-left ragged-right composition, justification, hyphenation, hanging
  punctuation, rivers, and rag;
- Chinese `章法`, `行款`, `布白`, `疏密`, `黑白关系`, `虚实`, and `气口`;
- Chinese line-breaking constraints, punctuation boundaries, and mixed-script
  spacing.

Do not use “alignment,” “spacing,” or “breathing room” as catch-all diagnoses.
Name the specific axis or relationship that fails.

## Apply an apparatus budget

Classification is optional, not decoration.

- A title leaf may have at most one classification row and at most two labels.
- Remove any label inferred from navigation, the page title, authorship,
  adjacent copy, or section structure.
- Use a real heading for a document section; do not style every heading as an
  eyebrow.
- Do not add ordinal numbers when chronology, authored titles, or scope already
  establish order.
- Keep real metadata such as dates, extent, coverage, sources, and state.
- Prefer a restrained rule, color change, or hover state to an ornamental
  disclosure arrow.

## Preserve the publication material

The house language is type, whitespace, fine rules, hierarchy, and deliberate
interaction. Avoid cards, shadows, rounded containers, badges, capsules,
decorative gradients, cover-like filler, and the retired star-field animation.

Use one dominant dark typographic anchor per opening composition. Supporting
layers should recede through a deliberate combination of size, face, weight,
leading, measure, and position.

## Compose responsively as editions

Do not make every box independently fluid. Define a small number of deliberate
compositions and allow fluid values inside each one.

Before changing a breakpoint:

1. Preserve semantic DOM order.
2. Identify the title leaf and keep the first body section outside it.
3. Choose the breakpoint from content fit, especially title line formation.
4. Inspect one pixel below, at, and one pixel above every structural boundary.
5. Confirm that line count, type scale, column position, and section order do
   not all jump at once.
6. Test the widths required by the responsive specification, including 390px
   mobile and 1440px desktop.

Short decks remain flush left and ragged right. English and Chinese continuous
prose use their separate language-specific composition rules. Set `lang` on the
actual reading region.

## Treat interaction as editorial apparatus

Interactive publishing must preserve the complete work.

- Reading-depth modes such as full, spine, and argument change the amount of
  visible material without changing the type system or losing the full text.
- A reference work such as `100 Vision Papers` may use maps, tables, search,
  filters, and source inspection, but the explanatory reading layer remains
  distinct and complete.
- Controls use UI composition and remain unjustified. Their state must not
  change the body measure or cause document-level overflow.
- Maps and tables may own an internal scroll or canvas; they must not widen the
  document viewport.

## Implementation workflow

1. Inspect the current story and rendered page before editing.
2. Trace copy and data to their repository source.
3. State the page role and text-role assignment.
4. Reuse current tokens and patterns before adding an abstraction.
5. Promote a shared token or component only when the same relationship appears
   on multiple surfaces.
6. Implement the narrowest coherent change.
7. Update the canonical specification when the rule changes; append rendered
   evidence to `design-qa.md` without rewriting history.

Lower design-system layers must not import from app layers. Use semantic color
and typography tokens rather than hardcoded values where a stable role exists.

## Rendered QA

For every material editorial change:

- run the narrowest build, type, lint, and Storybook checks for the files
  changed;
- compare the relevant desktop and mobile states at original size;
- inspect the exact structural breakpoint and its adjacent widths;
- verify zero document horizontal overflow;
- check actual font loading and computed role weights;
- inspect title line formation, first baselines, ledger tracks, measure, rag,
  paragraph color, and Chinese punctuation where applicable;
- exercise disclosures, tabs, filters, themes, reading modes, and focus states;
- inspect the browser console;
- record accepted evidence and rejected passes in `design-qa.md` with dates and
  explicit supersession notes.

Do not declare visual completion from code inspection or one endpoint
screenshot.

## Optional reviewer subagent

When the user explicitly requests a subagent or independent review, give it a
read-only task: read this skill and both canonical specifications, inspect the
rendered surfaces, and report findings by severity with exact file or viewport
evidence. The reviewer does not redefine the design system and does not edit
unless separately authorized.

## Handoff

Report:

- the page roles and typographic roles changed;
- the canonical rules added or corrected;
- the implementation files and shared primitives affected;
- the rendered widths, interactions, and validation commands checked;
- any provisional values that have not yet earned promotion into tokens.

This skill is canonical at `.claude/skills/editorial-publication-design/` and
symlinked to `.codex/skills/editorial-publication-design` for Codex. Edit the
canonical copy; the symlink follows.
