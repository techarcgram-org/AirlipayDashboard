'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  Card,
  DataTable,
  ErrorState,
  Icon,
  KpiCard,
  PageHeader,
  PageLoading,
  SearchInput,
  SelectControl,
  StatusPill,
  TablePagination,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import { useClientsQuery, useInvoicesQuery } from '@/lib/api/queries';
import {
  asArray,
  enrichInvoice,
  invoiceClientId,
  invoiceEmployeeLines,
  invoiceFees,
  invoiceNumber,
  invoicePaymentReferences,
  invoiceServiceCharge,
  invoiceStatus,
  invoiceTaxes,
  invoiceTotal,
  transactionAmount,
  transactionDate,
  transactionRef,
  transactionStatus,
  transactionType,
  transactionTypeLabel,
} from '@/lib/data';
import { formatDate, formatMoney, formatNumber } from '@/lib/format';
import { isAdmin, isClient, isUser, scopeInvoices } from '@/lib/permissions';
import { EmployeeStatementsScreen } from './EmployeeStatementsScreen';
import { InvoiceStatusDialog } from './InvoiceStatusDialog';

const PAGE_SIZE = 8;
const EXPANDED_LINE_LIMIT = 25;

function invoiceRowKey(invoice) {
  return String(invoice.id ?? invoice.invoice_number ?? invoice.displayNumber ?? 'invoice');
}

function Metric({ label, value, strong = false }) {
  return (
    <div className="rounded-sm bg-surface px-3 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">{label}</p>
      <p className={`bo-numeric mt-1 text-[12px] ${strong ? 'font-bold text-ink' : 'font-medium text-ink-soft'}`}>
        {value}
      </p>
    </div>
  );
}

