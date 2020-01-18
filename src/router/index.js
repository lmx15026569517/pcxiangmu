import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter) //  全局注册

//  配置路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
            import ('@/views/login')
},
{
  path: '/',
  name: 'tab-bar',
  component: () =>
            import ('@/views/tab-ber'),
  children: [{
    path: '/', //  默认子路由
    name: 'home',
    component: () =>
                import ('@/views/home')
  }, {
    path: 'qa',
    name: 'qa',
    component: () =>
                import ('@/views/qa')
  }, {
    path: 'video',
    name: 'video',
    component: () =>
                import ('@/views/video')
  }, {
    path: 'my',
    name: 'my',
    component: () =>
                import ('@/views/my')
  }]

},
{
  path: '/user/:useId',
  name: 'user',
  component: () =>
            import ('@/views/user')
},
{
  path: '/search',
  name: 'search',
  component: () =>
            import ('@/views/search')
},
{
  path: '/article/:articleId',
  name: 'article',
  component: () => import('@/views/article'),
  props: true //  将路由动态参数映射到组件的 props 中  不需要$router传了
}
]

const router = new VueRouter({
  routes
})

// 导出
export default router
