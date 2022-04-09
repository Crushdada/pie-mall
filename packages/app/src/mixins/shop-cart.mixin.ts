import Vue from 'vue';
import Component from 'vue-class-component';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { Watch } from 'vue-property-decorator';
import { getShopCart } from '@/api/shop-cart/get-shop-cart';
import { ShopCartInterface } from '../../../types/shop-cart/shop-cart.interface';
@Component
export default class ShopCartMixin extends Vue {
  private shopcart: ShopCartInterface = [];

  /** Computed*/
  // ===================================================================
  /**
   * 是否已登录
   */
  get signed() {
    return this.$store.state[VuexModuleName.AUTH].signed;
  }
  /**
   * 购物车商品件数
   */
  get totalNums() {
    return this.shopcart.reduce(function getTotalNums(total, good) {
      return (total += parseInt(good.quantity));
    }, 0);
  }
  /**
   * 购物车商品总价
   */
  get totalPrice() {
    return this.shopcart.reduce(function getTotalPrice(total, good) {
      return (total += parseInt(good.price) * parseInt(good.quantity));
    }, 0);
  }

  @Watch('signed', { immediate: true })
  onSignedStateChange(newVal: boolean) {
    if (!newVal) return;
    // 如果是登录状态，请求购物车数据
    this.loadShopCart();
  }
  @Watch('shopcart', { deep: true })
  onShopCartChange(newVal: boolean) {
    if (!newVal) return;
    // 如果是登录状态，请求购物车数据
    this.loadShopCart();
  }
  /**
   * 登录状态改变后，加载购物车数据
   */
  async loadShopCart() {
    try {
      const res = await getShopCart();
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Loading shopcart goods failed,Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      if (!res.data) {
        this.$message({
          showClose: true,
          message: 'Loading shopcart goods failed,Please try again later.',
          type: 'error',
          center: true,
        });
      }
      this.shopcart = res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
