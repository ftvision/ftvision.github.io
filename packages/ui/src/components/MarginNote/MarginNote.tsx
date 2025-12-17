import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@ui/lib/utils';

const marginNoteVariants = cva(
  [
    'text-caption leading-relaxed',
  ],
  {
    variants: {
      variant: {
        sidenote: 'text-figure-secondary',
        author: 'text-figure-secondary',
        reference: 'text-figure-muted italic',
      },
    },
    defaultVariants: {
      variant: 'sidenote',
    },
  }
);

const markerVariants = cva('font-medium', {
  variants: {
    variant: {
      sidenote: 'text-figure-muted',
      author: 'text-accent-primary',
      reference: 'text-figure-muted',
    },
  },
  defaultVariants: {
    variant: 'sidenote',
  },
});

export interface MarginNoteProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof marginNoteVariants> {
  /** Unique ID for anchor linking */
  id: string;
  /** Custom marker character (e.g., "※", "按", numbers) */
  marker?: string;
  /** Note content */
  children: React.ReactNode;
}

/**
 * MarginNote (眉批) - Scholarly margin annotations
 *
 * Renders as a footnote-style reference. On click/tap, reveals the note content.
 * Uses a simple inline marker with expandable content pattern that works
 * reliably across all screen sizes without complex positioning.
 */
const MarginNote = React.forwardRef<HTMLElement, MarginNoteProps>(
  ({ className, variant, id, marker, children, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    // Default markers based on variant
    const defaultMarkers = {
      sidenote: '†',
      author: '按',
      reference: '※',
    };

    const displayMarker = marker ?? defaultMarkers[variant ?? 'sidenote'];

    return (
      <span className="margin-note-wrapper inline">
        {/* Clickable marker */}
        <button
          type="button"
          className={cn(
            'inline align-super text-xs cursor-pointer',
            'hover:underline focus:underline focus:outline-none',
            markerVariants({ variant })
          )}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={id}
          title={isExpanded ? 'Hide note' : 'Show note'}
        >
          {displayMarker}
        </button>

        {/* Expandable note content */}
        {isExpanded && (
          <aside
            ref={ref}
            id={id}
            className={cn(
              'block my-2 mx-4 p-3 rounded',
              'bg-surface-aside border-l-2 border-accent-primary',
              marginNoteVariants({ variant, className })
            )}
            {...props}
          >
            <span className={cn('mr-1', markerVariants({ variant }))}>
              {displayMarker}
            </span>
            {children}
          </aside>
        )}
      </span>
    );
  }
);
MarginNote.displayName = 'MarginNote';

export { MarginNote, marginNoteVariants };
