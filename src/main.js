import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import "./registerServiceWorker";
import VueMeta from "vue-meta";
// import axios from '@/services/api-service';
import VueSweetalert2 from "vue-sweetalert2";
import { Plugin } from "vue-fragment";
import VueFormGenerator from "vue-form-generator";
import "nprogress/nprogress.css";
import Multiselect from "vue-multiselect";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faCode,
  faParagraph,
  faHeading,
  faListUl,
  faListOl,
  faQuoteLeft,
  faRulerHorizontal,
  faUndo,
  faRedo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Layout from "@/layouts/Layout";
import BaseInput from "@/components/BaseInput";
import BaseRichText from "@/components/BaseRichText";
import BaseSelect from "@/components/BaseSelect";

Vue.config.productionTip = false;

import "sweetalert2/dist/sweetalert2.all";
import "@/assets/css/tailwind.css";

library.add(
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faCode,
  faParagraph,
  faHeading,
  faListUl,
  faListOl,
  faQuoteLeft,
  faRulerHorizontal,
  faUndo,
  faRedo
);

Vue.use(VueSweetalert2);
Vue.use(Plugin);
Vue.component("Layout", Layout);
Vue.component("multiselect", Multiselect);
Vue.component("BaseInput", BaseInput);
Vue.component("base-rich-text", BaseRichText);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("BaseSelect", BaseSelect);
Vue.use(VueFormGenerator);
Vue.use(VueMeta);

new Vue({
  created() {
    // document.body.classList.add("min-h-screen");
    axios.defaults.headers.common["x-api-key"] = process.env.VUE_APP_API_KEY;
    if (process.env.NODE_ENV !== "production") {
      axios.defaults.baseURL = "//localhost:5000";
    }
    // axios.defaults.timeout = 5000;
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
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("SET_USER_DATA", userData);
      this.$store.dispatch("authCheck");
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
