<template>
  <div class="visualization">
    <div class="flex justify-around pt-4">
      <user-nums />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserNums from '../chart-templates/user-nums/chart-index.vue';

@Component({
  components: { UserNums },
})
export default class DataVisualization extends Vue {
  /** Computed*/
  // ===================================================================
  // Methods
  // ===================================================================
}
</script>
<style lang="scss" scoped></style>
