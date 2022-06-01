<template>
  <el-card class="flex items-center" shadow="hover" style="overflow: visible">
    <div class="px-4">
      <span class="text-gray-400">商品热销榜</span>
      <el-dropdown class="float-right" trigger="click">
        <i class="el-icon-more pt-1 text-gray-400 cursor-pointer"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showTips">查看详情</el-dropdown-item>
          <el-dropdown-item @click.native="showTips">更多操作</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 图表视图出口 -->
    <div id="sales-ranking" style="width: 420px; height: 200px"></div>
  </el-card>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { baseOptions } from './chart-options';
import ChartInitMixin from '@/mixins/chart-init.mixin.ts';
import { processChartData } from './processor';
import { getSalesRankingData } from '../../../api/order/get-sales-ranking-data';

@Component
export default class SalesRanking extends Mixins(ChartInitMixin) {
  /** Hooks*/
  // ===================================================================
  async mounted() {
    // 初始化echarts实例
    this.getEchartsInstance('#sales-ranking');
    // 获取数据
    const chartData = await this.getOriChartData();
    // 渲染图表
    this.renderChart({
      baseOpts: baseOptions,
      oriData: chartData,
      processor: processChartData,
    });
  }
  // Methods
  // ===================================================================
  async getOriChartData() {
    try {
      const res = await getSalesRankingData();
      if (!res) {
        throw Error(JSON.stringify(res));
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
