<template>
  <div class="loginpage flex flex-row flex-nowrap">
    <!-- Left Thumb -->
    <div class="login-thumb h-full">
      <img
        class="h-full object-cover object-center"
        alt="login page thumb"
        style="width: 24.5vw; height: 100vh"
        src="https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.5b1efcd8.jpg"
      />
    </div>
    <!-- Right Login Section -->
    <div class="login-body flex flex-grow flex-col flex-nowrap">
      <!-- Header -->
      <div class="login-header h-20 p-5">
        <div class="float-left flex flex-row flex-nowrap items-center">
          <img
            class="w-10 mr-3 object-cover object-center"
            src="@/assets/pie-app-logo.svg"
            alt="pie mall logo"
            style="display: inline-block"
          />
          <span class="font-medium" style="font-size: 26px; color: #333">
            Pie Mall-Background
          </span>
        </div>
        <div
          class="
            login-nav-bar
            float-right
            h-full
            flex flex-row flex-nowrap
            items-center
          "
        >
          <a
            class="login-nav-about"
            href="https://github.com/Crushdada"
            style="font-size: 14px; font-weight: 400"
          >
            About
          </a>
        </div>
      </div>
      <!-- Middle Card -->
      <div
        class="
          login-card
          py-5
          my-5
          mx-auto
          flex-grow flex flex-col flex-nowrap
          items-center
        "
        style="min-width: 450px"
      >
        <!-- tab栏 -->
        <el-tabs v-model="activeTab" @tab-click="handleClickTab">
          <!-- 登录 -->
          <el-tab-pane
            name="Sign in"
            class="flex flex-col flex-nowrap items-center"
          >
            <!-- 自定义tab栏 -->
            <span slot="label" style="font-size: 22px"> Sign in </span>
            <!-- 账号 -->
            <p-input
              class="my-4"
              v-model="accountNumber"
              type="text"
              label="Email/Phone/Pie Account"
              desc="Enter your email address or phone number"
              style="font-size: 17px"
            />
            <!-- 密码 -->
            <p-input
              class="my-4"
              v-model="passWord"
              type="text"
              label="Password"
              style="font-size: 17px"
              desc="Enter your password"
              showPassword
            />
            <el-checkbox
              v-model="checkedIn"
              class="privacy-policy"
              style="width: 355px"
            >
              Agreed to our
              <a style="color: #333"> User Agreement </a>
              and
              <a style="color: #333"> Privacy Policy </a>.
            </el-checkbox>
            <span class="mt-2 mb-6 text-xs" style="color: #f04645">
              {{ verifyFailedTip }}
            </span>
            <el-button
              class="h-14 w-60 relative"
              style="font-size: 18px"
              type="primary"
              @click="handleSubmit"
            >
              {{ activeTab }}
            </el-button>
          </el-tab-pane>
          <!-- 注册 -->
          <el-tab-pane
            name="Sign up"
            class="flex flex-col flex-nowrap items-center"
          >
            <!-- 自定义tab栏 -->
            <span slot="label" style="font-size: 22px"> Sign up </span>
            <!-- 账号 -->
            <p-input
              class="my-4"
              v-model="accountNumber"
              type="text"
              label="Email/Phone/Pie Account"
              desc="Enter your email address or phone number"
              style="font-size: 17px"
            />
            <!-- 密码 -->
            <p-input
              class="my-4"
              v-model="passWord"
              type="text"
              label="Password"
              style="font-size: 17px"
              desc="Enter your password"
              showPassword
            />
            <el-checkbox
              v-model="checkedUp"
              class="privacy-policy"
              style="width: 355px; height: fix-content"
            >
              Agreed to our
              <a style="color: #333"> User Agreement </a>
              and
              <a style="color: #333"> Privacy Policy </a>.
            </el-checkbox>
            <span class="mt-2 mb-6 text-xs" style="color: #f04645">
              {{ verifyFailedTip }}
            </span>
            <el-button
              class="h-14 w-60 relative"
              style="font-size: 18px"
              type="primary"
              @click="handleSubmit"
            >
              {{ activeTab }}
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- Footer -->
      <footer class="text-center py-2">
        🌏 © 2022 Pie-Mall , code by Crushdada - Beijing , just send me an
        offer, Please.
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { signUser } from '@/api/user/sign-user';
import { checkSpecialCharacter } from '@/utils/string-validation';
import { ERROR_TYPE } from '../../../types/response/error-type.enum';
import { SET_AUTH_TICKET } from '@/store/auth.module/mutations/set-auth-ticket.mutation';
import { SET_USER_PROFILE } from '@/store/user.module/mutations/set-user-profile.mutation';
import { USER_SIGNED } from '@/store/auth.module/mutations/set-user-signed-state.mutation';

