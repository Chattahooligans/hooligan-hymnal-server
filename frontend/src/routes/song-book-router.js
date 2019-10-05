export default [
  {
    path: "/song-books",
    name: "all-song-books",
    component: () => import("@/views/song-books/Index.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    }
  },
  {
    path: "/song-books/create",
    name: "create-song-book",
    component: () => import("@/views/song-books/create.vue"),
    meta: {
      requiresAuth: true,
      songbookAllowed: true
    }
  }
];
