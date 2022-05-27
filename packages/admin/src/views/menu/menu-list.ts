/**
 * HomePage 商城管理模块列表
 * @export moduleMenu
 */
export const moduleMenu = [
  {
    moduleName: '用户管理',
    children: [
      {
        childPageName: '用户管理',
        path: '/user',
        name: 'users',
        component: 'User',
      },
      // { childPageName: '会员管理', path: '/vip', component: 'Vip' },
    ],
  },
  {
    moduleName: '商品管理',
    path: '/goods',
    children: [
      {
        childPageName: '商品列表',
        path: '/info',
        name: 'goods',
        component: 'GoodsInfo',
      },
    ],
  },
  {
    moduleName: '推广管理',
    path: '/promotion',
    children: [
      {
        childPageName: '秒杀活动',
        path: '/secKill',
        name: '',
        component: 'NewGoods',
      },
      {
        childPageName: '首页通知',
        path: '/notification',
        name: '',
        component: 'PromotionNotification',
      },
      {
        childPageName: '优惠券',
        path: '/Coupon',
        name: '',
        component: 'PromotionCoupon',
      },
    ],
  },
  {
    moduleName: '订单管理',
    path: '/order',
    children: [
      {
        childPageName: '订单列表',
        path: '',
        name: 'order',
        component: 'OrderList',
      },
    ],
  },
  {
    moduleName: '商城数据分析',
    path: '/dataAnalysis',
    children: [
      {
        childPageName: '商品数据分析',
        path: '/',
        name: 'data-visualization',
        component: 'DataVisualization',
      },
    ],
  },
];

/**
 * 初始页面(初始视图路由)
 */
export const initComRoute = {
  pageName: 'goods',
  component: 'GoodsInfo',
};

/**
 * 初始页面(初始视图路由)
 */
// export const initComRoute = {
//   PagePath: '/user',
//   component: 'User',
// };
