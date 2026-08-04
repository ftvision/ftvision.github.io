# Editorial Publication System Architecture

**Version:** 0.1

**Status:** Prototype contract; production promotion remains staged
**Applies to:** Completely swappable publication languages and work-specific editorial presentations

This document defines the boundary between a **theme**, a **publication
system**, and the presentation of an **individual work**. It exists because a
different publication language is not necessarily a different set of token
values. Fine Press and Modernist may share the same essay but disagree about
its DOM grouping, title leaf, grid, typography, apparatus, interaction layout,
and responsive editions.

The contract therefore preserves content and behavior without forcing visual
systems through one template.

## 1. Three levels of variation

| Level              | Changes                                                                                 | Keeps                                         | Appropriate mechanism            |
| ------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------- |
| Mode               | Light/dark contrast                                                                     | Structure, type roles, brand                  | Semantic color values            |
| Token theme        | Families, colors, spacing, borders                                                      | DOM and component grammar                     | `data-theme` and token overrides |
| Publication system | Page anatomy, DOM, grid, typography, apparatus, responsive and interaction presentation | Authored material and behavioral capabilities | Independent renderer registry    |

A publication system is not required to consume the same visual tokens as
another system. It should define its own semantic variables at the renderer
root and must not leak those values into another system.

## 2. Shared core

The shared core owns facts and capabilities, not composition:

- authored MDX, bibliography, dates, descriptions, biography, and records;
- canonical work URLs, metadata, SEO identity, and language variants;
- stable accessibility semantics and meaningful DOM reading order;
- reading-depth state and the guarantee that the full work remains available;
- reference-work data, search/filter semantics, and map/table capabilities;
- work identity expressed as `WorkDocument`, `WorkKind`, and `PresentationId`.

The shared core does **not** own:

- title line formation or the visual shape of a title leaf;
- the number or proportion of grid columns;
- whether apparatus is marginal, inline, sticky, or absent;
- font roles, page color, rule system, motion, or spacing rhythm;
- DOM wrappers created only to realize one publication grammar;
- the visible form of reading controls, maps, indices, and disclosures.

## 3. Work identity

Broad page types are insufficient. `EssayReader` cannot express the concrete
shape of Product Commandments, and `ReferenceWork` cannot by itself express the
field-atlas behavior of 100 Vision Papers.

```ts
type WorkKind =
  | "front-table"
  | "narrative-essay"
  | "structured-essay"
  | "reference-work";

type PresentationId =
  | "front-table"
  | "rejection-letter"
  | "product-commandments"
  | "vision-paper-atlas";

interface WorkDocument {
  slug: string;
  kind: WorkKind;
  presentation: PresentationId;
  title: string;
  description: string;
}
```

- `kind` supplies an ordinary renderer for comparable works.
- `presentation` names an authored form with specific editorial or interactive
  requirements.
- `slug` remains an escape hatch for a singular work that cannot honestly share
  its presentation implementation.

`presentation` is not a visual theme. It is the identity of the work's required
form: full narrative evidence, bilingual read-three-times behavior, or a
navigable scientific atlas.

## 4. Publication renderer contract

```ts
type WorkRenderer = ComponentType<{ manifest: WorkDocument }>;

interface PublicationSystem {
  id: string;
  renderers: {
    fallback: WorkRenderer;
    byKind: Partial<Record<WorkKind, WorkRenderer>>;
    byPresentation: Partial<Record<PresentationId, WorkRenderer>>;
    bySlug?: Record<string, WorkRenderer>;
  };
}
```

The resolver order is:

```text
bySlug → byPresentation → byKind → fallback
```

This order is deliberate. A specific work may override its presentation; an
established presentation may override the generic kind; an ordinary work can
still use a kind renderer; and incomplete systems remain inspectable through a
fallback.

## 5. Fine Press and Modernist

The Storybook comparison currently proves four presentation boundaries against
real repository content:

| Work                 | Shared material/capability                   | Fine Press renderer                               | Modernist renderer                               |
| -------------------- | -------------------------------------------- | ------------------------------------------------- | ------------------------------------------------ |
| Landing              | Real selection and publication premise       | Literary front table with monumental serif anchor | Modular front table with hard information tracks |
| Rejection Letter     | Published essay and documentary email        | Bound literary essay                              | Indexed documentary reading sheet                |
| Product Commandments | English/Chinese MDX and three reading depths | Manifesto-like fine-press edition                 | Number-led modular argument edition              |
| 100 Vision Papers    | Complete paper data, map, filters, method    | Scholarly field atlas                             | Modernist research register and map workspace    |

