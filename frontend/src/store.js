import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    global_message: {
      type: null,
      message: null
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    LOGOUT() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_GLOBAL_MESSAGE(state, message) {
      state.global_message = message;
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios.post("/api/users/register", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    login({ commit }, credentials) {
      return axios.post("/api/users/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    global_message({ commit }, message) {
      commit("SET_GLOBAL_MESSAGE", message);
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    user(state) {
      if (state.user) {
        return state.user.user;
      }
    },
    getMessage(state) {
      return state.global_message;
    }
  }
});
