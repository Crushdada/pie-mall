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
          <el-button class="h-10" type="primary">
            查看更多
            <i class="el-icon-caret-right el-icon--right"></i>
          </el-button>
        </div>
        <div class="grid grid-cols-4 gap-6">
          <el-card
            class="rounded-md goods-thumb cursor-pointer text-center py-4"
            style="height: 360px"
            @click.native="handleNavi2GoodsPage(goods.goodsID)"
            v-for="(goods, idx) in item.goodsList"
            :key="idx"
          >
            <el-image class="" style="height: 190px" :src="goods.thumb">
            </el-image>
            <p class="pt-4 goods-info">{{ goods.info }}</p>
            <span class="inline-block primary py-2">{{ goods.price }}元</span>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { goodsZonesList } from './goods-zones-list';
import { navi2GoodsDetailPage } from '@/utils/navi-2-goods-detail-page';
@Component()
export default class GoodZones extends Vue {
  private goodsZonesList = goodsZonesList || [];
  /** Computed*/
  // ===================================================================
  handleLink2(linkUrl) {
    // 处理推广告的link跳转
  }
  // 跳转到商品详情页
  handleNavi2GoodsPage(id) {
    navi2GoodsDetailPage(id);
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
  .goods-info {
    word-break: break-word; //换行模式
    overflow: hidden;
    text-overflow: ellipsis; //修剪文字
    display: -webkit-box;
    -webkit-line-clamp: 2; //此处为上限行数
    -webkit-box-orient: vertical;
  }
}
</style>
