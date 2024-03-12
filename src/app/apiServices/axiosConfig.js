const axios = require("axios");

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default axios;
