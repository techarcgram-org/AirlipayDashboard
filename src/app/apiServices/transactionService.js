import axios from "./axiosConfig";

export async function getTransactions() {
  return await axios.get(`/airlipay-balance/transactions`, {
    "status": "SUCCESS",
    "type": "DEPOSIT",
    "page": 1,
    "pageSize": 50
  });
}

