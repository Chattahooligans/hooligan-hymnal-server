export default [
  {
    path: "/song-books",
    name: "all-song-books",
    component: () => import("@/views/song-books/Index.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    }
  }
];
