import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const tableOfContentsVariants = cva(
  [
    'flex flex-col',
    'transition-all duration-normal',
    // Use navigation tokens for border (theme-aware)
    '[border-left-width:var(--navigation-toc-border-width)]',
    '[border-left-color:var(--navigation-toc-border-color)]',
    '[border-left-style:solid]',
  ],
  {
    variants: {
      variant: {
        default: 'space-y-2 pl-4',
        scroll: 'space-y-3 pl-4',
        compact: 'space-y-1 pl-4',
      },
      position: {
        inline: '',
        sticky: 'sticky top-4',
        fixed: 'fixed right-4 top-16',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'inline',
    },
  }
);

const tocItemVariants = cva(
  [
    'block py-1 px-2 rounded-sm',
    'text-body-sm',
    'transition-all duration-swift',
    'cursor-pointer',
    'hover:bg-ground-secondary',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
    // Use navigation tokens for item colors (theme-aware)
    '[color:var(--navigation-toc-item-text)]',
  ],
  {
    variants: {
      level: {
        1: 'font-medium',
        2: 'pl-4',
        3: 'pl-8 text-caption',
      },
      active: {
        // Use navigation tokens for active state (theme-aware)
        true: '[background-color:var(--navigation-toc-active-bg)] [color:var(--navigation-toc-active-text)] font-medium',
        false: '',
      },
    },
    defaultVariants: {
      level: 1,
      active: false,
    },
  }
);

export interface TocItem {
  /** Unique identifier for the heading */
  id: string;
  /** The heading text */
  title: string;
  /** Heading level (1-3) */
  level: 1 | 2 | 3;
}

export interface TableOfContentsProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof tableOfContentsVariants> {
  /** Array of table of contents items */
  items: TocItem[];
  /** Currently active item ID */
  activeId?: string;
  /** Callback when an item is clicked */
  onItemClick?: (id: string) => void;
  /** Label for the table of contents */
  label?: string;
  /** Whether to show the title/label */
  showTitle?: boolean;
  /** Whether to use smooth scrolling */
  smoothScroll?: boolean;
  /** Active marker style */
  markerStyle?: 'dot' | 'seal' | 'line' | 'none';
}

const TableOfContents = React.forwardRef<HTMLElement, TableOfContentsProps>(
  (
    {
      className,
      variant,
      position,
      items,
      activeId,
      onItemClick,
      label = '目录',
      showTitle = true,
      smoothScroll = true,
      markerStyle = 'line',
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (smoothScroll) {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      onItemClick?.(id);
    };

    const getMarker = (isActive: boolean) => {
      if (!isActive || markerStyle === 'none') return null;

      switch (markerStyle) {
        case 'dot':
          return (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full mr-2"
              style={{ backgroundColor: 'var(--navigation-toc-active-border)' }}
              aria-hidden="true"
            />
          );
        case 'seal':
          return (
            <span
              className="inline-block w-2 h-2 rounded-sm mr-2"
              style={{ backgroundColor: 'var(--navigation-toc-active-border)' }}
              aria-hidden="true"
            />
          );
        case 'line':
          return (
            <span
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: 'var(--navigation-toc-active-border)' }}
              aria-hidden="true"
            />
          );
        default:
          return null;
      }
    };

    return (
      <nav
        ref={ref}
        className={cn(tableOfContentsVariants({ variant, position }), className)}
        aria-label={label}
        {...props}
      >
        {showTitle && (
          <h2 className="text-h5 font-semibold text-text-primary mb-3">
            {label}
          </h2>
        )}
        <ul className="space-y-1" role="list">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  className={cn(
                    tocItemVariants({ level: item.level, active: isActive }),
                    markerStyle === 'line' && isActive && 'pl-3'
                  )}
                  onClick={(e) => handleClick(e, item.id)}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {markerStyle === 'line' && getMarker(isActive)}
                  <span className="inline-flex items-center">
                    {(markerStyle === 'dot' || markerStyle === 'seal') && getMarker(isActive)}
                    {item.title}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
);
TableOfContents.displayName = 'TableOfContents';

// Hook for tracking active heading based on scroll position
export function useActiveHeading(
  headingIds: string[],
  options: { rootMargin?: string; threshold?: number } = {}
) {
  const [activeId, setActiveId] = React.useState<string | undefined>(headingIds[0]);
  const { rootMargin = '-20% 0% -80% 0%', threshold = 0 } = options;

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin, threshold }
    );

    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headingIds, rootMargin, threshold]);

  return activeId;
}

export { TableOfContents, tableOfContentsVariants, tocItemVariants };
