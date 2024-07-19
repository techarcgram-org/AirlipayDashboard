import axios from './axiosConfig';

export async function login(data) {
  console.log(axios);
  return await axios.post(`auth/login`, data);
}
