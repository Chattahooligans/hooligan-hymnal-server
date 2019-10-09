import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import { Plugin } from "vue-fragment";
import VueFormGenerator from "vue-form-generator";
import BootstrapVue from "bootstrap-vue";

import Layout from "@/layouts/Layout";

Vue.config.productionTip = false;

import "sweetalert2/dist/sweetalert2.all";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue";

Vue.use(VueSweetalert2);
Vue.use(Plugin);
Vue.component("Layout", Layout);
Vue.use(VueFormGenerator);
Vue.use(BootstrapVue);

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
