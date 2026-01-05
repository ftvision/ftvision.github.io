"use client";

import * as React from "react";
import type { Vision100MapProps, VisionPaper } from "@/types/vision100";
import {
  VISION_100_PAPERS,
  SUBWAY_LINES,
  DECADES,
} from "@/data/vision100-papers";
import {
  TimelineMap,
  type TimelineTableColumn,
} from "@/components/content/timeline";
import type { TimelineCategory, TimelinePeriod } from "@/types/timeline";
import { getCategoryColor, getCategoryName } from "@/lib/timeline-utils";

/**
 * Convert Vision100 subway lines to TimelineCategory format
 */
const categories: TimelineCategory[] = SUBWAY_LINES.map((line) => ({
  id: line.id,
  name: line.name,
  color: line.color,
}));

/**
 * Convert Vision100 decades to TimelinePeriod format
 */
const periods: TimelinePeriod[] = DECADES.map((d) => ({
  id: d.label,
  label: d.label,
  startYear: d.startYear,
  endYear: d.endYear,
}));

/**
 * Custom table columns for Vision100 papers
 */
function getVision100Columns(
  resolvedCategories: Array<{
    id: string;
    name: string;
    resolvedColor: string;
  }>,
): TimelineTableColumn<VisionPaper>[] {
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
          <span className="line-clamp-2">{paper.title}</span>
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
 * Custom tooltip renderer for Vision100 papers
 */
function renderPaperTooltip(paper: VisionPaper): React.ReactNode {
  return (
    <>
      <p className="mb-1 text-sm font-semibold leading-tight text-figure-inverse">
        {paper.title}
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
 * Vision100Map - Visualization of 100 foundational vision science papers
 *
 * A thin wrapper around TimelineMap that provides Vision100-specific data
 * and customization.
 *
 * Set `hero={true}` to break out of the content column and span full viewport width.
 */
export function Vision100Map({
  className,
  defaultView = "map",
  hero = false,
}: Vision100MapProps) {
  // Resolve categories to get colors for table columns
  const resolvedCategories = React.useMemo(() => {
    return categories.map((cat, index) => ({
      id: cat.id,
      name: cat.name,
      resolvedColor: cat.color ?? `var(--color-data-${(index % 6) + 1})`,
    }));
  }, []);

  const tableColumns = React.useMemo(
    () => getVision100Columns(resolvedCategories),
    [resolvedCategories],
  );

  // Adapt VisionPaper to TimelineItem interface
  const items = VISION_100_PAPERS.map((paper) => ({
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
      title="100 Vision Science Papers"
      subtitle="Compiled by Dr. Yury Petrov (2007)"
      renderTooltip={renderPaperTooltip}
      tableColumns={tableColumns}
      defaultView={defaultView}
      hero={hero}
      className={className}
    />
  );
}
