import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const scrollLandscapeVariants = cva(
  [
    'relative overflow-hidden',
    'transition-all duration-normal',
  ],
  {
    variants: {
      variant: {
        mountains: '', // Mountain silhouettes - default
        river: '',     // River/water flow pattern
        minimal: '',   // Simple line progression
      },
      position: {
        top: 'fixed top-0 left-0 right-0',
        bottom: 'fixed bottom-0 left-0 right-0',
        floating: 'fixed top-4 right-4 rounded-lg shadow-md',
      },
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-8',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'mountains',
      position: 'top',
      size: 'md',
    },
  }
);

export interface ScrollLandscapeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scrollLandscapeVariants> {
  /** Show percentage text */
  showPercentage?: boolean;
  /** Current scroll progress (0-100), auto-calculated if not provided */
  progress?: number;
  /** Element to track scroll on (defaults to window) */
  scrollRef?: React.RefObject<HTMLElement>;
}

/**
 * ScrollLandscape (山水进度) - Scroll Progress Indicator
 *
 * A progress indicator inspired by traditional Chinese landscape painting.
 * As you scroll, the landscape "unrolls" like a hand scroll (卷轴).
 *
 * The mountains variant shows silhouettes that reveal as you progress,
 * creating the effect of traveling through a landscape painting.
 */
const ScrollLandscape = React.forwardRef<HTMLDivElement, ScrollLandscapeProps>(
  (
    {
      className,
      variant,
      position,
      size,
      showPercentage = false,
      progress: controlledProgress,
      scrollRef,
      ...props
    },
    ref
  ) => {
    const [progress, setProgress] = React.useState(controlledProgress ?? 0);

    React.useEffect(() => {
      if (controlledProgress !== undefined) {
        setProgress(controlledProgress);
        return;
      }

      const handleScroll = () => {
        const element = scrollRef?.current ?? document.documentElement;
        const scrollTop = scrollRef?.current
          ? element.scrollTop
          : window.scrollY;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const newProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, newProgress)));
      };

      const target = scrollRef?.current ?? window;
      target.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation

      return () => target.removeEventListener('scroll', handleScroll);
    }, [controlledProgress, scrollRef]);

    const renderLandscape = () => {
      switch (variant) {
        case 'river':
          return <RiverVariant progress={progress} size={size} />;
        case 'minimal':
          return <MinimalVariant progress={progress} />;
        case 'mountains':
        default:
          return <MountainsVariant progress={progress} size={size} />;
      }
    };

    // Floating variant has different styling
    const isFloating = position === 'floating';

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className={cn(
          scrollLandscapeVariants({ variant, position, size }),
          isFloating && 'w-32 bg-ground-primary p-2',
          className
        )}
        style={{ zIndex: 'var(--z-landscape, 800)' }}
        {...props}
      >
        {renderLandscape()}

        {showPercentage && (
          <span
            className={cn(
              'absolute text-caption text-figure-muted',
              isFloating
                ? 'bottom-1 right-2'
                : 'right-2 top-1/2 -translate-y-1/2'
            )}
            aria-hidden="true"
          >
            {Math.round(progress)}%
          </span>
        )}
      </div>
    );
  }
);
ScrollLandscape.displayName = 'ScrollLandscape';

/**
 * Mountains Variant (山水)
 * Silhouettes of layered mountains that reveal as you scroll
 */
