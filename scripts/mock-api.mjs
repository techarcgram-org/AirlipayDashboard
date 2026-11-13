/**
 * Dev-only mock of the AirliPay dashboard API for visual QA.
 * Run with: npm run mock-api  (http://localhost:8010)
 * Then start Next with: NEXT_PUBLIC_BASE_URL=http://localhost:8010 npm run dev
 * Override the port with MOCK_API_PORT. No application code imports this file,
 * and it does not mutate any real data.
 */
import { createServer } from 'node:http';

const port = Number(process.env.MOCK_API_PORT || 8010);

const now = '2026-10-23T09:42:00.000Z';

const admins = [
  {
    id: 1,
    name: 'Nadège Mballa',
    accounts: {
      email: 'nadege.mballa@airlipay.cm',
      account_status: 'ACTIVE',
      activation_date: '2024-02-23T08:00:00.000Z',
    },
    addresses: {
      primary_phone_number: '+237 677 42 18 90',
      secondery_phone_number: '+237 699 10 20 30',
      street: 'Rue 12, Bonanjo',
      city: 'Douala',
      region: 'littoral',
    },
    created_at: '2023-11-01T09:00:00.000Z',
  },
  {
    id: 2,
    name: 'Jude Ekema',
    accounts: {
      email: 'jude.ekema@airlipay.cm',
      account_status: 'ACTIVE',
      activation_date: '2024-03-02T08:00:00.000Z',
    },
    addresses: {
      primary_phone_number: '+237 677 30 55 12',
      secondery_phone_number: '',
      street: 'Bakweri Town',
      city: 'Buea',
      region: 'southwest',
    },
    created_at: '2024-02-22T09:00:00.000Z',
  },
  {
    id: 3,
    name: 'Claudia Mbah',
    accounts: {
      email: 'claudia.mbah@airlipay.cm',
      account_status: 'PENDING',
      activation_date: null,
    },
    addresses: {
      primary_phone_number: '+237 655 20 40 60',
      secondery_phone_number: '',
      street: 'Molyko',
      city: 'Buea',
      region: 'southwest',
    },
    created_at: '2026-10-20T09:00:00.000Z',
  },
];

const clients = [
  {
    id: 1,
    name: 'Penda Logistics',
    industry: 'Freight & logistics',
    tax_id: 'M0801224587',
    next_payment_date: '2026-10-28T00:00:00.000Z',
    client_commision: 2.5,
    bank: 'afriland_first_bank',
    bankAccountNumber: '10091005121',
    accounts: { email: 'finance@penda.cm', account_status: 'ACTIVE', activation_date: '2025-03-04T08:00:00.000Z' },
    addresses: {
      primary_phone_number: '+237 677 10 44 20',
      secondery_phone_number: '',
      street: 'Zone industrielle de Bassa',
      city: 'Douala',
      region: 'littoral',
    },
    created_at: '2025-02-12T09:00:00.000Z',
  },
  {
    id: 2,
    name: 'Kribi Marine Services',
    industry: 'Maritime services',
    tax_id: 'M0908822114',
    next_payment_date: '2026-10-29T00:00:00.000Z',
    client_commision: 2,
    bank: 'ecobank',
    bankAccountNumber: '10092004412',
    accounts: { email: 'payroll@kribimarine.cm', account_status: 'ACTIVE', activation_date: '2025-04-11T08:00:00.000Z' },
    addresses: {
      primary_phone_number: '+237 677 11 22 33',
      secondery_phone_number: '',
      street: 'Port de Kribi',
      city: 'Kribi',
      region: 'south',
    },
    created_at: '2025-03-10T09:00:00.000Z',
  },
  {
    id: 3,
    name: 'Mont Fébé Hospitality',
    industry: 'Hospitality',
    tax_id: 'M0209988771',
    next_payment_date: '2026-10-30T00:00:00.000Z',
    client_commision: 2.5,
    bank: 'bicec',
    bankAccountNumber: '10093005518',
    accounts: { email: 'finance@montfebe.cm', account_status: 'PENDING', activation_date: null },
    addresses: {
      primary_phone_number: '+237 677 55 66 77',
      secondery_phone_number: '',
      street: 'Mont Fébé',
      city: 'Yaoundé',
      region: 'centre',
    },
    created_at: '2025-06-02T09:00:00.000Z',
  },
  {
    id: 4,
    name: 'Sahel Agro Group',
    industry: 'Agribusiness',
    tax_id: 'M0701122334',
    next_payment_date: '2026-10-31T00:00:00.000Z',
    client_commision: 3,
    bank: 'cbc',
    bankAccountNumber: '10094006618',
    accounts: { email: 'operations@sahelagro.cm', account_status: 'ACTIVE', activation_date: '2025-07-20T08:00:00.000Z' },
    addresses: {
      primary_phone_number: '+237 655 21 21 21',
      secondery_phone_number: '',
      street: 'Quartier Administratif',
      city: 'Garoua',
      region: 'north',
    },
    created_at: '2025-07-01T09:00:00.000Z',
  },
  {
    id: 5,
    name: 'Douala Digital',
    industry: 'Technology',
    tax_id: 'M0405566778',
    next_payment_date: '2026-11-01T00:00:00.000Z',
    client_commision: 2,
    bank: 'equity_bank',
    bankAccountNumber: '10095007718',
    accounts: { email: 'team@doualadigital.cm', account_status: 'ACTIVE', activation_date: '2025-09-01T08:00:00.000Z' },
    addresses: {
      primary_phone_number: '+237 699 44 55 66',
      secondery_phone_number: '',
      street: 'Akwa',
      city: 'Douala',
      region: 'littoral',
    },
    created_at: '2025-08-14T09:00:00.000Z',
  },
  {
    id: 6,
    name: 'Bamenda Health Co.',
    industry: 'Healthcare',
    tax_id: 'M0308899001',
    next_payment_date: '2026-11-02T00:00:00.000Z',
    client_commision: 2.5,
    bank: 'ubc',
    bankAccountNumber: '10096008818',
    accounts: { email: 'finance@bamendahealth.cm', account_status: 'ACTIVE', activation_date: '2025-10-10T08:00:00.000Z' },
    addresses: {
      primary_phone_number: '+237 670 12 12 12',
      secondery_phone_number: '',
      street: 'Commercial Avenue',
      city: 'Bamenda',
      region: 'northwest',
    },
    created_at: '2025-09-22T09:00:00.000Z',
  },
];

