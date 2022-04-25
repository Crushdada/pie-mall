<template>
  <div class="visualization">
    <div class="flex justify-around pt-4">
      <UserVisits />
      <OrderStatistics />
      <UserConsumptionLevel />
      <UserNums />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserVisits from '../chart-templates/user-visits/chart-index.vue';
import OrderStatistics from '../chart-templates/order-statistics/chart-index.vue';
import UserConsumptionLevel from '../chart-templates/user-consumption-level/chart-index.vue';
import UserNums from '../chart-templates/user-nums/chart-index.vue';

@Component({
  components: { UserVisits, OrderStatistics, UserConsumptionLevel, UserNums },
})
export default class DataVisualization extends Vue {
  /** Computed*/
  // ===================================================================
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped></style>
