<template>
  <div class="home">
    <el-container class="h-screen">
      <!-- asideMenu -->
      <el-aside
        width="210px"
        style="background-color: #304156; overflow-x: hidden"
      >
        <home-menu ref="homeMenu" />
      </el-aside>
      <el-container direction="vertical">
        <!-- header -->
        <header-bar />
        <!-- body -->
        <el-main class="bg-gray-100" style="padding: 10px">
          <el-card class="p-2" shadow="hover">
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';
import HomeMenu from './menu/Menu.vue';
import { initComRoute } from './menu/menu-list';
import HeaderBar from '@/components/HeaderBar.vue';
import { Ref } from 'vue-property-decorator';
import { Button } from 'element-ui';
@Component({
  components: { HomeMenu, HeaderBar },
})
export default class Home extends Vue {
  @Ref('homeMenu') readonly homeMenu!: HomeMenu;
  @Ref('loadFileBtn') readonly loadFileBtn!: Button;

  /** Computed*/
  // ===================================================================
  get userTicket(): string | undefined {
    return this.$store.state[VuexModuleName.AUTH].ticket;
  }

  /** Hooks */
  // ===================================================================
  beforeMount() {
    this.checkTicket();
  }

  mounted() {
    //暂定数据分析页面为初始页面
    this.homeMenu.naviPage(initComRoute.PagePath, initComRoute.component);
  }
  // Methods
  // ===================================================================

  /**
   * 身份认证 & 获取用户信息
   * @param { string } store.userTicket
   */
  async checkTicket() {
    // 首次登录
    if (!this.userTicket) {
      console.log('🙈登录状态失效，请重新登录');
      this.$router.replace({
        name: 'login',
      });
      return;
    }
    // 二次登录
    try {
      const res = await getUserProfile(this.userTicket);
      // 认证失败
      if (res.status !== 0) {
        this.$router.replace({
          name: 'login',
        });
        throw Error('🙈登录状态失效，请重新登录');
      }
      // 认证成功
      const { data } = res;
      // 更新用户信息
      this.$stock.commit(SET_USER_PROFILE, data);
    } catch (err) {
      this.$router.replace({
        name: 'login',
      });
      console.log(err);
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
</style>
