'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUser,
  deleteUser,
  editUser,
  getAirlipayBalance,
  getBanks,
  getPayPeriods,
  getUser,
  getUsers,
} from '@/app/apiServices/userService';
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient,
} from '@/app/apiServices/clientService';
import {
  createAdmin,
  deleteAdmin,
  editAdmin,
  getAdmin,
  getAdmins,
} from '@/app/apiServices/adminService';
import { getTransactions } from '@/app/apiServices/transactionService';
import {
  editInvoice,
  getInvoiceTransactions,
  getInvoices,
} from '@/app/apiServices/invoiceService';
import { getData } from '@/app/apiServices/dashboradService';

export const queryKeys = {
  users: ['users'],
  user: (id) => ['users', String(id)],
  userBalance: (id) => ['users', String(id), 'balance'],
  userPayPeriods: (id) => ['users', String(id), 'pay-periods'],
  userBanks: (id) => ['users', String(id), 'banks'],
  clients: ['clients'],
  client: (id) => ['clients', String(id)],
  admins: ['admins'],
  admin: (id) => ['admins', String(id)],
  transactions: (filters = {}) => ['transactions', filters],
  invoices: ['invoices'],
  invoiceTransactions: (id) => ['invoices', String(id), 'transactions'],
  metrics: ['metrics'],
  profile: (role, id) => ['profile', role, String(id)],
};

function unwrap(response) {
  return response?.data;
}

export function useUsersQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => unwrap(await getUsers()),
    ...options,
  });
}

export function useUserQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: async () => unwrap(await getUser(id)),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useUserBalanceQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.userBalance(id),
    queryFn: async () => {
      try {
        return unwrap(await getAirlipayBalance(id));
      } catch {
        return null;
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useUserPayPeriodsQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.userPayPeriods(id),
    queryFn: async () => {
      try {
        return unwrap(await getPayPeriods(id));
      } catch {
        return null;
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useUserBanksQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.userBanks(id),
    queryFn: async () => {
      try {
        return unwrap(await getBanks(id));
      } catch {
        return null;
      }
    },
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useClientsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.clients,
    queryFn: async () => unwrap(await getClients()),
    ...options,
  });
}

export function useClientQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.client(id),
    queryFn: async () => unwrap(await getClient(id)),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useAdminsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.admins,
    queryFn: async () => unwrap(await getAdmins()),
    ...options,
  });
}

export function useAdminQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.admin(id),
    queryFn: async () => unwrap(await getAdmin(id)),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useTransactionsQuery(filters = {}, options = {}) {
  return useQuery({
    queryKey: queryKeys.transactions(filters),
    queryFn: async () =>
      unwrap(
        await getTransactions({
          status: filters.status || '',
          txnType: filters.type || '',
        })
      ),
    ...options,
  });
}

export function useInvoicesQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.invoices,
    queryFn: async () => unwrap(await getInvoices()),
    ...options,
  });
}

export function useInvoiceTransactionsQuery(id, options = {}) {
  return useQuery({
    queryKey: queryKeys.invoiceTransactions(id),
    queryFn: async () => unwrap(await getInvoiceTransactions(id)),
    enabled: Boolean(id) && (options.enabled ?? true),
    ...options,
  });
}

export function useMetricsQuery(options = {}) {
  return useQuery({
    queryKey: queryKeys.metrics,
    queryFn: async () => unwrap(await getData()),
    ...options,
  });
}

export function useProfileQuery(role, id, options = {}) {
  return useQuery({
    queryKey: queryKeys.profile(role, id),
    queryFn: async () => {
      if (role === 'ADMIN') return unwrap(await getAdmin(id));
      if (role === 'CLIENT') return unwrap(await getClient(id));
      return unwrap(await getUser(id));
    },
    enabled: Boolean(role && id) && (options.enabled ?? true),
    ...options,
  });
}

function useInvalidatingMutation(mutationFn, keys) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      keys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));
      queryClient.invalidateQueries({ queryKey: queryKeys.metrics });
      return result;
    },
  });
}

export function useCreateUserMutation() {
  return useInvalidatingMutation(createUser, [queryKeys.users]);
}

export function useUpdateUserMutation() {
  return useInvalidatingMutation(editUser, [queryKeys.users]);
}

export function useDeleteUserMutation() {
  return useInvalidatingMutation(deleteUser, [queryKeys.users]);
}

export function useCreateClientMutation() {
  return useInvalidatingMutation(createClient, [queryKeys.clients]);
}

export function useUpdateClientMutation() {
  return useInvalidatingMutation(updateClient, [queryKeys.clients]);
}

export function useDeleteClientMutation() {
  return useInvalidatingMutation(deleteClient, [queryKeys.clients]);
}

export function useCreateAdminMutation() {
  return useInvalidatingMutation(createAdmin, [queryKeys.admins]);
}

export function useUpdateAdminMutation() {
  return useInvalidatingMutation(editAdmin, [queryKeys.admins]);
}

export function useDeleteAdminMutation() {
  return useInvalidatingMutation(deleteAdmin, [queryKeys.admins]);
}

export function useUpdateInvoiceStatusMutation() {
  return useInvalidatingMutation(editInvoice, [queryKeys.invoices]);
}
