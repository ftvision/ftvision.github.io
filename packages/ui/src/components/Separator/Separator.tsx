import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const separatorVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    },
    decorative: {
      true: '',
      false: '',
    },
    variant: {
      default: 'bg-border',
      muted: 'bg-border-muted',
      strong: 'bg-border-strong',
    },
    spacing: {
      none: '',
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    // Horizontal spacing
    { orientation: 'horizontal', spacing: 'sm', className: 'my-2' },
    { orientation: 'horizontal', spacing: 'md', className: 'my-4' },
    { orientation: 'horizontal', spacing: 'lg', className: 'my-6' },
    // Vertical spacing
    { orientation: 'vertical', spacing: 'sm', className: 'mx-2' },
    { orientation: 'vertical', spacing: 'md', className: 'mx-4' },
    { orientation: 'vertical', spacing: 'lg', className: 'mx-6' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    decorative: true,
    variant: 'default',
    spacing: 'none',
  },
});

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof separatorVariants> {
  /** Label to display in the middle of the separator */
  label?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, variant, spacing, label, ...props }, ref) => {
    // If there's a label, render a more complex separator
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-3',
            orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
            spacing === 'sm' && (orientation === 'horizontal' ? 'my-2' : 'mx-2'),
            spacing === 'md' && (orientation === 'horizontal' ? 'my-4' : 'mx-4'),
            spacing === 'lg' && (orientation === 'horizontal' ? 'my-6' : 'mx-6'),
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'flex-1',
              variant === 'muted' && 'bg-border-muted',
              variant === 'strong' && 'bg-border-strong',
              (!variant || variant === 'default') && 'bg-border',
              orientation === 'horizontal' ? 'h-px' : 'w-px'
            )}
            aria-hidden="true"
          />
          <span className="text-caption text-figure-muted shrink-0 px-2">
            {label}
          </span>
          <div
            className={cn(
              'flex-1',
              variant === 'muted' && 'bg-border-muted',
              variant === 'strong' && 'bg-border-strong',
              (!variant || variant === 'default') && 'bg-border',
              orientation === 'horizontal' ? 'h-px' : 'w-px'
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(separatorVariants({ orientation, variant, spacing, className }))}
        {...props}
      />
    );
  }
);
Separator.displayName = 'Separator';

export { Separator, separatorVariants };
