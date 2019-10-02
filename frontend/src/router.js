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
    component: () => import("./views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue")
  },
  {
    path: "/users",
    name: "all-users",
    component: () => import("./views/users/Index.vue")
  },
  {
    path: "/songs",
    name: "all-songs",
    component: () => import("./views/songs/Index.vue"),
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
  if (to.matched.some(record => record.meta.requiresAuth == true)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
