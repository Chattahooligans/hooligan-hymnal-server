import axios from "axios";
import store from "../store";
// const $http = axios.create({
//   timeout: 1000
// });

// $http.defaults.headers.common["x-api-key"] = store.state.API_KEY;
// if (process.env.NODE_ENV !== "production") {
//   $http.defaults.baseURL = "//localhost:5000";
// }

// const userString = localStorage.getItem("user");
// if (userString) {
//   // console.log(store);
//   // const userData = JSON.parse(userString);
//   // store.dispatch('setUserData', userData);
// }

// $http.interceptors.response.use(
//   response => response,
//   error => {
//     console.log(error.response);
//     // if (error.response.status === 401) {
//     //   this.$swal({
//     //     title: 'Your session has expired please log back in.',
//     //     icon: 'danger'
//     //   }).then(() => {
//     //     this.$store.dispatch('logout');
//     //   });
//     // }
//     // return Promise.reject(error);
//   }
// );

// export default $http;
