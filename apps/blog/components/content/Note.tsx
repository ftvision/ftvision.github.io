'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useNotesOptional } from './NoteContext';

export interface NoteProps {
  /** Unique identifier for this note */
  id?: string;
  /** The note content to display in the margin */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Sidenote component inspired by Tufte CSS
 *
 * - Desktop (>=1024px): Displays in right margin, aligned with reference
 * - Mobile (<1024px): Expandable inline element
 *
 * Uses a label/checkbox pattern for mobile toggle (CSS-only, no JS needed for basic toggle).
 * Desktop uses absolute positioning relative to the parent paragraph to place
 * notes in the margin column.
 *
 * Usage in MDX:
 * ```mdx
 * The transformer architecture changed everything.<Note>This refers to the
 * seminal paper by Vaswani et al.</Note>
 * ```
 */
export function Note({ id, children, className }: NoteProps) {
  const notesContext = useNotesOptional();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const generatedId = React.useId();
  const noteId = id || generatedId;

  // Get note number from context, or use a fallback
  const noteNumber = React.useMemo(() => {
    if (notesContext) {
      return notesContext.registerNote(noteId, children);
    }
    // Fallback when used outside provider (e.g., in stories)
    return 1;
  }, [notesContext, noteId, children]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <span className={cn('note-wrapper inline', className)}>
      {/* Superscript number - clickable on mobile, visual indicator on desktop */}
      <button
        type="button"
        className={cn(
          'note-toggle',
          'text-link hover:text-link-hover',
          'transition-colors cursor-pointer',
          // On desktop, make it non-interactive since note is always visible
          'lg:cursor-default lg:pointer-events-none'
        )}
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={`note-content-${noteId}`}
        aria-label={`Note ${noteNumber}`}
      >
        <sup className="text-[0.65em] font-medium">{noteNumber}</sup>
      </button>

      {/* Note content - expandable on mobile, margin on desktop */}
      <span
        id={`note-content-${noteId}`}
        role="note"
        className={cn(
          'note-content',
          // Mobile: block element that expands/collapses
          'block',
          'overflow-hidden transition-all duration-200 ease-in-out',
          // Mobile collapsed state - hidden until expanded
          !isExpanded && 'max-h-0 opacity-0',
          // Mobile expanded state
          isExpanded && 'max-h-96 opacity-100 mt-2 mb-2 p-3 bg-ground-secondary rounded-md',
          isExpanded && 'text-body-sm text-figure-secondary',
          // Desktop: ALWAYS visible in margin, regardless of expanded state
          // Tufte CSS approach: float right with negative margin to pull into margin space
          // The parent container should have right padding to create the margin space
          'lg:block lg:max-h-none lg:opacity-100',
          'lg:float-right lg:clear-right',
          // Width is ~55% of prose width, negative margin pulls it into the padding
          'lg:w-[280px] lg:mr-[-320px]',
          'lg:mt-0 lg:mb-4 lg:ml-4 lg:p-0 lg:bg-transparent lg:rounded-none',
          'lg:text-caption lg:text-figure-muted lg:leading-snug'
        )}
      >
        <span className="block">
          {/* Number prefix on desktop for visual alignment */}
          <span
            className="hidden lg:inline text-figure-muted mr-1 font-medium"
            aria-hidden="true"
          >
            {noteNumber}.
          </span>
          {children}
        </span>
      </span>
    </span>
  );
}
