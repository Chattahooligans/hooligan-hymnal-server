export default [
  {
    path: "/rosters",
    name: "all-rosters",
    component: () => import("@/views/rosters/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  },
  {
    path: "/rosters/create",
    name: "create-roster",
    component: () => import("@/views/rosters/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  }
];
