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

export async function editUser(data, id) {
  return await axios.patch(`/users/${id}"`, data);
}
