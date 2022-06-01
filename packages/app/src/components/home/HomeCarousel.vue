<template>
  <div>
    <el-carousel class="carousel-thumb" trigger="click" height="460px">
      <el-carousel-item v-for="(item, idx) in goodsCarouselList" :key="idx">
        <el-image class="rounded-md" :src="item.thumb"> </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { goodsCarouselList } from './carousel-goods-list';

@Component()
export default class HomeCaroucel extends Vue {
  private goodsCarouselList = goodsCarouselList || [];
  /** Computed*/
  // ===================================================================
}
</script>
<style lang="scss" scoped>
</style>
