<template>
  <div id="app">
    <!-- 跟路由出口 -->
    <router-view />

    <i class="iconfont icon-apple"></i>
    <van-icon name="fire-o" />
    <van-icon name="fire-o" />

<!--class-prefix="foo"
 name="abc" 

 foo foo-abc

 iconfont icon-apple   
 
  -->
  <van-icon class-prefix="icon" name="apple" />
  
    <div class="box">hello</div>

   

    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>

    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
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
