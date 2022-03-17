<template>
  <div class="table-tool-bar flex flex-row justify-between items-center">
    <!-- 表格功能按钮 -->
    <div>
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        size="medium"
        @click="$emit('handleAddNewRow')"
      >
        {{ createRowBtnLabel }}
      </el-button>
      <el-button
        icon="el-icon-circle-plus-outline"
        size="medium"
        @click="$emit('handleDeleteRows')"
      >
        批量删除
      </el-button>
    </div>

    <!-- 表格设置按钮 -->
    <div class="space-x-4 text-base">
      <!-- 刷新表格 -->
      <el-tooltip
        class="item"
        effect="dark"
        content="刷新"
        placement="bottom-start"
      >
        <el-button
          size="small"
          icon="el-icon-refresh"
          class="cursor-pointer"
          circle
          @click="$emit('handleRefreshTable')"
        ></el-button>
      </el-tooltip>
      <!-- 关闭搜索 -->
      <el-tooltip
        class="item"
        effect="dark"
        content="关闭搜索"
        placement="bottom"
      >
        <el-button
          size="small"
          icon="el-icon-search"
          class="cursor-pointer"
          circle
          @click="$emit('closeSearchBar')"
        ></el-button>
      </el-tooltip>
      <!-- 关闭提示 -->
      <el-tooltip
        class="item"
        effect="dark"
        content="关闭提示"
        placement="bottom-end"
      >
        <el-button
          size="small"
          icon="el-icon-s-opportunity"
          class="cursor-pointer"
          circle
          @click="$emit('closeShowTipBar')"
        ></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component()
export default class TableToolbar extends Vue {
  @Prop({ type: String, default: '新增一条' })
  readonly createRowBtnLabel!: string;
}
</script>
