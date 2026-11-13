'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth, roleLabel } from '@/components/auth/AuthProvider';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  Avatar,
  Button,
  Card,
  Divider,
  ErrorState,
  Icon,
  KeyValue,
  PageHeader,
  PageLoading,
  SegmentedControl,
  StatusPill,
  statusLabel,
  Tag,
} from '@/components/backoffice';
import { useProfileQuery } from '@/lib/api/queries';
import {
  dateOrDash,
  normalizeAdmin,
  normalizeClient,
  normalizeUser,
  personActivated,
  personEmail,
  personJoined,
  personName,
  personPhone,
  personStatus,
} from '@/lib/data';
import { isAdmin } from '@/lib/permissions';

function normalizeProfile(role) {
  return (person) => {
    if (!person) return null;
    if (role === 'ADMIN') return normalizeAdmin(person);
    if (role === 'CLIENT') return normalizeClient(person);
    return normalizeUser(person);
  };
}

export function ProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { session, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const role = session?.role;
  const query = useProfileQuery(role, session?.userId);

  if (query.isLoading) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'My profile' }]}
          title="My profile"
        />
        <div className="mt-6"><PageLoading rows={3} /></div>
      </>
    );
  }

  if (query.error) {
    return (
      <>
        <PageHeader
          breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'My profile' }]}
          title="My profile"
        />
        <Card className="mt-6">
          <ErrorState
            title="Profile unavailable"
            error={query.error}
            action={<Button variant="secondary" icon="refresh" size="sm" onClick={() => query.refetch()}>Try again</Button>}
          />
        </Card>
      </>
    );
  }

  const person = normalizeProfile(role)(query.data);
  if (!person) {
    return (
      <Card>
        <ErrorState title="Profile not found" error={{ message: 'The current session does not contain a profile record.' }} />
      </Card>
    );
  }

  const name = person.displayName || personName(query.data);
  const status = person.status || personStatus(query.data);
  const email = person.email || personEmail(query.data);
  const phone = person.phone || personPhone(query.data);
  const joined = person.joined || personJoined(query.data);
  const activated = person.activated || personActivated(query.data);

  const handleSignOut = () => {
    signOut();
    queryClient.clear();
    router.replace('/login');
  };

  return (
    <div className="space-y-5">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Operations' }, { label: 'My profile' }]}
        title="My profile"
        description="Your AirliPay identity, contact details and session."
        actions={
          <Button variant="secondary" icon="logout" onClick={handleSignOut}>
            Sign out
          </Button>
        }
      />

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Avatar name={name} size={62} tone="brand" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-ink">{name}</h2>
            <StatusPill status={status} />
          </div>
          <p className="mt-1 text-[12px] text-muted">
            {roleLabel(role)} · {email}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Tag tone="brand" icon="shieldCheck">{roleLabel(role)}</Tag>
            <Tag tone={session?.remember ? 'success' : 'neutral'} icon="lock">
              {session?.remember ? 'Remembered device' : 'Session only'}
            </Tag>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 ltr">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Member since</p>
            <p className="mt-1 text-[12px] font-medium text-ink">{dateOrDash(joined)}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Activated</p>
            <p className="mt-1 text-[12px] font-medium text-ink">{dateOrDash(activated)}</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Account</p>
            <p className="mt-1 text-[12px] font-medium text-ink">{status ? status.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : '—'}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(320px,1fr)]">
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Icon name="profile" size={16} className="text-muted" />
            <h2 className="text-[15px] font-semibold text-ink">Account details</h2>
            <span className="text-[11px] text-muted">Shared with your organisation</span>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Full name</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{name}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Email address</p>
              <p className="mt-1 break-all text-[13px] font-medium text-ink">{email}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Primary phone</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{phone || '—'}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">City</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{person.city || '—'}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Region</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{person.region || '—'}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Street address</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{person.street || '—'}</p>
            </div>
            {!isAdmin(role) && person.employer ? (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Employer</p>
                <p className="mt-1 text-[13px] font-medium text-ink">{person.employer}</p>
              </div>
            ) : null}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Role</p>
              <p className="mt-1 text-[13px] font-medium text-ink">{roleLabel(role)}</p>
            </div>
          </div>

          <Divider className="my-5" />
          <div className="flex items-center gap-2">
            <Icon name="sliders" size={16} className="text-muted" />
            <h2 className="text-[15px] font-semibold text-ink">Preferences</h2>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[12px] font-medium text-ink">Appearance</p>
              <p className="mt-0.5 text-[11px] text-muted">Use the console in light or dark mode.</p>
              <SegmentedControl
                className="mt-2.5"
                value={theme}
                onChange={setTheme}
                items={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                ]}
                ariaLabel="Theme preference"
              />
            </div>
            <div>
              <p className="text-[12px] font-medium text-ink">Language</p>
              <p className="mt-0.5 text-[11px] text-muted">English is the operational default. French UI strings are not yet available in the admin console.</p>
            </div>
          </div>

          <Divider className="my-5" />
          <div className="flex items-start gap-2 text-[11px] leading-5 text-muted">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            <p>
              Security preferences such as password reset, 2FA and session history are not exposed by the current admin API.
            </p>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Icon name="shieldCheck" size={16} className="text-muted" />
              <h2 className="text-[15px] font-semibold text-ink">Session</h2>
            </div>
            <div className="mt-3 space-y-1">
              <KeyValue label="Role" value={roleLabel(role)} />
              <KeyValue label="Account status" value={status ? statusLabel(status) : '—'} />
              <KeyValue label="Storage" value={session?.remember ? 'Remembered on this device' : 'This browser session'} />
            </div>
            <div className="mt-4 rounded-sm bg-surface-sunken p-3 text-[10px] leading-5 text-muted">
              Signing out clears local credentials and cached API data from this console.
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Icon name="help" size={16} className="text-muted" />
              <h2 className="text-[15px] font-semibold text-ink">Help & support</h2>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-muted">
              For account access, role changes or payroll questions, contact the AirliPay operations team.
            </p>
            <Button href="mailto:support@airlipay.cm" variant="secondary" icon="mail" className="mt-4" fullWidth>
              support@airlipay.cm
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