const profiles = [
  ['Awa Fongang', 'FREIGHT', 'MTN', '677427321', 'ACTIVE', 240000],
  ['Brice Tchoumi', 'MARINE', 'MTN', '655180912', 'ACTIVE', 195000],
  ['Marie-Claire Ewane', 'HOSPITALITY', 'ORANGE', '699102244', 'PENDING', 180000],
  ['Emmanuel Nfor', 'AGRO', 'MTN', '670998341', 'ACTIVE', 142500],
  ['Larissa Etoundi', 'DIGITAL', 'ORANGE', '655229901', 'ACTIVE', 88750],
  ['Serge Mbarga', 'FREIGHT', 'MTN', '677881750', 'BLOCKED', 145000],
  ['Aaliyah Njoya', 'HOSPITALITY', 'ORANGE', '690334412', 'DEACTIVATED', 30000],
  ['Patrick Fotso', 'MARINE', 'MTN', '680772210', 'ACTIVE', 120000],
  ['Gérard Ndzana', 'FREIGHT', 'MTN', '677002718', 'ACTIVE', 155000],
  ['Yvonne Atangana', 'FREIGHT', 'ORANGE', '699881204', 'ACTIVE', 210000],
  ['Marcel Ebode', 'MARINE', 'MTN', '690112290', 'PENDING', 130000],
  ['Sandrine Fokou', 'DIGITAL', 'MTN', '677661518', 'ACTIVE', 170000],
];

