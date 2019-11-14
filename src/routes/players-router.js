import NProgress from "nprogress";
import store from "@/store";

export default [
  {
    path: "/players",
    name: "all-players",
    component: () => import("@/views/players/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch("fetchPlayers").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/players/create",
    name: "create-player",
    component: () => import("@/views/players/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchInputLanguges").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/players/:id",
    name: "get-player",
    component: () => import("@/views/players/_id.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      const { id } = to.params;
      NProgress.start();
      store.dispatch("fetchPlayer", id).then(() => {
        store.dispatch("fetchInputLanguges").then(() => {
          NProgress.done();
          next();
        });
        // NProgress.done();
        // next();
      });
    }
  },
  {
    path: "/players/:id/edit",
    name: "update-player",
    component: () => import("@/views/players/edit.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      const { id } = to.params;
      store.dispatch("fetchPlayer", id).then(() => {
        store.dispatch("fetchInputLanguges").then(() => {
          NProgress.done();
          next();
        });
      });
    }
  }
];
