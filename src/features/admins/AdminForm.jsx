'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/components/backoffice/Toast';
import {
  Button,
  Card,
  ErrorState,
  Field,
  Icon,
  InlineNotice,
  PageHeader,
  PageLoading,
  SelectField,
  TextInput,
  Tag,
} from '@/components/backoffice';
import {
  useAdminQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from '@/lib/api/queries';
import { isAdmin } from '@/lib/permissions';
import { CancelLink, FormActions, FormCard, FormError, FormGrid, FormSection } from '@/features/shared/FormLayout';
import { REGION_OPTIONS } from '@/features/shared/options';

const EMPTY_VALUES = {
  name: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  mobileMoneyNumber: '',
  street: '',
  city: '',
  region: '',
  password: '',
};

function valuesFromAdmin(admin) {
  return {
    name: admin?.name || '',
    email: admin?.accounts?.email || admin?.email || '',
    primaryPhone: admin?.addresses?.primary_phone_number || '',
    secondaryPhone: admin?.addresses?.secondery_phone_number || '',
    mobileMoneyNumber: admin?.addresses?.primary_phone_number || '',
    street: admin?.addresses?.street || '',
    city: admin?.addresses?.city || '',
    region: admin?.addresses?.region || '',
    password: '',
  };
}

function validate(values, mode) {
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = 'Full name is required.';
  if (!String(values.email || '').trim()) {
    errors.email = 'Work email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email).trim())) {
    errors.email = 'Enter a valid work email.';
  }
  if (!String(values.primaryPhone || '').trim()) errors.primaryPhone = 'Primary phone is required.';
  if (!String(values.mobileMoneyNumber || '').trim()) errors.mobileMoneyNumber = 'Mobile money number is required.';
  if (!String(values.street || '').trim()) errors.street = 'Street is required.';
  if (!String(values.city || '').trim()) errors.city = 'City is required.';
  if (!values.region) errors.region = 'Select a region.';
  if (mode === 'create' && !values.password) errors.password = 'A temporary password is required.';
  if (mode === 'edit' && values.password && values.password.length < 6) {
    errors.password = 'Use at least 6 characters.';
  }
  return errors;
}

function ProvisioningPanel({ mode }) {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Icon name="shieldCheck" size={16} className="text-cobalt-text" />
          <h2 className="text-[14px] font-semibold text-ink">{mode === 'edit' ? 'Access summary' : 'Provisioning'}</h2>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-[10px] font-semibold text-white">1</span>
            <div>
              <p className="text-[12px] font-semibold text-ink">Identity</p>
              <p className="mt-0.5 text-[10px] leading-5 text-muted">Name, contact details and recovery information.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cobalt text-[10px] font-semibold text-white">2</span>
            <div>
              <p className="text-[12px] font-semibold text-ink">Access</p>
              <p className="mt-0.5 text-[10px] leading-5 text-muted">The API assigns the single operations admin role.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-muted">
              <Icon name="lock" size={11} />
            </span>
            <div>
              <p className="text-[12px] font-semibold text-muted">Invitation email</p>
              <p className="mt-0.5 text-[10px] leading-5 text-muted">Not available. No email is sent from this form.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <InlineNotice tone="info" title="Security controls not connected">
            2FA, session history, granular roles and audit events are not exposed by the current API. This form only
            submits the existing admin fields.
          </InlineNotice>
        </div>
      </Card>
      <Card className="p-5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold text-ink">Role</p>
          <Tag tone="neutral">Admin</Tag>
        </div>
        <p className="mt-2 text-[10px] leading-5 text-muted">
          Granular roles such as super admin or finance admin are a design proposal and cannot be selected here.
        </p>
      </Card>
    </div>
  );
}

