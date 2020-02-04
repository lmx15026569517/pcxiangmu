/**
 * 文章评论接口模块
 */
import request from '@/utils/request'

//  获取文章品论或评论回复
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: ' /app/v1_0/comments',
    params
  })
}
