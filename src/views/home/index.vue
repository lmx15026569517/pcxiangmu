<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" />
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
      userChannels: [] // 获取用户频道列表
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
 
<style scoped>

</style>
