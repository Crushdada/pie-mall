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
          <a class="pl-4" href="">我的订单</a>
        </div>
      </el-header>
      <!-- body -->
      <main class="bg-gray-100 pb-10" style="padding: 0 160px">
        <el-card class="main-section bg-white mt-8">
          <el-table
            ref="goodsTable"
            tooltip-effect="dark"
            row-key="id"
            v-loading="loading"
            :cell-style="{ padding: '5px 3px' }"
            :header-cell-style="{
              padding: '8px 3px',
              color: '#424242',
            }"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <!-- 复选框 -->
            <el-table-column type="selection" width="50" align="center">
            </el-table-column>
            <!-- 样图 -->
            <el-table-column
              prop="thumb"
              label="样图"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <el-image
                  lazy
                  class="h-10 w-10"
                  :src="scope.row.thumb"
                ></el-image>
              </template>
            </el-table-column>
            <!-- 名称 -->
            <el-table-column
              prop="name"
              label="名称"
              width="350"
              align="center"
            >
              <template slot-scope="scope">
                <a href="`goodsPage/${scope.row.id}`"></a>
              </template>
            </el-table-column>
            <!-- 单价 -->
            <el-table-column
              prop="price"
              label="单价"
              width="80"
              show-overflow-tooltip
              align="center"
            ></el-table-column>
            <!-- 数量 -->
            <el-table-column
              prop="quantity"
              label="数量"
              width="80"
              align="center"
            ></el-table-column>
            <!-- 小计 -->
            <el-table-column
              prop="subTotal"
              label="小计"
              width="80"
              align="center"
            ></el-table-column>
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
          <!-- 统计栏 -->
          <div class="statistics"></div>
        </el-card>
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

@Component({
  components: { PersonalDropdownMenu },
})
export default class ShopCart extends Vue {
  private selectedGoods = []; // 已选中的rows
  private tableData = [];
  /** Computed*/
  // ===================================================================
  get shopCartData() {
    // 待修改为从vuex拿
    return cartGoodsList;
  }
  get cartGoodsList(): string | undefined {
    return this.shopCartData.map(function getSubTotal(good) {
      const { price, quantity } = good;
      const subTotal = price * quantity;
      good.subTotal = subTotal;
      return good;
    });
  }
  get totalPrice() {
    return cartGoodsList.reduce(function getSubTotal(total, good) {
      return (total += good.subTotal);
    }, 0);
  }
  /** Hooks */
  // ===================================================================
  mounted() {
    this.tableData = this.cartGoodsList;
  }
  // Methods
  // ===================================================================
  // 表格已选项变化
  handleSelectionChange(selectedGoods) {
    this.selectedGoods = selectedGoods;
  }
  // 从购物车删除单个商品
  async handleDeleteGood(index, good) {
    this.deleteGoodsByIds(good.id);
  }
  // 从购物车批量删除商品
  async handleDeleteGoods() {
    const deleteGoodsIds = this.selectedGoods.map(good => good.id);
    this.deleteGoodsByIds(deleteGoodsIds);
  }
  // 根据id从购物车删除商品
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
        const delIndex = this.tableData.findIndex(item => item.id === delIds);
        this.tableData.splice(delIndex, 1);
      } else {
        this.tableData = this.tableData.filter(good => {
          return !delIds.includes(good.id);
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.loading = false;
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

.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
  border-bottom: 2px $primary solid;
}
</style>
