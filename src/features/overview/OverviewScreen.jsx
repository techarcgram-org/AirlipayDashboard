'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  AreaChart,
  Button,
  Card,
  EmptyState,
  ErrorState,
  Icon,
  InlineNotice,
  KpiCard,
  LegendDot,
  PageHeader,
  PageLoading,
  ProgressBar,
  StatusPill,
  Tag,
} from '@/components/backoffice';
import {
  useInvoicesQuery,
  useMetricsQuery,
  useTransactionsQuery,
  useUsersQuery,
} from '@/lib/api/queries';
import {
  asArray,
  attachUsersToTransactions,
  invoiceTotal,
  normalizeUser,
  transactionAmount,
  transactionDate,
  transactionStatus,
  transactionType,
} from '@/lib/data';
import {
  formatCompactMoney,
  formatDate,
  formatMoney,
  formatNumber,
  formatShortDate,
} from '@/lib/format';
import {
  buildUserMap,
  isAdmin,
  scopeInvoices,
  scopeTransactions,
  scopeUsers,
} from '@/lib/permissions';
import { samplePayoutRuns } from '@/fixtures/backoffice';

const CHART_BUCKETS = 12;

function buildCashSeries(transactions) {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const start = new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
  const interval = (end.getTime() - start.getTime()) / CHART_BUCKETS;
  const deposits = Array(CHART_BUCKETS).fill(0);
  const payouts = Array(CHART_BUCKETS).fill(0);

  transactions.forEach((transaction) => {
    const date = new Date(transactionDate(transaction));
    if (Number.isNaN(date.getTime()) || date < start || date > end) return;
    if (String(transactionStatus(transaction)).toUpperCase() !== 'SUCCESS') return;
    const index = Math.min(
      CHART_BUCKETS - 1,
      Math.max(0, Math.floor((date.getTime() - start.getTime()) / interval))
    );
    if (String(transactionType(transaction)).toUpperCase() === 'DEPOSIT') {
      deposits[index] += transactionAmount(transaction);
    } else {
      payouts[index] += transactionAmount(transaction);
    }
  });

  const labels = [0, 3, 6, 9, 11].map((index) =>
    formatShortDate(new Date(start.getTime() + index * interval))
  );

  return { deposits, payouts, labels, start, end };
}

function todayLabel() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

function bestTransactionRows(transactions, limit = 3) {
  return [...transactions]
    .sort((a, b) => new Date(transactionDate(b) || 0) - new Date(transactionDate(a) || 0))
    .slice(0, limit);
}

function AttentionRow({ icon, tone, title, detail, href }) {
  const tones = {
    error: 'bg-error-soft text-error',
    warning: 'bg-warning-soft text-warning',
    info: 'bg-info-soft text-info',
    success: 'bg-success-soft text-success',
  };
  return (
    <Link
      href={href}
      className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-0 hover:bg-row-hover"
    >
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm ${tones[tone] || tones.info}`}>
        <Icon name={icon} size={14} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-semibold text-ink">{title}</span>
        <span className="block truncate text-[10px] text-muted">{detail}</span>
      </span>
      <Icon name="chevronRight" size={14} className="text-muted-light" />
    </Link>
  );
}

function RecentTransactionRow({ transaction }) {
  const withdraw = String(transactionType(transaction)).toUpperCase() === 'WITHDRAW';
  return (
    <div className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-0">
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${withdraw ? 'bg-cobalt-soft text-cobalt-text' : 'bg-success-soft text-success'}`}>
        <Icon name={withdraw ? 'arrowUpRight' : 'arrowDownLeft'} size={13} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] font-semibold text-ink">
          {withdraw ? 'Early withdrawal' : 'Payroll funding'}
        </p>
        <p className="truncate text-[10px] text-muted">
          {transaction.employeeName || transaction.employerName || '—'} · {formatDate(transactionDate(transaction))}
        </p>
      </div>
      <p className="bo-numeric shrink-0 text-[12px] font-semibold text-ink">{formatMoney(transactionAmount(transaction))}</p>
      <StatusPill status={transactionStatus(transaction)} size="sm" />
    </div>
  );
}

