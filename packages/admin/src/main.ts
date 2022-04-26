import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events';
import '../src/styles/index.css';
import VueAnimateNumber from 'vue-animate-number';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueLazyload);
Vue.use(ElementUI);
Vue.use(VueAnimateNumber);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
