<template>
  <div class="home">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height: 40px; background-color: " />
      <!-- body -->
      <el-main class="bg-gray-100" style="padding: 0px">
        <el-card class="p-2" shadow="hover" style="padding: 0 184px">
          <section class="main-section">
            <!-- 顶部tab栏 + 搜索框 -->
            <goods-tab-bar class="tab-header"></goods-tab-bar>
            <!-- 纵向列表 + 轮播图 -->
            <section class="">
              <div class="carousel-list"></div>
              <div class="carousel-thumb"></div>
            </section>
            <!-- 个性化推荐(图片组) -->
            <div class="perosonal-reco"></div>
          </section>
          <!-- 分区商品列表 -->
          <div class="good-zones"></div>
        </el-card>
      </el-main>
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
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/home/HeaderBar.vue';
import { Ref } from 'vue-property-decorator';
import { Button } from 'element-ui';
import GoodsTabBar from '../components/home/GoodsTabBar.vue';
@Component({
  components: { HeaderBar, GoodsTabBar },
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
</style>
