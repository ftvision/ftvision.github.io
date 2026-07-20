# AGENTS.md

Repository guidance for coding agents. Keep this file short; follow links for
details only when the task needs them.

## What This Repo Is

This is Feitong Yang's personal blog and writing system: a Next.js/MDX blog app
inside a pnpm/Turborepo monorepo, with a reusable design system and bilingual
English/Chinese content.

Start here:

- Human-facing overview: `README.md`
- Blog/dev details: `CLAUDE.md`
- Architecture docs: `plan/ARCHITECTURE.md`, `plan/docs/DEVELOPER_GUIDE.md`
- Writing workflow: `plan/writing-workflow/README.md`

## Key Commands

```bash
pnpm install
pnpm --filter @blog/tokens build
pnpm --filter @blog/blog dev
pnpm --filter @blog/storybook dev
pnpm build
npx playwright test --project=blog
```

Use the narrowest relevant validation command. Build tokens after token changes.
Storybook-dependent tests require Storybook to be running.

## Project Map

- `apps/blog/` - Next.js blog app, routes, MDX content, blog components.
- `apps/blog/content/essays/` - essay MDX files.
- `apps/blog/content/periodics/` - digest/periodic MDX files.
- `apps/blog/content/series/` - series/resource MDX files.
- `packages/tokens/` - design tokens.
- `packages/ui/` - reusable UI components.
- `plan/` - planning, architecture, SEO, and writing workflow docs.

## Code Guidelines

- Follow existing patterns before creating new abstractions.
- Lower design-system layers must not import from higher layers.
- Use semantic token classes instead of hardcoded colors.
- For blog UI, use `type-*` typography classes for headings and body styles.
- Add or update tests when behavior changes; keep docs-only changes lightweight.

See `CLAUDE.md` and `plan/docs/DESIGN_SYSTEM.md` for detailed component,
theme, i18n, and testing guidance.

## Editorial Publication Design

For landing, Essays, Series, About, reading pages, bilingual typography, or
interactive publication surfaces, load
`.codex/skills/editorial-publication-design/SKILL.md` before editing. It routes
work through the canonical typography and responsive-composition contracts;
`design-qa.md` is visual-review history, not the current specification.

## Blog Writing Workflow

Use GitHub Issues as the lightweight source of truth for essay and personal-IP
writing work. Do not introduce GitHub Projects, Actions, Wiki pages, or heavier
process unless the user explicitly asks for them.

For essays, follow:

```text
Capture -> Thesis -> Angle -> Outline -> Draft -> Structural Edit -> Line Edit -> Package -> Distribute -> Learn
```

When the user wants to develop an essay, post, series, or distribution plan:

1. Start from an existing GitHub issue when one is provided.
2. If no issue exists, help draft a GitHub issue body before drafting prose.
3. Treat the issue as the canonical place for the raw idea, thesis,
   counterargument, target reader, angle, outline, packaging notes, and
   distribution plan.
4. Preserve the user's authorship. Prefer thesis sharpening, structure feedback,
   and line-level critique before writing long essay body text.
5. When prose enters the repository, use a branch and PR for MDX edits and link
   the PR back to the issue.

Issue shape:

```markdown
## Raw idea

## Thesis

## Strongest counterargument

## Target reader

## Angle

## Outline

## Draft / PR

## Packaging

## Distribution

## Learnings after publication
```

## Editing Safety

- Do not overwrite user-authored essay prose unless asked.
- Keep content metadata (`type`, `topics`, `lang`, `draft`) intentional.
- Do not add process for its own sake; issues should create focus, not replace
  writing.
