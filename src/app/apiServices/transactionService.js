import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

export async function getTransactions(data = {}) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const params = { page: 1, pageSize: 100 };
  if (data.status) params.status = data.status;
  if (data.txnType) params.type = data.txnType;
  return await axios.get('/airlipay-balance/transactions', { params });
}

