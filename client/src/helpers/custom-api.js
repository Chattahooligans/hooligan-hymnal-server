import Axios from "axios";
import { getCookie } from "helpers/cookies";
let axios = Axios;
const token = localStorage.getItem("token");
const cookie = getCookie("refreshToken");
if (cookie) {
  axios.defaults.headers["Authorization"] = `Bearer ${token || cookie}`;
}

export { axios };
// if (localStorage.getItem("token") || )
// const axios = Axios.defaults.headers['Authorization'] =
