import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import Home from "./views/Home.vue";

import songsRouter from "./routes/songs-router";
import userRouter from "@/routes/user-router";
import songBooksRouter from "@/routes/song-book-router";
import playerRouter from "@/routes/players-router";
import rosterRouter from "@/routes/roster-router";
// import goalKeeperNickname from "@/routes/goalkeepers-router";
import pushTokenRouter from "@/routes/push-notifications-router";
import notificationsRouter from "@/routes/notifications-router";

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
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue"),
    meta: {
      guest: true
    },
    beforeEnter(to, from, next) {
      NProgress.start();
      NProgress.done();
      next();
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
// routes = routes.concat(goalKeeperNickname);
routes = routes.concat(pushTokenRouter);
routes = routes.concat(notificationsRouter);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    if (!loggedIn) {
      next({
        path: "/login",
        params: to.fullPath
      });
    } else {
      const { user } = JSON.parse(localStorage.getItem("user"));
      if (
        to.matched.some(
          record => record.meta.songbookAllowed == user.songbookAllowed
        ) ||
        to.matched.some(
          record => record.meta.rosterAllowed == user.rosterAllowed
        ) ||
        to.matched.some(
          record => record.meta.foesAllowed == user.foesAllowed
        ) ||
        to.matched.some(
          record => record.meta.usersAllowed == user.usersAllowed
        ) ||
        to.matched.some(
          record =>
            record.meta.pushNotificationsAllowed ==
            user.pushNotificationsAllowed
        )
      ) {
        next();
      } else {
        next("/");
      }
      next();
    }
  }
  next();
});

export default router;
