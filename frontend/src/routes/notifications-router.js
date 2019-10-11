import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/notifications",
    name: "all-notifications",
    component: () => import("@/views/notifications/Index.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch("fetchNotifications").then(() => {
        store.dispatch("fetchLatestNotification").then(() => {
          NProgress.done();
          next();
        });
      });
    }
  },
  {
    path: "/notifications/create",
    name: "create-notification",
    component: () => import("@/views/notifications/create.vue"),
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
    path: "/notifications/:id",
    name: "view-notification",
    component: () => import("@/views/notifications/_id.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      const { id } = routeTo.params;
      store.dispatch("fetchNotification", id).then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/notifications/:id/edit",
    name: "edit-notification",
    component: () => import("@/views/notifications/edit.vue"),
    meta: {
      requiresAuth: true,
      pushNotificationsAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      const { id } = routeTo.params;
      store.dispatch("fetchNotification", id).then(() => {
        NProgress.done();
        next();
      });
    }
  }
];
