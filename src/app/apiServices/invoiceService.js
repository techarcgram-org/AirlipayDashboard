import axios from "./axiosConfig";

export async function getInvoices() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/invoice`);
}

export async function getInvoiceTransactions(id) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/invoice/${id}/transactions`);
}

export async function editInvoice(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/invoice/${data.id}/update-status`, data);
}


