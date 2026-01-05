import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const calloutVariants = cva(
  // Base styles: bordered container with semantic spacing
  'rounded-[var(--radius-default)] my-stack-md border-solid',
  {
    variants: {
      type: {
        info: 'bg-status-info-bg border-status-info text-figure-primary',
        success: 'bg-status-success-bg border-status-success text-figure-primary',
        warning: 'bg-status-warning-bg border-status-warning text-figure-primary',
        danger: 'bg-status-danger-bg border-status-danger text-figure-primary',
        note: 'bg-ground-secondary border-border-strong text-figure-primary',
      },
      border: {
        bold: 'border-l-4 border-t-0 border-r-0 border-b-0',
        subtle: 'border-l border-t-0 border-r-0 border-b-0',
        full: 'border',
      },
      size: {
        sm: 'p-inset-sm text-body-sm',
        md: 'p-inset-md text-body',
        lg: 'p-inset-lg text-body-lg',
      },
    },
    defaultVariants: {
      type: 'info',
      border: 'bold',
      size: 'md',
    },
  }
);

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, type, border, size, title, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ type, border, size }), className)}
        {...props}
      >
        {title && (
          <p className="font-semibold mb-stack-xs font-heading">{title}</p>
        )}
        <div>{children}</div>
      </div>
    );
  }
);
Callout.displayName = 'Callout';

export { Callout, calloutVariants };
