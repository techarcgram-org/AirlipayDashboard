import axios from "./axiosConfig";

export async function getTransactions(data) {
  return await axios.get(`/airlipay-balance/transactions`, {
    "status": "SUCCESS",
    "type": data.txnType,
    "page": 1,
    "pageSize": 50
  });
}

