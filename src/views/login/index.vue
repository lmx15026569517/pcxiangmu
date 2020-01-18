<template>
  <div class="login-container">
    <!-- 导航栏 -->
      <van-nav-bar title="导航"/>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <!--
      表单验证
      1.使用 ValidationObserver 组建把需要验证的整个表单抱起来
      2. 使用 ValidationProvider 组建把具体的表单元素抱起来 ,例如input
            name 配置字段的提示名称
            rules 配置校验规则
            v-slot="{ errors }" 获取校验失败的错误提示消息

     -->
    <ValidationObserver ref="form" >
      <van-cell-group>
        <ValidationProvider name="手机号" rules="required|mobile" immediate>

          <van-field
            v-model="user.mobile"
            clearable
            left-icon="phone-o"
            placeholder="请输入手机号"
            icon-mobile
            >
          </van-field>
        </ValidationProvider>

      <!-- <i class="icon icon-mima" slot="left-icon"><i>
      老师是使用的阿里图标 外联  我使用组件 -->
      <ValidationProvider name="验证码" rules="required" immediate>
        <van-field
          v-model="user.code"
          placeholder="请输入验证码"
          left-icon="contact"
        > <!-- 倒计时 -->
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 10"
          format=" ss s"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          slot="button"
          size="small"
          type="primary"
          round
          @click="onSendSmsCode"
          >发送验证码</van-button>
         </van-field>

        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>

      <div  class="login-btn-wrap">
        <van-button type="info" @click="onLogin">请登录</van-button>
      </div>
    <!-- /登录表单  class="van-button"-->
  </div>
</template>

<script>

import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号13911111111
        code: '' // 验证码246810
      },
      isCountDownShow: false //  是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 1.获取表单数据
      const user = this.user

      // 2. 表单验证
      const success = await this.$refs.form.validate()
      // window.console.log(success)

      if (!success) {
        window.console.log('表单表单验证失败')
        //  如果你需要在js验证中能马上获取到错误信息
        // 必须给没一个ValidationProvider 配置immediate初始验证(开始就有错误提示)
        const errors = this.$refs.form.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) { this.$toast(item[0]) }
          //  找到第一个错误给出提示 停止遍历
          return
        }
        //  获取验证失败的错误消息,轻提示
        return
      }

      //  开启登录中 loading
      this.$toast.loading({
        duration: 0, //  持续展示 toast
        message: '登录中...',
        forbidClick: true //  是否禁止背景点击
      })
      //  手动停止提示
      // 提示abc.clear()
      // 3. 请求登录
      try {
        const { data } = await login(user)

        //  当登陆成功获取到的用户 token相关数据存储到 Vue容器里
        this.$store.commit('setUser', data.data)

        //  提示成功
        this.$toast.success('登录成功')
        this.$router.push('/') //  跳转页面
      } catch (err) {
        window.console.log('登录失败', err)
        this.$toast.fail('登录失败,手机号或者验证码不正确')
      }
      // 4.根据后端返回结果执行后续业务处理
    },
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        //  1请求发送手机号是否有效
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })

        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        //  2请求发送短信验证码
        const res = await getSmsCode(mobile)
        window.console.log(res)

        //  3显示倒时器
        this.isCountDownShow = true
      } catch (err) {
        window.console.log(err)
        this.$toast.fsil('请勿频繁操作')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 27px 16px;
    .van-button {
      width: 100%;
    }
  }
  .van-cell {
    align-items: center;
  }
}
</style>
