<template>
  <div>
    <small-chart-tpl
      title="用户消费水平"
      :subTitle="`人均消费额度 ￥${avaConsumption}`"
    >
      <div id="user-consumption" style="width: 266px; height: 79px"></div>
    </small-chart-tpl>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { baseOptions } from './chart-options';
import ChartInitMixin from '@/mixins/chart-init.mixin.ts';
import { processChartData } from './processor';
import SmallChartTpl from '../small-chart-tpl.vue';
import { getConsumptionAnalysisData } from '@/api/order/get-consumption-analysis-data';

@Component({
  components: { SmallChartTpl },
})
export default class UserConsumptionLevel extends Mixins(ChartInitMixin) {
  private avaConsumption = 0;
  /** Hooks*/
  // ===================================================================
  async mounted() {
    // 初始化echarts实例
    this.getEchartsInstance('#user-consumption');
    // 获取数据
    const chartData = await this.getOriChartData();
    const totalConsumption = chartData.reduce((sum, cur) => {
      sum += parseInt(cur.consumption);
      return sum;
    }, 0);
    // 挂载状态
    this.avaConsumption = parseInt(totalConsumption / chartData.length);
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
      const res = await getConsumptionAnalysisData();
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
