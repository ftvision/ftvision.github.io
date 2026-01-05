'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface EditorialSectionProps {
  /** Section title */
  title: string;
  /** Optional introductory description/prose */
  description?: React.ReactNode;
  /** Child components (typically Item components) */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'card';
  /** Additional CSS classes */
  className?: string;
}

/**
 * EditorialSection - Section container with title, description, and items
 *
 * Variants:
 * - default: Standard section with heading and items (no border)
 * - card: Adds border/background for card appearance (like in the screenshot)
 */
export function EditorialSection({
  title,
  description,
  children,
  variant = 'default',
  className,
}: EditorialSectionProps) {
  const isCard = variant === 'card';

  return (
    <section
      className={cn(
        'editorial-section',
        // Card variant: border and padding
        isCard && [
          'p-6',
          'border border-border-muted',
          'bg-ground-primary',
        ],
        className
      )}
    >
      {/* Section heading */}
      <h3
        className={cn(
          'font-serif text-figure-primary type-h3',
          'mb-3',
          // Underline for card variant (matching screenshot)
          isCard && 'pb-2 border-b border-border-muted'
        )}
      >
        {title}
      </h3>

      {/* Optional description */}
      {description && (
        <p className="text-body-sm text-figure-secondary mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* Child items */}
      <div className="editorial-section-items">{children}</div>
    </section>
  );
}
