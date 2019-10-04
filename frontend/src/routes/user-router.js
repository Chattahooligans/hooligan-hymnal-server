export default [
  {
    path: "/users",
    name: "all-users",
    component: () => import("@/views/users/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/create",
    name: "create-user",
    component: () => import("@/views/users/create.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id",
    name: "view-user",
    component: () => import("@/views/users/_id.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/users/:id/edit",
    name: "edit-user",
    component: () => import("@/views/users/edit.vue"),
    meta: {
      requiresAuth: true
    }
  }
];
