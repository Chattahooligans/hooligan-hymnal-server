import Vue from "vue";
import Vuex from "vuex";
import axios from "@/services/api-service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    global_message: {
      type: null,
      message: null
    },
    players: null,
    player: null
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
    },
    GET_ALL_PLAYERS(state, data) {
      state.players = data;
    },
    GET_PLAYER(state, data) {
      state.player = data;
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
    },
    fetchPlayers({ commit }) {
      return axios.get(`/api/players`).then(({ data }) => {
        commit("GET_ALL_PLAYERS", data);
      });
    },
    fetchPlayer({ commit }, id) {
      return axios.get(`/api/players/${id}`).then(({ data }) => {
        commit("GET_PLAYER", data);
      });
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
    },
    players(state) {
      return state.players;
    },
    player(state) {
      return state.player;
    }
  }
});
