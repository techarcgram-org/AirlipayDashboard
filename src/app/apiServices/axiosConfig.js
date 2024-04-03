import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

if (typeof window !== "undefined" && window.localStorage) {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
