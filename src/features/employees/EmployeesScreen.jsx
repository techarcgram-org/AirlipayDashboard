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
  InlineNotice,
  KpiCard,
  PageHeader,
  PageLoading,
  SearchInput,
  SelectControl,
  StatusPill,
  TablePagination,
  Tag,
} from '@/components/backoffice';
import { useClientsQuery, useUsersQuery } from '@/lib/api/queries';
import { asArray, normalizeUser, personJoined, payoutDestination } from '@/lib/data';
import { formatDate, formatMoney, formatNumber } from '@/lib/format';
import { canEditEmployee, isAdmin, isClient, scopeUsers } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';

const PAGE_SIZE = 8;

function employerOptions(clients) {
  return asArray(clients)
    .filter((client) => client?.id !== undefined && client?.id !== null)
    .map((client) => ({ value: String(client.id), label: client.name || `Client ${client.id}` }));
}

function matchesSearch(user, query) {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [user.displayName, user.email, user.employeeId, user.phone].some((value) =>
    String(value || '').toLowerCase().includes(needle)
  );
}

function EmployeeCell({ user }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar name={user.displayName} initials={user.initials} size={30} tone="brand" />
      <div className="min-w-0">
        <p className="truncate text-[12px] font-semibold text-ink">{user.displayName}</p>
        <p className="truncate text-[10px] text-muted">
          {user.employeeId !== '—' ? user.employeeId : user.email}
        </p>
      </div>
    </div>
  );
}

