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

export interface ResumeSectionProps {
  /** The heading text for the section */
  heading?: string;
  /** Resume sections to display */
  sections: ResumeCategory[];
  /** Which sections to expand by default */
  defaultExpanded?: string[];
  /** Additional CSS classes */
  className?: string;
}

export interface ResumeCategory {
  /** Unique ID for the section */
  id: string;
  /** Section title (e.g., "Work Experience", "Education") */
  title: string;
  /** Items in this section */
  items: ResumeItem[];
}

export interface ResumeItem {
  /** Title/role */
  title: string;
  /** Organization/company/school */
  organization: string;
  /** Date range */
  dateRange: string;
  /** Location */
  location?: string;
  /** Bullet points describing responsibilities/achievements */
  bullets?: string[];
  /** Skills or technologies used */
  skills?: string[];
}

/**
 * ResumeSection - Collapsible CV/resume details
 *
 * Displays resume information in collapsible accordion sections.
 * Uses the Accordion component from @blog/ui.
 */
export function ResumeSection({
  heading = 'Resume',
  sections,
  defaultExpanded = [],
  className,
}: ResumeSectionProps) {
  return (
    <section
      className={cn('resume-section', className)}
      aria-labelledby="resume-heading"
    >
      <h2
        id="resume-heading"
        className="resume-section-heading mb-6 font-serif text-2xl font-semibold text-figure-primary"
      >
        {heading}
      </h2>

      <Accordion
        type="multiple"
        defaultValue={defaultExpanded}
        className="resume-accordion"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="resume-category"
          >
            <AccordionTrigger className="resume-category-trigger font-serif text-lg">
              {section.title}
              <span className="ml-2 text-body-sm text-figure-muted">
                ({section.items.length})
              </span>
            </AccordionTrigger>
            <AccordionContent className="resume-category-content">
              <div className="space-y-6">
                {section.items.map((item, index) => (
                  <div
                    key={`${item.organization}-${item.title}-${index}`}
                    className="resume-item"
                  >
                    {/* Title and date */}
                    <div className="resume-item-header flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="resume-item-title font-medium text-figure-primary">
                          {item.title}
                        </h4>
                        <p className="resume-item-org text-body-sm text-figure-secondary">
                          {item.organization}
                          {item.location && (
                            <span className="resume-item-location">
                              {' · '}
                              {item.location}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="resume-item-date text-body-sm text-figure-muted">
                        {item.dateRange}
                      </span>
                    </div>

                    {/* Bullet points */}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="resume-item-bullets mt-2 space-y-1 pl-4">
                        {item.bullets.map((bullet, bulletIndex) => (
                          <li
                            key={bulletIndex}
                            className="text-body-sm text-figure-secondary list-disc"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Skills */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="resume-item-skills mt-2 flex flex-wrap gap-1">
                        {item.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            size="sm"
                            className="resume-skill"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
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
