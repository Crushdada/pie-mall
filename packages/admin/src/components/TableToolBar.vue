<template>
  <div class="table-tool-bar flex flex-row justify-between items-center">
    <!-- 表格功能按钮 -->
    <div class="">
      <el-button
        icon="el-icon-circle-plus-outline"
        type="primary"
        size="medium"
        @click="showAddUserDialog = true"
      >
        新增用户
      </el-button>
      <el-button
        icon="el-icon-circle-plus-outline"
        size="medium"
        @click="$emit('handleDeleteGuests')"
      >
        批量删除
      </el-button>
      <el-drawer
        title="请填写用户信息!"
        :before-close="handleCloseAddUserDialog"
        :visible.sync="showAddUserDialog"
        direction="ltr"
        custom-class="px-4"
        ref="drawer"
      >
        <div>
          <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" :label-width="formLabelWidth">
              <el-select v-model="form.role" placeholder="请选择用户角色">
                <el-option label="普通用户" value="guest"></el-option>
                <el-option label="vip贵宾" value="vip"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="用户账号"
              required
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              required
              label="用户密码"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              required
              label="收货地址"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="pt-6" style="text-align: center">
            <el-button class="mr-6" @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loadingAddUserDialog"
            >
              {{ loadingAddUserDialog ? '提交中 ...' : '确 定' }}
            </el-button>
          </div>
        </div>
      </el-drawer>
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
          @click="refreshTable"
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
import { insertGuest } from '@/api/guest/insert-guest';

@Component()
export default class TableToolbar extends Vue {
  private showAddUserDialog = false; // 是否显示【增加用户】功能的抽屉卡片
  //   private showEditUserDialog = false; // 是否显示【编辑用户】功能的抽屉卡片
  private loadingAddUserDialog = false; // 抽屉卡片加载状态
  private formLabelWidth = '80px';
  private timer = null;
  private form = {
    name: '',
    role: '',
    account: '',
    password: '',
    address: '',
  };
  // 刷新表格
  refreshTable() {
    this.$parent.getGuests();
  }
  // 关闭新增用户按钮弹出的抽屉
  handleCloseAddUserDialog(done) {
    if (this.loadingAddUserDialog) {
      return;
    }
    this.$confirm('确定要提交表单吗？')
      .then(async _ => {
        this.loadingAddUserDialog = true;
        // 请求新增一个用户
        const res = await insertGuest(this.form);
        console.log(this.form);
        // 失败
        if (res.status !== 0) {
          console.log(`🙈${res.detail}`);
          this.$message({
            showClose: true,
            message: '新增用户失败，请重试',
            type: 'error',
            center: true,
          });
        }
        // 成功
        setTimeout(() => {
          this.$message({
            showClose: true,
            message: '新增用户成功！',
            type: 'success',
            center: true,
          });
        }, 2000);

        this.timer = setTimeout(() => {
          done();
          // 动画关闭需要一定的时间
          setTimeout(() => {
            this.loadingAddUserDialog = false;
          }, 400);
        }, 2000);
      })
      .catch(_ => {});
  }
  // 取消提交新增的用户信息
  cancelForm() {
    this.loadingAddUserDialog = false;
    this.showAddUserDialog = false;
    clearTimeout(this.timer);
  }
}
</script>
