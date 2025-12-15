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

## Documentation

- **[packages/guide/](./packages/guide/)** - Development guides
  - [Token Architecture](./packages/guide/tokens.md)
  - [Component Development](./packages/guide/components.md)
  - [Theming Guide](./packages/guide/theming.md)
- **[plan/](./plan/)** - Architecture decisions and implementation plans

## Tech Stack

- **Monorepo**: Turborepo + pnpm
- **Tokens**: Style Dictionary
- **Components**: React + CVA + Tailwind CSS
- **Documentation**: Storybook

## License

Private
