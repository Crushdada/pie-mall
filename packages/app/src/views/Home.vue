<template>
  <div class="home">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height: 40px; background-color: " />
      <!-- body -->
      <main class="bg-gray-100">
        <section class="main-section bg-white" style="padding: 0 184px">
          <!-- 顶部tab栏 + 搜索框 -->
          <goods-tab-bar class="tab-header"></goods-tab-bar>
          <!-- 轮播图 -->
          <home-caroucel></home-caroucel>
          <!-- 个性化推荐(图片组) -->
          <div class="perosonal-reco"></div>
        </section>
        <!-- 分区商品列表 -->
        <div class="good-zones"></div>
      </main>
      <!-- Footer -->
      <footer
        class="text-center align-middle inline-block py-2"
        style="line-height: 30px"
      >
        🌏 © 2022 Piemall-background , code by Crushdada - Beijing
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

@Component({
  components: { HeaderBar, GoodsTabBar, HomeCaroucel },
})
export default class Home extends Vue {
  /** Computed*/
  // ===================================================================
  get userTicket(): string | undefined {
    return this.$store.state[VuexModuleName.AUTH].ticket;
  }

  /** Hooks */
  // ===================================================================
  mounted() {
    //暂定数据分析页面为初始页面
    // this.homeMenu.naviPage(initComRoute.PagePath, initComRoute.component);
  }
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
