<template>
  <div class="login-container">
    <!-- 导航栏 -->
      <van-nav-bar title="登录"/>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
      <van-cell-group>
        <van-field
        v-model="user.mobile" 
          clearable
          left-icon="phone-o"
          placeholder="请输入手机号"
          icon-mobile
          />
    <!-- <i class="icon icon-mima" slot="left-icon"><i>
      老师是使用的阿里图标 外联  我使用组件 -->
        <van-field
          v-model="user.code"
          placeholder="请输入验证码"
          left-icon="contact" 
        > <!-- 倒计时 -->
        <van-count-down 
        v-if="isCountDownShow"
          slot="button" 
          :time="1000 * 60" 
          format=" ss s"
          />
        <van-button 
          v-else
          size="small" 
          type="primary"
          round
          >发送验证码</van-button>
         </van-field>
      </van-cell-group>
      <!-- wrap  包裹的意思 -->
      <div  class="login-btn-wrap">
        <van-button type="info" @click="onLogin">请登录</van-button>
      </div>
    <!-- /登录表单  class="van-button"-->
  </div>
</template>

<script>

 import { login } from '@/api/user'
  export default {
    name: "LoginPage",
    components: {},
    props: {},
    data() {
      return {
        user: {
          mobile: '',  // 手机号
          code: '' // 验证码
        },
        isCountDownShow: false  //  是否显示倒计时
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted () {},
    methods: {
      async onLogin () {
        // 1.获取表单数据
        const user = this.user
        //2. 表单验证
        this.$toast.loading({
          duration: 0, //  持续展示 toast
          message: "登录中...",
          forbidClick: true //  是否禁止背景点击
        })
      //  手动停止提示
      // 提示abc.clear()


        // 3. 请求登录
      try{
        const res = await login(user)

        window.console.log(res)

        //  提示成功
        this.$toast.success('登录成功')
      } catch(err) {
        window.console.log('登录失败',err)
        this.$toast.fail('登录失败')
      }
        // 4.根据后端返回结果执行后续业务处理
      }
    }
  };
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