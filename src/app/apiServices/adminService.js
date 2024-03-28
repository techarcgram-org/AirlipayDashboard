import axios from "./axiosConfig";

export async function createAdmin(data) {
  return await axios.post(`/admins`, data);
}

export async function getAdmins() {
  return await axios.get(`/admins`);
}

export async function getAdmin(id) {
  return await axios.get(`/admins/${id}`);
}

export async function editAdmin(data) {
  return await axios.patch(`/admins/${data.id}`, data);
}

export async function deleteAdmin(id) {
  return await axios.delete(`/admins/${id}`);
}
