'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  Card,
  DataTable,
  ErrorState,
  Icon,
  KpiCard,
  PageHeader,
  SearchInput,
  SelectControl,
  TablePagination,
  Tag,
  TextInput,
} from '@/components/backoffice';
import { useAuditLogsQuery } from '@/lib/api/queries';
import { asArray } from '@/lib/data';
import { formatDateTime, formatNumber } from '@/lib/format';
import { canViewAuditLog } from '@/lib/permissions';

const PAGE_SIZE = 25;

const ENTITY_OPTIONS = [
  { value: 'employees', label: 'Employees' },
  { value: 'clients', label: 'Clients' },
  { value: 'admins', label: 'Admins' },
  { value: 'invoices', label: 'Invoices' },
  { value: 'accounts', label: 'Accounts / sessions' },
  { value: 'service_charge_configs', label: 'Service charge' },
];

function actionLabel(action) {
  const text = String(action || '').replaceAll('.', ' ').replaceAll('_', ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function describeMetadata(metadata) {
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    return '—';
  }
  const parts = [];
  if (metadata.previousStatus || metadata.nextStatus) {
    parts.push(`${metadata.previousStatus || '—'} → ${metadata.nextStatus || '—'}`);
  }
  if (metadata.reason) parts.push(`Reason: ${metadata.reason}`);
  if (Array.isArray(metadata.changedFields) && metadata.changedFields.length) {
    parts.push(`Changed: ${metadata.changedFields.join(', ')}`);
  }
  if (metadata.invoiceNumber) parts.push(`Invoice ${metadata.invoiceNumber}`);
  if (metadata.name) parts.push(String(metadata.name));
  if (metadata.email) parts.push(String(metadata.email));
  if (metadata.clientId) parts.push(`Client ${metadata.clientId}`);
  if (metadata.imported !== undefined) parts.push(`${metadata.imported} imported`);
  if (metadata.reference) parts.push(`Ref ${metadata.reference}`);

  if (!parts.length) {
    const json = JSON.stringify(metadata);
    return json.length > 140 ? `${json.slice(0, 137)}…` : json;
  }
  return parts.join(' · ');
}

function localDayBoundary(value, endOfDay) {
  if (!value) return undefined;
  const date = new Date(`${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function AuditScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const allowed = canViewAuditLog(role);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [actorEmail, setActorEmail] = useState('');
  const [entityType, setEntityType] = useState('');
  const [action, setAction] = useState('');
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      from: localDayBoundary(from, false),
      to: localDayBoundary(to, true),
      actorEmail: actorEmail.trim() || undefined,
      entityType: entityType || undefined,
      action: action.trim() || undefined,
      page,
      pageSize: PAGE_SIZE,
    }),
    [action, actorEmail, entityType, from, page, to]
  );

  const auditQuery = useAuditLogsQuery(filters, { enabled: allowed });
  const response = auditQuery.data || {};
  const entries = asArray(response.data);
  const total = Number(response.total || 0);
  const pages = Math.max(1, Number(response.pages || 1));
  const currentPage = Number(response.page || page);
  const actors = new Set(
    entries.map((entry) => entry.actor_email || entry.actor_type || 'system')
  ).size;
  const entities = new Set(entries.map((entry) => entry.entity_type).filter(Boolean)).size;
  const latest = entries[0];

  const resetFilters = () => {
    setFrom('');
    setTo('');
    setActorEmail('');
    setEntityType('');
    setAction('');
    setPage(1);
  };

  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  const columns = [
    {
      key: 'created_at',
      label: 'Time',
      width: '17%',
      cell: (entry) => (
        <div>
          <p className="whitespace-nowrap text-[11px] font-medium text-ink">
            {formatDateTime(entry.created_at)}
          </p>
          <p className="text-[9px] text-muted">
            {entry.source || 'api'}
            {entry.ip ? ` · ${entry.ip}` : ''}
          </p>
        </div>
      ),
    },
    {
      key: 'actor',
      label: 'Actor',
      width: '22%',
      cell: (entry) => (
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-ink">
            {entry.actor_email || entry.actor_type || 'System'}
          </p>
          <p className="text-[9px] text-muted">
            {entry.actor_role || entry.actor_type || '—'}
            {entry.actor_account_id ? ` · account ${entry.actor_account_id}` : ''}
          </p>
        </div>
      ),
    },
    {
      key: 'action',
      label: 'Action',
      width: '20%',
      cell: (entry) => <span className="text-[11px] font-medium text-ink">{actionLabel(entry.action)}</span>,
    },
    {
      key: 'entity',
      label: 'Entity',
      width: '15%',
      cell: (entry) => (
        <div className="min-w-0">
          <p className="truncate text-[11px]">{entry.entity_type || '—'}</p>
          <p className="truncate text-[9px] text-muted">{entry.entity_id || ''}</p>
        </div>
      ),
    },
    {
      key: 'details',
      label: 'Details',
      width: '26%',
      cell: (entry) => (
        <span className="block text-[10px] leading-5 text-muted">
          {describeMetadata(entry.metadata)}
        </span>
      ),
    },
  ];

  if (!allowed) {
    return (
      <Card>
        <ErrorState
          title="The audit log is restricted"
          error={{ message: 'Only operations admins can view account audit events.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Audit log' }]}
        title="Audit log"
        description="Append-only history of account, employee, admin and invoice changes. Retained for 365 days."
        actions={
          <Button
            variant="secondary"
            icon="refresh"
            onClick={() => auditQuery.refetch()}
            loading={auditQuery.isFetching}
          >
            Refresh
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Events recorded" value={formatNumber(total)} icon="activity" hint="matching the current filters" />
        <KpiCard label="Actors on page" value={formatNumber(actors)} icon="users" hint="distinct signed-in accounts" />
        <KpiCard label="Entity types" value={formatNumber(entities)} icon="transactions" hint="on this page" />
        <KpiCard
          label="Latest event"
          value={latest ? formatDateTime(latest.created_at) : '—'}
          icon="clock"
          hint={latest ? actionLabel(latest.action) : 'No events match'}
        />
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              From
            </span>
            <TextInput type="date" value={from} onChange={updateFilter(setFrom)} aria-label="From date" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              To
            </span>
            <TextInput type="date" value={to} onChange={updateFilter(setTo)} aria-label="To date" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              Actor email
            </span>
            <SearchInput
              value={actorEmail}
              onChange={updateFilter(setActorEmail)}
              placeholder="e.g. admin@airlipay"
              aria-label="Filter by actor email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              Entity
            </span>
            <SelectControl
              value={entityType}
              onChange={updateFilter(setEntityType)}
              options={ENTITY_OPTIONS}
              placeholder="All entities"
              icon="filter"
              label="Filter by entity type"
              className="w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-light">
              Action
            </span>
            <SearchInput
              value={action}
              onChange={updateFilter(setAction)}
              placeholder="e.g. status_changed"
              aria-label="Filter by action"
            />
          </div>
          <div className="flex items-end">
            <Button variant="secondary" size="sm" icon="close" onClick={resetFilters}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Icon name="activity" size={16} className="text-muted" />
            <h2 className="text-[13px] font-semibold text-ink">Events</h2>
            <span className="text-[10px] text-muted">
              {formatNumber(entries.length)} of {formatNumber(total)} in this view
            </span>
          </div>
          <Tag tone="neutral">Append-only · 365-day retention</Tag>
        </div>
        <DataTable
          columns={columns}
          rows={entries}
          loading={auditQuery.isLoading}
          error={auditQuery.error}
          minWidth={920}
          emptyTitle="No audit events match"
          emptyDescription="Adjust the filters or clear them to see more activity."
          emptyAction={
            <Button variant="secondary" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          }
          footer={
            <TablePagination
              page={currentPage}
              pages={pages}
              onPageChange={setPage}
              label={`Showing ${entries.length} of ${formatNumber(total)} events`}
            />
          }
        />
      </Card>

      <p className="text-[10px] leading-5 text-muted">
        Audit entries are written by the API and are never edited from the console. The retention
        job removes entries older than 365 days. Actor emails are resolved from the account record
        at read time.
      </p>
    </div>
  );
}
