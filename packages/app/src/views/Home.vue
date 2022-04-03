<template>
  <div class="home">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <header-bar class="full-width" style="height:40px;background-color:"/>
      <!-- body -->
      <el-main class="bg-gray-100" style="padding: 0px">
        <el-card class="p-2" shadow="hover"> </el-card>
      </el-main>
      <!-- Footer -->
      <div class="w-15 h-10 text-center align-middle">
        🌏 © 2022 Piemall-background , code by Crushdada - Beijing
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/HeaderBar.vue';
import { Ref } from 'vue-property-decorator';
import { Button } from 'element-ui';
@Component({
  components: {  HeaderBar },
})
export default class Home extends Vue {
  /** Computed*/
  // ===================================================================
  get userTicket(): string | undefined {
    return this.$store.state[VuexModuleName.AUTH].ticket;
  }

  /** Hooks */
  // ===================================================================
  mounted() {
    //暂定数据分析页面为初始页面
    // this.homeMenu.naviPage(initComRoute.PagePath, initComRoute.component);
  }
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped>
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
}
</style>
