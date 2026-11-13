'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/components/backoffice/Toast';
import {
  Button,
  Card,
  ErrorState,
  Field,
  InlineNotice,
  PageHeader,
  PageLoading,
  SelectField,
  TextInput,
  Tag,
} from '@/components/backoffice';
import {
  useClientsQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserQuery,
} from '@/lib/api/queries';
import { asArray, normalizeUser, payoutDestination } from '@/lib/data';
import { toApiDate, toInputDate } from '@/lib/format';
import { isClient } from '@/lib/permissions';
import { CancelLink, FormActions, FormCard, FormError, FormGrid, FormSection } from '@/features/shared/FormLayout';
import { REGION_OPTIONS, SEX_OPTIONS } from '@/features/shared/options';

const EMPTY_VALUES = {
  name: '',
  email: '',
  dob: '',
  sex: '',
  baseSalary: '',
  street: '',
  city: '',
  region: '',
  primaryPhone: '',
  secondaryPhone: '',
  clientId: '',
};

function initialValuesFromUser(user) {
  const normalized = normalizeUser(user);
  return {
    name: user?.name || '',
    email: normalized.email === '—' ? '' : normalized.email,
    dob: toInputDate(user?.dob || user?.date_of_birth),
    sex: user?.sex || '',
    baseSalary: user?.base_salary ?? user?.baseSalary ?? '',
    street: normalized.street === '—' ? '' : normalized.street,
    city: normalized.city === '—' ? '' : normalized.city,
    region: normalized.region === '—' ? '' : normalized.region,
    primaryPhone: normalized.phone === '—' ? '' : normalized.phone,
    secondaryPhone: normalized.secondaryPhone === '—' ? '' : normalized.secondaryPhone,
    clientId: user?.client_id ?? normalized.clientId ?? '',
  };
}

function validate(values, requiresClient) {
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = 'Full name is required.';
  if (!String(values.email || '').trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email).trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.dob) errors.dob = 'Date of birth is required.';
  if (!values.sex) errors.sex = 'Select a sex.';
  if (!String(values.baseSalary || '').trim() || Number(values.baseSalary) <= 0) {
    errors.baseSalary = 'Enter a base salary greater than zero.';
  }
  if (!String(values.primaryPhone || '').trim()) errors.primaryPhone = 'Primary phone is required.';
  if (!String(values.city || '').trim()) errors.city = 'City is required.';
  if (!String(values.street || '').trim()) errors.street = 'Street is required.';
  if (!values.region) errors.region = 'Select a region.';
  if (requiresClient && (values.clientId === '' || values.clientId === null || values.clientId === undefined)) {
    errors.clientId = 'Select an employer.';
  }
  return errors;
}

function numericId(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : value;
}

