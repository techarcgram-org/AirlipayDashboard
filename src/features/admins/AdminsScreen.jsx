'use client';

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
  SelectControl,
  StatusPill,
  TablePagination,
  Tag,
} from '@/components/backoffice';
import { useAdminsQuery } from '@/lib/api/queries';
import { asArray, normalizeAdmin, personJoined } from '@/lib/data';
import { formatDate, formatNumber } from '@/lib/format';
import { isAdmin, sameId } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';

const PAGE_SIZE = 8;

function AdminCell({ admin }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar name={admin.displayName} initials={admin.initials} size={30} tone="brand" />
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-ink">{admin.displayName}</p>
        <p className="truncate text-[10px] text-muted">{admin.email}</p>
      </div>
    </div>
  );
}

export function AdminsScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const adminsQuery = useAdminsQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const admins = useMemo(() => asArray(adminsQuery.data).map(normalizeAdmin), [adminsQuery.data]);
  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return admins
      .filter((admin) => !needle || [admin.displayName, admin.email, admin.phone].some((value) => String(value || '').toLowerCase().includes(needle)))
      .filter((admin) => !status || String(admin.status || '').toUpperCase() === status)
      .sort((left, right) => new Date(personJoined(right) || 0) - new Date(personJoined(left) || 0));
  }, [admins, search, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const selected = filtered.find((admin) => sameId(admin.id, selectedId)) || rows[0] || null;
  const active = admins.filter((admin) => admin.status === 'ACTIVE').length;
  const pending = admins.filter((admin) => String(admin.status || '').toUpperCase() === 'PENDING' || String(admin.status || '').toUpperCase() === 'PENDING_CONFIRMATION').length;

  const columns = [
    { key: 'admin', label: 'Member', width: '38%', cell: (admin) => <AdminCell admin={admin} /> },
    {
      key: 'access',
      label: 'Access',
      width: '20%',
      cell: () => (
        <div>
          <p className="text-[11px] font-medium text-ink">Admin</p>
          <p className="text-[9px] text-muted">Fixed API role</p>
        </div>
      ),
    },
    { key: 'joined', label: 'Added', width: '17%', cell: (admin) => <span className="whitespace-nowrap text-[11px]">{formatDate(personJoined(admin))}</span> },
    { key: 'status', label: 'Status', width: '15%', cell: (admin) => <StatusPill status={admin.status} size="sm" /> },
  ];

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Team access is restricted"
          error={{ message: 'Only operations admins can view the admin directory.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (adminsQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Team & access' }]} title="Team & access" />
        <PageLoading />
      </div>
    );
  }

  if (adminsQuery.error && !admins.length) {
    return (
      <div className="space-y-5">
        <PageHeader breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Team & access' }]} title="Team & access" />
        <Card>
          <ErrorState
            title="The admin directory could not be loaded"
            error={adminsQuery.error}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => adminsQuery.refetch()}>Try again</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Team & access' }]}
        title="Team & access"
        description={`${formatNumber(admins.length)} administrators. The current API exposes a single admin role.`}
        actions={
          <>
            <Button variant="secondary" icon="activity" disabled title="Audit events are not available from the current API.">
              Audit log
            </Button>
            <Button href="/dashboard/admins/addAdmin" icon="plus">
              Invite admin
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Administrators" value={formatNumber(admins.length)} icon="team" hint="accounts with console access" />
        <KpiCard label="Active" value={formatNumber(active)} icon="checkCircle" hint="able to sign in" />
        <KpiCard label="Pending" value={formatNumber(pending)} icon="clock" hint="activation not complete" />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search name, email or phone"
          className="w-full sm:min-w-[240px] sm:flex-1"
          aria-label="Search administrators"
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
          label="Filter administrators by status"
          className="w-full sm:w-auto sm:min-w-[155px]"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 min-[1360px]:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="team" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Administrators</h2>
              <span className="text-[10px] text-muted">{formatNumber(filtered.length)} matched</span>
            </div>
            <Tag tone="neutral">Live records</Tag>
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            loading={adminsQuery.isFetching && !admins.length}
            selectedKey={selected?.id}
            onRowSelect={(admin) => setSelectedId(admin.id)}
            minWidth={620}
            emptyTitle={search || status ? 'No administrators match' : 'No administrators yet'}
            emptyDescription={search || status ? 'Try a different search or clear the filters.' : 'Invite an operations administrator to get started.'}
            emptyAction={
              search || status ? (
                <Button variant="secondary" size="sm" onClick={() => { setSearch(''); setStatus(''); setPage(1); }}>Clear filters</Button>
              ) : (
                <Button href="/dashboard/admins/addAdmin" size="sm" icon="plus">Invite admin</Button>
              )
            }
            footer={
              <TablePagination
                page={safePage}
                pages={pages}
                onPageChange={setPage}
                label={`${filtered.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–${(safePage - 1) * PAGE_SIZE + rows.length} of ${formatNumber(filtered.length)} admins`}
              />
            }
          />
        </Card>

        <div className="space-y-4 min-[1360px]:sticky min-[1360px]:top-20">
          {selected ? (
            <Card className="overflow-hidden">
              <div className="flex items-start gap-3 p-5">
                <Avatar name={selected.displayName} initials={selected.initials} size={44} tone="brand" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-ink">{selected.displayName}</p>
                  <p className="mt-0.5 truncate text-[10px] text-muted">{selected.email}</p>
                </div>
                <StatusPill status={selected.status} size="sm" />
              </div>
              <div className="px-5 pb-4">
                <div className="rounded-sm bg-surface-sunken px-3.5 py-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Access</p>
                  <p className="mt-1 text-[14px] font-semibold text-ink">Operations admin</p>
                  <p className="mt-0.5 text-[10px] text-muted">Fixed role · granular permissions not tracked</p>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-baseline justify-between gap-3 py-1">
                    <span className="text-[11px] text-muted">Phone</span>
                    <span className="text-right text-[11px] font-medium text-ink">{selected.phone}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 py-1">
                    <span className="text-[11px] text-muted">Location</span>
                    <span className="max-w-[62%] truncate text-right text-[11px] font-medium text-ink">
                      {[selected.city, selected.region].filter((part) => part && part !== '—').join(', ') || '—'}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 py-1">
                    <span className="text-[11px] text-muted">Added</span>
                    <span className="text-right text-[11px] font-medium text-ink">{formatDate(personJoined(selected))}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 border-t border-border p-4">
                <Button href={`/dashboard/admins/${selected.id}`} fullWidth trailingIcon="arrowRight">Open profile</Button>
                <Button href={`/dashboard/admins/${selected.id}/edit`} variant="secondary" icon="edit" fullWidth>Edit admin</Button>
              </div>
            </Card>
          ) : null}

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Icon name="lock" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Access model</h2>
              <Tag tone="warning">Provisional</Tag>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted">
              The API stores a fixed numeric admin role. Granular roles, 2FA state and audit events are not available
              and are not invented on this screen.
            </p>
            <Button variant="secondary" fullWidth disabled className="mt-4" title={CAPABILITIES.adminProfile.description}>
              Review permission matrix
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
