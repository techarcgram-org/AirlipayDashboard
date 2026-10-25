'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Avatar,
  Button,
  Card,
  DataTable,
  EmptyState,
  ErrorState,
  Icon,
  PageHeader,
  PageLoading,
  SearchInput,
  SegmentedControl,
  SelectControl,
  StatusPill,
  SupportNotice,
  TablePagination,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import {
  useTransactionsQuery,
  useUserBalanceQuery,
  useUserPayPeriodsQuery,
  useUserQuery,
} from '@/lib/api/queries';
import {
  asArray,
  balanceValue,
  normalizeUser,
  payPeriodRows,
  payoutDestination,
  personJoined,
  transactionAmount,
  transactionBalanceAfter,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
  transactionType,
} from '@/lib/data';
import {
  formatDate,
  formatDateTime,
  formatMoney,
  formatNumber,
} from '@/lib/format';
import {
  canEditEmployee,
  isClient,
  sameId,
  scopeTransactions,
} from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';
import {
  sampleActivity,
  sampleEmployeeBanks,
} from '@/fixtures/backoffice';

const TX_PAGE_SIZE = 8;

const TABS = [
  { key: 'transactions', label: 'Transactions', suffix: '' },
  { key: 'momo', label: 'Mobile money', suffix: '/momo-accounts' },
  { key: 'activity', label: 'Activity', suffix: '/activity-feed' },
  { key: 'banks', label: 'Bank accounts', suffix: '/bank-accounts' },
  { key: 'cards', label: 'Cards', suffix: '/debit-cards' },
];

function paySummary(payload) {
  const rows = payPeriodRows(payload);
  if (!rows.length) return null;
  const current = rows[0];
  const transactions = asArray(current?.transactions);
  if (!transactions.length) return { count: rows.length, advanced: null, fees: null, periodStart: current?.from || current?.start_date, periodEnd: current?.to || current?.end_date };
  const successfulWithdrawals = transactions.filter(
    (transaction) =>
      String(transactionType(transaction)).toUpperCase() === 'WITHDRAW' &&
      String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS'
  );
  return {
    count: rows.length,
    advanced: successfulWithdrawals.reduce((sum, transaction) => sum + transactionAmount(transaction), 0),
    fees: successfulWithdrawals.reduce((sum, transaction) => sum + transactionFee(transaction), 0),
    periodStart: current?.from || current?.start_date,
    periodEnd: current?.to || current?.end_date,
  };
}

function activityTone(tone) {
  if (tone === 'success') return 'bg-success-soft text-success';
  if (tone === 'error') return 'bg-error-soft text-error';
  return 'bg-info-soft text-info';
}

