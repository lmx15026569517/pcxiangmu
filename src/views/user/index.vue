<template>
  <div class="user-container">
    <!-- 导航栏           @click-left="$router.back()"路由后退 -->
    <van-nav-bar :title="user.name" left-arrow @click-left="$router.back()"/>
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image
        class="col1"
        fit="cover"
        round
        :src="user.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{ user.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{ user.follow_count }}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{ user.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{ user.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <!--   r如果页面是当前登录用户 就显示编辑资料 -->
            <!-- 不然就显示私信和关注 -->
            <van-button type="primary" size="small">私信</van-button>
            <van-button type="info" size="small">关注</van-button>
            <!-- <van-button
              type="default"
              size="small"
            >编辑资料</van-button>-->
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div>
          <span>认证：</span>
          <span>{{ user.certi }}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{ user.intro }}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
//  引入接口
import { getUserById } from '@/api/user'
import { getArticlesByUser } from '@/api/article'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {
      user: {}, //  用户信息
      list: [], //  列表数据
      loading: false, //  控制上拉加载更多的 loading
      finished: false, //  是否加载结束了
      page: 1 //  获取下一页数据页码
    } //  用户信息
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    async loadUser () {
      try {
        const { data } = await getUserById(this.$route.params.useId) //  传入用户ID
        this.user = data.data
      } catch (err) {
        window.console.log(err)
        this.$toast('获取用户数据失败')
      }
    },
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArticlesByUser(this.$route.params.useId, {
        page: this.page, // 可选的，默认是第 1 页
        per_page: 20 // 可选的，默认每页 10 条
      })
      // 2. 把数据添加到列表中
      // list []
      // data.data.results []
      // ...[1, 2, 3] 会把数组给展开，所谓的展开就是一个一个的拿出来
      const { results } = data.data
      this.list.push(...results)
      // 3.加载状态结束

      this.loading = false
      // 4.判断数据是否全部加载完毕
      if (results.length) {
        this.page++ //  更新获取下一页数据页码
      } else {
        this.finished = true //  没有数据了,不需要加载更多
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
