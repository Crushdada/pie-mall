<template>
  <div class="visualization py-4">
    <div class="flex justify-around">
      <UserVisits />
      <OrderStatistics />
      <UserConsumptionLevel />
      <UserNums />
    </div>
    <div class="flex pt-4 px-2 space-x-4">
      <SalesVolume />
      <div class="flex-1 flex flex-col space-y-4">
        <SalesRanking />
        <DiffGoodsKindsSales />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserVisits from '../chart-templates/user-visits/chart-index.vue';
import OrderStatistics from '../chart-templates/order-statistics/chart-index.vue';
import UserConsumptionLevel from '../chart-templates/user-consumption-level/chart-index.vue';
import UserNums from '../chart-templates/user-nums/chart-index.vue';
import SalesVolume from '../chart-templates/sales-volume/chart-index.vue';
import SalesRanking from '../chart-templates/sales-ranking/chart-index.vue';
import DiffGoodsKindsSales from '../chart-templates/diff-goods-kinds-sales/chart-index.vue';
@Component({
  components: {
    UserVisits,
    OrderStatistics,
    UserConsumptionLevel,
    UserNums,
    SalesVolume,
    SalesRanking,
    DiffGoodsKindsSales,
  },
})
export default class DataVisualization extends Vue {
  /** Computed*/
  // ===================================================================
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped></style>
