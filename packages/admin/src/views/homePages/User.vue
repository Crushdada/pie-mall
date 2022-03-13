<template>
  <div class="user">
    <!-- Table Tool Bar -->
    <table-tool-bar />
    <!-- Selected Tips -->
    <div
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
      v-loading="loading"
      :header-cell-style="{ background: '#f4f3f9', color: '#515a6e' }"
      :data="userList"
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
      ></el-table-column>
      <el-table-column
        prop="name"
        label="昵称"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="account"
        label="账号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="role"
        label="权限"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="receiving_address"
        label="地址"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            :disabled="!scope.row.receiving_address.length"
          >
            <p
              v-for="(address, i) in scope.row.receiving_address || []"
              :key="i"
            >
              {{ address }}
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
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getProfilesOfGuests } from '@/api/guest/get-guests';
import { deleteGuests } from '@/api/guest/cancel-account';
import TableToolBar from '@/components/TableToolBar.vue';
@Component({
  components: { TableToolBar },
})
export default class User extends Vue {
  private loading = true; // 表格加载状态
  private userList = null; // 表格数据
  private selectedUsers = []; // 已选中的rows

  /** Hooks */
  // ===================================================================
  async mounted() {
    this.userList = [
      {
        id: 'f82fede9-5883-4bca-805b-a156669359f4',
        account: 'crushdada1',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20as16-0hja35-0v2',
        account: 'saaeascasd2',
        name: '王小虎',
        role: 'vip',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '俩四十',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: 'f82fede9-5883-4bca-805b-a156669359f4',
        account: 'crushdada1',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20as16-0hja35-0v2',
        account: 'saaeascasd2',
        name: '王小虎',
        role: 'vip',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '俩四十',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: 'f82fede9-5883-4bca-805b-a156669359f4',
        account: 'crushdada1',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20as16-0hja35-0v2',
        account: 'saaeascasd2',
        name: '王小虎',
        role: 'vip',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '俩四十',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: 'f82fede9-5883-4bca-805b-a156669359f4',
        account: 'crushdada1',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20as16-0hja35-0v2',
        account: 'saaeascasd2',
        name: '王小虎',
        role: 'vip',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '王小虎',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        id: '20asf16-078hjfb5-0s3zsf4',
        account: '222asfasz3',
        name: '俩四十',
        role: 'guest',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ];
    try {
      // 获取商城用户信息
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
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }

  /** Methods */
  // ===================================================================
  handleSelectionChange(selectedUsers) {
    this.selectedUsers = selectedUsers;
  }
  handleClearSelected() {
    this.$refs.userTable.clearSelection();
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
  async handleDelete(index, user) {
    this.loading = true;
    try {
      const res = await deleteGuests([user.id]);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Delete account failed,Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      this.userList.splice(index, 1);
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
<style lang="scss" scoped></style>
