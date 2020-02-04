<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div v-else-if="article.title" class="detail">
      <h3 class="title"> {{ article.title }}</h3>
     <!-- //  文章作者 -->
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{ article.aut_name }}</p>
            <p class="time">{{ article.pubdate | relativeTime }}</p>
          </div>
        </div>
        <van-button
            v-if="!user || article.aut_id !== user.id"
            class="follow-btn"
            :type="article.is_followed ? 'default' : 'info'"
            size="small"
            round
            :loading="isFollowLoading"
            @click="onFollow"
            >{{ article.is_followed ? '关注' : '+关注' }}</van-button>
      </div>
      <!-- 文章内容 -->
      <div class="markdown-body" v-html="article.content"></div>
      <!-- 文章内容/ -->

      <!-- 文章评论 -->
      <article-comment />
      <!-- /文章评论 -->
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div v-else class="error">
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <!-- //:name="article.is_collected ? 'star' : 'star-o'"收藏点赞就是1 -->
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import ArticleComment from '../article/components/article-comments'
// vuex 模块提供了一些辅助方法,专门用来让我们方便的获取容器中的数据
// mapState映射获取state数据
// maMutation:映射获取mutation数据
// mapAction:映射获取action数据
import { mapState } from 'vuex'
export default {
  name: 'ArticlePage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ArticleComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, //  文章详情
      loading: true, //  文章加载中的loading状态
      isFollowLoading: false // 关注按钮的loading状态
    }
  },
  computed: {
    // mapState 方法返回一个对象,对象中就是映射过来的数据成员
    //  ...操作符就是把一个对象展开,混入当前对象中
    ...mapState(['user'])
  },

  //  1.  需要哪个计算属性谁就写谁 this.user
  // computed: mapState(['user']),

  //  2. computed: {
  //  优化获取容器中的数据this.user
  // user () {
  //   return this.$store.state.user
  // }
  // },
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true // 在加失败后也可刷新页面重新加载
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (err) {
        window.console.log(err)
      }
      this.loading = false// 加载成功或者失败都是可以暂停
    },

    async onCollect () {
      this.$toast.loading({
        duration: 0, //  持续展示 toast
        message: '操作中...',
        forbidClick: true //  是否禁止背景点击
      })

      try {
        //  如果没有收藏, 则添加收藏
        //  如果收藏了,则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
        //  添加收藏
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        window.console.log(err)
        this.$toast.fail('操作失败')
      }
    },

    async onLike () {
      this.$toast.loading({
        duration: 0, //  持续展示 toast
        message: '操作中...',
        forbidClick: true //  是否禁止背景点击
      })

      try {
        //  如果已赞, 则取消赞
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
        //  添加收藏
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        window.console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onFollow () {
      this.isFollowLoading = true
      try {
        const authorId = this.article.aut_id
        //  如果已关注  则取消关注,
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
        //  添加关注
          await addFollow(authorId)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        window.console.log(err)
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 100px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            background-attachment: fixed;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
