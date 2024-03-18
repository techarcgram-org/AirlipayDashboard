import axios from "./axiosConfig";

export async function createClient(data) {
  axios.defaults.headers["Content-Type"] = "multipart/form-data";

  return await axios.post(`/client`, data);
}
