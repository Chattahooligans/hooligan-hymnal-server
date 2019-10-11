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
    single_user: null,
    pushTokens: null,
    pushToken: null,
    notifications: null,
    notification: null,
    latestNotification: null
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
    SET_ALL_PLAYERS(state, data) {
      state.players = data;
    },
    SET_PLAYER(state, data) {
      state.player = data;
    },
    SET_ALL_SONGS(state, data) {
      state.songs = data;
    },
    SET_SONG(state, data) {
      state.song = data;
    },
    SET_ALL_SONGBOOKS(state, data) {
      state.songbooks = data;
    },
    SET_ALL_ROSTERS(state, data) {
      state.rosters = data;
    },
    SET_ALL_GOALKEEPERS_NICKNAMES(state, data) {
      state.goalkeepersnicknames = data;
    },
    SET_GOALKEEPERS_NICKNAME(state, data) {
      state.goalkeepersnickname = data;
    },
    SET_PUSH_TOKENS(state, data) {
      state.pushTokens = data;
    },
    SET_PUSH_TOKEN(state, data) {
      state.pushToken = data;
    },
    SET_NOTIFICATIONS(state, data) {
      state.notifications = data;
    },
    SET_NOTIFICATION(state, data) {
      state.notification = data;
    },
    SET_LATEST_NOTIFICATION(state, data) {
      state.latestNotification = data;
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
        commit("SET_ALL_PLAYERS", data);
      });
    },
    fetchPlayer({ commit }, id) {
      return $http.get(`/api/players/${id}`).then(({ data }) => {
        commit("SET_PLAYER", data);
      });
    },
    fetchSongs({ commit }) {
      return $http.get(`/api/songs`).then(({ data }) => {
        commit("SET_ALL_SONGS", data);
      });
    },
    fetchSong({ commit }, id) {
      return $http.get(`/api/song/${id}`).then(({ data }) => {
        commit("SET_SONG", data);
      });
    },
    fetchSongbooks({ commit }) {
      return $http.get(`/api/songbook`).then(({ data }) => {
        commit("SET_ALL_SONGBOOKS", data);
      });
    },
    fetchRosters({ commit }) {
      return $http.get(`/api/roster`).then(({ data }) => {
        commit("SET_ALL_ROSTERS", data);
      });
    },
    fetchGoalkeepersNicknames({ commit }) {
      return $http.get(`/api/goalkeeperNicknames`).then(({ data }) => {
        commit("SET_ALL_GOALKEEPERS_NICKNAMES", data);
      });
    },
    // fetchNickname({ commit }, id) {
    //   // return $http.get(`/api/goalkeeper`);
    // }
    fetchPushTokens({ commit }) {
      return $http.get(`/api/pushToken`).then(({ data }) => {
        commit("SET_PUSH_TOKENS", data);
      });
    },
    fetchPushToken({ commit }, id) {
      return $http.get(`/api/pushToken/${id}`).then(({ data }) => {
        commit("SET_PUSH_TOKEN", data);
      });
    },
    fetchNotifications({ commit }) {
      return $http.get(`/api/notifications`).then(({ data }) => {
        commit("SET_NOTIFICATIONS", data);
      });
    },
    fetchNotification({ commit }, id) {
      return $http.get(`/api/notifications/${id}`).then(({ data }) => {
        commit("SET_NOTIFICATION", data);
      });
    },
    fetchLatestNotification({ commit }) {
      return $http.get(`/api/notifications/last`).then(({ data }) => {
        commit("SET_LATEST_NOTIFICATION", data);
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
