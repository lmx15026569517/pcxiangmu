<template>
  <div class="article-list">
    <!-- @refresh = 下拉刷新的事件
    -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- v-model="lsLoading"  控制下拉刷新的 loading的状态-->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <van-cell
          v-for="(article,index) in list"
          :key="index"
          :title="article.title"
        />
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
  props: {
    //  参考文档:
    channel: {
      type: Object, // 必须是对象
      required: true//  必须传递改数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 用于下一页的数据页码(时间戳)
      isLoading: false //  控制下拉刷新的 loading状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, //  频道id
        timestamp: this.timestamp || Date.now(), //  时间戳,请求新的推荐数据传当前的时间戳,请求历史数据请求之前时间戳
        with_top: 1 // 是否包含置顶 ,进入页面第一次请求是需要包含置顶文章1包含置顶,0不包含置顶
      })

      // 2.把数据添加到列表中
      const { results } = data.data
      window.console.log(results)
      this.list.push(...results)
      // 3. 停止本次的 loading
      this.loading = false
      // 4. 判断数据是否加载结束
      if (results.length) {
        this.timestamp = data.data.pre_timestamp // 更新获取下一页的时间戳
      } else {
        this.finished = true //  没有数据了设置加载结束
      }
    },

    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })

      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results) //  结构解析

      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
    }
  }
}

</script>

<style scoped></style>
