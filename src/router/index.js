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
}]

const router = new VueRouter({
    routes
})

// 导出
export default router