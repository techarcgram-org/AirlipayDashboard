import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

export async function createAdmin(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post(`/admin`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getAdmins() {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin`);
}

export async function getAdmin(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin/${id}`);
}

export async function editAdmin(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/admin/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteAdmin(id) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.delete(`/admin/${id}`);
}
