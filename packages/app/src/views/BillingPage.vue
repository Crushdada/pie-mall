<template>
  <div class="billing-page">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height: 40px; padding: 0 160px" />
      <!-- body -->
      <main class="bg-gray-100 pb-10">
        <section class="main-section bg-white" style="padding: 0 160px">
          <!-- 顶部tab栏 + 搜索框 -->
          <goods-tab-bar class="tab-header" />
          <!-- 轮播图 -->
          <home-caroucel />
          <!-- 个性化推荐(图片组) -->
          <personal-reco-goods class="perosonal-reco pt-2 pb-8" />
        </section>
        <!-- 分区商品列表 -->
        <good-zones style="padding: 0 160px" />
      </main>
      <!-- Footer -->
      <footer class="text-center py-2">
        🌏 © 2022 Pie-Mall , code by Crushdada - Beijing , just send me an offer, Please.
      </footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/home/HeaderBar.vue';
import { Button } from 'element-ui';
import GoodsTabBar from '../components/home/GoodsTabBar.vue';
import HomeCaroucel from '../components/home/HomeCarousel.vue';
import PersonalRecoGoods from '../components/home/PersonalRecoGoods.vue';
import GoodZones from '../components/home/GoodZones.vue';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';
import { USER_SIGNED } from '@/store/auth.module/mutations/set-user-signed-state.mutation';

@Component({
  components: {
  },
})
export default class BillingPage extends Vue {
  /** Computed*/
  // ===================================================================
  get userTicket(): string | undefined {
    return this.$store.state[VuexModuleName.AUTH].ticket;
  }

  /** Hooks */
  // ===================================================================
  beforeMount() {
    this.checkTicket();
  }
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';

</style>
