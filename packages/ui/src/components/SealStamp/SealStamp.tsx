import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const sealStampVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-bold select-none',
    'transition-transform duration-normal',
  ],
  {
    variants: {
      variant: {
        round: 'rounded-full',
        square: 'rounded-sm',
      },
      stampStyle: {
        // Relief (朱文): Red background (text color set via inline style to avoid tailwind-merge conflicts)
        relief: 'bg-accent-primary',
        // Intaglio (白文): White background with red outline (text color set via inline style)
        intaglio: 'bg-ground-primary border-2 border-accent-primary',
      },
      size: {
        sm: 'w-8 h-8 text-caption',
        md: 'w-12 h-12 text-body-sm',
        lg: 'w-16 h-16 text-body',
      },
    },
    defaultVariants: {
      variant: 'square',
      stampStyle: 'relief',
      size: 'md',
    },
  }
);

export interface SealStampProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof sealStampVariants> {
  /** The name to display (1-4 Chinese characters recommended) */
  name: string;
  /** Animation on mount - stamp effect */
  animated?: boolean;
}

const SealStamp = React.forwardRef<HTMLSpanElement, SealStampProps>(
  ({ className, variant, stampStyle = 'relief', size, name, animated = false, style, ...props }, ref) => {
    const [isStamped, setIsStamped] = React.useState(!animated);

    React.useEffect(() => {
      if (animated) {
        // Small delay before stamp animation
        const timer = setTimeout(() => {
          setIsStamped(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }, [animated]);

    // Determine text color based on stamp style
    // Using inline style to avoid tailwind-merge conflicts between text-* classes
    const textColorStyle = stampStyle === 'relief'
      ? { color: 'var(--color-text-inverse)' }  // Light text on dark (red) background
      : { color: 'var(--color-accent-primary)' }; // Red text on light background

    return (
      <span
        ref={ref}
        className={cn(
          sealStampVariants({ variant, stampStyle, size }),
          animated && !isStamped && 'scale-150 opacity-0',
          animated && isStamped && 'scale-100 opacity-100',
          className
        )}
        style={{ ...textColorStyle, ...style }}
        aria-label={`Seal stamp: ${name}`}
        {...props}
      >
        {/* Limit display to first 4 characters */}
        <span className="leading-none">{name.slice(0, 4)}</span>
      </span>
    );
  }
);
SealStamp.displayName = 'SealStamp';

export { SealStamp, sealStampVariants };
