<template>
  <el-header
    class="header flex flex-row justify-between items-center"
    style="padding: 0 15%; text-align: right"
  >
    <!-- <img
      class="flex w-10 object-cover object-center"
      src="@/assets/pie-app-logo.svg"
      alt="pie mall logo"
    /> -->
    <a href="//localhost:8080/" class="link-hover">派 · 在线数码商城</a>
    <div class="flex flex-row flex-nowrap items-center">
      <!-- 用户名 + 个人中心菜单 -->
      <el-dropdown v-if="signed" :show-timeout="20">
        <!-- 展示部分 -->
        <a
          class="personal-center flex flex-row flex-nowrap justify-center items-center"
          style="width: 120px; height: 40px; font-size: 12px"
          @click="() => $router.push({ name: 'PersonalCenter' })"
        >
          <a class="link-hover pl-2 pr-4">
            {{ userName || '游客2233' }}
          </a>
          <i class="el-icon-arrow-right" style="font-size: 14px"></i>
        </a>
        <!-- 菜单部分 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-s-custom"
            @click.native="() => $router.push({ name: 'PersonalCenter' })"
          >
            个人中心
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-lollipop"
            @click.native="() => $router.push({ name: 'PersonalCenter' })"
          >
            我的收藏
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-tools" @click.native="logOut">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 登录 -->
      <a v-else href="//localhost:8080/messages" class="link-hover px-2">
        登录
      </a>
      <el-divider v-if="!signed" direction="vertical"></el-divider>
      <!-- 消息通知 -->
      <a href="//localhost:8080/messages" class="link-hover px-2">消息通知</a>
      <!-- 我的订单 -->
      <el-divider v-if="signed" direction="vertical"></el-divider>
      <a v-if="signed" href="//localhost:8080/messages" class="link-hover px-2">
        我的订单
      </a>
      <!-- 购物车+下拉菜单 -->
      <el-dropdown :show-timeout="20">
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
          <el-dropdown-item
            icon="el-icon-s-custom"
            @click.native="() => $router.push({ name: 'PersonalCenter' })"
          >
            个人中心
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-tools" @click.native="logOut">
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { signOut } from '@/api/user/sign-out';
import { DELETE_AUTH_TICKET } from '@/store/auth.module/mutations/delete-auth-ticket.mutation';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';

@Component()
export default class HeaderBar extends Vue {
  /** Computed*/
  // ===================================================================
  get cartGoodsCount() {
    return 3;
  }
  get signed() {
    return true;
  }
  get userName() {
    return this.$store.state[VuexModuleName.USER].userProfile.name || 'REN.';
  }
  handleOpenCart() {
    // 尝试跳转到购物车，如果没登录就跳转到登录
  }
  // 退出登录
  async logOut() {
    try {
      // 请求销毁session
      const res = await signOut(this.userTicket);
      // 请求失败
      if (res.status !== 0) {
        console.log(`🙈${res.detail}`);
        this.$message({
          showClose: true,
          message: 'Log out failed',
          type: 'error',
          center: true,
        });
        throw Error('🙈退出登录失败，请重试');
      }
    } catch (err) {
      console.log(err);
    }
    // 成功退出登录
    // 删除客户端存储的ticket，更改登录状态
    this.$stock.commit(DELETE_AUTH_TICKET);
    this.$router.replace({
      name: 'login',
    });
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.header {
  font-size: 12px;
  background-color: $bk-dark;
  color: $gray-text;
  .link-hover:hover {
    color: white;
  }
  .shop-cart-btn {
    color: #b0b0b0;
    background-color: $dark-text;
    &:hover {
      background-color: #fff;
      color: $primary;
    }
  }
  .personal-center {
    color: #b0b0b0;
    &:hover,
    & > a:hover {
      cursor: pointer;
      background-color: #fff;
      color: $primary;
    }
  }
  .el-dropdown-item:hover {
    color: $primary;
  }
}
</style>
