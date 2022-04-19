<template>
  <div class="billing">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <processing-header
        title="结算页"
        desc="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
      />
      <!-- body -->
      <main class="bg-gray-100 relative pb-10 h-max" style="padding: 0 160px">
        <el-card class="main-section flex flex-col bg-white mt-8 mb-8 p-4">
          <!-- 收货地址信息 -->
          <div>
            <!-- 顶部header -->
            <div class="flex justify-between">
              <strong class="text-lg">收货人信息</strong>
              <el-button
                size="small"
                type="primary"
                @click.native="showDrawer = true"
                >新增收货地址
              </el-button>
              <!-- 新增收货地址的表单 -->
              <el-drawer
                title="新增收货人信息"
                :before-close="handleSubmitNewAddress"
                :visible.sync="showDrawer"
                direction="ltr"
                custom-class="px-4"
                ref="drawer"
              >
                <div>
                  <el-form
                    class="pl-4"
                    label-position="left"
                    label-width="80px"
                  >
                    <el-form-item class="py-2" label="收货人" required>
                      <p-input-pure
                        v-model="formData.consignee_name"
                        placeholder="请输入收货人姓名"
                        :width="300"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item class="py-2" label="详细地址" required>
                      <p-input-pure
                        v-model="formData.address"
                        placeholder="请输入收货地址"
                        :width="300"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item class="py-2" label="联系方式" required>
                      <p-input-pure
                        v-model="formData.phone"
                        placeholder="请输入联系方式"
                        :width="300"
                        clearable
                      />
                    </el-form-item>
                  </el-form>
                  <div style="text-align: center">
                    <el-button class="mr-6" @click.native="cancelForm">
                      取 消
                    </el-button>
                    <el-button
                      type="primary"
                      @click="drawer.closeDrawer()"
                      :loading="loading"
                    >
                      {{ loading ? '提交中 ...' : '确 定' }}
                    </el-button>
                  </div>
                </div>
              </el-drawer>
            </div>
            <!-- 默认收货地址 -->
            <li
              v-if="defaultAddress.address"
              class="flex flex-row items-center p-4"
              style="font-size: 14px"
            >
              <!-- 收货人 -->
              <div
                class="default-address-btn flex items-center justify-center relative cursor-pointer w-40 rounded pl-4 pr-2"
                style="height: 30px"
              >
                <span class="truncate">{{ defaultAddress.consignee_name }}</span
                >&nbsp;
                <b></b>
              </div>
              <!-- 收货信息 & 操作栏 -->
              <div
                class="address-bar flex justify-between items-center flex-1 pl-4"
                style="height: 30px"
              >
                <div>
                  <span class="pr-6">{{ defaultAddress.address }}</span>
                  <span>{{ defaultAddress.phone }}</span>
                </div>
                <div class="pr-10 operation-bar">
                  <el-button
                    type="text"
                    class="primary"
                    @click.native="handleEditAddress(defaultAddress)"
                    >编辑</el-button
                  >
                </div>
              </div>
            </li>
            <!-- 地址栏 -->
            <el-collapse accordion class="">
              <el-collapse-item>
                <template slot="title">
                  <span class="pl-11"> 选择其他收货地址</span>
                </template>
                <ul class="" style="font-size: 14px">
                  <li
                    class="flex flex-row justify-between items-center py-1.5 px-4"
                    v-for="(addressItem, i) in addressList"
                    :key="i"
                  >
                    <!-- 收货人 -->
                    <div
                      class="address-select-btn flex items-center justify-center relative w-40 cursor-pointer rounded pl-4 pr-2"
                      style="height: 30px"
                      @click="changeDefaultAddress(addressItem, i)"
                    >
                      <span class="truncate">
                        {{ addressItem.consignee_name }}
                      </span>
                      &nbsp;
                    </div>
                    <!-- 收货信息 & 操作栏 -->
                    <div
                      class="address-bar flex justify-between items-center flex-1 pl-4 rounded"
                      style="height: 30px"
                    >
                      <!-- 收货信息 -->
                      <div>
                        <span class="pr-6">{{ addressItem.address }}</span>
                        <span>{{ addressItem.phone }}</span>
                      </div>
                      <!-- 操作栏 -->
                      <div class="pr-10 operation-bar">
                        <el-button
                          type="text"
                          @click.native="changeDefaultAddress(addressItem, i)"
                        >
                          设为默认地址
                        </el-button>
                        <el-button
                          type="text"
                          @click.native="handleEditAddress(addressItem)"
                        >
                          编辑
                        </el-button>
                        <el-button
                          type="text"
                          @click.native="handleDeleteAddress(addressItem, i)"
                        >
                          删除
                        </el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 支付方式 -->
          <div class="my-6">
            <div class="flex justify-between">
              <strong class="text-lg">支付方式</strong>
            </div>
            <div
              class="default-address-btn flex items-center justify-center relative cursor-pointer w-40 rounded mt-4 ml-4 pl-2 pr-2"
              style="height: 30px"
            >
              <span>在线支付</span>
              <b></b>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- 配送方式 -->
          <div class="my-6">
            <div class="flex justify-between">
              <strong class="text-lg">配送方式</strong>
            </div>
            <div
              class="default-address-btn flex items-center justify-center relative cursor-pointer w-40 rounded mt-4 ml-4 pl-2 pr-2"
              style="height: 30px"
            >
              <span>包邮</span>
              <b></b>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- 送货清单 -->
          <div class="my-6">
            <div class="flex justify-between pb-4">
              <strong class="text-lg">送货清单</strong>
            </div>
            <div
              v-for="(goodsMap, i) in orderGoods"
              :key="i"
              class="goods-list rounded p-4 text-sm"
            >
              <div class="inline-block">
                <a @click="navi2GoodsPage(goodsMap.goodsId)">
                  <img
                    class="object-cover object-center cursor-pointer"
                    style="width: 100px; height: 100px"
                    :src="goodsMap.thumb"
                    alt
                  />
                </a>
              </div>
              <div class="inline-block pt-4 pl-4 align-top">
                <p
                  class="inline-block truncate cursor-pointer hover-primary"
                  style="width: 700px"
                  @click="navi2GoodsPage(goodsMap.goodsId)"
                >
                  {{ goodsMap.name }}
                </p>
                <span class="primary text-lg pl-16">
                  <em>￥{{ goodsMap.price }}</em></span
                >
                <span class="pl-6">x{{ goodsMap.quantity }}</span>
                <br />
                <el-tag class="mt-4" type="primary" size="small">
                  <i class="el-icon-s-goods" style="font-size: 16px"></i>
                  支持7天无理由退货（防伪签、密封条损毁不支持）
                </el-tag>
              </div>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- 订单统计 -->
          <div
            class="my-6 p-4 rounded"
            style="background: #f5f5f5; color: #999; overflow: hidden"
          >
            <!-- float-left -->
            <div
              class="conut-lines flex flex-col space-y-1"
              style="float: left"
            >
              <div>
                商品件数：<em class="primary">{{ totalNums }}件</em>
              </div>
              <div>
                商品总价：<em class="primary">￥{{ totalPrice }}</em>
              </div>
              <div>活动优惠：<em class="primary">-0</em></div>
              <div>优惠券抵扣：<em class="primary">-0</em></div>
              <div>运费：<em class="primary">-0</em></div>
              <div>
                应付总额：<em class="primary">￥{{ totalPrice }}</em>
              </div>
            </div>
            <!-- float-right -->
            <div
              class="flex flex-col h-40 justify-end float-right overflow-hidden space-y-1 pr-1"
            >
              <div class="float-right">
                应付总额：<em class="primary text-lg font-bold"
                  >￥{{ totalPrice }}</em
                >
              </div>
              <div class="float-right">
                寄送至：<em class="primary">{{ defaultAddress.address }}</em>
              </div>
              <div class="float-right">
                收货人：<em class="primary">{{
                  defaultAddress.consignee_name
                }}</em>
              </div>
            </div>
          </div>
          <!-- btns -->
          <div class="float-right space-x-6">
            <el-button
              class="h-10 w-36 relative"
              plain
              style="color: gray"
              @click="() => $router.push({ name: 'shop-cart' })"
            >
              返回购物车
            </el-button>
            <el-button
              class="h-10 w-36 relative"
              type="primary"
              @click="handleNavi2PaymentPage"
            >
              提交订单
            </el-button>
          </div>
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
import { Component, Vue, Ref } from 'vue-property-decorator';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import ProcessingHeader from '@/components/ProcessingHeader.vue';
import { Drawer } from 'element-ui';
import PInputPure from '@/components/pure-coms/PInputPure.vue';
import { insertAddress } from '@/api/receiving-address/add-new-address.ts';
import { getAddresses } from '@/api/receiving-address/get-addresses.ts';
import { updateAddress } from '@/api/receiving-address/update-address.ts';
import { setDefaultAddress } from '@/api/receiving-address/set-default-address.ts';
import { deleteAddress } from '@/api/receiving-address/delete-address.ts';
import { createOrder } from '@/api/order/create-order.ts';
import { cloneDeep } from 'lodash';
import { navi2GoodsDetailPage } from '@/utils/navi-2-goods-detail-page';

