<template>
  <div class="home-container">
    <!-- 导航栏 组件有固定功能 需要加属性 fixed -->
    <van-nav-bar title="首页" fixed />
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!--
      v-model="active"控制激活的标签title标签标题
     -->
    <van-tabs v-model="active">
      <!-- 通过差曹把面包按钮放进去 -->
      <van-icon
       class="wap-nav"
       slot="nav-right"
       name="wap-nav"
       @click="isChannelEditShow = true"
      />
      <van-tab
        :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id"
        >
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
    >
    <channel-edit
    :user-channels="userChannels"
    :active="active"
    @switch="onChannelSwitch"

    />
     </van-popup>
    <!-- /编辑频道 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制激活的标签页
      userChannels: [], // 获取用户频道列表
      isChannelEditShow: true // 这里我们先设置为 true 就能看到弹窗的页面了

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
      try {
        // channel-edit.vue 这里是逻辑
        // 如果有本地的优先使用本地的,如果没有则请求获取接口
        // 1.声明变量存储频道数据
        let channels = []
        // 2.获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')
        // 3.如果没有本地存储的则使用本地存储的
        if (localUserChannels) {
          channels = localUserChannels
        } else {
        // 4.如果没有本地存储的则使用接口的
          const { data } = await getUserChannels()
          channels = data.data.channels
        }

        // 5.将数据赋值给当前组件
        this.userChannels = channels
      } catch (err) {
        window.console.log(err)
        this.$toast('获取频道数据失败')
      }
    },

    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false //  关闭弹层
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top:90px;
  padding-bottom: 50px;
}
.wap-nav {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: .8;
}

  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }

// 扩展 关于组件作用域(注意也能对组件根节点有效),不仅对当前组件有效还可以对子组件的跟组件有效
//  给组件一个class 也会给标签生成有个class名字 ,
// /deep/  >>>(可以作用更深)  ::v-deep 那个不报错使用哪个

</style>
