import { formatDate, formatDateTime, formatMoney, initials, isNil } from '@/lib/format';

export function unwrap(response) {
  return response?.data;
}

export function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export function personName(person) {
  return person?.name || person?.full_name || person?.username || '—';
}

export function personEmail(person) {
  return person?.accounts?.email || person?.email || '—';
}

export function personPhone(person) {
  return (
    person?.addresses?.primary_phone_number ||
    person?.address_primary_phone_number ||
    person?.primary_phone_number ||
    person?.phone_number ||
    '—'
  );
}

export function personSecondaryPhone(person) {
  return (
    person?.addresses?.secondery_phone_number ||
    person?.address_secondary_phone ||
    person?.secondary_phone_number ||
    '—'
  );
}

export function personStatus(person) {
  return person?.accounts?.account_status || person?.account_status || person?.status || '';
}

export function personCity(person) {
  return person?.addresses?.city || person?.city || '—';
}

export function personRegion(person) {
  return person?.addresses?.region || person?.region || '—';
}

export function personStreet(person) {
  return person?.addresses?.street || person?.street || '—';
}

export function personJoined(person) {
  return person?.created_at || person?.joined_at || '';
}

export function personActivated(person) {
  return person?.accounts?.activation_date || person?.activation_date || '';
}

export function userEmployer(user) {
  return user?.clients?.name || user?.client_name || user?.employer_name || '—';
}

export function normalizeUser(user) {
  return {
    ...user,
    displayName: personName(user),
    initials: initials(personName(user), 'EM'),
    email: personEmail(user),
    phone: personPhone(user),
    secondaryPhone: personSecondaryPhone(user),
    status: personStatus(user),
    city: personCity(user),
    region: personRegion(user),
    street: personStreet(user),
    employer: userEmployer(user),
    clientId: user?.client_id ?? user?.clients?.id,
    employeeId: user?.employee_id || '—',
    baseSalary: user?.base_salary,
    joined: personJoined(user),
    activated: personActivated(user),
    momoAccounts: asArray(user?.user_mobile_money_accounts),
  };
}

export function payoutDestination(user) {
  const account = asArray(user?.user_mobile_money_accounts)[0];
  if (!account) return null;
  const operator = account.operator || account.provider || 'Mobile money';
  const phone = String(account.phone_number || '');
  const suffix = phone.length >= 4 ? `•••• ${phone.slice(-4)}` : phone;
  return {
    operator,
    phone,
    label: suffix ? `${operator} ${suffix}` : operator,
    account,
  };
}

export function balanceValue(payload) {
  if (payload === null || payload === undefined) return null;
  const value =
    typeof payload === 'number'
      ? payload
      : payload.balance ??
        payload.available_balance ??
        payload.airlipay_balance ??
        payload.availableBalance;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function payPeriodRows(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.pay_periods)) return payload.pay_periods;
  return [];
}

export function normalizeClient(client) {
  return {
    ...client,
    displayName: personName(client),
    initials: initials(personName(client), 'CL'),
    email: personEmail(client),
    phone: personPhone(client),
    secondaryPhone: personSecondaryPhone(client),
    status: personStatus(client),
    city: personCity(client),
    region: personRegion(client),
    street: personStreet(client),
    industry: client?.industry || '—',
    nextPaymentDate: client?.next_payment_date || '',
    taxId: client?.tax_id || '—',
    commission: client?.client_commision ?? client?.client_commission,
    bank: client?.bank || client?.client_banks?.[0]?.banks?.name || '—',
    bankAccount: client?.bankAccountNumber || client?.bank_account_number || client?.client_banks?.[0]?.account_number || '—',
    joined: personJoined(client),
    activated: personActivated(client),
  };
}