const users = profiles.map(([name, employerKey, operator, phone, status, salary], index) => {
  const employerIndex = { FREIGHT: 0, MARINE: 1, HOSPITALITY: 2, AGRO: 3, DIGITAL: 4, HEALTH: 5 }[employerKey];
  const client = clients[employerIndex];
  const id = index + 11;
  return {
    id,
    name,
    employee_id: `EMP-${10482 + index}`,
    base_salary: salary,
    dob: `199${index % 9}-04-12`,
    sex: index % 2 ? 'M' : 'F',
    client_id: client.id,
    clients: { id: client.id, name: client.name },
    client_name: client.name,
    accounts: {
      email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@${client.accounts.email.split('@')[1]}`,
      account_status: status,
      activation_date: status === 'PENDING' ? null : '2025-03-04T08:00:00.000Z',
    },
    addresses: {
      primary_phone_number: `+237 ${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 7)} ${phone.slice(7)}`,
      secondery_phone_number: index % 4 === 0 ? '+237 677 00 11 22' : '',
      street: `${12 + index} Rue des Palmiers`,
      city: client.addresses.city,
      region: client.addresses.region,
    },
    created_at: `2026-0${(index % 9) + 1}-0${(index % 8) + 1}T09:00:00.000Z`,
    user_mobile_money_accounts:
      index === 6
        ? []
        : [{ id: 500 + index, operator, phone_number: `+237${phone}`, is_primary: true }],
  };
});

const txSeeds = [
  ['WITHDRAW', 'SUCCESS', 45000, 2250, 11, 'MTN', '677427321', 0],
  ['WITHDRAW', 'SUCCESS', 20000, 1000, 12, 'ORANGE', '655180912', 1],
  ['WITHDRAW', 'FAILED', 80000, 4000, 13, 'ORANGE', '699102244', 2],
  ['DEPOSIT', 'SUCCESS', 25000000, 0, 11, 'MTN', '677427321', 3],
  ['WITHDRAW', 'SUCCESS', 150000, 7500, 14, 'MTN', '670998341', 4],
  ['WITHDRAW', 'PENDING', 60000, 3000, 15, 'ORANGE', '655229901', 5],
  ['WITHDRAW', 'SUCCESS', 90000, 4500, 16, 'MTN', '677881750', 6],
  ['WITHDRAW', 'SUCCESS', 35000, 1750, 11, 'MTN', '677427321', 7],
  ['WITHDRAW', 'FAILED', 30000, 1500, 11, 'MTN', '677427321', 8],
  ['WITHDRAW', 'SUCCESS', 25000, 1250, 11, 'MTN', '677427321', 9],
  ['WITHDRAW', 'SUCCESS', 45000, 2250, 18, 'MTN', '670772210', 10],
  ['DEPOSIT', 'SUCCESS', 26500000, 0, 19, 'ORANGE', '677002718', 11],
  ['WITHDRAW', 'SUCCESS', 65000, 3250, 20, 'ORANGE', '699881204', 12],
  ['WITHDRAW', 'SUCCESS', 120000, 6000, 21, 'MTN', '690112290', 13],
  ['WITHDRAW', 'PENDING', 40000, 2000, 22, 'MTN', '677661518', 14],
  ['WITHDRAW', 'SUCCESS', 50000, 2500, 11, 'MTN', '677427321', 15],
  ['WITHDRAW', 'SUCCESS', 30000, 1500, 11, 'MTN', '677427321', 16],
];

const transactions = txSeeds.map(([transaction_type, status, amount, fees, userId, operator, phone, daysAgo], index) => {
  const date = new Date(Date.UTC(2026, 9, 23, 9, 42));
  date.setUTCDate(date.getUTCDate() - daysAgo);
  date.setUTCHours(9 + (index % 8), (index * 13) % 60, 0, 0);
  const oldBalance = 400000 - index * 12000;
  return {
    id: 9000 + index,
    user_id: userId,
    transaction_type,
    status,
    amount,
    fees,
    old_balance: transaction_type === 'WITHDRAW' ? oldBalance : 0,
    new_balance: transaction_type === 'WITHDRAW' ? oldBalance - amount - fees : amount,
    execution_date: date.toISOString(),
    created_at: date.toISOString(),
    phone_number: phone,
    operator,
    reference: `${transaction_type === 'DEPOSIT' ? 'FND' : 'TXN'}-${(0x8f2a91 + index * 239).toString(16).toUpperCase().slice(0, 6)}`,
  };
});

const invoices = Array.from({ length: 9 }).map((_, index) => {
  const id = 1042 - index;
  const client = clients[index % clients.length];
  const totalAmount = [4280000, 1960000, 820000, 3365000, 1148000, 2460000, 4120000, 980000, 640000][index];
  const totalFees = Math.round(totalAmount * 0.025);
  const taxes = Math.round(totalAmount * 0.009);
  const from = new Date(Date.UTC(2026, 9, 1, 0, 0));
  from.setUTCDate(from.getUTCDate() - index * 5);
  const to = new Date(from);
  to.setUTCDate(to.getUTCDate() + 14);
  return {
    id,
    invoice_number: `INV-2026-${id}`,
    client_id: client.id,
    client: { ...client },
    status: index === 0 ? 'TREATED' : index === 3 ? 'NOT_TREATED' : index % 3 === 0 ? 'TREATED' : index % 4 === 0 ? 'PENDING' : 'TREATED',
    totalAmount,
    totalFees,
    taxes,
    from: from.toISOString(),
    to: to.toISOString(),
    created_at: new Date(to.getTime() + 86400000).toISOString(),
  };
});

function payPeriodsFor(userId) {
  const userTransactions = transactions.filter((transaction) => transaction.user_id === userId);
  return [
    {
      id: 1,
      from: '2026-10-01T00:00:00.000Z',
      to: '2026-10-15T23:59:59.000Z',
      transactions: userTransactions,
    },
    {
      id: 2,
      from: '2026-09-16T00:00:00.000Z',
      to: '2026-09-30T23:59:59.000Z',
      transactions: userTransactions.slice(0, 2),
    },
  ];
}

function loginPayload(username) {
  const lower = String(username || '').toLowerCase();
  if (lower.includes('client')) {
    return {
      access_token: 'mock-client-token',
      data: { roles: ['CLIENT'], clients: [{ ...clients[0], accounts: { ...clients[0].accounts, email: 'finance@penda.cm' } }] },
    };
  }
  if (lower.includes('employee') || lower.includes('user')) {
    return {
      access_token: 'mock-user-token',
      data: { roles: ['USER'], users: [{ ...users[0] }] },
    };
  }
  return {
    access_token: 'mock-admin-token',
    data: { roles: ['ADMIN'], admins: [{ ...admins[0] }] },
  };
}

function send(res, status, data) {
  const body = data === undefined ? '' : JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204);

  const url = new URL(req.url, `http://localhost:${port}`);
  const path = url.pathname.replace(/\/+$/, '');
  const segments = path.split('/').filter(Boolean);
  const body = req.method === 'GET' ? null : await parseBody(req);

  if (req.method === 'POST' && path === '/auth/login') {
    return send(res, 200, loginPayload(body?.username));
  }

  if (req.method === 'GET' && path === '/admin/dashboard/metrics') {
    return send(res, 200, {
      admins: { active: 2, pending: 1, deactivated: 0, blocked: 0 },
      clients: { active: 5, pending: 1, deactivated: 0, blocked: 0 },
      users: { active: 8, pending: 2, deactivated: 1, blocked: 1 },
      transactions: { all: transactions.length, success: 12, failed: 2 },
      invoices: { paid: 6, unpaid: 3 },
    });
  }

  if (req.method === 'GET' && segments[0] === 'users') {
    if (segments.length === 1) return send(res, 200, users);
    const user = users.find((entry) => String(entry.id) === segments[1]);
    if (!user) return send(res, 404, { message: 'Employee not found' });
    if (segments[2] === 'airlipay-balance') return send(res, 200, { balance: 184500 });
    if (segments[2] === 'pay-periods') return send(res, 200, payPeriodsFor(user.id));
    if (segments[2] === 'list-banks') {
      return send(res, 200, [
        { id: 1, bank_name: 'Afriland First Bank', account_number: '•••• 4821', balance: 25000000 },
      ]);
    }
    return send(res, 200, user);
  }

  if (req.method === 'GET' && segments[0] === 'client') {
    if (segments.length === 1) return send(res, 200, clients);
    const client = clients.find((entry) => String(entry.id) === segments[1]);
    if (!client) return send(res, 404, { message: 'Client not found' });
    return send(res, 200, client);
  }

  if (req.method === 'GET' && segments[0] === 'admin') {
    if (segments.length === 1) return send(res, 200, admins);
    const admin = admins.find((entry) => String(entry.id) === segments[1]);
    if (!admin) return send(res, 404, { message: 'Admin not found' });
    return send(res, 200, admin);
  }

  if (req.method === 'GET' && path === '/airlipay-balance/transactions') {
    return send(res, 200, transactions);
  }

  if (req.method === 'GET' && segments[0] === 'invoice') {
    if (segments.length === 1) return send(res, 200, invoices);
    const invoice = invoices.find((entry) => String(entry.id) === segments[1]);
    if (!invoice) return send(res, 404, { message: 'Invoice not found' });
    if (segments[2] === 'transactions') {
      const clientUserIds = new Set(
        users.filter((user) => user.client_id === invoice.client_id).map((user) => String(user.id))
      );
      const rows = transactions
        .filter(
          (transaction) =>
            transaction.transaction_type === 'WITHDRAW' && clientUserIds.has(String(transaction.user_id))
        )
        .slice(0, 7)
        .map((transaction) => ({ ...transaction }));
      return send(res, 200, rows.length ? rows : transactions.filter((t) => t.transaction_type === 'WITHDRAW').slice(0, 4));
    }
    return send(res, 200, invoice);
  }

  if (req.method === 'PUT' && segments[0] === 'invoice' && segments[2] === 'update-status') {
    const invoice = invoices.find((entry) => String(entry.id) === segments[1]);
    if (!invoice) return send(res, 404, { message: 'Invoice not found' });
    if (body?.status) invoice.status = body.status;
    return send(res, 200, invoice);
  }

  if (req.method === 'POST' && segments[0] === 'users') {
    return send(res, 201, { id: 99, ...body });
  }

  if (req.method === 'POST' && segments[0] === 'client') {
    return send(res, 201, { id: 99, ...body });
  }

  if (req.method === 'POST' && segments[0] === 'admin') {
    return send(res, 201, { id: 99, ...body });
  }

  if (['PATCH', 'PUT'].includes(req.method) && segments[0]) {
    return send(res, 200, { id: Number(segments[1]) || segments[1], ...body });
  }

  if (req.method === 'DELETE') {
    return send(res, 200, { success: true, at: now });
  }

  return send(res, 404, { message: `Mock API has no route for ${req.method} ${path}` });
});

server.listen(port, () => {
  console.log(`Mock AirliPay API listening on http://localhost:${port}`);
});
