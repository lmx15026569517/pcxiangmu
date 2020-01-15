<template>
  <div class="channel-edit">
    <!-- 按钮样式组件 -->
    <van-cell title="我的频道" :border="false">
        <van-button 
        size="mini" 
        round 
        plain
        @click="isEditShow = !isEditShow"
        >{{ isEditShow ? '完成' : '编辑' }}</van-button>
    </van-cell> 
    <!-- bug  说我两个对象,就是:key没有写.id -->
      <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onUserChannelClik(index)"
      >
      <!-- 推荐频道不删除 -->
        <van-icon v-show="isEditShow && index !==0" slot="icon" name="close" />
      </van-grid-item>

</van-grid>
    <van-cell class="channel-header" title="推荐频道" :border="false"/>
      <van-grid :gutter="10" clickable>
      <van-grid-item
        v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
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
      allChannels: [], //  所有频道
      isEditShow: false  //  控制显示和隐藏
    }
  },
  computed: {
    remainingChannels () {
    const { allChannels, userChannels } = this
    // 剩余频道 = 所有频道 - 我的频道
    const channels = []
    // 遍历所有频道
    allChannels.forEach(item => {
      // 如果我的频道中不包含当前被遍历的频道，则要
      if (!userChannels.find(c => c.id === item.id)) {
        channels.push(item)
      }
    })
    return channels
    }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClik (index) {
      //  如果是编辑状态, 则执行删除操作
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)  // 从索引处开始,删除指定的个数
      }
      //  如果是非编辑状态,则执行切换频道操作
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -14px;
      right: -5px;
      .van-icon-close {
        font-size: 14px;
      }
    }

    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}
</style>