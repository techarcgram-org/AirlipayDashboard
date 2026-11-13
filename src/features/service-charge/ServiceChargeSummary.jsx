'use client';

import { Card, InlineNotice, Tag } from '@/components/backoffice';
import { formatDate, formatMoney } from '@/lib/format';

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-border py-2.5 first:border-t-0">
      <span className="text-[11px] text-muted">{label}</span>
      <span className="bo-numeric text-right text-[12px] font-medium text-ink">{value}</span>
    </div>
  );
}

export function ServiceChargeSummary({ config, note }) {
  const employeeActive = config.employeeRate > 0;
  const companyActive = config.monthlyFixedFee > 0;
  const bothActive = employeeActive && companyActive;
  const noCharge = !employeeActive && !companyActive;

  const title = bothActive
    ? 'Employee and company charges'
    : employeeActive
      ? 'Employee service charge'
      : companyActive
        ? 'Company service charge'
        : 'No service charge';

  const description = bothActive
    ? 'The employee percentage is deducted from each daily allocation, and the company is also billed a fixed monthly amount per eligible employee.'
    : employeeActive
      ? 'A percentage of the daily earned wage is deducted from each daily allocation before it reaches the employee wallet.'
      : companyActive
        ? 'Employees receive their full available allocation. The company is invoiced a fixed monthly amount per eligible employee.'
        : 'Neither the employee percentage nor the company monthly fee is currently charged.';

  const tone = config.isDefault ? 'warning' : noCharge ? 'neutral' : 'info';

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-light">Service charge policy</p>
          <p className="mt-1 text-[15px] font-semibold text-ink">{title}</p>
          <p className="mt-1 text-[11px] leading-5 text-muted">{description}</p>
        </div>
        <Tag tone={tone}>
          {config.isDefault ? 'Default policy' : noCharge ? 'No charge' : 'Configured'}
        </Tag>
      </div>

      <div className="mt-4">
        <SummaryRow label="Available wage" value={`${config.availableWagePercent}% of daily earned wage`} />
        <SummaryRow
          label="Employee service charge"
          value={employeeActive ? `${config.employeeRate}% of daily earned wage` : 'Not charged (rate is 0%)'}
        />
        <SummaryRow
          label="Company monthly fee"
          value={companyActive ? `${formatMoney(config.monthlyFixedFee)} per employee` : 'Not charged (fee is 0)'}
        />
        <SummaryRow label="Last updated" value={config.updatedAt ? formatDate(config.updatedAt) : 'Using AirliPay defaults'} />
      </div>

      {config.isDefault ? (
        <InlineNotice tone="warning" title="Default configuration" className="mt-4">
          This company does not have a saved policy yet. AirliPay defaults are applied: 50% of the daily earned wage is
          available, with a 5% employee service charge and no company monthly fee.
        </InlineNotice>
      ) : null}

      {note ? (
        <InlineNotice tone="info" className="mt-4">
          {note}
        </InlineNotice>
      ) : null}
    </Card>
  );
}
