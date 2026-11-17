'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  Button,
  Field,
  Icon,
  IconButton,
  InlineNotice,
  Modal,
  SelectField,
} from '@/components/backoffice';
import { useToast } from '@/components/backoffice/Toast';
import { useBulkCreateUsersMutation } from '@/lib/api/queries';
import { isAdmin, isClient } from '@/lib/permissions';

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const TEMPLATE_COLUMNS = [
  'name',
  'email',
  'base_salary',
  'dob',
  'sex',
  'photo',
  'phone_number',
  'secondery_phone',
  'city',
  'region',
  'street',
];
const TEMPLATE_FILENAME = 'airlipay-employee-roster-template.csv';

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateFile(file) {
  if (!file) return 'Choose a CSV file.';
  if (!/\.csv$/i.test(file.name)) return 'Choose a file with a .csv extension.';
  if (!file.size) return 'The selected file is empty.';
  if (file.size > MAX_FILE_BYTES) return 'CSV files must be 5 MB or smaller.';
  return null;
}

function downloadTemplate() {
  const content = `${TEMPLATE_COLUMNS.join(',')}\n`;
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = TEMPLATE_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function RosterImportDialog({
  open,
  onClose,
  role,
  employers = [],
  employersLoading = false,
  employersError = null,
  onRetryEmployers,
  defaultEmployerId = '',
  clientName = '',
  onImported,
}) {
  const admin = isAdmin(role);
  const client = isClient(role);
  const mutation = useBulkCreateUsersMutation();
  const { push } = useToast();
  const formId = useId();
  const employerFieldId = `${formId}-employer`;
  const fileInputId = `${formId}-file`;
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [employerId, setEmployerId] = useState('');
  const [errors, setErrors] = useState({});
  const [emptyResult, setEmptyResult] = useState(false);
  const { reset: resetMutation } = mutation;

  function resetForm() {
    setFile(null);
    setEmployerId(defaultEmployerId || '');
    setErrors({});
    setEmptyResult(false);
    resetMutation();
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  useEffect(() => {
    if (!open) return;
    setFile(null);
    setEmployerId(defaultEmployerId || '');
    setErrors({});
    setEmptyResult(false);
    resetMutation();
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [open, defaultEmployerId, resetMutation]);

  function closeDialog() {
    resetForm();
    onClose?.();
  }

  function handleClose() {
    if (mutation.isPending) return;
    closeDialog();
  }

  function handleFileChange(event) {
    const selected = event.target.files?.[0] || null;
    if (!selected) return;

    const message = validateFile(selected);
    if (message) {
      setFile(null);
      setErrors((previous) => ({ ...previous, file: message }));
      event.target.value = '';
      return;
    }

    setFile(selected);
    setErrors((previous) => ({ ...previous, file: undefined }));
    setEmptyResult(false);
    resetMutation();
  }

  function clearFile() {
    setFile(null);
    setErrors((previous) => ({ ...previous, file: undefined }));
    resetMutation();
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    const fileError = validateFile(file);
    if (fileError) nextErrors.file = fileError;
    if (admin && !employerId) nextErrors.employerId = 'Select an employer.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setEmptyResult(false);
    try {
      const response = await mutation.mutateAsync({
        file,
        clientId: admin ? employerId : undefined,
      });
      const created = Array.isArray(response?.data) ? response.data : [];

      if (!created.length) {
        setEmptyResult(true);
        return;
      }

      const employerName = admin
        ? employers.find((option) => String(option.value) === String(employerId))?.label
        : clientName;

      push({
        title:
          created.length === 1
            ? '1 employee imported'
            : `${created.length} employees imported`,
        message: `Added to ${employerName || 'the employer'}. Rows the server could not validate were skipped.`,
        tone: 'success',
      });
      onImported?.(created);
      closeDialog();
    } catch {
      // The mutation error is rendered inline so the user can retry.
    }
  }

  const apiMessage = (() => {
    const error = mutation.error;
    if (!error) return null;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'The roster could not be imported. Try again.';
    return Array.isArray(message) ? message.join(' ') : message;
  })();

  const submitDisabled =
    !file || (admin && (employersLoading || employers.length === 0));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Import employee roster"
      description="Upload a CSV roster to create employee accounts. Valid rows become pending employees and receive an invitation; invalid or duplicate rows are skipped."
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            form={formId}
            icon="upload"
            loading={mutation.isPending}
            disabled={submitDisabled}
          >
            {mutation.isPending ? 'Importing…' : 'Import employees'}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit} noValidate className="space-y-4">
        {admin ? (
          <Field
            label="Employer"
            htmlFor={employerFieldId}
            required
            error={errors.employerId}
            hint={
              employersLoading
                ? 'Loading employers…'
                : employers.length
                  ? undefined
                  : 'No employers are available. Create a client account before importing.'
            }
          >
            <SelectField
              id={employerFieldId}
              value={employerId}
              onChange={(event) => {
                setEmployerId(event.target.value);
                setErrors((previous) => ({ ...previous, employerId: undefined }));
                resetMutation();
              }}
              options={employers}
              placeholder={employersLoading ? 'Loading employers…' : 'Select employer'}
              disabled={employersLoading || mutation.isPending || employers.length === 0}
            />
          </Field>
        ) : client ? (
          <div className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-ink-soft">Employer</span>
            <div className="flex h-[40px] items-center rounded-sm border border-border bg-surface-sunken px-3 text-[13px] text-muted">
              {clientName || 'Your organisation'}
            </div>
            <p className="text-[11px] text-muted">
              Employees are linked to your client account automatically.
            </p>
          </div>
        ) : null}

        {employersError ? (
          <InlineNotice
            tone="error"
            title="Employers could not be loaded"
            action={
              onRetryEmployers ? (
                <Button variant="secondary" size="sm" icon="refresh" onClick={onRetryEmployers}>
                  Retry
                </Button>
              ) : null
            }
          >
            {employersError?.message || 'The client list is unavailable.'}
          </InlineNotice>
        ) : null}

        <Field
          label="Roster file"
          htmlFor={fileInputId}
          required
          error={errors.file}
          hint="CSV up to 5 MB and 5,000 employees. Name and email are required columns."
        >
          <input
            ref={fileInputRef}
            id={fileInputId}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={handleFileChange}
            disabled={mutation.isPending}
          />
          {file ? (
            <div className="flex items-center gap-3 rounded-sm border border-border bg-surface px-3.5 py-3">
              <Icon name="file" size={16} className="shrink-0 text-muted" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-ink">{file.name}</p>
                <p className="text-[10px] text-muted">{formatBytes(file.size)} · CSV roster</p>
              </div>
              <IconButton
                icon="close"
                label="Remove selected file"
                onClick={clearFile}
                disabled={mutation.isPending}
              />
            </div>
          ) : (
            <label
              htmlFor={fileInputId}
              className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-border bg-surface-sunken px-4 py-6 text-center transition-colors hover:border-cobalt"
            >
              <Icon name="upload" size={18} className="text-muted" />
              <span className="text-[12px] font-semibold text-ink">Choose a CSV file</span>
              <span className="text-[10px] text-muted">Click to browse · max 5 MB</span>
            </label>
          )}
        </Field>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-border bg-surface-sunken px-3.5 py-3">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-ink">Use the roster template</p>
            <p className="text-[11px] leading-4 text-muted">
              Header row included; add one employee per line before uploading.
            </p>
          </div>
          <Button variant="ghost" size="sm" icon="download" onClick={downloadTemplate}>
            Download template
          </Button>
        </div>

        {emptyResult ? (
          <InlineNotice tone="warning" title="No employees were created">
            The file may contain only a header row, or every row was invalid or had a
            duplicate email.
          </InlineNotice>
        ) : null}

        {apiMessage ? (
          <InlineNotice tone="error" title="The roster could not be imported">
            {apiMessage}
          </InlineNotice>
        ) : null}
      </form>
    </Modal>
  );
}
