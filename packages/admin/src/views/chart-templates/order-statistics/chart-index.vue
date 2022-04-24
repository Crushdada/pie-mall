<template>
  <div>
    <small-chart-tpl
      title="订单统计"
      :subTitle="`今日订单量 ${dailyOrderCount}`"
      :totalCount="totalCount"
    >
      <div
        class="chart-slot"
        style="
          width: 266px;
          height: 45px;
          transform: scaleX(1.05) translateX(-5px);
        "
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
  /** Hooks*/
  // ===================================================================
  mounted() {
    this.getOriginalData();
    this.renderChart(baseOptions, processChartData);
  }
  // Methods
  // ===================================================================
  async getOriginalData() {
    try {
      const res = await getOrderAnalysisData(17);
      if (!res) {
        throw Error(JSON.stringify(res));
      }
      const { recentOrders, totalOrderCounts } = res.data;
      console.log(totalOrderCounts);
      console.log(recentOrders);
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: '请求订单数据失败,请稍后重试',
        type: 'error',
        center: true,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
</style>
