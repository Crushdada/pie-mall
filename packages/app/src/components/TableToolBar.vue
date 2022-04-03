<template>
  <div class="table-tool-bar flex flex-row justify-between items-center">
    <!-- 表格功能按钮 -->
    <div class="flex flex-row flex-nowrap space-x-4">
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        size="medium"
        @click="$emit('handleAddNewRow')"
      >
        {{ createRowBtnLabel }}
      </el-button>
      <el-button
        icon="el-icon-delete-solid"
        size="medium"
        @click="$emit('handleDeleteRows')"
      >
        批量删除
      </el-button>
      <el-upload
        ref="elUpload"
        :auto-upload="false"
        :show-file-list="false"
        action
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :on-change="file => $emit('handleAddRowsByExcel', file)"
        :limit="1"
      >
        <el-button
          size="medium"
          icon="el-icon-circle-plus-outline"
          type="primary"
        >
          批量上传
        </el-button>
      </el-upload>
    </div>

    <!-- 表格设置按钮 -->
    <div class="flex flex-row flex-nowrap space-x-4 text-base">
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
import { Prop, Ref } from 'vue-property-decorator';
import { Upload } from 'element-ui';
@Component()
export default class TableToolbar extends Vue {
  @Prop({ type: String, default: '新增一条' })
  readonly createRowBtnLabel!: string;

  @Ref('elUpload') readonly elUpload: Upload;

  // 清空上传列表
  clearFiles() {
    this.elUpload.clearFiles();
  }
}
</script>