function MountainsVariant({
  progress,
  size,
}: {
  progress: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | null;
}) {
  const isLarge = size === 'lg' || size === 'xl';

  if (!isLarge) {
    // Simple bar for small sizes
    return (
      <div className="absolute inset-0 bg-ground-secondary">
        <div
          className="h-full bg-accent-primary transition-all duration-fast"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  // SVG landscape for large sizes
  return (
    <div className="absolute inset-0">
      {/* Background - unread area */}
      <div className="absolute inset-0 bg-ground-secondary" />

      {/* SVG Mountain landscape */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for atmospheric perspective */}
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-border-strong)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--color-border-strong)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-border-strong)" stopOpacity="0.3" />
          </linearGradient>

          {/* Clip path that reveals based on progress */}
          <clipPath id="progressClip">
            <rect x="0" y="0" width={`${progress}%`} height="100%" />
          </clipPath>
        </defs>

        {/* Far mountains (lighter, smaller) */}
        <path
          d="M0,40 L20,30 L40,35 L60,25 L80,32 L100,28 L120,35 L140,22 L160,30 L180,26 L200,33 L220,24 L240,30 L260,27 L280,34 L300,20 L320,28 L340,32 L360,25 L380,30 L400,35 L400,48 L0,48 Z"
          fill="var(--color-border-muted)"
          opacity="0.3"
          clipPath="url(#progressClip)"
        />

        {/* Mid mountains (medium) */}
        <path
          d="M0,44 L30,32 L50,38 L80,28 L110,36 L140,24 L170,34 L200,30 L230,38 L260,26 L290,34 L320,30 L350,36 L380,28 L400,34 L400,48 L0,48 Z"
          fill="var(--color-border-default)"
          opacity="0.5"
          clipPath="url(#progressClip)"
        />

        {/* Near mountains (darker, prominent) */}
        <path
          d="M0,48 L25,36 L50,42 L75,32 L100,40 L125,34 L150,44 L175,30 L200,38 L225,42 L250,34 L275,40 L300,36 L325,44 L350,32 L375,40 L400,38 L400,48 L0,48 Z"
          fill="url(#mountainGradient)"
          clipPath="url(#progressClip)"
        />

        {/* Subtle mist line */}
        <path
          d="M0,46 Q50,44 100,46 T200,44 T300,46 T400,44"
          stroke="var(--color-bg-primary)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.4"
          clipPath="url(#progressClip)"
        />
      </svg>

      {/* Progress line at the edge */}
      <div
        className="absolute top-0 bottom-0 w-px bg-accent-primary opacity-60"
        style={{ left: `${progress}%` }}
      />
    </div>
  );
}

/**
 * River Variant (江河)
 * Flowing water pattern that fills as you scroll
 */
function RiverVariant({
  progress,
  size,
}: {
  progress: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | null;
}) {
  const isLarge = size === 'lg' || size === 'xl';

  if (!isLarge) {
    // Simple wavy bar for small sizes
    return (
      <div className="absolute inset-0 bg-ground-secondary">
        <div
          className="h-full transition-all duration-fast"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--color-accent-secondary) 0%, var(--color-accent-tertiary) 100%)',
          }}
        />
      </div>
    );
  }

  // SVG river for large sizes
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-ground-secondary" />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-secondary)" />
            <stop offset="100%" stopColor="var(--color-accent-tertiary)" />
          </linearGradient>

          <clipPath id="riverClip">
            <rect x="0" y="0" width={`${progress}%`} height="100%" />
          </clipPath>
        </defs>

        {/* River flow with waves */}
        <path
          d="M0,24 Q25,18 50,24 T100,24 T150,24 T200,24 T250,24 T300,24 T350,24 T400,24 L400,48 L0,48 Z"
          fill="url(#riverGradient)"
          opacity="0.6"
          clipPath="url(#riverClip)"
        />

        {/* Wave ripples */}
        <path
          d="M0,28 Q20,24 40,28 T80,28 T120,28 T160,28 T200,28 T240,28 T280,28 T320,28 T360,28 T400,28"
          stroke="var(--color-accent-secondary)"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          clipPath="url(#riverClip)"
        />

        <path
          d="M0,36 Q30,32 60,36 T120,36 T180,36 T240,36 T300,36 T360,36 T400,36"
          stroke="var(--color-accent-tertiary)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
          clipPath="url(#riverClip)"
        />
      </svg>
    </div>
  );
}

/**
 * Minimal Variant
 * Simple brush-stroke-like progress line
 */
function MinimalVariant({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 bg-ground-secondary">
      <div
        className="h-full bg-border-strong transition-all duration-fast"
        style={{
          width: `${progress}%`,
          // Slight taper effect like a brush stroke
          clipPath: 'polygon(0 20%, 100% 0%, 100% 100%, 0 80%)',
        }}
      />
    </div>
  );
}

export { ScrollLandscape, scrollLandscapeVariants };
