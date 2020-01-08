<template>
  <div class="login">
    <!-- 导航栏 -->
      <van-nav-bar title="登录"/>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
      <van-cell-group>
        <van-field
          clearable
          label="手机号"
          placeholder="请输入用户名"
          />

        <van-field
          type="password"
          label="验证码"
          placeholder="请输入验证码"
        />
      </van-cell-group>

      <div>
        <van-button type="info">请登录</van-button>
      </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
  export default {
    name: "LoginPage",
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    methods: {}
  };
</script>

<style scoped></style>