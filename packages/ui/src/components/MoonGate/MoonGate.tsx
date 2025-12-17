import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const moonGateVariants = cva(
  [
    'relative overflow-hidden',
    'bg-ground-secondary',
  ],
  {
    variants: {
      variant: {
        // Complete circle (月门 - Moon Gate)
        full: 'rounded-full aspect-square',
        // Traditional arch shape
        arch: 'rounded-t-full',
        // Rectangular with rounded top (窗 - Window)
        window: 'rounded-t-[50%]',
      },
      size: {
        sm: 'w-[200px]',
        md: 'w-[300px]',
        lg: 'w-[400px]',
        full: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'full',
      size: 'md',
    },
  }
);

export interface MoonGateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof moonGateVariants> {
  /** Content to display inside the frame (usually an image) */
  children: React.ReactNode;
  /** Optional border styling */
  bordered?: boolean;
}

/**
 * MoonGate (月门) - Decorative frame inspired by Chinese garden architecture
 *
 * The moon gate is a circular opening in a wall, used in Chinese gardens
 * to frame views and create a sense of passage between spaces.
 */
const MoonGate = React.forwardRef<HTMLDivElement, MoonGateProps>(
  ({ className, variant, size, bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          moonGateVariants({ variant, size, className }),
          bordered && 'ring-2 ring-border ring-offset-2 ring-offset-ground-primary'
        )}
        {...props}
      >
        {/* Inner content wrapper - ensures content fills the shape */}
        <div
          className={cn(
            'w-full h-full',
            variant === 'full' && 'rounded-full overflow-hidden',
            variant === 'arch' && 'rounded-t-full overflow-hidden',
            variant === 'window' && 'rounded-t-[50%] overflow-hidden'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
MoonGate.displayName = 'MoonGate';

export { MoonGate, moonGateVariants };
