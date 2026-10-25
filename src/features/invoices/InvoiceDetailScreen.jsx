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
  StatusPill,
  Tabs,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import {
  useClientsQuery,
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
  invoiceTaxes,
  invoiceTotal,
  normalizeUser,
  transactionAmount,
  transactionDate,
  transactionFee,
  transactionRef,
  transactionStatus,
} from '@/lib/data';
import { formatDate, formatDateTime, formatMoney, formatNumber } from '@/lib/format';
import { buildUserMap, isAdmin, isClient, sameId } from '@/lib/permissions';

function InvoiceDocument({ invoice, client, transactions }) {
  const total = invoiceTotal(invoice);
  const fees = invoiceFees(invoice);
  const taxes = invoiceTaxes(invoice);
  const advanced = Math.max(0, total - fees - taxes);
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
  const usersQuery = useUsersQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const updateStatus = useUpdateInvoiceStatusMutation();
  const { push } = useToast();
  const [tab, setTab] = useState('summary');
  const [confirmOpen, setConfirmOpen] = useState(false);
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

  const handleMarkTreated = async () => {
    try {
      await updateStatus.mutateAsync({ id: invoice.id, status: 'TREATED' });
      setConfirmOpen(false);
      push({ title: 'Invoice marked as treated', message: `${invoiceNumber(invoice)} was updated.` });
    } catch {
      // Error is shown inside the confirmation dialog.
    }
  };

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
      width: '22%',
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
      key: 'reference',
      label: 'Reference',
      width: '20%',
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
            {!isTreated ? (
              <Button
                icon="check"
                disabled={!isAdmin(role)}
                title={!isAdmin(role) ? 'Only operations admins can update invoice status.' : undefined}
                onClick={() => setConfirmOpen(true)}
              >
                Mark as treated
              </Button>
            ) : (
              <Tag tone="success" icon="checkCircle">Invoice treated</Tag>
            )}
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
                The API only stores the current invoice status. Sent, confirmed and viewed events are not available.
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
        <Card>
          <EmptyState
            icon="activity"
            title="Activity feed not connected"
            description="Invoice status changes and delivery events are not available from the current API. Only the current status is shown."
            className="min-h-[300px]"
          />
        </Card>
      ) : null}

      <Modal
        open={confirmOpen}
        onClose={() => !updateStatus.isPending && setConfirmOpen(false)}
        title="Mark invoice as treated"
        description={`This will update ${invoiceNumber(invoice)} through the invoice status endpoint.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)} disabled={updateStatus.isPending}>
              Cancel
            </Button>
            <Button onClick={handleMarkTreated} loading={updateStatus.isPending} icon="check">
              Mark as treated
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-[12px] leading-6 text-ink-soft">
            Marking the invoice as treated records that it has been handled. It does not create a payment or change
            any funding records.
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
