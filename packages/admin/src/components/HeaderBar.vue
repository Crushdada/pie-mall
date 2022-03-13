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
      <!-- 头像 & 个人中心 -->
      <span class="px-2">{{ userName || '暂未设置' }}</span>
      <!-- 下拉菜单 -->
      <el-dropdown>
        <img
          v-if="avatar"
          class="w-10 h-10 ml-2 mr-5 rounded-full cursor-pointer object-cover object-center"
          :src="avatar"
          alt="用户头像"
        />
        <img
          v-else
          class="w-10 h-10 ml-2 mr-5 object-cover object-center"
          src="@/assets/nav_icon_avatar_nor.png"
          alt="用户头像"
        />
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
  get avatar() {
    return this.$store.state[VuexModuleName.USER].userProfile.avatar;
  }
  get userName() {
    return this.$store.state[VuexModuleName.USER].userProfile.name;
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
