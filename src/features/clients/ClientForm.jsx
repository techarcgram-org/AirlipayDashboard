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
} from '@/components/backoffice';
import {
  useClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} from '@/lib/api/queries';
import { isAdmin } from '@/lib/permissions';
import { toInputDate } from '@/lib/format';
import { CancelLink, FormActions, FormCard, FormError, FormGrid, FormSection } from '@/features/shared/FormLayout';
import { BANK_OPTIONS, REGION_OPTIONS } from '@/features/shared/options';

const EMPTY_VALUES = {
  name: '',
  email: '',
  primaryPhone: '',
  secondaryPhone: '',
  street: '',
  city: '',
  region: '',
  taxId: '',
  bank: '',
  bankAccountNumber: '',
  nextPaymentDate: '',
  clientCommision: '',
  industry: '',
  password: '',
  confirmPassword: '',
};

function valuesFromClient(client) {
  return {
    name: client?.name || '',
    email: client?.accounts?.email || '',
    primaryPhone: client?.addresses?.primary_phone_number || '',
    secondaryPhone: client?.addresses?.secondery_phone_number || '',
    street: client?.addresses?.street || '',
    city: client?.addresses?.city || '',
    region: client?.addresses?.region || '',
    taxId: client?.tax_id || '',
    bank: client?.bank || '',
    bankAccountNumber: client?.bankAccountNumber || client?.bank_account_number || '',
    nextPaymentDate: toInputDate(client?.next_payment_date),
    clientCommision: client?.client_commision ?? client?.client_commission ?? '',
    industry: client?.industry || '',
  };
}

