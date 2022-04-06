<template>
  <el-dropdown :show-timeout="20">
    <!-- 展示部分 -->
    <a
      class="personal-center flex flex-row flex-nowrap justify-center items-center"
      @click="() => $router.push({ name: 'PersonalCenter' })"
    >
      <a class="link-hover px-2">
        {{ userName || '游客2233' }}
      </a>
      <i class="el-icon-caret-bottom" style="font-size: 14px"></i>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { signOut } from '@/api/user/sign-out';
import { DELETE_AUTH_TICKET } from '@/store/auth.module/mutations/delete-auth-ticket.mutation';
import { USER_SIGNED_OUT } from '@/store/auth.module/mutations/set-user-signed-state.mutation';
@Component({
  components: {},
})
export default class PersonalDropdownMenu extends Vue {
  /** Computed*/
  // ===================================================================
  get userName() {
    return this.$store.state[VuexModuleName.USER].userProfile.name || 'REN.';
  }
  /** Hooks */
  // ===================================================================

  // Methods
  // ===================================================================
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
    const currPath = this.$route.path;
    if (currPath !== '/home') this.$router.push({ name: 'home' });
    this.$stock.commit(DELETE_AUTH_TICKET);
    this.$stock.commit(USER_SIGNED_OUT);
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';

.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
.personal-center {
  width: 120px;
  height: 40px;
  font-size: 12px;
  &:hover,
  & > a:hover {
    background-color: #fff;
  }
}
</style>
