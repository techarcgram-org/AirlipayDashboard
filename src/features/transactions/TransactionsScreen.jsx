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
  SegmentedControl,
  SelectControl,
  StatusPill,
  TablePagination,
  exportCsv,
} from '@/components/backoffice';
import { useClientsQuery, useTransactionsQuery, useUsersQuery } from '@/lib/api/queries';
import {
  asArray,
  attachUsersToTransactions,
  normalizeUser,
  transactionAmount,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
  transactionType,
} from '@/lib/data';
import { formatDateTime, formatMoney, formatNumber } from '@/lib/format';
import {
  buildUserMap,
  isAdmin,
  scopeTransactions,
} from '@/lib/permissions';

const PAGE_SIZE = 10;

function typeLabel(transaction) {
  const type = String(transactionType(transaction)).toUpperCase();
  if (type === 'WITHDRAW') return 'Withdrawal';
  if (type === 'DEPOSIT') return 'Payroll funding';
  return type || 'Transaction';
}

export function TransactionsScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const transactionsQuery = useTransactionsQuery({});
  const usersQuery = useUsersQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [employer, setEmployer] = useState('');
  const [page, setPage] = useState(1);

  const users = useMemo(() => asArray(usersQuery.data), [usersQuery.data]);
  const userMap = useMemo(() => buildUserMap(users), [users]);
  const transactions = useMemo(
    () =>
      attachUsersToTransactions(
        scopeTransactions(asArray(transactionsQuery.data), role, userId, userMap),
        users
      ).sort((left, right) => new Date(transactionDate(right) || 0) - new Date(transactionDate(left) || 0)),
    [transactionsQuery.data, users, userMap, role, userId]
  );

  const employers = useMemo(
    () =>
      asArray(clientsQuery.data).map((client) => ({
        value: String(client.id),
        label: client.name || `Client ${client.id}`,
      })),
    [clientsQuery.data]
  );

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return transactions
      .filter((transaction) => status === 'ALL' || String(transactionStatus(transaction)).toUpperCase() === status)
      .filter((transaction) => type === 'ALL' || String(transactionType(transaction)).toUpperCase() === type)
      .filter((transaction) => !employer || String(transaction.clientId) === employer)
      .filter((transaction) => {
        if (!needle) return true;
        return [
          transactionRef(transaction),
          transaction.employeeName,
          transaction.employerName,
          transaction.phone_number,
          transaction.user?.displayName,
        ].some((value) => String(value || '').toLowerCase().includes(needle));
      });
  }, [transactions, search, status, type, employer]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const successful = filtered.filter((transaction) => String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS');
  const fundingTotal = successful
    .filter((transaction) => String(transactionType(transaction)).toUpperCase() === 'DEPOSIT')
    .reduce((sum, transaction) => sum + transactionAmount(transaction), 0);
  const payoutTotal = successful
    .filter((transaction) => String(transactionType(transaction)).toUpperCase() === 'WITHDRAW')
    .reduce((sum, transaction) => sum + transactionAmount(transaction), 0);
  const failedWithdrawals = filtered.filter(
    (transaction) =>
      String(transactionType(transaction)).toUpperCase() === 'WITHDRAW' &&
      String(transactionStatus(transaction)).toUpperCase() === 'FAILED'
  ).length;

  const columns = [
    {
      key: 'date',
      label: 'Date',
      width: '14%',
      cell: (transaction) => (
        <span className="whitespace-nowrap text-[11px] text-ink-soft">{formatDateTime(transactionDate(transaction))}</span>
      ),
      csvValue: (transaction) => transactionDate(transaction),
    },
    {
      key: 'transaction',
      label: 'Transaction',
      width: '22%',
      cell: (transaction) => {
        const type = String(transactionType(transaction)).toUpperCase();
        const phone = String(transaction.phone_number || '');
        return (
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
              {typeLabel(transaction)}
              {type === 'DEPOSIT' ? <Icon name="arrowDownLeft" size={12} className="text-success" /> : null}
            </p>
            <p className="truncate text-[10px] text-muted">
              {transactionRef(transaction)}
              {phone ? ` · •••• ${phone.slice(-4)}` : ''}
            </p>
          </div>
        );
      },
      csvValue: (transaction) => transactionRef(transaction),
    },
    {
      key: 'employee',
      label: 'Employee',
      width: '19%',
      cell: (transaction) =>
        transaction.user ? (
          <Link href={`/dashboard/users/${transaction.user.id}`} className="flex min-w-0 items-center gap-2">
            <Avatar name={transaction.employeeName} initials={transaction.user.initials} size={26} tone="brand" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-ink hover:text-cobalt-text">{transaction.employeeName}</p>
              <p className="truncate text-[9px] text-muted">{transaction.user.employeeId}</p>
            </div>
          </Link>
        ) : (
          <span className="text-[11px] text-muted">Unmatched employee</span>
        ),
      csvValue: (transaction) => transaction.employeeName,
    },
    {
      key: 'employer',
      label: 'Employer',
      width: '16%',
      cell: (transaction) => <span className="block max-w-[160px] truncate text-[11px]">{transaction.employerName}</span>,
      csvValue: (transaction) => transaction.employerName,
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      width: '13%',
      cell: (transaction) => (
        <span className={`bo-numeric whitespace-nowrap font-semibold ${String(transactionType(transaction)).toUpperCase() === 'DEPOSIT' ? 'text-success' : 'text-ink'}`}>
          {formatMoney(transactionAmount(transaction))}
        </span>
      ),
      csvValue: (transaction) => transaction.amount,
    },
    {
      key: 'status',
      label: 'Status',
      width: '11%',
      cell: (transaction) => <StatusPill status={transactionStatus(transaction)} size="sm" />,
      csvValue: (transaction) => transactionStatus(transaction),
    },
  ];

  if (transactionsQuery.isLoading || usersQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Transactions' }]} title="Transactions ledger" />
        <PageLoading />
      </div>
    );
  }

  if (transactionsQuery.error && !transactions.length) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Transactions' }]} title="Transactions ledger" />
        <Card>
          <ErrorState
            title="The ledger could not be loaded"
            error={transactionsQuery.error}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => transactionsQuery.refetch()}>Try again</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Transactions' }]}
        title="Transactions ledger"
        description="Every funding movement and employee payout in one auditable ledger. The API returns the latest 100 entries."
        actions={
          <Button
            variant="secondary"
            icon="download"
            disabled={!filtered.length}
            onClick={() =>
              exportCsv(
                'transactions-ledger',
                [
                  { label: 'Date', csvValue: (transaction) => transactionDate(transaction) },
                  { label: 'Reference', csvValue: (transaction) => transactionRef(transaction) },
                  { label: 'Type', csvValue: (transaction) => transactionType(transaction) },
                  { label: 'Employee', csvValue: (transaction) => transaction.employeeName },
                  { label: 'Employer', csvValue: (transaction) => transaction.employerName },
                  { label: 'Amount', csvValue: (transaction) => transactionAmount(transaction) },
                  { label: 'Fee', csvValue: (transaction) => transactionFee(transaction) },
                  { label: 'Balance after', csvValue: (transaction) => transaction.new_balance ?? transaction.balance_after ?? '' },
                  { label: 'Status', csvValue: (transaction) => transactionStatus(transaction) },
                ],
                filtered
              )
            }
          >
            Export CSV
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Employer funding" value={formatMoney(fundingTotal)} icon="arrowDownLeft" hint={`${filtered.filter((transaction) => String(transactionType(transaction)).toUpperCase() === 'DEPOSIT').length} deposits in filter`} />
        <KpiCard label="Employee payouts" value={formatMoney(payoutTotal)} icon="arrowUpRight" hint={`${filtered.filter((transaction) => String(transactionType(transaction)).toUpperCase() === 'WITHDRAW').length} withdrawals in filter`} />
        <KpiCard label="Failed withdrawals" value={formatNumber(failedWithdrawals)} icon="alert" hint={failedWithdrawals ? 'needs review' : 'no failures in filter'} />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search reference, employee or phone"
          className="w-full sm:min-w-[250px] sm:flex-1"
          aria-label="Search transactions"
        />
        <SegmentedControl
          value={type}
          onChange={(value) => {
            setType(value);
            setPage(1);
          }}
          items={[
            { value: 'ALL', label: 'All' },
            { value: 'WITHDRAW', label: 'Withdrawals' },
            { value: 'DEPOSIT', label: 'Funding' },
          ]}
          ariaLabel="Filter transactions by type"
        />
        {isAdmin(role) ? (
          <SelectControl
            value={employer}
            onChange={(event) => {
              setEmployer(event.target.value);
              setPage(1);
            }}
            options={employers}
            placeholder="All employers"
            icon="clients"
            label="Filter by employer"
            className="w-full sm:w-auto sm:min-w-[170px]"
          />
        ) : null}
        <SelectControl
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={[
            { value: 'SUCCESS', label: 'Successful' },
            { value: 'FAILED', label: 'Failed' },
            { value: 'PENDING', label: 'Pending' },
          ]}
          placeholder="All statuses"
          icon="filter"
          label="Filter by status"
          className="w-full sm:w-auto sm:min-w-[150px]"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="transactions" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">All transactions</h2>
            <span className="text-[10px] text-muted">{formatNumber(filtered.length)} in this view</span>
          </div>
          <span className="text-[10px] text-muted">Latest 100 from the API</span>
        </div>
        <DataTable
          columns={columns}
          rows={rows}
          loading={transactionsQuery.isFetching && !transactions.length}
          minWidth={880}
          emptyTitle="No transactions match"
          emptyDescription={
            search || status !== 'ALL' || type !== 'ALL' || employer
              ? 'Adjust the filters to see more ledger entries.'
              : 'The ledger has no movements yet.'
          }
          emptyAction={
            search || status !== 'ALL' || type !== 'ALL' || employer ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearch('');
                  setStatus('ALL');
                  setType('ALL');
                  setEmployer('');
                  setPage(1);
                }}
              >
                Clear filters
              </Button>
            ) : null
          }
          footer={
            <TablePagination
              page={safePage}
              pages={pages}
              onPageChange={setPage}
              label={`Showing ${rows.length} of ${formatNumber(filtered.length)} transactions`}
            />
          }
        />
      </Card>
    </div>
  );
}
