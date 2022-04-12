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
        <el-card class="main-section flex flex-col bg-white mt-8">
          <!-- 收货地址信息 -->
          <div class="p-4">
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
            <li class="flex flex-row items-center p-4" style="font-size: 14px">
              <!-- 收货人 -->
              <div
                class="default-address-btn flex items-center justify-center relative cursor-pointer w-40 rounded"
                style="height: 30px"
              >
                <span>{{ defaultAddress.consignee_name }}</span
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
                  <el-button type="text" class="primary">编辑</el-button>
                </div>
              </div>
            </li>
            <!-- 地址栏 -->
            <el-collapse accordion class="">
              <el-collapse-item>
                <template slot="title">
                  <span class="pl-14"> 选择其他收货地址</span>
                </template>
                <ul class="" style="font-size: 14px">
                  <li
                    class="flex flex-row justify-between items-center py-1.5 px-4"
                    v-for="(addressItem, i) in addressList"
                    :key="i"
                  >
                    <!-- 收货人 -->
                    <div
                      class="address-select-btn flex items-center justify-center relative w-40 cursor-pointer rounded"
                      style="height: 30px"
                      @click="changeDefaultAddress(addressItem.id)"
                    >
                      <span>{{ addressItem.consignee_name }}</span
                      >&nbsp;
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
                        <el-button type="text" class="">
                          设为默认地址
                        </el-button>
                        <el-button type="text" class=""> 编辑 </el-button>
                        <el-button type="text" class=""> 删除 </el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
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
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import HeaderBar from '@/components/home/HeaderBar.vue';
import GoodsTabBar from '../components/home/GoodsTabBar.vue';
import HomeCaroucel from '../components/home/HomeCarousel.vue';
import PersonalRecoGoods from '../components/home/PersonalRecoGoods.vue';
import GoodZones from '../components/home/GoodZones.vue';
import PersonalDropdownMenu from '@/components/home/personal-dropdown-menu.vue';
import ProcessingHeader from '@/components/ProcessingHeader.vue';
import { Drawer, Button } from 'element-ui';
import PInputPure from '@/components/pure-coms/PInputPure.vue';
@Component({
  components: { PersonalDropdownMenu, ProcessingHeader, PInputPure },
})
export default class BillingPage extends Vue {
  private orderGoods = [];
  // 收货地址信息
  private defaultAddress = {
    id: 'as',
    consignee_name: '小西八',
    phone: '12321332',
    address: '旧金山佛旧金山佛罗罗旧金山佛罗里变态e里变态e',
  };
  private addressList = [
    {
      id: 'as',
      consignee_name: '小西八',
      phone: '12321332',
      address: '旧金山佛旧金山佛罗罗旧金山佛罗里变态e里变态e',
    },
    {
      id: 'as',
      consignee_name: '小西八',
      phone: '12321332',
      address: '旧金山佛旧金山佛罗罗旧金山佛罗里变态e里变态e',
    },
  ]; //该用户曾用的收货地址
  // drawer抽屉 (form提交表单)
  private loading = false; // 抽屉表单(按钮)提交状态
  private timer = null; // 配合动画时延关闭抽屉使用的计时器
  private showDrawer = false; // 展示抽屉
  private formData = {
    address: '',
    consignee_name: '',
    phone: '',
  };

  @Ref('drawer') readonly drawer: Drawer;

  /** Computed*/
  // ===================================================================
  /** Hooks */
  // ===================================================================
  mounted() {
    if (!localStorage.getItem('orderGoods')) {
      const oriGoods = this.$route.query.selectedGoods;
      this.orderGoods = oriGoods;
      localStorage.setItem('orderGoods', JSON.stringify(oriGoods));
    } else {
      const orderGoodsStr = localStorage.getItem('orderGoods');
      this.orderGoods = JSON.parse(orderGoodsStr);
    }
  }
  destroyed() {
    localStorage.removeItem('orderGoods');
  }
  // Methods
  // ===================================================================
  changeDefaultAddress(addressId) {
    console.log('addressId=', addressId);
  }
  // 关闭表单前提问是否提交
  handleSubmitNewAddress(done) {
    if (this.loading) {
      return;
    }
    this.$confirm('确定要提交表单吗？')
      .then(async _ => {
        this.loading = true;
        // 请求新增一条收货信息
        console.log(this.formData);
        // const res = await insertAddress(this.formData);
        // 失败
        // if (res.status !== 0) {
        //   console.log(`🙈${res.detail}`);
        //   this.$message({
        //     showClose: true,
        //     message: '新增收货地址失败，请重试',
        //     type: 'error',
        //     center: true,
        //   });
        //   return;
        // }
        // // 成功
        // setTimeout(() => {
        //   this.$message({
        //     showClose: true,
        //     message: '成功新增一条收货地址！',
        //     type: 'success',
        //     center: true,
        //   });
        // }, 2000);

        // this.timer = setTimeout(() => {
        //   done();
        //   // 动画关闭需要一定的时间
        //   setTimeout(() => {
        //     this.loading = false;
        //     // 清空抽屉的表单状态
        //     Object.keys(this.formData).forEach(key => {
        //       this.formData[key] = '';
        //     });
        //   }, 400);
        // }, 2000);
      })
      .catch(err => {
        console.log(err);
      });
  }
  // 取消提交新增数据的表单
  cancelForm() {
    this.loading = false;
    this.showDrawer = false;
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
</style>
