import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { VuexRootState } from '@types/vuex/root-state.interface';
import AuthModule from './auth.module';
import UserModule from './user.module';
import GoodsModule from './goods.module';
import OrderModule from './order.module';

import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);
const vuexLocal = new VuexPersistence<VuexRootState>({
  storage: window.localStorage,
});

const store = new Vuex.Store<VuexRootState>({
  modules: {
    [VuexModuleName.AUTH]: AuthModule,
    [VuexModuleName.USER]: UserModule,
    [VuexModuleName.GOODS]: GoodsModule,
    [VuexModuleName.ORDER]: OrderModule,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
// store.registerModule(VuexModuleName.AUTH, authModule);
// store.registerModule(VuexModuleName.USER, userModule);

// vue store type pollyfill
// this $store type problem is only subject to change when using vue3
/// <reference path="https://github.com/vuejs/vuex/releases/tag/v4.0.0-beta.1" />
Object.defineProperty(Vue.prototype, '$stock', {
  get(): Store<VuexRootState> {
    return this.$store;
  },
});
