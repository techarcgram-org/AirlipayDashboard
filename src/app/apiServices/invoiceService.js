import axios from './axiosConfig';

export async function getInvoices() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.get(`/invoice`);
}

export async function getInvoiceTransactions(id) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.get(`/invoice/${id}/transactions`);
}

export async function editInvoice(data) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const res = await axios.put(
    `/invoice/${data.id}/update-status`,
    { status: data.accountStatus },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return res;
}

export async function markInvoiceAsComplete(data) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log(data);
  console.log(`/client/invoice/${data.id}/update-invoice-status`);
  return await axios.put(
    `/client/${data.id}/update-invoice-status`,
    {
      status: data.status,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
