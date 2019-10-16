import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/push-tokens",
    name: "all-push-tokens",
    component: () => import("@/views/push-notifications/Index.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch("fetchPushTokens").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/push-tokens/create",
    name: "create-push-tokens",
    component: () => import("@/views/push-notifications/create.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  },
  {
    path: "/push-tokens/:id",
    name: "push-token",
    component: () => import("@/views/push-notifications/_id.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      const { id } = routeTo.params;
      NProgress.start();
      store.dispatch("fetchPushToken", id).then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/push-token/:id/edit",
    name: "edit-push-token",
    component: () => import("@/views/push-notifications/edit.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      const { id } = routeTo.params;
      NProgress.start();
      store.dispatch("fetchPushToken", id).then(() => {
        NProgress.done();
        next();
      });
    }
  }
];
