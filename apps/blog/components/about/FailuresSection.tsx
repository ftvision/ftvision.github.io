'use client';

import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
} from '@blog/ui';
import { cn } from '@/lib/utils';

export interface FailuresSectionProps {
  /** The heading text for the section */
  heading?: string;
  /** Introduction text explaining the purpose */
  intro?: string;
  /** Failure categories to display */
  sections: FailureCategory[];
  /** Which sections to expand by default */
  defaultExpanded?: string[];
  /** Additional CSS classes */
  className?: string;
}

export interface FailureCategory {
  /** Unique ID for the section */
  id: string;
  /** Section title */
  title: string;
  /** Items in this section */
  items: FailureItem[];
}

export interface FailureItem {
  /** Main title (company/school/paper) */
  title: string;
  /** Location */
  location?: string;
  /** Role/program/journal */
  subtitle?: string;
  /** Year */
  year: string;
  /** Result (rejected, declined, etc.) */
  result: string;
}

/**
 * Get badge variant based on result type
 */
function getResultVariant(
  result: string
): 'secondary' | 'outline' | 'info' | 'success' {
  const lowerResult = result.toLowerCase();
  if (lowerResult.includes('declined') || lowerResult.includes('拒绝了offer')) {
    return 'success';
  }
  if (lowerResult.includes('rejected') || lowerResult.includes('被拒')) {
    return 'secondary';
  }
  return 'outline';
}

/**
 * FailuresSection - Display resume of failures
 *
 * Inspired by Prof. Johannes Haushofer's CV of Failures.
 * Shows rejected applications, failed interviews, and declined offers
 * in collapsible accordion sections.
 */
export function FailuresSection({
  heading = 'Resume of Failures',
  intro,
  sections,
  defaultExpanded = [],
  className,
}: FailuresSectionProps) {
  return (
    <section
      className={cn('failures-section', className)}
      aria-labelledby="failures-heading"
    >
      <h2
        id="failures-heading"
        className="failures-section-heading mb-4 font-serif text-2xl font-semibold text-figure-primary"
      >
        {heading}
      </h2>

      {intro && (
        <p className="failures-section-intro mb-6 text-body text-figure-secondary leading-relaxed">
          {intro}
        </p>
      )}

      <Accordion
        type="multiple"
        defaultValue={defaultExpanded}
        className="failures-accordion"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="failures-category"
          >
            <AccordionTrigger className="failures-category-trigger font-serif text-lg">
              {section.title}
              <span className="ml-2 text-body-sm text-figure-muted">
                ({section.items.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="failures-category-content">
              <div className="space-y-4">
                {section.items.map((item, index) => (
                  <div
                    key={`${item.title}-${item.year}-${index}`}
                    className="failures-item border-l-2 border-border pl-4"
                  >
                    {/* Title and year */}
                    <div className="failures-item-header flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="failures-item-title font-medium text-figure-primary">
                          {item.title}
                        </h4>
                        {(item.subtitle || item.location) && (
                          <p className="failures-item-subtitle text-body-sm text-figure-secondary">
                            {item.subtitle}
                            {item.subtitle && item.location && ' · '}
                            {item.location}
                          </p>
                        )}
                      </div>
                      <span className="failures-item-year text-body-sm text-figure-muted">
                        {item.year}
                      </span>
                    </div>

                    {/* Result badge */}
                    <div className="failures-item-result mt-2">
                      <Badge
                        variant={getResultVariant(item.result)}
                        size="sm"
                        className="failures-result-badge"
                      >
                        {item.result}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
