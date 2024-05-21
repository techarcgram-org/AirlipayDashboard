import axios from "./axiosConfig";

export async function createUser(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post(`/users`, data);
}

export async function getUsers() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users`);
}

export async function getUser(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}`);
}

export async function editUser(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/users/${data.id}`, data);
}

export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.delete(`/users/${id}`);
}

export async function getBanks(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/list-banks`);
}

export async function getMomoAccounts(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/list-banks`);
}

export async function getAirlipayBalance(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/users/${id}/airlipay-balance`);
}
