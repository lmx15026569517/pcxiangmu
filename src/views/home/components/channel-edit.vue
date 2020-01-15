<template>
  <div class="channel-edit">
    <!-- 按钮样式组件 -->
    <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger">编辑</van-button>
    </van-cell> 
    <!-- bug  说我两个对象,就是:key没有写.id -->
      <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in userChannels"
        :key="channel.id"
        :text="channel.name"
      />  

</van-grid>
    <van-cell title="推荐频道" :border="false"/>
      <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  components: {},
  //  简单写法props[]
  //  建议写法,props 验证
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [] //  所有频道
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style scoped>
.channel-edit {
  padding-top: 40px;
}
</style>