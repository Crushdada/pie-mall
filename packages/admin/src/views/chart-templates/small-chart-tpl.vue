<template>
  <el-card shadow="hover" style="width: 310px; height: 190px">
    <span class="text-gray-400">{{ title }}</span>
    <el-dropdown class="float-right" trigger="click">
      <i class="el-icon-more pt-1 text-gray-400 cursor-pointer"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="showTips">查看详情</el-dropdown-item>
        <el-dropdown-item @click.native="showTips">更多操作</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <br />
    <h2 class="text-3xl pb-1.5">{{ totalCount }}</h2>
    <!-- 图表视图出口 -->
    <slot></slot>
    <div class="my-2" style="border-bottom: 1px solid #eee"></div>
    <span style="color: #515a6e">{{ subTitle }} </span>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SmallChartTpl extends Vue {
  @Prop({ type: String }) readonly title!: string;
  @Prop({ type: String }) readonly subTitle!: string;
  @Prop({ type: String }) readonly totalCount!: string;

  /** Hooks*/
  // ===================================================================
  // Methods
  // ===================================================================
  showTips() {
    this.$message({
      showClose: true,
      message: '您没有执行此操作的权限！',
      type: 'warning',
      center: true,
    });
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
</style>
