import axios from "axios";

if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "//localhost:5000";
}

export default axios;
