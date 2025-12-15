import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const calloutVariants = cva(
  'border-l-4 p-4 my-4 rounded-r font-body',
  {
    variants: {
      type: {
        info: 'bg-status-info-bg border-status-info text-figure-primary',
        success: 'bg-status-success-bg border-status-success text-figure-primary',
        warning: 'bg-status-warning-bg border-status-warning text-figure-primary',
        danger: 'bg-status-danger-bg border-status-danger text-figure-primary',
        note: 'bg-ground-secondary border-border-strong text-figure-primary',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

const calloutIcons: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  danger: '🚫',
  note: '📝',
};

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, type = 'info', title, children, ...props }, ref) => {
    const icon = calloutIcons[type || 'info'];

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ type }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
          <div className="flex-1 min-w-0">
            {title && (
              <p className="font-semibold mb-1 font-heading">{title}</p>
            )}
            <div className="text-body-sm">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
Callout.displayName = 'Callout';

export { Callout, calloutVariants };
