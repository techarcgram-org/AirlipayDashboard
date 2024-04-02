import axios from "./axiosConfig";

export async function createClient(data) {
  axios.defaults.headers["Content-Type"] = "multipart/form-data";
  return await axios.post(`/client`, data);
}

export async function getClients() {
  return await axios.get(`/client`);
}

export async function getClient(id) {
  return await axios.get(`/client/${id}`);
}

export async function updateClient(data) {
  return await axios.patch(`/client/${data.id}`, data);
}

export async function deleteClient(id) {
  return await axios.delete(`/client/${id}`);
}
