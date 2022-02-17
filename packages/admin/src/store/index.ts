import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { VuexRootState } from '@types/vuex/root-state.interface';
import authModule from './auth.module';
import userModule from './user.module';

Vue.use(Vuex);
const store = new Vuex.Store<VuexRootState>({});
export default store;
store.registerModule(VuexModuleName.AUTH, authModule);
store.registerModule(VuexModuleName.USER, userModule);

// vue store type pollyfill
// this $store type problem is only subject to change when using vue3
/// <reference path="https://github.com/vuejs/vuex/releases/tag/v4.0.0-beta.1" />
Object.defineProperty(Vue.prototype, '$stock', {
  get(): Store<VuexRootState> {
    return this.$store;
  },
});
