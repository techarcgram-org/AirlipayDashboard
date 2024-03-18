import axios from "axios";

console.log("base URL", process.env.NEXT_PUBLIC_BASE_URL);
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default axios;
