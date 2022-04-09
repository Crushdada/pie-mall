<template>
  <div class="goods-details">
    <el-card class="mt-8">
      <div
        class="flex flex-row flex-nowrap justify-between items-center"
        style="padding: 0 140px"
      >
        <div class="pt-2">
          <el-image
            v-if="goods.thumb"
            :src="goods.thumb"
            style="width: 450px; height: 450px; border-radius: 5px"
          ></el-image>
        </div>

        <section class="flex flex-col flex-nowrap py-4" style="width: 690px">
          <h1 class="text-2xl py-2">{{ goods.info }}</h1>
          <!-- 灰色背景框 -->
          <div class="mt-4 py-4 px-2 rounded" style="background: #f5f5f5">
            <span class="py-2 pr-4">价&nbsp;&nbsp;格</span>
            <em class="primary text-2xl">￥{{ goods.price }}</em
            ><br />
            <div class="flex flex-row flex-nowrap pt-4">
              <span class="pr-4">促&nbsp;&nbsp;销</span>
              <div class="text-xs">
                <div class="pt-0.5 leading-6">
                  <el-tag type="primary" size="mini" effect="plain">
                    整点赠礼
                  </el-tag>
                  &nbsp;整点预订限量赠智能插座，限10点/12点/16点/20点，每个整点限量赠20个
                </div>
                <br />
                <div class="leading-6">
                  <el-tag size="mini" type="primary" effect="plain">
                    分期免息
                  </el-tag>
                  &nbsp;银联、花呗、掌上生活、工行分期支付可享免息（免息活动适用于单款免息商品订单，含多款商品订单仅在免息活动一致时可享用）
                </div>
                <br />
                <div class="leading-6">
                  <el-tag size="mini" type="primary" effect="plain">
                    赠送积分</el-tag
                  >
                  购买即赠商城积分，积分可抵现~
                </div>
                <br />
              </div>
            </div>
            <!-- 加入购物车 & 收藏 -->
            <div class="pt-2">
              <el-input-number
                v-model="buyNum"
                controls-position="right"
                :min="1"
                :max="100"
                style="width: 100px"
              ></el-input-number>
              <div class="inline px-6">
                <el-button
                  class="h-10"
                  type="primary"
                  icon=""
                  @click.native="handleAdd2Shopcart"
                >
                  加入购物车
                </el-button>
              </div>

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
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import PersonalRecoGoods from '../../components/home/PersonalRecoGoods.vue';
import GoodZones from '../../components/home/GoodZones.vue';
import { getGoodsById } from '@/api/goods/get-goods-by-id';
import { addGoodsQuantityMap } from '@/api/shop-cart/add-goods-map.ts';
import { findGoodsMapOrNot } from '@/api/shop-cart/find-goods-map.ts';

@Component({
  components: {
    PersonalRecoGoods,
    GoodZones,
  },
})
export default class GoodsDetails extends Vue {
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
    if(id !== 'success-tip')
    this.getGoodsDetails(id);
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
      const res1 = await findGoodsMapOrNot(id);
      if (res1.status !== 0) {
        this.$message({
          showClose: true,
          message: 'Failed to load shopcart data , Please try again later.',
          type: 'error',
          center: true,
        });
        throw Error(JSON.stringify(res));
      }
      const { data: mapExisted } = res1;
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
      const res = await addGoodsQuantityMap(id, this.buyNum);
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
