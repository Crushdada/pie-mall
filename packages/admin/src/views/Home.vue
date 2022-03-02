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
      <el-container>
        <!-- header -->
        <el-header
          class="header flex flex-row justify-between items-center"
          style="text-align: right"
        >
          <img
            class="flex w-10"
            src="@/assets/pie-mall-bk-logo.png"
            alt="pie mall logo"
            style="justify-self: end"
          />
          <div>
            <el-dropdown>
              <i
                class="el-icon-setting px-2"
                style="padding-top: 3px; font-size: 20px"
              ></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="px-2 mr-5">王小虎</span>
          </div>
        </el-header>
        <!-- body -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { uint8Array2JSON } from '@/utils/data-utils';
import { addGoods } from '@/api/goods/add-goods';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import { signOut } from '@/api/user/sign-out';
import { ERROR_TYPE } from '../../../types/response/error-type.enum';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';
import { DELETE_AUTH_TICKET } from '@/store/auth.module/mutations/delete-auth-ticket.mutation';
import HomeMenu from './menu/Menu.vue';
import { initComRoute } from './menu/menu-list';

@Component({
  components: { HomeMenu },
})
export default class Home extends Vue {
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
    this.$refs.homeMenu.naviPage(initComRoute.PagePath, initComRoute.component);
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
      // 认证成功
      if (res.status === 0) {
        const { userProfile } = res;
        // 更新用户信息
        this.$stock.commit(SET_USER_PROFILE, userProfile);
      }
      // 认证失败
      if (res.status === ERROR_TYPE.UNKNOW) {
        console.log('🙈登录状态失效，请重新登录');
        this.$router.replace({
          name: 'login',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //读取Excel数据
  uploadFile(file) {
    const realFile = file.raw;
    const reader = new FileReader();
    reader.onload = async e => {
      var data = e.target.result;
      const rawData = new Uint8Array(data as any);
      const processedData = uint8Array2JSON(rawData);
      try {
        // 数据规范化
        const goodsData = processedData.map(el => {
          if (!el.G_stock) {
            el.G_stock = 100;
          }
          el.price = parseInt(el.price);
          return el;
        });
        // 商品数据入库
        const response: any = await addGoods(goodsData);
        if (response.status !== 0) throw Error(JSON.stringify(response));
        // notify;
        this.$message({
          showClose: true,
          message: 'Added successfully',
          type: 'success',
          center: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    reader.readAsArrayBuffer(realFile);
    this.$refs.loadFileBtn.clearFiles();
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
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
</style>
