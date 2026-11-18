'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  Button,
  InlineNotice,
  Modal,
  SelectControl,
  StatusPill,
} from '@/components/backoffice';
import { useToast } from '@/components/backoffice/Toast';
import { useUpdateAdminMutation } from '@/lib/api/queries';
import { sameId } from '@/lib/permissions';
import { ADMIN_STATUS_OPTIONS, STATUS_LABELS } from '@/lib/status';

export function AdminStatusDialog({ admin, open, onClose }) {
  const { session } = useAuth();
  const mutation = useUpdateAdminMutation();
  const { push } = useToast();
  const [nextStatus, setNextStatus] = useState('');

  const currentStatus = String(admin?.status || '').toUpperCase();
  const options = ADMIN_STATUS_OPTIONS.filter((option) => option.value !== currentStatus);
  const isSelf = sameId(admin?.id, session?.userId);

  useEffect(() => {
    if (open) {
      setNextStatus('');
    }
  }, [open, admin?.id]);

  if (!admin) {
    return null;
  }

  const handleUpdate = async () => {
    if (!nextStatus) return;
    try {
      await mutation.mutateAsync({ id: admin.id, accountStatus: nextStatus });
      push({
        title: 'Admin status updated',
        message: `${admin.displayName || 'The administrator'} is now ${
          STATUS_LABELS[nextStatus] || nextStatus
        }.`,
      });
      onClose();
    } catch {
      // The API error is rendered in the dialog.
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => !mutation.isPending && onClose()}
      title="Change admin status"
      description="Update this administrator's access. The change is audit-logged."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            loading={mutation.isPending}
            disabled={isSelf || !nextStatus || nextStatus === currentStatus}
          >
            Update status
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 rounded-sm bg-surface-sunken px-3.5 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-light">
              Current status
            </p>
            <p className="mt-1 text-[13px] font-semibold text-ink">
              {STATUS_LABELS[currentStatus] || currentStatus || 'Unknown'}
            </p>
          </div>
          <StatusPill status={currentStatus} />
        </div>

        {isSelf ? (
          <InlineNotice tone="warning" title="You cannot change your own status">
            Ask another administrator to deactivate or block your account. This prevents
            self-lockout.
          </InlineNotice>
        ) : options.length ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-ink-soft">New status</span>
            <SelectControl
              value={nextStatus}
              onChange={(event) => setNextStatus(event.target.value)}
              options={options}
              placeholder="Select a status"
              icon="filter"
              label="New admin status"
              className="w-full"
            />
          </div>
        ) : (
          <InlineNotice tone="info" title="No other status available">
            There is no other admin status to apply.
          </InlineNotice>
        )}

        <InlineNotice tone="warning" title="Sessions end immediately">
          Deactivating or blocking an administrator revokes every issued token immediately. The last
          active administrator at each access level cannot be deactivated.
        </InlineNotice>

        {mutation.error ? (
          <InlineNotice tone="error" title="Status could not be updated">
            {mutation.error?.response?.data?.message ||
              mutation.error?.message ||
              'The API rejected the status change.'}
          </InlineNotice>
        ) : null}
      </div>
    </Modal>
  );
}
