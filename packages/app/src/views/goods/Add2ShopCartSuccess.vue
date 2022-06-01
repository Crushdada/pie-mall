<template>
  <div style="padding: 0 160px">
    <div class="pt-6 flex flex-row items-center justify-between">
      <div class="flex flex-row items-center space-x-6">
        <el-button
          type="success"
          circle
          style="font-size: 35px"
          icon="el-icon-check"
        >
        </el-button>
        <h1 class="text-2xl">已成功加入购物车！</h1>
      </div>
      <div class="space-x-4">
        <el-button
          class="w-40 h-12"
          plain
          @click="() => $router.push({ name: 'home' })"
        >
          继续购物
        </el-button>
        <el-button
          class="w-40 h-12"
          type="primary"
          @click="() => $router.push({ name: 'shop-cart' })"
        >
          去购物车结算
        </el-button>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AddGoodsSuccessTip extends Vue {}
</script>
<style lang="scss" scoped>
</style>
