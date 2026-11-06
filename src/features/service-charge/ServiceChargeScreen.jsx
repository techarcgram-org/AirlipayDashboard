'use client';

import { Button, Card, ErrorState, InlineNotice, PageHeader, PageLoading } from '@/components/backoffice';
import { useAuth } from '@/components/auth/AuthProvider';
import { useMyServiceChargeQuery } from '@/lib/api/queries';
import { normalizeServiceChargeConfig } from '@/lib/data';
import { isClient } from '@/lib/permissions';
import { ServiceChargeSummary } from './ServiceChargeSummary';

export function ServiceChargeScreen() {
  const { session } = useAuth();
  const query = useMyServiceChargeQuery({ enabled: isClient(session?.role) });
  const config = normalizeServiceChargeConfig(query.data);

  if (!isClient(session?.role)) {
    return (
      <Card>
        <ErrorState
          title="Service charge is available to company accounts"
          error={{ message: 'Admins can review and edit each company policy from the client profile.' }}
          action={<Button href="/dashboard/clients" size="sm">View clients</Button>}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        breadcrumbs={[{ label: 'AirliPay' }, { label: 'Account' }, { label: 'Service charge' }]}
        title="Service charge"
        description="Review the AirliPay service charge policy that applies to your employees."
      />

      {query.isLoading ? (
        <PageLoading />
      ) : query.error ? (
        <Card>
          <ErrorState
            title="Service charge could not be loaded"
            error={query.error}
            action={
              <Button size="sm" variant="secondary" icon="refresh" onClick={() => query.refetch()}>
                Try again
              </Button>
            }
          />
        </Card>
      ) : (
        <>
          <ServiceChargeSummary config={config} />
          <InlineNotice tone="info" title="Managed by AirliPay operations">
            This policy is read-only. Contact support if you need to change the payment mode, service charge rate, or
            available wage percentage.
          </InlineNotice>
        </>
      )}
    </div>
  );
}
