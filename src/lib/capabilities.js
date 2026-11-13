export const CAPABILITIES = {
  employeeActivity: {
    status: 'fixture',
    title: 'Sample activity',
    description:
      'Employee activity is not provided by the current API. This deterministic sample shows the intended timeline only.',
  },
  employeeBanks: {
    status: 'fixture',
    title: 'Sample bank accounts',
    description:
      'The account list is not yet connected to a verified bank-account API. Add and verification actions are disabled.',
  },
  debitCards: {
    status: 'concept',
    title: 'Concept — not shipped',
    description:
      'AirliPay does not currently issue debit cards. This screen is a product concept and cannot create a card.',
  },
  clientFunding: {
    status: 'fixture',
    title: 'Sample funding accounts',
    description:
      'Client funding accounts are not available from the current API. The data below is illustrative.',
  },
  clientPayouts: {
    status: 'legacy-fixture',
    title: 'Legacy payment schedule',
    description:
      'This route previously showed static payment data. It is retained as a read-only schedule preview.',
  },
  payoutRuns: {
    status: 'proposed',
    title: 'Proposed payout-run workspace',
    description:
      'Payout runs require a new orchestration API. The run list is illustrative and all run actions are disabled.',
  },
  adminProfile: {
    status: 'ui-gap',
    title: 'Provisional admin profile',
    description:
      'The admin detail route was previously empty. This screen uses the existing admin record; roles, 2FA and last-active data are not tracked yet.',
  },
  invitations: {
    status: 'missing',
    title: 'Invitation API required',
    description:
      'The current API creates accounts with a temporary password. Email invitations and password-reset links are not available yet.',
  },
  csvImport: {
    status: 'missing',
    title: 'Bulk import unavailable',
    description:
      'CSV roster import is not connected to the API. No file will be uploaded from this screen.',
  },
  notifications: {
    status: 'missing',
    title: 'Notifications not connected',
    description:
      'There is no notification feed in the current admin API. The bell remains a visual entry point only.',
  },
  systemStatus: {
    status: 'missing',
    title: 'Status feed not connected',
    description:
      'Operational status is not reported by the API, so the console does not claim that every system is healthy.',
  },
};

export function getCapability(key) {
  return CAPABILITIES[key] || null;
}

export const STATUS_LABELS = {
  fixture: 'Sample data',
  concept: 'Concept',
  'legacy-fixture': 'Legacy fixture',
  proposed: 'Proposed',
  'ui-gap': 'Provisional',
  missing: 'Not connected',
};
