<template>
  <div class="shop-cart">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <processing-header
        title="我的购物车"
        desc="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
      />
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
                  <a @click="navi2GoodsDetails(scope.row.id)">
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
                <strong class="primary"
                  >&nbsp;{{ selectedGoods.length }}
                </strong>
                件
              </span>
            </div>
            <div class="inline-block">
              <span class="primary pr-10">
                合计
                <em class="translate-bottom text-3xl font-bold"
                  >&nbsp;{{ selectedTotalPrice }} </em
                >元
              </span>
              <el-button
                style="width: 200px; height: 50px; font-size: 18px"
                type="primary"
                icon="el-icon-edit-outline"
                @click.native="handleNavi2BillingPage"
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
import { Component, Mixins } from 'vue-property-decorator';
import { debounce } from 'lodash';
import { isString } from '@/utils/getType';
import ShopCartMixin from '@/mixins/shop-cart.mixin.ts';
import { deleteGoodsFromCart } from '@/api/shop-cart/delete-goods-from-cart.ts';
import { setGoodsQuantityMap } from '@/api/shop-cart/set-goods-quantity-map.ts';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import ProcessingHeader from '@/components/ProcessingHeader.vue';

@Component({
  components: { PersonalDropdownMenu, ProcessingHeader },
})
export default class ShopCart extends Mixins(ShopCartMixin) {
  private selectedGoods = []; // 已选中的rows
  private tableData = [];
  private loading = true;
  // Computed
  // ===================================================================
  get selectedTotalPrice() {
    return this.selectedGoods.reduce(function getSelectedTotalPrice(
      total,
      good,
    ) {
      return (total += good.price * good.quantity);
    },
    0);
  }
  /** Hooks */
  // ===================================================================
  async mounted() {
    await this.loadShopCart(); // 加载购物车数据
    this.tableData = this.shopcart;
    this.loading = false;
  }
  // Methods
  // ===================================================================
  navi2GoodsDetails(id) {
    this.$router.push({ path: `goods/${id}` });
  }
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
        throw Error(JSON.stringify(res));
      }
      if (isString(delIds)) {
        const delIndex = this.tableData.findIndex(
          goodsMap => goodsMap.id === delIds,
        );
        this.tableData.splice(delIndex, 1);
      } else {
        this.tableData = this.tableData.filter(goodsMap => {
          return !delIds.includes(goodsMap.id);
        });
      }
    } catch (err) {
      this.$message({
        showClose: true,
        message: 'Delete goods failed,Please try again later.',
        type: 'error',
        center: true,
      });
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
    const { id: goodsMapId } = row;
    try {
      const res = await setGoodsQuantityMap(goodsMapId, newQuantity);
      if (res.status !== 0) {
        this.$set(row, 'quantity', oldQuantity);
        throw Error(JSON.stringify(res));
      }
    } catch (err) {
      this.$message({
        showClose: true,
        message: 'Patched shopcart goods failed,Please try again later.',
        type: 'error',
        center: true,
      });
      console.log(err);
    }
  }
  // 在跳转到订单页面之前，用事件车传递勾选的商品
  handleNavi2BillingPage() {
    this.$router.push({
      name: 'billing-page',
      query: { selectedGoods: this.selectedGoods },
    });
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
.divider {
  color: $gray-text1;
}
.main-section {
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
</style>
