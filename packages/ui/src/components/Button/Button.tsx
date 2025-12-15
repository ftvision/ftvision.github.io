import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const buttonVariants = cva(
  // Base styles using design tokens
  // Using arbitrary values with CSS variables to ensure proper theming
  [
    'inline-flex items-center justify-center',
    '[border-width:var(--border-width-default)] [border-radius:var(--radius-default)]',
    '[font-family:var(--font-family-body)]',
    'transition-hover',
    'focus-visible:outline-none focus-visible:focus-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-action-primary [color:var(--color-text-inverse)] border-action-primary hover:bg-action-primary-hover hover:border-action-primary-hover',
        secondary:
          'bg-action-secondary text-figure-primary border-border hover:bg-action-secondary-hover',
        ghost: 'bg-transparent text-figure-primary border-transparent hover:bg-action-secondary hover:border-action-secondary',
        link: 'bg-transparent text-link border-transparent underline-offset-4 hover:underline hover:text-link-hover p-0 h-auto',
        danger:
          'bg-status-danger [color:var(--color-text-inverse)] border-status-danger hover:bg-status-danger/90',
      },
      size: {
        sm: 'h-8 px-inset-sm text-body-sm',
        md: 'h-10 px-inset-md text-body',
        lg: 'h-12 px-inset-lg text-body',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
