import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/songs",
    name: "all-songs",
    component: () => import("@/views/songs/Index.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchSongs").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/songs/create",
    name: "create-song",
    component: () => import("@/views/songs/create.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    }
  },
  {
    path: "/songs/:id",
    name: "show-song",
    component: () => import("@/views/songs/_id.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      const { id } = to.params;
      store.dispatch("fetchSong", id).then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/songs/:id/edit",
    name: "edit-song",
    component: () => import("@/views/songs/edit.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      const { id } = to.params;
      store.dispatch("fetchSong", id).then(() => {
        NProgress.done();
        next();
      });
    }
  }
];
