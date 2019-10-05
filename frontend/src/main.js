import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSwal from "vue-swal";
import config from "../../frontend-config";

Vue.config.productionTip = false;

Vue.use(VueSwal);

new Vue({
  created() {
    const userString = localStorage.getItem("user");
    console.log(config);
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
          this.$store.dispatch("global_message", {
            type: "danger",
            message: "Your session has expored please log back in."
          });
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
