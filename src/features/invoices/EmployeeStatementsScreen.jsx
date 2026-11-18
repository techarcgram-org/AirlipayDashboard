'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  Card,
  DataTable,
  EmptyState,
  ErrorState,
  Icon,
  KpiCard,
  PageHeader,
  PageLoading,
  StatusPill,
  Tag,
} from '@/components/backoffice';
import { useUserPayPeriodsQuery } from '@/lib/api/queries';
import {
  asArray,
  payPeriodRows,
  transactionAmount,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
  transactionType,
  transactionTypeLabel,
} from '@/lib/data';
import { formatDate, formatDateTime, formatMoney, formatNumber } from '@/lib/format';

function periodKey(period, index) {
  if (period?.from || period?.to) {
    return `${period?.from || 'start'}-${period?.to || 'now'}`;
  }
  return `period-${index}`;
}

function statementFromPeriod(period, index) {
  const transactions = asArray(period?.transactions);
  const successful = transactions.filter((transaction) => {
    const status = String(transactionStatus(transaction)).toUpperCase();
    const type = String(transactionType(transaction)).toUpperCase();
    return status === 'SUCCESS' && type === 'WITHDRAW';
  });
  const statuses = transactions.map((transaction) =>
    String(transactionStatus(transaction)).toUpperCase()
  );
  const from = period?.from || period?.start_date || null;
  const to = period?.to || period?.end_date || null;
  const upcoming =
    Boolean(from && to) && new Date(from).getTime() > new Date(to).getTime();
  return {
    key: periodKey(period, index),
    from,
    to,
    upcoming,
    periodLabel: upcoming
      ? `From ${formatDate(from)}`
      : `${formatDate(from)} – ${formatDate(to)}`,
    transactions,
    advanced: successful.reduce((sum, transaction) => sum + transactionAmount(transaction), 0),
    fees: successful.reduce((sum, transaction) => sum + transactionFee(transaction), 0),
    pending: statuses.filter((status) => status === 'PENDING').length,
    failed: statuses.filter((status) => status === 'FAILED').length,
    latestStatus: transactions.length
      ? transactionStatus(transactions[0])
      : '',
  };
}

