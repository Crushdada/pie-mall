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
@Component({
  components: {},
})
export default class Home extends Vue {
  // Methods
  // ===================================================================
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