export function normalizeAdmin(admin) {
  return {
    ...admin,
    displayName: personName(admin),
    initials: initials(personName(admin), 'AD'),
    email: personEmail(admin),
    phone: personPhone(admin),
    secondaryPhone: personSecondaryPhone(admin),
    status: personStatus(admin),
    city: personCity(admin),
    region: personRegion(admin),
    street: personStreet(admin),
    joined: personJoined(admin),
    activated: personActivated(admin),
    role: 'Admin',
  };
}

export function transactionType(transaction) {
  return transaction?.transaction_type || transaction?.type || '—';
}

export function transactionStatus(transaction) {
  return transaction?.status || '';
}

export function transactionDate(transaction) {
  return transaction?.execution_date || transaction?.created_at || transaction?.date || '';
}

export function transactionRef(transaction) {
  return transaction?.reference || transaction?.ref || (transaction?.id ? `TXN-${transaction.id}` : '—');
}

export function transactionAmount(transaction) {
  return Number(transaction?.amount ?? 0);
}

export function transactionFee(transaction) {
  return Number(transaction?.fees ?? transaction?.fee ?? 0);
}

export function transactionDescription(transaction) {
  const type = transactionType(transaction);
  if (String(type).toUpperCase() === 'WITHDRAW') {
    const last4 = String(transaction?.phone_number || '').slice(-4);
    return last4 ? `Withdrawal · ${last4}` : 'Withdrawal';
  }
  return String(type).toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

export function transactionBalanceBefore(transaction) {
  return Number(transaction?.old_balance ?? transaction?.balance_before ?? 0);
}

export function transactionBalanceAfter(transaction) {
  return Number(transaction?.new_balance ?? transaction?.balance_after ?? 0);
}

export function formatTransactionDate(transaction) {
  return formatDateTime(transactionDate(transaction));
}

export function attachUsersToTransactions(transactions, users) {
  const userMap = new Map(asArray(users).map((user) => [String(user.id), normalizeUser(user)]));
  return asArray(transactions).map((transaction) => {
    const user = userMap.get(String(transaction.user_id));
    return {
      ...transaction,
      user,
      employeeName: user?.displayName || '—',
      employerName: user?.employer || '—',
      clientId: user?.clientId,
    };
  });
}

export function invoiceNumber(invoice) {
  return invoice?.invoice_number || `INV-${invoice?.id ?? '—'}`;
}

export function invoiceStatus(invoice) {
  return invoice?.status || '';
}

export function invoicePeriod(invoice) {
  return `${formatDate(invoice?.from)} – ${formatDate(invoice?.to)}`;
}

export function invoiceTotal(invoice) {
  return Number(invoice?.totalAmount ?? invoice?.total_amount ?? 0);
}

export function invoiceFees(invoice) {
  return Number(invoice?.totalFees ?? invoice?.total_fees ?? 0);
}

export function invoiceTaxes(invoice) {
  return Number(invoice?.taxes ?? 0);
}

export function invoiceClientId(invoice) {
  return invoice?.client_id ?? invoice?.client?.id;
}

export function invoiceClientName(invoice) {
  return invoice?.client?.name || invoice?.client_name || '—';
}

export function enrichInvoice(invoice, clients) {
  const client = asArray(clients).find((entry) => String(entry.id) === String(invoiceClientId(invoice)));
  return {
    ...invoice,
    client: client || invoice?.client || null,
    clientName: client?.name || invoiceClientName(invoice),
    displayNumber: invoiceNumber(invoice),
    amount: invoiceTotal(invoice),
    fees: invoiceFees(invoice),
    taxes: invoiceTaxes(invoice),
    periodLabel: invoicePeriod(invoice),
  };
}

export function moneyOrDash(value) {
  return isNil(value) ? '—' : formatMoney(value);
}

export function dateOrDash(value) {
  return isNil(value) ? '—' : formatDate(value);
}

export function statusOrDash(status) {
  return status || '—';
}

export function latestOf(rows, getDate) {
  return [...asArray(rows)].sort((a, b) => {
    const left = new Date(getDate(a) || 0).getTime();
    const right = new Date(getDate(b) || 0).getTime();
    return right - left;
  });
}
