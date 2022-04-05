<template>
  <el-header
    class="header flex flex-row justify-between items-center"
    style="text-align: right"
  >
    <a href="//localhost:8080/" class="link-hover">派 · 数码产品在线商城</a>
    <div class="flex flex-row flex-nowrap items-center">
      <!-- 用户名 + 个人中心菜单 -->
      <PersonalDropdownMenu v-if="signed" style="color: #B0B0B0"/>
      <!-- 登录 -->
      <a v-else href="//localhost:8080/login" class="link-hover px-2"> 登录 </a>
      <el-divider v-if="!signed" direction="vertical"></el-divider>
      <!-- 消息通知 -->
      <a href="//localhost:8080/messages" class="link-hover px-2">消息通知</a>
      <!-- 我的订单 -->
      <el-divider v-if="signed" direction="vertical"></el-divider>
      <a v-if="signed" href="//localhost:8080/messages" class="link-hover px-2">
        我的订单
      </a>
      <!-- 购物车+下拉菜单 -->
      <el-dropdown :show-timeout="20" trigger="click">
        <!-- 展示部分 -->
        <a
          class="shop-cart-btn space-x-2 flex flex-row flex-nowrap justify-center items-center"
          style="width: 120px; height: 40px; font-size: 12px"
          @click="handleOpenCart"
        >
          <i class="el-icon-shopping-cart-full" style="font-size: 20px"></i>
          <span>购物车</span>
          <span>({{ cartGoodsCount }})</span>
        </a>
        <!-- 菜单部分 -->
        <el-dropdown-menu slot="dropdown">
          <div class="flex flex-col flex-nowrap pt-4 px-6" style="width: 320px">
            <!-- 购物车商品列表 -->
            <div class="text-xs">
              <div
                class="flex flex-row flex-nowrap justify-around items-center"
              >
                <!-- v-for,只显示最多5个 -->
                <el-image
                  style="width: 66px; height: 45px"
                  src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/18d2099cb0b05bbd23cb1915dfc9d0d6.jpg?thumb=1&w=250&h=250&f=webp&q=90"
                >
                </el-image>
                <a
                  class="h-8"
                  style="width: 100px"
                >
                  Redmi K50 Pro 8GB+128GB墨
                </a>
                <span>2999元 × 1</span>
              </div>
              <el-divider></el-divider>
            </div>
          </div>
          <!-- 购物车统计信息 -->
          <div
            class="px-8 flex flex-row flex-nowrap justify-between items-center"
            style="background: #fafafa"
          >
            <div class="left-total">
              <span class="goods-total-text"> 共3件商品</span><br />
              <span class="primary text-xl">9998元</span>
            </div>
            <el-button
              class="h-10 w-30 relative"
              type="primary"
              @click="() => $router.push({ name: 'shop-cart' })"
            >
              去购物车结算
            </el-button>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import PersonalDropdownMenu from './personal-dropdown-menu.vue';
@Component({
  components: { PersonalDropdownMenu },
})
export default class HeaderBar extends Vue {
  /** Computed*/
  // ===================================================================
  get cartGoodsCount() {
    return 3;
  }
  get signed() {
    return this.$store.state[VuexModuleName.AUTH].signed;
  }
 
  handleOpenCart() {
    // 尝试跳转到购物车，如果没登录就跳转到登录
  }

}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.goods-total-text {
  font-size: 12px;
  color: $gray-text2;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
.header {
  font-size: 12px;
  background-color: $bk-dark;
  color: $gray-text1;
  .link-hover:hover {
    color: white;
  }
  .shop-cart-btn {
    background-color: $dark-text;
    color: $gray-text1;
    &:hover {
      background-color: #fff;
      color: $primary;
    }
  }

}
</style>