@Component({
  components: {
    PInput: () => import('@/components/pure-coms/PInput.vue'),
  },
})
export default class LoginPage extends Vue {
  /** Setup */
  // ===================================================================
  private accountNumber = '';
  private passWord = '';
  private activeTab = 'Sign in';
  private verifyFailedTip = '';
  private checkedIn = false;
  private checkedUp = false;

  /** Methods */
  // ===================================================================

  handleClickTab() {
    this.verifyFailedTip = '';
  }

  handleSubmit() {
    // 是否同意用户隐私协议
    const checkState =
      this.activeTab === 'Sign in' ? this.checkedIn : this.checkedUp;
    if (!checkState) {
      this.verifyFailedTip = '🧐Agree to Terms and Conditions first';
      return;
    }
    // 用户输入合法性校验
    if (!this.accountNumber || !this.passWord) {
      this.verifyFailedTip = '请输入账号密码';
      return;
    }
    if (
      checkSpecialCharacter(this.accountNumber) ||
      checkSpecialCharacter(this.passWord)
    ) {
      this.verifyFailedTip = '账号密码不能包含特殊字符或空格,请检查后重试';
      return;
    }
    this.activeTab === 'Sign in' ? this.sign('in') : this.sign('up');
  }

  /**
   * 登录成功后的业务逻辑
   */
  handleSignIn(data) {
    // 用户信息前端持久化
    const { userProfile, access_token: userTicket } = data;
    this.$stock.commit(SET_USER_PROFILE, userProfile);
    // 修改登录状态
    this.$stock.commit(USER_SIGNED, userTicket);
    // 存储ticket
    this.$stock.commit(SET_AUTH_TICKET, userTicket);
    // 路由跳转
    this.$router.replace({
      name: 'home',
    });
  }

  /**
   * 登录/注册
   * @param signType
   */
  async sign(signType: 'in' | 'up') {
    try {
      const response: any = await signUser({
        account: this.accountNumber,
        password: this.passWord,
        signType: signType,
      });
      if (response.status === ERROR_TYPE.NOT_FOUND) {
        this.verifyFailedTip = '账号密码错误，请重新输入';
        return;
      }
      if (response.status === ERROR_TYPE.ALREADY_EXIST) {
        this.verifyFailedTip = '账号已存在';
        return;
      }
      if (response.status !== 0) {
        throw Error(JSON.stringify(response));
      }
      // 登录/注册成功的情况
      if (signType === 'up') {
        this.$message({
          message: '注册成功,请登录',
          type: 'success',
          center: true,
        });
        this.activeTab = 'Sign in';
      } else {
        this.$message({
          message: '登录成功',
          type: 'success',
          center: true,
        });
        response.data.userProfile && this.handleSignIn(response.data);
      }
    } catch (err) {
      this.$message({
        showClose: true,
        message: 'Sign failed,Service Error',
        type: 'error',
        center: true,
      });
      console.log(err);
    }
  }
}
</script>
<style lang="scss" scoped>
.login-nav-about {
  color: #838383;
}
.login-card {
  padding: 40px 45px;
  box-shadow: 0 20px 50px 0 hsl(0deg 0% 24% / 10%);
}
.privacy-policy {
  color: #838383;
}
</style>
