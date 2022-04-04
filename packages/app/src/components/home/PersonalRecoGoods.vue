<template>
  <div class="flex flex-row flex-nowrap space-x-4">
    <el-image
      v-for="(item, idx) in personalRecoGoodslList"
      :key="idx"
      class="reco-goods-thumb rounded-md flex-1"
      style="height: 160px"
      :src="item.thumb"
      @click="handleNavi2GoodsPage(item.goodsID)"
    >
    </el-image>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { personalRecoGoodslList } from './personal-reco-goods-list';

@Component()
export default class PersonalRecoGoods extends Vue {
  private personalRecoGoodslList = personalRecoGoodslList || [];
  /** Computed*/
  // ===================================================================
  mounted() {
    // 请求后端拿这个列表，而不是从配置文件取，可以发送get请求，拼一个数目字段，传个5
  }
  handleNavi2GoodsPage(id) {
    // 最好封装成一个api/util
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.reco-goods-thumb {
  cursor: pointer;
  box-shadow: 0 5px 5px 0 hsl(0deg 0% 24% / 10%);
  &:hover {
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
    transition-duration: 1s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    -webkit-box-shadow: $card-shadow1;
    box-shadow: $card-shadow1;
    }
}
</style>
