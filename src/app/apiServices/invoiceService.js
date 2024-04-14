import axios from "./axiosConfig";

export async function getInvoices() {
  return await axios.get(`/invoice`);
}

export async function getInvoiceTransactions(id) {
  return await axios.get(`/invoice/${id}/transactions`);
}
