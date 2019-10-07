import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import songsRouter from "./routes/songs-router";
import userRouter from "@/routes/user-router";
import songBooksRouter from "@/routes/song-book-router";
import playerRouter from "@/routes/players-router";
import rosterRouter from "@/routes/roster-router";

Vue.use(Router);

const baseRoutes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue"),
    meta: {
      guest: true
    }
  },
  {
    path: "/goalkeeper-nickname",
    name: "goalkeeper-nickname",
    component: () => import("./views/GoalkeepersNickname/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/foes",
    name: "all-foes",
    component: () => import("./views/foes/Index.vue"),
    meta: {
      requiresAuth: true,
      foesAllowed: true
    }
  }
];

let routes = baseRoutes.concat(songsRouter);
routes = routes.concat(userRouter);
routes = routes.concat(songBooksRouter);
routes = routes.concat(playerRouter);
routes = routes.concat(rosterRouter);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    if (!loggedIn) {
      next("/login");
    }
  }
  if (loggedIn) {
    const { user } = JSON.parse(loggedIn);
    console.log(user);
    if (
      to.matched.some(
        record => record.meta.songbookAllowed === user.songbookAllowed
      ) ||
      to.matched.some(record => record.meta.foesAllowed === user.foesAllowed) ||
      to.matched.some(
        record => record.meta.usersAllowed === user.usersAllowed
      ) ||
      to.matched.some(
        record => record.meta.rosterAllowed === user.rosterAllowed
      )
    ) {
      next();
    } else {
      next("/");
    }
  }
  next();
});

export default router;
