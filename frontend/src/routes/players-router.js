export default [
  {
    path: "/players",
    name: "all-players",
    component: () => import("@/views/players/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  },
  {
    path: "/players/create",
    name: "create-player",
    component: () => import("@/views/players/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  },
  {
    path: "/players/:id",
    name: "get-player",
    component: () => import("@/views/players/_id.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  },
  {
    path: "/players/:id/edit",
    name: "update-player",
    component: () => import("@/views/players/edit.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  }
];
