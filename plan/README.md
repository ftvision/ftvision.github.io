# Blog Redesign Plan

## Overview

This directory contains the planning documentation for rebuilding the personal blog from Hugo/PaperMod to a Next.js + MDX design system approach.

## Documents

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, 5-layer design system, technology stack, directory structure |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Phase-by-phase implementation plan with tasks and validation checklists |
| [CONTENT_MIGRATION.md](./CONTENT_MIGRATION.md) | Content inventory, transformation rules, migration scripts |
| [MDX_COMPONENTS.md](./MDX_COMPONENTS.md) | Custom MDX component specifications and usage examples |

## Quick Summary

### Current State
- Hugo static site with PaperMod theme
- Markdown content (blog, collections, library, digests)
- Multi-language (zh/en)
- GitHub Pages deployment

### Target State
- Next.js 14 with App Router
- MDX for interactive content
- Design system monorepo (Turborepo + pnpm)
- Same GitHub Pages deployment

### Key Features
- Interactive MDX components (Callout, Tabs, CodeBlock, Diagram)
- Design tokens for consistent styling
- Reusable UI component library
- i18n support preserved
- Static export to `docs/`

## Implementation Phases

```
Phase 1: Monorepo Foundation     → Turborepo, pnpm, configs
Phase 2: UI Package              → Button, Card, Badge components
Phase 3: Blog App Skeleton       → Next.js with routing
Phase 4: MDX Configuration       → MDX pipeline setup
Phase 5: Content Pages           → Blog, collection, library pages
Phase 6: Content Migration       → Hugo markdown → MDX
Phase 7: Features & Polish       → Search, RSS, SEO
Phase 8: Deployment              → Static export, GitHub Pages
Phase 9: Cleanup                 → Remove Hugo, update docs
```

## Getting Started

Once you're ready to begin implementation:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for the big picture
2. Follow [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) phase by phase
3. Reference [CONTENT_MIGRATION.md](./CONTENT_MIGRATION.md) when moving content
4. Use [MDX_COMPONENTS.md](./MDX_COMPONENTS.md) for component guidelines

## Decisions Needed

Before starting, consider:

1. **Keep multi-language?** Current site has zh/en. Simplify to one?
2. **Digest archive?** Keep all 22 digests or consolidate?
3. **Design aesthetic?** Minimal like PaperMod or more visual?
4. **Interactive priorities?** Which MDX components are most important?

## Next Steps

1. Review and approve this plan
2. Set up the monorepo foundation (Phase 1)
3. Create the UI package (Phase 2)
4. Build the blog skeleton (Phase 3)
5. Iterate from there

---

*Created: 2024-12-13*
*Status: Planning*
