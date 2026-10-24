/**
 * Canonical mock dataset for the review boards.
 *
 * Every screen reads from this module so names, employers, amounts and states
 * stay consistent across the 27 designs. Values follow the API enums in
 * AirliPayApi/prisma/schema.prisma.
 */

export type AccountStatus = 'ACTIVE' | 'PENDING' | 'DEACTIVATED' | 'BLOCKED' | 'BANNED';
export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export type TransactionType = 'WITHDRAW' | 'DEPOSIT';
export type InvoiceStatus = 'TREATED' | 'NOT_TREATED' | 'PENDING_CONFIRMATION';
export type Operator = 'MTN' | 'ORANGE' | 'CAMTEL' | 'YOOMEE' | 'NEXTEL' | 'MAVIANCE' | 'UNKNOWN';
export type PayRunStatus = 'SCHEDULED' | 'PROCESSING' | 'SETTLED' | 'NEEDS_ATTENTION';

export const ACCOUNT_STATUSES: AccountStatus[] = [
  'ACTIVE',
  'PENDING',
  'DEACTIVATED',
  'BLOCKED',
  'BANNED'
];
export const TRANSACTION_STATUSES: TransactionStatus[] = ['SUCCESS', 'PENDING', 'FAILED'];
export const TRANSACTION_TYPES: TransactionType[] = ['WITHDRAW', 'DEPOSIT'];
export const INVOICE_STATUSES: InvoiceStatus[] = ['TREATED', 'NOT_TREATED', 'PENDING_CONFIRMATION'];
export const OPERATORS: Operator[] = ['MTN', 'ORANGE', 'CAMTEL', 'YOOMEE', 'NEXTEL', 'MAVIANCE', 'UNKNOWN'];
export const PAY_RUN_STATUSES: PayRunStatus[] = ['SCHEDULED', 'PROCESSING', 'SETTLED', 'NEEDS_ATTENTION'];

export interface Client {
  id: string;
  name: string;
  monogram: string;
  industry: string;
  email: string;
  phone: string;
  status: AccountStatus;
  employeeCount: number;
  nextPaymentDate: string;
  joined: string;
  activated: string;
  city: string;
  region: string;
  street: string;
  taxId: string;
  commissionPct: number;
  bank: string;
  accountMasked: string;
  fundingBalance: number;
  manager: string;
  revenue: number;
}

export interface Employee {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  employeeId: string;
  clientId: string;
  baseSalary: number;
  balance: number;
  status: AccountStatus;
  joined: string;
  activated: string;
  city: string;
  region: string;
  street: string;
  dob: string;
  sex: 'F' | 'M';
  operator: Operator;
  momoMasked: string;
  bank: string;
  bankAccountMasked: string;
}

export interface Admin {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: 'Super admin' | 'Admin';
  focus: string;
  status: AccountStatus;
  joined: string;
  activated: string;
  lastActive: string;
  city: string;
  region: string;
  street: string;
  twoFactor: boolean;
}

export interface Transaction {
  id: string;
  ref: string;
  type: TransactionType;
  status: TransactionStatus;
  employeeId: string | null;
  clientId: string;
  actorName: string;
  description: string;
  amount: number;
  fee: number;
  balanceBefore: number;
  balanceAfter: number;
  date: string;
  operator?: Operator;
  destinationMasked?: string;
}

export interface InvoiceLine {
  description: string;
  quantity: number;
  amount: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  status: InvoiceStatus;
  periodFrom: string;
  periodTo: string;
  issuedDate: string;
  dueDate: string;
  totalAmount: number;
  totalFees: number;
  taxes: number;
  lineItems: InvoiceLine[];
  transactionCount: number;
  employeeCount: number;
  paidAt?: string;
  reference: string;
}

export interface PayRun {
  id: string;
  reference: string;
  date: string;
  status: PayRunStatus;
  amount: number;
  employeeCount: number;
  clientCount: number;
  fundedPct: number;
  note: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  date: string;
  tone: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  actor: string;
  meta: string;
}

