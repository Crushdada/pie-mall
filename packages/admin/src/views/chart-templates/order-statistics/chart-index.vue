<template>
  <div>
    <small-chart-tpl
      title="订单统计"
      :subTitle="`今日订单量 ${dailyOrderCount}`"
      :totalCount="totalCount"
    >
      <div
        id="order-chart"
        style="width: 266px; height: 45px; transform: scaleX(1.25)"
      ></div>
    </small-chart-tpl>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { baseOptions } from './chart-options';
import ChartInitMixin from '@/mixins/chart-init.mixin.ts';
import { processChartData } from './processor';
import SmallChartTpl from '../small-chart-tpl.vue';
import { getOrderAnalysisData } from '@/api/order/get-order-analysis-data';

@Component({
  components: { SmallChartTpl },
})
export default class OrderStatistics extends Mixins(ChartInitMixin) {
  private dailyOrderCount = '';
  private totalCount = '';
  private recentDays = 17;
  /** Hooks*/
  // ===================================================================
  async mounted() {
    // 初始化echarts实例
    this.getEchartsInstance('#order-chart');
    // 获取数据
    const chartData = await this.getOriChartData(this.recentDays);
    const { recentOrders, totalOrderCounts } = chartData;
    // 挂载状态
    this.dailyOrderCount = recentOrders[recentOrders.length - 1]?.orderCounts;
    this.totalCount = totalOrderCounts;
    // 渲染图表
    this.renderChart({
      baseOpts: baseOptions,
      oriData: recentOrders,
      processor: processChartData,
    });
  }
  // Methods
  // ===================================================================
  async getOriChartData(recentDays) {
    try {
      const res = await getOrderAnalysisData(recentDays);
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
@import '@/styles/base.scss';
</style>
