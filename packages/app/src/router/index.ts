import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 配置NProgress选项
NProgress.configure({ easing: 'ease', speed: 500, minimum: 0.1 });

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err: any) => err);
};

const routes: Array<RouteConfig> = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    // children: [
    // {
    //   path: '/personal/center',
    //   name: 'PersonalCenter',
    //   component: () => import('../views/PersonalCenter.vue'),
    //   // children: menuRoutes,
    // },
    // ],
  },
  {
    path: '/billing',
    name: 'billing-page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/BillingPage.vue'),
  },
  {
    path: '/shop-cart',
    name: 'shop-cart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/ShopCart.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: import.meta.env.BASE_URL,
  routes,
});

// 加载中显示进度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
