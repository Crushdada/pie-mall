<template>
  <div class="flex flex-row items-center justify-between">
    <div>
      <el-button
        class="w-16 h-16 mr-4"
        type="success"
        round
        style="cursor: normal"
      >
        成功按钮
      </el-button>
      <h1 class="inline">已成功加入购物车！</h1>
    </div>
    <div>
      <el-button plain @click="() => $router.push({ name: 'home' })">
        继续购物
      </el-button>
      <el-button
        class="pl-2"
        type="primary"
        @click="() => $router.push({ name: 'shop-cart' })"
      >
        去购物车结算
      </el-button>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AddGoodsSuccessTip extends Vue {
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
</style>
