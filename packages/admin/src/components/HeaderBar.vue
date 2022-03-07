<template>
  <el-header
    class="header flex flex-row justify-between items-center"
    style="text-align: right"
  >
    <img
      class="flex w-10 object-cover object-center"
      src="@/assets/pie-mall-bk-logo.png"
      alt="pie mall logo"
    />
    <div class="flex flex-row flex-nowrap items-center">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <i
          class="el-icon-setting px-2"
          style="padding-top: 3px; font-size: 20px"
        ></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 & 个人中心 -->
      <span class="px-2">{{userName}}</span>
      <img
        v-if="avatar"
        class="w-9 h-9 ml-2 mr-5 rounded-full cursor-pointer object-cover object-center"
        :src="avatar"
        alt="用户头像"
        @click="() => $router.push({ name: 'PersonalCenter' })"
      />
      <img
        v-else
        class="w-9 h-9 ml-2 mr-5 object-cover object-center"
        src="@/assets/nav_icon_avatar_nor.png"
        alt="用户头像"
        @click="() => $router.push({ name: 'PersonalCenter' })"
      />
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
  get avatar() {
    return this.$store.state[VuexModuleName.USER].userProfile.avatar;
  }
  get userName() {
    return this.$store.state[VuexModuleName.USER].userProfile.userName;
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
        return;
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
