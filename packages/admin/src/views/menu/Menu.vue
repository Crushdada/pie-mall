<template>
  <div>
    <el-menu class="h-full" collapse-transition>
      <el-submenu
        v-for="(menuItem, i) in moduleMenuList"
        :key="i"
        :index="`${i}`"
        class="menu-item"
      >
        <template slot="title" class="menu-item">
          <i :class="`${menuItem.icon || 'el-icon-menu'}`"></i>
          {{ menuItem.moduleName }}
        </template>
        <!-- subMenu-->
        <el-menu-item
          class="menu-item"
          :class="{ 'active-menu-item': activeMenuItem === page.component }"
          v-for="(page, j) in menuItem.children"
          :key="j"
          @click="naviPage(page.name, page.component)"
        >
          {{ page.childPageName }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { moduleMenu } from './menu-list';
@Component({
  components: {},
})
export default class HomeMenu extends Vue {
  private activeMenuItem = '';

  /** Computed*/
  // ===================================================================
  get moduleMenuList() {
    return moduleMenu;
  }

  // Methods
  // ===================================================================
  private naviPage(targetComName, component) {
    // 切换路由
    this.$router.push({
      name: targetComName,
    });
    console.log('targetComName', targetComName);
    this.activeMenuItem = component;
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-submenu__title {
  width: 210px;
  background-color: #304156;
  color: #bfcbd9;
  &:hover {
    background-color: #2d3642;
  }
}

::v-deep .menu-item {
  width: 210px;
  background-color: #1f2d3d;
  color: #bfcbd9;
  &:hover {
    background-color: #222427;
  }
}
.active-menu-item {
  color: rgb(64, 158, 255);
}
</style>
