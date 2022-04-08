<template>
  <div class="shop-cart">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <el-header
        class="header flex flex-row flex-nowrap justify-between items-center"
        style="height: 100px; padding: 0 160px; color: #757575"
      >
        <div
          class="flex flex-row flex-nowrap justify-around items-center space-x-4"
        >
          <img
            class="mr-6 object-cover object-center cursor-pointer"
            style="width: 56px; height: 56px"
            src="@/assets/pie-app-logo.svg"
            alt="pie mall logo"
          />
          <h1 style="font-size: 28px">我的购物车</h1>
          <span class="text-xs self-end pb-3">
            温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
          </span>
        </div>

        <div class="right-tab text-xs">
          <PersonalDropdownMenu style="color: #757575" />
          <span class="divider">|</span>
          <a class="pl-4" @click="() => $router.push({ name: 'order' })"
            >我的订单</a
          >
        </div>
      </el-header>
      <!-- body -->
      <main class="bg-gray-100 relative pb-10" style="padding: 0 160px">
        <el-card class="main-section bg-white mt-8">
          <el-table
            ref="goodsTable"
            tooltip-effect="dark"
            row-key="id"
            v-loading="loading"
            :cell-style="{ padding: '5px 3px', 'font-size': '18px' }"
            :header-cell-style="{
              padding: '20px 3px',
              color: '#424242',
            }"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <!-- 复选框 -->
            <el-table-column
              label="全选"
              type="selection"
              width="50"
              align="center"
            >
            </el-table-column>
            <!-- 样图 -->
            <el-table-column
              prop="thumb"
              label="样图"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-image
                  lazy
                  style="width: 80px; height: 80px"
                  :src="scope.row.thumb"
                ></el-image>
              </template>
            </el-table-column>
            <!-- 名称 -->
            <el-table-column prop="name" label="名称" width="380" align="left">
              <template slot="header">
                <span class="pl-14">商品名称</span>
              </template>
              <template slot-scope="scope">
                <div class="pl-14">
                  <a @click="() => $router.push({ path: `goods/${scope.row.id}` })">
                    {{ scope.row.name }}
                  </a>
                </div>
              </template>
            </el-table-column>
            <!-- 单价 -->
            <el-table-column
              prop="price"
              label="单价"
              width="140"
              show-overflow-tooltip
              align="center"
            >
              <template slot-scope="scope">
                <span class="text-base"> {{ scope.row.price }}元 </span>
              </template>
            </el-table-column>
            <!-- 数量 -->
            <el-table-column
              prop="quantity"
              label="数量"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  @change="
                    (curVal, oldVal) => {
                      debounceQuantityChange(curVal, oldVal, scope.row);
                    }
                  "
                  :min="1"
                  :max="100"
                  size="mini"
                  label="购买数量"
                ></el-input-number>
              </template>
            </el-table-column>
            <!-- 小计 -->
            <el-table-column
              prop="subTotal"
              label="小计"
              width="160"
              align="center"
            >
              <template slot-scope="scope">
                <span class="text-base primary">
                  {{ scope.row.quantity * scope.row.price }}元</span
                >
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              width="150"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteGood(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <!-- 统计栏 -->
        <div class="total-bar sticky bottom-0 text-sm bg-white my-4 z-10">
          <div class="flex flex-row justify-between items-center">
            <div class="inline-block pl-5" style="color: #757575">
              <a @click="() => $router.push({ name: 'home' })" class="pr-2"
                >继续购物</a
              >
              <el-divider direction="vertical"></el-divider>
              <span class="pl-1">
                已选择
                <strong class="primary">&nbsp;{{ totalNums }} </strong>
                件
              </span>
            </div>
            <div class="inline-block">
              <span class="primary pr-10">
                合计
                <em class="translate-bottom text-3xl font-bold"
                  >&nbsp;{{ totalPrice }} </em
                >元
              </span>
              <el-button
                style="width: 200px; height: 50px; font-size: 18px"
                type="primary"
                icon="el-icon-edit-outline"
              >
                去结算
              </el-button>
            </div>
          </div>
        </div>
      </main>
      <!-- Footer -->
      <footer class="text-center py-2">
        🌏 © 2022 Pie-Mall , code by Crushdada - Beijing , just send me an
        offer, Please.
      </footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import { cartGoodsList } from './mock-shop-cart.js';
import { isString } from '@/utils/getType';
import { deleteGoodsFromCart } from '@/api/shop-cart/delete-goods-from-cart.ts';
import { debounce } from 'lodash';
import { setGoodsQuantityMap } from '@/api/shop-cart/set-goods-quantity-map.ts';

@Component({
  components: { PersonalDropdownMenu },
})
export default class ShopCart extends Vue {
  private selectedGoods = []; // 已选中的rows
  private tableData = [];
  private loading = true;
  /** Computed*/
  // ===================================================================
  get shopCartData() {
    // 待修改为从vuex拿
    return cartGoodsList;
  }
  get totalNums() {
    return this.tableData.reduce(function getTotalNums(total, good) {
      return (total += good.quantity);
    }, 0);
  }
  get totalPrice() {
    return this.tableData.reduce(function getTotalPrice(total, good) {
      return (total += good.price * good.quantity);
    }, 0);
  }
  /** Hooks */
  // ===================================================================
  mounted() {
    this.tableData = this.shopCartData;
    this.loading = false;
  }
  // Methods
  // ===================================================================
  // 表格已选项变化
  handleSelectionChange(selectedGoods) {
    this.selectedGoods = selectedGoods;
  }
  // 从购物车删除单个商品
  async handleDeleteGood(index, goodsMap) {
    this.deleteGoodsByIds(goodsMap.id);
  }
  // 从购物车批量删除商品
  async handleDeleteGoods() {
    const deleteGoodsIds = this.selectedGoods.map(goodsMap => goodsMap.id);
    this.deleteGoodsByIds(deleteGoodsIds);
  }
  // 根据goods-map id从购物车删除商品
  async deleteGoodsByIds(delIds: string[] | string) {
    this.loading = true;
    try {
      const res = await deleteGoodsFromCart(delIds);
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
        const delIndex = this.tableData.findIndex(goodsMap => goodsMap.id === delIds);
        this.tableData.splice(delIndex, 1);
      } else {
        this.tableData = this.tableData.filter(goodsMap => {
          return !delIds.includes(goodsMap.id);
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
  }
  // 防抖
  debounceQuantityChange = debounce(
    (newQuantity, oldQuantity, row) => {
      this.updateGoodsQuantityMap(newQuantity, oldQuantity, row);
    },
    1000,
    { maxWait: 3000 },
  );
  // 调整购买商品的数量
  async updateGoodsQuantityMap(newQuantity, oldQuantity, row) {
    const { id:goodsMapId } = row;
    try {
      const res = await setGoodsQuantityMap(goodsMapId, newQuantity);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Patched shopcart goods failed,Please try again later.',
          type: 'error',
          center: true,
        });
        this.$set(row, 'quantity', oldQuantity);
        throw Error(JSON.stringify(res));
      }
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.divider {
  color: $gray-text1;
}
.main-section,
h1 {
  color: $dark-text;
}
.translate-bottom {
  display: inline-block;
  transform: translateY(5px) !important;
  padding-right: 10px;
}
.total-bar {
  box-shadow: 0 2px 5px 4px hsl(0deg 0% 24% / 10%);
}
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
  border-bottom: 2px $primary solid;
}
</style>
