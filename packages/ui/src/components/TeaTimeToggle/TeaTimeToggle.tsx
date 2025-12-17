import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const teaTimeToggleVariants = cva(
  [
    'inline-flex items-center gap-2',
    'cursor-pointer',
    'transition-all duration-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        button: [
          'px-4 py-2 rounded-md',
          'bg-ground-secondary hover:bg-ground-tertiary',
          'text-text-secondary hover:text-text-primary',
        ],
        pill: [
          'px-3 py-1.5 rounded-full',
          'border border-ground-tertiary',
          'hover:border-accent-primary',
        ],
        minimal: [
          'hover:text-accent-primary',
        ],
        icon: [
          'p-2 rounded-full',
          'hover:bg-ground-secondary',
        ],
      },
      size: {
        sm: 'text-caption',
        md: 'text-body-sm',
        lg: 'text-body',
      },
    },
    compoundVariants: [
      {
        variant: 'icon',
        size: 'sm',
        className: 'p-1.5',
      },
      {
        variant: 'icon',
        size: 'lg',
        className: 'p-3',
      },
    ],
    defaultVariants: {
      variant: 'button',
      size: 'md',
    },
  }
);

export interface TeaTimeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof teaTimeToggleVariants> {
  /** Whether tea time mode is enabled */
  enabled?: boolean;
  /** Callback when toggle state changes */
  onToggle?: (enabled: boolean) => void;
  /** Label for the enabled state */
  enabledLabel?: string;
  /** Label for the disabled state */
  disabledLabel?: string;
  /** Whether to show the label */
  showLabel?: boolean;
  /** Whether to show the tea cup icon */
  showIcon?: boolean;
}

// Tea cup SVG icon component
const TeaCupIcon: React.FC<{ enabled: boolean; className?: string }> = ({ enabled, className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('w-5 h-5 transition-all duration-normal', className)}
    aria-hidden="true"
  >
    {/* Cup body */}
    <path d="M17 8H3a1 1 0 0 0-1 1v3c0 4.418 3.582 8 8 8h2c4.418 0 8-3.582 8-8V9a1 1 0 0 0-1-1z" />
    {/* Handle */}
    <path d="M17 9h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
    {/* Steam (animated when enabled) */}
    {enabled && (
      <>
        <path
          d="M6 5c0-1 .5-2 1.5-2s1.5 1 1.5 2"
          className="animate-[steam_2s_ease-in-out_infinite]"
          style={{ transformOrigin: '7.5px 4px' }}
        />
        <path
          d="M10 4c0-1 .5-2 1.5-2s1.5 1 1.5 2"
          className="animate-[steam_2s_ease-in-out_infinite_0.5s]"
          style={{ transformOrigin: '11.5px 3px' }}
        />
      </>
    )}
    {/* Tea leaves indicator when enabled */}
    {enabled && (
      <circle cx="10" cy="13" r="1" fill="currentColor" opacity="0.3" />
    )}
  </svg>
);

const TeaTimeToggle = React.forwardRef<HTMLButtonElement, TeaTimeToggleProps>(
  (
    {
      className,
      variant,
      size,
      enabled = false,
      onToggle,
      enabledLabel = '茶歇模式',
      disabledLabel = '茶歇模式',
      showLabel = true,
      showIcon = true,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      onToggle?.(!enabled);
    };

    // Apply active styling when enabled
    const activeStyles = enabled
      ? 'bg-accent-primary/10 text-accent-primary border-accent-primary'
      : '';

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={enabled ? `${enabledLabel} (enabled)` : `${disabledLabel} (disabled)`}
        className={cn(
          teaTimeToggleVariants({ variant, size }),
          activeStyles,
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {showIcon && (
          <TeaCupIcon
            enabled={enabled}
            className={cn(
              enabled && 'text-accent-primary',
              size === 'sm' && 'w-4 h-4',
              size === 'lg' && 'w-6 h-6'
            )}
          />
        )}
        {showLabel && variant !== 'icon' && (
          <span>{enabled ? enabledLabel : disabledLabel}</span>
        )}
      </button>
    );
  }
);
TeaTimeToggle.displayName = 'TeaTimeToggle';

// Hook for managing tea time mode state with localStorage persistence
export function useTeaTimeMode(defaultEnabled = false) {
  const [enabled, setEnabled] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return defaultEnabled;
    const stored = localStorage.getItem('tea-time-mode');
    return stored !== null ? stored === 'true' : defaultEnabled;
  });

  React.useEffect(() => {
    localStorage.setItem('tea-time-mode', String(enabled));

    // Apply tea time mode styles to document
    if (enabled) {
      document.documentElement.classList.add('tea-time-mode');
      document.documentElement.style.setProperty('--tea-time-scale', '1.1');
    } else {
      document.documentElement.classList.remove('tea-time-mode');
      document.documentElement.style.removeProperty('--tea-time-scale');
    }

    return () => {
      document.documentElement.classList.remove('tea-time-mode');
      document.documentElement.style.removeProperty('--tea-time-scale');
    };
  }, [enabled]);

  return [enabled, setEnabled] as const;
}

// CSS custom properties that should be applied when tea time mode is enabled
export const teaTimeModeStyles = `
  .tea-time-mode {
    /* Typography scaling */
    --tea-time-scale: 1.1;
    font-size: calc(100% * var(--tea-time-scale));

    /* Expanded margins */
    --spacing-content: calc(var(--spacing-base) * 1.5);

    /* Muted colors */
    --color-text-primary: color-mix(in srgb, var(--color-text-primary) 90%, transparent);

    /* Pause animations */
    --motion-duration-normal: 0ms;
    --motion-duration-swift: 0ms;
    --motion-duration-deliberate: 0ms;
  }

  .tea-time-mode * {
    animation-play-state: paused !important;
  }

  @keyframes steam {
    0%, 100% {
      opacity: 0.6;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-4px);
    }
  }
`;

export { TeaTimeToggle, teaTimeToggleVariants };
