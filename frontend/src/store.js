import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: {}
  },
  mutations: {
    logout(state) {
      localStorage.removeItem("token");
      state.token = "";
    },
    getUser(state) {
      this.$axios.get("/api/users/me").then(({ data }) => {
        state.user = data;
      });
    }
  },
  actions: {
    logout(context, payload) {
      context.commit("logout", payload);
    },
    getUser(context) {
      context.commit("getUser");
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.token;
    }
  }
});
