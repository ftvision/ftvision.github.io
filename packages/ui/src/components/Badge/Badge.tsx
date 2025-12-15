import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center font-medium',
    'transition-colors duration-fast',
  ],
  {
    variants: {
      variant: {
        default: 'bg-ground-tertiary text-figure-primary',
        primary: 'bg-action-primary text-figure-inverse',
        secondary: 'bg-ground-secondary text-figure-secondary border border-border',
        success: 'bg-status-success-bg text-status-success',
        warning: 'bg-status-warning-bg text-status-warning',
        danger: 'bg-status-danger-bg text-status-danger',
        info: 'bg-status-info-bg text-status-info',
        outline: 'border border-border text-figure-primary bg-transparent',
      },
      size: {
        sm: 'text-caption px-1.5 py-0.5 rounded',
        md: 'text-label px-2 py-0.5 rounded',
        lg: 'text-body-sm px-2.5 py-1 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to display before the text */
  icon?: React.ReactNode;
  /** If true, renders as a small dot indicator without text */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, dot, children, ...props }, ref) => {
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-block h-2 w-2 rounded-full',
            variant === 'primary' && 'bg-action-primary',
            variant === 'success' && 'bg-status-success',
            variant === 'warning' && 'bg-status-warning',
            variant === 'danger' && 'bg-status-danger',
            variant === 'info' && 'bg-status-info',
            (!variant || variant === 'default' || variant === 'secondary' || variant === 'outline') && 'bg-text-muted',
            className
          )}
          aria-hidden="true"
          {...props}
        />
      );
    }

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className="mr-1 -ml-0.5">{icon}</span>}
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
