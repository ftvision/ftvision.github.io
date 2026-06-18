# Blog Design System

A themeable design system monorepo for a personal blog, built with React, Tailwind CSS, and a 3-layer token architecture.

## Quick Start

```bash
# Install dependencies
pnpm install

# Build tokens (required first)
pnpm --filter @blog/tokens build

# Start development (all packages)
pnpm dev

# Build everything
pnpm build
```

## Packages

| Package | Description |
|---------|-------------|
| [@blog/tokens](./packages/tokens) | Design tokens (colors, typography, spacing, motion) |
| [@blog/ui](./packages/ui) | React component library |
| [@blog/config](./packages/config) | Shared TypeScript/ESLint configs |
| [@blog/storybook](./apps/storybook) | Component demos (Storybook) |

## Architecture

**3-Layer Token System:**

```
Primitives  →  Raw values (colors, spacing, typography)
Semantic    →  Meaningful names (bg-primary, text-muted)
Themes      →  Visual variations (NYT light/dark)
```

**5-Layer Component System:**

```
Layer 5: Pages           → apps/blog/
Layer 4: App Components  → apps/blog/components/
Layer 3: Patterns        → packages/ui/ (Modal, Tabs, Accordion)
Layer 2: Primitives      → packages/ui/ (Button, Card, Input)
Layer 1: Tokens          → packages/tokens/
```

Lower layers never import from higher layers.

## Development

```bash
# Run Storybook
pnpm --filter @blog/storybook dev

# Type check
pnpm lint

# Format code
pnpm format
```

## Writing Workflow

This repo is also the working system for writing and publishing essays. The
editorial loop turns a loose idea into a published essay and distribution
package:

```text
Capture -> Thesis -> Angle -> Outline -> Draft -> Structural Edit -> Line Edit -> Package -> Distribute -> Learn
```

Use the loop as a production checklist, not a rigid template. Short posts can
skip stages, but flagship essays should pass through all of them.

| Stage | Purpose | Output |
|-------|---------|--------|
| Capture | Collect raw observations, product mistakes, stories, quotes, disagreements, or half-formed claims before they disappear. | One raw note that says, "this is about X, but really about Y." |
| Thesis | Turn the note into a claim with friction, specific enough that a smart reader could disagree. | Central thesis, strongest counterargument, and why Feitong should write this version. |
| Angle | Choose whether the piece is a personal story, industry argument, tactical guide, product teardown, or career reflection. | Target reader, angle statement, essay promise, and primary language. |
| Outline | Build the skeleton before prose. | Title, subtitle, opening scene, thesis, sections, counterargument, and conclusion. |
| Draft | Write the ugly complete version without polishing too early. | Full draft from beginning to end. |
| Structural Edit | Fix the essay before fixing sentences. | Revised section order and rewrite instructions. |
| Line Edit | Sharpen the prose while preserving the author's voice. | Polished essay. |
| Package | Make the essay legible before someone clicks. | Title, description, frontmatter, topics, excerpt, related essays, and Start Here placement if flagship. |
| Distribute | Turn one essay into native distribution pieces. | LinkedIn post, X posts, optional thread, optional Chinese adaptation, newsletter intro, quote-card line, and discussion prompt. |
| Learn | Read the reaction and separate vanity metrics from useful signal. | Follow-up ideas and an updated thesis backlog. |

Codex is most useful at the thesis, angle, outline, structural edit, and
distribution stages. Line editing matters, but thesis and structure usually
decide whether the essay is worth reading.

Do not start by asking, "What should I write today?" Start with:

```text
What did I notice that a serious builder would care about?
What is the non-obvious claim?
Why can only I write this version?
```

See [plan/writing-workflow/README.md](./plan/writing-workflow/README.md) for
the standalone workflow doc and
[plan/writing-workflow/github-issue.md](./plan/writing-workflow/github-issue.md)
for the GitHub issue draft.

## Documentation

- **[packages/guide/](./packages/guide/)** - Development guides
  - [Token Architecture](./packages/guide/tokens.md)
  - [Component Development](./packages/guide/components.md)
  - [Theming Guide](./packages/guide/theming.md)
- **[plan/](./plan/)** - Architecture decisions and implementation plans
  - [Writing Workflow](./plan/writing-workflow/README.md)

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Tokens**: Style Dictionary
- **Components**: React + CVA + Tailwind CSS
- **Documentation**: Storybook

## License

Private
