<template>
  <div>
    <small-chart-tpl title="访问量" subTitle="今日访问量 33" :totalCount="755">
      <div
        id="user-visits"
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
@Component({
  components: { SmallChartTpl },
})
export default class UserVisits extends Mixins(ChartInitMixin) {
  /** Hooks*/
  // ===================================================================
  mounted() {
    this.getEchartsInstance('#user-visits');
    this.renderChart({
      baseOpts: baseOptions,
      processor: processChartData,
    });
  }
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped>
</style>
