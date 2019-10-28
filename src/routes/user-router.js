import NProgress from "nprogress";
import store from "@/store";
export default [
  {
    path: "/users",
    name: "all-users",
    component: () => import("@/views/users/Index.vue"),
    meta: {
      requiresAuth: true,
      usersAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch("fetchUsers").then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: "/users/create",
    name: "create-user",
    component: () => import("@/views/users/create.vue"),
    meta: {
      requiresAuth: true,
      usersAllowed: true
    }
  },
  {
    path: "/users/:id",
    name: "view-user",
    component: () => import("@/views/users/_id.vue"),
    meta: {
      requiresAuth: true,
      usersAllowed: true
    }
  },
  {
    path: "/users/:id/edit",
    name: "edit-user",
    component: () => import("@/views/users/edit.vue"),
    meta: {
      requiresAuth: true,
      usersAllowed: true
    }
  },
  {
    path: "/profile",
    name: "my-profile",
    component: () => import("@/views/users/profile.vue"),
    meta: {
      requiresAuth: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  }
];