function validate(values, mode) {
  const errors = {};
  if (!String(values.name || '').trim()) errors.name = 'Client name is required.';
  if (!String(values.email || '').trim()) {
    errors.email = 'Account email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email).trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!String(values.primaryPhone || '').trim()) errors.primaryPhone = 'Primary phone is required.';
  if (!String(values.street || '').trim()) errors.street = 'Street is required.';
  if (!String(values.city || '').trim()) errors.city = 'City is required.';
  if (!values.region) errors.region = 'Select a region.';
  if (!String(values.industry || '').trim()) errors.industry = 'Industry is required.';
  if (!String(values.clientCommision || '').trim()) errors.clientCommision = 'Client commission is required.';
  if (!String(values.bank || '').trim()) errors.bank = 'Select a settlement bank.';
  if (!String(values.bankAccountNumber || '').trim()) errors.bankAccountNumber = 'Bank account number is required.';
  if (mode === 'create') {
    if (!values.password) errors.password = 'A temporary password is required.';
    if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

function OnboardingPanel() {
  const steps = [
    { title: 'Company details', detail: 'Identity, tax ID and commercial terms.', active: true },
    { title: 'Funding account', detail: 'The employer funds payouts before a run.', active: false },
    { title: 'Secure access', detail: 'The primary contact signs in with the temporary password you share.', active: false },
  ];
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Icon name="sparkle" size={16} className="text-cobalt-text" />
          <h2 className="text-[14px] font-semibold text-ink">Onboarding path</h2>
        </div>
        <div className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  step.active ? 'bg-cobalt text-white' : 'bg-surface-sunken text-muted'
                }`}
              >
                {index + 1}
              </span>
              <div>
                <p className="text-[12px] font-semibold text-ink">{step.title}</p>
                <p className="mt-0.5 text-[10px] leading-5 text-muted">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <InlineNotice tone="info" title="Temporary password">
            This build creates the client account with a password because no invitation or reset endpoint exists. Share
            it securely and ask the client to change it when those controls become available.
          </InlineNotice>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Icon name="wallet" size={16} className="text-muted" />
          <h2 className="text-[13px] font-semibold text-ink">Funding</h2>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-muted">
          Employer funding is required before payouts can be released. Funding balances and account verification are
          not exposed by the current admin API.
        </p>
      </Card>
    </div>
  );
}

export function ClientForm({ mode }) {
  const { id } = useParams();
  const router = useRouter();
  const { session } = useAuth();
  const role = session?.role;
  const clientQuery = useClientQuery(id, { enabled: mode === 'edit' && isAdmin(role) });
  const createMutation = useCreateClientMutation();
  const updateMutation = useUpdateClientMutation();
  const { push } = useToast();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [initialized, setInitialized] = useState(mode !== 'edit');

  useEffect(() => {
    if (mode === 'edit' && !initialized && clientQuery.data) {
      setValues({ ...EMPTY_VALUES, ...valuesFromClient(clientQuery.data) });
      setInitialized(true);
    }
  }, [clientQuery.data, initialized, mode]);

  if (!isAdmin(role)) {
    return (
      <Card>
        <ErrorState
          title="Client management is restricted"
          error={{ message: 'Only operations admins can create or edit client accounts.' }}
          action={<Button href="/dashboard" size="sm">Back to overview</Button>}
        />
      </Card>
    );
  }

  if (mode === 'edit' && (clientQuery.isLoading || !initialized)) {
    return <PageLoading />;
  }

  if (mode === 'edit' && clientQuery.error) {
    return (
      <Card>
        <ErrorState
          title="Client could not be loaded"
          error={clientQuery.error}
          action={<Button size="sm" variant="secondary" icon="refresh" onClick={() => clientQuery.refetch()}>Try again</Button>}
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

    let payload;
    if (mode === 'edit') {
      payload = {
        id: Number(id),
        name: values.name,
        industry: values.industry,
        taxId: values.taxId,
        clientCommision: values.clientCommision,
        earningReportStatus: clientQuery.data?.earningReportStatus,
        nextPaymentDate: values.nextPaymentDate,
        bank: values.bank,
        bankAccountNumber: values.bankAccountNumber,
        email: values.email,
        primaryPhone: values.primaryPhone,
        city: values.city,
        region: values.region,
        street: values.street,
        mobileMoneyNumber: clientQuery.data?.mobile_money_number,
        secondaryPhone: values.secondaryPhone,
      };
    } else {
      payload = {
        name: values.name,
        street: values.street,
        primaryPhone: values.primaryPhone,
        city: values.city,
        taxId: values.taxId,
        bankAccountNumber: values.bankAccountNumber,
        nextPaymentDate: values.nextPaymentDate,
        email: values.email,
        secondaryPhone: values.secondaryPhone,
        region: values.region,
        bank: values.bank,
        clientCommision: values.clientCommision,
        industry: values.industry,
        password: values.password,
        confirmPassword: values.confirmPassword,
        file: null,
      };
    }

    try {
      await mutation.mutateAsync(payload);
      push({
        title: mode === 'edit' ? 'Client updated' : 'Client created',
        message:
          mode === 'edit'
            ? `${values.name} was saved.`
            : `${values.name} is ready. Share the temporary password securely.`,
      });
      router.push(mode === 'edit' ? `/dashboard/clients/${id}` : '/dashboard/clients');
    } catch {
      // Mutation state renders the API error below the header.
    }
  };

  const heading = mode === 'edit' ? 'Edit client' : 'New client';
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <PageHeader
          breadcrumbs={[
            { label: 'AirliPay' },
            { label: 'Operations' },
            { label: 'Clients', href: '/dashboard/clients' },
            { label: heading },
          ]}
          title={heading}
          description={
            mode === 'edit'
              ? 'Update the employer record, settlement details and commercial terms.'
              : 'Onboard an employer and connect the account that funds payroll.'
          }
          actions={
            <>
              <CancelLink href={mode === 'edit' ? `/dashboard/clients/${id}` : '/dashboard/clients'} />
              <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'plus'}>
                {mode === 'edit' ? 'Save changes' : 'Create client'}
              </Button>
            </>
          }
        />

        <FormError error={mutation.error} />

        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <FormCard>
            <FormSection first title="Company" description="Legal and commercial details">
              <FormGrid>
                <Field label="Client name" htmlFor="name" required error={errors.name}>
                  <TextInput
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={setField('name')}
                    placeholder="e.g. Penda Logistics"
                    error={errors.name}
                    icon="clients"
                  />
                </Field>
                <Field label="Industry" htmlFor="industry" required error={errors.industry}>
                  <TextInput
                    id="industry"
                    name="industry"
                    value={values.industry}
                    onChange={setField('industry')}
                    placeholder="e.g. Freight & logistics"
                    error={errors.industry}
                  />
                </Field>
                <Field label="Tax ID" htmlFor="taxId" error={errors.taxId} hint="Shown on invoices when available.">
                  <TextInput
                    id="taxId"
                    name="taxId"
                    value={values.taxId}
                    onChange={setField('taxId')}
                    placeholder="e.g. M0801224587"
                    error={errors.taxId}
                  />
                </Field>
                <Field label="Client commission (%)" htmlFor="clientCommision" required error={errors.clientCommision}>
                  <TextInput
                    id="clientCommision"
                    name="clientCommision"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={values.clientCommision}
                    onChange={setField('clientCommision')}
                    placeholder="e.g. 2.5"
                    error={errors.clientCommision}
                  />
                </Field>
              </FormGrid>
            </FormSection>

            <FormSection title="Primary contact & address" description="Used for billing and account recovery">
              <FormGrid>
                <Field label="Account email" htmlFor="email" required error={errors.email}>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={setField('email')}
                    placeholder="finance@company.cm"
                    error={errors.email}
                  />
                </Field>
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
                    value={values.city}
                    onChange={setField('city')}
                    placeholder="City"
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

            <FormSection title="Funding & access" description="The employer funds payouts before each run">
              <FormGrid>
                <Field label="Next payment date" htmlFor="nextPaymentDate" error={errors.nextPaymentDate}>
                  <TextInput
                    id="nextPaymentDate"
                    name="nextPaymentDate"
                    type="date"
                    value={values.nextPaymentDate}
                    onChange={setField('nextPaymentDate')}
                    error={errors.nextPaymentDate}
                  />
                </Field>
                <Field label="Settlement bank" htmlFor="bank" required error={errors.bank}>
                  <SelectField
                    id="bank"
                    name="bank"
                    value={values.bank}
                    onChange={setField('bank')}
                    options={BANK_OPTIONS}
                    placeholder="Select bank account"
                    error={errors.bank}
                  />
                </Field>
                <Field label="Bank account number" htmlFor="bankAccountNumber" required error={errors.bankAccountNumber}>
                  <TextInput
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={values.bankAccountNumber}
                    onChange={setField('bankAccountNumber')}
                    placeholder="Account number"
                    error={errors.bankAccountNumber}
                  />
                </Field>
              </FormGrid>
            </FormSection>

            {mode === 'create' ? (
              <FormSection title="Temporary password" description="The API has no invitation endpoint, so an initial password is required.">
                <FormGrid>
                  <Field label="Temporary password" htmlFor="password" required error={errors.password}>
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
                  <Field label="Confirm password" htmlFor="confirmPassword" required error={errors.confirmPassword}>
                    <TextInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={values.confirmPassword}
                      onChange={setField('confirmPassword')}
                      error={errors.confirmPassword}
                    />
                  </Field>
                </FormGrid>
                <p className="mt-3 text-[10px] leading-5 text-muted">
                  Share this password through a secure channel. An invitation email is not sent automatically.
                </p>
              </FormSection>
            ) : null}

            <FormActions note="Only existing client API fields are submitted. Funding accounts, invitations and granular roles are not available.">
              <CancelLink href={mode === 'edit' ? `/dashboard/clients/${id}` : '/dashboard/clients'} />
              <Button type="submit" loading={mutation.isPending} icon={mode === 'edit' ? 'check' : 'plus'}>
                {mode === 'edit' ? 'Save changes' : 'Create client'}
              </Button>
            </FormActions>
          </FormCard>
          <OnboardingPanel />
        </div>
      </div>
    </form>
  );
}
