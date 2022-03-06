<template>
  <div class="about">
    <el-upload
      class="w-10"
      with-credentials
      accept=".jpg,.jpeg,.png,.JPG,.JPEG"
      :limit="1"
      :show-file-list="false"
      :action="`http://localhost:3000/user/avatar`"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadFailed"
    >
      <img v-if="avatarPreviewUrl" :src="avatarPreviewUrl" class="avatar" />

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { signOut } from '@/api/user/sign-out';
import { DELETE_AUTH_TICKET } from '@/store/auth.module/mutations/delete-auth-ticket.mutation';
import { UPDATE_USER_PROFILE } from '@/store/user.module/mutations/update-user-profile.mutation';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';

@Component()
export default class HeaderBar extends Vue {
  private avatarPreviewUrl = '';

  /** Computed*/
  // ===================================================================
  get avatar() {
    return this.$store.state[VuexModuleName.USER].userProfile.avatar;
  }

  // 退出登录
  async logOut() {
    try {
      // 请求销毁session
      const res = await signOut(this.userTicket);
      // 请求失败
      if (res.status !== 0) {
        console.log(`🙈${res.detail}`);
        this.$message({
          showClose: true,
          message: 'Log out failed',
          type: 'error',
          center: true,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
    // 成功退出登录
    // 删除客户端存储的ticket，更改登录状态
    this.$stock.commit(DELETE_AUTH_TICKET);
    this.$router.replace({
      name: 'login',
    });
  }

  handleUploadSuccess(res, file) {
    try {
      // 成功上传头像
      if (res.status === 0) {
        const { userAvatarUrl } = res.data;
        // 头像预览
        this.avatarPreviewUrl = userAvatarUrl;
        // 更新用户头像
        this.$stock.commit(UPDATE_USER_PROFILE, {
          field: 'avatar',
          val: userAvatarUrl,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  handleUploadFailed(err, file) {
    console.log(`🙈${err.detail}`);
    this.$message({
      showClose: true,
      message: '上传失败',
      type: 'error',
      center: true,
    });
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
}
.avatar {
  width: 18px;
  height: 18px;
  display: block;
}
</style>
