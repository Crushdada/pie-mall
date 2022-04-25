<template>
  <div>
    <small-chart-tpl title="销售分析">
      <div id="sales-volume" style="width: 620px; height: 550px"></div>
    </small-chart-tpl>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { baseOptions } from './chart-options';
import ChartInitMixin from '@/mixins/chart-init.mixin.ts';
import { processChartData } from './processor';
import SmallChartTpl from '../small-chart-tpl.vue';
import { getUserNumsAnalysisData } from '@/api/user/get-uesr-nums-analysis-data';

@Component({
  components: { SmallChartTpl },
})
export default class SalesVolume extends Mixins(ChartInitMixin) {
  /** Hooks*/
  // ===================================================================
  async mounted() {
    // 初始化echarts实例
    this.getEchartsInstance('#sales-volume');
    // 获取数据
    const chartData = await this.getOriChartData();
    // const  = chartData;
    // 渲染图表
    // this.renderChart({
    //   baseOpts: baseOptions,
    //   oriData: diffRoleUserNums,
    //   processor: processChartData,
    // });
  }
  // Methods
  // ===================================================================
  async getOriChartData() {
    try {
      const res = await getUserNumsAnalysisData();
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
