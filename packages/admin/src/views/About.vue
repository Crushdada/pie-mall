<template>
  <div class="about">
    <el-button size="small" type="primary" @click="logOut">
      退出登录
    </el-button>
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
