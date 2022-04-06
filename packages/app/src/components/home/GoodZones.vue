<template>
  <div class="goods-zone">
    <div v-for="(item, idx) in goodsZonesList" :key="idx">
      <el-image
        v-if="item.type === 'promotion'"
        class="rounded-md mt-8 cursor-pointer"
        style="height: 120px"
        :src="item.thumb"
        @click="handleLink2(item.link)"
      >
      </el-image>
      <div v-else class="pt-4">
        <div class="flex felx-row flex-nowrap justify-between items-center">
          <span class="py-4 text-2xl">{{ item.label }}</span>
          <el-button class="h-10" type="primary" icon="">查看更多</el-button>
        </div>

        <div class="grid grid-cols-4 gap-6">
          <el-card
            class="rounded-md goods-thumb cursor-pointer"
            v-for="(goods, idx) in item.goodsList"
            :key="idx"
          >
            <el-image
              class=""
              style="height: 300px"
              :src="goods.thumb"
              @click="handleNavi2GoodsPage(goods.goodsID)"
            >
            </el-image
          ></el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { goodsZonesList } from './goods-zones-list';

@Component()
export default class GoodZones extends Vue {
  private goodsZonesList = goodsZonesList || [];
  /** Computed*/
  // ===================================================================
  handleLink2(linkUrl) {
    // 处理推广广告的link跳转
  }
  handleNavi2GoodsPage(id) {
    // console.log(id);
    // 最好封装成一个api/util
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.goods-zone {
  color: $dark-text;
  .goods-thumb {
    &:hover {
      -webkit-box-shadow: $card-shadow1;
      box-shadow: $card-shadow1;
      -webkit-transform: translate3d(0, -2px, 0);
      transform: translate3d(0, -2px, 0);
      transition-duration: 1s;
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
</style>
