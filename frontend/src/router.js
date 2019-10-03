import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
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
    path: "/users",
    name: "all-users",
    component: () => import("./views/users/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/songs",
    name: "all-songs",
    component: () => import("./views/songs/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/song-books",
    name: "all-song-books",
    component: () => import("./views/song-books/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/players",
    name: "all-players",
    component: () => import("./views/players/Index.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/rosters",
    name: "all-rosters",
    component: () => import("./views/rosters/Index.vue"),
    meta: {
      requiresAuth: true
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
      requiresAuth: true
    }
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem("token")) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
