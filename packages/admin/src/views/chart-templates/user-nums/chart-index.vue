<template>
  <div>
    <small-chart-tpl
      title="用户总量"
      :totalCount="totalUserNums"
      :subTitle="`今日新增 ${dailyNewNums}`"
    >
      <div
        id="user-nums"
        style="
          width: 266px;
          height: 45px;
          transform: translateX(2px) scaleX(1.01);
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
import { getUserNumsAnalysisData } from '@/api/user/get-uesr-nums-analysis-data';

@Component({
  components: { SmallChartTpl },
})
export default class UserNums extends Mixins(ChartInitMixin) {
  private dailyNewNums = '';
  private totalUserNums = 0;
  /** Hooks*/
  // ===================================================================
  async mounted() {
    // 初始化echarts实例
    this.getEchartsInstance('#user-nums');
    // 获取数据
    const chartData = await this.getOriChartData();
    const { diffRoleUserNums, dailyNewNums } = chartData;
    // 挂载状态
    this.totalUserNums = parseInt(
      diffRoleUserNums.reduce((sum, cur) => {
        return (sum += parseInt(cur.userNums));
      }, 0),
    );
    this.dailyNewNums = dailyNewNums;
    // 渲染图表
    this.renderChart({
      baseOpts: baseOptions,
      oriData: diffRoleUserNums,
      processor: processChartData,
    });
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
</style>
