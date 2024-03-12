import axios from "./axiosConfig";

export async function login(data) {
  return await axios.post(`http://localhost:3001/auth/login`, data);
}
