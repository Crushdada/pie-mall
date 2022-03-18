<template>
  <div class="goods">
    <!-- Search Tool Bar -->
    <div
      v-show="showSearchBar"
      class="serch-bar py-2 flex flex-row flex-nowrap justify-center items-center"
    >
      商品名：
      <el-input
        class="mr-5"
        v-model="searchKeyWord.key"
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
      <el-button size="medium" @click="tableData = goodsList">重 置</el-button>
    </div>
    <!-- Table Tool Bar -->
    <table-tool-bar
      class="my-2"
      :createRowBtnLabel="`上架商品`"
      @handleAddNewRow="handleShowDrawer"
      @handleDeleteRows="handleDeleteGoods"
      @handleRefreshTable="getGoods"
      @closeSearchBar="showSearchBar = !showSearchBar"
      @closeShowTipBar="showTipBar = !showTipBar"
    />
    <!-- drawer抽屉 -->
    <create-row-drawer
      title="请填写商品信息"
      ref="drawer"
      :loading="loadingAddGoodDialog"
      :formComs="addGoodFormItems"
      @beforeCloseDrawer="beforeCloseAddGoodDialog"
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
        {{ selectedGoods.length }}
      </span>
      项
      <el-button type="text" @click="handleClearSelected">清空</el-button>
    </div>
    <!-- Table -->
    <el-table
      stripe
      border
      ref="goodsTable"
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
    >
      <el-table-column type="selection" width="50" align="center">
      </el-table-column>
      <el-table-column type="index" label="#" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="G_id"
        label="uid"
        width="300"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="G_category"
        label="分类"
        width="160"
        align="center"
        sortable
        :filters="selectOptions"
        :filter-method="filterCategory"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag disable-transitions>
            {{ scope.row.G_category }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="G_thumb" label="样图" width="120" align="center">
        <template slot-scope="scope">
          <el-image
            lazy
            class="h-10 w-10"
            :preview-src-list="[scope.row.G_thumb]"
            :src="scope.row.G_thumb"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="G_info"
        label="介绍"
        width="350"
        align="center"
        sortable
      >
        <template slot-scope="scope">
          <el-popover
            trigger="click"
            placement="top"
            :disabled="!scope.row.G_info"
          >
            <p>
              {{ scope.row.G_info }}
            </p>
            <el-tag
              slot="reference"
              type="primary"
              size="medium"
              style="width: 335px"
              class="cursor-pointer truncate"
            >
              {{ scope.row.G_info }}
            </el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="G_price"
        label="价格"
        width="80"
        show-overflow-tooltip
        align="center"
        sortable
      ></el-table-column>
      <el-table-column
        prop="G_stock"
        label="库存"
        width="80"
        align="center"
        sortable
      ></el-table-column>
      <el-table-column fixed="right" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDeleteGood(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
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
import { Component, Vue } from 'vue-property-decorator';
import { getAllGoods } from '@/api/goods/get-goods';
import { deleteGoods } from '@/api/goods/delete-goods';
import { insertGood } from '@/api/goods/insert-good';
import { getGoodsCategories } from '@/api/goods/get-categories';
import TableToolBar from '@/components/TableToolBar.vue';
import { cloneDeep, slice } from 'lodash';
import CreateRowDrawer from '@/components/CreateRowDrawer.vue';
import { AddGoodForm } from './add-good-form';
import { Drawer } from 'element-ui';
import { Ref } from 'vue-property-decorator';
import { isString } from '../../utils/getType';
import { SET_GOODS_DATASET } from '@/store/goods.module/mutations/set-goods-dataset.mutation';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';

@Component({
  components: { TableToolBar, CreateRowDrawer },
})
export default class GoodsInfo extends Vue {
  /** Setup */
  // ===================================================================
  // 表格
  private loading = true; // 表格加载状态
  private selectedGoods = []; // 已选中的rows
  private pageCounts = 1;
  private chunkSizes = [10, 20, 50]; // 分页的每页行数选择
  private chunkSize = 20; // 分页的每页行数
  private currentPage = 1;

  // tool bar
  private tableData = []; // 筛选搜索后，实时展示的表格数据
  private searchKeyWord = { key: '' }; // 搜索关键词集合
  private showSearchBar = true; // 是否展示搜索栏
  private showTipBar = true; // 是否展示提示栏
  private categoryDict = {
    // 用于转换商品类别label
    headset: '耳机',
    router: '路由器',
    television: '数码电视',
    tablet_PC: '平板电脑',
    notebook_computer: '笔记本电脑',
    smart_home: '智能家居',
    mobile_phone: '智能手机',
    intelligent_watch: '智能手表',
    intelligent_speaker: '智能语音',
  };
  // drawer抽屉
  private loadingAddGoodDialog = false; // 抽屉卡片加载状态
  private timer = null;
  private addGoodFormItems = AddGoodForm;
  private selectOptions = null;

  /** Computed */
  // ===================================================================
  get goodsList() {
    return this.$store.state[VuexModuleName.GOODS].goodsDataset;
  }
  get form() {
    return this.addGoodFormItems.reduce((dict, formItem) => {
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
    this.init();
  }

  /** Methods */
  // ===================================================================
  init() {
    this.getAllGoodsCategories();
    if (this.goodsList.length === 0) {
      this.getGoods();
    }
    // 分片
    this.pageCounts = this.goodsList.length;
    this.handleSizeChange();
    this.loading = false;
  }
  handleShowDrawer() {
    this.drawer.handleShowDrawer();
  }
  handleSelectionChange(selectedGoods) {
    this.selectedGoods = selectedGoods;
  }
  handleClearSelected() {
    this.goodsTable.clearSelection();
  }
  filterCategory(value, row) {
    return row.G_category === value;
  }
  handleSizeChange(chunkSize) {
    const realChunkSize = chunkSize || this.chunkSize;
    this.chunkTableData(0, realChunkSize);
    this.currentPage = 1;
  }
  handleCurrentChange(currentPage) {
    const startIndex = (currentPage - 1) * this.chunkSize;
    const endIndex = startIndex + this.chunkSize - 1;
    this.chunkTableData(startIndex, endIndex);
  }
  chunkTableData(start: number, end: number) {
    this.loading = true;
    this.tableData = slice(this.goodsList, start, end);
    this.loading = false;
  }
  // 搜索表格数据
  filterTableData() {
    this.tableData = this.goodsList.filter(data => {
      if (!data['G_info']) data.G_info = ''; // 解决遇到空值时直接报错阻塞的bug
      return (
        !this.searchKeyWord.key ||
        data.G_info.toLowerCase().includes(
          this.searchKeyWord?.key.toLowerCase(),
        )
      );
    });
  }

  /**
   * 获取全部商品类别
   */
  async getAllGoodsCategories() {
    try {
      const res = await getGoodsCategories();
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      const { goodsCategories } = res.data;
      this.selectOptions = goodsCategories.map(item => ({
        text: this.categoryDict[item],
        value: item,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 关闭【新增一行数据】按钮弹出的抽屉
   * 二次确认是否提交
   */
  beforeCloseAddGoodDialog(done) {
    if (this.loadingAddGoodDialog) {
      return;
    }
    this.$confirm('确定要提交表单吗？')
      .then(async _ => {
        this.loadingAddGoodDialog = true;
        // 请求新增一条数据
        const res = await insertGood(this.form);
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
            this.loadingAddGoodDialog = false;
            // 清空抽屉的表单状态
            this.addGoodFormItems = this.addGoodFormItems.map(item => {
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

  // 取消提交新增数据的表单
  cancelForm() {
    this.loadingAddGoodDialog = false;
    this.drawer.cancelSubmit();
    clearTimeout(this.timer);
  }

  // 获取商品信息
  async getGoods() {
    this.loading = true;
    try {
      const res = await getAllGoods();
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Get goods dataset failed, Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      const { allGoods } = res.data;
      this.$stock.commit(SET_GOODS_DATASET, allGoods);
      this.chunkTableData(0, this.chunkSize);
    } catch (err) {
      console.log(err);
    }
    setTimeout(_ => {
      this.loading = false;
    }, 200);
  }

  // 编辑商品信息
  async handleEdit(index, good) {
    this.loading = true;
    try {
      const res = await deleteGoods([good.id]);
      if (res.status !== 0) {
        // this.$message({
        //   showClose: true,
        //   message: 'Delete account failed,Please try again later.',
        //   type: 'error',
        //   center: true,
        // });
        // throw Error(JSON.stringify(res));
      }
      // this.goodsList.splice(index, 1);
      // this.$message({
      //   showClose: true,
      //   message: 'Delete good successfully',
      //   type: 'success',
      //   center: true,
      // });
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }

  // 删除单个商品
  async handleDeleteGood(index, good) {
    this.deleteGoodsByIds(good.id);
  }

  // 批量删除商品
  async handleDeleteGoods() {
    const deleteGuestIds = this.selectedGoods.map(good => good.id);
    this.deleteGoodsByIds(deleteGuestIds);
  }

  // 根据id删除商品
  async deleteGoodsByIds(delIds: string[] | string) {
    this.loading = true;
    try {
      const res = await deleteGoods(delIds);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Delete goods failed,Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      if (isString(delIds)) {
        const delIndex = this.tableData.findIndex(item => item.id === delIds);
        this.tableData.splice(delIndex, 1);
      } else {
        this.tableData = this.tableData.filter(good => {
          return !delIds.includes(good.id);
        });
      }
      this.$message({
        showClose: true,
        message: 'Delete goods successfully',
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