export function OverviewScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const usersQuery = useUsersQuery();
  const transactionsQuery = useTransactionsQuery({});
  const invoicesQuery = useInvoicesQuery();
  const metricsQuery = useMetricsQuery({ enabled: isAdmin(role) });

  const rawUsers = asArray(usersQuery.data);
  const rawTransactions = asArray(transactionsQuery.data);
  const rawInvoices = asArray(invoicesQuery.data);
  const metrics = metricsQuery.data || {};

  const scopedUsers = useMemo(
    () => scopeUsers(rawUsers, role, userId).map(normalizeUser),
    [rawUsers, role, userId]
  );
  const userMap = useMemo(() => buildUserMap(rawUsers), [rawUsers]);
  const scopedTransactions = useMemo(
    () => attachUsersToTransactions(scopeTransactions(rawTransactions, role, userId, userMap), rawUsers),
    [rawTransactions, rawUsers, role, userId, userMap]
  );
  const scopedInvoices = useMemo(
    () => scopeInvoices(rawInvoices, role, userId),
    [rawInvoices, role, userId]
  );

  const loading =
    (usersQuery.isLoading || transactionsQuery.isLoading || invoicesQuery.isLoading || metricsQuery.isLoading) &&
    !rawUsers.length &&
    !rawTransactions.length &&
    !rawInvoices.length;

  const queryError =
    transactionsQuery.error ||
    invoicesQuery.error ||
    usersQuery.error ||
    metricsQuery.error;

  const allQueries = [usersQuery, transactionsQuery, invoicesQuery, metricsQuery];
  const retryAll = () => allQueries.forEach((query) => query.refetch());

  if (loading) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Overview' }]}
          title="Operations overview"
          description={`${todayLabel()} · All times WAT`}
        />
        <div className="mt-6">
          <PageLoading />
        </div>
      </>
    );
  }

  if (queryError && !rawUsers.length && !rawTransactions.length && !rawInvoices.length) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Overview' }]}
          title="Operations overview"
          description={`${todayLabel()} · All times WAT`}
        />
        <Card className="mt-6">
          <ErrorState
            title="The overview could not be loaded"
            error={queryError}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={retryAll}>Try again</Button>}
          />
        </Card>
      </>
    );
  }

  const successful = scopedTransactions.filter(
    (transaction) => String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS'
  );
  const withdrawals = scopedTransactions.filter(
    (transaction) => String(transactionType(transaction)).toUpperCase() === 'WITHDRAW'
  );
  const successfulWithdrawals = withdrawals.filter(
    (transaction) => String(transactionStatus(transaction)).toUpperCase() === 'SUCCESS'
  );
  const payoutVolume = successfulWithdrawals.reduce(
    (sum, transaction) => sum + transactionAmount(transaction),
    0
  );
  const outstandingInvoices = scopedInvoices.filter(
    (invoice) => String(invoice.status || '').toUpperCase() !== 'TREATED'
  );
  const outstandingAmount = outstandingInvoices.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0);
  const successRate = scopedTransactions.length
    ? Math.round((successful.length / scopedTransactions.length) * 1000) / 10
    : 0;
  const activeEmployees = isAdmin(role)
    ? metrics?.users?.active ?? scopedUsers.filter((user) => user.status === 'ACTIVE').length
    : scopedUsers.filter((user) => user.status === 'ACTIVE').length;
  const chart = buildCashSeries(scopedTransactions);
  const recent = bestTransactionRows(scopedTransactions, 3);
  const failedWithdrawals = withdrawals.filter(
    (transaction) => String(transactionStatus(transaction)).toUpperCase() === 'FAILED'
  );
  const pendingUsers = scopedUsers.filter((user) => user.status === 'PENDING').length;
  const run = samplePayoutRuns[0];

  return (
    <div className="space-y-5">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Overview' }]}
        title="Operations overview"
        description={`${todayLabel()} · All times WAT`}
        actions={
          <>
            <Button variant="secondary" icon="refresh" onClick={retryAll}>
              Refresh
            </Button>
            {isAdmin(role) ? (
              <Button variant="primary" icon="plus" disabled title="Payout-run API required">
                New pay run
              </Button>
            ) : null}
          </>
        }
      />

      {queryError ? (
        <InlineNotice tone="warning" title="Some live data could not be refreshed">
          Showing everything that loaded successfully. Try again when the API is available.
        </InlineNotice>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Payout volume"
          value={formatCompactMoney(payoutVolume)}
          icon="trendUp"
          hint="successful withdrawals · latest 100"
          series={chart.payouts}
        />
        <KpiCard
          label="Active employees"
          value={formatNumber(activeEmployees)}
          icon="users"
          hint={isAdmin(role) ? 'across active employers' : 'in your workforce'}
        />
        <KpiCard
          label="Payout success"
          value={`${successRate || 0}%`}
          icon="checkCircle"
          hint={`${successful.length} of ${scopedTransactions.length} movements`}
          seriesColor="var(--chart-payout)"
        />
        <KpiCard
          label="Outstanding invoices"
          value={formatCompactMoney(outstandingAmount)}
          icon="invoices"
          hint={`${outstandingInvoices.length} awaiting action`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.95fr)_minmax(320px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-3 px-5 pb-2 pt-4">
            <div>
              <h2 className="text-[15px] font-semibold text-ink">Cash movement</h2>
              <p className="mt-0.5 text-[11px] text-muted">Deposits and employee withdrawals · last 30 days</p>
            </div>
            <Tag tone="neutral">Live ledger</Tag>
          </div>
          <div className="flex flex-wrap items-center gap-4 px-5 pb-1 pt-1">
            <LegendDot color="var(--chart-deposit)">Employer funding</LegendDot>
            <LegendDot color="var(--chart-payout)">Employee payouts</LegendDot>
            <span className="ml-auto text-[10px] text-muted-light">From the latest 100 transactions</span>
          </div>
          <div className="px-3 pb-3 pt-1">
            {scopedTransactions.length ? (
              <AreaChart primary={chart.deposits} secondary={chart.payouts} labels={chart.labels} height={250} />
            ) : (
              <EmptyState
                icon="transactions"
                title="No movements in this window"
                description="Cash movement will appear here once transactions are available."
                className="min-h-[250px]"
              />
            )}
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-5 py-4">
            <div className="flex items-center gap-2">
              <Icon name="calendar" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Next payout run</h2>
            </div>
            <Tag tone="info">Proposed</Tag>
          </div>
          <div className="flex-1 px-5">
            <p className="text-[11px] text-muted">28 October 2026 · 09:00</p>
            <p className="bo-numeric mt-1 text-[29px] font-bold tracking-[-0.03em] text-ink">XAF 12.84M</p>
            <p className="mt-1 text-[11px] text-muted">1,204 employees · 4 clients</p>
            <div className="my-4 h-px bg-border" />
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted">Funding progress</span>
              <span className="font-semibold text-ink">{run.fundedPct}%</span>
            </div>
            <ProgressBar value={run.fundedPct} className="mt-2" />
            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted">
              <Icon name="clock" size={12} className="text-warning" />
              Funding window closes 27 Oct · 16:00
            </p>
            <p className="mt-3 rounded-sm bg-surface-sunken px-3 py-2 text-[10px] leading-5 text-muted">
              Payout-run orchestration is not available in the current API. The schedule is illustrative and actions are disabled.
            </p>
          </div>
          <div className="space-y-2 p-4">
            <Button href="/dashboard/payments" variant="secondary" fullWidth trailingIcon="arrowRight">
              View payout workspace
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.95fr)_minmax(320px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <h2 className="text-[13px] font-semibold text-ink">Recent transactions</h2>
            <Link href="/dashboard/transactions" className="inline-flex items-center gap-1 text-[11px] font-semibold text-cobalt-text">
              View ledger <Icon name="chevronRight" size={12} />
            </Link>
          </div>
          {recent.length ? (
            recent.map((transaction) => <RecentTransactionRow key={transaction.id} transaction={transaction} />)
          ) : (
            <EmptyState
              icon="transactions"
              title="No recent transactions"
              description="New payroll funding and withdrawals will appear here."
              className="min-h-[190px]"
            />
          )}
        </Card>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <h2 className="text-[13px] font-semibold text-ink">Needs attention</h2>
            <Tag tone={failedWithdrawals.length || outstandingInvoices.length ? 'warning' : 'success'}>
              {failedWithdrawals.length + outstandingInvoices.length + pendingUsers} items
            </Tag>
          </div>
          <div>
            <AttentionRow
              icon="alert"
              tone={failedWithdrawals.length ? 'error' : 'success'}
              title={failedWithdrawals.length ? `${failedWithdrawals.length} failed withdrawals` : 'No failed withdrawals'}
              detail={failedWithdrawals.length ? 'Review failures in the ledger' : 'The latest transactions are healthy'}
              href="/dashboard/transactions"
            />
            <AttentionRow
              icon="invoices"
              tone={outstandingInvoices.length ? 'warning' : 'success'}
              title={outstandingInvoices.length ? `${outstandingInvoices.length} invoices need action` : 'Invoices are up to date'}
              detail={outstandingInvoices.length ? 'Open invoices awaiting treatment' : 'No outstanding invoices'}
              href="/dashboard/invoices"
            />
            <AttentionRow
              icon="users"
              tone={pendingUsers ? 'warning' : 'success'}
              title={pendingUsers ? `${pendingUsers} employees pending` : 'No pending employees'}
              detail={pendingUsers ? 'Complete account activation' : 'Employee accounts are active'}
              href="/dashboard/users"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