export const clients: Client[] = [
  {
    id: 'cl_penda',
    name: 'Penda Logistics',
    monogram: 'PL',
    industry: 'Freight & logistics',
    email: 'finance@penda.cm',
    phone: '+237 6 77 10 44 20',
    status: 'ACTIVE',
    employeeCount: 1842,
    nextPaymentDate: '2026-10-28',
    joined: '12 Feb 2024',
    activated: '14 Feb 2024',
    city: 'Douala',
    region: 'Littoral',
    street: 'Zone industrielle de Bassa',
    taxId: 'M0801224587',
    commissionPct: 2.5,
    bank: 'Afriland First Bank',
    accountMasked: '•••• 4821',
    fundingBalance: 25000000,
    manager: 'Jude Ekema',
    revenue: 4280000
  },
  {
    id: 'cl_kribi',
    name: 'Kribi Marine Services',
    monogram: 'KM',
    industry: 'Maritime services',
    email: 'ops@kribimarine.cm',
    phone: '+237 6 99 31 08 55',
    status: 'ACTIVE',
    employeeCount: 624,
    nextPaymentDate: '2026-10-29',
    joined: '06 May 2024',
    activated: '08 May 2024',
    city: 'Kribi',
    region: 'South',
    street: 'Port industrial estate',
    taxId: 'M0901448721',
    commissionPct: 2.5,
    bank: 'Ecobank Cameroon',
    accountMasked: '•••• 7740',
    fundingBalance: 8050000,
    manager: 'Nadège Mballa',
    revenue: 1960000
  },
  {
    id: 'cl_montfebe',
    name: 'Mont Fébé Hospitality',
    monogram: 'MF',
    industry: 'Hospitality',
    email: 'people@montfebe.cm',
    phone: '+237 6 55 72 19 03',
    status: 'PENDING',
    employeeCount: 388,
    nextPaymentDate: '2026-10-30',
    joined: '18 Jul 2026',
    activated: '—',
    city: 'Yaoundé',
    region: 'Centre',
    street: 'Rue du Mont Fébé',
    taxId: 'M1001662054',
    commissionPct: 3,
    bank: 'BICEC',
    accountMasked: '•••• 1108',
    fundingBalance: 0,
    manager: 'Claudia Mbah',
    revenue: 820000
  },
  {
    id: 'cl_sahel',
    name: 'Sahel Agro Group',
    monogram: 'SA',
    industry: 'Agribusiness',
    email: 'treasury@sahelagro.cm',
    phone: '+237 6 94 08 63 12',
    status: 'ACTIVE',
    employeeCount: 1104,
    nextPaymentDate: '2026-10-31',
    joined: '21 Nov 2024',
    activated: '23 Nov 2024',
    city: 'Garoua',
    region: 'North',
    street: 'Route de Maroua',
    taxId: 'M0701559320',
    commissionPct: 2.5,
    bank: 'Commercial Bank of Cameroon',
    accountMasked: '•••• 6053',
    fundingBalance: 18500000,
    manager: 'Jude Ekema',
    revenue: 3365000
  },
  {
    id: 'cl_douala',
    name: 'Douala Digital',
    monogram: 'DD',
    industry: 'Technology',
    email: 'salary@doualadigital.cm',
    phone: '+237 6 58 40 22 76',
    status: 'ACTIVE',
    employeeCount: 212,
    nextPaymentDate: '2026-11-01',
    joined: '09 Jan 2025',
    activated: '10 Jan 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'Bonanjo business district',
    taxId: 'M1201980341',
    commissionPct: 2,
    bank: 'Equity Bank Cameroon',
    accountMasked: '•••• 3296',
    fundingBalance: 2140000,
    manager: 'Claudia Mbah',
    revenue: 1148000
  },
  {
    id: 'cl_bamenda',
    name: 'Bamenda Health Co.',
    monogram: 'BH',
    industry: 'Healthcare',
    email: 'admin@bamendahealth.cm',
    phone: '+237 6 74 90 51 67',
    status: 'BLOCKED',
    employeeCount: 486,
    nextPaymentDate: '2026-11-02',
    joined: '03 Mar 2025',
    activated: '05 Mar 2025',
    city: 'Bamenda',
    region: 'Northwest',
    street: 'Mankon medical quarter',
    taxId: 'M1101734410',
    commissionPct: 3,
    bank: 'Standard Chartered Bank Cameroon',
    accountMasked: '•••• 9184',
    fundingBalance: 0,
    manager: 'Nadège Mballa',
    revenue: 2460000
  }
];

