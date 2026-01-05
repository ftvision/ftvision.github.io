'use client';

import * as React from 'react';
import type {
  TimelineItem,
  TimelineCategoryInternal,
  TimelineTableColumn,
  TimelineTableProps,
} from '@/types/timeline';
import { getCategoryName, getCategoryColor } from '@/lib/timeline-utils';

type SortDirection = 'asc' | 'desc';

/**
 * Default columns for the table view
 */
function getDefaultColumns<T extends TimelineItem>(
  categories: TimelineCategoryInternal[],
  getCategory: (item: T) => string
): TimelineTableColumn<T>[] {
  return [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      render: (item) => <span className="text-figure-muted">#{item.id}</span>,
    },
    {
      key: 'year',
      header: 'Year',
      sortable: true,
      render: (item) => <span className="text-figure-secondary">{item.year}</span>,
    },
    {
      key: 'title',
      header: 'Title',
      sortable: false,
      render: (item) => (
        <div className="max-w-md">
          <span className="line-clamp-2">{item.title}</span>
          {item.subtitle && (
            <span className="block text-xs text-figure-muted">{item.subtitle}</span>
          )}
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      sortKey: (item) => getCategory(item),
      render: (item) => {
        const categoryId = getCategory(item);
        const color = getCategoryColor(categories, categoryId);
        const name = getCategoryName(categories, categoryId);
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
            {name.split(' ')[0]}
          </span>
        );
      },
    },
  ];
}

/**
 * TimelineTable - Sortable table view of all items
 *
 * Displays items in a table format with sortable columns.
 */
const ITEMS_PER_PAGE = 10;

export function TimelineTable<T extends TimelineItem>({
  items,
  getCategory,
  categories,
  filterCategory,
  filterPeriod,
  columns: customColumns,
  className,
}: TimelineTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string>('id');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);

  // Use default columns if not provided
  const columns = customColumns ?? getDefaultColumns(categories, getCategory);

  // Filter and sort items
  const displayedItems = React.useMemo(() => {
    let result = [...items];

    // Apply category filter
    if (filterCategory) {
      result = result.filter((item) => getCategory(item) === filterCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.subtitle?.toLowerCase().includes(query) ?? false) ||
          (item.description?.toLowerCase().includes(query) ?? false)
      );
    }

    // Sort
    const column = columns.find((c) => c.key === sortKey);
    if (column?.sortable !== false) {
      result.sort((a, b) => {
        let comparison = 0;
        const sortKeyFn = column?.sortKey;

        if (typeof sortKeyFn === 'function') {
          const aVal = sortKeyFn(a);
          const bVal = sortKeyFn(b);
          comparison = typeof aVal === 'string'
            ? aVal.localeCompare(String(bVal))
            : Number(aVal) - Number(bVal);
        } else {
          const key = (sortKeyFn ?? sortKey) as keyof T;
          const aVal = a[key];
          const bVal = b[key];
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            comparison = aVal.localeCompare(bVal);
          } else if (typeof aVal === 'number' && typeof bVal === 'number') {
            comparison = aVal - bVal;
          }
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [items, filterCategory, searchQuery, sortKey, sortDirection, columns, getCategory]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery, sortKey, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(displayedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = displayedItems.slice(startIndex, endIndex);

  // Toggle sort
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Sort indicator
  const SortIndicator = ({ columnKey }: { columnKey: string }) => {
    const column = columns.find((c) => c.key === columnKey);
    if (column?.sortable === false) return null;
    if (sortKey !== columnKey) return <span className="ml-1 opacity-30">↕</span>;
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className={`timeline-table ${className || ''}`}>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, subtitle, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border border-border bg-ground-primary px-3 py-2 text-sm text-figure-primary placeholder:text-figure-muted focus:border-action-primary focus:outline-none focus:ring-1 focus:ring-action-primary"
        />
      </div>

      {/* Results count */}
      <p className="mb-2 text-sm text-figure-secondary">
        Showing {startIndex + 1}-{Math.min(endIndex, displayedItems.length)} of {displayedItems.length} items
        {filterCategory && (
          <span className="ml-2">
            in <strong>{getCategoryName(categories, filterCategory)}</strong>
          </span>
        )}
        {filterPeriod && (
          <span className="ml-2">
            from <strong>{filterPeriod}</strong>
          </span>
        )}
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-2 py-2 text-left font-semibold text-figure-secondary ${
                    column.sortable !== false
                      ? 'cursor-pointer hover:text-figure-primary'
                      : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  {column.header}
                  <SortIndicator columnKey={column.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border/50 transition-colors hover:bg-ground-secondary"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-2 py-2">
                    {column.render ? column.render(item) : String(item[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayedItems.length === 0 && (
        <p className="py-8 text-center text-figure-muted">
          No items found matching your search.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="text-sm text-figure-secondary">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="rounded px-2 py-1 text-sm transition-colors hover:bg-ground-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              «
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded px-2 py-1 text-sm transition-colors hover:bg-ground-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              ‹ Prev
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and pages around current
                  if (page === 1 || page === totalPages) return true;
                  if (Math.abs(page - currentPage) <= 1) return true;
                  return false;
                })
                .map((page, index, arr) => {
                  // Add ellipsis between non-consecutive pages
                  const prevPage = arr[index - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;
                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && (
                        <span className="px-1 text-figure-muted">…</span>
                      )}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[28px] rounded px-2 py-1 text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-action-primary text-white'
                            : 'hover:bg-ground-secondary'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded px-2 py-1 text-sm transition-colors hover:bg-ground-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next ›
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="rounded px-2 py-1 text-sm transition-colors hover:bg-ground-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
