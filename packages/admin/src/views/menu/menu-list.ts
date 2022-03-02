/**
 * HomePage 商城管理模块列表
 * @export moduleMenu
 */
export const moduleMenu = [
  {
    moduleName: '用户管理',
    children: [
      { childPageName: '用户管理', path: '/user', component: 'User' },
      { childPageName: '会员管理', path: '/vip', component: 'Vip' },
    ],
  },
  {
    moduleName: '商品管理',
    path: '/goods',
    children: [
      { childPageName: '商品列表', path: '/info', component: 'GoodsInfo' },
      {
        childPageName: '商品类目',
        path: '/category',
        component: 'GoodsCategory',
      },
      { childPageName: '商品上架', path: '/newGoods', component: 'NewGoods' },
    ],
  },
  {
    moduleName: '推广管理',
    path: '/promotion',
    children: [
      { childPageName: '秒杀活动', path: '/secKill', component: 'NewGoods' },
      {
        childPageName: '首页通知',
        path: '/notification',
        component: 'PromotionNotification',
      },
      {
        childPageName: '优惠券',
        path: '/Coupon',
        component: 'PromotionCoupon',
      },
    ],
  },
  {
    moduleName: '订单管理',
    path: '/order',
    children: [
      {
        childPageName: '待处理订单',
        path: '/pending',
        component: 'PendingOrder',
      },
      {
        childPageName: '已完成订单',
        path: '/completed',
        component: 'CompletedOrder',
      },
    ],
  },
  {
    moduleName: '商城数据分析',
    path: '/dataAnalysis',
    children: [
      {
        childPageName: '商品数据分析',
        path: '/goods',
        component: 'GoodsDataAnalysis',
      },
      {
        childPageName: '用户画像分析',
        path: '/userPortrait',
        component: 'UserPortraitAnalysis',
      },
    ],
  },
];

/**
 * 初始页面(初始视图路由)
 */
export const initComRoute = {
  PagePath: '/dataAnalysis/goods',
  component: 'GoodsDataAnalysis',
};
