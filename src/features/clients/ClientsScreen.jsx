'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Avatar,
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
import { useClientsQuery, useInvoicesQuery, useUsersQuery } from '@/lib/api/queries';
import {
  asArray,
  invoiceNumber,
  invoiceStatus,
  invoiceTotal,
  normalizeClient,
  normalizeUser,
  personJoined,
} from '@/lib/data';
import { formatDate, formatMoney, formatNumber } from '@/lib/format';
import { isAdmin, sameId } from '@/lib/permissions';

const PAGE_SIZE = 6;

function employeeCount(users, clientId) {
  return users.filter((user) => sameId(user.clientId, clientId)).length;
}

function clientSearchValues(client) {
  return [client.displayName, client.email, client.phone, client.taxId, client.industry];
}

function ClientCell({ client }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar name={client.displayName} initials={client.initials} size={30} tone="brand" />
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-ink">{client.displayName}</p>
        <p className="truncate text-[10px] text-muted">
          {[client.city, client.email].filter((part) => part && part !== '—').join(' · ') || 'No contact'}
        </p>
      </div>
    </div>
  );
}

function ClientInspector({ client, employees, invoice, canManage }) {
  if (!client) {
    return (
      <Card className="flex min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-sunken text-muted">
          <Icon name="clients" size={18} />
        </span>
        <p className="text-[13px] font-semibold text-ink">Select a client</p>
        <p className="max-w-[240px] text-[11px] leading-5 text-muted">
          Review the employer record, workforce and latest invoice before opening the full profile.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start gap-3 p-5">
        <Avatar name={client.displayName} initials={client.initials} size={44} tone="brand" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-ink">{client.displayName}</p>
          <p className="mt-0.5 truncate text-[10px] text-muted">{client.industry}</p>
        </div>
        <StatusPill status={client.status} size="sm" />
      </div>

      <div className="mx-5 rounded-sm bg-cobalt-soft px-3.5 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-cobalt-text">Workforce</p>
        <p className="bo-numeric mt-1 text-[22px] font-bold text-ink">{formatNumber(employees)}</p>
        <p className="mt-0.5 text-[10px] text-muted">
          {client.nextPaymentDate ? `Next payment ${formatDate(client.nextPaymentDate)}` : 'No next payment date on record'}
        </p>
      </div>

      <div className="px-5 pb-1 pt-4">
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Account email</span>
          <span className="max-w-[62%] truncate text-right text-[11px] font-medium text-ink">{client.email}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Primary phone</span>
          <span className="text-right text-[11px] font-medium text-ink">{client.phone}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Location</span>
          <span className="max-w-[62%] truncate text-right text-[11px] font-medium text-ink">
            {[client.city, client.region].filter((part) => part && part !== '—').join(', ') || '—'}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Next payment</span>
          <span className="text-right text-[11px] font-medium text-ink">{formatDate(client.nextPaymentDate)}</span>
        </div>
      </div>

      <div className="border-t border-border px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">Latest invoice</p>
          <Link href={`/dashboard/clients/${client.id}/payment-history`} className="text-[10px] font-semibold text-cobalt-text">
            View all
          </Link>
        </div>
        {invoice ? (
          <div className="mt-2.5 flex items-start gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-info-soft text-info">
              <Icon name="invoices" size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-semibold text-ink">{invoiceNumber(invoice)}</p>
              <p className="bo-numeric truncate text-[10px] text-muted">
                {formatMoney(invoiceTotal(invoice))} · {formatDate(invoice.from)}
              </p>
            </div>
            <StatusPill status={invoiceStatus(invoice)} size="sm" />
          </div>
        ) : (
          <p className="mt-2 text-[11px] leading-5 text-muted">No invoices on record for this client.</p>
        )}
      </div>

      <div className="space-y-2 border-t border-border p-4">
        <Button href={`/dashboard/clients/${client.id}`} fullWidth trailingIcon="arrowRight">
          Open client
        </Button>
        {canManage ? (
          <Button href={`/dashboard/clients/${client.id}/edit`} variant="secondary" icon="edit" fullWidth>
            Edit client
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export function ClientsScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const usersQuery = useUsersQuery({ enabled: isAdmin(role) });
  const invoicesQuery = useInvoicesQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const clients = useMemo(
    () => asArray(clientsQuery.data).map(normalizeClient),
    [clientsQuery.data]
  );
  const users = useMemo(() => asArray(usersQuery.data).map(normalizeUser), [usersQuery.data]);
  const invoices = useMemo(() => asArray(invoicesQuery.data), [invoicesQuery.data]);
  const industries = useMemo(
    () =>
      [...new Set(clients.map((client) => client.industry).filter((value) => value && value !== '—'))]
        .sort()
        .map((value) => ({ value, label: value })),
    [clients]
  );

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const matching = clients
      .filter((client) => !needle || clientSearchValues(client).some((value) => String(value || '').toLowerCase().includes(needle)))
      .filter((client) => !industry || client.industry === industry)
      .filter((client) => !status || String(client.status || '').toUpperCase() === status);
    return matching.sort((left, right) => {
      if (sort === 'joined') return new Date(personJoined(right) || 0) - new Date(personJoined(left) || 0);
      if (sort === 'employees') return employeeCount(users, right.id) - employeeCount(users, left.id);
      return String(left.displayName).localeCompare(String(right.displayName));
    });
  }, [clients, industry, search, sort, status, users]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const selected = filtered.find((client) => sameId(client.id, selectedId)) || rows[0] || null;
  const activeClients = clients.filter((client) => client.status === 'ACTIVE').length;
  const employeesCovered = users.length;
  const outstanding = invoices.filter((invoice) => String(invoice.status || '').toUpperCase() !== 'TREATED');
  const outstandingTotal = outstanding.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);

  const selectedInvoice = selected
    ? [...invoices]
        .filter((invoice) => sameId(invoice.client_id ?? invoice?.client?.id, selected.id))
        .sort((left, right) => new Date(right.created_at || right.from || 0) - new Date(left.created_at || left.from || 0))[0]
    : null;

  const columns = [
    {
      key: 'client',
      label: 'Client',
      width: '33%',
      cell: (client) => <ClientCell client={client} />,
    },
    {
      key: 'industry',
      label: 'Industry',
      width: '18%',
      cell: (client) => <span className="block max-w-[150px] truncate">{client.industry}</span>,
    },
    {
      key: 'employees',
      label: 'Employees',
      align: 'right',
      width: '12%',
      cell: (client) => <span className="bo-numeric">{formatNumber(employeeCount(users, client.id))}</span>,
    },
    {
      key: 'next',
      label: 'Next payout',
      width: '17%',
      cell: (client) => (
        <div>
          <p className="text-[11px] text-ink-soft">{formatDate(client.nextPaymentDate)}</p>
          <p className="text-[9px] text-muted">From client record</p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      cell: (client) => <StatusPill status={client.status} size="sm" />,
    },
  ];

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Clients are restricted"
          error={{ message: 'Only operations admins can view the employer portfolio. Your employee or client account keeps its existing scope.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (clientsQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Clients' }]} title="Clients" />
        <PageLoading />
      </div>
    );
  }

  if (clientsQuery.error && !clients.length) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Clients' }]} title="Clients" />
        <Card>
          <ErrorState
            title="The employer portfolio could not be loaded"
            error={clientsQuery.error}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => clientsQuery.refetch()}>Try again</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Clients' }]}
        title="Clients"
        description={`${formatNumber(clients.length)} employers · ${formatNumber(employeesCovered)} employees covered.`}
        actions={
          <>
            <Button
              variant="secondary"
              icon="download"
              disabled={!filtered.length}
              onClick={() =>
                exportCsv(
                  'client-portfolio',
                  [
                    { label: 'Client', csvValue: (client) => client.displayName },
                    { label: 'Email', csvValue: (client) => client.email },
                    { label: 'Industry', csvValue: (client) => client.industry },
                    { label: 'Employees', csvValue: (client) => employeeCount(users, client.id) },
                    { label: 'Next payment', csvValue: (client) => client.nextPaymentDate || '' },
                    { label: 'Status', csvValue: (client) => client.status },
                  ],
                  filtered
                )
              }
            >
              Export
            </Button>
            <Button href="/dashboard/clients/addClient" icon="plus">
              Add client
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Active employers" value={formatNumber(activeClients)} icon="clients" hint={`${formatNumber(clients.length)} total`} />
        <KpiCard label="Employees covered" value={formatNumber(employeesCovered)} icon="users" hint="live employee records" />
        <KpiCard
          label="Invoices outstanding"
          value={formatMoney(outstandingTotal)}
          icon="invoices"
          hint={`${formatNumber(outstanding.length)} awaiting treatment`}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search clients, contact or tax ID"
          className="w-full sm:min-w-[240px] sm:flex-1"
          aria-label="Search clients"
        />
        <SelectControl
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value);
            setPage(1);
          }}
          options={industries}
          placeholder="All industries"
          icon="briefcase"
          label="Filter by industry"
          className="w-full sm:w-auto sm:min-w-[165px]"
        />
        <SelectControl
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'ACTIVE', label: 'Active' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'DEACTIVATED', label: 'Deactivated' },
            { value: 'BLOCKED', label: 'Blocked' },
          ]}
          placeholder="All statuses"
          icon="filter"
          label="Filter by status"
          className="w-full sm:w-auto sm:min-w-[150px]"
        />
        <SelectControl
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          options={[
            { value: 'name', label: 'Name A–Z' },
            { value: 'joined', label: 'Newest first' },
            { value: 'employees', label: 'Most employees' },
          ]}
          icon="list"
          label="Sort clients"
          className="w-full sm:w-auto sm:min-w-[160px]"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 min-[1360px]:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="clients" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Employer portfolio</h2>
              <span className="text-[10px] text-muted">{formatNumber(filtered.length)} shown</span>
            </div>
            <Tag tone="neutral">Live records</Tag>
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            loading={clientsQuery.isFetching && !clients.length}
            selectedKey={selected?.id}
            onRowSelect={(client) => setSelectedId(client.id)}
            minWidth={700}
            emptyTitle={search || industry || status ? 'No clients match' : 'No clients yet'}
            emptyDescription={
              search || industry || status
                ? 'Try a different search term or clear the filters.'
                : 'Add the first employer to start onboarding a workforce.'
            }
            emptyAction={
              search || industry || status ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setIndustry('');
                    setStatus('');
                    setPage(1);
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button href="/dashboard/clients/addClient" size="sm" icon="plus">Add client</Button>
              )
            }
            footer={
              <TablePagination
                page={safePage}
                pages={pages}
                onPageChange={setPage}
                label={`${filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–${(safePage - 1) * PAGE_SIZE + rows.length} of ${formatNumber(filtered.length)} employers`}
              />
            }
          />
        </Card>
        <div className="min-[1360px]:sticky min-[1360px]:top-20">
          <ClientInspector
            client={selected}
            employees={selected ? employeeCount(users, selected.id) : 0}
            invoice={selectedInvoice}
            canManage={isAdmin(role)}
          />
        </div>
      </div>
    </div>
  );
}