export function AdminForm({ mode }) {
  const { id } = useParams();
  const router = useRouter();
  const { session } = useAuth();
  const role = session?.role;
  const adminQuery = useAdminQuery(id, { enabled: mode === 'edit' && isAdmin(role) });
  const createMutation = useCreateAdminMutation();
  const updateMutation = useUpdateAdminMutation();
  const { push } = useToast();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [initialized, setInitialized] = useState(mode !== 'edit');

  useEffect(() => {
    if (mode === 'edit' && !initialized && adminQuery.data) {
      setValues({ ...EMPTY_VALUES, ...valuesFromAdmin(adminQuery.data) });
      setInitialized(true);
    }
  }, [adminQuery.data, initialized, mode]);

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Team management is restricted"
          error={{ message: 'Only operations admins can create or edit admin accounts.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (mode === 'edit' && (adminQuery.isLoading || !initialized)) {
    return <PageLoading />;
  }

  if (mode === 'edit' && adminQuery.error) {
    return (
      <Card>
        <ErrorState
          title="Admin could not be loaded"
          error={adminQuery.error}
          action={<Button size="sm" variant="secondary" icon="refresh" onClick={() => adminQuery.refetch()}>Try again</Button>}
        />
      </Card>
    );
  }

  const mutation = mode === 'edit' ? updateMutation : createMutation;
  const setField = (field) => (event) => {
    const next = event?.target ? event.target.value : event;
    setValues((current) => ({ ...current, [field]: next }));
    setErrors((current) => {
      if (!current[field]) return current;
      const copy = { ...current };
      delete copy[field];
      return copy;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const payload =
      mode === 'edit'
        ? {
            id: Number(id),
            name: values.name,
            email: values.email,
            primaryPhone: values.primaryPhone,
            city: values.city,
            region: values.region,
            street: values.street,
            mobileMoneyNumber: values.mobileMoneyNumber,
            secondaryPhone: values.secondaryPhone,
            ...(values.password ? { password: values.password } : {}),
          }
        : {
            name: values.name,
            email: values.email,
            city: values.city,
            street: values.street,
            region: values.region,
            primaryPhone: values.primaryPhone,
            secondaryPhone: values.secondaryPhone,
            mobileMoneyNumber: values.mobileMoneyNumber,
            password: values.password,
          };

    try {
      await mutation.mutateAsync(payload);
      push({
        title: mode === 'edit' ? 'Admin updated' : 'Admin created',
        message:
          mode === 'edit'
            ? `${values.name} was saved.`
            : `Share the temporary password with ${values.name} through a secure channel.`,
      });
      router.push(mode === 'edit' ? `/dashboard/admins/${id}` : '/dashboard/admins');
    } catch {
      // Mutation state renders the API error below the header.
    }
  };

  const heading = mode === 'edit' ? 'Edit admin' : 'Invite admin';
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <PageHeader
          breadcrumbs={[
            { label: 'AirliPay' },
            { label: 'Operations' },
            { label: 'Team & access', href: '/dashboard/admins' },
            { label: heading },
          ]}
          title={heading}
          description={
            mode === 'edit'
              ? 'Update the operations admin record. Credentials and access controls remain limited by the API.'
              : 'Create a staff member with access to the AirliPay operations console.'
          }
          actions={
            <>
              <CancelLink href={mode === 'edit' ? `/dashboard/admins/${id}` : '/dashboard/admins'} />
              <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'userPlus'}>
                {mode === 'edit' ? 'Save changes' : 'Create admin'}
              </Button>
            </>
          }
        />

        {mode === 'create' ? (
          <InlineNotice tone="warning" title="No invitation email is sent">
            The current API requires a temporary password and has no invitation endpoint. Share it securely. 2FA and
            role-specific permissions are not available.
          </InlineNotice>
        ) : null}

        <FormError error={mutation.error} />

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <FormCard>
            <FormSection first title="Identity & access" description="Who they are and the fixed access the API assigns.">
              <FormGrid>
                <Field label="Full name" htmlFor="name" required error={errors.name}>
                  <TextInput
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={setField('name')}
                    placeholder="e.g. Jude Ekema"
                    error={errors.name}
                  />
                </Field>
                <Field label="Work email" htmlFor="email" required error={errors.email}>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={setField('email')}
                    placeholder="name@airlipay.cm"
                    error={errors.email}
                  />
                </Field>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-ink-soft">Role</span>
                  <div className="flex h-[40px] items-center rounded-sm border border-border bg-surface-sunken px-3 text-[13px] text-muted">
                    Operations admin
                  </div>
                  <p className="text-[11px] text-muted">Only one admin role exists in the current API.</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-ink-soft">Authentication</span>
                  <div className="flex h-[40px] items-center rounded-sm border border-border bg-surface-sunken px-3 text-[13px] text-muted">
                    Password only
                  </div>
                  <p className="text-[11px] text-muted">2FA is not exposed by the current API.</p>
                </div>
              </FormGrid>
            </FormSection>

            <FormSection title="Contact & address" description="Used for account recovery and operational records.">
              <FormGrid>
                <Field label="Primary phone" htmlFor="primaryPhone" required error={errors.primaryPhone}>
                  <TextInput
                    id="primaryPhone"
                    name="primaryPhone"
                    type="tel"
                    value={values.primaryPhone}
                    onChange={setField('primaryPhone')}
                    placeholder="+237 6 00 00 00 00"
                    error={errors.primaryPhone}
                  />
                </Field>
                <Field label="Secondary phone" htmlFor="secondaryPhone" error={errors.secondaryPhone}>
                  <TextInput
                    id="secondaryPhone"
                    name="secondaryPhone"
                    type="tel"
                    value={values.secondaryPhone}
                    onChange={setField('secondaryPhone')}
                    placeholder="Optional"
                    error={errors.secondaryPhone}
                  />
                </Field>
                <Field label="Mobile money number" htmlFor="mobileMoneyNumber" required error={errors.mobileMoneyNumber}>
                  <TextInput
                    id="mobileMoneyNumber"
                    name="mobileMoneyNumber"
                    type="tel"
                    value={values.mobileMoneyNumber}
                    onChange={setField('mobileMoneyNumber')}
                    placeholder="6 77 30 55 12"
                    error={errors.mobileMoneyNumber}
                  />
                </Field>
                <Field label="Street" htmlFor="street" required error={errors.street}>
                  <TextInput
                    id="street"
                    name="street"
                    value={values.street}
                    onChange={setField('street')}
                    placeholder="Street address"
                    error={errors.street}
                  />
                </Field>
                <Field label="City" htmlFor="city" required error={errors.city}>
                  <TextInput
                    id="city"
                    name="city"
                    value={values.city}
                    onChange={setField('city')}
                    placeholder="Douala"
                    error={errors.city}
                  />
                </Field>
                <Field label="Region" htmlFor="region" required error={errors.region}>
                  <SelectField
                    id="region"
                    name="region"
                    value={values.region}
                    onChange={setField('region')}
                    options={REGION_OPTIONS}
                    placeholder="Select region"
                    error={errors.region}
                  />
                </Field>
              </FormGrid>
            </FormSection>

            <FormSection
              title={mode === 'edit' ? 'Credentials' : 'Temporary password'}
              description={
                mode === 'edit'
                  ? 'Leave blank to keep the current password.'
                  : 'Required because invitations are not available.'
              }
            >
              <FormGrid>
                <Field
                  label={mode === 'edit' ? 'New password (optional)' : 'Temporary password'}
                  htmlFor="password"
                  required={mode === 'create'}
                  error={errors.password}
                >
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={setField('password')}
                    error={errors.password}
                  />
                </Field>
              </FormGrid>
              <p className="mt-3 text-[10px] leading-5 text-muted">
                {mode === 'edit'
                  ? 'A replacement password is sent only if this field is filled. No reset email is generated.'
                  : 'Share this password securely. The admin should change it once self-service controls exist.'}
              </p>
            </FormSection>

            <FormActions note="Only existing admin API fields are submitted. No invitation, granular role, 2FA or audit fields are sent.">
              <CancelLink href={mode === 'edit' ? `/dashboard/admins/${id}` : '/dashboard/admins'} />
              <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'userPlus'}>
                {mode === 'edit' ? 'Save changes' : 'Create admin'}
              </Button>
            </FormActions>
          </FormCard>
          <ProvisioningPanel mode={mode} />
        </div>
      </div>
    </form>
  );
}
