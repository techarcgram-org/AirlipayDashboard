'use client';

import { Fragment, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { EmptyState, ErrorState } from './ui';

export function DataTable({
  columns = [],
  rows = [],
  rowKey = (row, index) => row?.id ?? index,
  selectedKey,
  onRowSelect,
  loading = false,
  error = null,
  emptyTitle = 'Nothing here yet',
  emptyDescription,
  emptyAction,
  loadingRows = 6,
  minWidth = 820,
  stickyFirst = true,
  className = '',
  footer,
  expandedKeys = [],
  onToggleExpand,
  renderExpandedRow,
}) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const skeletonRows = useMemo(() => Array.from({ length: loadingRows }), [loadingRows]);
  const expandable = typeof renderExpandedRow === 'function' && typeof onToggleExpand === 'function';
  const expandedSet = new Set((Array.isArray(expandedKeys) ? expandedKeys : []).map(String));
  const columnCount = columns.length + (expandable ? 1 : 0);

  if (error) {
    return <ErrorState error={error} className={className} />;
  }

  return (
    <div className={className}>
      <div className="bo-scroll overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth }}>
          <thead>
            <tr className="border-b border-border bg-table-head">
              {expandable ? (
                <th scope="col" className="h-10 w-10 pl-5 pr-1 text-left">
                  <span className="sr-only">Details</span>
                </th>
              ) : null}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'h-10 whitespace-nowrap px-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-muted',
                    index === 0 && !expandable && 'pl-5',
                    index === columns.length - 1 && 'pr-5',
                    column.align === 'right' && 'text-right',
                    column.headerClassName
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              skeletonRows.map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border">
                  {Array.from({ length: columnCount }).map((__, columnIndex) => (
                    <td
                      key={columnIndex}
                      className={cn(
                        'h-[56px] px-3',
                        columnIndex === 0 && 'pl-5',
                        columnIndex === columnCount - 1 && 'pr-5'
                      )}
                    >
                      <div
                        className="h-3 rounded-sm bo-skeleton"
                        style={{ width: `${52 + ((rowIndex + columnIndex) % 4) * 10}%` }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : safeRows.length ? (
              safeRows.map((row, rowIndex) => {
                const key = rowKey(row, rowIndex);
                const selected = selectedKey !== undefined && String(selectedKey) === String(key);
                const expanded = expandable && expandedSet.has(String(key));
                return (
                  <Fragment key={key}>
                    <tr
                      className={cn(
                        'border-b border-border transition-colors',
                        !expanded && !expandable && 'last:border-b-0',
                        onRowSelect && 'cursor-pointer',
                        selected ? 'bg-row-selected' : 'bg-surface hover:bg-row-hover'
                      )}
                      onClick={onRowSelect ? () => onRowSelect(row) : undefined}
                      tabIndex={onRowSelect ? 0 : undefined}
                      onKeyDown={
                        onRowSelect
                          ? (event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                onRowSelect(row);
                              }
                            }
                          : undefined
                      }
                      aria-selected={selected || undefined}
                    >
                      {expandable ? (
                        <td className="h-[56px] w-10 pl-5 pr-1 align-middle">
                          <button
                            type="button"
                            className="inline-flex h-6 w-6 items-center justify-center rounded-xs text-muted transition-colors hover:bg-surface-sunken hover:text-ink"
                            onClick={(event) => {
                              event.stopPropagation();
                              onToggleExpand(row);
                            }}
                            aria-expanded={expanded}
                            aria-label={expanded ? 'Collapse invoice details' : 'Expand invoice details'}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className={cn('h-3.5 w-3.5 transition-transform', expanded && 'rotate-90')}
                              aria-hidden="true"
                            >
                              <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </td>
                      ) : null}
                      {columns.map((column, columnIndex) => (
                        <td
                          key={column.key}
                          className={cn(
                            'h-[56px] px-3 align-middle text-[12px] text-ink-soft',
                            columnIndex === 0 && !expandable && 'pl-5',
                            columnIndex === columns.length - 1 && 'pr-5',
                            column.align === 'right' && 'text-right',
                            columnIndex === 0 && stickyFirst && !expandable && 'sticky left-0 z-[1] bg-inherit',
                            column.cellClassName
                          )}
                          style={column.width ? { width: column.width } : undefined}
                        >
                          {column.cell ? column.cell(row) : row?.[column.key] ?? '—'}
                        </td>
                      ))}
                    </tr>
                    {expanded ? (
                      <tr className="border-b border-border bg-surface-sunken/50">
                        <td colSpan={columnCount} className="px-5 py-0">
                          {renderExpandedRow(row)}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            ) : null}
          </tbody>
        </table>
      </div>
      {!loading && !safeRows.length ? (
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
          className="min-h-[240px]"
        />
      ) : null}
      {footer ? <div className="border-t border-border px-5 py-3">{footer}</div> : null}
    </div>
  );
}

export function TablePagination({ page, pages, onPageChange, label }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-[11px] text-muted">{label}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-surface px-2 text-[11px] font-medium text-ink-soft disabled:opacity-40"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span className="min-w-12 text-center text-[11px] text-muted">{page} / {Math.max(1, pages)}</span>
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-sm border border-border bg-surface px-2 text-[11px] font-medium text-ink-soft disabled:opacity-40"
          onClick={() => onPageChange(Math.min(pages, page + 1))}
          disabled={page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function exportCsv(filename, columns, rows) {
  if (!rows.length) return;
  const escape = (value) => {
    const text = value === null || value === undefined ? '' : String(value);
    return `"${text.replaceAll('"', '""')}"`;
  };
  const header = columns.map((column) => escape(column.label ?? column.key)).join(',');
  const body = rows
    .map((row) =>
      columns
        .map((column) => {
          const value = column.csvValue ? column.csvValue(row) : row[column.key];
          return escape(value);
        })
        .join(',')
    )
    .join('\n');
  const blob = new Blob([`${header}\n${body}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
