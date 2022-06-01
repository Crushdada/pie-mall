import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'default-passive-events';
import './styles/element-variables.scss'
// 在此处import无法全局注册Scss变量，需要在vite.config中全局配置
// import './styles/base.scss'
Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueLazyload);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
