import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueLazyload);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
