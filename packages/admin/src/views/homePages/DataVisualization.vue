<template>
  <div class="visualization">
    <div class="flex justify-around pt-4">
      <user-nums />
      <OrderStatistics />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserNums from '../chart-templates/user-nums/chart-index.vue';
import OrderStatistics from '../chart-templates/order-statistics/chart-index.vue';
@Component({
  components: { UserNums, OrderStatistics },
})
export default class DataVisualization extends Vue {
  /** Computed*/
  // ===================================================================
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped></style>
