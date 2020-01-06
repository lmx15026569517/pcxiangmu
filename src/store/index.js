import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
//  创建 Vue Store实例
const store = new Vuex.Store({
    //  自动把store挂载到vue.prototype中起名为$store
    state: {
        count: 0
    },
    //  把需要修改的数据代码封装成一个个函数,然后调用修改 
    mutations: {
        //  方法区域
        add(state) {
            state.count++
        },
        lmx(state) {
            state.count--
        }
    }
});
export default store;