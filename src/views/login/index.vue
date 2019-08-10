<template>
<div class="login_wrap">
<van-nav-bar
  title="登录"
/>
<form>
<van-cell-group>
  <van-field
    placeholder="请输入手机号"
    left-icon="alipay"
     clearable
     v-model="user.mobile"
      name="mobile"
     v-validate="'required|digits:11'"
     :error-message="errors.first('mobile')"
  />

  <van-field
    center
    left-icon="alipay"
    clearable
    placeholder="请输入验证码"
     v-model="user.code"
       name="code"
       v-validate="'required|digits:6'"
       :error-message="errors.first('code')"

  >
    <!-- <van-button slot="button" size="small" >发送验证码</van-button> -->
  <van-button class="yz" round  size="small" slot="button" value=''>获取验证码</van-button> </van-field>
</van-cell-group>

<van-button
 type="info button"
 style="width:100%"
  @click='handleLogin'
 :loading="btnLoading"
  loading-type="spinner"
  loading-text="登录中..."
  native-type='button'
  >登录</van-button>
</form>
</div>
</template>

<script>
import '@/styles/index.less'
import { login } from '@/api/user.js'
export default {
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          digits: '手机号码必须是11位数字'
        },
        code: {
          required: '请输入验证码',
          digits: '验证码必须是6位数字'
        }
      }
    }
    this.$validator.localize('zh_CN', dict)
  },
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMessage: '',
      btnLoading: false
    }
  },
  methods: {
    async handleLogin () {
      this.btnLoading = true
      //  console.log(this.user)
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
        // do stuff if not valid.
          this.btnLoading = false
          this.$toast.fail('账号密码格式不正确')
        }
        const data = await login(this.user)
        //    console.log(data)
        this.$store.commit('setUser', data)
        this.$router.push('/')
        this.$toast.success('登录成功')
        this.btnLoading = false
      } catch (err) {

      }
    }
  }
}
</script>
<style lang="less">
 .form{
      padding: 20px;
     .van-field{
          padding-left:100;
          box-sizing: border-box;

     }
 }
 .van-buttonz{
      height: 60px;
      line-height: 50px;
      background:#EEEEEE;
 }
</style>
