import axios from './axiosConfig';

export async function getData() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/admin/dashboard/metrics`);
}
