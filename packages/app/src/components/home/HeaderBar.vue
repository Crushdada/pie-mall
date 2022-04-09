<template>
  <el-header
    class="header flex flex-row justify-between items-center"
    style="text-align: right"
  >
    <a href="" class="link-hover">派 · 数码产品在线商城</a>
    <div class="flex flex-row flex-nowrap items-center">
      <!-- 用户名 + 个人中心菜单 -->
      <PersonalDropdownMenu v-if="signed" style="color: #b0b0b0" />
      <!-- 登录 -->
      <a
        v-else
        @click="() => $router.push({ name: 'login' })"
        class="link-hover px-2"
      >
        登录
      </a>
      <el-divider v-if="!signed" direction="vertical"></el-divider>
      <!-- 消息通知 -->
      <a
        @click="() => $router.push({ name: 'messages' })"
        class="link-hover px-2"
        >消息通知</a
      >
      <!-- 我的订单 -->
      <el-divider v-if="signed" direction="vertical"></el-divider>
      <a
        v-if="signed"
        @click="() => $router.push({ name: 'order' })"
        class="link-hover px-2"
      >
        我的订单
      </a>
      <!-- 购物车+下拉菜单 -->
      <el-dropdown :show-timeout="20" trigger="hover">
        <!-- 展示部分 -->
        <a
          class="shop-cart-btn space-x-2 flex flex-row flex-nowrap justify-center items-center"
          style="width: 120px; height: 40px; font-size: 12px"
          @click="handleOpenCart"
        >
          <i class="el-icon-shopping-cart-full" style="font-size: 20px"></i>
          <span>购物车</span>
          <span>({{ totalNums || 0 }})</span>
        </a>
        <!-- 菜单部分 -->
        <el-dropdown-menu slot="dropdown">
          <template v-if="signed && totalNums !== 0">
            <div
              class="flex flex-col flex-nowrap pt-4 px-6"
              style="width: 320px"
            >
              <!-- 购物车商品列表 -->
              <div class="text-xs">
                <div
                  class="flex flex-row flex-nowrap justify-around items-center"
                  v-for="(goodsMap, i) in shopcart"
                  :key="i"
                >
                  <!-- v-for,只显示最多5个 -->
                  <el-image
                    style="width: 66px; height: 45px"
                    :src="goodsMap.thumb"
                  >
                  </el-image>
                  <a class="h-8 goods-info" style="width: 100px">
                    {{ goodsMap.name }}
                  </a>
                  <span>{{ goodsMap.price }}元 × {{ goodsMap.quantity }}</span>
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
                <span class="goods-total-text"> 共{{ totalNums }}件商品</span>
                <br />
                <span class="primary text-xl">{{ totalPrice }}元</span>
              </div>
              <el-button
                class="h-10 w-30 relative"
                type="primary"
                @click="() => $router.push({ name: 'shop-cart' })"
              >
                去购物车结算
              </el-button>
            </div>
          </template>
          <div v-else-if="signed" class="text-center px-4">
            <span class="text-sm">购物车中还没有商品，赶紧选购吧！</span>
          </div>
          <div
            v-else
            class="text-center"
            style="width: 120px"
            @click="() => $router.push({ name: 'login' })"
          >
            <a class="link-hover">前往登录</a>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import PersonalDropdownMenu from './personal-dropdown-menu.vue';
import { Mixins } from 'vue-property-decorator';
import ShopCartMixin from '@/mixins/shop-cart.mixin';
@Component({
  components: { PersonalDropdownMenu },
})
export default class HeaderBar extends Mixins(ShopCartMixin) {
  /** Hooks*/
  // ===================================================================
  async mounted() {
    await this.loadShopCart(); // 加载购物车数据
  }
  /** Methods*/
  // ===================================================================
  handleOpenCart() {
    // 如果未登录，跳转到登录页面
    if (!this.signed) {
      this.$router.push({ name: 'login' });
      return;
    }
    this.$router.push({ name: 'shop-cart' });
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
.goods-info {
  word-break: break-word; //换行模式
  overflow: hidden;
  text-overflow: ellipsis; //修剪文字
  display: -webkit-box;
  -webkit-line-clamp: 2; //此处为上限行数
  -webkit-box-orient: vertical;
}
</style>
