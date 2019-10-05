import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSwal from "vue-swal";

import Layout from "@/layouts/Layout";

Vue.config.productionTip = false;

Vue.use(VueSwal);
Vue.component("Layout", Layout);

new Vue({
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    axios.defaults.baseURL = "//localhost:5000";
    // axios.defaults.headers["api-key"] = ""
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          this.$swal({
            title: "Your session has expired please log back in.",
            icon: "danger"
          }).then(() => {
            this.$store.dispatch("logout");
          });
        }
        return Promise.reject(error);
      }
    );
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
