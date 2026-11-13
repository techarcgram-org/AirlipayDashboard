'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  Card,
  DataTable,
  ErrorState,
  Icon,
  PageHeader,
  ProgressBar,
  StatusPill,
  SupportNotice,
  Tag,
  exportCsv,
} from '@/components/backoffice';
import { formatDate, formatMoney, formatNumber } from '@/lib/format';
import { isAdmin } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';
import { samplePayoutRuns } from '@/fixtures/backoffice';

const RUN_LABELS = {
  SCHEDULED: 'Scheduled',
  SETTLED: 'Settled',
  NEEDS_ATTENTION: 'Needs attention',
};

function ChecklistRow({ icon, title, detail, done = false }) {
  return (
    <div className="flex items-start gap-2.5 border-b border-border py-2.5 last:border-0">
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${done ? 'bg-success-soft text-success' : 'bg-surface-sunken text-muted'}`}>
        <Icon name={done ? 'check' : icon} size={11} />
      </span>
      <div className="min-w-0 flex-1">
        <p className={done ? 'text-[11px] font-medium text-muted line-through' : 'text-[11px] font-medium text-ink'}>{title}</p>
        <p className="mt-0.5 text-[9px] leading-4 text-muted">{detail}</p>
      </div>
    </div>
  );
}

export function PayoutRunsScreen() {
  const { session } = useAuth();
  if (!isAdmin(session?.role)) {
    return (
      <Card>
        <ErrorState
          title="Payout runs are restricted"
          error={{ message: 'Only operations admins can view the proposed payout-run workspace.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  const next = samplePayoutRuns[0];
  const pastRuns = samplePayoutRuns.slice(1);

  const columns = [
    {
      key: 'run',
      label: 'Run',
      width: '27%',
      cell: (run) => (
        <div>
          <p className="text-[12px] font-semibold text-ink">{run.reference}</p>
          <p className="text-[10px] text-muted">{run.note}</p>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      width: '13%',
      cell: (run) => <span className="whitespace-nowrap text-[11px]">{formatDate(run.date)}</span>,
    },
    {
      key: 'employees',
      label: 'Employees',
      align: 'right',
      width: '12%',
      cell: (run) => <span className="bo-numeric">{formatNumber(run.employees)}</span>,
    },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      width: '17%',
      cell: (run) => <span className="bo-numeric whitespace-nowrap font-semibold text-ink">{formatMoney(run.amount)}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      width: '14%',
      cell: (run) => <StatusPill status={run.status} label={RUN_LABELS[run.status]} size="sm" />,
    },
    {
      key: 'action',
      label: '',
      align: 'right',
      width: 80,
      cell: () => (
        <Button variant="ghost" size="sm" disabled title="Payout-run orchestration is not connected.">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Payments' }]}
        title="Payout runs"
        badge={<Tag tone="info">Proposed</Tag>}
        description="Orchestrate employer funding, validation and employee settlement in one run."
        actions={
          <>
            <Button
              variant="secondary"
              icon="download"
              onClick={() =>
                exportCsv(
                  'proposed-payout-runs-sample',
                  [
                    { label: 'Reference', csvValue: (run) => run.reference },
                    { label: 'Date', csvValue: (run) => run.date },
                    { label: 'Employees', csvValue: (run) => run.employees },
                    { label: 'Clients', csvValue: (run) => run.clients },
                    { label: 'Amount', csvValue: (run) => run.amount },
                    { label: 'Funded %', csvValue: (run) => run.fundedPct },
                    { label: 'Status', csvValue: (run) => run.status },
                  ],
                  samplePayoutRuns
                )
              }
            >
              Export sample
            </Button>
            <Button variant="primary" icon="plus" disabled title="No payout-run creation API exists.">
              New payout run
            </Button>
          </>
        }
      />

      <SupportNotice capability={CAPABILITIES.payoutRuns} />

      <div className="overflow-hidden rounded-lg bg-sidebar p-5 text-sidebar-text sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(220px,0.8fr)] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Icon name="calendar" size={14} className="text-sidebar-faint" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-sidebar-faint">Next payout run</p>
              <StatusPill status={next.status} label="Scheduled" size="sm" />
            </div>
            <p className="mt-2 text-[12px] text-sidebar-muted">{formatDate(next.date)} · 09:00</p>
            <p className="bo-numeric mt-1 text-[30px] font-bold tracking-[-0.03em] text-white">{formatMoney(next.amount)}</p>
            <p className="mt-1 text-[11px] text-sidebar-muted">
              {formatNumber(next.employees)} employees · {formatNumber(next.clients)} clients
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-sidebar-muted">Funding progress</span>
              <span className="font-semibold text-sidebar-text">{next.fundedPct}%</span>
            </div>
            <ProgressBar value={next.fundedPct} className="mt-2 bg-white/10" />
            <p className="mt-2 text-[10px] text-sidebar-faint">{next.note}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[9px] text-sidebar-muted">
              <Tag tone="neutral">Funding</Tag>
              <Icon name="chevronRight" size={10} />
              <Tag tone="neutral">Validation</Tag>
              <Icon name="chevronRight" size={10} />
              <Tag tone="neutral">Settlement</Tag>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="primary" fullWidth trailingIcon="arrowRight" disabled title="No payout-run API is available.">
              Review payout run
            </Button>
            <Button variant="outlineOnDark" fullWidth icon="grid" disabled title="No run workspace is available.">
              View run workspace
            </Button>
            <p className="text-center text-[9px] leading-4 text-sidebar-faint">Proposed orchestration surface</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="play" size={15} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Run history</h2>
              <span className="text-[10px] text-muted">Last {pastRuns.length} runs · sample</span>
            </div>
            <Tag tone="warning">Sample data</Tag>
          </div>
          <DataTable
            columns={columns}
            rows={pastRuns}
            minWidth={800}
            emptyTitle="No payout runs"
            emptyDescription="There is no live payout-run history in the current API."
            footer={
              <p className="text-[10px] leading-5 text-muted">
                These runs are deterministic sample data. No run can be created, retried or approved from this screen.
              </p>
            }
          />
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-[14px] font-semibold text-ink">Run checklist</h2>
              <Tag tone="neutral">{formatDate(next.date)}</Tag>
            </div>
            <div className="mt-3 rounded-sm bg-success-soft px-3 py-2.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-medium text-success">Funded</span>
                <span className="font-semibold text-success">{next.fundedPct}%</span>
              </div>
              <ProgressBar value={next.fundedPct} tone="success" className="mt-2" />
              <p className="mt-1.5 text-[9px] text-muted">Sample checklist — not based on live funding records.</p>
            </div>
            <div className="mt-2">
              <ChecklistRow icon="clock" title="Funding complete" detail="Due 27 Oct · 16:00" />
              <ChecklistRow icon="users" title="Validate destinations" detail="Payout accounts checked during a live run" />
              <ChecklistRow icon="shieldCheck" title="Super-admin approval" detail="Approval flow is not implemented" />
              <ChecklistRow icon="send" title="Settlement" detail="28 Oct · 09:00" />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Icon name="info" size={15} className="text-warning" />
              <h2 className="text-[13px] font-semibold text-ink">New API required</h2>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted">
              The current payments page only reproduces the invoice list. A payout-run object, funding webhook and
              approval trail must exist before this workflow can move money.
            </p>
            <Button variant="secondary" fullWidth disabled className="mt-4" title="Run workspace is not connected.">
              Open run workspace
            </Button>
            <p className="mt-2 text-center text-[9px] text-muted">Static review only.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