export const employees: Employee[] = [
  {
    id: 'emp_awa',
    name: 'Awa Fongang',
    initials: 'AF',
    email: 'awa.fongang@penda.cm',
    phone: '+237 6 77 42 18 90',
    employeeId: 'EMP-10482',
    clientId: 'cl_penda',
    baseSalary: 240000,
    balance: 184500,
    status: 'ACTIVE',
    joined: '04 Mar 2025',
    activated: '04 Mar 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'Bépanda Omnisport',
    dob: '14 Jun 1994',
    sex: 'F',
    operator: 'MTN',
    momoMasked: '•••• 7321',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  },
  {
    id: 'emp_brice',
    name: 'Brice Tchoumi',
    initials: 'BT',
    email: 'brice.tchoumi@kribimarine.cm',
    phone: '+237 6 99 16 73 04',
    employeeId: 'EMP-09117',
    clientId: 'cl_kribi',
    baseSalary: 150000,
    balance: 96000,
    status: 'ACTIVE',
    joined: '19 Aug 2024',
    activated: '19 Aug 2024',
    city: 'Kribi',
    region: 'South',
    street: 'Mboa-Manga',
    dob: '03 Nov 1991',
    sex: 'M',
    operator: 'ORANGE',
    momoMasked: '•••• 6408',
    bank: 'Ecobank Cameroon',
    bankAccountMasked: '•••• 7740'
  },
  {
    id: 'emp_marie',
    name: 'Marie-Claire Ewane',
    initials: 'ME',
    email: 'mc.ewane@montfebe.cm',
    phone: '+237 6 55 84 39 28',
    employeeId: 'EMP-06320',
    clientId: 'cl_montfebe',
    baseSalary: 125000,
    balance: 180000,
    status: 'PENDING',
    joined: '12 Sep 2026',
    activated: '—',
    city: 'Yaoundé',
    region: 'Centre',
    street: 'Bastos',
    dob: '28 Apr 1997',
    sex: 'F',
    operator: 'ORANGE',
    momoMasked: '•••• 2914',
    bank: 'BICEC',
    bankAccountMasked: '•••• 1108'
  },
  {
    id: 'emp_emmanuel',
    name: 'Emmanuel Nfor',
    initials: 'EN',
    email: 'emmanuel.nfor@sahelagro.cm',
    phone: '+237 6 94 55 71 30',
    employeeId: 'EMP-11704',
    clientId: 'cl_sahel',
    baseSalary: 180000,
    balance: 142500,
    status: 'ACTIVE',
    joined: '17 Apr 2025',
    activated: '17 Apr 2025',
    city: 'Garoua',
    region: 'North',
    street: 'Poumpoumré',
    dob: '07 Jan 1990',
    sex: 'M',
    operator: 'MTN',
    momoMasked: '•••• 8035',
    bank: 'Commercial Bank of Cameroon',
    bankAccountMasked: '•••• 6053'
  },
  {
    id: 'emp_larissa',
    name: 'Larissa Etoundi',
    initials: 'LE',
    email: 'larissa.etoundi@doualadigital.cm',
    phone: '+237 6 58 21 67 44',
    employeeId: 'EMP-12930',
    clientId: 'cl_douala',
    baseSalary: 160000,
    balance: 88750,
    status: 'ACTIVE',
    joined: '21 Jan 2025',
    activated: '21 Jan 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'Akwa',
    dob: '11 Oct 1995',
    sex: 'F',
    operator: 'ORANGE',
    momoMasked: '•••• 4472',
    bank: 'Equity Bank Cameroon',
    bankAccountMasked: '•••• 3296'
  },
  {
    id: 'emp_serge',
    name: 'Serge Mbarga',
    initials: 'SM',
    email: 'serge.mbarga@penda.cm',
    phone: '+237 6 77 63 80 11',
    employeeId: 'EMP-10891',
    clientId: 'cl_penda',
    baseSalary: 145000,
    balance: 61000,
    status: 'BLOCKED',
    joined: '30 Jun 2025',
    activated: '30 Jun 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'New Bell',
    dob: '19 Feb 1993',
    sex: 'M',
    operator: 'MTN',
    momoMasked: '•••• 1750',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  },
  {
    id: 'emp_aaliyah',
    name: 'Aaliyah Njoya',
    initials: 'AN',
    email: 'aaliyah.njoya@montfebe.cm',
    phone: '+237 6 55 92 06 81',
    employeeId: 'EMP-06418',
    clientId: 'cl_montfebe',
    baseSalary: 118000,
    balance: 30000,
    status: 'DEACTIVATED',
    joined: '06 Oct 2025',
    activated: '06 Oct 2025',
    city: 'Yaoundé',
    region: 'Centre',
    street: 'Mvog-Mbi',
    dob: '02 Aug 1998',
    sex: 'F',
    operator: 'MTN',
    momoMasked: '•••• 5623',
    bank: 'BICEC',
    bankAccountMasked: '•••• 1108'
  },
  {
    id: 'emp_patrick',
    name: 'Patrick Fotso',
    initials: 'PF',
    email: 'patrick.fotso@kribimarine.cm',
    phone: '+237 6 99 74 28 16',
    employeeId: 'EMP-09203',
    clientId: 'cl_kribi',
    baseSalary: 135000,
    balance: 120000,
    status: 'ACTIVE',
    joined: '02 Dec 2024',
    activated: '02 Dec 2024',
    city: 'Kribi',
    region: 'South',
    street: 'Dombé',
    dob: '23 May 1992',
    sex: 'M',
    operator: 'ORANGE',
    momoMasked: '•••• 3927',
    bank: 'Ecobank Cameroon',
    bankAccountMasked: '•••• 7740'
  },
  {
    id: 'emp_gerard',
    name: 'Gérard Ndzana',
    initials: 'GN',
    email: 'gerard.ndzana@penda.cm',
    phone: '+237 6 77 18 62 40',
    employeeId: 'EMP-11231',
    clientId: 'cl_penda',
    baseSalary: 155000,
    balance: 76000,
    status: 'ACTIVE',
    joined: '23 Sep 2025',
    activated: '23 Sep 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'Akwa',
    dob: '05 Mar 1990',
    sex: 'M',
    operator: 'MTN',
    momoMasked: '•••• 9082',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  },
  {
    id: 'emp_yvonne',
    name: 'Yvonne Atangana',
    initials: 'YA',
    email: 'yvonne.atangana@penda.cm',
    phone: '+237 6 55 03 91 27',
    employeeId: 'EMP-11456',
    clientId: 'cl_penda',
    baseSalary: 210000,
    balance: 250000,
    status: 'ACTIVE',
    joined: '12 May 2025',
    activated: '12 May 2025',
    city: 'Douala',
    region: 'Littoral',
    street: 'Bonapriso',
    dob: '22 Dec 1988',
    sex: 'F',
    operator: 'ORANGE',
    momoMasked: '•••• 3614',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  },
  {
    id: 'emp_marcel',
    name: 'Marcel Ebode',
    initials: 'ME',
    email: 'marcel.ebode@penda.cm',
    phone: '+237 6 77 90 14 55',
    employeeId: 'EMP-11822',
    clientId: 'cl_penda',
    baseSalary: 130000,
    balance: 0,
    status: 'PENDING',
    joined: '15 Oct 2026',
    activated: '—',
    city: 'Douala',
    region: 'Littoral',
    street: 'New Bell',
    dob: '09 Jul 1996',
    sex: 'M',
    operator: 'MTN',
    momoMasked: '•••• 2290',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  },
  {
    id: 'emp_sandrine',
    name: 'Sandrine Fokou',
    initials: 'SF',
    email: 'sandrine.fokou@penda.cm',
    phone: '+237 6 77 65 38 02',
    employeeId: 'EMP-10677',
    clientId: 'cl_penda',
    baseSalary: 170000,
    balance: 42000,
    status: 'DEACTIVATED',
    joined: '06 Jun 2024',
    activated: '06 Jun 2024',
    city: 'Douala',
    region: 'Littoral',
    street: 'Deïdo',
    dob: '30 Jan 1993',
    sex: 'F',
    operator: 'ORANGE',
    momoMasked: '•••• 5178',
    bank: 'Afriland First Bank',
    bankAccountMasked: '•••• 4821'
  }
];

