import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

function authorize() {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function getMyServiceCharge() {
  authorize();
  return await axios.get('/service-charge/me');
}

export async function getClientServiceCharge(clientId) {
  authorize();
  return await axios.get(`/service-charge/client/${clientId}`);
}

export async function updateClientServiceCharge(data) {
  authorize();
  const { clientId, employeeRate, availableWagePercent, monthlyFixedFee } = data;
  return await axios.put(`/service-charge/client/${clientId}`, {
    employeeRate,
    availableWagePercent,
    monthlyFixedFee,
  });
}
