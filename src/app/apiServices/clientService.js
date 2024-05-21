import axios from "./axiosConfig";

export async function createClient(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers["Content-Type"] = "multipart/form-data";
  return await axios.post(`/client`, data);
}

export async function getClients() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/client`);
}

export async function getClient(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/client/${id}`);
}

export async function updateClient(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/client/${data.id}`, data);
}

export async function deleteClient(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.delete(`/client/${id}`);
}
