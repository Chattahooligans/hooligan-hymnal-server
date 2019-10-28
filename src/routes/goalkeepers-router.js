import NProgress from 'nprogress';
import store from '@/store';
export default [
  {
    path: '/goalkeeper-nickname',
    name: 'goalkeeper-nickname',
    component: () => import('@/views/GoalkeepersNickname/Index.vue'),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      store.dispatch('fetchGoalkeepersNicknames').then(() => {
        NProgress.done();
        next();
      });
    }
  },
  {
    path: '/goalkeeper-nickname/create',
    name: 'goalkeeper-nickname-create',
    component: () => import('@/views/GoalkeepersNickname/create.vue'),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  },
  {
    path: '/goalkeeper-nickname/:id',
    name: 'get-nickname',
    component: () => import('@/views/GoalkeepersNickname/_id.vue'),
    meta: {
      requiresAuth: true,
      rosterAllowed: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      NProgress.start();
      NProgress.done();
      next();
    }
  }
];
