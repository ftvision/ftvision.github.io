import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const brushDividerVariants = cva('w-full overflow-hidden', {
  variants: {
    variant: {
      horizontal: '',
      wave: '',
      dot: '',
      flick: '',
    },
    brushColor: {
      ink: '[--brush-color:var(--color-border-strong)]',
      accent: '[--brush-color:var(--color-accent-primary)]',
      muted: '[--brush-color:var(--color-border-muted)]',
    },
    spacing: {
      none: '',
      sm: 'my-4',
      md: 'my-6',
      lg: 'my-8',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
    brushColor: 'ink',
    spacing: 'md',
  },
});

export interface BrushDividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof brushDividerVariants> {
  /** Animate the stroke drawing */
  animated?: boolean;
  /** When to trigger animation */
  triggerOn?: 'mount' | 'viewport';
}

const BrushDivider = React.forwardRef<HTMLDivElement, BrushDividerProps>(
  ({ className, variant, brushColor, spacing, animated = false, triggerOn = 'mount', ...props }, ref) => {
    // Start invisible if animated, visible if not animated
    const [isVisible, setIsVisible] = React.useState(!animated);
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const dividerRef = React.useRef<HTMLDivElement>(null);

    // Viewport intersection observer
    React.useEffect(() => {
      if (!animated || triggerOn !== 'viewport' || hasAnimated) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        },
        { threshold: 0.5 }
      );

      const element = dividerRef.current;
      if (element) {
        observer.observe(element);
      }

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }, [animated, triggerOn, hasAnimated]);

    // Mount animation - trigger visibility after a short delay
    React.useEffect(() => {
      if (animated && triggerOn === 'mount') {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
      }
    }, [animated, triggerOn]);

    const renderPath = () => {
      const strokeWidth = 2;
      const height = variant === 'dot' ? 8 : 4;

      switch (variant) {
        case 'wave':
          return (
            <svg
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              className="w-full h-2"
              aria-hidden="true"
            >
              <path
                d="M0,4 Q25,0 50,4 T100,4 T150,4 T200,4"
                fill="none"
                stroke="var(--brush-color)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className={cn(
                  animated && 'transition-all duration-deliberate ease-reveal',
                  animated && !isVisible && 'opacity-0 [stroke-dasharray:200] [stroke-dashoffset:200]',
                  animated && isVisible && 'opacity-100 [stroke-dasharray:200] [stroke-dashoffset:0]'
                )}
              />
            </svg>
          );

        case 'dot':
          return (
            <div className="flex items-center justify-center gap-3" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full bg-[var(--brush-color)]',
                    animated && 'transition-all duration-normal',
                    animated && !isVisible && 'scale-0 opacity-0',
                    animated && isVisible && 'scale-100 opacity-100'
                  )}
                  style={{
                    transitionDelay: animated ? `${i * 100}ms` : undefined,
                  }}
                />
              ))}
            </div>
          );

        case 'flick':
          return (
            <svg
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              className="w-full h-2"
              aria-hidden="true"
            >
              <path
                d="M0,4 L180,4 Q190,4 195,7"
                fill="none"
                stroke="var(--brush-color)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className={cn(
                  animated && 'transition-all duration-deliberate ease-enter',
                  animated && !isVisible && 'opacity-0 [stroke-dasharray:200] [stroke-dashoffset:200]',
                  animated && isVisible && 'opacity-100 [stroke-dasharray:200] [stroke-dashoffset:0]'
                )}
              />
            </svg>
          );

        case 'horizontal':
        default:
          return (
            <svg
              viewBox="0 0 200 4"
              preserveAspectRatio="none"
              className="w-full h-1"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="2"
                x2="200"
                y2="2"
                stroke="var(--brush-color)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className={cn(
                  animated && 'transition-all duration-slow ease-enter',
                  animated && !isVisible && 'opacity-0 [stroke-dasharray:200] [stroke-dashoffset:200]',
                  animated && isVisible && 'opacity-100 [stroke-dasharray:200] [stroke-dashoffset:0]'
                )}
              />
            </svg>
          );
      }
    };

    return (
      <div
        ref={(node) => {
          // Handle both refs
          (dividerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="separator"
        className={cn(brushDividerVariants({ variant, brushColor, spacing, className }))}
        {...props}
      >
        {renderPath()}
      </div>
    );
  }
);
BrushDivider.displayName = 'BrushDivider';

export { BrushDivider, brushDividerVariants };
