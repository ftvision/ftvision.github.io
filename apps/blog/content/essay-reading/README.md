# Essay Reading Sidecars

Optional progressive-reading data for essays lives here.

Keep the canonical essay in `content/essays/<slug>.mdx`. To add Spine and
Argument modes for that essay, create `content/essay-reading/<slug>.mdx`.

The sidecar is not routed, included in `raw.md`, or used for reading time. It is
only composed into the rendered essay page.

## Format

```mdx
---
defaultPass: full
heading: "Reading depth"
passes:
  spine:
    time: "5 min"
    summary: "Opening claim and section list."
  argument:
    time: "15 min"
    summary: "Load-bearing passages, examples, and consequences."
  full:
    time: "45 min"
    summary: "Complete essay, examples, notes, and source detail."
---

<!-- reading-pass:spine -->

Short opening paragraphs and the section list.

<!-- reading-pass:argument -->

Short opening paragraphs, the section list, and self-contained argument
excerpts.
```

Use normal MDX in each pass. Do not include the Full pass here; Full is always
the canonical essay MDX.
