<template>
  <div class="p-input flex flex-row items-center">
    <span v-if="label" class="p-label">{{ label }}</span>
    <form>
      <el-input
        :style="{ width: `${width}px` }"
        :type="type"
        :value="value"
        @input="handleInput"
        :placeholder="placeholder"
        :show-password="showPassword"
        :min="min"
        :max="max"
        :disabled="disabled"
        :required="required"
        :clearable="clearable"
      >
        <el-button
          class="hover-primary"
          v-if="triggerBtn"
          slot="append"
          icon="el-icon-search"
          @click="$emit('handleSearch')"
        ></el-button>
      </el-input>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Model, Emit } from 'vue-property-decorator';

@Component()
export default class PInputPure extends Vue {
  @Prop({ type: Number, default: 300 }) readonly width!: number;
  @Prop({ type: String, default: 'text' }) readonly type!: string;
  @Prop({ type: String }) readonly label!: string;
  @Prop({ type: String, default: '请输入' }) readonly placeholder!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Number, default: 0 }) readonly min!: number;
  @Prop({ type: Number, default: 100 }) readonly max!: number;
  @Prop({ type: Boolean, default: false }) readonly showPassword!: boolean; // 是否显示密码
  @Prop({ type: Boolean, default: false }) readonly required!: boolean;
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean;
  @Prop({ type: Boolean, default: false }) readonly triggerBtn!: boolean;

  @Model('change', { type: String }) readonly value!: string;

  @Emit('change')
  handleInput(value) {
    return value;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base.scss';

::v-deep .el-input__inner {
  padding-right: 0 !important;
}

</style>
