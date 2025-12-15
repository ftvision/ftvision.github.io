# @blog/ui

React component library for the blog design system. Built with TypeScript, Tailwind CSS, and CVA for type-safe variants.

## Installation

This package is private and consumed via workspace dependencies.

```json
{
  "dependencies": {
    "@blog/ui": "workspace:*"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@blog/ui';

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary" size="md">
          Click me
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Primitives

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | primary, secondary, ghost, link | Interactive button |
| `Card` | - | Content container with header/footer |
| `Input` | - | Text input field |
| `Textarea` | - | Multi-line text input |
| `Select` | - | Dropdown select |
| `Checkbox` | - | Checkbox input |
| `Radio` | - | Radio button group |
| `Switch` | - | Toggle switch |
| `Badge` | default, secondary, success, warning, danger | Status indicator |

### Pattern Components

| Component | Description |
|-----------|-------------|
| `Accordion` | Expandable content sections |
| `Tabs` | Tab navigation |
| `Modal` | Dialog overlay |
| `Dropdown` | Dropdown menu |
| `Tooltip` | Hover tooltip |
| `Toast` | Notification system |
| `Separator` | Visual divider |

### Editorial Components

| Component | Description |
|-----------|-------------|
| `Blockquote` | Styled block quotes |
| `Figure` | Image with caption |
| `Byline` | Author attribution |
| `CodeBlock` | Syntax-highlighted code |
| `InlineCode` | Inline code styling |

## Component Patterns

All components follow these patterns:

- **forwardRef**: DOM ref access for all components
- **CVA variants**: Type-safe variant props
- **Semantic tokens**: Use design system colors/spacing
- **Accessible**: aria attributes, focus states

### Variant Pattern (CVA)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'bg-action-primary text-figure-inverse',
      secondary: 'bg-action-secondary text-figure-primary',
    },
    size: {
      sm: 'h-8 px-3',
      md: 'h-10 px-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
```

### Props Pattern

```tsx
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

## Utilities

### `cn()` - Class Name Utility

Merges class names with Tailwind conflict resolution:

```tsx
import { cn } from '@blog/ui/lib/utils';

cn('px-4 py-2', 'px-6'); // → 'py-2 px-6'
```

## Tailwind Configuration

The package extends Tailwind with semantic color classes:

| Category | Classes |
|----------|---------|
| Ground (bg) | `bg-ground-primary`, `bg-ground-secondary` |
| Figure (text) | `text-figure-primary`, `text-figure-muted` |
| Action | `bg-action-primary`, `hover:bg-action-primary-hover` |
| Status | `bg-status-success`, `text-status-danger` |

See [packages/guide/components.md](../guide/components.md) for detailed component guide.

## Scripts

```bash
pnpm lint       # ESLint check
pnpm typecheck  # TypeScript check
```

## File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx        # Component
│   │   ├── Button.stories.tsx # Storybook stories
│   │   └── index.ts          # Exports
│   └── ...
├── lib/
│   └── utils.ts              # cn() utility
└── index.tsx                 # Barrel exports
```
