import axios from "./axiosConfig";

export async function createUser(data) {
  return await axios.post(`/users`, data);
}

export async function getUsers() {
  return await axios.get(`/users`);
}

export async function getUser(id) {
  return await axios.get(`/users/${id}`);
}

export async function editUser(data) {
  return await axios.patch(`/users/${data.id}`, data);
}

export async function deleteUser(id) {
  return await axios.delete(`/users/${id}`);
}

export async function getBanks() {
  return await axios.get(`/users/list-user-banks`);
}

export async function getMomoAccounts() {
  return await axios.get(`/account-settings/list-user-momo-accounts`);
}

export async function getAirlipayBalance(id) {
  return await axios.get(`/users/${id}/airlipay-balance`);
}
