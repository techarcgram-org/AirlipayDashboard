'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/components/backoffice/Toast';
import {
  Avatar,
  BrandMark,
  Button,
  Card,
  DataTable,
  Divider,
  EmptyState,
  ErrorState,
  Icon,
  InlineNotice,
  Modal,
  PageHeader,
  PageLoading,
  SearchInput,
  SelectControl,
  StatusPill,
  Tabs,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import {
  useClientsQuery,
  useInvoiceActivityQuery,
  useInvoiceTransactionsQuery,
  useInvoicesQuery,
  useUpdateInvoiceStatusMutation,
  useUsersQuery,
} from '@/lib/api/queries';
import {
  asArray,
  enrichInvoice,
  invoiceClientId,
  invoiceClientName,
  invoiceFees,
  invoiceNumber,
  invoicePeriod,
  invoiceStatus,
  invoiceServiceCharge,
  invoiceTaxes,
  invoiceTotal,
  normalizeUser,
  transactionAmount,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
  transactionTypeLabel,
} from '@/lib/data';
import { formatDate, formatDateTime, formatMoney, formatNumber } from '@/lib/format';
import { buildUserMap, isAdmin, isClient, sameId } from '@/lib/permissions';
import { INVOICE_STATUS_OPTIONS, invoiceStatusLabel } from '@/lib/status';

function InvoiceDocument({ invoice, client, transactions }) {
  const total = invoiceTotal(invoice);
  const fees = invoiceFees(invoice);
  const taxes = invoiceTaxes(invoice);
  const serviceCharge = invoiceServiceCharge(invoice);
  const serviceChargeDetails = invoice.serviceChargeDetails || invoice.service_charge_details || {};
  const advanced = serviceCharge > 0
    ? Math.max(0, total - serviceCharge)
    : Math.max(0, total - fees - taxes);
  const employeesCovered = new Set(transactions.map((transaction) => String(transaction.user_id))).size;
  const clientAddress = client?.addresses || {};
  const clientTaxId = client?.tax_id || client?.taxId;
  const dueDate = invoice.due_date || invoice.dueDate || invoice.payment_due_date;

  return (
    <Card className="overflow-hidden">
      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandMark size={28} />
            <span className="text-[18px] font-extrabold tracking-[-0.03em] text-ink">AirliPay</span>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-light">Invoice</p>
            <p className="mt-1 text-[12px] font-semibold text-ink">{invoiceNumber(invoice)}</p>
          </div>
        </div>

        <h2 className="mt-7 text-[24px] font-bold leading-tight tracking-[-0.03em] text-ink">
          Earned Wage Access Reimbursement Invoice
        </h2>
        <p className="mt-1 text-[11px] text-muted">
          Issued {formatDate(invoice.created_at || invoice.from)} · Period {invoicePeriod(invoice)}
          {dueDate ? ` · Payment due ${formatDate(dueDate)}` : ' · Payment due date not provided'}
        </p>

        <Divider className="my-5" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-light">To</p>
            <p className="mt-1.5 text-[13px] font-semibold text-ink">{invoiceClientName(invoice) || client?.name}</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">
              {[clientAddress.street, clientAddress.city, clientAddress.region].filter(Boolean).join(', ') || 'Address not on record'}
            </p>
            {clientTaxId ? <p className="text-[11px] text-muted">Tax ID {clientTaxId}</p> : null}
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-light">From</p>
            <p className="mt-1.5 text-[13px] font-semibold text-ink">Techarcgram Company Limited</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">Bakweri Town, Buea</p>
            <p className="text-[11px] text-muted">Southwest, Cameroon</p>
            <p className="text-[11px] text-muted">support@airlipay.cm</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-sm border border-border">
          <div className="flex items-center justify-between gap-3 bg-surface-sunken px-4 py-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">Summary of services</p>
            <p className="text-[9px] text-muted">
              {employeesCovered ? `${formatNumber(employeesCovered)} employees covered` : 'Employee count not linked'}
            </p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-[11px]">
              <span className="text-ink-soft">Earned wage access advanced</span>
              <span className="bo-numeric font-medium text-ink">{formatMoney(advanced)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-[11px]">
              <span className="text-ink-soft">AirliPay service fee</span>
              <span className="bo-numeric font-medium text-ink">{formatMoney(fees)}</span>
            </div>
            {serviceCharge > 0 ? (
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-[11px]">
                <span className="text-ink-soft">
                  Company service charge
                  {serviceChargeDetails.eligibleEmployees
                    ? ` · ${formatNumber(serviceChargeDetails.eligibleEmployees)} employees`
                    : ''}
                </span>
                <span className="bo-numeric font-medium text-ink">{formatMoney(serviceCharge)}</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-[11px]">
              <span className="text-ink-soft">VAT / taxes</span>
              <span className="bo-numeric font-medium text-ink">{formatMoney(taxes)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 bg-surface-sunken px-4 py-3">
              <span className="text-[12px] font-semibold text-ink">Total amount due</span>
              <span className="bo-numeric text-[14px] font-bold text-ink">{formatMoney(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Payment due</p>
            <p className="mt-1 text-[15px] font-semibold text-ink">{dueDate ? formatDate(dueDate) : 'Not specified'}</p>
          </div>
          <p className="bo-numeric text-[26px] font-bold tracking-[-0.03em] text-ink">{formatMoney(total)}</p>
        </div>

        <Divider className="my-5" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Payment details</p>
            <p className="mt-1.5 text-[11px] leading-5 text-muted">
              Bank details and payment references are not stored on this invoice record. Please use the existing
              settlement arrangement for this employer.
            </p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Note</p>
            <p className="mt-1.5 text-[11px] leading-5 text-muted">
              This invoice reflects earned wage access advanced on behalf of the employer. Amounts are taken from the
              invoice totals returned by the API; the service-line split is derived from fees and taxes.
            </p>
          </div>
        </div>
        <Divider className="my-5" />
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-light">
          <span>Techarcgram Company Limited · Cameroon</span>
          <span>Thank you.</span>
        </div>
      </div>
    </Card>
  );
}

export function InvoiceDetailScreen() {
  const { id } = useParams();
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const invoicesQuery = useInvoicesQuery();
  const invoiceTransactionsQuery = useInvoiceTransactionsQuery(id);
  const activityQuery = useInvoiceActivityQuery(id, { enabled: isAdmin(role) });
  const usersQuery = useUsersQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const updateStatus = useUpdateInvoiceStatusMutation();
  const { push } = useToast();
  const [tab, setTab] = useState('summary');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState('TREATED');
  const [reason, setReason] = useState('');
  const [search, setSearch] = useState('');

  const clients = asArray(clientsQuery.data);
  const rawInvoice = useMemo(
    () => asArray(invoicesQuery.data).find((invoice) => sameId(invoice.id, id)),
    [id, invoicesQuery.data]
  );
  const invoice = rawInvoice ? enrichInvoice(rawInvoice, clients) : null;
  const allowed = !isClient(role) || !rawInvoice || sameId(invoiceClientId(rawInvoice), userId);
  const clientRecord =
    rawInvoice?.client ||
    clients.find((client) => sameId(client.id, invoiceClientId(rawInvoice))) ||
    null;
  const userMap = useMemo(() => buildUserMap(asArray(usersQuery.data)), [usersQuery.data]);
  const transactions = useMemo(
    () =>
      asArray(invoiceTransactionsQuery.data).sort(
        (left, right) => new Date(transactionDate(right) || 0) - new Date(transactionDate(left) || 0)
      ),
    [invoiceTransactionsQuery.data]
  );
  const filteredTransactions = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return transactions;
    return transactions.filter((transaction) => {
      const user = userMap.get(String(transaction.user_id));
      return [transactionRef(transaction), user?.name, transaction.phone_number]
        .some((value) => String(value || '').toLowerCase().includes(needle));
    });
  }, [search, transactions, userMap]);

  const loading = invoicesQuery.isLoading && !invoicesQuery.data;

  if (loading) {
    return <PageLoading />;
  }

  if (invoicesQuery.error && !invoicesQuery.data) {
    return (
      <Card>
        <ErrorState
          title="Invoice could not be loaded"
          error={invoicesQuery.error}
          action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => invoicesQuery.refetch()}>Try again</Button>}
        />
      </Card>
    );
  }

  if (!invoice) {
    return (
      <Card>
        <ErrorState
          title="Invoice not found"
          error={{ message: 'This invoice is not in the list returned for your account.' }}
          action={<Button href="/dashboard/invoices" size="sm">Back to invoices</Button>}
        />
      </Card>
    );
  }

  if (!allowed) {
    return (
      <Card>
        <ErrorState
          title="Invoice not available"
          error={{ message: 'This invoice belongs to another client.' }}
          action={<Button href="/dashboard/invoices" size="sm">Back to invoices</Button>}
        />
      </Card>
    );
  }

  const status = invoiceStatus(invoice);
  const isTreated = String(status).toUpperCase() === 'TREATED';
  const withdrawals = transactions.filter(
    (transaction) => String(transaction.transaction_type || transaction.type || '').toUpperCase() === 'WITHDRAW'
  );
  const totalCount = transactions.length;
  const employeeCount = new Set(transactions.map((transaction) => String(transaction.user_id))).size;
  const preview = withdrawals.slice(0, 3);

  const openStatusDialog = () => {
    setNextStatus(status === 'TREATED' ? 'NOT_TREATED' : 'TREATED');
    setReason('');
    setConfirmOpen(true);
  };

  const handleStatusUpdate = async () => {
    try {
      await updateStatus.mutateAsync({
        id: invoice.id,
        status: nextStatus,
        reason: reason.trim() || undefined,
      });
      setConfirmOpen(false);
      push({
        title: 'Invoice status updated',
        message: `${invoiceNumber(invoice)} is now ${invoiceStatusLabel(nextStatus)}.`,
      });
    } catch {
      // Error is shown inside the confirmation dialog.
    }
  };

  const activityEntries = asArray(activityQuery.data?.data);

  const tabItems = [
    { key: 'summary', label: 'Summary' },
    { key: 'transactions', label: 'Transactions', count: transactions.length || undefined },
    { key: 'activity', label: 'Activity' },
  ].map((entry) => ({
    ...entry,
    active: tab === entry.key,
    onClick: () => setTab(entry.key),
  }));

  const transactionColumns = [
    {
      key: 'date',
      label: 'Date',
      width: '16%',
      cell: (transaction) => <span className="whitespace-nowrap text-[11px]">{formatDateTime(transactionDate(transaction))}</span>,
    },
    {
      key: 'employee',
      label: 'Employee',
      width: '19%',
      cell: (transaction) => {
        const user = userMap.get(String(transaction.user_id));
        if (!user) return <span className="text-[11px] text-muted">Unmatched employee</span>;
        const normalized = normalizeUser(user);
        return (
          <Link href={`/dashboard/users/${user.id}`} className="flex min-w-0 items-center gap-2">
            <Avatar name={normalized.displayName} initials={normalized.initials} size={26} tone="brand" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-ink hover:text-cobalt-text">{normalized.displayName}</p>
              <p className="truncate text-[9px] text-muted">{normalized.employeeId}</p>
            </div>
          </Link>
        );
      },
    },
    {
      key: 'type',
      label: 'Type',
      width: '13%',
      cell: (transaction) => <span className="text-[11px]">{transactionTypeLabel(transaction)}</span>,
    },
    {
      key: 'reference',
      label: 'Reference',
      width: '18%',
      cell: (transaction) => (
        <div>
          <p className="text-[11px] font-medium text-ink">{transactionRef(transaction)}</p>
          <p className="text-[9px] text-muted">{transaction.operator || transaction.phone_number || '—'}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      width: '13%',
      cell: (transaction) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(transactionAmount(transaction))}</span>,
    },
    {
      key: 'fee',
      label: 'Fee',
      align: 'right',
      width: '11%',
      cell: (transaction) => <span className="bo-numeric whitespace-nowrap">{formatMoney(transactionFee(transaction))}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      width: '12%',
      cell: (transaction) => <StatusPill status={transactionStatus(transaction)} size="sm" />,
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'Invoices', href: '/dashboard/invoices' }, { label: invoiceNumber(invoice) }]}
        title={invoiceNumber(invoice)}
        badge={<StatusPill status={status} />}
        description={`${invoice.clientName} · ${invoice.periodLabel}`}
        actions={
          <>
            <Button variant="secondary" icon="download" disabled title="PDF generation is not exposed by the API.">
              Download PDF
            </Button>
            {isAdmin(role) ? (
              <Button icon="activity" onClick={openStatusDialog}>
                Change status
              </Button>
            ) : isTreated ? (
              <Tag tone="success" icon="checkCircle">Invoice treated</Tag>
            ) : null}
          </>
        }
        tabs={tabItems}
      />

      {tab === 'summary' ? (
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <InvoiceDocument invoice={invoice} client={clientRecord} transactions={transactions} />

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[14px] font-semibold text-ink">Invoice status</h2>
                <StatusPill status={status} size="sm" />
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Recorded</span>
                  <span className="text-[11px] font-medium text-ink">{formatDate(invoice.created_at || invoice.from)}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Invoice period</span>
                  <span className="text-right text-[11px] font-medium text-ink">{invoice.periodLabel}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Payment due</span>
                  <span className="text-right text-[11px] font-medium text-ink">
                    {invoice.due_date || invoice.dueDate ? formatDate(invoice.due_date || invoice.dueDate) : 'Not provided'}
                  </span>
                </div>
              </div>
              {isTreated ? (
                <div className="mt-3 flex items-start gap-2 rounded-sm bg-success-soft px-3 py-2.5 text-[10px] leading-5 text-success">
                  <Icon name="checkCircle" size={13} className="mt-0.5 shrink-0" />
                  <p>This invoice has been marked as treated.</p>
                </div>
              ) : (
                <div className="mt-3 rounded-sm bg-warning-soft px-3 py-2.5 text-[10px] leading-5 text-warning">
                  The invoice is waiting for treatment. Intermediate delivery events are not tracked by the API.
                </div>
              )}
              <p className="mt-3 text-[10px] leading-5 text-muted">
                Every status override by an admin is recorded in the audit trail with the actor,
                timestamp, previous status, new status and an optional reason.
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[14px] font-semibold text-ink">Payment</h2>
                <Tag tone="neutral">Not tracked</Tag>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Amount</span>
                  <span className="bo-numeric text-[13px] font-semibold text-ink">{formatMoney(invoiceTotal(invoice))}</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Method</span>
                  <span className="text-[11px] font-medium text-ink">Not tracked</span>
                </div>
                <div className="flex items-baseline justify-between gap-3 py-1">
                  <span className="text-[11px] text-muted">Reference</span>
                  <span className="text-[11px] font-medium text-ink">{invoice.payment_reference || 'Not tracked'}</span>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-5 text-muted">
                Settlement method and payment reference are not part of the current invoice API.
              </p>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-[14px] font-semibold text-ink">Included transactions</h2>
                <Tag tone="neutral">{formatNumber(totalCount)} total</Tag>
              </div>
              <p className="mt-1 text-[10px] text-muted">
                {employeeCount ? `${formatNumber(employeeCount)} employees in this invoice` : 'Employee links loading'}
              </p>
              <div className="mt-3 space-y-2">
                {preview.length ? (
                  preview.map((transaction, index) => {
                    const user = userMap.get(String(transaction.user_id));
                    const normalized = normalizeUser(user);
                    return (
                      <div key={`${transaction.id || transactionRef(transaction)}-${index}`} className="flex items-center gap-2.5 border-b border-border pb-2 last:border-0">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt-soft text-cobalt-text">
                          <Icon name="arrowUpRight" size={11} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-medium text-ink">{user ? normalized.displayName : 'Unmatched employee'}</p>
                          <p className="text-[9px] text-muted">{formatDate(transactionDate(transaction))}</p>
                        </div>
                        <span className="bo-numeric text-[10px] font-semibold text-ink">{formatMoney(transactionAmount(transaction))}</span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[11px] leading-5 text-muted">No linked withdrawal transactions yet.</p>
                )}
              </div>
              <Button variant="secondary" fullWidth className="mt-4" onClick={() => setTab('transactions')}>
                Review all {formatNumber(totalCount)}
              </Button>
              <p className="mt-2 text-[9px] leading-4 text-muted">
                Samples shown. The invoice total comes from the invoice record, not this preview.
              </p>
            </Card>
          </div>
        </div>
      ) : null}

      {tab === 'transactions' ? (
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="transactions" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Invoice transactions</h2>
              <span className="text-[10px] text-muted">{formatNumber(filteredTransactions.length)} entries</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SearchInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search employee or reference"
                className="w-full sm:w-[210px]"
                aria-label="Search invoice transactions"
              />
              <Button
                variant="secondary"
                size="sm"
                icon="download"
                disabled={!filteredTransactions.length}
                onClick={() =>
                  exportCsv(
                    `${invoiceNumber(invoice)}-transactions`,
                    [
                      { label: 'Date', csvValue: (transaction) => transactionDate(transaction) },
                      { label: 'Reference', csvValue: (transaction) => transactionRef(transaction) },
                      { label: 'Type', csvValue: (transaction) => transactionTypeLabel(transaction) },
                      { label: 'Amount', csvValue: (transaction) => transactionAmount(transaction) },
                      { label: 'Fee', csvValue: (transaction) => transactionFee(transaction) },
                      { label: 'Status', csvValue: (transaction) => transactionStatus(transaction) },
                    ],
                    filteredTransactions
                  )
                }
              >
                CSV
              </Button>
            </div>
          </div>
          <DataTable
            columns={transactionColumns}
            rows={filteredTransactions}
            loading={invoiceTransactionsQuery.isLoading}
            error={invoiceTransactionsQuery.error}
            minWidth={800}
            emptyTitle="No linked transactions"
            emptyDescription="The invoice has no transaction records linked through the current API."
            footer={
              <p className="text-[10px] text-muted">
                {formatNumber(filteredTransactions.length)} of {formatNumber(totalCount)} transactions · employees are
                joined from the users endpoint
              </p>
            }
          />
        </Card>
      ) : null}

      {tab === 'activity' ? (
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="activity" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Invoice activity</h2>
            </div>
            <Tag tone="neutral">Audit trail</Tag>
          </div>
          {!isAdmin(role) ? (
            <EmptyState
              icon="lock"
              title="Activity is admin-only"
              description="Invoice audit entries are available to operations admins."
              className="min-h-[260px]"
            />
          ) : activityQuery.isLoading ? (
            <div className="p-5">
              <PageLoading />
            </div>
          ) : activityQuery.error ? (
            <div className="p-5">
              <ErrorState
                title="Invoice activity could not be loaded"
                error={activityQuery.error}
                action={
                  <Button variant="secondary" size="sm" icon="refresh" onClick={() => activityQuery.refetch()}>
                    Try again
                  </Button>
                }
              />
            </div>
          ) : activityEntries.length ? (
            <div className="divide-y divide-border">
              {activityEntries.map((entry) => {
                const metadata = entry.metadata || {};
                const detail = [
                  metadata.previousStatus && metadata.nextStatus
                    ? `${invoiceStatusLabel(metadata.previousStatus)} → ${invoiceStatusLabel(metadata.nextStatus)}`
                    : null,
                  metadata.reason ? `Reason: ${metadata.reason}` : null,
                  metadata.invoiceNumber ? `Invoice ${metadata.invoiceNumber}` : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <div key={entry.id} className="flex gap-3 px-5 py-3.5">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-info-soft text-info">
                      <Icon name="activity" size={13} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[12px] font-semibold text-ink">
                          {String(entry.action || '')
                            .replaceAll('.', ' ')
                            .replace(/^\w/, (letter) => letter.toUpperCase())}
                        </p>
                        <p className="text-[10px] text-muted">{formatDateTime(entry.created_at)}</p>
                      </div>
                      <p className="mt-0.5 text-[10px] text-muted">
                        {entry.actor_email || entry.actor_type || 'System'}
                        {entry.actor_role ? ` · ${entry.actor_role}` : ''}
                        {entry.source ? ` · ${entry.source}` : ''}
                        {entry.ip ? ` · ${entry.ip}` : ''}
                      </p>
                      {detail ? (
                        <p className="mt-1 text-[11px] leading-5 text-ink-soft">{detail}</p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="activity"
              title="No activity recorded yet"
              description="Admin status changes and client submissions are recorded here. Delivery and view events are not tracked."
              className="min-h-[260px]"
            />
          )}
        </Card>
      ) : null}

      <Modal
        open={confirmOpen}
        onClose={() => !updateStatus.isPending && setConfirmOpen(false)}
        title="Change invoice status"
        description={`Update the status of ${invoiceNumber(invoice)}. The change is recorded in the audit trail.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)} disabled={updateStatus.isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              loading={updateStatus.isPending}
              disabled={!nextStatus || nextStatus === status}
              icon="check"
            >
              Update status
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-sm bg-surface-sunken px-3.5 py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-light">
                Current status
              </p>
              <p className="mt-1 text-[13px] font-semibold text-ink">
                {invoiceStatusLabel(status)}
              </p>
            </div>
            <StatusPill status={status} />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-ink-soft">New status</span>
            <SelectControl
              value={nextStatus}
              onChange={(event) => setNextStatus(event.target.value)}
              options={INVOICE_STATUS_OPTIONS}
              placeholder="Select a status"
              icon="filter"
              label="New invoice status"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-ink-soft" htmlFor="invoice-status-reason">
              Reason (optional)
            </label>
            <textarea
              id="invoice-status-reason"
              name="reason"
              rows={3}
              maxLength={500}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-[12px] text-ink outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
              placeholder="e.g. Payment confirmed against bank statement"
            />
          </div>

          <p className="text-[11px] leading-5 text-muted">
            Only operations admins can override invoice status. Invalid transitions are rejected by
            the API, and this action does not create a payment or change funding records.
          </p>

          {updateStatus.error ? (
            <InlineNotice tone="error" title="Status could not be updated">
              {updateStatus.error?.response?.data?.message || updateStatus.error?.message || 'The invoice API rejected the request.'}
            </InlineNotice>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
