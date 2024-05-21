import axios from "./axiosConfig";

export async function login(data) {
  return await axios.post(`auth/login`, data);
}
