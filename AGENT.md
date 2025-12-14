# Agent Guide

Context for AI agents working on this codebase.

## Project Overview

Personal blog rebuild from Hugo/PaperMod to Next.js + MDX with a themeable design system.

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS + Design Tokens (Style Dictionary)
- **Components**: CVA for variants, Radix UI for complex patterns
- **Content**: MDX

## Package Naming

- `@blog/config` - Shared configs
- `@blog/tokens` - Design tokens (primitives → semantic → themes)
- `@blog/ui` - UI components
- `@blog/blog` - Next.js app

## Key Commands

```bash
pnpm install                          # Install dependencies
pnpm --filter @blog/tokens build      # Build tokens (run first)
pnpm dev                              # Run all dev servers
pnpm build                            # Build all packages
```

## Architecture

5-layer design system with multi-theme support:

```
Layer 5: Pages           → apps/blog/app/
Layer 4: App Components  → apps/blog/components/
Layer 3: Patterns        → packages/ui/ (Tabs, Modal - uses Radix)
Layer 2: Primitives      → packages/ui/ (Button, Card, Callout)
Layer 1: Tokens          → packages/tokens/
```

**Rules:**
- Lower layers never import from higher layers
- Themes remap semantic tokens, not primitives
- Stories co-located with components

See [plan/ARCHITECTURE.md](plan/ARCHITECTURE.md) for details.

## Implementation Status

### Completed
- [x] Phase 1: Monorepo Foundation

### Current
- [ ] Phase 2: Token Architecture (primitives → semantic → themes)
- [ ] Phase 3: UI Package (Button, Card, Callout + Storybook)

### Pending
- [ ] Phase 4: Blog App Skeleton
- [ ] Phase 5+: MDX, Content Migration, Features

See [plan/IMPLEMENTATION_PLAN.md](plan/IMPLEMENTATION_PLAN.md) for details.

## Guidelines

1. **Read the plan first** - Check `plan/` docs before architectural decisions
2. **Minimal by default** - Only add what's needed
3. **Use absolute imports** - `@ui/*` in packages/ui, `@/*` in apps/blog
4. **Build tokens first** - Required before other packages
5. **Co-locate stories** - `Button.stories.tsx` next to `Button.tsx`

## Planning Documents

- [ARCHITECTURE.md](plan/ARCHITECTURE.md) - System architecture, token model, tech decisions
- [IMPLEMENTATION_PLAN.md](plan/IMPLEMENTATION_PLAN.md) - Phase-by-phase tasks
- [MDX_COMPONENTS.md](plan/MDX_COMPONENTS.md) - Custom component specifications
- [CONTENT_MIGRATION.md](plan/CONTENT_MIGRATION.md) - Hugo to MDX migration

## Legacy Content

- `content/` - Original Hugo markdown (reference only, do not modify)
- `docs/` - Static export output (will be overwritten by Next.js builds)
