'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Avatar,
  Button,
  Card,
  DataTable,
  ErrorState,
  Icon,
  InlineNotice,
  KpiCard,
  PageHeader,
  PageLoading,
  SearchInput,
  SelectControl,
  StatusPill,
  SupportNotice,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import {
  useClientQuery,
  useInvoicesQuery,
  useTransactionsQuery,
  useUsersQuery,
} from '@/lib/api/queries';
import {
  asArray,
  attachUsersToTransactions,
  invoiceFees,
  invoiceNumber,
  invoicePeriod,
  invoiceStatus,
  invoiceTotal,
  normalizeClient,
  normalizeUser,
  payoutDestination,
  personJoined,
  transactionAmount,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
  transactionType,
} from '@/lib/data';
import { formatDate, formatDateTime, formatMoney, formatNumber } from '@/lib/format';
import { isAdmin, sameId } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';
import { BANK_OPTIONS, optionLabel } from '@/features/shared/options';
import { sampleClientFunding } from '@/fixtures/backoffice';

const TAB_SUFFIX = {
  transactions: '',
  workforce: '/user-roster',
  funding: '/bank-accounts',
  payments: '/payment-history',
};

function EmployeeRoster({ client, users }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [channel, setChannel] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const roster = users.filter((user) => sameId(user.clientId, client.id));

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return roster
      .filter((user) => !needle || [user.displayName, user.email, user.employeeId].some((value) => String(value || '').toLowerCase().includes(needle)))
      .filter((user) => !status || String(user.status || '').toUpperCase() === status)
      .filter((user) => {
        if (!channel) return true;
        const destination = payoutDestination(user);
        return channel === 'MISSING' ? !destination : String(destination?.operator || '').toUpperCase().includes(channel);
      });
  }, [channel, roster, search, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const active = roster.filter((user) => user.status === 'ACTIVE').length;
  const missing = roster.filter((user) => !payoutDestination(user)).length;
  const operators = [...new Set(roster.map((user) => payoutDestination(user)?.operator).filter(Boolean))];

  const columns = [
    {
      key: 'employee',
      label: 'Employee',
      width: '31%',
      cell: (user) => (
        <Link href={`/dashboard/users/${user.id}`} className="flex min-w-0 items-center gap-2.5">
          <Avatar name={user.displayName} initials={user.initials} size={28} tone="brand" />
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-ink hover:text-cobalt-text">{user.displayName}</p>
            <p className="truncate text-[10px] text-muted">{user.email}</p>
          </div>
        </Link>
      ),
      csvValue: (user) => user.displayName,
    },
    { key: 'employeeId', label: 'Employee ID', width: '14%', cell: (user) => <span className="whitespace-nowrap text-[11px]">{user.employeeId}</span> },
    {
      key: 'destination',
      label: 'Payout destination',
      width: '20%',
      cell: (user) => {
        const destination = payoutDestination(user);
        return destination ? (
          <span className="whitespace-nowrap text-[11px]">{destination.label}</span>
        ) : (
          <Tag tone="warning">Missing</Tag>
        );
      },
    },
    {
      key: 'salary',
      label: 'Base salary',
      align: 'right',
      width: '14%',
      cell: (user) => (
        <span className="bo-numeric whitespace-nowrap text-[11px]">
          {user.baseSalary === null || user.baseSalary === undefined ? '—' : formatMoney(user.baseSalary)}
        </span>
      ),
      csvValue: (user) => user.baseSalary ?? '',
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      cell: (user) => <StatusPill status={user.status} size="sm" />,
      csvValue: (user) => user.status,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Workforce" value={formatNumber(roster.length)} icon="users" hint={client.city} />
        <KpiCard label="Active employees" value={formatNumber(active)} icon="checkCircle" hint={`${roster.length ? Math.round((active / roster.length) * 100) : 0}% of roster`} />
        <KpiCard label="Payout account missing" value={formatNumber(missing)} icon="alert" hint={missing ? 'needs action before payday' : 'all employees payable'} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search employee name or ID"
          className="w-full sm:min-w-[230px] sm:flex-1"
          aria-label="Search workforce"
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
          label="Filter workforce by status"
          className="w-full sm:w-auto sm:min-w-[150px]"
        />
        <SelectControl
          value={channel}
          onChange={(event) => {
            setChannel(event.target.value);
            setPage(1);
          }}
          options={[{ value: 'MISSING', label: 'Missing destination' }, ...operators.map((operator) => ({ value: operator.toUpperCase(), label: operator }))]}
          placeholder="All payout channels"
          icon="phone"
          label="Filter workforce by payout channel"
          className="w-full sm:w-auto sm:min-w-[175px]"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="users" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">Workforce roster</h2>
            <span className="text-[10px] text-muted">{formatNumber(filtered.length)} matched</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon="download"
              disabled={!filtered.length}
              onClick={() =>
                exportCsv(
                  `client-${client.id}-workforce`,
                  [
                    { label: 'Employee', csvValue: (user) => user.displayName },
                    { label: 'Email', csvValue: (user) => user.email },
                    { label: 'Employee ID', csvValue: (user) => user.employeeId },
                    { label: 'Payout destination', csvValue: (user) => payoutDestination(user)?.label || '' },
                    { label: 'Base salary', csvValue: (user) => user.baseSalary ?? '' },
                    { label: 'Status', csvValue: (user) => user.status },
                  ],
                  filtered
                )
              }
            >
              Download CSV
            </Button>
            <Button href="/dashboard/users/addUser" variant="secondary" size="sm" icon="plus">
              Add employee
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          minWidth={720}
          emptyTitle="No employees match"
          emptyDescription="Adjust the filters or add an employee to this employer."
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] text-muted">
                {filtered.length ? (safePage - 1) * pageSize + 1 : 0}–{(safePage - 1) * pageSize + rows.length} of {formatNumber(filtered.length)} employees
              </p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>Previous</Button>
                <span className="text-[11px] text-muted">{safePage} / {pages}</span>
                <Button variant="secondary" size="sm" disabled={safePage >= pages} onClick={() => setPage(safePage + 1)}>Next</Button>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
}

function FundingAccounts({ client }) {
  const accounts = sampleClientFunding;
  return (
    <div className="space-y-4">
      <SupportNotice capability={CAPABILITIES.clientFunding} />
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="bank" size={16} className="text-muted" />
              <h2 className="text-[14px] font-semibold text-ink">Funding accounts</h2>
            </div>
            <p className="mt-1 text-[11px] text-muted">Employer money in, employee payouts out.</p>
          </div>
          <Tag tone="warning">Sample data</Tag>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {accounts.map((account, index) => (
            <div key={account.id} className={`rounded-md border p-4 ${index === 0 ? 'border-cobalt bg-cobalt-soft' : 'border-border bg-surface'}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Icon name="bank" size={15} className="text-muted" />
                  <div>
                    <p className="text-[12px] font-semibold text-ink">{account.bank}</p>
                    <p className="text-[10px] text-muted">{account.label}</p>
                  </div>
                </div>
                <StatusPill status={account.status} size="sm" />
              </div>
              <p className="bo-numeric mt-3 text-[17px] font-semibold tracking-[0.03em] text-ink">{account.account}</p>
              <p className="bo-numeric mt-1 text-[10px] text-muted">
                {account.balance ? formatMoney(account.balance) : 'No balance shown'}
              </p>
              {index === 0 ? <Tag tone="brand" className="mt-2">Primary</Tag> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          <Button variant="secondary" size="sm" icon="plus" disabled title="Funding-account writes are not available.">Add funding account</Button>
          <Button variant="ghost" size="sm" disabled title="Funding-account writes are not available.">Set primary account</Button>
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-[13px] font-semibold text-ink">Funding schedule</h2>
          <div className="mt-3 flex items-baseline justify-between gap-3 border-b border-border py-2 text-[11px]">
            <span className="text-muted">Next payment date</span>
            <span className="font-medium text-ink">{formatDate(client.nextPaymentDate)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-b border-border py-2 text-[11px]">
            <span className="text-muted">Projected amount</span>
            <span className="font-medium text-ink">Not provided by API</span>
          </div>
          <div className="flex items-baseline justify-between gap-3 py-2 text-[11px]">
            <span className="text-muted">Funding status</span>
            <span className="font-medium text-ink">Unavailable</span>
          </div>
        </Card>
        <InlineNotice tone="warning" title="Funding screen is read-only">
          Client funding accounts, balances and settlement controls require a dedicated banking API. The accounts above
          are deterministic sample data and cannot move money.
        </InlineNotice>
      </div>
    </div>
  );
}

function PaymentHistory({ client, invoices }) {
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const clientInvoices = useMemo(
    () => invoices.filter((invoice) => sameId(invoice.client_id ?? invoice?.client?.id, client.id)),
    [client.id, invoices]
  );

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return clientInvoices
      .filter((invoice) => !status || String(invoiceStatus(invoice)).toUpperCase() === status)
      .filter((invoice) => !needle || invoiceNumber(invoice).toLowerCase().includes(needle))
      .sort((left, right) => new Date(right.from || right.created_at || 0) - new Date(left.from || left.created_at || 0));
  }, [clientInvoices, search, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const outstanding = clientInvoices.filter((invoice) => String(invoiceStatus(invoice)).toUpperCase() !== 'TREATED');
  const outstandingTotal = outstanding.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  const treatedTotal = clientInvoices
    .filter((invoice) => String(invoiceStatus(invoice)).toUpperCase() === 'TREATED')
    .reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);

  const columns = [
    {
      key: 'invoice',
      label: 'Invoice',
      width: '18%',
      cell: (invoice) => (
        <Link href={`/dashboard/invoices/${invoice.id}`} className="font-semibold text-ink hover:text-cobalt-text">
          {invoiceNumber(invoice)}
        </Link>
      ),
    },
    { key: 'period', label: 'Pay period', width: '28%', cell: (invoice) => <span className="text-[11px]">{invoicePeriod(invoice)}</span> },
    { key: 'fees', label: 'Fees', align: 'right', width: '14%', cell: (invoice) => <span className="bo-numeric">{formatMoney(invoiceFees(invoice))}</span> },
    { key: 'taxes', label: 'Taxes', align: 'right', width: '12%', cell: (invoice) => <span className="bo-numeric">{formatMoney(Number(invoice.taxes ?? 0))}</span> },
    { key: 'total', label: 'Total', align: 'right', width: '15%', cell: (invoice) => <span className="bo-numeric font-semibold text-ink">{formatMoney(invoiceTotal(invoice))}</span> },
    { key: 'status', label: 'Status', width: '13%', cell: (invoice) => <StatusPill status={invoiceStatus(invoice)} size="sm" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Invoices" value={formatNumber(clientInvoices.length)} icon="invoices" hint="all billing cycles" />
        <KpiCard label="Treated" value={formatMoney(treatedTotal)} icon="checkCircle" hint={`${clientInvoices.length - outstanding.length} settled invoices`} />
        <KpiCard label="Outstanding" value={formatMoney(outstandingTotal)} icon="clock" hint={`${outstanding.length} awaiting treatment`} />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search invoice number"
          className="w-full sm:min-w-[230px] sm:flex-1"
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
          ]}
          placeholder="All statuses"
          icon="filter"
          label="Filter invoices by status"
          className="w-full sm:w-auto sm:min-w-[150px]"
        />
      </div>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="invoices" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">Invoice history</h2>
          </div>
          <Tag tone="neutral">Live records</Tag>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          error={null}
          minWidth={760}
          emptyTitle="No invoices for this client"
          emptyDescription="Invoices will appear here once a payroll cycle has been billed."
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] text-muted">{rows.length} of {formatNumber(filtered.length)} invoices</p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>Previous</Button>
                <span className="text-[11px] text-muted">{safePage} / {pages}</span>
                <Button variant="secondary" size="sm" disabled={safePage >= pages} onClick={() => setPage(safePage + 1)}>Next</Button>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
}

function ClientTransactions({ client, users, transactions }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const clientUserIds = new Set(users.filter((user) => sameId(user.clientId, client.id)).map((user) => String(user.id)));
  const rowsForClient = transactions
    .filter((transaction) => clientUserIds.has(String(transaction.user_id)))
    .sort((left, right) => new Date(transactionDate(right) || 0) - new Date(transactionDate(left) || 0));

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return rowsForClient
      .filter((transaction) => status === 'ALL' || String(transactionStatus(transaction)).toUpperCase() === status)
      .filter((transaction) => type === 'ALL' || String(transactionType(transaction)).toUpperCase() === type)
      .filter((transaction) => !needle || [transactionRef(transaction), transaction.employeeName, transaction.phone_number].some((value) => String(value || '').toLowerCase().includes(needle)));
  }, [rowsForClient, search, status, type]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  const withdrawTotal = filtered
    .filter((transaction) => String(transactionType(transaction)).toUpperCase() === 'WITHDRAW' && String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS')
    .reduce((sum, transaction) => sum + transactionAmount(transaction), 0);

  const columns = [
    {
      key: 'date',
      label: 'Date',
      width: '15%',
      cell: (transaction) => <span className="whitespace-nowrap text-[11px]">{formatDateTime(transactionDate(transaction))}</span>,
    },
    {
      key: 'transaction',
      label: 'Transaction',
      width: '24%',
      cell: (transaction) => (
        <div>
          <p className="text-[12px] font-semibold text-ink">
            {String(transactionType(transaction)).toUpperCase() === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding'}
          </p>
          <p className="text-[10px] text-muted">{transactionRef(transaction)}</p>
        </div>
      ),
    },
    { key: 'employee', label: 'Employee', width: '19%', cell: (transaction) => <span className="block max-w-[160px] truncate text-[11px]">{transaction.employeeName}</span> },
    { key: 'amount', label: 'Amount', align: 'right', width: '14%', cell: (transaction) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(transactionAmount(transaction))}</span> },
    { key: 'fee', label: 'Fee', align: 'right', width: '11%', cell: (transaction) => <span className="bo-numeric whitespace-nowrap">{formatMoney(transactionFee(transaction))}</span> },
    { key: 'status', label: 'Status', width: '12%', cell: (transaction) => <StatusPill status={transactionStatus(transaction)} size="sm" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Client movements" value={formatNumber(rowsForClient.length)} icon="transactions" hint="latest 100 ledger entries" />
        <KpiCard label="Successful withdrawals" value={formatMoney(withdrawTotal)} icon="trendUp" hint="in the current filter" />
        <KpiCard
          label="Failed movements"
          value={formatNumber(rowsForClient.filter((transaction) => String(transactionStatus(transaction)).toUpperCase() === 'FAILED').length)}
          icon="alert"
          hint="all statuses, latest 100"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search transaction or employee"
          className="w-full sm:min-w-[230px] sm:flex-1"
          aria-label="Search client transactions"
        />
        <SelectControl
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'SUCCESS', label: 'Successful' },
            { value: 'FAILED', label: 'Failed' },
          ]}
          placeholder="All statuses"
          icon="filter"
          label="Filter transactions by status"
          className="w-full sm:w-auto sm:min-w-[145px]"
        />
        <SelectControl
          value={type}
          onChange={(event) => {
            setType(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'WITHDRAW', label: 'Withdrawals' },
            { value: 'DEPOSIT', label: 'Funding' },
          ]}
          placeholder="All types"
          icon="list"
          label="Filter transactions by type"
          className="w-full sm:w-auto sm:min-w-[145px]"
        />
        <Button
          variant="secondary"
          size="sm"
          icon="download"
          disabled={!filtered.length}
          onClick={() =>
            exportCsv(
              `client-${client.id}-transactions`,
              [
                { label: 'Date', csvValue: (transaction) => transactionDate(transaction) },
                { label: 'Reference', csvValue: (transaction) => transactionRef(transaction) },
                { label: 'Employee', csvValue: (transaction) => transaction.employeeName },
                { label: 'Type', csvValue: (transaction) => transactionType(transaction) },
                { label: 'Amount', csvValue: (transaction) => transactionAmount(transaction) },
                { label: 'Fee', csvValue: (transaction) => transactionFee(transaction) },
                { label: 'Status', csvValue: (transaction) => transactionStatus(transaction) },
              ],
              filtered
            )
          }
        >
          Export
        </Button>
      </div>
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <h2 className="text-[13px] font-semibold text-ink">Client transactions</h2>
          <span className="text-[10px] text-muted">Funding and employee payouts</span>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          minWidth={780}
          emptyTitle="No client transactions"
          emptyDescription="Employee movements for this employer will appear here."
          footer={
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] text-muted">Showing {rows.length} of {formatNumber(filtered.length)} movements</p>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>Previous</Button>
                <span className="text-[11px] text-muted">{safePage} / {pages}</span>
                <Button variant="secondary" size="sm" disabled={safePage >= pages} onClick={() => setPage(safePage + 1)}>Next</Button>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
}

export function ClientDetailScreen({ tab = 'transactions' }) {
  const { id } = useParams();
  const { session } = useAuth();
  const role = session?.role;
  const clientQuery = useClientQuery(id, { enabled: isAdmin(role) });
  const usersQuery = useUsersQuery({ enabled: isAdmin(role) });
  const invoicesQuery = useInvoicesQuery({ enabled: isAdmin(role) });
  const transactionsQuery = useTransactionsQuery({}, { enabled: isAdmin(role) });

  const client = clientQuery.data ? normalizeClient(clientQuery.data) : null;
  const users = useMemo(() => asArray(usersQuery.data).map(normalizeUser), [usersQuery.data]);
  const invoices = useMemo(() => asArray(invoicesQuery.data), [invoicesQuery.data]);
  const transactions = useMemo(
    () => attachUsersToTransactions(asArray(transactionsQuery.data), usersQuery.data),
    [transactionsQuery.data, usersQuery.data]
  );

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Client profile is restricted"
          error={{ message: 'Only operations admins can open client records.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (clientQuery.isLoading) {
    return <PageLoading />;
  }

  if (clientQuery.error || !client) {
    return (
      <Card>
        <ErrorState
          title="Client could not be loaded"
          error={clientQuery.error || { message: 'The client record was not found.' }}
          action={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon="refresh" onClick={() => clientQuery.refetch()}>Try again</Button>
              <Button href="/dashboard/clients" size="sm">Back to clients</Button>
            </div>
          }
        />
      </Card>
    );
  }

  const roster = users.filter((user) => sameId(user.clientId, client.id));
  const clientInvoices = invoices.filter((invoice) => sameId(invoice.client_id ?? invoice?.client?.id, client.id));
  const outstanding = clientInvoices.filter((invoice) => String(invoiceStatus(invoice)).toUpperCase() !== 'TREATED');
  const outstandingTotal = outstanding.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);

  const tabs = [
    { key: 'transactions', label: 'Transactions' },
    { key: 'workforce', label: 'Workforce', count: roster.length },
    { key: 'funding', label: 'Funding accounts' },
    { key: 'payments', label: 'Payment history', count: clientInvoices.length },
  ].map((entry) => ({
    ...entry,
    href: `/dashboard/clients/${id}${TAB_SUFFIX[entry.key]}`,
    active: entry.key === tab,
  }));

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'Clients', href: '/dashboard/clients' }, { label: client.displayName }]}
        title={
          <span className="flex items-center gap-3">
            <Avatar name={client.displayName} initials={client.initials} size={40} tone="brand" />
            <span>{client.displayName}</span>
          </span>
        }
        badge={<StatusPill status={client.status} />}
        meta={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
            <span>{client.industry}</span>
            <span aria-hidden="true">·</span>
            <span>{formatNumber(roster.length)} employees</span>
            <span aria-hidden="true">·</span>
            <span>Joined {formatDate(personJoined(clientQuery.data))}</span>
          </span>
        }
        actions={
          <>
            <Button variant="secondary" icon="settings" disabled title="Client payout settings require a run-management API.">
              Payout settings
            </Button>
            <Button href={`/dashboard/clients/${id}/edit`} variant="secondary" icon="edit">
              Edit client
            </Button>
          </>
        }
        tabs={tabs}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Company & contact</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-success">
              <Icon name="checkCircle" size={12} /> API record
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Industry</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{client.industry}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Account email</p>
              <p className="mt-1 break-all text-[13px] font-medium text-ink">{client.email}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Tax ID</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{client.taxId}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Primary phone</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{client.phone}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Location</p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {[client.city, client.region].filter((part) => part && part !== '—').join(', ') || '—'}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Joined</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{formatDate(personJoined(clientQuery.data))}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Next payment</p>
              <p className="mt-1 text-[22px] font-bold tracking-[-0.02em] text-ink">{formatDate(client.nextPaymentDate)}</p>
              <p className="mt-1 text-[11px] text-muted">{formatNumber(roster.length)} employees in the roster</p>
            </div>
            <Tag tone="info">From client record</Tag>
          </div>
          <div className="mt-4 space-y-1 border-t border-border pt-3">
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Settlement bank</span>
              <span className="max-w-[60%] truncate text-right text-[11px] font-medium text-ink">
                {optionLabel(BANK_OPTIONS, client.bank)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Bank account</span>
              <span className="text-right text-[11px] font-medium text-ink">{client.bankAccount}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Outstanding invoices</span>
              <span className="bo-numeric text-right text-[11px] font-medium text-ink">{formatMoney(outstandingTotal)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Commission</span>
              <span className="text-right text-[11px] font-medium text-ink">
                {client.commission === null || client.commission === undefined || client.commission === '' ? '—' : `${client.commission}%`}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {tab === 'transactions' ? (
        <ClientTransactions client={client} users={users} transactions={transactions} />
      ) : null}
      {tab === 'workforce' ? <EmployeeRoster client={client} users={users} /> : null}
      {tab === 'funding' ? <FundingAccounts client={client} /> : null}
      {tab === 'payments' ? <PaymentHistory client={client} invoices={invoices} /> : null}
    </div>
  );
}