export const admins: Admin[] = [
  {
    id: 'adm_nadege',
    name: 'Nadège Mballa',
    initials: 'NM',
    email: 'nadege.mballa@airlipay.cm',
    phone: '+237 6 77 42 18 90',
    role: 'Super admin',
    focus: 'Operations',
    status: 'ACTIVE',
    joined: '14 Jan 2024',
    activated: '15 Jan 2024',
    lastActive: '23 Oct 2026 · 09:44',
    city: 'Douala',
    region: 'Littoral',
    street: '12 Boulevard de la Liberté',
    twoFactor: true
  },
  {
    id: 'adm_jude',
    name: 'Jude Ekema',
    initials: 'JE',
    email: 'jude.ekema@airlipay.cm',
    phone: '+237 6 77 30 55 12',
    role: 'Admin',
    focus: 'Finance',
    status: 'ACTIVE',
    joined: '22 Feb 2024',
    activated: '23 Feb 2024',
    lastActive: '23 Oct 2026 · 08:51',
    city: 'Douala',
    region: 'Littoral',
    street: 'Bonapriso',
    twoFactor: true
  },
  {
    id: 'adm_claudia',
    name: 'Claudia Mbah',
    initials: 'CM',
    email: 'claudia.mbah@airlipay.cm',
    phone: '+237 6 55 90 41 73',
    role: 'Admin',
    focus: 'Client success',
    status: 'PENDING',
    joined: '18 Oct 2026',
    activated: '—',
    lastActive: 'Invitation sent',
    city: 'Yaoundé',
    region: 'Centre',
    street: 'Odza',
    twoFactor: false
  },
  {
    id: 'adm_kelvin',
    name: 'Kelvin Ajong',
    initials: 'KA',
    email: 'kelvin.ajong@airlipay.cm',
    phone: '+237 6 74 20 38 65',
    role: 'Admin',
    focus: 'Support',
    status: 'ACTIVE',
    joined: '05 Jun 2025',
    activated: '06 Jun 2025',
    lastActive: '22 Oct 2026 · 17:26',
    city: 'Bamenda',
    region: 'Northwest',
    street: 'Mankon',
    twoFactor: false
  }
];

export const currentUser = admins[0];

