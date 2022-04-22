<template>
  <div class="orders">
    <!-- Search Tool Bar -->
    <div
      v-show="showSearchBar"
      class="serch-bar py-2 flex flex-row flex-nowrap justify-center items-center"
    >
      订单号：
      <el-input
        class="mr-5"
        v-model="searchKeyWord.key"
        type="text"
        clearable
        placeholder="输入订单号搜索"
        style="font-size: 17px; width: 200px"
      />
      <!-- 搜索按钮 -->
      <el-button
        icon="el-icon-search"
        type="primary"
        size="medium"
        @click="searchedTableData"
        >搜 索</el-button
      >
      <!-- 重置按钮 -->
      <el-button size="medium" @click="handleResetSearch">重 置</el-button>
    </div>
    <!-- Table Tool Bar -->
    <table-tool-bar
      ref="toolbar"
      class="my-2"
      createRowBtnLabel="添加订单"
      @handleRefreshTable="getOriginalData"
      @closeSearchBar="showSearchBar = !showSearchBar"
      @closeShowTipBar="showTipBar = !showTipBar"
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
        {{ selectedRows.length }}
      </span>
      项
      <el-button type="text" @click="handleClearSelected">清空</el-button>
    </div>
    <!-- Table -->
    <el-table
      stripe
      border
      ref="orderTable"
      tooltip-effect="dark"
      style="width: 100%"
      header-align="center"
      max-height="450"
      row-key="id"
      v-loading="loading"
      :cell-style="{ padding: '5px 3px' }"
      :header-cell-style="{
        padding: '8px 3px',
        background: '#f4f3f9',
        color: '#515a6e',
      }"
      :data="tableData"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
    >
      <el-table-column type="selection" width="50" align="center">
      </el-table-column>
      <!-- id -->
      <el-table-column
        prop="id"
        label="uid"
        width="300"
        align="center"
        sortable
      ></el-table-column>
      <!-- 用户名 -->
      <el-table-column
        prop="guestName"
        label="用户名"
        width="150"
        align="center"
        sortable
      >
      </el-table-column>
      <!-- 订单总价 -->
      <el-table-column
        prop="totalPrice"
        label="订单总额"
        width="110"
        align="center"
        sortable
      >
      </el-table-column>
      <!-- 收货信息  -->
      <el-table-column label="收货信息" width="300" align="center">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <div>
              <span> 收货人： {{ scope.row.address.consignee_name }}</span
              ><br />
              <span> 联系方式： {{ scope.row.address.phone }}</span
              ><br />
              <span> 收货地址： {{ scope.row.address.address }}</span
              ><br />
            </div>

            <el-tag
              slot="reference"
              type="primary"
              size="medium"
              style="max-width: 335px; width: fix-content"
              class="cursor-pointer truncate"
            >
              {{ scope.row.address.address }}
            </el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <!-- 订单状态 -->
      <el-table-column
        label="订单状态"
        width="110"
        align="center"
        column-key="status"
        :filters="selectOptions"
        :filter-method="() => true"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            disable-transitions
            :type="scope.row.status === 'to_pay' ? 'danger' : 'primary'"
          >
            {{ statusDict[scope.row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 下单时间 -->
      <el-table-column label="下单时间" width="160" align="center" sortable>
        <template slot-scope="scope">
          {{ format(new Date(scope.row.timeStamp), 'yyyy-MM-dd hh:mm:ss') }}
        </template>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column fixed="right" align="center" width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkDetails(scope.$index, scope.row)">
            查看详情
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteRow(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="mt-2"
      background
      @size-change="
        () => {
          chunk(1);
        }
      "
      @current-change="chunk"
      :current-page="currentPage"
      :page-sizes="chunkSizes"
      :page-size.sync="chunkSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageCounts"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { getAllOrders } from '@/api/order/get-orders';
import TableToolBar from '@/components/TableToolBar.vue';
import { cloneDeep, slice } from 'lodash';
import { Table } from 'element-ui';
import { SET_ORDER_DATASET } from '@/store/order.module/mutations/set-order-dataset.mutation';
import { OrderStatus } from '../../../../types/order/order-status.enum.ts';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { format } from '../../utils/formatDate.ts';
@Component({
  components: { TableToolBar },
})
export default class GoodsInfo extends Vue {
  /** Setup */
  // ===================================================================
  // 表格
  private loading = true; // 表格加载状态
  private selectedRows = []; // 已选中的rows
  private chunkSizes = [10, 20, 50]; // 分页的每页行数选择
  private chunkSize = 20; // 分页的每页行数
  private currentPage = 1; // 当前页数
  private selectedFilters = null; // 选中的筛选条件
  private pageCounts = 1;
  private format = format;

  // tool bar
  private tableData = []; // 筛选搜索后，实时展示的表格数据
  private searchKeyWord = { key: '' }; // 搜索关键词集合
  private showSearchBar = true; // 是否展示搜索栏
  private showTipBar = true; // 是否展示提示栏
  private clickedSearchBtn = false;
  private statusDict = {
    // 用于转换订单状态label
    [OrderStatus.TO_PAY]: '待付款',
    [OrderStatus.TO_SEND]: '待发货',
    [OrderStatus.COMPLETED]: '已完成',
    [OrderStatus.TO_RETURN]: '待退货',
  };

  /** Computed */
  // ===================================================================
  get selectOptions() {
    const r = Object.keys(this.statusDict).map(status => ({
      text: this.statusDict[status],
      value: status,
    }));
    return r;
  }

  get orderList() {
    return this.$store.state[VuexModuleName.ORDER].orderDataset;
  }
  // 是否过滤表格数据，过滤包含筛选和搜索两个行为
  get dataFiltered() {
    return this.dataSearched || this.dataScreened;
  }
  // 是否搜索表格数据
  get dataSearched() {
    return this.clickedSearchBtn;
  }
  // 是否筛选表格数据
  get dataScreened() {
    if (!this.selectedFilters) return false;
    for (const filters of Object.values(this.selectedFilters)) {
      if (filters.length) return true;
    }
    return false;
  }
  // 商品搜索结果数组
  get filteredTableData() {
    return this.orderList.filter(order => {
      // 解决遇到空值时直接报错阻塞的bug
      for (const attr of Object.keys(order)) {
        if (!order[attr]) order[attr] = '';
      }
      // 过滤掉不符合筛选的
      if (this.selectedFilters) {
        for (const key of Object.keys(this.selectedFilters)) {
          if (
            this.dataScreened &&
            !this.selectedFilters[key].includes(order[key])
          ) {
            return false;
          }
        }
      }
      // 过滤掉不符合搜索的
      const matchSearchKeys =
        !this.dataSearched ||
        order.id.trim() === this.searchKeyWord?.key.trim();
      return matchSearchKeys;
    });
  }

  get realTableData() {
    return this.dataFiltered ? this.filteredTableData : this.orderList;
  }

  @Ref('toolbar') readonly toolbar: TableToolBar;
  @Ref('orderTable') readonly orderTable: Table;

  /** Hooks */
  // ===================================================================
  mounted() {
    this.init();
  }

  /** Methods */
  // ===================================================================
  init() {
    // 如果本地没有数据存留，再请求
    if (this.orderList.length === 0) {
      // 获取全部表格源数据
      this.getOriginalData();
    }
    this.chunk(1);
  }
  userNameformatter(row, col) {
    return row.guest.name;
  }
  // 分片
  chunk(currentPage) {
    this.loading = true;
    this.currentPage = currentPage;
    const startIndex = (currentPage - 1) * this.chunkSize;
    const endIndex = startIndex + this.chunkSize;
    this.tableData = slice(this.realTableData, startIndex, endIndex);
    this.pageCounts = this.realTableData.length;
    this.loading = false;
  }
  // 搜索表格数据
  searchedTableData() {
    if (!this.searchKeyWord?.key) return;
    this.clickedSearchBtn = true;
    this.chunk(1);
  }
  // 重置搜索
  handleResetSearch() {
    if (!this.dataSearched) return;
    this.clickedSearchBtn = false;
    this.chunk(1);
    this.$set(this.searchKeyWord, 'key', '');
  }
  // 筛选条件改变
  filterChange(filterOpt) {
    this.selectedFilters = filterOpt;
    this.chunk(1);
  }

  // 表格已选项变化
  handleSelectionChange(selectedRows) {
    this.selectedRows = selectedRows;
  }
  // 清空表格已选
  handleClearSelected() {
    this.orderTable.clearSelection();
  }

  // 获取全部表格源数据
  async getOriginalData() {
    this.loading = true;
    try {
      const res = await getAllOrders();
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      const { allOrders } = res.data;
      // 去除丢失商品映射的订单，同时计算订单总额、用户名升维
      const processedOrders = allOrders.filter(order => {
        if (order.goods_maps.length === 0) return false;
        order.guestName = order.guest.name || '游客';
        order.totalPrice = order.goods_maps.reduce((total, goodsMap) => {
          return (total +=
            parseInt(goodsMap.good.G_price) * parseInt(goodsMap.quantity));
        }, 0);
        return true;
      });
      this.$stock.commit(SET_ORDER_DATASET, processedOrders);
      this.chunk(1);
    } catch (err) {
      this.$message({
        showClose: true,
        message: 'Get order dataset failed, Please try again later.',
        type: 'error',
        center: true,
      });
      console.log(err);
    }
    setTimeout(_ => {
      this.loading = false;
    }, 200);
  }
  // 查看详情
  checkDetails(index, row) {
    this.displayRow = row;
    this.showDetails = true;
  }
  // 删除单行
  handleDeleteRow(index, good) {
    this.$message({
      showClose: true,
      message: '您没有执行此操作的权限！',
      type: 'warning',
      center: true,
    });
  }
}
</script>
<style lang="scss" scoped></style>
