<template>
  <div class="p-drawer">
    <!-- 新增一条数据的form抽屉 -->
    <el-drawer
      :title="title"
      :before-close="beforeClose"
      :visible.sync="showDrawer"
      direction="ltr"
      custom-class="px-4"
      ref="drawer"
    >
      <div>
        <el-form class="pl-4" label-position="left" label-width="80px">
          <el-form-item
            class="py-2"
            v-for="(item, i) in formComs"
            :key="i"
            :label="item.label"
            :required="item.required"
          >
            <component
              v-model="item.modelVal"
              :is="item.com"
              :type="item.type"
              :placeholder="item.placeholder"
              :options="item.options"
              :width="item.width || 300"
              :showPassword="item.showPassword"
              :clearable="item.clearable"
            />
          </el-form-item>
          <slot></slot>
        </el-form>
        <div style="text-align: center">
          <el-button class="mr-6" @click="$emit('cancelForm')">取 消</el-button>
          <el-button
            type="primary"
            @click="drawer.closeDrawer()"
            :loading="loading"
          >
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Ref, Emit } from 'vue-property-decorator';
import { Drawer } from 'element-ui';
import PInputPure from '@/components/PInputPure.vue';
import PSelect from '@/components/PSelect.vue';

@Component({ components: { PSelect, PInputPure } })
export default class CreateRowDrawer extends Vue {
  private showDrawer = false;
  @Prop({ type: Array, default: () => [] }) readonly formComs!: Array<{
    [index: string]: any;
    com: any;
  }>;
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;
  @Prop({ type: String, default: '请填写表单' }) readonly title!: string;

  /** Methods */
  // ===================================================================
  @Ref('drawer') readonly drawer: Drawer;

  @Emit('beforeCloseDrawer')
  beforeClose(done) {
    return done;
  }

  handleShowDrawer() {
    this.showDrawer = true;
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  cancelSubmit() {
    this.showDrawer = false;
  }
}
</script>
