<template>
  <div class="flex">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height: 40px; padding: 0 160px" />
      <!-- body -->
      <main class="bg-gray-100 pb-10 flex-1">
        <section class="main-section bg-white" style="padding: 0 160px">
          <!-- 顶部tab栏 + 搜索框 -->
          <goods-tab-bar class="tab-header" />
        </section>
        <!-- 子路由视图出口 -->
        <router-view />
      </main>
      <!-- Footer -->
      <footer class="text-center py-2">
        🌏 © 2022 Pie-Mall , code by Crushdada - Beijing , just send me an
        offer, Please.
      </footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderBar from '@/components/home/HeaderBar.vue';
import GoodsTabBar from '../../components/home/GoodsTabBar.vue';
@Component({
  components: {
    HeaderBar,
    GoodsTabBar,
  },
})
export default class Goods extends Vue {
  /** Computed*/
  // ===================================================================
  /** Hooks */
  // ===================================================================
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped>
</style>