export function EmployeeForm({ mode }) {
  const { id } = useParams();
  const router = useRouter();
  const { session } = useAuth();
  const role = session?.role;
  const employeeId = mode === 'edit' ? id : null;
  const userQuery = useUserQuery(employeeId, { enabled: mode === 'edit' });
  const clientsQuery = useClientsQuery({ enabled: !isClient(role) });
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const { push } = useToast();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [initialized, setInitialized] = useState(mode !== 'edit');

  const clients = useMemo(
    () =>
      asArray(clientsQuery.data)
        .filter((client) => client?.id !== undefined && client?.id !== null)
        .map((client) => ({ value: String(client.id), label: client.name || `Client ${client.id}` })),
    [clientsQuery.data]
  );

  useEffect(() => {
    if (mode === 'edit' && !initialized && userQuery.data) {
      setValues(initialValuesFromUser(userQuery.data));
      setInitialized(true);
    }
  }, [initialized, mode, userQuery.data]);

  const mutation = mode === 'edit' ? updateMutation : createMutation;
  const user = normalizeUser(userQuery.data);
  const destination = payoutDestination(userQuery.data);

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
    const nextErrors = validate(values, !isClient(role));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const clientId = isClient(role) ? numericId(session.userId) : numericId(values.clientId);
    const payload =
      mode === 'edit'
        ? {
            id: numericId(employeeId),
            name: values.name,
            email: values.email,
            baseSalary: parseInt(values.baseSalary, 10),
            dob: toApiDate(values.dob),
            sex: values.sex,
            clientId,
            city: values.city,
            street: values.street,
            region: values.region,
            primaryPhone: values.primaryPhone ? String(values.primaryPhone) : undefined,
            secondaryPhone: values.secondaryPhone ? String(values.secondaryPhone) : undefined,
          }
        : {
            name: values.name,
            email: values.email,
            baseSalary: String(values.baseSalary),
            dob: toApiDate(values.dob),
            sex: values.sex,
            clientId,
            city: values.city,
            street: values.street,
            region: values.region,
            primaryPhone: String(values.primaryPhone),
            secondaryPhone: String(values.secondaryPhone || ''),
          };

    try {
      await mutation.mutateAsync(payload);
      push({
        title: mode === 'edit' ? 'Employee updated' : 'Employee added',
        message: mode === 'edit' ? `${values.name} was saved.` : `${values.name} is now on the payroll roster.`,
      });
      router.push(mode === 'edit' ? `/dashboard/users/${employeeId}` : '/dashboard/users');
    } catch {
      // Mutation state renders the API error below the header.
    }
  };

  if (mode === 'edit' && (userQuery.isLoading || !initialized)) {
    return <PageLoading />;
  }

  if (mode === 'edit' && userQuery.error) {
    return (
      <Card>
        <ErrorState
          title="Employee could not be loaded"
          error={userQuery.error}
          action={<Button size="sm" variant="secondary" icon="refresh" onClick={() => userQuery.refetch()}>Try again</Button>}
        />
      </Card>
    );
  }

  const heading = mode === 'edit' ? 'Edit employee' : 'Add employee';
  const employerName =
    isClient(role)
      ? session?.profile?.name || 'Your organisation'
      : clients.find((client) => String(client.value) === String(values.clientId))?.label;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <PageHeader
          breadcrumbs={[
            { label: 'AirliPay' },
            { label: 'Operations' },
            { label: 'Employees', href: '/dashboard/users' },
            { label: heading },
          ]}
          title={heading}
          description={
            mode === 'edit'
              ? `Update contact and payroll details for ${user.displayName}.`
              : 'Create an employee record. Supported payroll fields are sent to the existing users API.'
          }
          actions={
            <>
              <CancelLink href={mode === 'edit' ? `/dashboard/users/${employeeId}` : '/dashboard/users'} />
              <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'plus'}>
                {mode === 'edit' ? 'Save changes' : 'Add employee'}
              </Button>
            </>
          }
        />

        {mode === 'edit' ? (
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="neutral">Employee ID: {user.employeeId}</Tag>
            <Tag tone={destination ? 'success' : 'warning'} icon="phone">
              {destination ? destination.label : 'No payout destination'}
            </Tag>
            <span className="text-[10px] text-muted-light">
              Employee ID and payout channel are read-only because the users API cannot update them.
            </span>
          </div>
        ) : (
          <InlineNotice tone="warning" title="Temporary password">
            The API creates this employee account without an invitation email. Share a temporary password through your
            usual secure channel; password invitation and reset flows are not available yet.
          </InlineNotice>
        )}

        <FormError error={mutation.error} />

        <FormCard>
          <FormSection
            first
            title="Employment"
            description="The employer links this employee to a client payroll roster."
          >
            <FormGrid>
              {isClient(role) ? (
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-medium text-ink-soft">Employer</span>
                  <div className="flex h-[40px] items-center rounded-sm border border-border bg-surface-sunken px-3 text-[13px] text-muted">
                    {employerName || 'Your organisation'}
                  </div>
                  <p className="text-[11px] text-muted">Fixed for your client account.</p>
                </div>
              ) : (
                <Field
                  label="Employer"
                  htmlFor="clientId"
                  required
                  error={errors.clientId}
                  hint="Employees must belong to a client to be included in a payout."
                >
                  <SelectField
                    id="clientId"
                    name="clientId"
                    value={values.clientId}
                    onChange={setField('clientId')}
                    options={clients}
                    placeholder={clientsQuery.isLoading ? 'Loading employers…' : 'Select employer'}
                    disabled={clientsQuery.isLoading}
                    error={errors.clientId}
                  />
                </Field>
              )}
              <Field
                label="Base salary (XAF)"
                htmlFor="baseSalary"
                required
                error={errors.baseSalary}
                hint="Used by the existing payroll record; not a live wallet balance."
              >
                <TextInput
                  id="baseSalary"
                  name="baseSalary"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  step="1"
                  value={values.baseSalary}
                  onChange={setField('baseSalary')}
                  placeholder="240000"
                  error={errors.baseSalary}
                />
              </Field>
            </FormGrid>
          </FormSection>

          <FormSection title="Personal details" description="Must match the employee's identification and account record.">
            <FormGrid>
              <Field label="Full name" htmlFor="name" required error={errors.name}>
                <TextInput
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={setField('name')}
                  placeholder="e.g. Awa Fongang"
                  error={errors.name}
                />
              </Field>
              <Field label="Email address" htmlFor="email" required error={errors.email} hint="Used as the employee's AirliPay sign-in.">
                <TextInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={setField('email')}
                  placeholder="employee@example.com"
                  error={errors.email}
                />
              </Field>
              <Field label="Date of birth" htmlFor="dob" required error={errors.dob}>
                <TextInput
                  id="dob"
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={setField('dob')}
                  error={errors.dob}
                />
              </Field>
              <Field label="Sex" htmlFor="sex" required error={errors.sex}>
                <SelectField
                  id="sex"
                  name="sex"
                  value={values.sex}
                  onChange={setField('sex')}
                  options={SEX_OPTIONS}
                  placeholder="Select sex"
                  error={errors.sex}
                />
              </Field>
            </FormGrid>
          </FormSection>

          <FormSection title="Contact & address" description="Used for employee communication and payroll records.">
            <FormGrid>
              <Field label="Primary phone" htmlFor="primaryPhone" required error={errors.primaryPhone}>
                <TextInput
                  id="primaryPhone"
                  name="primaryPhone"
                  type="tel"
                  autoComplete="tel"
                  value={values.primaryPhone}
                  onChange={setField('primaryPhone')}
                  placeholder="6 77 42 18 90"
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
              <Field label="Street" htmlFor="street" required error={errors.street}>
                <TextInput
                  id="street"
                  name="street"
                  autoComplete="street-address"
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
                  autoComplete="address-level2"
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

          <FormActions note="Only fields supported by the current users API are submitted. Payout destinations are managed by the employee.">
            <CancelLink href={mode === 'edit' ? `/dashboard/users/${employeeId}` : '/dashboard/users'} />
            <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'plus'}>
              {mode === 'edit' ? 'Save changes' : 'Add employee'}
            </Button>
          </FormActions>
        </FormCard>
      </div>
    </form>
  );
}