@Component({
  components: { PersonalDropdownMenu, ProcessingHeader, PInputPure },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'shop-cart') localStorage.removeItem('orderGoods');
    next();
  },
})
export default class BillingPage extends Vue {
  private orderGoods = [];
  // 收货地址信息
  private defaultAddress = {};
  private addressList = []; //该用户曾用的收货地址
  // drawer抽屉 (form提交表单)
  private loading = false; // 抽屉表单(按钮)提交状态
  private timer = null; // 配合动画时延关闭抽屉使用的计时器
  private showDrawer = false; // 展示抽屉
  private isUpdate = false; // 触发抽屉的是否为了“更新地址”
  private formData = {}; // 抽屉表单的状态
  private triggerEditAddress = {}; // 记录编辑地址的触发源

  @Ref('drawer') readonly drawer: Drawer;

  /** Computed*/
  // ===================================================================

  //购物车商品件数
  get totalNums() {
    return this.orderGoods.reduce(function getTotalNums(total, good) {
      return (total += parseInt(good.quantity));
    }, 0);
  }
  // 购物车商品总价
  get totalPrice() {
    return this.orderGoods.reduce(function getTotalPrice(total, good) {
      return (total += parseInt(good.price) * parseInt(good.quantity));
    }, 0);
  }
  /** Hooks */
  // ===================================================================
  mounted() {
    this.initState();
    this.routeParamsPersistence();
  }
  // Methods
  // ===================================================================
  // 请求服务端数据
  async initState() {
    try {
      const res = await getAddresses();
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      const { data } = res;
      const { defaultAddress, addressList } = data;
      this.defaultAddress = defaultAddress;
      // 从地址列表删去默认地址
      this.addressList = addressList.filter(
        addressInfo => addressInfo.id !== defaultAddress.id,
      );
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: '购物车数据请求失败,请稍后重试',
        type: 'error',
        center: true,
      });
    }
  }
  // 持久化路由传参
  routeParamsPersistence() {
    if (!localStorage.getItem('orderGoods')) {
      const oriGoods = this.$route.query.selectedGoods;
      this.orderGoods = oriGoods;
      localStorage.setItem('orderGoods', JSON.stringify(oriGoods));
    } else {
      const orderGoodsStr = localStorage.getItem('orderGoods');
      this.orderGoods = JSON.parse(orderGoodsStr);
    }
  }
  // 跳转到付款页面
  async handleNavi2PaymentPage() {
    if (this.orderGoods.length === 0) return;
    // 请求下单
    try {
      const goodsMapIds = this.orderGoods.map(goodsMap => goodsMap.id);
      const res = await createOrder(goodsMapIds);
      if (!res) {
        throw Error(JSON.stringify(res));
      }
      const { orderId, expiredTime } = res.data; // 秒钟转为分钟
      // 路由传参，再加个订单号
      this.$router.push({
        name: 'payment-page',
        query: {
          orderId,
          expiredTime: expiredTime / 60,
        },
      });
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: '订单提交失败,请稍后重试',
        type: 'error',
        center: true,
      });
    }
  }

  // 跳转到商品详情页
  navi2GoodsPage(goodsId) {
    navi2GoodsDetailPage(goodsId);
  }

  // 编辑地址
  handleEditAddress(addressInfo) {
    // 为了复用drawer组件，用一个boolean类型的flag区分一下新增和更新地址
    this.isUpdate = true;
    this.triggerEditAddress = addressInfo;
    this.formData = cloneDeep(addressInfo);
    this.showDrawer = true;
  }
  // 删除地址
  async handleDeleteAddress(addressItem, index) {
    try {
      const { id } = addressItem;
      const res = await deleteAddress(id);
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      // 从地址列表删去该地址
      this.addressList.splice(index, 1);
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: '更改默认地址失败,请稍后重试',
        type: 'error',
        center: true,
      });
    }
  }
  // 更改默认地址
  async changeDefaultAddress(addressInfo, index) {
    try {
      const { id } = addressInfo;
      const res = await setDefaultAddress(id);
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      this.addressList.push(cloneDeep(this.defaultAddress));
      this.defaultAddress = addressInfo;
      // 从地址列表删去默认地址,同时把默认地址填入地址列表
      this.addressList.splice(index, 1);
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: '更改默认地址失败,请稍后重试',
        type: 'error',
        center: true,
      });
    }
  }
  // 关闭表单前提问是否提交
  handleSubmitNewAddress(done) {
    if (this.loading) {
      if (this.isUpdate) this.isUpdate = false;
      return;
    }
    this.$confirm('确定要提交表单吗？')
      .then(async _ => {
        this.loading = true;
        // 请求新增一条收货信息
        const res = this.isUpdate
          ? await updateAddress(this.formData)
          : await insertAddress(this.formData);
        //失败
        if (res.status !== 0) {
          this.$message({
            showClose: true,
            message: '更新地址失败',
            type: 'error',
            center: true,
          });
          throw Error(JSON.stringify(res));
        }
        // 成功
        if (this.isUpdate) {
          this.triggerEditAddress = Object.assign(
            this.triggerEditAddress,
            cloneDeep(this.formData),
          );
          this.isUpdate = false;
        }
        this.initState();
        this.timer = setTimeout(() => {
          done();
          // 动画关闭需要一定的时间
          setTimeout(() => {
            this.loading = false;
            // 清空抽屉的表单状态
            Object.keys(this.formData).forEach(key => {
              this.formData[key] = '';
            });
          }, 400);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        if (this.isUpdate) this.isUpdate = false;
      });
  }
  // 取消提交新增数据的表单
  cancelForm() {
    this.loading = false;
    this.showDrawer = false;
    if (this.isUpdate) this.isUpdate = false;
    clearTimeout(this.timer);
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
b {
  display: block;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 12px;
  height: 12px;
  overflow: hidden;
  background: url('//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png')
    no-repeat;
}
.default-address-btn {
  border: 2px solid $primary;
}
.address-select-btn {
  border: 1px solid #ddd;
  &:hover {
    border: 2px solid $primary;
  }
}
.address-bar {
  &:hover {
    background: rgba(251, 210, 106, 0.2);
  }
}
.operation-bar > button {
  color: #005ea7;
  &:hover {
    color: $primary;
  }
}
.goods-list {
  background-color: #f3fbfe;
}

.conut-lines > div {
  width: 200px;
  & > em {
    float: right;
  }
}
</style>
