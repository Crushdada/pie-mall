<template>
  <div v-loading="loading" class="goods-details">
    <el-image
      :src="goods.thumb"
      class="inline-block"
      style="width: 450px; height: 450px"
    ></el-image>
    <section class="inline-block flex flex-col flex-nowrap">
      <h1 class="">{{ goods.info }}</h1>
      <div class="mt-4 p-2">
        <span class="pr-4">价&nbsp;&nbsp;格</span>
        <em class="primary">￥{{ goods.price }}</em
        ><br />
        <span class="pr-4">促&nbsp;&nbsp;销</span>
        <div class="inline-block">
          <span>
            <el-tag type="primary" effect="plain"> 整点赠礼 </el-tag>
            &nbsp;整点预订限量赠智能插座，限10点/12点/16点/20点，每个整点限量赠20个
          </span>
          <span>
            <el-tag type="primary" effect="plain"> 分期免息 </el-tag>
            &nbsp;银联、花呗、掌上生活、工行分期支付可享免息（免息活动适用于单款免息商品订单，含多款商品订单仅在免息活动一致时可享用）
          </span>
          <span>
            <el-tag type="primary" effect="plain"> 赠送积分</el-tag>
            购买即赠商城积分，积分可抵现~
          </span>
        </div>
        <!-- 加入购物车 & 收藏 -->
        <div>
          <el-input-number
            v-model="buyNum"
            class="w-12"
            controls-position="right"
            :min="1"
            :max="100"
          ></el-input-number>
          <el-button
            class="h-10"
            type="primary"
            icon=""
            @click.native="handleAdd2Shopcart"
          >
            加入购物车
          </el-button>
          <!-- 收藏 -->
          <el-tooltip content="收藏" placement="top" effect="light">
            <el-button
              type="warning"
              icon="el-icon-star-off"
              circle
            ></el-button>
          </el-tooltip>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import PersonalRecoGoods from '../../components/home/PersonalRecoGoods.vue';
import GoodZones from '../../components/home/GoodZones.vue';
import { getGoodsById } from '@/api/goods/get-goods-by-id';
import { setGoodsQuantityMap } from '@/api/shop-cart/set-goods-quantity-map.ts';
import { findGoodsMapOrNot } from '@/api/shop-cart/find-goods-map.ts';

@Component({
  components: {
    PersonalRecoGoods,
    GoodZones,
  },
})
export default class GoodsDetails extends Vue {
  private loading = true;
  private buyNum = 1;
  private goods = {};
  /** Computed*/
  // ===================================================================
  get signed() {
    return this.$store.state[VuexModuleName.AUTH].signed;
  }
  /** Hooks */
  // ===================================================================
  beforeMount() {
    const { id } = this.$route.params;
    this.getGoodsDetails(id);
    this.$nextTick(() => {
      this.loading = false;
    });
  }
  // Methods
  // ===================================================================
  // 发送请求goods数据
  async getGoodsDetails(goodsId) {
    try {
      const res = await getGoodsById(goodsId);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Failed to load goods data ,Service Error',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      const {
        G_category: category,
        G_id: id,
        G_info: info,
        G_price: price,
        G_thumb: thumb,
      } = res.data?.good;
      this.goods = { category, id, info, price, thumb };
    } catch (err) {
      console.log(err);
    }
  }
  // 确认添加到购物车
  async handleAdd2Shopcart() {
    // 如果未登录，跳转到登录页面
    if (!this.signed) {
      this.$router.push({ name: 'login' });
      return;
    }
    const { id } = this.goods;
    if (!id) return;
    try {
      // 判断商品是否已加入购物车，提示“商品已加入购物车，请前往查看”
      const mapExisted = await findGoodsMapOrNot(id);
      if (mapExisted) {
        // 已经存在，提示
        this.$message({
          showClose: true,
          message: '商品已加入购物车，请前往查看!',
          type: 'warning',
          center: true,
        });
        return;
      }
      // 不存在，尝试发送请求添加到购物车
      const res = await setGoodsQuantityMap(id, this.buyNum);
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Failed to add goods to shopcart , Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      // 跳转到成功添加的提示页
      this.$router.push({ name: 'success-tip' });
    } catch (err) {
      console.log(err);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
</style>
