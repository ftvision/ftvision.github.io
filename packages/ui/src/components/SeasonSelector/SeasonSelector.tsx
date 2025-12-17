import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const seasonSelectorVariants = cva(
  [
    'inline-flex items-center gap-1',
    'transition-all duration-normal',
  ],
  {
    variants: {
      variant: {
        pills: 'p-1 bg-ground-secondary rounded-lg',
        tabs: 'border-b border-ground-tertiary',
        minimal: '',
      },
      size: {
        sm: 'text-caption',
        md: 'text-body-sm',
        lg: 'text-body',
      },
    },
    defaultVariants: {
      variant: 'pills',
      size: 'md',
    },
  }
);

const seasonButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5',
    'px-3 py-1.5 rounded-md',
    'transition-all duration-swift',
    'cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-1',
  ],
  {
    variants: {
      variant: {
        pills: 'hover:bg-ground-tertiary',
        tabs: 'rounded-none border-b-2 border-transparent hover:border-ground-tertiary -mb-px',
        minimal: 'hover:text-accent-primary',
      },
      active: {
        true: '',
        false: 'text-text-secondary',
      },
    },
    compoundVariants: [
      {
        variant: 'pills',
        active: true,
        className: 'bg-ground-primary shadow-sm text-text-primary font-medium',
      },
      {
        variant: 'tabs',
        active: true,
        className: 'border-accent-primary text-accent-primary font-medium',
      },
      {
        variant: 'minimal',
        active: true,
        className: 'text-accent-primary font-medium',
      },
    ],
    defaultVariants: {
      variant: 'pills',
      active: false,
    },
  }
);

// Season metadata with Chinese characters and representative colors
const seasonData: Record<Season, { chinese: string; english: string; emoji: string; colorClass: string }> = {
  spring: {
    chinese: '春',
    english: 'Spring',
    emoji: '🌸',
    colorClass: 'text-pink-500', // Plum blossom pink
  },
  summer: {
    chinese: '夏',
    english: 'Summer',
    emoji: '🪷',
    colorClass: 'text-pink-400', // Lotus pink
  },
  autumn: {
    chinese: '秋',
    english: 'Autumn',
    emoji: '🍂',
    colorClass: 'text-amber-500', // Chrysanthemum gold
  },
  winter: {
    chinese: '冬',
    english: 'Winter',
    emoji: '❄️',
    colorClass: 'text-red-600', // Plum red
  },
};

export interface SeasonSelectorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof seasonSelectorVariants> {
  /** Currently selected season */
  value?: Season | 'auto';
  /** Callback when season changes */
  onValueChange?: (season: Season | 'auto') => void;
  /** Whether to show auto option */
  showAuto?: boolean;
  /** Display mode */
  displayMode?: 'chinese' | 'english' | 'emoji' | 'full';
  /** Whether to show season colors on icons/emojis */
  showSeasonColors?: boolean;
}

const SeasonSelector = React.forwardRef<HTMLDivElement, SeasonSelectorProps>(
  (
    {
      className,
      variant = 'pills',
      size,
      value = 'auto',
      onValueChange,
      showAuto = true,
      displayMode = 'chinese',
      showSeasonColors = true,
      ...props
    },
    ref
  ) => {
    const seasons: (Season | 'auto')[] = showAuto
      ? ['auto', 'spring', 'summer', 'autumn', 'winter']
      : ['spring', 'summer', 'autumn', 'winter'];

    const getLabel = (season: Season | 'auto') => {
      if (season === 'auto') {
        return displayMode === 'english' ? 'Auto' : displayMode === 'emoji' ? '🔄' : '自动';
      }

      const data = seasonData[season];
      switch (displayMode) {
        case 'chinese':
          return data.chinese;
        case 'english':
          return data.english;
        case 'emoji':
          return data.emoji;
        case 'full':
          return `${data.chinese} ${data.english}`;
        default:
          return data.chinese;
      }
    };

    const getSeasonColor = (season: Season | 'auto', isActive: boolean) => {
      if (!showSeasonColors || season === 'auto') return undefined;
      if (!isActive) return undefined;

      // Return inline style for season-specific colors
      const colors: Record<Season, string> = {
        spring: '#ec4899', // Pink-500
        summer: '#f472b6', // Pink-400
        autumn: '#f59e0b', // Amber-500
        winter: '#dc2626', // Red-600
      };

      return { color: colors[season] };
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-label="Season selection"
        className={cn(seasonSelectorVariants({ variant, size }), className)}
        {...props}
      >
        {seasons.map((season) => {
          const isActive = value === season;
          const seasonColor = getSeasonColor(season, isActive);

          return (
            <button
              key={season}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={cn(seasonButtonVariants({ variant, active: isActive }))}
              style={seasonColor}
              onClick={() => onValueChange?.(season)}
            >
              {displayMode === 'full' && season !== 'auto' && (
                <span className="text-lg" aria-hidden="true">
                  {seasonData[season as Season].emoji}
                </span>
              )}
              <span>{getLabel(season)}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
SeasonSelector.displayName = 'SeasonSelector';

// Hook to get current season based on date
export function useCurrentSeason(): Season {
  const [season, setSeason] = React.useState<Season>(() => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  });

  React.useEffect(() => {
    // Update season at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) setSeason('spring');
      else if (month >= 5 && month <= 7) setSeason('summer');
      else if (month >= 8 && month <= 10) setSeason('autumn');
      else setSeason('winter');
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [season]);

  return season;
}

// Helper to resolve 'auto' to actual season
export function resolveSeasonValue(value: Season | 'auto', currentSeason: Season): Season {
  return value === 'auto' ? currentSeason : value;
}

export { SeasonSelector, seasonSelectorVariants, seasonButtonVariants };
