import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/song-books",
    name: "all-song-books",
    component: () => import("@/views/song-books/Index.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchSongbooks").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/song-books/create",
    name: "create-song-book",
    component: () => import("@/views/song-books/create.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    }
  },
  {
    path: "/song-books/:id",
    name: "view-song-book",
    component: () => import("@/views/song-books/_id.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      const { id } = to.params;
      NProgress.start();
      store.dispatch("fetchSongbook", id).then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/song-books/:id/edit",
    name: "edit-song-book",
    component: () => import("@/views/song-books/edit.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      const { id } = to.params;
      store.dispatch("fetchSongbook", id).then(() => {
        NProgress.done();
        next();
      });
    }
  }
];