function InvoiceExpansion({ invoice }) {
  const lines = invoiceEmployeeLines(invoice);
  const references = invoicePaymentReferences(invoice);
  const isPaid = String(invoiceStatus(invoice)).toUpperCase() === 'TREATED';
  const employeeCount = new Set(
    lines.map((line) => String(line.employeeId ?? line.user_id ?? line.employeeName))
  ).size;
  const visibleLines = lines.slice(0, EXPANDED_LINE_LIMIT);

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-[13px] font-semibold text-ink">Invoice components</h3>
          <p className="mt-0.5 text-[10px] text-muted">
            {invoice.clientName} · {invoice.periodLabel}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] text-muted">
          <Icon name="shieldCheck" size={11} />
          Sourced from the invoice and transaction APIs
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        <Metric label="Gross amount" value={formatMoney(invoiceTotal(invoice))} />
        <Metric label="Fees" value={formatMoney(invoiceFees(invoice))} />
        <Metric label="Taxes" value={formatMoney(invoiceTaxes(invoice))} />
        <Metric label="Service charge" value={formatMoney(invoiceServiceCharge(invoice))} />
        <Metric
          label={isPaid ? 'Paid amount' : 'Net amount due'}
          value={formatMoney(invoiceTotal(invoice))}
          strong
        />
        <Metric label="Employees billed" value={employeeCount ? formatNumber(employeeCount) : '—'} />
      </div>

      <div className="rounded-sm border border-border bg-surface px-3.5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-light">
            Payment details
          </p>
          <Tag tone={isPaid ? 'success' : 'neutral'}>
            {isPaid ? 'Paid / treated' : 'Payment not recorded'}
          </Tag>
        </div>
        <p className="mt-1.5 text-[11px] leading-5 text-muted">
          {isPaid
            ? references.length
              ? `Payment references: ${references.slice(0, 4).join(', ')}${
                  references.length > 4 ? ` +${references.length - 4} more` : ''
                }`
              : 'No payment reference was stored on the employee transactions for this invoice.'
            : 'Payment references appear here once the invoice is marked as treated.'}
        </p>
      </div>

      <div className="overflow-hidden rounded-sm border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-light">
            Employee-level lines
          </p>
          <span className="text-[10px] text-muted">
            {lines.length
              ? `${formatNumber(visibleLines.length)} of ${formatNumber(lines.length)} lines`
              : 'No lines embedded'}
          </span>
        </div>
        {visibleLines.length ? (
          <div className="divide-y divide-border">
            {visibleLines.map((line, index) => (
              <div
                key={`${line.employeeId || line.employeeName}-${line.id || transactionRef(line)}-${index}`}
                className="grid grid-cols-1 gap-1.5 px-3.5 py-2.5 text-[11px] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_auto_auto] sm:items-center sm:gap-3"
              >
                <span className="truncate font-medium text-ink">
                  {line.employeeName || 'Unmatched employee'}
                </span>
                <span className="text-muted">{formatDate(transactionDate(line))}</span>
                <span className="truncate text-muted">{transactionRef(line)}</span>
                <span className="bo-numeric font-semibold text-ink sm:text-right">
                  {formatMoney(transactionAmount(line))}
                </span>
                <span className="sm:text-right">
                  <StatusPill status={transactionStatus(line)} size="sm" />
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="px-3.5 py-4 text-[11px] leading-5 text-muted">
            This invoice has no employee-level transaction lines. The invoice totals above are the
            authoritative amounts.
          </p>
        )}
        {lines.length > EXPANDED_LINE_LIMIT ? (
          <p className="border-t border-border px-3.5 py-2 text-[10px] text-muted">
            Showing the first {EXPANDED_LINE_LIMIT} lines.{' '}
            <Link href={`/dashboard/invoices/${invoice.id}`} className="font-semibold text-cobalt-text">
              Open the invoice
            </Link>{' '}
            for the full transaction table.
          </p>
        ) : null}
      </div>

      <p className="text-[10px] leading-4 text-muted">
        Amounts come from the invoice record; employee lines come from the transaction snapshot
        attached to the invoice. Transaction types:{' '}
        {Array.from(
          new Set(lines.map((line) => transactionTypeLabel(transactionType(line))))
        ).join(', ') || '—'}
        .
      </p>
    </div>
  );
}

export function InvoicesScreen() {
  const { session } = useAuth();
  if (isUser(session?.role)) {
    return <EmployeeStatementsScreen />;
  }
  return <EmployerInvoicesScreen />;
}

function EmployerInvoicesScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const invoicesQuery = useInvoicesQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [statusTarget, setStatusTarget] = useState(null);

  const toggleExpanded = (invoice) => {
    const key = invoiceRowKey(invoice);
    setExpandedKeys((current) =>
      current.includes(key)
        ? current.filter((entry) => entry !== key)
        : [...current, key]
    );
  };

  const clients = asArray(clientsQuery.data);
  const invoices = useMemo(
    () =>
      scopeInvoices(asArray(invoicesQuery.data), role, userId)
        .map((invoice) =>
          enrichInvoice(invoice, clients).clientName === '—' && isClient(role)
            ? { ...enrichInvoice(invoice, clients), clientName: session?.profile?.name || '—' }
            : enrichInvoice(invoice, clients)
        )
        .sort((left, right) => new Date(right.from || right.created_at || 0) - new Date(left.from || left.created_at || 0)),
    [clients, invoicesQuery.data, role, session?.profile?.name, userId]
  );

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return invoices
      .filter((invoice) => !status || String(invoiceStatus(invoice)).toUpperCase() === status)
      .filter((invoice) => {
        if (!needle) return true;
        return [invoiceNumber(invoice), invoice.clientName, invoiceClientId(invoice)]
          .some((value) => String(value || '').toLowerCase().includes(needle));
      });
  }, [invoices, search, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const treated = filtered.filter((invoice) => String(invoiceStatus(invoice)).toUpperCase() === 'TREATED');
  const outstanding = filtered.filter((invoice) => String(invoiceStatus(invoice)).toUpperCase() !== 'TREATED');
  const treatedTotal = treated.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  const outstandingTotal = outstanding.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  const feesTotal = filtered.reduce((sum, invoice) => sum + invoiceFees(invoice), 0);
  const serviceChargeTotal = filtered.reduce((sum, invoice) => sum + invoiceServiceCharge(invoice), 0);

  const columns = [
    {
      key: 'invoice',
      label: 'Invoice',
      width: '17%',
      cell: (invoice) => {
        const body = (
          <>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-surface-sunken text-muted">
              <Icon name="invoices" size={13} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-ink hover:text-cobalt-text">{invoiceNumber(invoice)}</p>
              {invoice.id === null || invoice.id === undefined ? null : <p className="text-[9px] text-muted">ID {invoice.id}</p>}
            </div>
          </>
        );
        if (invoice.id === null || invoice.id === undefined) {
          return <div className="flex items-center gap-2">{body}</div>;
        }
        return (
          <Link href={`/dashboard/invoices/${invoice.id}`} className="flex items-center gap-2">
            {body}
          </Link>
        );
      },
      csvValue: (invoice) => invoiceNumber(invoice),
    },
    {
      key: 'client',
      label: 'Client',
      width: '20%',
      cell: (invoice) => <span className="block max-w-[190px] truncate text-[11px]">{invoice.clientName}</span>,
      csvValue: (invoice) => invoice.clientName,
    },
    {
      key: 'period',
      label: 'Period',
      width: '19%',
      cell: (invoice) => <span className="whitespace-nowrap text-[11px]">{invoice.periodLabel}</span>,
      csvValue: (invoice) => invoice.periodLabel,
    },
    {
      key: 'fees',
      label: 'Fees',
      align: 'right',
      width: '10%',
      cell: (invoice) => <span className="bo-numeric whitespace-nowrap">{formatMoney(invoiceFees(invoice))}</span>,
      csvValue: (invoice) => invoiceFees(invoice),
    },
    {
      key: 'serviceCharge',
      label: 'Service charge',
      align: 'right',
      width: '12%',
      cell: (invoice) => <span className="bo-numeric whitespace-nowrap">{formatMoney(invoiceServiceCharge(invoice))}</span>,
      csvValue: (invoice) => invoiceServiceCharge(invoice),
    },
    {
      key: 'total',
      label: 'Total amount',
      align: 'right',
      width: '13%',
      cell: (invoice) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(invoiceTotal(invoice))}</span>,
      csvValue: (invoice) => invoiceTotal(invoice),
    },
    {
      key: 'status',
      label: 'Status',
      width: '9%',
      cell: (invoice) => <StatusPill status={invoiceStatus(invoice)} size="sm" />,
      csvValue: (invoice) => invoiceStatus(invoice),
    },
    ...(isAdmin(role)
      ? [
          {
            key: 'actions',
            label: '',
            width: '12%',
            align: 'right',
            cell: (invoice) =>
              invoice.id === null || invoice.id === undefined ? (
                <Tag tone="neutral">Not issued</Tag>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  icon="activity"
                  onClick={(event) => {
                    event.stopPropagation();
                    setStatusTarget(invoice);
                  }}
                >
                  Status
                </Button>
              ),
          },
        ]
      : []),
  ];

  if (invoicesQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Invoices' }]} title="Invoices" />
        <PageLoading />
      </div>
    );
  }

  if (invoicesQuery.error && !invoices.length) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Invoices' }]} title="Invoices" />
        <Card>
          <ErrorState
            title="Invoices could not be loaded"
            error={invoicesQuery.error}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => invoicesQuery.refetch()}>Try again</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Invoices' }]}
        title="Invoices"
        description="Reimbursement invoices generated from employee early-wage activity. Expand any row to inspect components and payment details."
        actions={
          <Button
            variant="secondary"
            icon="download"
            disabled={!filtered.length}
            onClick={() =>
              exportCsv(
                'invoices',
                [
                  { label: 'Invoice', csvValue: (invoice) => invoiceNumber(invoice) },
                  { label: 'Client', csvValue: (invoice) => invoice.clientName },
                  { label: 'Period', csvValue: (invoice) => invoice.periodLabel },
                  { label: 'Fees', csvValue: (invoice) => invoiceFees(invoice) },
                  { label: 'Service charge', csvValue: (invoice) => invoiceServiceCharge(invoice) },
                  { label: 'Taxes', csvValue: (invoice) => invoice.taxes ?? 0 },
                  { label: 'Total', csvValue: (invoice) => invoiceTotal(invoice) },
                  { label: 'Status', csvValue: (invoice) => invoiceStatus(invoice) },
                ],
                filtered
              )
            }
          >
            Export
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Outstanding" value={formatMoney(outstandingTotal)} icon="invoices" hint={`${formatNumber(outstanding.length)} invoices awaiting treatment`} />
        <KpiCard label="Treated" value={formatMoney(treatedTotal)} icon="checkCircle" hint={`${formatNumber(treated.length)} treated invoices`} />
        <KpiCard label="Fees billed" value={formatMoney(feesTotal)} icon="wallet" hint={`${formatNumber(filtered.length)} invoices in view`} />
        <KpiCard label="Service charges billed" value={formatMoney(serviceChargeTotal)} icon="sliders" hint="company-paid monthly fees" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search invoice number or client"
          className="w-full sm:min-w-[250px] sm:flex-1"
          aria-label="Search invoices"
        />
        <SelectControl
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'TREATED', label: 'Treated' },
            { value: 'NOT_TREATED', label: 'Not treated' },
            { value: 'PENDING', label: 'Pending' },
          ]}
          placeholder="All statuses"
          icon="filter"
          label="Filter invoices by status"
          className="w-full sm:w-auto sm:min-w-[155px]"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="invoices" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">Invoices</h2>
            <span className="text-[10px] text-muted">{formatNumber(filtered.length)} in this view</span>
          </div>
          <span className="text-[10px] text-muted">
            Status overrides are admin-only and audit-logged
          </span>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          rowKey={(invoice) => invoiceRowKey(invoice)}
          expandedKeys={expandedKeys}
          onToggleExpand={toggleExpanded}
          renderExpandedRow={(invoice) => <InvoiceExpansion invoice={invoice} />}
          loading={invoicesQuery.isFetching && !invoices.length}
          minWidth={960}
          emptyTitle={search || status ? 'No invoices match' : 'No invoices yet'}
          emptyDescription={
            search || status
              ? 'Try a different search term or clear the status filter.'
              : 'Invoices will appear here once payroll cycles have been billed.'
          }
          emptyAction={
            search || status ? (
              <Button variant="secondary" size="sm" onClick={() => { setSearch(''); setStatus(''); setPage(1); }}>Clear filters</Button>
            ) : null
          }
          footer={
            <TablePagination
              page={safePage}
              pages={pages}
              onPageChange={setPage}
              label={`Showing ${rows.length} of ${formatNumber(filtered.length)} invoices`}
            />
          }
        />
      </Card>

      <InvoiceStatusDialog
        invoice={statusTarget}
        open={Boolean(statusTarget)}
        onClose={() => setStatusTarget(null)}
      />
    </div>
  );
}
