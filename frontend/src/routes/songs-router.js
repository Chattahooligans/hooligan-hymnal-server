export default [
  {
    path: "/songs",
    name: "all-songs",
    component: () => import("@/views/songs/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/songs/:id",
    name: "show-song",
    component: () => import("@/views/songs/_id.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/songs/create",
    name: "create-song",
    component: () => import("@/views/songs/create.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/songs/:id/edit",
    name: "edit-song",
    component: () => import("@/views/songs/edit.vue"),
    meta: {
      requiresAuth: true
    }
  }
];
