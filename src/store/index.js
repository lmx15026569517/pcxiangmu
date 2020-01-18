/*
 * Vue 容器
 *  获取方便
 *   响应式的
 * 本地存储
 *  持久化
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
// import { setIem } from "../utils/storage"

const USER_KEY = 'user'

Vue.use(Vuex)

//  创建 Vue Store实例
export default new Vuex.Store({
  //  自动把store挂载到vue.prototype中起名为$store
  state: {
    //  null { token, refresh_token }
    user: getItem(USER_KEY)
    // user: JSON.parse(window.localStorage.getItem('user')) //  当前登录用户状态 (token)
    // user: null // 当前用户登录状态
  },
  //  把需要修改的数据代码封装成一个个函数,然后调用修改
  mutations: {
    setUser (state, data) {
      state.user = data
      //  为了避免页面刷新数据丢失,我们这里使用本地进行存储进行 持久化
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {

  },
  modules: {

  }
})
