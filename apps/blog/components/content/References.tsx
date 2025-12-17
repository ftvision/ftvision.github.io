'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { useReferences, type ReferenceData } from './ReferenceContext';

export interface ReferencesProps {
  /** Section title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * References section component
 *
 * Automatically renders all registered references in a numbered list.
 * Uses a subscription pattern to re-render when new references are added.
 * Place at the end of the essay content.
 *
 * Usage in MDX:
 * ```mdx
 * ## References
 * <References />
 * ```
 */
export function References({
  title = 'References',
  className,
}: ReferencesProps) {
  const { getReferences, subscribe } = useReferences();
  const [references, setReferences] = React.useState<ReferenceData[]>([]);

  // Subscribe to reference changes and update state
  React.useEffect(() => {
    // Get initial references
    setReferences(getReferences());

    // Subscribe to future changes
    const unsubscribe = subscribe(() => {
      setReferences(getReferences());
    });

    return unsubscribe;
  }, [getReferences, subscribe]);

  if (references.length === 0) {
    return null;
  }

  return (
    <section
      className={cn('references-section', 'mt-12 pt-8 border-t border-border', className)}
      aria-labelledby="references-heading"
    >
      <h2
        id="references-heading"
        className="text-heading-sm font-semibold mb-6 text-figure-primary"
      >
        {title}
      </h2>
      <ol className="list-none space-y-4">
        {references.map((ref) => (
          <li
            key={ref.id}
            id={`ref-${ref.id}`}
            className="text-body-sm text-figure-secondary flex"
          >
            <span className="inline-block min-w-[2.5rem] text-figure-muted shrink-0">
              [{ref.number}]
            </span>
            <span>
              {ref.url ? (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-link-hover transition-colors"
                >
                  {ref.citation}
                </a>
              ) : (
                ref.citation
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
