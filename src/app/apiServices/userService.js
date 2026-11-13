import axios from "./axiosConfig";
import { getToken } from '../../lib/auth/session';

export async function createUser(data) {
  const token = getToken();
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post(`/users`, data);
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