function StatementTransactions({ statement }) {
  if (!statement.transactions.length) {
    return (
      <div className="py-5">
        <p className="text-[11px] leading-5 text-muted">
          No transactions were recorded for this pay period.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border py-2">
      {statement.transactions.map((transaction, index) => (
        <div
          key={`${transactionRef(transaction)}-${index}`}
          className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_auto] sm:items-center sm:gap-4"
        >
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-ink">
              {transactionTypeLabel(transaction)}
            </p>
            <p className="truncate text-[10px] text-muted">
              {formatDateTime(transactionDate(transaction))} · {transactionRef(transaction)}
            </p>
          </div>
          <div className="min-w-0 text-[10px] text-muted">
            {transaction.operator || transaction.phone_number
              ? `${transaction.operator || 'Mobile money'}${
                  transaction.phone_number
                    ? ` · •••• ${String(transaction.phone_number).slice(-4)}`
                    : ''
                }`
              : 'No counterparty recorded'}
          </div>
          <div className="bo-numeric text-[12px] font-semibold text-ink sm:text-right">
            {formatMoney(transactionAmount(transaction))}
          </div>
          <div className="sm:w-[92px] sm:text-right">
            <StatusPill status={transactionStatus(transaction)} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmployeeStatementsScreen() {
  const { session } = useAuth();
  const periodsQuery = useUserPayPeriodsQuery(session?.userId, {
    enabled: Boolean(session?.userId),
  });
  const [expandedKeys, setExpandedKeys] = useState([]);

  const statements = useMemo(
    () =>
      payPeriodRows(periodsQuery.data)
        .map(statementFromPeriod)
        // The API prepends the next open period. When it has not started yet
        // (last invoice end is in the future) it only adds a confusing empty
        // row, so keep empty upcoming periods out of the statement list.
        .filter(
          (statement) => !statement.upcoming || statement.transactions.length > 0
        ),
    [periodsQuery.data]
  );
  const latest = statements[0] || null;
  const totalAdvanced = statements.reduce((sum, statement) => sum + statement.advanced, 0);
  const totalFees = statements.reduce((sum, statement) => sum + statement.fees, 0);
  const pendingCount = statements.reduce((sum, statement) => sum + statement.pending, 0);
  const failedCount = statements.reduce((sum, statement) => sum + statement.failed, 0);

  const toggleExpanded = (statement) => {
    setExpandedKeys((current) =>
      current.includes(statement.key)
        ? current.filter((key) => key !== statement.key)
        : [...current, statement.key]
    );
  };

  const columns = [
    {
      key: 'period',
      label: 'Pay period',
      width: '30%',
      cell: (statement) => (
        <div>
          <p className="text-[12px] font-semibold text-ink">{statement.periodLabel}</p>
          <p className="text-[10px] text-muted">
            {formatNumber(statement.transactions.length)} transactions
            {statement.pending ? ` · ${statement.pending} pending` : ''}
            {statement.failed ? ` · ${statement.failed} failed` : ''}
          </p>
        </div>
      ),
    },
    {
      key: 'advanced',
      label: 'Advanced',
      align: 'right',
      width: '18%',
      cell: (statement) => (
        <span className="bo-numeric whitespace-nowrap font-semibold text-ink">
          {formatMoney(statement.advanced)}
        </span>
      ),
    },
    {
      key: 'fees',
      label: 'Fees',
      align: 'right',
      width: '14%',
      cell: (statement) => (
        <span className="bo-numeric whitespace-nowrap">{formatMoney(statement.fees)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Latest status',
      width: '16%',
      cell: (statement) =>
        statement.latestStatus ? (
          <StatusPill status={statement.latestStatus} size="sm" />
        ) : (
          <Tag tone="neutral">No activity</Tag>
        ),
    },
  ];

  if (periodsQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'My account' }, { label: 'My statements' }]}
          title="My earnings statements"
        />
        <PageLoading />
      </div>
    );
  }

  if (periodsQuery.error && !statements.length) {
    return (
      <div className="space-y-5">
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'My account' }, { label: 'My statements' }]}
          title="My earnings statements"
        />
        <Card>
          <ErrorState
            title="Your statements could not be loaded"
            error={periodsQuery.error}
            action={
              <Button
                variant="secondary"
                size="sm"
                icon="refresh"
                onClick={() => periodsQuery.refetch()}
              >
                Try again
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'My account' }, { label: 'My statements' }]}
        title="My earnings statements"
        description="A pay-period summary of the earned wage advances paid to you."
        actions={
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => periodsQuery.refetch()}
            loading={periodsQuery.isFetching}
          >
            Refresh
          </Button>
        }
      />

      <Card className="border-l-4 border-l-cobalt p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-cobalt-soft text-cobalt-text">
            <Icon name="info" size={16} />
          </span>
          <div>
            <h2 className="text-[13px] font-semibold text-ink">
              This is a statement, not a bill
            </h2>
            <p className="mt-1 max-w-[760px] text-[11px] leading-6 text-muted">
              Each period shows the earned wage advances AirliPay paid you, the fees applied to
              those advances and the status of every transaction. Your employer receives a separate
              reimbursement invoice from AirliPay; you do not owe the amounts shown here.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Latest period advances"
          value={formatMoney(latest?.advanced ?? 0)}
          icon="arrowUpRight"
          hint={latest ? latest.periodLabel : 'No completed period yet'}
        />
        <KpiCard
          label="Total advanced"
          value={formatMoney(totalAdvanced)}
          icon="wallet"
          hint={`${formatNumber(statements.length)} pay periods on record`}
        />
        <KpiCard
          label="Fees applied"
          value={formatMoney(totalFees)}
          icon="sliders"
          hint="Service fee on successful advances"
        />
        <KpiCard
          label="Pending / failed"
          value={`${formatNumber(pendingCount)} / ${formatNumber(failedCount)}`}
          icon="clock"
          hint={failedCount ? 'Review failed advances in the ledger' : 'No failed advances'}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="invoices" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">Pay periods</h2>
            <span className="text-[10px] text-muted">
              {formatNumber(statements.length)} statements
            </span>
          </div>
          <Tag tone="neutral">From your transaction ledger</Tag>
        </div>
        <DataTable
          columns={columns}
          rows={statements}
          rowKey={(statement) => statement.key}
          minWidth={620}
          expandedKeys={expandedKeys}
          onToggleExpand={toggleExpanded}
          renderExpandedRow={(statement) => <StatementTransactions statement={statement} />}
          emptyTitle="No statements yet"
          emptyDescription="Your pay-period statements appear after your first earned wage advance. Advances and fees are recorded per transaction."
          emptyAction={
            <Button href="/dashboard/transactions" size="sm" variant="secondary">
              View my transactions
            </Button>
          }
          footer={
            <p className="text-[10px] leading-4 text-muted">
              Statements are generated from the pay-period ledger returned by the API. Official
              payslips and tax documents are issued by your employer, not by this console.
            </p>
          }
        />
      </Card>

      {!statements.length && !periodsQuery.isLoading ? (
        <Card>
          <EmptyState
            icon="info"
            title="How statements are built"
            description="Each successful advance, fee and pending or failed payout is recorded against your pay period. Nothing is estimated."
          />
        </Card>
      ) : null}

      <div className="text-[10px] leading-5 text-muted">
        <p>
          Data source: employee pay-period endpoint. Available fields: period, amount, fees, status,
          transaction type and reference. Payment-method details beyond the mobile-money operator
          are not stored on this statement.
        </p>
      </div>
    </div>
  );
}
