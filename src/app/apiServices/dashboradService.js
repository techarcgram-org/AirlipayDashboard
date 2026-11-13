import axios from './axiosConfig';
import { getToken } from '../../lib/auth/session';

export async function getData() {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin/dashboard/metrics`);
}
