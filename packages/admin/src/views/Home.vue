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
    this.loadFileBtn.clearFiles();
  }
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
</style>