function ActivityFeed() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Icon name="activity" size={16} className="text-muted" />
          <h2 className="text-[14px] font-semibold text-ink">Activity timeline</h2>
          <Tag tone="neutral">Sample</Tag>
        </div>
        <span className="text-[10px] text-muted">Read-only</span>
      </div>
      <div className="p-5">
        <SupportNotice capability={CAPABILITIES.employeeActivity} />
        <div className="mt-4">
          {sampleActivity.map((item, index) => (
            <div key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {index < sampleActivity.length - 1 ? (
                <span className="absolute left-[13px] top-7 h-[calc(100%-16px)] w-px bg-border" aria-hidden="true" />
              ) : null}
              <span className={`relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${activityTone(item.tone)}`}>
                <Icon name={item.tone === 'error' ? 'alert' : item.tone === 'success' ? 'check' : 'sliders'} size={13} />
              </span>
              <div className="min-w-0 flex-1 border-b border-border pb-4 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[12px] font-semibold text-ink">{item.title}</p>
                  <p className="bo-numeric text-[12px] font-semibold text-ink">{item.amount}</p>
                </div>
                <p className="mt-0.5 text-[10px] text-muted">{item.detail}</p>
                <p className="mt-1 text-[10px] text-muted-light">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function MobileMoney({ user, canEdit }) {
  const destination = payoutDestination(user);
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Mobile money accounts</h2>
          <p className="mt-0.5 text-[11px] text-muted">Payroll destination records from the employee account.</p>
        </div>
        <Button variant="secondary" size="sm" icon="plus" disabled title="Mobile-money account management is not exposed by the current API.">
          Add account
        </Button>
      </div>

      {user.momoAccounts.length ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {user.momoAccounts.map((account, index) => {
            const isPrimary = destination?.account === account;
            return (
              <div key={`${account.operator}-${account.phone_number}-${index}`} className="rounded-md border border-border bg-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-warning-soft text-warning">
                      <Icon name="phone" size={16} />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-ink">{account.operator || account.provider || 'Mobile money'}</p>
                      <p className="text-[11px] text-muted">{account.phone_number || 'Phone not provided'}</p>
                    </div>
                  </div>
                  {isPrimary ? <Tag tone="success">Payout destination</Tag> : <Tag tone="neutral">Linked</Tag>}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted">
                  <span>Managed by the employee</span>
                  <span className="inline-flex items-center gap-1"><Icon name="lock" size={11} /> Read-only</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="phone"
          title="No mobile money account"
          description="This employee cannot receive a payout until a mobile money destination is linked."
          className="min-h-[220px]"
        />
      )}

      <div className="mt-4 rounded-sm bg-surface-sunken px-3.5 py-3 text-[10px] leading-5 text-muted">
        {canEdit
          ? 'Adding, verifying or replacing payout accounts is not available in the current API. The employee manages this from the AirliPay mobile app.'
          : 'Payout accounts are read-only for your role.'}
      </div>
    </>
  );
}

function BankAccounts() {
  return (
    <div className="space-y-4">
      <SupportNotice capability={CAPABILITIES.employeeBanks} />
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
          <h2 className="text-[14px] font-semibold text-ink">Saved bank accounts</h2>
          <Button variant="secondary" size="sm" icon="plus" disabled title="Bank-account management is not available.">
            Add bank account
          </Button>
        </div>
        <DataTable
          columns={[
            { key: 'bank', label: 'Bank', cell: (row) => <span className="text-[12px] font-semibold text-ink">{row.bank}</span> },
            { key: 'account', label: 'Account', cell: (row) => <span className="bo-numeric">{row.account}</span> },
            { key: 'label', label: 'Label' },
            { key: 'added', label: 'Added' },
            { key: 'status', label: 'Status', cell: (row) => <StatusPill status={row.status} size="sm" /> },
          ]}
          rows={sampleEmployeeBanks}
          minWidth={640}
          footer={
            <p className="text-[10px] text-muted">Illustrative accounts for layout review. No bank action is connected.</p>
          }
        />
      </Card>
    </div>
  );
}

function DebitCards() {
  return (
    <div className="space-y-4">
      <SupportNotice capability={CAPABILITIES.debitCards} />
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
          <h2 className="text-[14px] font-semibold text-ink">Debit cards</h2>
          <Button variant="secondary" size="sm" icon="plus" disabled title="Card issuing is not available.">
            Issue card
          </Button>
        </div>
        <EmptyState
          icon="card"
          title="No debit cards to show"
          description="Card issuing, freeze and replacement actions are a product concept and are disabled in this console."
          className="min-h-[280px]"
        />
      </Card>
    </div>
  );
}

function transactionColumns() {
  return [
    {
      key: 'date',
      label: 'Date',
      width: '16%',
      cell: (transaction) => <span className="whitespace-nowrap text-[11px]">{formatDateTime(transactionDate(transaction))}</span>,
    },
    {
      key: 'transaction',
      label: 'Transaction',
      width: '28%',
      cell: (transaction) => {
        const type = String(transactionType(transaction)).toUpperCase();
        const phone = String(transaction.phone_number || '');
        return (
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-ink">
              {type === 'WITHDRAW' ? 'Withdrawal' : type === 'DEPOSIT' ? 'Payroll funding' : type || 'Transaction'}
            </p>
            <p className="truncate text-[10px] text-muted">
              {transactionRef(transaction)}
              {phone ? ` · •••• ${phone.slice(-4)}` : ''}
            </p>
          </div>
        );
      },
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      width: '14%',
      cell: (transaction) => <span className="bo-numeric whitespace-nowrap text-[12px] font-semibold text-ink">{formatMoney(transactionAmount(transaction))}</span>,
      csvValue: (transaction) => transaction.amount,
    },
    {
      key: 'fee',
      label: 'Fee',
      align: 'right',
      width: '12%',
      cell: (transaction) => <span className="bo-numeric whitespace-nowrap text-[11px]">{formatMoney(transactionFee(transaction))}</span>,
      csvValue: (transaction) => transaction.fees ?? transaction.fee ?? 0,
    },
    {
      key: 'balance',
      label: 'Balance after',
      align: 'right',
      width: '15%',
      cell: (transaction) => {
        const raw = transaction.new_balance ?? transaction.balance_after;
        return (
          <span className="bo-numeric whitespace-nowrap text-[11px]">
            {raw === null || raw === undefined ? '—' : formatMoney(transactionBalanceAfter(transaction))}
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      cell: (transaction) => <StatusPill status={transactionStatus(transaction)} size="sm" />,
      csvValue: (transaction) => transactionStatus(transaction),
    },
  ];
}

export function EmployeeDetailScreen({ tab = 'transactions' }) {
  const { id } = useParams();
  const { session } = useAuth();
  const role = session?.role;
  const userQuery = useUserQuery(id);
  const balanceQuery = useUserBalanceQuery(id);
  const payPeriodsQuery = useUserPayPeriodsQuery(id);
  const transactionsQuery = useTransactionsQuery({}, { enabled: tab === 'transactions' });
  const [txStatus, setTxStatus] = useState('ALL');
  const [txType, setTxType] = useState('ALL');
  const [txSearch, setTxSearch] = useState('');
  const [page, setPage] = useState(1);

  const user = normalizeUser(userQuery.data);
  const destination = payoutDestination(userQuery.data);
  const balance = balanceValue(balanceQuery.data);
  const period = paySummary(payPeriodsQuery.data);
  const allowed = useMemo(() => {
    if (!isClient(role) || !userQuery.data) return true;
    return sameId(userQuery.data.client_id, session?.userId);
  }, [role, session?.userId, userQuery.data]);

  const userTransactions = useMemo(() => {
    if (tab !== 'transactions') return [];
    const raw = scopeTransactions(asArray(transactionsQuery.data), role, session?.userId, new Map([[String(userQuery.data?.id), userQuery.data]]));
    return raw
      .filter((transaction) => sameId(transaction.user_id, id))
      .sort((a, b) => new Date(transactionDate(b) || 0) - new Date(transactionDate(a) || 0));
  }, [id, role, session?.userId, tab, transactionsQuery.data, userQuery.data]);

  const filteredTransactions = useMemo(() => {
    const needle = txSearch.trim().toLowerCase();
    return userTransactions
      .filter((transaction) => {
        if (txStatus === 'SUCCESS') return String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS';
        if (txStatus === 'FAILED') return String(transactionStatus(transaction)).toUpperCase() === 'FAILED';
        return true;
      })
      .filter((transaction) => txType === 'ALL' || String(transactionType(transaction)).toUpperCase() === txType)
      .filter((transaction) => {
        if (!needle) return true;
        return [transactionRef(transaction), transaction.phone_number, transaction.status]
          .some((value) => String(value || '').toLowerCase().includes(needle));
      });
  }, [txSearch, txStatus, txType, userTransactions]);

  const pages = Math.max(1, Math.ceil(filteredTransactions.length / TX_PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filteredTransactions.slice((safePage - 1) * TX_PAGE_SIZE, safePage * TX_PAGE_SIZE);

  if (userQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'Employees', href: '/dashboard/users' }, { label: 'Employee' }]} title="Employee profile" />
        <PageLoading />
      </div>
    );
  }

  if (userQuery.error || !userQuery.data) {
    return (
      <Card>
        <ErrorState
          title="Employee could not be loaded"
          error={userQuery.error || { message: 'The employee record was not found.' }}
          action={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon="refresh" onClick={() => userQuery.refetch()}>Try again</Button>
              <Button href="/dashboard/users" size="sm">Back to employees</Button>
            </div>
          }
        />
      </Card>
    );
  }

  if (!allowed) {
    return (
      <Card>
        <ErrorState
          title="Employee not available"
          error={{ message: 'This employee belongs to another client. Your account can only open employees in your own roster.' }}
          action={<Button href="/dashboard/users" size="sm">Back to employees</Button>}
        />
      </Card>
    );
  }

  const canEdit = canEditEmployee(role);
  const counts = {
    transactions: tab === 'transactions' ? filteredTransactions.length : undefined,
    momo: user.momoAccounts.length || undefined,
  };
  const tabItems = TABS.map((entry) => ({
    key: entry.key,
    label: entry.label,
    count: counts[entry.key],
    href: `/dashboard/users/${id}${entry.suffix}`,
    active: tab === entry.key,
  }));

  const pageMeta = (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
      <span>{user.employeeId !== '—' ? user.employeeId : 'No employee ID'}</span>
      <span aria-hidden="true">·</span>
      <span>{user.employer}</span>
      <span aria-hidden="true">·</span>
      <span>{destination ? destination.label : 'No payout destination'}</span>
      <span aria-hidden="true">·</span>
      <span>Joined {formatDate(personJoined(userQuery.data))}</span>
    </span>
  );

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'Employees', href: '/dashboard/users' }, { label: user.displayName }]}
        title={
          <span className="flex items-center gap-3">
            <Avatar name={user.displayName} initials={user.initials} size={40} tone="brand" />
            <span>{user.displayName}</span>
          </span>
        }
        badge={<StatusPill status={user.status} />}
        meta={pageMeta}
        actions={
          canEdit ? (
            <Button href={`/dashboard/users/${id}/edit`} variant="secondary" icon="edit">
              Edit employee
            </Button>
          ) : null
        }
        tabs={tabItems}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Employment & contact</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-success">
              <Icon name="checkCircle" size={12} /> API record
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Employer</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{user.employer}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Employee ID</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{user.employeeId}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Primary phone</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{user.phone}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Base salary</p>
              <p className="bo-numeric mt-1 text-[13px] font-medium text-ink">
                {user.baseSalary === null || user.baseSalary === undefined ? '—' : formatMoney(user.baseSalary)}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Joined</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{formatDate(personJoined(userQuery.data))}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Location</p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {[user.city, user.region].filter((part) => part && part !== '—').join(', ') || '—'}
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-[10px] text-muted">
            <Icon name="mail" size={12} />
            <span className="break-all">{user.email}</span>
            {user.secondaryPhone !== '—' ? (
              <>
                <span aria-hidden="true">·</span>
                <Icon name="phone" size={12} />
                <span>{user.secondaryPhone}</span>
              </>
            ) : null}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Available balance</p>
              {balanceQuery.isLoading ? (
                <div className="mt-2 h-8 w-36 rounded-sm bo-skeleton" />
              ) : (
                <p className="bo-numeric mt-1 text-[27px] font-bold tracking-[-0.03em] text-ink">
                  {balance === null ? 'Unavailable' : formatMoney(balance)}
                </p>
              )}
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-success-soft text-success">
              <Icon name="wallet" size={16} />
            </span>
          </div>
          <div className="mt-3 space-y-1 border-t border-border pt-3">
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Base salary</span>
              <span className="text-[11px] font-medium text-ink">
                {user.baseSalary === null || user.baseSalary === undefined ? '—' : formatMoney(user.baseSalary)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3 py-1">
              <span className="text-[11px] text-muted">Payout destination</span>
              <span className="text-right text-[11px] font-medium text-ink">{destination ? destination.label : 'Not configured'}</span>
            </div>
            {period?.advanced !== null && period?.advanced !== undefined ? (
              <div className="flex items-baseline justify-between gap-3 py-1">
                <span className="text-[11px] text-muted">Advanced this period</span>
                <span className="bo-numeric text-[11px] font-medium text-ink">{formatMoney(period.advanced)}</span>
              </div>
            ) : null}
            {period?.count ? (
              <div className="flex items-baseline justify-between gap-3 py-1">
                <span className="text-[11px] text-muted">Pay periods on record</span>
                <span className="text-[11px] font-medium text-ink">{formatNumber(period.count)}</span>
              </div>
            ) : null}
          </div>
          {balance === null && !balanceQuery.isLoading ? (
            <p className="mt-3 text-[10px] leading-5 text-muted">
              {balanceQuery.error ? 'The balance endpoint could not be reached for this employee.' : 'No balance was returned for this employee.'}
            </p>
          ) : null}
        </Card>
      </div>

      {tab === 'transactions' ? (
        <Card className="overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Icon name="transactions" size={16} className="text-muted" />
                  <h2 className="text-[14px] font-semibold text-ink">Transactions</h2>
                  <span className="text-[10px] text-muted">{filteredTransactions.length} entries · newest first</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="download"
                disabled={!filteredTransactions.length}
                onClick={() => exportCsv(`employee-${id}-transactions`, transactionColumns(), filteredTransactions)}
              >
                Download CSV
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <SegmentedControl
                value={txStatus}
                onChange={(value) => {
                  setTxStatus(value);
                  setPage(1);
                }}
                items={[
                  { value: 'ALL', label: 'All' },
                  { value: 'SUCCESS', label: 'Successful' },
                  { value: 'FAILED', label: 'Failed' },
                ]}
                ariaLabel="Filter transactions by status"
              />
              <div className="flex flex-1 flex-wrap items-center justify-end gap-2">
                <SearchInput
                  value={txSearch}
                  onChange={(event) => {
                    setTxSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search reference"
                  className="w-full sm:w-[190px]"
                  aria-label="Search employee transactions"
                />
                <SelectControl
                  value={txType}
                  onChange={(event) => {
                    setTxType(event.target.value);
                    setPage(1);
                  }}
                  options={[
                    { value: 'WITHDRAW', label: 'Withdrawals' },
                    { value: 'DEPOSIT', label: 'Funding' },
                  ]}
                  placeholder="All types"
                  icon="filter"
                  label="Filter by transaction type"
                  className="w-full sm:w-auto sm:min-w-[145px]"
                />
              </div>
            </div>
          </div>
          <DataTable
            columns={transactionColumns()}
            rows={rows}
            loading={transactionsQuery.isLoading}
            error={transactionsQuery.error}
            minWidth={800}
            emptyTitle={txStatus !== 'ALL' || txType !== 'ALL' || txSearch ? 'No matching transactions' : 'No transactions yet'}
            emptyDescription={
              txStatus !== 'ALL' || txType !== 'ALL' || txSearch
                ? 'Adjust the filters to see more ledger entries.'
                : 'This employee has no ledger movements in the latest 100 transactions.'
            }
            footer={
              <TablePagination
                page={safePage}
                pages={pages}
                onPageChange={setPage}
                label={`Showing ${rows.length} of ${formatNumber(filteredTransactions.length)} entries`}
              />
            }
          />
        </Card>
      ) : null}

      {tab === 'momo' ? (
        <Card className="p-5">
          <MobileMoney user={user} canEdit={canEdit} />
        </Card>
      ) : null}

      {tab === 'activity' ? <ActivityFeed /> : null}
      {tab === 'banks' ? <BankAccounts /> : null}
      {tab === 'cards' ? <DebitCards /> : null}
    </div>
  );
}
