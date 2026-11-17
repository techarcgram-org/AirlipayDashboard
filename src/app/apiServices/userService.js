import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

export async function createUser(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post(`/users`, data);
}

export async function bulkCreateUsers({ file, clientId } = {}) {
  if (!file) {
    throw new Error('Choose a CSV file to import.');
  }

  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const form = new FormData();
  if (clientId !== undefined && clientId !== null && clientId !== '') {
    form.append('clientId', String(clientId));
  }
  form.append('file', file, file.name);

  // Let the browser set the multipart boundary.
  return await axios.post(`/users/bulkCreate`, form);
}

export async function getUsers() {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users`);
}

export async function getUser(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}`);
}

export async function editUser(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/users/${data.id}`, data);
}

export async function deleteUser(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.delete(`/users/${id}`);
}

export async function getPayPeriods(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/pay-periods?page=${1}&limit=${30}`);
}

export async function getBanks(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/list-banks`);
}

export async function getMomoAccounts(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/list-banks`);
}

export async function getAirlipayBalance(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/airlipay-balance`);
}
