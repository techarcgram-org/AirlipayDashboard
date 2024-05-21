import axios from "./axiosConfig";

export async function createAdmin(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.post(`/admin`, data);
}

export async function getAdmins() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin`);
}

export async function getAdmin(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin/${id}`);
}

export async function editAdmin(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/admin/${data.id}`, data);
}

export async function deleteAdmin(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.delete(`/admin/${id}`);
}
