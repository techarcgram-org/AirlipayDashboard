import axios from './axiosConfig';
import { getToken } from '../../lib/auth/session';

export async function createClient(data) {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers['Content-Type'] = 'multipart/form-data';
  return await axios.post(`/client`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getClients() {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.get(`/client`);
}

export async function getClient(id) {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.get(`/client/${id}`);
}

export async function updateClient(data) {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const returnData = await axios.put(`/client/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return returnData;
}

export async function deleteClient(id) {
  const token = getToken();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.delete(`/client/${id}`);
}
