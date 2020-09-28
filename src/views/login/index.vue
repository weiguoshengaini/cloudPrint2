<template>
  <div class="login-container">
    <div class="head-box">
      <el-row type="flex" align="middle">
        <el-image
          style="width: 100px; height: 100px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="contain"
        ></el-image>
        <h3 class="title-h3">{{adminTitle}}</h3>
      </el-row>
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="user-login-text">用户登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入手机号码"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>

      <el-row type="flex" class="row-box" justify="space-between">
        <el-col :span="12">
          <el-checkbox v-model="checkePassword">记住账号</el-checkbox>
        </el-col>
        <el-col :span="12" class="password-text">
          <span class type="text" @click="forgetPaw" >忘记密码</span>
        </el-col>
      </el-row>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <!--
      重置密码弹出框
    -->
    <el-dialog
      v-dialogDrag
      :modal="false"
      :close-on-click-modal="false"
      title="重置密码"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form ref="resetRules" :model="resetForm" :rules="resetRules">
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phoneNumber">
          <el-input v-model="resetForm.phoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="checkCode">
          <el-row type="flex" align="middle">
            <el-input style="width:55%" v-model="resetForm.checkCode" autocomplete="off"></el-input>
            <el-image
              class="check-code-img"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600952665138&di=f8d3a0313bfdecb47b1544c72f89615b&imgtype=0&src=http%3A%2F%2Fwww.zhuangjiba.com%2Fd%2Ffile%2Fhelp%2F2018%2F08%2Fcfdefaddb3f47d78f8c66a7de28720aa.png"
            ></el-image>
            <i @click="refreshCode" class="reset-refresh el-icon-refresh"></i>
            <el-button v-if="showIconCheck" class="reset-btn-check" type="success" size="mini" icon="el-icon-check" circle></el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="手机验证码" :label-width="formLabelWidth" prop="phoneCheckCode">
          <el-row type="flex" align="middle">
            <el-input style="width:60%" v-model="resetForm.phoneCheckCode" autocomplete="off"></el-input>
            <el-button class="reset-get-code" type="primary"  @click="getCheckCode">{{codeText}}</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
          <el-input type="password"  v-model="resetForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=" 确认密码" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input type="password" v-model="resetForm.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item l :label-width="formLabelWidth">
          <el-button style="width:100%;" type="primary" disabled @click="restPaw">重置密码</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="tail-box">映美控股有限公司版权所有 ©jolimark.com 粤ICP备05080281号</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import configSetting from '@config/index'
import { validateUsername, validatePassword } from '@utils/validate'
export default {
  name: 'Login',
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateCode = (rule, value, callback) => {
      this.showIconCheck = false
      if (value === '') {
        callback(new Error('请再次输入校验码'))
      } else if (value !== this.checkCode) {
        callback(new Error('校验码输入有误!'))
      } else {
        this.showIconCheck = true
        callback()
      }
    }
    return {
      resetForm: {
        phoneNumber: '',
        checkCode: '',
        phoneCheckCode: '',
        password: '',
        confirmPassword: ''
      },
      checkCode: '7364',
      formLabelWidth: '100px',
      centerDialogVisible: false,
      checkePassword: !!localStorage.username,
      adminTitle: configSetting.title,
      loginForm: {
        username: localStorage.username,
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      resetRules: {
        phoneNumber: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        checkCode: [
          { required: true, validator: validateCode, trigger: 'blur' },
          { min: 4, max: 4, message: '长度在4位数', trigger: 'blur' }
        ],
        phoneCheckCode: [
          { required: true, message: '请输入校验码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在6位数', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      clock: null,
      totalTime: 120,
      codeText: '获取验证码',
      showIconCheck: false
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    loginForm: {
      handler: function (val) {
        this.checkePassword && (localStorage.username = this.loginForm.username)
      },
      deep: true
    },
    resetForm: {
      handler: function (val) {
        val.checkCode === this.checkCode ? (this.showIconCheck = true) : (this.showIconCheck = false)
      },
      deep: true
    },
    checkePassword (blo) {
      blo ? (localStorage.username = this.loginForm.username) : (localStorage.username = '')
    }
  },
  methods: {
    ...mapActions(['user/login']),
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    restPaw() {
      this.$refs.resetRules.resetFields()
      this.centerDialogVisible = false
    },
    forgetPaw() {
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.$refs.resetRules.resetFields()
      })
    },
    refreshCode() {
      this.$message.success('刷新成功')
    },
    getCheckCode() {
      if (this.clock) {
        return
      }

      this.clock = setInterval(() => {
        this.totalTime--
        this.codeText = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          clearInterval(this.clock)
          this.clock = null
          this.totalTime = 120
          this.codeText = '获取验证码'
        }
      }, 1000)
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this['user/login'](this.loginForm).then(res => {
            const path = typeof this.redirect !== 'undefined' ? this.redirect : '/'
            this.$router.push({ path: path })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$btn_color-1: #409eff;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .head-box {
    margin-left: 30px;
  }
  .title-h3 {
    margin-left: 10px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
  }
  .user-login-text {
    font-size: 700;
  }
  .login-form {
    position: relative;
    width: 30vw;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 12vh auto 0;
    overflow: hidden;
    background: #fff;
    border-radius: 5px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .row-box {
    padding: 0 0 40px 0;
  }
  .title-container {
    position: relative;
    padding-bottom: 40px;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .password-text {
    color: $btn_color-1;
    font-size: 14px;
    text-align: right;
  }
   .password-text>span {
    cursor: pointer;
  }
  .check-code-img{
    width: 20%; height: 35px;margin-left:5px;
  }
  .reset-btn-check{
    font-size: 12px;
    padding: 3px;
    margin-left:5px;
  }
  .reset-refresh{
    font-size:22px;
    margin-left:5px;
    cursor: pointer;
  }
  .reset-get-code{
    width:38%;
    margin-left: 5px;;
    padding: 12px 10px;
  }
  .tail-box {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 40px;
    color: #fff;
  }
}
</style>
