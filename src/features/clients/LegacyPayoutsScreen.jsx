'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  Card,
  DataTable,
  ErrorState,
  KpiCard,
  PageHeader,
  StatusPill,
  SupportNotice,
  Tag,
} from '@/components/backoffice';
import { formatDate, formatMoney, formatNumber } from '@/lib/format';
import { isAdmin } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';
import { sampleClientPayoutSchedule } from '@/fixtures/backoffice';

export function LegacyPayoutsScreen() {
  const { session } = useAuth();
  if (!isAdmin(session?.role)) {
    return (
      <Card>
        <ErrorState
          title="Client payouts are restricted"
          error={{ message: 'Only operations admins can view the payout schedule.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  const total = sampleClientPayoutSchedule.reduce((sum, row) => sum + row.amount, 0);
  const employees = sampleClientPayoutSchedule.reduce((sum, row) => sum + row.employees, 0);

  const columns = [
    {
      key: 'date',
      label: 'Payment date',
      width: '13%',
      cell: (row) => <span className="whitespace-nowrap text-[11px] font-medium text-ink">{formatDate(row.date)}</span>,
    },
    {
      key: 'client',
      label: 'Client',
      width: '22%',
      cell: (row) => (
        <div>
          <p className="text-[12px] font-semibold text-ink">{row.client}</p>
          <p className="text-[10px] text-muted">{row.industry}</p>
        </div>
      ),
    },
    {
      key: 'employees',
      label: 'Employees',
      align: 'right',
      width: '12%',
      cell: (row) => <span className="bo-numeric">{formatNumber(row.employees)}</span>,
    },
    {
      key: 'amount',
      label: 'Projected amount',
      align: 'right',
      width: '16%',
      cell: (row) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(row.amount)}</span>,
    },
    {
      key: 'funding',
      label: 'Funding position',
      width: '15%',
      cell: (row) => <StatusPill status={row.funding} tone={row.tone} size="sm" />,
    },
    {
      key: 'action',
      label: '',
      align: 'right',
      width: 100,
      cell: () => (
        <Button variant="ghost" size="sm" disabled title="Legacy schedule is read-only.">
          View run
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Client payouts' }]}
        title="Client payouts"
        description="Legacy schedule preview retained from the previous console. This route is read-only."
        actions={
          <>
            <Button href="/dashboard/clients" variant="secondary" icon="arrowLeft">
              Clients
            </Button>
            <Button variant="primary" icon="plus" disabled title="Payout runs are not connected to an API.">
              New payout
            </Button>
          </>
        }
      />

      <SupportNotice capability={CAPABILITIES.clientPayouts} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Scheduled payouts" value={formatNumber(sampleClientPayoutSchedule.length)} icon="calendar" hint="sample schedule" />
        <KpiCard label="Employees covered" value={formatNumber(employees)} icon="users" hint="sample roster total" />
        <KpiCard label="Projected volume" value={formatMoney(total)} icon="payments" hint="illustrative amount" />
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-[14px] font-semibold text-ink">Payment schedule</h2>
            <Tag tone="neutral">Legacy fixture</Tag>
          </div>
          <span className="text-[10px] text-muted">No live actions connected</span>
        </div>
        <DataTable
          columns={columns}
          rows={sampleClientPayoutSchedule}
          minWidth={780}
          emptyTitle="No scheduled payouts"
          emptyDescription="There is no live payout schedule in the current API."
          footer={
            <p className="text-[10px] leading-5 text-muted">
              These rows are deterministic sample data from the previous dashboard route. They do not reflect live
              funding or payroll totals.
            </p>
          }
        />
      </Card>
    </div>
  );
}
