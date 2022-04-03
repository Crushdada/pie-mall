<template>
  <div class="user">
    <!-- Search Tool Bar -->
    <div
      v-show="showSearchBar"
      class="serch-bar py-2 flex flex-row flex-nowrap justify-center items-center"
    >
      用户名：
      <el-input
        class="mr-5"
        v-model="searchKeyWord.name"
        type="text"
        clearable
        placeholder="输入关键字搜索"
        style="font-size: 17px; width: 200px"
      />
      <!-- 搜索按钮 -->
      <el-button
        icon="el-icon-search"
        type="primary"
        size="medium"
        @click="filterTableData"
        >搜 索</el-button
      >
      <!-- 重置按钮 -->
      <el-button size="medium" @click="tableData = userList">重 置</el-button>
    </div>
    <!-- Table Tool Bar -->
    <table-tool-bar
      class="my-2"
      :createRowBtnLabel="`新增用户`"
      @handleAddNewRow="handleShowDrawer"
      @handleDeleteRows="handleDeleteGuests"
      @handleRefreshTable="getGuests"
      @closeSearchBar="showSearchBar = !showSearchBar"
      @closeShowTipBar="showTipBar = !showTipBar"
    />
    <!-- drawer抽屉       :showDrawer="showAddUserDialog"-->
    <create-row-drawer
      title="请填写用户信息"
      ref="drawer"
      :loading="loadingAddUserDialog"
      :formComs="addUserFormItems"
      @beforeCloseDrawer="beforeCloseAddUserDialog"
      @cancelForm="cancelForm"
    />
    <!-- Selected Tips -->
    <div
      v-show="showTipBar"
      class="my-2.5 px-2 rounded-md"
      style="border: 1px solid #abdcff; background-color: #f0faff"
    >
      <i class="el-icon-warning" style="color: #409eff"></i>
      已选择
      <span class="font-bold" style="color: #409eff">
        {{ selectedUsers.length }}
      </span>
      项
      <el-button type="text" @click="handleClearSelected">清空</el-button>
    </div>
    <!-- Table -->
    <el-table
      stripe
      border
      ref="userTable"
      tooltip-effect="dark"
      style="width: 100%"
      header-align="center"
      max-height="450"
      row-key="id"
      v-loading="loading"
      :header-cell-style="{ background: '#f4f3f9', color: '#515a6e' }"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center">
      </el-table-column>
      <el-table-column type="index" label="#" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="id"
        label="uid"
        width="280"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="120"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="120"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        label="权限"
        width="80"
        align="center"
        :filters="[
          { text: '普通用户', value: 'guest' },
          { text: 'vip', value: 'vip' },
        ]"
        :filter-method="filterRole"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.role === 'vip' ? 'danger' : 'primary'"
            disable-transitions
          >
            {{ scope.row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        show-overflow-tooltip
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            :disabled="!scope.row.receiving_address.length"
          >
            <p
              v-for="addressRow in scope.row.receiving_address || []"
              :key="addressRow.id"
            >
              {{ addressRow.address }}
            </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{
                scope.row.receiving_address.length
              }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteGuest(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { getProfilesOfGuests } from '@/api/guest/get-guests';
import { deleteGuests } from '@/api/guest/cancel-account';
import { insertGuest } from '@/api/guest/insert-guest';
import TableToolBar from '@/components/TableToolBar.vue';
import { cloneDeep } from 'lodash';
import CreateRowDrawer from '@/components/CreateRowDrawer.vue';
import { AddUserForm } from './add-user-form';
import { Drawer } from 'element-ui';
import { isString } from '../../utils/getType';
@Component({
  components: { TableToolBar, CreateRowDrawer },
})
export default class User extends Vue {
  /** Setup */
  // ===================================================================
  // 表格
  private loading = true; // 表格加载状态
  private userList = null; // 用户数据
  private selectedUsers = []; // 已选中的rows
  // tool bar
  private tableData = []; // 筛选搜索后，实时展示的表格数据
  private searchKeyWord = { name: '' }; // 搜索关键词集合
  private showSearchBar = true; // 是否展示搜索栏
  private showTipBar = true; // 是否展示提示栏
  // drawer抽屉
  private loadingAddUserDialog = false; // 抽屉卡片加载状态
  private timer = null;
  private addUserFormItems = AddUserForm;

  /** Computed */
  // ===================================================================
  get form() {
    return this.addUserFormItems.reduce((dict, formItem) => {
      const key = formItem.modelName;
      const val = formItem.modelVal;
      dict[key] = val;
      return dict;
    }, {});
  }
  @Ref('drawer') readonly drawer: Drawer;
  /** Hooks */
  // ===================================================================
  async mounted() {
    this.getGuests();
  }

  /** Methods */
  // ===================================================================
  handleShowDrawer() {
    this.drawer.handleShowDrawer();
  }
  handleSelectionChange(selectedUsers) {
    this.selectedUsers = selectedUsers;
  }

  handleClearSelected() {
    this.userTable.clearSelection();
  }

  filterRole(value, row) {
    return row.role === value;
  }

  // 搜索表格数据
  filterTableData() {
    this.tableData = this.userList.filter(data => {
      if (!data['name']) data.name = ''; // 解决遇到空值时直接报错阻塞的bug
      return (
        !this.searchKeyWord.name ||
        data.name.toLowerCase().includes(this.searchKeyWord?.name.toLowerCase())
      );
    });
  }

  /**
   * 关闭新增用户按钮弹出的抽屉
   * 二次确认是否提交
   */
  beforeCloseAddUserDialog(done) {
    if (this.loadingAddUserDialog) {
      return;
    }
    this.$confirm('确定要提交表单吗？')
      .then(async _ => {
        this.loadingAddUserDialog = true;
        // 请求新增一条数据
        const res = await insertGuest(this.form);
        // 失败
        if (res.status !== 0) {
          console.log(`🙈${res.detail}`);
          this.$message({
            showClose: true,
            message: '新增数据失败，请重试',
            type: 'error',
            center: true,
          });
        }
        // 成功
        setTimeout(() => {
          this.$message({
            showClose: true,
            message: '成功新增一条数据！',
            type: 'success',
            center: true,
          });
        }, 2000);

        this.timer = setTimeout(() => {
          done();
          // 动画关闭需要一定的时间
          setTimeout(() => {
            this.loadingAddUserDialog = false;
            // 清空抽屉的表单状态
            this.addUserFormItems = this.addUserFormItems.map(item => {
              item.modelVal = '';
              return item;
            });
          }, 400);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // 取消提交新增的用户信息
  cancelForm() {
    this.loadingAddUserDialog = false;
    this.drawer.cancelSubmit();
    clearTimeout(this.timer);
  }

  // 获取商城用户信息
  async getGuests() {
    this.loading = true;
    try {
      const res = await getProfilesOfGuests();
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Get user profile failed,Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      const { guests } = res.data;
      this.userList = guests;
      this.tableData = cloneDeep(guests);
    } catch (err) {
      console.log(err);
    }
    setTimeout(_ => {
      this.loading = false;
    }, 200);
  }

  // 编辑商城用户信息
  async handleEdit(index, user) {
    this.loading = true;
    try {
      const res = await deleteGuests([user.id]);
      if (res.status !== 0) {
        // this.$message({
        //   showClose: true,
        //   message: 'Delete account failed,Please try again later.',
        //   type: 'error',
        //   center: true,
        // });
        // throw Error(JSON.stringify(res));
      }
      // this.userList.splice(index, 1);
      // this.$message({
      //   showClose: true,
      //   message: 'Delete user successfully',
      //   type: 'success',
      //   center: true,
      // });
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }

  // 注销商城用户
  async handleDeleteGuest(index, user) {
    this.deleteGuestsByIds(user.id);
  }

  // 注销商城用户
  async handleDeleteGuests() {
    const deleteGuestIds = this.selectedUsers.map(user => user.id);
    this.deleteGuestsByIds(deleteGuestIds);
  }

  // 根据id列表删除商城用户
  async deleteGuestsByIds(delIds: string[] | string) {
    this.loading = true;
    try {
      const delIdSet = isString(delIds) ? [delIds] : delIds;

      const res = await deleteGuests(delIdSet);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Delete account failed,Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      if (isString(delIds)) {
        const delUserIndex = this.tableData.findIndex(
          item => item.id === delIds,
        );
        this.tableData.splice(delUserIndex, 1);
      } else {
        this.tableData = this.tableData.filter(user => {
          return !delIds.includes(user.id);
        });
      }
      this.$message({
        showClose: true,
        message: 'Delete user successfully',
        type: 'success',
        center: true,
      });
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }
}
</script>
