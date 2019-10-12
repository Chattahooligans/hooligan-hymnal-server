import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import axios from '@/services/api-service';
import VueSweetalert2 from "vue-sweetalert2";
import { Plugin } from "vue-fragment";
import VueFormGenerator from "vue-form-generator";
import "nprogress/nprogress.css";

import Layout from "@/layouts/Layout";

Vue.config.productionTip = false;

import "sweetalert2/dist/sweetalert2.all";
import "@/assets/css/tailwind.css";

Vue.use(VueSweetalert2);
Vue.use(Plugin);
Vue.component("Layout", Layout);
Vue.use(VueFormGenerator);

new Vue({
  created() {
    document.body.classList.add("min-h-screen");
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
    }
    if (process.env.NODE_ENV !== "production") {
      axios.defaults.baseURL = "//localhost:5000";
    }
    axios.defaults.timeout = 5000;
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
        if (error.response.status === 410) {
          const { key } = error.response.data;
          store.dispatch("fetchAPIKey", key);
          axios.defaults.headers.common["x-api-key"] = store.state.API_KEY;
        }
        return Promise.reject(error);
      }
    );
    axios.get(`/secret/___endpoint___`);
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