export const transactions: Transaction[] = [
  {
    id: 'txn_1042',
    ref: 'TXN-8F2A91',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 45000,
    fee: 2250,
    balanceBefore: 231750,
    balanceAfter: 184500,
    date: '2026-10-23T09:42:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1041',
    ref: 'TXN-1C7D40',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_brice',
    clientId: 'cl_kribi',
    actorName: 'Brice Tchoumi',
    description: 'Early wage withdrawal',
    amount: 20000,
    fee: 1000,
    balanceBefore: 117000,
    balanceAfter: 96000,
    date: '2026-10-23T09:15:00+01:00',
    operator: 'ORANGE',
    destinationMasked: '•••• 6408'
  },
  {
    id: 'txn_1040',
    ref: 'FND-5A021E',
    type: 'DEPOSIT',
    status: 'SUCCESS',
    employeeId: null,
    clientId: 'cl_penda',
    actorName: 'Penda Logistics treasury',
    description: 'Payroll funding',
    amount: 25000000,
    fee: 0,
    balanceBefore: 0,
    balanceAfter: 0,
    date: '2026-10-23T08:55:00+01:00'
  },
  {
    id: 'txn_1039',
    ref: 'TXN-4B90C2',
    type: 'WITHDRAW',
    status: 'FAILED',
    employeeId: 'emp_marie',
    clientId: 'cl_montfebe',
    actorName: 'Marie-Claire Ewane',
    description: 'Early wage withdrawal',
    amount: 80000,
    fee: 4000,
    balanceBefore: 180000,
    balanceAfter: 180000,
    date: '2026-10-22T17:32:00+01:00',
    operator: 'ORANGE',
    destinationMasked: '•••• 2914'
  },
  {
    id: 'txn_1038',
    ref: 'TXN-7D13A8',
    type: 'WITHDRAW',
    status: 'PENDING',
    employeeId: 'emp_emmanuel',
    clientId: 'cl_sahel',
    actorName: 'Emmanuel Nfor',
    description: 'Early wage withdrawal',
    amount: 150000,
    fee: 7500,
    balanceBefore: 142500,
    balanceAfter: 142500,
    date: '2026-10-22T16:10:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 8035'
  },
  {
    id: 'txn_1037',
    ref: 'TXN-2E806B',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_larissa',
    clientId: 'cl_douala',
    actorName: 'Larissa Etoundi',
    description: 'Early wage withdrawal',
    amount: 60000,
    fee: 3000,
    balanceBefore: 151750,
    balanceAfter: 88750,
    date: '2026-10-22T14:48:00+01:00',
    operator: 'ORANGE',
    destinationMasked: '•••• 4472'
  },
  {
    id: 'txn_1036',
    ref: 'TXN-6A44F3',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_patrick',
    clientId: 'cl_kribi',
    actorName: 'Patrick Fotso',
    description: 'Early wage withdrawal',
    amount: 90000,
    fee: 4500,
    balanceBefore: 214500,
    balanceAfter: 120000,
    date: '2026-10-22T11:02:00+01:00',
    operator: 'ORANGE',
    destinationMasked: '•••• 3927'
  },
  {
    id: 'txn_1035',
    ref: 'FND-3C781A',
    type: 'DEPOSIT',
    status: 'SUCCESS',
    employeeId: null,
    clientId: 'cl_sahel',
    actorName: 'Sahel Agro Group treasury',
    description: 'Payroll funding',
    amount: 18500000,
    fee: 0,
    balanceBefore: 0,
    balanceAfter: 0,
    date: '2026-10-22T09:20:00+01:00'
  },
  {
    id: 'txn_1034',
    ref: 'TXN-9B205D',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 35000,
    fee: 1750,
    balanceBefore: 268500,
    balanceAfter: 231750,
    date: '2026-10-20T13:08:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1033',
    ref: 'TXN-0F58E7',
    type: 'WITHDRAW',
    status: 'FAILED',
    employeeId: 'emp_serge',
    clientId: 'cl_penda',
    actorName: 'Serge Mbarga',
    description: 'Early wage withdrawal',
    amount: 120000,
    fee: 6000,
    balanceBefore: 61000,
    balanceAfter: 61000,
    date: '2026-10-20T10:44:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 1750'
  },
  {
    id: 'txn_1032',
    ref: 'TXN-5D66B1',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_emmanuel',
    clientId: 'cl_sahel',
    actorName: 'Emmanuel Nfor',
    description: 'Early wage withdrawal',
    amount: 100000,
    fee: 5000,
    balanceBefore: 247500,
    balanceAfter: 142500,
    date: '2026-10-19T15:27:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 8035'
  },
  {
    id: 'txn_1031',
    ref: 'FND-1A349C',
    type: 'DEPOSIT',
    status: 'SUCCESS',
    employeeId: null,
    clientId: 'cl_kribi',
    actorName: 'Kribi Marine treasury',
    description: 'Payroll funding',
    amount: 8000000,
    fee: 0,
    balanceBefore: 0,
    balanceAfter: 0,
    date: '2026-10-19T09:20:00+01:00'
  },
  {
    id: 'txn_1030',
    ref: 'TXN-3C92A6',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 25000,
    fee: 1250,
    balanceBefore: 294750,
    balanceAfter: 268500,
    date: '2026-10-15T12:03:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1029',
    ref: 'TXN-7E1108',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 40000,
    fee: 2000,
    balanceBefore: 336750,
    balanceAfter: 294750,
    date: '2026-10-08T09:36:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1028',
    ref: 'TXN-4A097E',
    type: 'WITHDRAW',
    status: 'FAILED',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 30000,
    fee: 1500,
    balanceBefore: 336750,
    balanceAfter: 336750,
    date: '2026-10-02T18:11:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1027',
    ref: 'TXN-6E73C1',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 50000,
    fee: 2500,
    balanceBefore: 389250,
    balanceAfter: 336750,
    date: '2026-09-24T10:12:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  },
  {
    id: 'txn_1026',
    ref: 'TXN-2F28A4',
    type: 'WITHDRAW',
    status: 'SUCCESS',
    employeeId: 'emp_awa',
    clientId: 'cl_penda',
    actorName: 'Awa Fongang',
    description: 'Early wage withdrawal',
    amount: 30000,
    fee: 1500,
    balanceBefore: 420750,
    balanceAfter: 389250,
    date: '2026-09-18T15:40:00+01:00',
    operator: 'MTN',
    destinationMasked: '•••• 7321'
  }
];

export const invoices: Invoice[] = [
  {
    id: 'inv_1042',
    number: 'INV-2026-1042',
    clientId: 'cl_penda',
    status: 'TREATED',
    periodFrom: '2026-10-01',
    periodTo: '2026-10-15',
    issuedDate: '2026-10-16',
    dueDate: '2026-10-23',
    totalAmount: 4280000,
    totalFees: 103500,
    taxes: 36500,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 4140000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 103500 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 36500 }
    ],
    transactionCount: 184,
    employeeCount: 176,
    paidAt: '2026-10-22',
    reference: 'PAY-2026-1042'
  },
  {
    id: 'inv_1041',
    number: 'INV-2026-1041',
    clientId: 'cl_kribi',
    status: 'PENDING_CONFIRMATION',
    periodFrom: '2026-10-01',
    periodTo: '2026-10-15',
    issuedDate: '2026-10-16',
    dueDate: '2026-10-30',
    totalAmount: 1960000,
    totalFees: 47000,
    taxes: 20000,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 1893000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 47000 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 20000 }
    ],
    transactionCount: 72,
    employeeCount: 68,
    reference: 'PAY-2026-1041'
  },
  {
    id: 'inv_1040',
    number: 'INV-2026-1040',
    clientId: 'cl_montfebe',
    status: 'NOT_TREATED',
    periodFrom: '2026-09-16',
    periodTo: '2026-09-30',
    issuedDate: '2026-10-01',
    dueDate: '2026-10-27',
    totalAmount: 820000,
    totalFees: 19800,
    taxes: 8200,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 792000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 19800 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 8200 }
    ],
    transactionCount: 31,
    employeeCount: 29,
    reference: 'PAY-2026-1040'
  },
  {
    id: 'inv_1039',
    number: 'INV-2026-1039',
    clientId: 'cl_sahel',
    status: 'TREATED',
    periodFrom: '2026-09-16',
    periodTo: '2026-09-30',
    issuedDate: '2026-10-01',
    dueDate: '2026-10-15',
    totalAmount: 3365000,
    totalFees: 81000,
    taxes: 34000,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 3250000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 81000 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 34000 }
    ],
    transactionCount: 129,
    employeeCount: 118,
    paidAt: '2026-10-14',
    reference: 'PAY-2026-1039'
  },
  {
    id: 'inv_1038',
    number: 'INV-2026-1038',
    clientId: 'cl_douala',
    status: 'TREATED',
    periodFrom: '2026-09-16',
    periodTo: '2026-09-30',
    issuedDate: '2026-10-01',
    dueDate: '2026-10-15',
    totalAmount: 1148000,
    totalFees: 28000,
    taxes: 12000,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 1108000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 28000 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 12000 }
    ],
    transactionCount: 44,
    employeeCount: 42,
    paidAt: '2026-10-13',
    reference: 'PAY-2026-1038'
  },
  {
    id: 'inv_1037',
    number: 'INV-2026-1037',
    clientId: 'cl_bamenda',
    status: 'NOT_TREATED',
    periodFrom: '2026-09-01',
    periodTo: '2026-09-15',
    issuedDate: '2026-09-16',
    dueDate: '2026-11-02',
    totalAmount: 2460000,
    totalFees: 59000,
    taxes: 26000,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 2375000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 59000 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 26000 }
    ],
    transactionCount: 97,
    employeeCount: 89,
    reference: 'PAY-2026-1037'
  },
  {
    id: 'inv_1036',
    number: 'INV-2026-1036',
    clientId: 'cl_penda',
    status: 'TREATED',
    periodFrom: '2026-09-16',
    periodTo: '2026-09-30',
    issuedDate: '2026-10-01',
    dueDate: '2026-10-15',
    totalAmount: 4120000,
    totalFees: 99600,
    taxes: 35400,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 3985000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 99600 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 35400 }
    ],
    transactionCount: 178,
    employeeCount: 171,
    paidAt: '2026-10-14',
    reference: 'PAY-2026-1036'
  },
  {
    id: 'inv_1035',
    number: 'INV-2026-1035',
    clientId: 'cl_penda',
    status: 'TREATED',
    periodFrom: '2026-09-01',
    periodTo: '2026-09-15',
    issuedDate: '2026-09-16',
    dueDate: '2026-09-30',
    totalAmount: 3980000,
    totalFees: 96200,
    taxes: 33800,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 3850000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 96200 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 33800 }
    ],
    transactionCount: 171,
    employeeCount: 166,
    paidAt: '2026-09-30',
    reference: 'PAY-2026-1035'
  },
  {
    id: 'inv_1034',
    number: 'INV-2026-1034',
    clientId: 'cl_penda',
    status: 'TREATED',
    periodFrom: '2026-08-16',
    periodTo: '2026-08-31',
    issuedDate: '2026-09-01',
    dueDate: '2026-09-15',
    totalAmount: 3760000,
    totalFees: 90900,
    taxes: 32100,
    lineItems: [
      { description: 'Earned wage access advanced', quantity: 1, amount: 3637000 },
      { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 90900 },
      { description: 'VAT · 0.9%', quantity: 1, amount: 32100 }
    ],
    transactionCount: 164,
    employeeCount: 159,
    paidAt: '2026-09-12',
    reference: 'PAY-2026-1034'
  }
];

