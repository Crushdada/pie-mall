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
  { path: '/goods', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/goods-zone/:id',
    name: 'goods-zone',
    component: () => import('../views/goods/GoodsZone.vue'),
  },
  {
    path: '/goods',
    name: 'goods-details',
    component: () => import('../views/goods/Goods.vue'),
    children: [
      {
        path: '/goods/:id',
        component: () => import('../views/goods/GoodsDetails.vue'),
      },
      {
        path: '/goods/success-tip',
        name: 'success-tip',
        component: () => import('../views/goods/Add2ShopCartSuccess.vue'),
      },
    ],
  },
  {
    path: '/shop-cart',
    name: 'shop-cart',
    component: () => import('../views/ShopCart.vue'),
  },
  {
    path: '/billing',
    name: 'billing-page',
    component: () => import('../views/BillingPage.vue'),
  },

  // 个人中心，以及订单等在一个页面
  // {
  //   path: '/user',
  //   name: 'user',
  //   component: () => import('../views/BillingPage.vue'),
  //   children: [
  //     {
  //       path: '/personal-center',
  //       name: 'personal-center',
  //       component: () => import('../views/PersonalCenter.vue'),
  //     },
  //     {
  //       path: '/messages',
  //       name: 'messages',
  //       component: () => import('../views/PersonalCenter.vue'),
  //     },
  //     {
  //       path: '/order',
  //       name: 'order',
  //       component: () => import('../views/PersonalCenter.vue'),
  //     },
  //     // ...
  //   ],
  // },
  {
    path: '/login',
    name: 'login',
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
