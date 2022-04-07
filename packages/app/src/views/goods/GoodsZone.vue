<template>
  <div class="">
  <!-- 商品专区 -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/home/HeaderBar.vue';
import GoodsTabBar from '../../components/home/GoodsTabBar.vue';
import HomeCaroucel from '../../components/home/HomeCarousel.vue';
import PersonalRecoGoods from '../../components/home/PersonalRecoGoods.vue';
import GoodZones from '../../components/home/GoodZones.vue';
@Component({
  components: {
  },
})
export default class GoodsZone extends Vue {
  /** Computed*/
  // ===================================================================
  /** Hooks */
  // ===================================================================
  // Methods
  // ===================================================================

}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
</style>
