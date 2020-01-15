<template>
  <div class="home-container">
    <!-- 导航栏 组件有固定功能 需要加属性 fixed -->
    <van-nav-bar title="首页" fixed />  
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!-- 
      v-model="active"控制标签激活页
     -->
    <van-tabs v-model="active">
      <van-tab 
        :title="channel.name" 
        v-for="channel in userChannels"
        :key="channel.id">
        <!-- 文章列表 -->
        <!-- TODO:  文章列表没有写-->
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 编辑频道 -->
    <van-popup 
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      closeable
      close-icon-position="top-left"
    />
    <!-- /编辑频道 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'

export default {
  name:'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,  // 控制激活的标签页
      userChannels: [], // 获取用户频道列表
      isChannelEditShow: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.userChannels = data.data.channels
    }
  }

}
</script>
 
<style scoped lang="less">
.home-container {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
// 扩展 关于组件作用域(注意也能对组件根节点有效),不仅对当前组件有效还可以对子组件的跟组件有效
//  给组件一个class 也会给标签生成有个class名字 ,
// /deep/  >>>(可以作用更深)  ::v-deep 那个不报错使用哪个

</style>
