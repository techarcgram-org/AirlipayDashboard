'use client';

import { Button, Card, ErrorState, InlineNotice, PageLoading } from '@/components/backoffice';
import { useAuth } from '@/components/auth/AuthProvider';
import { useServiceChargeQuery } from '@/lib/api/queries';
import { normalizeServiceChargeConfig } from '@/lib/data';
import { isAdmin } from '@/lib/permissions';
import { ServiceChargeForm } from './ServiceChargeForm';
import { ServiceChargeSummary } from './ServiceChargeSummary';

export function ServiceChargePanel({ clientId }) {
  const { session } = useAuth();
  const admin = isAdmin(session?.role);
  const configQuery = useServiceChargeQuery(clientId);
  const config = normalizeServiceChargeConfig(configQuery.data);

  if (configQuery.isLoading) {
    return <PageLoading />;
  }

  if (configQuery.error) {
    return (
      <Card>
        <ErrorState
          title="Service charge configuration could not be loaded"
          error={configQuery.error}
          action={
            <Button size="sm" variant="secondary" icon="refresh" onClick={() => configQuery.refetch()}>
              Try again
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <ServiceChargeSummary
        config={config}
        note={
          admin
            ? undefined
            : 'This configuration is managed by AirliPay operations. Contact support to request a change.'
        }
      />
      {admin ? <ServiceChargeForm clientId={clientId} config={config} /> : null}
      {!admin ? (
        <InlineNotice tone="info" title="Read-only view">
          Company accounts can review the service charge policy but cannot edit it. AirliPay operations manages these
          settings for every employer.
        </InlineNotice>
      ) : null}
    </div>
  );
}
