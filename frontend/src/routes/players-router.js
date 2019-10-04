export default [
  {
    path: "/players",
    name: "all-players",
    component: () => import("@/views/players/Index.vue"),
    meta: {
      requiresAuth: true,
      rostersAllowed: true
    }
  }
];
