'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Avatar,
  Button,
  Card,
  ErrorState,
  Icon,
  KeyValue,
  PageHeader,
  PageLoading,
  StatusPill,
  SupportNotice,
  Tag,
} from '@/components/backoffice';
import { useAdminQuery } from '@/lib/api/queries';
import { normalizeAdmin, personActivated, personJoined } from '@/lib/data';
import { formatDate } from '@/lib/format';
import { isAdmin } from '@/lib/permissions';
import { CAPABILITIES } from '@/lib/capabilities';

function UnavailableRow({ icon, title, detail }) {
  return (
    <div className="flex gap-3 border-b border-border py-3 last:border-0">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-surface-sunken text-muted">
        <Icon name={icon} size={13} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[10px] leading-5 text-muted">{detail}</p>
      </div>
      <Tag tone="neutral">Not connected</Tag>
    </div>
  );
}

export function AdminProfileScreen() {
  const { id } = useParams();
  const { session } = useAuth();
  const role = session?.role;
  const adminQuery = useAdminQuery(id, { enabled: isAdmin(role) });

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Admin profile is restricted"
          error={{ message: 'Only operations admins can open team records.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (adminQuery.isLoading) {
    return <PageLoading />;
  }

  if (adminQuery.error || !adminQuery.data) {
    return (
      <Card>
        <ErrorState
          title="Admin could not be loaded"
          error={adminQuery.error || { message: 'The admin record was not found.' }}
          action={
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" icon="refresh" onClick={() => adminQuery.refetch()}>Try again</Button>
              <Button href="/dashboard/admins" size="sm">Back to team</Button>
            </div>
          }
        />
      </Card>
    );
  }

  const admin = normalizeAdmin(adminQuery.data);

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'Team & access', href: '/dashboard/admins' }, { label: admin.displayName }]}
        title={
          <span className="flex items-center gap-3">
            <Avatar name={admin.displayName} initials={admin.initials} size={40} tone="brand" />
            <span>{admin.displayName}</span>
          </span>
        }
        badge={<StatusPill status={admin.status} />}
        meta={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
            <span>Operations admin</span>
            <span aria-hidden="true">·</span>
            <span>{admin.email}</span>
            <Tag tone="warning">Provisional profile</Tag>
          </span>
        }
        actions={
          <>
            <Button variant="secondary" icon="activity" disabled title="Audit events are not exposed by the API.">
              Audit log
            </Button>
            <Button href={`/dashboard/admins/${id}/edit`} variant="secondary" icon="edit">
              Edit admin
            </Button>
          </>
        }
      />

      <SupportNotice capability={CAPABILITIES.adminProfile} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,1fr)]">
        <Card className="p-5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Admin & contact</p>
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Email</p>
              <p className="mt-1 break-all text-[13px] font-medium text-ink">{admin.email}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Primary phone</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{admin.phone}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Joined</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{formatDate(personJoined(adminQuery.data))}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Activated</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{formatDate(personActivated(adminQuery.data))}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Location</p>
              <p className="mt-1 text-[13px] font-medium text-ink">
                {[admin.city, admin.region].filter((part) => part && part !== '—').join(', ') || '—'}
              </p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Street</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{admin.street}</p>
            </div>
          </div>

          <div className="mt-5 border-t border-border pt-4">
            <div className="flex items-center gap-2">
              <Icon name="shieldCheck" size={15} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Access</h2>
            </div>
            <div className="mt-1">
              <UnavailableRow icon="key" title="Granular roles & permissions" detail="The API stores a single admin role; finance, support and super-admin scopes are not available." />
              <UnavailableRow icon="lock" title="Two-factor authentication" detail="2FA state cannot be read or changed through the current API." />
              <UnavailableRow icon="activity" title="Admin activity & audit log" detail="There is no admin audit endpoint, so no recent activity is shown." />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Access level</p>
              <Icon name="shieldCheck" size={16} className="text-cobalt-text" />
            </div>
            <p className="mt-1 text-[24px] font-bold tracking-[-0.02em] text-ink">Admin</p>
            <p className="text-[11px] text-muted">Full operations console access</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Tag tone={admin.status === 'ACTIVE' ? 'success' : 'warning'}>{admin.status || 'Unknown'}</Tag>
              <Tag tone="neutral">Password sign-in</Tag>
            </div>
            <div className="mt-4 space-y-1 border-t border-border pt-3">
              <KeyValue label="Role source" value="Current API" />
              <KeyValue label="Permission model" value="Fixed admin" />
              <KeyValue label="Invitation" value="Not available" />
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Icon name="info" size={15} className="text-muted" />
              <h2 className="text-[13px] font-semibold text-ink">Why this is provisional</h2>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted">
              The previous admin detail route rendered no profile content. This screen uses the live admin record and
              clearly marks data the backend does not track.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
