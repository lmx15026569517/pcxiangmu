/**  基于axios模块
 * 
 */

import axios from 'axios'
import jsonBig from 'json-bigint'


//  axios.create 方法创建一个和axios本身一样的对象
const request = axios.create({
        baseURL: '"http://ttapi.research.itcast.cn/"' //  基础路径
    })
    //  axios开放了定义转换后端返回数据APL
    //  data就是后端返回的数据
request.defaults.transformResponse = [function(data) {
    try {
        // 现在我们定制使用 json-bigint(安装的包) 来帮我们处理转换原始的 JSON 格式字符串
        // 这个方法类似于 JSON.parse，只不过它能把数据中的超出 JS 安全整数范围的数字给处理成正确的
        // 它内部有自己的算法，它会把大数字转为一个对象，我们在使用的时候把对象.toString() 就得到字符串形式的 id 了
        // 如果转换成功则返回成功的结果给请求使用
        // 如果转换失败则进入 catch，返回一个空对象
        return jsonBig.parse(data)

        //  它默认是这样的
        //return JSON.parse(data)
    } catch (err) {
        window.console.log('转换失败', err)
        return {}
    }

}]




//  请求拦截
//  响应拦截
//  导出
export default request