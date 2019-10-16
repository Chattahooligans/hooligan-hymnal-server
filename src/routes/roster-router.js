import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/rosters",
    name: "all-rosters",
    component: () => import("@/views/rosters/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      store.dispatch("fetchRosters").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/rosters/create",
    name: "create-roster",
    component: () => import("@/views/rosters/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  }
];
