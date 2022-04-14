<template>
  <div class="home">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height: 40px; padding: 0 160px" />
      <!-- body -->
      <main class="bg-gray-100 pb-10">
        <section class="main-section bg-white" style="padding: 0 160px">
          <!-- 顶部tab栏 + 搜索框 -->
          <goods-tab-bar class="tab-header" />
          <!-- 轮播图 -->
          <home-caroucel />
          <!-- 个性化推荐(图片组) -->
          <personal-reco-goods class="perosonal-reco pt-2 pb-8" />
        </section>
        <!-- 分区商品列表 -->
        <good-zones style="padding: 0 160px" />
      </main>
      <!-- Footer -->
      <footer class="text-center py-2">
        🌏 © 2022 Pie-Mall , code by Crushdada - Beijing , just send me an
        offer, Please.
      </footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/home/HeaderBar.vue';
import GoodsTabBar from '../components/home/GoodsTabBar.vue';
import HomeCaroucel from '../components/home/HomeCarousel.vue';
import PersonalRecoGoods from '../components/home/PersonalRecoGoods.vue';
import GoodZones from '../components/home/GoodZones.vue';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';
import { USER_SIGNED } from '@/store/auth.module/mutations/set-user-signed-state.mutation';
import { SIGNED_OUT } from '@/store/auth.module/actions/set-user-signed-state.action';

@Component({
  components: {
    HeaderBar,
    GoodsTabBar,
    HomeCaroucel,
    PersonalRecoGoods,
    GoodZones,
  },
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
  // Methods
  // ===================================================================
  /**
   * 身份认证 & 获取用户信息
   * @param { string } store.userTicket
   */
  async checkTicket() {
    // 持久化用户登录状态
    if (this.userTicket) {
      try {
        const res = await getUserProfile(this.userTicket);
        // 认证失败
        if (res.status !== 0) {
          this.$stock.dispatch(SIGNED_OUT);
          throw Error(JSON.stringify(res));
        }
        // 认证成功
        const { data } = res;
        // 更新用户信息,用户登录
        this.$stock.commit(SET_USER_PROFILE, data);
        this.$stock.commit(USER_SIGNED);
      } catch (err) {
        this.$stock.dispatch(SIGNED_OUT);
        console.log(err);
        this.$message({
          showClose: true,
          message: '身份认证失败，请重试',
          type: 'error',
          center: true,
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
