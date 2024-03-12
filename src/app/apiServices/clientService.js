import axios from "./axiosConfig";

export async function createClient(data) {
  console.log("final data", data);
  axios.defaults.headers["Content-Type"] = "multipart/form-data";

  return await axios.post(`http://localhost:3001/client`, data);
}