Fine Press currently uses adapters around the accepted prototypes. The adapters
are a migration boundary, not the desired final source layout. Modernist is a
separate implementation with independent DOM and CSS. Neither system is the
fallback stylesheet for the other.

### 5.1 Modernist typography contract

Modernist owns a role-based typography system; it does not own one “Modernist
font” that is enlarged, emboldened, and reused everywhere. Its provisional
default is the **Editorial Contrast** system:

| Role                    | Provisional face                        | Responsibility                                                     |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Monumental display      | Schibsted Grotesk                       | Title leaves, authored display numerals, and the nameplate anchor  |
| Supporting hierarchy    | Newsreader                              | Decks, section headings, row titles, and short editorial arguments |
| Continuous Latin body   | Source Serif 4                          | Essays, explanations, and sustained reading                        |
| Editorial apparatus     | Repository monospace stack              | Classification, dates, folios, indices, and real metadata          |
| Interactive control UI  | Instrument Sans                         | Navigation, tabs, search, filters, toggles, and buttons            |
| CJK display             | Noto Sans SC                            | Chinese monumental titles                                          |
| CJK hierarchy and body  | Noto Serif SC with documented fallbacks | Chinese headings and continuous reading                            |
| CJK interactive control | Noto Sans SC                            | Chinese navigation and controls                                    |

Storybook may compare complete alternative role maps. A comparison must name
and render all of these roles against real publication material; changing one
grotesk variable across display, deck, metadata, and controls is only a
typeface audition and does not qualify as a publication typography system.

The current comparison also includes **International Grid** (Archivo display,
Instrument Sans hierarchy, Schibsted UI) and **Quiet Rationalism** (Instrument
Sans display, Newsreader hierarchy, Schibsted UI). Source Serif 4, the
monospace apparatus, and the explicit CJK split remain controls so the review
can distinguish public voice from continuous-reading and writing-system
requirements. The old Arial Narrow treatment is retained only as rejected
evidence of collapsed roles.

## 6. Selection and loading

Production should select one publication system at build time or at the site
root. Storybook may load both systems in one comparison harness because its job
is inspection.

A reader-facing runtime system switch is not the default. It would ship both
renderer trees and their CSS, create hydration and persistence questions, and
multiply brand and QA states. Add it only if alternate editions become a real
reader feature rather than a design-lab convenience.

## 7. Progressive implementation

A new system does not need bespoke renderers for every work on day one.

1. Implement the system root, navigation, and fallback.
2. Add `byKind` renderers for ordinary works.
3. Add `byPresentation` renderers when an authored form has distinct needs.
4. Use `bySlug` only when the distinction is truly singular.
5. Promote the system to production only after the actual content inventory
   and required interactions pass QA.

This inheritance is an implementation convenience, not permission to erase a
work's capabilities. Product Commandments must retain the full English and
Chinese work and its three passes. Vision 100 must retain explanation, real
data, and exploration.

## 8. Responsive and accessibility invariants

Across systems:

- semantic DOM order must remain meaningful before CSS placement;
- the full authored work must remain available;
- language must be set on the actual reading region;
- focus states and control state must remain visible;
- no system may create document-level horizontal overflow;
- maps and tables own their internal canvas or scroll area;
- structural breakpoints are selected from content fit and checked immediately
  before, at, and after the boundary.

Fine Press's exact typefaces, apparatus scale, and working breakpoints remain in
the canonical typography and responsive-composition specifications. They are
not automatically universal values for Modernist. Cross-system invariants live
here; each system must document its own visual contract before production use.

## 9. QA multiplication

The minimum matrix is:

```text
publication system × presentation × language/state × responsive edition
```

For the current comparison, exercise at least:

- Fine Press and Modernist;
- landing, narrative essay, structured bilingual essay, and reference work;
- full/spine/argument, English/Chinese, map/index/method, and light/dark;
- 390px mobile, 1440px desktop, and every system-specific structural boundary
  with the adjacent pixel widths.

Storybook interaction tests prove state transitions. Rendered browser review
proves line formation, page color, overflow, hierarchy, and the actual loaded
fonts. Neither substitutes for the other.

## 10. Current prototype map

- Contract and resolver: `apps/storybook/stories/PublicationSystemPrototype.tsx`
- Modernist renderers: `apps/storybook/stories/ModernistPublicationSystem.tsx`
- System CSS: `apps/storybook/stories/publication-system-prototype.css`
- Comparison and standalone stories:
  `apps/storybook/stories/PublicationSystemPrototype.stories.tsx`
- Fine Press prototypes: `apps/storybook/stories/Editorial*Prototype.tsx`