function EmployeeInspector({ user, canEdit }) {
  if (!user) {
    return (
      <Card className="flex min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-surface-sunken text-muted">
          <Icon name="users" size={18} />
        </span>
        <p className="text-[13px] font-semibold text-ink">Select an employee</p>
        <p className="max-w-[240px] text-[11px] leading-5 text-muted">
          Choose a row to preview their payroll details before opening the full profile.
        </p>
      </Card>
    );
  }
  const destination = payoutDestination(user);
  return (
    <Card className="overflow-hidden">
      <div className="flex items-start gap-3 p-5">
        <Avatar name={user.displayName} initials={user.initials} size={44} tone="brand" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-ink">{user.displayName}</p>
          <p className="mt-0.5 truncate text-[10px] text-muted">{user.employeeId !== '—' ? user.employeeId : user.email}</p>
        </div>
        <StatusPill status={user.status} size="sm" />
      </div>

      <div className="mx-5 rounded-sm bg-surface-sunken px-3.5 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Payout destination</p>
        {destination ? (
          <>
            <p className="mt-1 text-[15px] font-semibold text-ink">{destination.label}</p>
            <p className="mt-0.5 text-[10px] text-muted">Mobile money wallet</p>
          </>
        ) : (
          <>
            <p className="mt-1 text-[13px] font-semibold text-warning">Not configured</p>
            <p className="mt-0.5 text-[10px] text-muted">This employee cannot receive a payout yet.</p>
          </>
        )}
      </div>

      <div className="px-5 pb-1 pt-4">
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Employer</span>
          <span className="max-w-[62%] truncate text-right text-[11px] font-medium text-ink">{user.employer}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Base salary</span>
          <span className="bo-numeric text-right text-[11px] font-medium text-ink">
            {user.baseSalary === null || user.baseSalary === undefined ? '—' : formatMoney(user.baseSalary)}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Joined</span>
          <span className="text-right text-[11px] font-medium text-ink">{formatDate(personJoined(user))}</span>
        </div>
        <div className="flex items-baseline justify-between gap-3 py-1.5">
          <span className="text-[11px] text-muted">Location</span>
          <span className="max-w-[62%] truncate text-right text-[11px] font-medium text-ink">
            {[user.city, user.region].filter((part) => part && part !== '—').join(', ') || '—'}
          </span>
        </div>
      </div>

      {!destination ? (
        <div className="px-5 pb-4">
          <InlineNotice tone="warning" className="mt-2">
            A mobile-money destination must be added by the employee before the next run.
          </InlineNotice>
        </div>
      ) : null}

      <div className="space-y-2 border-t border-border p-4">
        <Button href={`/dashboard/users/${user.id}`} fullWidth trailingIcon="arrowRight">
          Open profile
        </Button>
        {canEdit ? (
          <Button href={`/dashboard/users/${user.id}/edit`} variant="secondary" icon="edit" fullWidth>
            Edit employee
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export function EmployeesScreen() {
  const { session } = useAuth();
  const role = session?.role;
  const userId = session?.userId;
  const usersQuery = useUsersQuery();
  const clientsQuery = useClientsQuery({ enabled: isAdmin(role) });
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [employer, setEmployer] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const users = useMemo(
    () => scopeUsers(asArray(usersQuery.data), role, userId).map(normalizeUser),
    [usersQuery.data, role, userId]
  );
  const employers = useMemo(() => employerOptions(clientsQuery.data), [clientsQuery.data]);

  const filtered = useMemo(() => {
    return users
      .filter((user) => matchesSearch(user, search))
      .filter((user) => !status || String(user.status || '').toUpperCase() === status)
      .filter((user) => !employer || String(user.clientId) === employer)
      .sort((a, b) => new Date(personJoined(b) || 0) - new Date(personJoined(a) || 0));
  }, [users, search, status, employer]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const selected = filtered.find((user) => String(user.id) === String(selectedId)) || rows[0] || null;
  const active = users.filter((user) => user.status === 'ACTIVE').length;
  const payoutReady = users.filter((user) => Boolean(payoutDestination(user))).length;
  const missingDestination = users.length - payoutReady;
  const clientsName = isClient(role) ? users[0]?.employer : null;

  const columns = [
    {
      key: 'employee',
      label: 'Employee',
      width: '32%',
      cell: (user) => <EmployeeCell user={user} />,
    },
    {
      key: 'employer',
      label: 'Employer',
      width: '24%',
      cell: (user) => <span className="block max-w-[190px] truncate text-[11px]">{user.employer}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      width: '14%',
      cell: (user) => <StatusPill status={user.status} size="sm" />,
    },
    {
      key: 'destination',
      label: 'Payout destination',
      width: '20%',
      cell: (user) => {
        const destination = payoutDestination(user);
        return destination ? (
          <span className="whitespace-nowrap text-[11px] text-ink-soft">{destination.label}</span>
        ) : (
          <Tag tone="warning">Missing</Tag>
        );
      },
    },
  ];

  if (usersQuery.isLoading) {
    return (
      <div className="space-y-5">
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Employees' }]}
          title="Employees"
        />
        <PageLoading />
      </div>
    );
  }

  if (usersQuery.error && !users.length) {
    return (
      <div className="space-y-5">
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Employees' }]}
          title="Employees"
        />
        <Card>
          <ErrorState
            title="The employee roster could not be loaded"
            error={usersQuery.error}
            action={<Button variant="secondary" size="sm" icon="refresh" onClick={() => usersQuery.refetch()}>Try again</Button>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'Employees' }]}
        title="Employees"
        description={
          isClient(role)
            ? `${formatNumber(active)} active employees in ${clientsName || 'your workforce'}.`
            : `${formatNumber(active)} active employees across ${formatNumber(employers.length)} employers.`
        }
        actions={
          <>
            <Button
              variant="secondary"
              icon="upload"
              disabled
              title={CAPABILITIES.csvImport.description}
            >
              Import
            </Button>
            <Button href="/dashboard/users/addUser" icon="plus">
              Add employee
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KpiCard label="Active employees" value={formatNumber(active)} icon="users" hint="current roster" />
        <KpiCard label="Payout-ready" value={formatNumber(payoutReady)} icon="checkCircle" hint="mobile money destination saved" />
        <KpiCard
          label="Missing destination"
          value={formatNumber(missingDestination)}
          icon="alert"
          hint={missingDestination ? 'needs employee action' : 'everyone can be paid'}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <SearchInput
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search name, employee ID or phone"
          className="w-full sm:min-w-[260px] sm:flex-1"
          aria-label="Search employees"
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
            className="w-full sm:w-auto sm:min-w-[175px]"
          />
        ) : null}
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
          label="Filter by status"
          className="w-full sm:w-auto sm:min-w-[155px]"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 min-[1360px]:grid-cols-[minmax(0,1.9fr)_minmax(280px,1fr)]">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-2">
              <Icon name="users" size={16} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Employee roster</h2>
              <span className="text-[10px] text-muted">{formatNumber(filtered.length)} matched</span>
            </div>
            <Tag tone="neutral">Live records</Tag>
          </div>
          <DataTable
            columns={columns}
            rows={rows}
            loading={usersQuery.isFetching && !users.length}
            selectedKey={selected?.id}
            onRowSelect={(user) => setSelectedId(user.id)}
            minWidth={680}
            emptyTitle={search || status || employer ? 'No employees match' : 'No employees yet'}
            emptyDescription={
              search || status || employer
                ? 'Try a different search term or clear the filters.'
                : 'Add the first employee to start building this roster.'
            }
            emptyAction={
              search || status || employer ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setStatus('');
                    setEmployer('');
                    setPage(1);
                  }}
                >
                  Clear filters
                </Button>
              ) : (
                <Button href="/dashboard/users/addUser" size="sm" icon="plus">Add employee</Button>
              )
            }
            footer={
              <TablePagination
                page={safePage}
                pages={pages}
                onPageChange={setPage}
                label={`${rows.length ? (safePage - 1) * PAGE_SIZE + 1 : 0}–${(safePage - 1) * PAGE_SIZE + rows.length} of ${formatNumber(filtered.length)} employees`}
              />
            }
          />
        </Card>
        <div className="min-[1360px]:sticky min-[1360px]:top-20">
          <EmployeeInspector user={selected} canEdit={canEditEmployee(role)} />
        </div>
      </div>
    </div>
  );
}
