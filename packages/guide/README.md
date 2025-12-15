# Development Guide

Guides for using and developing the blog design system packages.

## Guides

| Guide | Description |
|-------|-------------|
| [Token Architecture](./tokens.md) | 3-layer token system, adding tokens |
| [Component Development](./components.md) | Creating components, CVA patterns, styling |
| [Theming Guide](./theming.md) | Creating themes, light/dark mode |

## Quick Reference

### Token Layers

```
Primitives  →  Raw values (colors, sizes)
Semantic    →  Meaningful names (bg-primary)
Themes      →  Visual variations (NYT light/dark)
```

### Component Layers

```
Layer 3: Patterns   →  Modal, Tabs, Accordion
Layer 2: Primitives →  Button, Card, Input
Layer 1: Tokens     →  CSS variables
```

### Key Files

| File | Purpose |
|------|---------|
| `packages/tokens/src/primitives/*.json` | Raw token values |
| `packages/tokens/src/semantic/*.json` | Semantic mappings |
| `packages/tokens/src/themes/*/` | Theme overrides |
| `packages/ui/src/components/*/` | UI components |
| `packages/ui/tailwind.config.js` | Tailwind token integration |

## Live Examples

Run Storybook to see components in action:

```bash
pnpm --filter @blog/storybook dev
```

## Related

- [plan/ARCHITECTURE.md](../../plan/ARCHITECTURE.md) - System architecture
- [plan/IMPLEMENTATION_PLAN.md](../../plan/IMPLEMENTATION_PLAN.md) - Implementation phases
