/**
 * 用户请求相关木块
 */

import request from '@/utils/request'
//  用户登录

export const login = data => {
        //  具体请求代码
        return request({
            method: 'POST',
            url: '/app/v1_0/authorizations',
            // headers: {
            //   //  asios 会自动添加请求头 有特殊符号需要加''号
            //   'Content-Type':'application/json'
            // }, //  请求头参数
            // params: {}, //  query 查询参数
            data //  Body 请求体参数
        })
    }
    //  获取验证码
export const getSmsCode = mobile => {
        //  具体请求代码
        return request({
            method: 'GET',
            url: `/app/v1_0/sms/codes/${mobile}`,

        })
    }
    //  获取当前登录用户信息
export const getUserInfo = () => {
    //  具体请求代码
    return request({
        method: 'GET',
        url: '/app/v1_0/user'
    })
}

// 获取指定用户信息
export const getUserById = userId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/users/${userId}`
    })
}