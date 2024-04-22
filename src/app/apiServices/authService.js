import axios from "./axiosConfig";

export async function login(data) {
  console.log("jkldsf", axios.defaults);
  return await axios.post(`auth/login`, data);
}
