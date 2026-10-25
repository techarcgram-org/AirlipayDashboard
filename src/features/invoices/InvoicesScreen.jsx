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
  exportCsv,
} from '@/components/backoffice';
import { useClientsQuery, useInvoicesQuery } from '@/lib/api/queries';
import {
  asArray,
  enrichInvoice,
  invoiceClientId,
  invoiceFees,
  invoiceNumber,
  invoiceStatus,
  invoiceTotal,
} from '@/lib/data';
import { formatMoney, formatNumber } from '@/lib/format';
import { isAdmin, isClient, scopeInvoices } from '@/lib/permissions';

const PAGE_SIZE = 8;

export function InvoicesScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const invoicesQuery = useInvoicesQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

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

  const columns = [
    {
      key: 'invoice',
      label: 'Invoice',
      width: '18%',
      cell: (invoice) => (
        <Link href={`/dashboard/invoices/${invoice.id}`} className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-surface-sunken text-muted">
            <Icon name="invoices" size={13} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-ink hover:text-cobalt-text">{invoiceNumber(invoice)}</p>
            <p className="text-[9px] text-muted">ID {invoice.id}</p>
          </div>
        </Link>
      ),
      csvValue: (invoice) => invoiceNumber(invoice),
    },
    {
      key: 'client',
      label: 'Client',
      width: '22%',
      cell: (invoice) => <span className="block max-w-[190px] truncate text-[11px]">{invoice.clientName}</span>,
      csvValue: (invoice) => invoice.clientName,
    },
    {
      key: 'period',
      label: 'Period',
      width: '22%',
      cell: (invoice) => <span className="whitespace-nowrap text-[11px]">{invoice.periodLabel}</span>,
      csvValue: (invoice) => invoice.periodLabel,
    },
    {
      key: 'fees',
      label: 'Fees',
      align: 'right',
      width: '12%',
      cell: (invoice) => <span className="bo-numeric whitespace-nowrap">{formatMoney(invoiceFees(invoice))}</span>,
      csvValue: (invoice) => invoiceFees(invoice),
    },
    {
      key: 'total',
      label: 'Total amount',
      align: 'right',
      width: '14%',
      cell: (invoice) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(invoiceTotal(invoice))}</span>,
      csvValue: (invoice) => invoiceTotal(invoice),
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      cell: (invoice) => <StatusPill status={invoiceStatus(invoice)} size="sm" />,
      csvValue: (invoice) => invoiceStatus(invoice),
    },
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
        description="Reimbursement invoices generated from employee early-wage activity."
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Outstanding" value={formatMoney(outstandingTotal)} icon="invoices" hint={`${formatNumber(outstanding.length)} invoices awaiting treatment`} />
        <KpiCard label="Treated" value={formatMoney(treatedTotal)} icon="checkCircle" hint={`${formatNumber(treated.length)} treated invoices`} />
        <KpiCard label="Fees billed" value={formatMoney(feesTotal)} icon="wallet" hint={`${formatNumber(filtered.length)} invoices in view`} />
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
          <span className="text-[10px] text-muted">Status writes stay on the invoice resource</span>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={invoicesQuery.isFetching && !invoices.length}
          minWidth={880}
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
    </div>
  );
}
