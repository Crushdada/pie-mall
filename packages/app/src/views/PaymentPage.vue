<template>
  <div class="shop-cart">
    <el-container class="h-screen" direction="vertical">
      <!-- header -->
      <processing-header
        title="结算页"
        desc="温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算"
      />
      <!-- body -->
      <main class="bg-gray-100 relative pb-10 h-full" style="padding: 0 160px">
        <el-card class="tip-bar bg-white mt-8 mb-8 p-4">
          <div v-if="!paid" class="flex flex-nowrap">
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
                  请在<span class="primary">
                    0 小时 {{ orderRemainingTime }} 分</span
                  >
                  内完成支付, 超时后将取消订单 </span
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
          <div v-else class="flex flex-nowrap items-center">
            <el-button
              class="w-20 h-20"
              type="success"
              circle
              style="font-size: 35px"
              icon="el-icon-check"
            >
            </el-button>
            <div class="flex-1 overflow-hidden pl-10 leading-8">
              <div class="float-left">
                <h2 class="text-2xl pb-1">支付成功！即将返回购物车～</h2>
                <span class="pr-4">
                  倒计时
                  <span class="primary">
                    {{ back2ShopcartRemainingTime }} 秒
                  </span>
                </span>
                <el-button
                  class="w-20"
                  type="primary"
                  size="small"
                  @click.native="
                    () => {
                      $router.replace({ name: 'shop-cart' });
                    }
                  "
                  >立即返回
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
        <el-card v-if="!paid" class="bg-white mt-8 mb-8 px-4 py-2">
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
            <div class="inline-block" @click="showWxPaymentDialog = true">
              <img
                class="w-7 h-7 mr-3 cursor-pointer inline-block"
                src="https://storage.360buyimg.com/payment-assets/sdk/bank/PAY-WEIXIN.png"
                alt
              />
              <span class="hover-primary cursor-pointer">微信支付</span>
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
    <!-- 微信支付弹窗 -->
    <div
      v-if="showWxPaymentDialog"
      class="fixed top-0 left-0 z-10 w-screen h-screen"
      style="background: rgba(0, 0, 0, 0.4)"
    >
      <div
        class="absolute rounded-lg bg-white"
        style="
          width: 370px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        <div class="dialog-header p-4">
          <h2 class="inline text-lg">微信支付</h2>
          <el-button
            class="float-right"
            type="danger"
            icon="el-icon-close"
            size="mini"
            circle
            @click.native="showWxPaymentDialog = false"
          ></el-button>
        </div>
        <div class="wx-pay-dialog px-10 py-4 text-center">
          <img
            class="w-42 h-42"
            src="../assets/wx-pay-QR-code.png"
            alt="crushdada's blog."
          />
          <span>请用<span class="primary">微信</span>扫一扫二维码完成支付</span>
          <br /><br />
          <el-button
            class="h-10 w-30"
            type="primary"
            @click.native="orderPayment"
          >
            点击支付
          </el-button>
          <div class="example"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import ProcessingHeader from '@/components/ProcessingHeader.vue';
import PInputPure from '@/components/pure-coms/PInputPure.vue';
import { getOrderInfo } from '@/api/order/get-order-info.ts';
import { payForOrder } from '../api/order/update-order-status';

@Component({
  components: { PersonalDropdownMenu, ProcessingHeader, PInputPure },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'billing-page') localStorage.removeItem('orderInfos');
    next();
  },
})
export default class BillingPage extends Vue {
  private orderInfos = { orderId: '', expiredTime: 15 };
  private orderTimeStamp = ''; // 订单时间戳
  private addressInfo = {}; // 订单的收货地址信息
  private orderGoodsMaps = []; // 订单的商品映射列表
  private orderRemainingTime = 15; // 订单距超时倒计时
  private timer1 = null; // 追踪订单距超时剩余时间的定时器
  private showWxPaymentDialog = false; // 是否展示微信支付弹窗
  private paid = false; // 标识是否已经完成支付
  private back2ShopcartRemainingTime = 15; // 返回购物车的倒计时
  private timer2 = null; // 追踪返回购物车的剩余时间的定时器

  /** Hooks */
  // ===================================================================
  created() {
    this.orderRemainingCountDown(); //只要该页面一渲染创建，就开始倒计时
  }
  mounted() {
    this.routeParamsPersistence();
    this.getOrderInfo();
  }
  beforeDestroy() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
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
  orderRemainingCountDown() {
    this.timer1 = setInterval(() => {
      if (this.orderRemainingTime === 0) {
        clearInterval(this.timer1);
      } else this.orderRemainingTime--;
    }, 1000 * 60);
  }
  // 返回购物车倒计时
  back2ShopcartCountdown() {
    this.timer2 = setInterval(() => {
      if (this.back2ShopcartRemainingTime === 0) {
        clearInterval(this.timer2);
        this.$router.replace({ name: 'shop-cart' });
      } else this.back2ShopcartRemainingTime--;
    }, 1000);
  }
  // 支付订单
  async orderPayment() {
    try {
      const { orderId } = this.orderInfos;
      if (!orderId) return;
      const res = await payForOrder(orderId);
      // 请求失败
      if (res.status !== 0) {
        throw Error(JSON.stringify(res));
      }
      this.showWxPaymentDialog = false;
      this.paid = true;
      // 开始返回购物车的倒计时
      this.back2ShopcartCountdown();
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
.dialog-header {
  background: $bk-light;
  vertical-align: middle;
}
.wx-pay-dialog {
  &:hover {
    .example {
      opacity: 1;
    }
  }
}

.example {
  opacity: 0;
  width: 307px;
  height: 488px;
  background: url('https://c1.mifile.cn/f/i/16/pay/weinxin-pay.png') no-repeat;
  position: absolute;
  top: -30px;
  left: -300px;
  -webkit-transition: all 0.8s;
  transition: all 0.8s;
}
</style>
