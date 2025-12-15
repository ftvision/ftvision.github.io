# Agent Guide

Context for AI agents working on this codebase.

## Project Overview

Personal blog rebuild from Hugo/PaperMod to Next.js + MDX with a themeable design system.

## Tech Stack

- **Monorepo**: Turborepo + pnpm 9.15.0
- **Framework**: Next.js 14 (App Router) - planned
- **Language**: TypeScript 5.7 (strict mode)
- **Styling**: Tailwind CSS 3.4 + Design Tokens (Style Dictionary 4.2)
- **Components**: CVA for variants, Radix UI for complex patterns
- **Content**: MDX - planned
- **Documentation**: Storybook 8.4

## Package Structure

```
packages/
├── tokens/   # @blog/tokens - Design tokens (build first!)
├── ui/       # @blog/ui - Component library
├── config/   # @blog/config - Shared configs
└── guide/    # Development guides (markdown)

apps/
└── storybook/  # @blog/storybook - Component demos
```

## Key Commands

```bash
pnpm install                          # Install dependencies
pnpm --filter @blog/tokens build      # Build tokens (required first!)
pnpm dev                              # Run all dev servers
pnpm build                            # Build all packages
pnpm --filter @blog/storybook dev     # Run Storybook only
pnpm format                           # Format code
```

## Architecture

### Token System (3 Layers)

```
Primitives  →  Raw values (colors, spacing, typography)
Semantic    →  Meaningful names (bg-primary, text-muted)
Themes      →  Visual variations (NYT light/dark)
```

**Key files:**
- `packages/tokens/src/primitives/` - Raw values
- `packages/tokens/src/semantic/` - Semantic mappings
- `packages/tokens/src/themes/` - Theme overrides
- `packages/tokens/build/` - Generated output (don't edit)

### Component System (5 Layers)

```
Layer 5: Pages           → apps/blog/app/ (planned)
Layer 4: App Components  → apps/blog/components/ (planned)
Layer 3: Patterns        → packages/ui/ (Modal, Tabs, Accordion)
Layer 2: Primitives      → packages/ui/ (Button, Card, Input)
Layer 1: Tokens          → packages/tokens/
```

**Rules:**
- Lower layers never import from higher layers
- Components use semantic tokens, never primitives directly
- Stories co-located with components

## Component Patterns

### Creating Components

```tsx
// Use CVA for variants
const buttonVariants = cva('base-classes', {
  variants: { variant: {}, size: {} },
  defaultVariants: {},
});

// Use forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);

// Export variants for customization
export { Button, buttonVariants };
```

### Styling Classes

Use semantic token classes:

| Category | Example Classes |
|----------|-----------------|
| Background | `bg-ground-primary`, `bg-ground-secondary` |
| Text | `text-figure-primary`, `text-figure-muted` |
| Actions | `bg-action-primary`, `hover:bg-action-primary-hover` |
| Borders | `border-border`, `border-border-muted` |
| Status | `bg-status-success`, `text-status-danger` |

## Implementation Status

### Completed
- [x] Phase 1: Monorepo Foundation (Turborepo, pnpm, configs)
- [x] Phase 2: Token Architecture (3-layer system with NYT theme)
- [x] Phase 3: UI Package (22+ components with Storybook)

### Current
- [ ] Phase 4: Blog App Skeleton (Next.js setup)
- [ ] Phase 5: MDX Configuration

### Pending
- [ ] Phase 6: Content Migration (Hugo → MDX)
- [ ] Phase 7: Features & Polish
- [ ] Phase 8: Deployment

## Guidelines

1. **Build tokens first** - Required before other packages work
2. **Read before modifying** - Check existing patterns in similar components
3. **Use semantic tokens** - Never hardcode colors or use primitive tokens
4. **Co-locate stories** - `Button.stories.tsx` next to `Button.tsx`
5. **Export variants** - Allow consumers to customize with CVA
6. **forwardRef always** - All components support ref forwarding

## Documentation

### Development Guides
- [packages/guide/tokens.md](packages/guide/tokens.md) - Token system details
- [packages/guide/components.md](packages/guide/components.md) - Component patterns
- [packages/guide/theming.md](packages/guide/theming.md) - Theme creation

### Architecture
- [plan/ARCHITECTURE.md](plan/ARCHITECTURE.md) - System design
- [plan/IMPLEMENTATION_PLAN.md](plan/IMPLEMENTATION_PLAN.md) - Phase details
- [plan/MDX_COMPONENTS.md](plan/MDX_COMPONENTS.md) - MDX component specs

## Current Components

### Primitives
Button, Card, Input, Textarea, Select, Checkbox, Radio, Switch, Badge, Avatar, Separator

### Patterns
Modal, Tabs, Accordion, Dropdown, Tooltip, Toast

### Editorial
Blockquote, Figure, Byline, CodeBlock, InlineCode

## Theming

Themes applied via data attributes:

```html
<html data-theme="nyt" data-mode="light">
```

To test themes in Storybook, use the toolbar dropdowns.

## Legacy Content

- `content/` - Original Hugo markdown (reference only)
- `docs/` - Static export output (will be overwritten)
- `config.yml` - Hugo config (legacy)
