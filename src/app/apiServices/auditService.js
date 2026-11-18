import axios from './axiosConfig';
import { getToken } from '../../lib/auth/session';

export async function getAuditLogs(params = {}) {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const query = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query[key] = value;
    }
  });
  return await axios.get('/audit-logs', { params: query });
}
