<template>
  <div id="app">
    <!-- 跟路由出口 -->
    <router-view />

    <!-- <i class="iconfont icon-apple"></i>
    <van-icon name="fire-o" />
    <van-icon name="fire-o" /> -->
    <!-- 改icon图标的时候 -->
    <!--class-prefix="foo"
     name="abc"     

     foo foo-abc    

     iconfont icon-apple   
 
     -->
  </div>
</template>

<script>
//   import xxx from '@/xxx'  js文件不需要加~
//  @ 是src的目录别名

export default {
// 根组件 
  name: 'App'
}
</script>


<style lang="less">
//  注意: 在style中使用@别名需要在前面加~
//  @后必须有/
//  如果你有加载的资源就是相对于当前目录,建议还是加./
@import url("~@/styles/variables.less");
.box {
  color:@color-primary;
}

</style>
