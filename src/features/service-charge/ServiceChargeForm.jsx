'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/backoffice/Toast';
import { Button, Field, InlineNotice, TextInput } from '@/components/backoffice';
import { useUpdateServiceChargeMutation } from '@/lib/api/queries';
import { formatMoney } from '@/lib/format';
import { FormActions, FormCard, FormError, FormGrid, FormSection } from '@/features/shared/FormLayout';

function valuesFromConfig(config) {
  return {
    employeeRate: String(config.employeeRate ?? 5),
    availableWagePercent: String(config.availableWagePercent ?? 50),
    monthlyFixedFee: String(config.monthlyFixedFee ?? 0),
  };
}

function validate(values) {
  const errors = {};
  const employeeRate = Number(values.employeeRate);
  const availableWagePercent = Number(values.availableWagePercent);
  const monthlyFixedFee = Number(values.monthlyFixedFee);

  if (!Number.isFinite(employeeRate) || employeeRate < 0 || employeeRate > 100) {
    errors.employeeRate = 'Enter a percentage between 0 and 100.';
  }
  if (!Number.isFinite(availableWagePercent) || availableWagePercent < 0 || availableWagePercent > 100) {
    errors.availableWagePercent = 'Enter a percentage between 0 and 100.';
  }
  if (Number.isFinite(employeeRate) && Number.isFinite(availableWagePercent) && employeeRate > availableWagePercent) {
    errors.employeeRate = 'The employee rate cannot exceed the available wage percentage.';
  }
  if (!Number.isFinite(monthlyFixedFee) || monthlyFixedFee < 0) {
    errors.monthlyFixedFee = 'Enter a monthly fee of zero or greater.';
  }

  return errors;
}

export function ServiceChargeForm({ clientId, config }) {
  const [values, setValues] = useState(valuesFromConfig(config));
  const [errors, setErrors] = useState({});
  const mutation = useUpdateServiceChargeMutation(clientId);
  const { push } = useToast();
  const { employeeRate, availableWagePercent, monthlyFixedFee } = config;

  useEffect(() => {
    setValues({
      employeeRate: String(employeeRate ?? 5),
      availableWagePercent: String(availableWagePercent ?? 50),
      monthlyFixedFee: String(monthlyFixedFee ?? 0),
    });
  }, [employeeRate, availableWagePercent, monthlyFixedFee]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    mutation.mutate(
      {
        clientId,
        employeeRate: Number(values.employeeRate),
        availableWagePercent: Number(values.availableWagePercent),
        monthlyFixedFee: Number(values.monthlyFixedFee),
      },
      {
        onSuccess: () => {
          push({
            title: 'Service charge saved',
            message: 'The new policy applies to the next daily allocation and the next generated invoice.',
          });
        },
      }
    );
  };

  const availablePercent = Number(values.availableWagePercent || 0);
  const employeeRatePercent = Number(values.employeeRate || 0);
  const monthlyFee = Number(values.monthlyFixedFee || 0);
  const allocation = availablePercent * 10;
  const employeeCharge = employeeRatePercent * 10;
  const netCredited = Math.max(0, allocation - employeeCharge);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormCard>
        <FormSection
          first
          title="Service charge configuration"
          description="Both the employee percentage and the company monthly fee can be active at the same time. Set either charge to 0 to disable it."
        >
          <FormGrid>
            <Field
              label="Available wage (%)"
              htmlFor="availableWagePercent"
              required
              error={errors.availableWagePercent}
              hint="Percentage of the daily earned wage (base salary ÷ 21) made available to employees."
            >
              <TextInput
                id="availableWagePercent"
                name="availableWagePercent"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="0.01"
                value={values.availableWagePercent}
                onChange={setField('availableWagePercent')}
                error={errors.availableWagePercent}
              />
            </Field>
            <Field
              label="Employee service charge (%)"
              htmlFor="employeeRate"
              required
              error={errors.employeeRate}
              hint="Deducted from the daily earned wage before the allocation reaches the employee wallet. Set to 0 to disable. Must not exceed the available wage percentage."
            >
              <TextInput
                id="employeeRate"
                name="employeeRate"
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="0.01"
                value={values.employeeRate}
                onChange={setField('employeeRate')}
                error={errors.employeeRate}
              />
            </Field>
            <Field
              label="Company monthly fee (XAF)"
              htmlFor="monthlyFixedFee"
              required
              error={errors.monthlyFixedFee}
              hint="Fixed amount billed per eligible employee (non-null base salary) on the monthly invoice. Set to 0 to disable."
            >
              <TextInput
                id="monthlyFixedFee"
                name="monthlyFixedFee"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={values.monthlyFixedFee}
                onChange={setField('monthlyFixedFee')}
                error={errors.monthlyFixedFee}
              />
            </Field>
          </FormGrid>

          <div className="mt-4 rounded-sm border border-border bg-surface-raised px-4 py-3 text-[11px] leading-5 text-muted">
            <p className="font-semibold text-ink-soft">Example</p>
            <p className="mt-1">
              A daily earned wage of XAF 1,000 with {availablePercent}% available creates an XAF{' '}
              {allocation.toFixed(2)} allocation. The employee service charge of {employeeRatePercent}% is XAF{' '}
              {employeeCharge.toFixed(2)}, leaving XAF {netCredited.toFixed(2)} credited. The company is billed{' '}
              {formatMoney(monthlyFee)} per eligible employee each month. Set either charge to 0 to disable it.
            </p>
          </div>

          <InlineNotice tone="info" className="mt-4">
            Changes apply to the next daily allocation and the next generated invoice. Historical transactions and invoices
            are never recalculated.
          </InlineNotice>
        </FormSection>

        <FormActions note="Service charge settings are audited. Only AirliPay operations admins can change them.">
          <Button type="submit" loading={mutation.isPending} icon="check">
            Save configuration
          </Button>
        </FormActions>
      </FormCard>
      <FormError error={mutation.error} />
    </form>
  );
}
