<template>
  <div
    class="flex flex-row justify-between items-center"
    style="height: 100px"
  >
    <!-- logo -->
    <img
      class="object-cover object-center cursor-pointer"
      style="width: 56px; height: 56px"
      src="@/assets/pie-app-logo.svg"
      alt="pie mall logo"
    />
    <!-- tab -->
    <div class="" @click="handleNaviGoodsZone">
      <a
        class="tab-item w-10 py-5 px-2.5 cursor-pointer"
        v-for="(menuItem, idx) in goodsTabMenu"
        :key="idx"
        :data-index="idx"
      >
        {{ menuItem.label }}
      </a>
    </div>
    <!-- 搜索框 -->
    <PInputPure
      v-model="searchKey"
      placeholder="请输入"
      clearable
      @handleSearch="handleSearch"
      triggerBtn
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { signOut } from '@/api/user/sign-out';
import { goodsTabMenu } from './goods-tab-menu';
import PInputPure from '../pure-coms/PInputPure.vue';

@Component({
  components: { PInputPure },
})
export default class GoodsTabBar extends Vue {
  private goodsTabMenu = goodsTabMenu;
  private searchKey = '';
  /** Computed*/
  // ===================================================================
  get cartGoodsCount() {
    return 3;
  }
  /** Methods*/
  // ===================================================================
  handleOpenCart() {
    // 尝试打开购物车逻辑需要先判断登录与否
  }
  // 委托跳转到分区事件给ul
  handleNaviGoodsZone(e) {
    // 指定触发的事件源
    if (e.target.nodeName.toLowerCase() === 'a') {
      const triggerIdx = parseInt(e.target.dataset.index);
      const { field } = this.goodsTabMenu[triggerIdx];
      // 用路由传参，到分区页面，拿数据
    }
  }
  // 触发搜索
  handleSearch() {
    const searchkey = this.searchkey;
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.tab-item {
  &:hover {
    color: $primary;
  }
}
</style>
