'use client';

import type { TimelineItem, NodePosition } from '@/types/timeline';

export interface TimelineNodeProps<T extends TimelineItem> {
  /** Item data */
  item: T;
  /** Position on the SVG */
  position: NodePosition;
  /** Line color */
  color: string;
  /** Whether this node is currently active (hovered/focused) */
  isActive: boolean;
  /** Callback when hover state changes */
  onHover: (item: T | null) => void;
  /** Callback when focus state changes */
  onFocus: (item: T | null) => void;
}

/**
 * TimelineNode - Individual item node on the timeline map
 *
 * Renders a circle at the specified position with hover/focus interactions.
 */
export function TimelineNode<T extends TimelineItem>({
  item,
  position,
  color,
  isActive,
  onHover,
  onFocus,
}: TimelineNodeProps<T>) {
  const radius = isActive ? 8 : 6;

  // Build aria-label from available fields
  const ariaLabel = item.subtitle
    ? `${item.subtitle}, ${item.year}: ${item.title}`
    : `${item.year}: ${item.title}`;

  return (
    <g
      className="timeline-node cursor-pointer outline-none"
      transform={`translate(${position.x}, ${position.y})`}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onFocus(item)}
      onBlur={() => onFocus(null)}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
    >
      {/* Outer ring on hover/focus */}
      {isActive && (
        <circle
          r={radius + 4}
          style={{ fill: 'none', stroke: color, strokeWidth: 2, opacity: 0.3 }}
          className="animate-in fade-in-0 zoom-in-95 duration-150"
        />
      )}
      {/* Main node circle */}
      <circle
        r={radius}
        style={{ fill: 'var(--color-bg-primary)', stroke: color, strokeWidth: 3 }}
        className="transition-all duration-150"
      />
      {/* Center dot */}
      <circle r={3} style={{ fill: color }} className="transition-all duration-150" />
    </g>
  );
}
