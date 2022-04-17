<template>
  <div class="shop-cart">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <processing-header
        title="结算页"
        desc="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
      />
      <!-- body -->
      <main class="bg-gray-100 relative pb-10 h-max" style="padding: 0 160px">
        <el-card class="tip-bar bg-white mt-8 mb-8 p-4">
          <div class="flex flex-nowrap">
            <el-button
              class="w-24"
              type="success"
              circle
              style="font-size: 35px"
              icon="el-icon-check"
              plain
            >
            </el-button>
            <div class="flex-1 overflow-hidden pl-10 leading-8">
              <div class="float-left">
                <h2 class="text-2xl pb-1">订单提交成功！去付款咯～</h2>
                <span>
                  请在<span class="primary"
                    >0 小时 {{ orderRemainingTime }} 分</span
                  >内完成支付, 超时后将取消订单 </span
                ><br />
                <span>
                  收货信息：
                  {{ addressInfo.consignee_name }} &nbsp;
                  {{ addressInfo.phone }}&nbsp;
                  {{ addressInfo.address }}
                </span>
              </div>
              <div class="float-right">
                <span>
                  应付总额：
                  <em class="primary text-xl">{{ totalPrice }}元</em>
                </span>
              </div>
            </div>
          </div>
        </el-card>
        <el-card class="bg-white mt-8 mb-8 px-4 py-2">
          <div>
            <div class="inline-block">
              <img
                class="w-7 h-7 mr-3 cursor-pointer inline-block"
                src="https://storage.360buyimg.com/payment-assets/sdk/bank/PAY-UNION.png"
                alt
              />
              <span class="hover-primary cursor-pointer">中国银联</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="inline-block">
              <img
                class="w-7 h-7 mr-3 cursor-pointer inline-block"
                src="https://storage.360buyimg.com/payment-assets/sdk/bank/PAY-WEIXIN.png"
                alt
              />
              <span class="hover-primary cursor-pointer">中国银联</span>
            </div>
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
import { Component, Vue } from 'vue-property-decorator';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import ProcessingHeader from '@/components/ProcessingHeader.vue';
import PInputPure from '@/components/pure-coms/PInputPure.vue';
import { getOrderInfo } from '@/api/order/get-order-info.ts';
@Component({
  components: { PersonalDropdownMenu, ProcessingHeader, PInputPure },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'billing-page') localStorage.removeItem('orderInfos');
    next();
  },
})
export default class BillingPage extends Vue {
  private orderInfos = { orderId: '', expiredTime: 15 };
  private orderTimeStamp = '';
  private addressInfo = {};
  private orderGoodsMaps = [];
  private orderRemainingTime = 15;
  private timer = null;
  /** Hooks */
  // ===================================================================
  created() {
    this.getTime(); //只要该页面一渲染创建，就开始倒计时
  }
  mounted() {
    this.routeParamsPersistence();
    this.getOrderInfo();
  }
  /** Computed*/
  // ===================================================================
  get totalPrice() {
    return this.orderGoodsMaps.reduce(function getTotalPrice(total, goodMap) {
      return (total +=
        parseInt(goodMap.good.G_price) * parseInt(goodMap.quantity));
    }, 0);
  }
  // Methods
  // ===================================================================
  // 请求服务端数据
  async getOrderInfo() {
    try {
      const { orderId } = this.orderInfos;
      if (!orderId) return;
      const res = await getOrderInfo(orderId);
      // 请求失败
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      const { address, timeStamp, goods_maps } = res.data;
      this.addressInfo = address;
      this.orderTimeStamp = timeStamp;
      this.orderGoodsMaps = goods_maps;
      this.trackOrderRemainingTime();
    } catch (err) {
      console.log(err);
      this.$message({
        showClose: true,
        message: 'Request order info failed, please try again later.',
        type: 'error',
        center: true,
      });
    }
  }
  // 持久化路由传参
  routeParamsPersistence() {
    if (!localStorage.getItem('orderInfos')) {
      const orderInfos = this.$route.query;
      this.orderInfos = orderInfos;
      localStorage.setItem('orderInfos', JSON.stringify(orderInfos));
    } else {
      const orderInfos = localStorage.getItem('orderInfos');
      this.orderInfos = JSON.parse(orderInfos);
    }
  }
  // 追踪订单超时剩余时间
  trackOrderRemainingTime() {
    const orderTime = new Date(this.orderTimeStamp).getTime();
    const nowTime = new Date().getTime();
    const timeDiff = parseInt((nowTime - orderTime) / 60 / 1000);
    const remainingMinutes = this.orderInfos.expiredTime - timeDiff;
    this.orderRemainingTime = remainingMinutes > 0 ? remainingMinutes : 0;
  }
  // 执行订单倒计时
  getTime() {
    this.timer = setInterval(() => {
      if (this.orderRemainingTime === 0) {
        clearInterval(this.timer);
      } else this.orderRemainingTime--;
    }, 1000 * 60);
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
::v-deep .el-divider--vertical {
  margin: 0 20px;
}
.tip-bar {
  color: #616161;
}
h2 {
  color: $dark-text;
}
</style>
