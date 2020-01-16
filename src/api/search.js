/**
 * 搜索接口模块
 * 
 */
import request from '@/utils/request'

// 获取文章指定用户的列表
export const getSuggestions = q => {
    return request({
        method: 'GET',
        url: '/app/v1_0/suggestion',
        params: {
            q
        }
    })
}