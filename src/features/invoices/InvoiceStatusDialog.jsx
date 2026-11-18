'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  InlineNotice,
  Modal,
  SelectControl,
  StatusPill,
} from '@/components/backoffice';
import { useToast } from '@/components/backoffice/Toast';
import { useUpdateInvoiceStatusMutation } from '@/lib/api/queries';
import { invoiceNumber, invoiceStatus } from '@/lib/data';
import { INVOICE_STATUS_OPTIONS, invoiceStatusLabel } from '@/lib/status';

export function InvoiceStatusDialog({ invoice, open, onClose }) {
  const mutation = useUpdateInvoiceStatusMutation();
  const { push } = useToast();
  const [nextStatus, setNextStatus] = useState('');
  const [reason, setReason] = useState('');

  const currentStatus = String(invoiceStatus(invoice) || '').toUpperCase();

  useEffect(() => {
    if (open) {
      setNextStatus(currentStatus === 'TREATED' ? 'NOT_TREATED' : 'TREATED');
      setReason('');
    }
  }, [currentStatus, open]);

  if (!invoice) {
    return null;
  }

  const handleUpdate = async () => {
    if (!nextStatus) return;
    try {
      await mutation.mutateAsync({
        id: invoice.id,
        status: nextStatus,
        reason: reason.trim() || undefined,
      });
      push({
        title: 'Invoice status updated',
        message: `${invoiceNumber(invoice)} is now ${invoiceStatusLabel(nextStatus)}.`,
      });
      onClose();
    } catch {
      // The API error stays visible in the dialog.
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => !mutation.isPending && onClose()}
      title="Change invoice status"
      description={`Update ${invoiceNumber(invoice)}. The change is written to the audit trail.`}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            loading={mutation.isPending}
            disabled={!nextStatus || nextStatus === currentStatus}
            icon="check"
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
              {invoiceStatusLabel(currentStatus)}
            </p>
          </div>
          <StatusPill status={currentStatus} />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-ink-soft">New status</span>
          <SelectControl
            value={nextStatus}
            onChange={(event) => setNextStatus(event.target.value)}
            options={INVOICE_STATUS_OPTIONS}
            placeholder="Select a status"
            icon="filter"
            label="New invoice status"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-ink-soft" htmlFor="list-invoice-status-reason">
            Reason (optional)
          </label>
          <textarea
            id="list-invoice-status-reason"
            name="reason"
            rows={3}
            maxLength={500}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-[12px] text-ink outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            placeholder="e.g. Payment confirmed against bank statement"
          />
        </div>

        <p className="text-[11px] leading-5 text-muted">
          Only operations admins can override invoice status. Invalid transitions are rejected by
          the API.
        </p>

        {mutation.error ? (
          <InlineNotice tone="error" title="Status could not be updated">
            {mutation.error?.response?.data?.message ||
              mutation.error?.message ||
              'The invoice API rejected the request.'}
          </InlineNotice>
        ) : null}
      </div>
    </Modal>
  );
}
