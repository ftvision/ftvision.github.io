'use client';

import * as React from 'react';
import { Badge } from '@blog/ui';
import { cn } from '@/lib/utils';

export interface TimelineProps {
  /** The heading text for the section */
  heading?: string;
  /** Timeline entries in chronological order (most recent first) */
  entries: TimelineEntry[];
  /** Additional CSS classes */
  className?: string;
}

export interface TimelineEntry {
  /** Year or date range (e.g., "2024", "2020-2023") */
  date: string;
  /** Title/role */
  title: string;
  /** Organization or context */
  organization?: string;
  /** Optional location */
  location?: string;
  /** Type of entry for visual distinction */
  type?: 'work' | 'education' | 'milestone' | 'project';
  /** Brief description */
  description?: string;
  /** Whether this is the current/ongoing entry */
  current?: boolean;
}

const TYPE_COLORS: Record<string, { variant: 'primary' | 'secondary' | 'info' | 'success' | 'outline'; label: string }> = {
  work: { variant: 'primary', label: 'Work' },
  education: { variant: 'info', label: 'Education' },
  milestone: { variant: 'success', label: 'Milestone' },
  project: { variant: 'secondary', label: 'Project' },
};

/**
 * Timeline - Display career/education milestones
 *
 * A visual timeline showing professional history, education,
 * and key milestones in chronological order.
 */
export function Timeline({
  heading = 'Timeline',
  entries,
  className,
}: TimelineProps) {
  return (
    <section
      className={cn('timeline', className)}
      aria-labelledby="timeline-heading"
    >
      <h2
        id="timeline-heading"
        className="timeline-heading mb-6 font-serif text-2xl font-semibold text-figure-primary"
      >
        {heading}
      </h2>

      <div className="timeline-entries relative">
        {/* Vertical line */}
        <div
          className="timeline-line absolute left-[7px] top-2 bottom-2 w-px bg-border"
          aria-hidden="true"
        />

        <ul className="timeline-list space-y-6" role="list">
          {entries.map((entry, index) => {
            const typeConfig = entry.type ? TYPE_COLORS[entry.type] : null;

            return (
              <li
                key={`${entry.date}-${entry.title}-${index}`}
                className="timeline-entry relative pl-8"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    'timeline-dot absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-ground-primary',
                    entry.current
                      ? 'bg-action-primary'
                      : 'bg-ground-secondary'
                  )}
                  aria-hidden="true"
                />

                {/* Entry content */}
                <div className="timeline-entry-content">
                  {/* Date and type badge row */}
                  <div className="timeline-entry-meta mb-1 flex flex-wrap items-center gap-2">
                    <span className="timeline-entry-date text-body-sm font-medium text-figure-muted">
                      {entry.date}
                      {entry.current && (
                        <span className="ml-2 text-action-primary">
                          (Current)
                        </span>
                      )}
                    </span>
                    {typeConfig && (
                      <Badge
                        variant={typeConfig.variant}
                        size="sm"
                        className="timeline-entry-type"
                      >
                        {typeConfig.label}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="timeline-entry-title font-medium text-figure-primary">
                    {entry.title}
                  </h3>

                  {/* Organization and location */}
                  {(entry.organization || entry.location) && (
                    <p className="timeline-entry-org text-body-sm text-figure-secondary">
                      {entry.organization}
                      {entry.organization && entry.location && (
                        <span className="mx-1" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {entry.location}
                    </p>
                  )}

                  {/* Description */}
                  {entry.description && (
                    <p className="timeline-entry-description mt-2 text-body-sm text-figure-secondary">
                      {entry.description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
