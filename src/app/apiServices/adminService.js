import axios from "./axiosConfig";

export async function createAdmin(data) {
  return await axios.post(`/admin`, data);
}

export async function getAdmins() {
  return await axios.get(`/admin`);
}

export async function getAdmin(id) {
  return await axios.get(`/admin/${id}`);
}

export async function editAdmin(data) {
  return await axios.patch(`/admin/${data.id}`, data);
}

export async function deleteAdmin(id) {
  return await axios.delete(`/admin/${id}`);
}
