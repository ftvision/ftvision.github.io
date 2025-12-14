# Agent Guide

This document provides context for AI agents working on this codebase.

## Project Overview

Personal blog rebuild from Hugo/PaperMod to Next.js + MDX with a design system monorepo.

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS + Design Tokens
- **Content**: MDX

## Directory Structure

```
sarajevo/
├── packages/
│   ├── config/          # Shared TypeScript & Tailwind configs
│   ├── tokens/          # Design tokens (Style Dictionary)
│   └── ui/              # Component library (to be created)
├── apps/
│   └── blog/            # Next.js blog app (to be created)
├── content/             # Legacy Hugo content (reference only)
├── docs/                # Static export output (GitHub Pages)
├── plan/                # Architecture and implementation docs
├── package.json         # Workspace root
├── pnpm-workspace.yaml  # Workspace packages
└── turbo.json           # Build orchestration
```

## Package Naming

- `@blog/config` - Shared configs
- `@blog/tokens` - Design tokens
- `@blog/ui` - UI components (to be created)
- `@blog/blog` - Next.js app (to be created)

## Import Conventions

Always use absolute imports with path aliases:

```typescript
// In packages/ui - use @ui/*
import { cn } from '@ui/lib/utils';

// In apps/blog - use @/*
import { PostCard } from '@/components/PostCard';
import { Card } from '@blog/ui';
```

## Key Commands

```bash
# Install dependencies
pnpm install

# Build tokens (required before other packages)
pnpm --filter @blog/tokens build

# Run all dev servers
pnpm dev

# Build all packages
pnpm build

# Clean all build artifacts
pnpm clean
```

## Implementation Status

### Completed
- [x] Phase 1: Monorepo Foundation
  - Root workspace configuration
  - packages/config (TypeScript configs)
  - packages/tokens (Style Dictionary)

### Pending
- [ ] Phase 2: UI Package
- [ ] Phase 3: Blog App Skeleton
- [ ] Phase 4: MDX Configuration
- [ ] Phase 5: Content Pages
- [ ] Phase 6: Content Migration
- [ ] Phase 7: Features & Polish
- [ ] Phase 8: Deployment
- [ ] Phase 9: Cleanup

## Architecture

5-layer design system:

```
Layer 5: Pages           → apps/blog/app/
Layer 4: App Components  → apps/blog/components/
Layer 3: Patterns        → packages/ui/ (complex)
Layer 2: Primitives      → packages/ui/ (basic)
Layer 1: Tokens          → packages/tokens/
```

**Rule**: Lower layers never import from higher layers.

## Planning Documents

See `plan/` directory for detailed documentation:

- `ARCHITECTURE.md` - System architecture and tech decisions
- `IMPLEMENTATION_PLAN.md` - Phase-by-phase tasks
- `CONTENT_MIGRATION.md` - Hugo to MDX migration guide
- `MDX_COMPONENTS.md` - Custom component specifications

## Guidelines for Agents

1. **Read the plan first**: Check `plan/` docs before making architectural decisions
2. **Use absolute imports**: Never use relative imports like `./` or `../`
3. **Build tokens first**: Always run `pnpm --filter @blog/tokens build` before other packages
4. **Follow the layers**: Keep business logic in app components, not UI primitives
5. **Minimal changes**: Don't over-engineer; only add what's needed
6. **Test incrementally**: Verify each phase works before proceeding

## Legacy Content

The `content/` directory contains the original Hugo markdown files. These are for reference during migration only. Do not modify them directly.

The `docs/` directory is the static export target for GitHub Pages. It will be overwritten by Next.js builds once migration is complete.
