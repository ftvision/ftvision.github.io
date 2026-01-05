'use client';

import * as React from 'react';
import type {
  TimelineItem,
  TimelineCategoryInternal,
  TimelinePeriod,
  NodePosition,
  TimelineSubwayMapProps,
} from '@/types/timeline';
import { TimelineLine } from './TimelineLine';
import { TimelineNode } from './TimelineNode';
import { TimelineTooltip } from './TimelineTooltip';

// Layout constants
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 520;
const MARGIN = { top: 100, right: 220, bottom: 60, left: 60 };
// Gap between content area and legend (prevents node overlap with labels)
const LEGEND_GAP = 60;

/**
 * Calculate node positions for all items
 */
function calculateNodePositions<T extends TimelineItem>(
  items: T[],
  getCategory: (item: T) => string,
  getPeriod: (item: T) => string,
  categories: TimelineCategoryInternal[],
  periods: TimelinePeriod[]
): Map<number | string, NodePosition> {
  const contentWidth = SVG_WIDTH - MARGIN.left - MARGIN.right - LEGEND_GAP;
  const contentHeight = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;
  const periodCount = periods.length;
  const categoryCount = categories.length;
  const xSpacing = contentWidth / Math.max(periodCount - 1, 1);
  const ySpacing = contentHeight / Math.max(categoryCount - 1, 1);

  const positions = new Map<number | string, NodePosition>();

  // Group items by category and period
  // Use '::' delimiter to avoid conflicts with hyphenated names
  const grouped = new Map<string, T[]>();

  for (const item of items) {
    const categoryId = getCategory(item);
    const periodId = getPeriod(item);
    const key = `${categoryId}::${periodId}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(item);
  }

  // Calculate positions with collision avoidance
  for (const [key, group] of grouped) {
    const [categoryId, periodId] = key.split('::');
    const category = categories.find((c) => c.id === categoryId);
    const periodIndex = periods.findIndex((p) => p.id === periodId);

    if (!category || periodIndex === -1) continue;

    // Base position
    const baseX = MARGIN.left + periodIndex * xSpacing;
    const baseY = MARGIN.top + category.yIndex * ySpacing;

    // Sort group by year for consistent ordering
    const sortedGroup = [...group].sort((a, b) => a.year - b.year);

    // Spread items within the same cell
    const maxSpread = xSpacing * 0.7;
    const nodeSpacing = Math.min(20, maxSpread / Math.max(sortedGroup.length - 1, 1));
    const totalSpread = nodeSpacing * (sortedGroup.length - 1);
    const startOffset = -totalSpread / 2;

    sortedGroup.forEach((item, i) => {
      const offsetX = sortedGroup.length === 1 ? 0 : startOffset + nodeSpacing * i;
      // Add slight Y jitter based on item ID to avoid perfect overlap
      const idNum = typeof item.id === 'number' ? item.id : parseInt(String(item.id), 10) || 0;
      const offsetY = ((idNum % 3) - 1) * 6;

      positions.set(item.id, {
        x: baseX + offsetX,
        y: baseY + offsetY,
      });
    });
  }

  return positions;
}

/**
 * TimelineSubwayMap - SVG visualization of items as a subway map
 *
 * Displays items on category "lines" across period "stations".
 */
export function TimelineSubwayMap<T extends TimelineItem>({
  items,
  getCategory,
  getPeriod,
  categories,
  periods,
  className,
  selectedPeriod,
  onPeriodClick,
  selectedCategory,
  onCategoryClick,
  renderTooltip,
  title,
}: TimelineSubwayMapProps<T>) {
  const [activeItem, setActiveItem] = React.useState<T | null>(null);
  const [focusedItem, setFocusedItem] = React.useState<T | null>(null);

  // Calculate positions once
  const positions = React.useMemo(
    () => calculateNodePositions(items, getCategory, getPeriod, categories, periods),
    [items, getCategory, getPeriod, categories, periods]
  );

  // Group items by category for line rendering
  const itemsByCategory = React.useMemo(() => {
    const grouped = new Map<string, T[]>();
    for (const item of items) {
      const categoryId = getCategory(item);
      if (!grouped.has(categoryId)) {
        grouped.set(categoryId, []);
      }
      grouped.get(categoryId)!.push(item);
    }
    return grouped;
  }, [items, getCategory]);

  // Active item is either hovered or focused
  const displayItem = activeItem || focusedItem;

  // Calculate spacing
  const contentWidth = SVG_WIDTH - MARGIN.left - MARGIN.right - LEGEND_GAP;
  const contentHeight = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;
  const xSpacing = contentWidth / Math.max(periods.length - 1, 1);
  const ySpacing = contentHeight / Math.max(categories.length - 1, 1);

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      className={className}
      style={{ width: '100%', height: 'auto' }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title || 'Timeline subway map visualization'}
    >
      {/* Background */}
      <rect
        x={0}
        y={0}
        width={SVG_WIDTH}
        height={SVG_HEIGHT}
        style={{ fill: 'var(--color-bg-primary)' }}
      />

      {/* Period labels (X-axis) - clickable for filtering */}
      <g className="period-labels">
        {periods.map((period, i) => {
          const isSelected = selectedPeriod === period.id;
          return (
            <g
              key={period.id}
              onClick={() => onPeriodClick?.(isSelected ? null : period.id)}
              className="cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPeriodClick?.(isSelected ? null : period.id);
                }
              }}
              aria-pressed={isSelected}
              aria-label={`Filter by ${period.label}${isSelected ? ' (selected)' : ''}`}
            >
              {/* Invisible hit area for easier clicking */}
              <rect
                x={MARGIN.left + i * xSpacing - 30}
                y={MARGIN.top - 50}
                width={60}
                height={30}
                style={{ fill: 'transparent' }}
              />
              <text
                x={MARGIN.left + i * xSpacing}
                y={MARGIN.top - 30}
                textAnchor="middle"
                className="fill-current transition-colors duration-150"
                style={{
                  fontSize: '14px',
                  fontWeight: isSelected ? 700 : 500,
                  fill: isSelected ? 'var(--color-accent-primary)' : undefined,
                }}
              >
                {period.label}
              </text>
              {/* Underline indicator when selected */}
              {isSelected && (
                <line
                  x1={MARGIN.left + i * xSpacing - 25}
                  y1={MARGIN.top - 22}
                  x2={MARGIN.left + i * xSpacing + 25}
                  y2={MARGIN.top - 22}
                  style={{
                    stroke: 'var(--color-accent-primary)',
                    strokeWidth: 2,
                    strokeLinecap: 'round',
                  }}
                />
              )}
            </g>
          );
        })}
      </g>

      {/* Vertical grid lines for periods */}
      <g className="period-grid" style={{ opacity: 0.1 }}>
        {periods.map((period, i) => (
          <line
            key={`grid-${period.id}`}
            x1={MARGIN.left + i * xSpacing}
            y1={MARGIN.top - 10}
            x2={MARGIN.left + i * xSpacing}
            y2={SVG_HEIGHT - MARGIN.bottom + 10}
            style={{
              stroke: 'var(--color-border-default)',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
          />
        ))}
      </g>

      {/* Category line labels (Y-axis) - on the right, clickable for filtering */}
      <g className="category-labels">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <g
              key={category.id}
              onClick={() => onCategoryClick?.(isSelected ? null : category.id)}
              className="cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onCategoryClick?.(isSelected ? null : category.id);
                }
              }}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category.name}${isSelected ? ' (selected)' : ''}`}
            >
              {/* Invisible hit area for easier clicking */}
              <rect
                x={SVG_WIDTH - MARGIN.right + 10}
                y={MARGIN.top + category.yIndex * ySpacing - 12}
                width={200}
                height={24}
                style={{ fill: 'transparent' }}
              />
              {/* Color indicator */}
              <circle
                cx={SVG_WIDTH - MARGIN.right + 20}
                cy={MARGIN.top + category.yIndex * ySpacing}
                r={isSelected ? 8 : 6}
                style={{
                  fill: category.resolvedColor,
                  transition: 'r 150ms ease',
                }}
              />
              {/* Selection ring */}
              {isSelected && (
                <circle
                  cx={SVG_WIDTH - MARGIN.right + 20}
                  cy={MARGIN.top + category.yIndex * ySpacing}
                  r={12}
                  style={{
                    fill: 'none',
                    stroke: category.resolvedColor,
                    strokeWidth: 2,
                    opacity: 0.3,
                  }}
                />
              )}
              {/* Label text - positioned to the right of the color dot */}
              <text
                x={SVG_WIDTH - MARGIN.right + 36}
                y={MARGIN.top + category.yIndex * ySpacing}
                dominantBaseline="middle"
                textAnchor="start"
                className="transition-all duration-150"
                style={{
                  fontSize: '12px',
                  fontWeight: isSelected ? 600 : 400,
                  fill: isSelected ? category.resolvedColor : 'var(--color-figure-secondary)',
                }}
              >
                {category.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* Category lines */}
      <g className="timeline-lines">
        {categories.map((category) => {
          const categoryItems = itemsByCategory.get(category.id) || [];
          const isHighlighted = displayItem ? getCategory(displayItem) === category.id : false;

          return (
            <TimelineLine
              key={category.id}
              categoryId={category.id}
              items={categoryItems}
              positions={positions}
              color={category.resolvedColor}
              isHighlighted={isHighlighted}
            />
          );
        })}
      </g>

      {/* Item nodes */}
      <g className="timeline-nodes">
        {items.map((item) => {
          const position = positions.get(item.id);
          if (!position) return null;

          const categoryId = getCategory(item);
          const category = categories.find((c) => c.id === categoryId);
          if (!category) return null;

          const isActive = displayItem?.id === item.id;

          return (
            <TimelineNode
              key={item.id}
              item={item}
              position={position}
              color={category.resolvedColor}
              isActive={isActive}
              onHover={setActiveItem}
              onFocus={setFocusedItem}
            />
          );
        })}
      </g>

      {/* Tooltip */}
      {displayItem && positions.get(displayItem.id) && (
        <TimelineTooltip
          item={displayItem}
          nodePosition={positions.get(displayItem.id)!}
          svgDimensions={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
          margin={MARGIN}
          renderContent={renderTooltip}
        />
      )}

      {/* Title */}
      {title && (
        <text
          x={SVG_WIDTH / 2}
          y={30}
          textAnchor="middle"
          className="fill-current text-figure-primary"
          style={{ fontSize: '18px', fontWeight: 600 }}
        >
          {title}
        </text>
      )}
    </svg>
  );
}
