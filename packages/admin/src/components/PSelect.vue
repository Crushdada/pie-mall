<template>
  <div class="p-select">
    <span v-if="label">{{ label }}</span>
    <el-select
      placeholder="请选择"
      :style="{ width: `${width}px` }"
      :value="value"
      @input="handleSelectChange"
      :options="options"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Model, Emit } from 'vue-property-decorator';

@Component()
export default class PInput extends Vue {
  @Prop({ type: Number, default: 130 }) readonly width!: number;
  @Prop({ type: String, default: '' }) readonly label!: string;
  @Prop({ type: String, default: '请选择' }) readonly placeholder!: string;
  @Prop({ type: Array, default: () => [] }) readonly options!: Array<{
    label: string;
    value: any;
  }>;
  @Model('change', { type: String }) readonly value!: string;

  /** Methods */
  // ===================================================================
  @Emit('change')
  handleSelectChange(value) {
    return value;
  }
}
</script>

<style lang="scss" scoped></style>
