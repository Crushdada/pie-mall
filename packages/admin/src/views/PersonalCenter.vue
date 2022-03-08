<template>
  <div class="personal-center">
    <img
      class="w-full h-48 object-cover object-center"
      src="@/assets/pie-mall-bk-personal-center.jpg"
    />
    <div class="header-avatar h-10">
      <img
        v-if="userProfile.avatar"
        class="
          w-40
          h-40
          rounded-full
          mx-auto
          object-cover object-center
          border-solid border-white border-8
        "
        style="transform: translateY(-75%)"
        :src="userProfile.avatar"
        alt="用户头像"
      />
      <img
        v-else
        class="
          w-40
          h-40
          rounded-full
          mx-auto
          object-cover object-center
          border-solid border-white border-8
        "
        style="transform: translateY(-75%)"
        src="@/assets/nav_icon_avatar_nor.png"
        alt="用户头像"
      />
    </div>
    <div class="user-info">
      <span class="text-3xl font-bold w-full block text-center text-black">
        {{ userProfile.name || '用户' }}
      </span>
      <!--分割部分-->
      <div
        class="sperate-line w-full mt-7 border-gray-200 text-center"
        style="border-bottom-width: 1px"
      >
        <span style="font-size: 18px; color: #ff5f5f" class="font-bold">
          Edit Profile
        </span>
        <div class="bottom-border"></div>
      </div>

      <el-card
        shadow="always"
        class="
          profile-body
          w-1/2
          h-100
          mx-auto
          mt-4
          flex flex-col flex-nowrap
          items-center
        "
      >
        <!-- 昵称 -->
        <div class="mb-2 flex flex-row flex-nowrap items-center">
          <el-input
            class="my-4 mr-2 w-20 inline-block"
            v-model="userProfile.name"
            type="text"
            placeholder="Enter user name"
            style="font-size: 17px"
          />
          <el-button class="h-full" type="primary" @click="changeName">
            确认
          </el-button>
        </div>
        <!-- uid -->
        <span>
          uid：
          <span class="text-gray-600">
            {{ userProfile.id }}
          </span>
        </span>

        <!-- 头像 -->
        <div class="mt-4">
          avatar：
          <el-upload
            class="avatar-uploader text-center"
            with-credentials
            accept=".jpg,.jpeg,.png,.JPG,.JPEG"
            :limit="1"
            :show-file-list="false"
            :action="`http://localhost:3000/user/avatar`"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadFailed"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="avatarPreviewUrl"
              :src="avatarPreviewUrl"
              class="avatar"
            />
            <i v-else class="el-upload el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { UPDATE_USER_PROFILE } from '@/store/user.module/mutations/update-user-profile.mutation';
import { VuexModuleName } from '@types/vuex/enums/module-name.enum';
import { setUserName } from '@/api/user/set-user-name';

@Component({
  components: {
    PInput: () => import('@/components/PInput.vue'),
  },
})
export default class HeaderBar extends Vue {
  private avatarPreviewUrl = '';

  /** Computed*/
  // ===================================================================
  get userProfile() {
    return this.$store.state[VuexModuleName.USER].userProfile;
  }

  //修改昵称
  async changeName() {
    try {
      const res = await setUserName(this.userProfile.name);
      // 修改失败
      if (res.status !== 0) {
        this.$message({
          showClose: true,
          message: '修改昵称失败',
          type: 'error',
          center: true,
        });
        return;
      }
      // 成功，更新用户信息
      this.$stock.commit(UPDATE_USER_PROFILE, {
        field: 'name',
        val: this.userProfile.name,
      });
      this.$message({
        showClose: true,
        message: 'Change name successfully',
        type: 'success',
        center: true,
      });
      this.$router.go(0);
    } catch (err) {
      console.log(err);
    }
  }
  // 头像预览
  beforeAvatarUpload(file) {
    const avatarPreviewUrl = URL.createObjectURL(file);
    this.avatarPreviewUrl = avatarPreviewUrl;
  }
  // 上传头像成功
  handleUploadSuccess(res, file) {
    try {
      // 成功上传头像
      if (res.status === 0) {
        const { userAvatarUrl } = res.data;
        // 更新用户头像
        this.$stock.commit(UPDATE_USER_PROFILE, {
          field: 'avatar',
          val: userAvatarUrl,
        });
        this.$router.go(0);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // 上传头像失败
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
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.bottom-border {
  width: 120px;
  height: 4px;
  margin: 0 auto;
  background-color: #ff5f5f;
  border-radius: 8px 8px 0 0;
}
</style>
