'use client';

import * as React from 'react';
import { Tooltip } from '@blog/ui';
import { cn } from '@/lib/utils';
import { useReferencesOptional } from './ReferenceContext';

export interface ReferenceProps {
  /** Unique identifier for this reference */
  id: string;
  /** The full citation text */
  citation: string;
  /** Optional URL for the reference */
  url?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Inline citation reference component
 *
 * Renders as [n] in the text and links to the References section.
 * Shows a tooltip with the citation on hover.
 *
 * Usage in MDX:
 * ```mdx
 * Recent work <Reference id="vaswani2017" citation="Vaswani, A., et al. (2017). Attention is all you need." /> has shown...
 * ```
 */
export function Reference({ id, citation, url, className }: ReferenceProps) {
  const referencesContext = useReferencesOptional();

  // Get reference number from context, or use a fallback
  const refNumber = React.useMemo(() => {
    if (referencesContext) {
      return referencesContext.registerReference(id, citation, url);
    }
    // Fallback when used outside provider (e.g., in stories)
    return 1;
  }, [referencesContext, id, citation, url]);

  const referenceLink = (
    <a
      href={`#ref-${id}`}
      className={cn(
        'reference-link',
        'text-link hover:text-link-hover',
        'transition-colors no-underline',
        className
      )}
      aria-label={`Reference ${refNumber}: ${citation}`}
    >
      [{refNumber}]
    </a>
  );

  return (
    <Tooltip content={citation} side="top" delayDuration={100}>
      {referenceLink}
    </Tooltip>
  );
}
