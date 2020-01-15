<template>
  <div class="channel-edit">
    <!-- 按钮样式组件 -->
    <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger">编辑</van-button>
    </van-cell> 
      <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in userChannels"
        :key="channel"
        :text="channel.name"
      />
</van-grid>
    <van-cell title="推荐频道" :border="false"/>
      <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="你可以"
      />
    </van-grid>
  </div>
</template>

<script>
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
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>
.channel-edit {
  padding-top: 40px;
}
</style>