import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  加载验证插件的初始配置
import './utils/validation'

//  REM适配:动态设置HTMLl标签自体大小
import 'amfe-flexible'

//  加载注册Vue组件
import './utils/register-vant'

//  加载全局样式
import './styles/index.less'


Vue.config.productionTip = false
    //  注意所有初始化的代码都应该在new Vue根实例之前

new Vue({
    store,
    router,
    render: h => h(App),

}).$mount('#app');