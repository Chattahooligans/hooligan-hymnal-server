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
    }
  },
  actions: {
    logout(context, payload) {
      context.commit("logout", payload);
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.token;
    }
  }
});
