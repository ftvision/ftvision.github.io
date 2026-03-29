"use client";

import * as React from "react";
import type { Econ100MapProps, EconPaper } from "@/types/econ100";
import {
  ECON_100_PAPERS,
  ECON_LINES,
  ECON_DECADES,
} from "@/data/econ100-papers";
import {
  TimelineMap,
  type TimelineTableColumn,
} from "@/components/content/timeline";
import type { TimelineCategory, TimelinePeriod } from "@/types/timeline";
import { getCategoryColor, getCategoryName } from "@/lib/timeline-utils";

/**
 * Convert Econ100 lines to TimelineCategory format
 */
const categories: TimelineCategory[] = ECON_LINES.map((line) => ({
  id: line.id,
  name: line.name,
  color: line.color,
}));

/**
 * Convert Econ100 decades to TimelinePeriod format
 */
const periods: TimelinePeriod[] = ECON_DECADES.map((d) => ({
  id: d.label,
  label: d.label,
  startYear: d.startYear,
  endYear: d.endYear,
}));

/**
 * Custom table columns for Econ100 papers
 */
function getEcon100Columns(
  resolvedCategories: Array<{
    id: string;
    name: string;
    resolvedColor: string;
  }>,
): TimelineTableColumn<EconPaper>[] {
  return [
    {
      key: "id",
      header: "#",
      sortable: true,
      render: (paper) => <span className="text-figure-muted">#{paper.id}</span>,
    },
    {
      key: "year",
      header: "Year",
      sortable: true,
      render: (paper) => (
        <span className="text-figure-secondary">{paper.year}</span>
      ),
    },
    {
      key: "authors",
      header: "Author",
      sortable: true,
      sortKey: (paper) => paper.firstAuthor,
      render: (paper) => (
        <span className="font-medium">{paper.authors}</span>
      ),
    },
    {
      key: "title",
      header: "Title",
      sortable: false,
      render: (paper) => (
        <div className="max-w-md">
          {paper.url ? (
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-2 text-link hover:text-link-hover underline underline-offset-2"
            >
              {paper.title}
            </a>
          ) : (
            <span className="line-clamp-2">{paper.title}</span>
          )}
          <span className="block text-xs text-figure-muted">
            {paper.journal}
          </span>
        </div>
      ),
    },
    {
      key: "topic",
      header: "Topic",
      sortable: true,
      sortKey: (paper) => paper.topic,
      render: (paper) => {
        const color = getCategoryColor(resolvedCategories, paper.topic);
        const name = getCategoryName(resolvedCategories, paper.topic);
        return (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
            style={{
              backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
              color: color,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            {name}
          </span>
        );
      },
    },
  ];
}

/**
 * Custom tooltip renderer for Econ100 papers
 */
function renderPaperTooltip(paper: EconPaper): React.ReactNode {
  return (
    <>
      <p className="mb-1 text-sm font-semibold leading-tight text-figure-inverse">
        {paper.url ? (
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {paper.title}
          </a>
        ) : (
          paper.title
        )}
      </p>
      <p className="mb-1 text-xs text-figure-inverse opacity-90">
        {paper.authors}
      </p>
      <p className="text-xs text-figure-inverse opacity-75">
        {paper.journal} ({paper.year})
      </p>
      <p className="mt-2 text-xs font-medium text-figure-inverse opacity-60">
        #{paper.id}
      </p>
    </>
  );
}

/**
 * Econ100Map - Visualization of ~100 economics papers
 *
 * A thin wrapper around TimelineMap that provides Econ100-specific data
 * and customization.
 *
 * Set `hero={true}` to break out of the content column and span full viewport width.
 */
export function Econ100Map({
  className,
  defaultView = "map",
  hero = false,
}: Econ100MapProps) {
  const resolvedCategories = React.useMemo(() => {
    return categories.map((cat, index) => ({
      id: cat.id,
      name: cat.name,
      resolvedColor: cat.color ?? `var(--color-data-${(index % 6) + 1})`,
    }));
  }, []);

  const tableColumns = React.useMemo(
    () => getEcon100Columns(resolvedCategories),
    [resolvedCategories],
  );

  const items = ECON_100_PAPERS.map((paper) => ({
    ...paper,
    subtitle: paper.authors,
    description: paper.journal,
  }));

  return (
    <TimelineMap
      items={items}
      getCategory={(paper) => paper.topic}
      categories={categories}
      periods={periods}
      title="~100 Economics Papers"
      subtitle="Curated by Nicholas Decker (@captgouda24)"
      renderTooltip={renderPaperTooltip}
      tableColumns={tableColumns}
      defaultView={defaultView}
      hero={hero}
      className={className}
    />
  );
}
