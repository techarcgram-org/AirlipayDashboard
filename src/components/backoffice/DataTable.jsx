'use client';

import { useMemo } from 'react';
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
}) {
  const safeRows = Array.isArray(rows) ? rows : [];
  const skeletonRows = useMemo(() => Array.from({ length: loadingRows }), [loadingRows]);

  if (error) {
    return <ErrorState error={error} className={className} />;
  }

  return (
    <div className={className}>
      <div className="bo-scroll overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth }}>
          <thead>
            <tr className="border-b border-border bg-table-head">
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'h-10 whitespace-nowrap px-3 text-left text-[9px] font-semibold uppercase tracking-[0.08em] text-muted',
                    index === 0 && 'pl-5',
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
                  {columns.map((column, columnIndex) => (
                    <td key={column.key} className={cn('h-[56px] px-3', columnIndex === 0 && 'pl-5', columnIndex === columns.length - 1 && 'pr-5')}>
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
                return (
                  <tr
                    key={key}
                    className={cn(
                      'border-b border-border last:border-b-0 transition-colors',
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
                    {columns.map((column, columnIndex) => (
                      <td
                        key={column.key}
                        className={cn(
                          'h-[56px] px-3 align-middle text-[12px] text-ink-soft',
                          columnIndex === 0 && 'pl-5',
                          columnIndex === columns.length - 1 && 'pr-5',
                          column.align === 'right' && 'text-right',
                          columnIndex === 0 && stickyFirst && 'sticky left-0 z-[1] bg-inherit',
                          column.cellClassName
                        )}
                        style={column.width ? { width: column.width } : undefined}
                      >
                        {column.cell ? column.cell(row) : row?.[column.key] ?? '—'}
                      </td>
                    ))}
                  </tr>
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
