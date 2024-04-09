import axios from "./axiosConfig";

export async function getInvoices() {
  return await axios.get(`/invoice`);
}

export async function getClientInvoices(id) {
  return await axios.get(`/client/${id}/invoices`);
}
