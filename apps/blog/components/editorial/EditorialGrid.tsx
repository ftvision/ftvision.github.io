'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EditorialGridProps {
  /** Child components (EditorialSection cards, etc.) */
  children: React.ReactNode;
  /** Number of columns */
  columns?: 2 | 3;
  /** Additional CSS classes */
  className?: string;
}

/**
 * EditorialGrid - Equal-width grid container for editorial layouts
 *
 * A simple, symmetric grid that displays children in equal-width columns.
 * Responsive: collapses to single column on mobile.
 */
export function EditorialGrid({
  children,
  columns = 2,
  className,
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        'editorial-grid',
        // Base grid setup
        'grid gap-6 md:gap-8',
        // Mobile: single column
        'grid-cols-1',
        // Desktop: equal columns
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}
