'use client';

import * as React from 'react';
import type { TimelineItem, NodePosition } from '@/types/timeline';

export interface TimelineLineProps<T extends TimelineItem> {
  /** Category identifier for this line */
  categoryId: string;
  /** Items on this line (sorted by year) */
  items: T[];
  /** Position map for all items */
  positions: Map<number | string, NodePosition>;
  /** Line color */
  color: string;
  /** Whether to highlight this line */
  isHighlighted?: boolean;
}

/**
 * Generate a smooth path through the given points
 * Uses horizontal-first routing for subway-style appearance
 * (Periods on X-axis, Categories on Y-axis - lines go horizontally)
 */
function generateLinePath(points: NodePosition[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];

    // Calculate midpoint for the turn
    const midX = (prev.x + curr.x) / 2;

    // Horizontal segment to midpoint, then curve to next point
    if (Math.abs(prev.y - curr.y) < 5) {
      // Same row (small Y difference), just draw straight
      path += ` L ${curr.x} ${curr.y}`;
    } else {
      // Different Y position, use curved path
      const curveRadius = Math.min(15, Math.abs(curr.x - prev.x) / 4, Math.abs(curr.y - prev.y) / 2);

      // Horizontal to just before the turn
      path += ` L ${midX - curveRadius} ${prev.y}`;

      // Quadratic curve for the corner
      path += ` Q ${midX} ${prev.y} ${midX} ${prev.y + Math.sign(curr.y - prev.y) * curveRadius}`;

      // Vertical segment
      path += ` L ${midX} ${curr.y - Math.sign(curr.y - prev.y) * curveRadius}`;

      // Second curve to horizontal
      path += ` Q ${midX} ${curr.y} ${midX + curveRadius} ${curr.y}`;

      // Final horizontal segment
      path += ` L ${curr.x} ${curr.y}`;
    }
  }

  return path;
}

/**
 * TimelineLine - Renders a single category line path
 *
 * Draws a smooth path connecting all items on this category line.
 */
export function TimelineLine<T extends TimelineItem>({
  categoryId,
  items,
  positions,
  color,
  isHighlighted = false,
}: TimelineLineProps<T>) {
  // Sort items by year and get their positions
  const sortedItems = [...items].sort((a, b) => a.year - b.year);
  const points = sortedItems
    .map((item) => positions.get(item.id))
    .filter((p): p is NodePosition => p !== undefined);

  if (points.length === 0) return null;

  const pathData = generateLinePath(points);

  return (
    <g className={`timeline-line timeline-line--${categoryId}`}>
      {/* Background stroke for visibility */}
      <path
        d={pathData}
        style={{
          fill: 'none',
          stroke: 'var(--color-bg-primary)',
          strokeWidth: isHighlighted ? 8 : 6,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
        className="transition-all duration-200"
      />
      {/* Main colored line */}
      <path
        d={pathData}
        style={{
          fill: 'none',
          stroke: color,
          strokeWidth: isHighlighted ? 4 : 3,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          opacity: isHighlighted ? 1 : 0.8,
        }}
        className="transition-all duration-200"
      />
    </g>
  );
}
