<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-upload
      ref="loadFileBtn"
      class="upload-demo"
      :auto-upload="false"
      :show-file-list="false"
      action
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :on-change="uploadFile"
      :limit="1"
    >
      <el-button size="small" type="primary"> 点击上传 </el-button>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { uint8Array2JSON } from '@/utils/data-utils';
import { addGoods } from '@/api/goods/add-goods';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { getUserProfile } from '@/api/user/get-user-profile';
import { ERROR_TYPE } from '../../../types/response/error-type.enum';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';

@Component({
  components: {},
})
export default class Home extends Vue {
  /** Computed*/
  // ===================================================================

  get userTicket(): string | undefined {
    return this.$store.state[VuexModuleName.AUTH].ticket;
  }

  /** Hooks */
  // ===================================================================
  beforeMount() {
    this.checkTicket();
  }

  // Methods
  // ===================================================================\
  /**
   * 身份认证 & 获取用户信息
   * @param { string } store.userTicket
   */
  async checkTicket() {
    // 首次登录
    if (!this.userTicket) {
      console.log('🙈登录状态失效，请重新登录');
      this.$router.replace({
        name: 'login',
      });
      return;
    }
    // 二次登录
    try {
      const res = await getUserProfile(this.userTicket);
      // 认证成功
      if (res.status === 0) {
        const { userProfile } = res;
        // 更新用户信息
        this.$stock.commit(SET_USER_PROFILE, userProfile);
      }
      // 认证失败
      if (res.status === ERROR_TYPE.UNKNOW) {
        console.log('🙈登录状态失效，请重新登录');
        this.$router.replace({
          name: 'login',
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //读取Excel数据
  uploadFile(file) {
    const realFile = file.raw;
    const reader = new FileReader();
    reader.onload = async e => {
      var data = e.target.result;
      const rawData = new Uint8Array(data as any);
      const processedData = uint8Array2JSON(rawData);
      try {
        // 数据规范化
        const goodsData = processedData.map(el => {
          if (!el.G_stock) {
            el.G_stock = 100;
          }
          el.price = parseInt(el.price);
          return el;
        });
        // 商品数据入库
        const response: any = await addGoods(goodsData);
        if (response.status !== 0) throw Error(JSON.stringify(response));
        // notify;
        this.$message({
          showClose: true,
          message: 'Added successfully',
          type: 'success',
          center: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    reader.readAsArrayBuffer(realFile);
    this.$refs.loadFileBtn.clearFiles();
  }
}
</script>
