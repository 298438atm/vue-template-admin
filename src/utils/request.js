import axios from 'axios'
import router from '@/router'
import { getSessionByKey } from '@/utils/sessionCRUD'
import systemConfig from '@/config/system'
import { Notification } from 'element-ui'
import { Message } from 'element-ui'
const request = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 100000,
})

request.interceptors.request.use(config => {
  const { noToken } = config
  if (!noToken) {
    const token = getSessionByKey('token')
    if (!token) {
      Notification({
        title: '提示',
        message: 'token不存在！请重新登录!',
        type: 'error',
      })
      return Promise.reject('token不存在！请重新登录!')
    }
    config.headers['Authorization'] = token
  }
  return config
})

request.interceptors.response.use(res => {
  // 无权限
  if (res.status === 401) {
    router.push('/404')
    return res
  }
  if (res.status === 200) {
    if (systemConfig.strictRestrictions) {
      if (res.data.code === 200) {
        if (res.data.msg && systemConfig.automaticTip && !res.config.noTips) {
          Message({
            type: 'success',
            message: res.data.msg,
          })
        }
        return Promise.resolve(res.data.data)
      } else {
        Message({
          type: 'error',
          message: res.data.msg,
        })
        return Promise.reject(res.data)
      }
    } else {
      return Promise.resolve(res.data)
    }
  } else {
    Message({
      type: 'error',
      message: res.statusText,
    })
    return Promise.reject(res.data)
  }
})

export default request
