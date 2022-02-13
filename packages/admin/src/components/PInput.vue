<template>
  <!-- 坐标轴名称设置 -->
  <div
    class="p-input py-2.5 flex flex-col flex-nowrap"
    style="width: 355px; height: 80px"
  >
    <span v-show="showLabel" class="p-label">{{ label }}</span>
    <form>
      <el-input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="showLabel = true"
        :show-password="showPassword"
        :min="min"
        :max="max"
        clearable
      ></el-input>
    </form>
    <span v-show="!showLabel" class="p-label text-xs mt-2.5">{{ desc }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Model } from 'vue-property-decorator';

@Component()
export default class PInput extends Vue {
  @Prop({ type: String, default: 'text' }) readonly type!: string;
  @Prop({ type: String }) readonly label!: string;
  @Prop({ type: String }) readonly desc!: string; // 提示描述
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Number, default: 0 }) readonly min!: number;
  @Prop({ type: Number, default: 100 }) readonly max!: number;
  @Prop({ type: Boolean, default: false }) readonly showPassword!: boolean; // 是否显示密码

  @Model('change', { type: String }) readonly value!: string;

  private showLabel = false;

  get placeholder() {
    return this.showLabel ? '' : this.label;
  }

  handleInput(value) {
    this.$emit('change', value);
  }
}
</script>

<style lang="scss" scoped>
</style>
