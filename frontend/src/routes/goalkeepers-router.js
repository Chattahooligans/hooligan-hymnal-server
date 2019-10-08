export default [
  {
    path: "/goalkeeper-nickname",
    name: "goalkeeper-nickname",
    component: () => import("@/views/GoalkeepersNickname/Index.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  },
  {
    path: "/goalkeeper-nickname/create",
    name: "goalkeeper-nickname-create",
    component: () => import("@/views/GoalkeepersNickname/create.vue"),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    }
  }
];
