'use client';

import * as React from 'react';
import type { TimelineItem, NodePosition } from '@/types/timeline';

export interface TimelineTooltipProps<T extends TimelineItem> {
  /** Item to display */
  item: T;
  /** Position of the node (for tooltip positioning) */
  nodePosition: NodePosition;
  /** SVG container dimensions */
  svgDimensions: { width: number; height: number };
  /** SVG margins */
  margin: { top: number; right: number; bottom: number; left: number };
  /** Custom render function for tooltip content */
  renderContent?: (item: T) => React.ReactNode;
}

/**
 * TimelineTooltip - Tooltip showing item details
 *
 * Displays title, subtitle, description, and year on hover.
 * Positioned above or below the node depending on available space.
 */
export function TimelineTooltip<T extends TimelineItem>({
  item,
  nodePosition,
  svgDimensions,
  margin,
  renderContent,
}: TimelineTooltipProps<T>) {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [tooltipSize, setTooltipSize] = React.useState({ width: 280, height: 120 });

  React.useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipSize({ width: rect.width, height: rect.height });
    }
  }, [item]);

  // Calculate tooltip position
  const showAbove = nodePosition.y > margin.top + tooltipSize.height + 20;
  const OFFSET = 16;

  // Clamp horizontal position to keep tooltip in bounds
  let tooltipX = nodePosition.x;
  const halfWidth = tooltipSize.width / 2;
  tooltipX = Math.max(margin.left + halfWidth, tooltipX);
  tooltipX = Math.min(svgDimensions.width - margin.right - halfWidth, tooltipX);

  const tooltipY = showAbove
    ? nodePosition.y - OFFSET
    : nodePosition.y + OFFSET;

  return (
    <foreignObject
      x={tooltipX - tooltipSize.width / 2}
      y={showAbove ? tooltipY - tooltipSize.height : tooltipY}
      width={tooltipSize.width}
      height={tooltipSize.height + 20}
      className="pointer-events-none overflow-visible"
    >
      <div
        ref={tooltipRef}
        className="animate-in fade-in-0 zoom-in-95 duration-150 rounded-md bg-ground-inverse p-3 shadow-lg"
        style={{ maxWidth: '280px' }}
      >
        {renderContent ? (
          renderContent(item)
        ) : (
          <>
            {/* Title */}
            <p className="mb-1 text-sm font-semibold leading-tight text-figure-inverse">
              {item.title}
            </p>

            {/* Subtitle (e.g., authors) */}
            {item.subtitle && (
              <p className="mb-1 text-xs text-figure-inverse opacity-90">
                {item.subtitle}
              </p>
            )}

            {/* Description and Year */}
            <p className="text-xs text-figure-inverse opacity-75">
              {item.description ? `${item.description} (${item.year})` : item.year}
            </p>

            {/* ID */}
            <p className="mt-2 text-xs font-medium text-figure-inverse opacity-60">
              #{item.id}
            </p>
          </>
        )}

        {/* Arrow indicator */}
        <div
          className="absolute h-2 w-2 rotate-45 bg-ground-inverse"
          style={{
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            ...(showAbove
              ? { bottom: '-4px' }
              : { top: '-4px' }),
          }}
        />
      </div>
    </foreignObject>
  );
}
