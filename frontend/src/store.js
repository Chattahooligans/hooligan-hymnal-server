import Vue from "vue";
import Vuex from "vuex";
import $http from "@/services/api-service";
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    global_message: {
      type: null,
      message: null
    },
    players: null,
    player: null,
    songs: null,
    song: null,
    songbooks: null,
    rosters: null,
    roster: null,
    goalkeepersnicknames: null,
    goalkeepersnickname: null,
    foes: null,
    foe: null,
    users: null,
    single_user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      $http.defaults.headers.common[
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
    },
    GET_ALL_SONGS(state, data) {
      state.songs = data;
    },
    GET_SONG(state, data) {
      state.song = data;
    },
    GET_ALL_SONGBOOKS(state, data) {
      state.songbooks = data;
    },
    GET_ALL_ROSTERS(state, data) {
      state.rosters = data;
    },
    GET_ALL_GOALKEEPERS_NICKNAMES(state, data) {
      state.goalkeepersnicknames = data;
    },
    GET_GOALKEEPERS_NICKNAME(state, data) {
      state.goalkeepersnickname = data;
    }
  },
  actions: {
    register({ commit }, credentials) {
      return $http.post("/api/users/register", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    login({ commit }, credentials) {
      return $http.post("/api/users/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    setUserData({ commit }, data) {
      commit("SET_USER_DATA", data);
    },
    global_message({ commit }, message) {
      commit("SET_GLOBAL_MESSAGE", message);
    },
    fetchPlayers({ commit }) {
      return $http.get(`/api/players`).then(({ data }) => {
        commit("GET_ALL_PLAYERS", data);
      });
    },
    fetchPlayer({ commit }, id) {
      return $http.get(`/api/players/${id}`).then(({ data }) => {
        commit("GET_PLAYER", data);
      });
    },
    fetchSongs({ commit }) {
      return $http.get(`/api/songs`).then(({ data }) => {
        commit("GET_ALL_SONGS", data);
      });
    },
    fetchSong({ commit }, id) {
      return $http.get(`/api/song/${id}`).then(({ data }) => {
        commit("GET_SONG", data);
      });
    },
    fetchSongbooks({ commit }) {
      return $http.get(`/api/songbook`).then(({ data }) => {
        commit("GET_ALL_SONGBOOKS", data);
      });
    },
    fetchRosters({ commit }) {
      return $http.get(`/api/roster`).then(({ data }) => {
        commit("GET_ALL_ROSTERS", data);
      });
    },
    fetchGoalkeepersNicknames({ commit }) {
      return $http.get(`/api/goalkeeperNicknames`).then(({ data }) => {
        commit("GET_ALL_GOALKEEPERS_NICKNAMES", data);
      });
    },
    fetchNickname({ commit }, id) {
      return $http.get(`/api/goalkeeper`);
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
    },
    songs(state) {
      return state.songs;
    },
    song(state) {
      return state.song;
    },
    songbooks(state) {
      return state.songbooks;
    },
    goalkeepers(state) {
      return state.goalkeepersnicknames;
    }
  }
});