export const payRuns: PayRun[] = [
  {
    id: 'run_1028',
    reference: 'RUN-2026-1028',
    date: '2026-10-28',
    status: 'SCHEDULED',
    amount: 12840000,
    employeeCount: 1204,
    clientCount: 4,
    fundedPct: 78,
    note: 'Funding window closes 27 Oct · 16:00'
  },
  {
    id: 'run_1021',
    reference: 'RUN-2026-1021',
    date: '2026-10-21',
    status: 'SETTLED',
    amount: 11620000,
    employeeCount: 1148,
    clientCount: 4,
    fundedPct: 100,
    note: 'Settled in 42 minutes · 0 failures'
  },
  {
    id: 'run_1014',
    reference: 'RUN-2026-1014',
    date: '2026-10-14',
    status: 'SETTLED',
    amount: 10985000,
    employeeCount: 1092,
    clientCount: 4,
    fundedPct: 100,
    note: 'Settled in 38 minutes · 0 failures'
  },
  {
    id: 'run_1007',
    reference: 'RUN-2026-1007',
    date: '2026-10-07',
    status: 'NEEDS_ATTENTION',
    amount: 9864000,
    employeeCount: 1046,
    clientCount: 4,
    fundedPct: 100,
    note: '6 transfers failed · retry required'
  },
  {
    id: 'run_0930',
    reference: 'RUN-2026-0930',
    date: '2026-09-30',
    status: 'SETTLED',
    amount: 9780000,
    employeeCount: 1031,
    clientCount: 4,
    fundedPct: 100,
    note: 'Settled in 51 minutes · 0 failures'
  }
];

