import axios from './axiosConfig';

export async function getInvoices() {
<<<<<<< HEAD
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/invoice?status=${data.status || ''}&type=${data.txnType || ''}&page=${1}&pageSize=${100}`);
=======
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await axios.get(`/invoice`);
>>>>>>> 679d7517a0ec2cbe6a148e3df456d17bb002034f
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
<<<<<<< HEAD
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.patch(`/client/${data.id}/update-invoice-status`, data, {
    headers: {
      "Content-Type": 'application/json'
=======
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
>>>>>>> 679d7517a0ec2cbe6a148e3df456d17bb002034f
    }
  );
}
