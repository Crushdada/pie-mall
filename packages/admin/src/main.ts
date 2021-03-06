import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import ElementUI from 'element-ui';
import 'default-passive-events';
import VueAnimateNumber from 'vue-animate-number';
import './styles/element-variables.scss';
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
