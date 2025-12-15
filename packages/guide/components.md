# Component Development Guide

This guide covers how to build and extend components in the `@blog/ui` package.

## Component Structure

Each component follows a consistent file structure:

```
src/components/Button/
├── Button.tsx          # Component implementation
├── Button.stories.tsx  # Storybook stories
└── index.ts            # Public exports
```

## Creating a New Component

### 1. Create the Component File

```tsx
// src/components/MyComponent/MyComponent.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

// Define variants using CVA
const myComponentVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-ground-secondary text-figure-primary',
        primary: 'bg-action-primary text-figure-inverse',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Props interface
export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Additional custom props
}

// Component with forwardRef
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
MyComponent.displayName = 'MyComponent';

export { MyComponent, myComponentVariants };
```

### 2. Create the Index File

```tsx
// src/components/MyComponent/index.ts
export { MyComponent, myComponentVariants } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### 3. Add to Package Exports

```tsx
// src/index.tsx
export {
  MyComponent,
  myComponentVariants,
  type MyComponentProps,
} from '@ui/components/MyComponent';
```

### 4. Create Stories

```tsx
// src/components/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Component',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <MyComponent size="sm">Small</MyComponent>
      <MyComponent size="md">Medium</MyComponent>
      <MyComponent size="lg">Large</MyComponent>
    </div>
  ),
};
```

## Styling with Semantic Tokens

### Color Classes

Use the figure-ground naming system:

| Category | Tailwind Class | Use Case |
|----------|---------------|----------|
| Ground | `bg-ground-primary` | Main backgrounds |
| Ground | `bg-ground-secondary` | Secondary surfaces |
| Figure | `text-figure-primary` | Primary text |
| Figure | `text-figure-muted` | Muted/placeholder text |
| Action | `bg-action-primary` | Primary buttons |
| Action | `hover:bg-action-primary-hover` | Button hover |
| Border | `border-border` | Default borders |
| Status | `bg-status-success` | Success states |

### Spacing Classes

Semantic spacing categories:

```tsx
// Vertical spacing
<div className="space-y-stack-md">

// Horizontal spacing
<div className="space-x-inline-sm">

// Padding
<div className="p-inset-md">

// Grid gaps
<div className="gap-gutter-md">
```

### Typography Classes

```tsx
// Headings
<h1 className="font-heading text-display font-display">

// Body text
<p className="font-body text-body leading-body">

// Code
<code className="font-code text-body-sm">
```

## The `cn()` Utility

The `cn()` utility merges class names and handles Tailwind conflicts:

```tsx
import { cn } from '@ui/lib/utils';

// Merges classes, later values win
cn('px-4 py-2', 'px-6');
// → 'py-2 px-6'

// Handles conditionals
cn('base-class', isActive && 'active-class');

// Works with CVA
cn(buttonVariants({ variant, size }), className);
```

## Compound Components

For complex components, use the compound pattern:

```tsx
// Modal example
const Modal = ({ children }) => { ... };
const ModalTrigger = ({ children }) => { ... };
const ModalContent = ({ children }) => { ... };
const ModalHeader = ({ children }) => { ... };
const ModalTitle = ({ children }) => { ... };
const ModalBody = ({ children }) => { ... };
const ModalFooter = ({ children }) => { ... };
const ModalClose = ({ children }) => { ... };

// Usage
<Modal>
  <ModalTrigger>
    <Button>Open</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
    </ModalHeader>
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <ModalClose>
        <Button>Close</Button>
      </ModalClose>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## Accessibility

### Focus States

All interactive components include focus-visible styles:

```tsx
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2'
```

### ARIA Attributes

Add appropriate ARIA attributes:

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  aria-haspopup="true"
>
```

### Keyboard Navigation

Support keyboard interaction:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggle();
  }
  if (e.key === 'Escape') {
    close();
  }
};
```

## Testing Components

### In Storybook

1. Run Storybook: `pnpm --filter @blog/docs dev`
2. View at `http://localhost:6006`
3. Test variants and interactions
4. Verify theme switching works

### Type Checking

```bash
pnpm --filter @blog/ui typecheck
```

### Linting

```bash
pnpm --filter @blog/ui lint
```

## Component Categories

### Primitives (Layer 2)

Basic building blocks with no internal dependencies:

- Button, Input, Textarea, Select
- Checkbox, Radio, Switch
- Card, Badge, Avatar, Separator

### Patterns (Layer 3)

Complex components that compose primitives:

- Modal, Dropdown, Tooltip, Toast
- Tabs, Accordion
- May use Radix UI for accessibility

### Editorial (Specialized)

Content-focused components:

- Blockquote, Figure, Byline
- CodeBlock, InlineCode

## Best Practices

1. **Always use forwardRef** - Enables ref forwarding to DOM
2. **Export variants** - Allow external customization
3. **Use semantic tokens** - Never hardcode colors
4. **Co-locate stories** - Keep stories with components
5. **Type everything** - Export prop interfaces
6. **Accessible by default** - Include ARIA, focus states
