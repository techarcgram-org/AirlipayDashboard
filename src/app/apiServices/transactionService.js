import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

export async function getTransactions(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/airlipay-balance/transactions?status=${data.status || ''}&type=${data.txnType || ''}&page=${1}&pageSize=${100}`);
}

