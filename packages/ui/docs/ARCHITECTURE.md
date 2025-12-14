# UI Package Architecture

## Overview

`@blog/ui` is the shared component library for the blog design system. It provides primitive and pattern components that consume design tokens from `@blog/tokens`.

## Layer Model

```
Layer 3: Patterns    → Callout, (future: Tabs, Modal, Accordion)
Layer 2: Primitives  → Button, Card
Layer 1: Tokens      → @blog/tokens (colors, typography, spacing)
```

**Rule**: Components only import from same or lower layers.

## Component Structure

Each component lives in its own folder with co-located stories:

```
src/components/
├── Button/
│   ├── Button.tsx         # Component implementation
│   ├── Button.stories.tsx # Storybook stories
│   └── index.ts           # Public exports
```

## Technology Choices

| Tool | Purpose |
|------|---------|
| CVA (class-variance-authority) | Variant management for component styles |
| Tailwind CSS | Utility-first styling with semantic tokens |
| forwardRef | All components support ref forwarding |
| TypeScript | Full type safety |

## Styling Approach

Components use Tailwind classes that map to CSS custom properties from `@blog/tokens`:

```tsx
// Button uses semantic token classes
<button className="bg-action-primary text-figure-inverse hover:bg-action-primary-hover">
```

### Color Categories

| Category | Purpose | Tailwind prefix |
|----------|---------|-----------------|
| `ground` | Background/surface colors | `bg-ground-*` |
| `figure` | Text/foreground colors | `text-figure-*` |
| `border` | Border colors | `border-border-*` |
| `action` | Interactive elements | `bg-action-*`, `text-action-*` |
| `status` | Semantic feedback | `bg-status-*`, `text-status-*` |

See [Design Language](./DESIGN_LANGUAGE.md) for the ground/figure naming rationale.

## Adding a New Component

1. Create folder: `src/components/ComponentName/`
2. Add implementation: `ComponentName.tsx`
3. Add stories: `ComponentName.stories.tsx`
4. Add barrel export: `index.ts`
5. Export from `src/index.tsx`

### Component Template

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        default: 'default-classes',
      },
      size: {
        md: 'size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Component.displayName = 'Component';

export { Component, componentVariants };
```

## Utilities

### `cn()` - Class Name Merger

Located in `src/lib/utils.ts`, combines `clsx` and `tailwind-merge`:

```tsx
import { cn } from '@ui/lib/utils';

// Merges classes and resolves Tailwind conflicts
cn('px-4 py-2', 'px-6', className) // → 'py-2 px-6 ...'
```

## Dependencies

- `@blog/tokens` - Design tokens (CSS custom properties)
- `class-variance-authority` - Variant management
- `clsx` - Conditional class joining
- `tailwind-merge` - Tailwind class conflict resolution