export const notifications = [
  {
    id: 'notif_1',
    title: 'Payout run scheduled for 28 Oct',
    detail: 'XAF 12,840,000 across 1,204 employees',
    tone: 'info' as const,
    time: '12m ago'
  },
  {
    id: 'notif_2',
    title: '3 invoices need review',
    detail: 'Two not treated, one awaiting confirmation',
    tone: 'warning' as const,
    time: '1h ago'
  },
  {
    id: 'notif_3',
    title: '3 withdrawals failed',
    detail: 'Operator errors on the last payout window',
    tone: 'error' as const,
    time: 'Yesterday'
  }
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function parseIso(value: string): { year: number; month: number; day: number; time?: string } {
  const date = value.slice(0, 10);
  const [year, month, day] = date.split('-').map(Number);
  const time = value.includes('T') ? value.slice(11, 16) : undefined;
  return { year, month, day, time };
}

export function dateLabel(value: string): string {
  if (value === '—') {
    return value;
  }
  const { year, month, day } = parseIso(value);
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}`;
}

export function shortDate(value: string): string {
  if (value === '—') {
    return value;
  }
  const { month, day } = parseIso(value);
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]}`;
}

export function dateTimeLabel(value: string): string {
  if (value === '—' || value === 'Invitation sent') {
    return value;
  }
  const { year, month, day, time } = parseIso(value);
  return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}${time ? ` · ${time}` : ''}`;
}

export function longDate(value: string): string {
  const { year, month, day } = parseIso(value);
  return `${String(day).padStart(2, '0')} ${MONTHS_LONG[month - 1]} ${year}`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function money(value: number): string {
  return `XAF ${formatNumber(value)}`;
}

export function compactMoney(value: number): string {
  if (value >= 1_000_000_000) {
    return `XAF ${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `XAF ${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `XAF ${(value / 1_000).toFixed(0)}K`;
  }
  return money(value);
}

export function clientRef(id: string): Client | undefined {
  return clients.find((client) => client.id === id);
}

export function clientName(id: string): string {
  return clientRef(id)?.name ?? 'Unknown client';
}

export function employeeRef(id: string | null): Employee | undefined {
  return id ? employees.find((employee) => employee.id === id) : undefined;
}

export function employeeName(id: string | null): string {
  return employeeRef(id)?.name ?? 'Treasury funding';
}

export function employeeTransactions(id: string): Transaction[] {
  return transactions.filter((transaction) => transaction.employeeId === id);
}

export function clientTransactions(clientId: string): Transaction[] {
  return transactions.filter((transaction) => transaction.clientId === clientId);
}

export function clientRoster(clientId: string): Employee[] {
  return employees.filter((employee) => employee.clientId === clientId);
}

export function invoiceRef(id: string): Invoice | undefined {
  return invoices.find((invoice) => invoice.id === id);
}

export function invoiceTransactions(invoice: Invoice): Transaction[] {
  return transactions.filter(
    (transaction) =>
      transaction.clientId === invoice.clientId &&
      transaction.type === 'WITHDRAW' &&
      transaction.status === 'SUCCESS'
  );
}

export function invoiceTotal(invoice: Invoice): number {
  return invoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
}

export function invoiceStats() {
  const outstanding = invoices.filter(
    (invoice) => invoice.status === 'NOT_TREATED' || invoice.status === 'PENDING_CONFIRMATION'
  );
  const treated = invoices.filter((invoice) => invoice.status === 'TREATED');
  return {
    outstandingCount: outstanding.length,
    outstandingAmount: outstanding.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    treatedCount: treated.length,
    treatedAmount: treated.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
    awaitingConfirmation: invoices.filter((invoice) => invoice.status === 'PENDING_CONFIRMATION').length,
    notTreated: invoices.filter((invoice) => invoice.status === 'NOT_TREATED').length,
    paidCount: treated.length,
    unpaidCount: outstanding.length,
    allCount: invoices.length
  };
}

export function transactionStats() {
  return {
    all: transactions.length,
    success: transactions.filter((transaction) => transaction.status === 'SUCCESS').length,
    failed: transactions.filter((transaction) => transaction.status === 'FAILED').length,
    pending: transactions.filter((transaction) => transaction.status === 'PENDING').length,
    withdrawals: transactions.filter((transaction) => transaction.type === 'WITHDRAW').length,
    deposits: transactions.filter((transaction) => transaction.type === 'DEPOSIT').length,
    failedWithdrawals: transactions.filter(
      (transaction) => transaction.type === 'WITHDRAW' && transaction.status === 'FAILED'
    ).length
  };
}

export const socialStats = {
  payrollVolume: 248650000,
  payrollChange: '+12.4%',
  activeEmployees: 12482,
  activeEmployeesChange: '+3.2%',
  payoutSuccess: 99.2,
  payoutSuccessChange: '-0.3 pp',
  nextRun: payRuns[0],
  clientsLive: 18,
  trendDays: 30
};

export const chartDeposits = [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103];
export const chartPayouts = [30, 36, 33, 42, 51, 47, 61, 58, 66, 63, 74, 71];

export const attentionItems = [
  {
    title: '3 withdrawals failed',
    detail: 'Operator errors in the 22 Oct batch',
    tone: 'error' as const,
    action: 'Review failures'
  },
  {
    title: '3 invoices need review',
    detail: 'Two not treated and one awaiting confirmation',
    tone: 'warning' as const,
    action: 'Open invoices'
  },
  {
    title: 'Payout run is 78% funded',
    detail: 'Funding window closes 27 Oct at 16:00',
    tone: 'info' as const,
    action: 'View run'
  }
];

export const activityFeed: ActivityItem[] = [
  {
    id: 'act_1',
    title: 'Withdrawal completed',
    detail: 'MTN · •••• 7321 · TXN-8F2A91',
    date: '23 Oct · 09:42',
    tone: 'success',
    actor: 'Awa Fongang',
    meta: 'XAF 45,000'
  },
  {
    id: 'act_2',
    title: 'Withdrawal completed',
    detail: 'Orange Money · •••• 7321 · TXN-9B205D',
    date: '20 Oct · 13:08',
    tone: 'success',
    actor: 'Awa Fongang',
    meta: 'XAF 35,000'
  },
  {
    id: 'act_3',
    title: 'Payout account updated',
    detail: 'Preferred mobile money account changed',
    date: '17 Oct · 16:30',
    tone: 'info',
    actor: 'Awa Fongang',
    meta: 'Profile'
  },
  {
    id: 'act_4',
    title: 'Withdrawal completed',
    detail: 'MTN · •••• 7321 · TXN-3C92A6',
    date: '15 Oct · 12:03',
    tone: 'success',
    actor: 'Awa Fongang',
    meta: 'XAF 25,000'
  },
  {
    id: 'act_5',
    title: 'Withdrawal completed',
    detail: 'MTN · •••• 7321 · TXN-7E1108',
    date: '08 Oct · 09:36',
    tone: 'success',
    actor: 'Awa Fongang',
    meta: 'XAF 40,000'
  },
  {
    id: 'act_6',
    title: 'Withdrawal failed',
    detail: 'Operator timeout · TXN-4A097E',
    date: '02 Oct · 18:11',
    tone: 'error',
    actor: 'Awa Fongang',
    meta: 'XAF 30,000'
  }
];

export const bankAccounts = [
  {
    id: 'bank_penda_1',
    bank: 'Afriland First Bank',
    accountMasked: '•••• 4821',
    label: 'Primary settlement',
    status: 'VERIFIED' as const,
    added: '12 Feb 2024'
  },
  {
    id: 'bank_penda_2',
    bank: 'Ecobank Cameroon',
    accountMasked: '•••• 7740',
    label: 'Backup account',
    status: 'VERIFIED' as const,
    added: '03 Jun 2025'
  },
  {
    id: 'bank_penda_3',
    bank: 'BICEC',
    accountMasked: '•••• 1108',
    label: 'Payroll reserve',
    status: 'PENDING' as const,
    added: '30 Sep 2026'
  }
];

export const momoAccounts = [
  {
    operator: 'MTN' as Operator,
    phoneMasked: '•••• 7321',
    label: 'Preferred payout',
    defaultAccount: true,
    status: 'VERIFIED' as const
  },
  {
    operator: 'ORANGE' as Operator,
    phoneMasked: '•••• 4472',
    label: 'Backup payout',
    defaultAccount: false,
    status: 'VERIFIED' as const
  }
];

export function statusLabel(value: string): string {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
