import axios from "./axiosConfig";

export async function getTransactions(data) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return await axios.get(`/airlipay-balance/transactions`, {
    "status": "SUCCESS",
    "type": data.txnType || "",
    "page": 1,
    "pageSize": 50
  });
}

