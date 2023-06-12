import axios from 'axios'
import SessiomCrud from '@/utils/sessionCRUD'
import { Notification } from 'element-ui';
const request = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 100000
})

request.interceptors.request.use(config => {
  const { noToken } = config
  if (!noToken) {
    const token = SessiomCrud.get('token')
    if (!token) {
      Notification({title: '提示', message: 'token不存在！请重新登录', type: 'error'})
      return Promise.reject('token不存在！请重新登录')
    }
    config.headers['Authorization'] = token
  }
  return config
})

request.interceptors.response.use(res => {
  if (res.status === 401) {
    return res
  }
  if (res.status === 200 && res.data.code === 200) {
    return res.data.data
  }
  if (res.status === 200 && res.data.code !== 200) {
    return Promise.reject(res.data)
  }
  return Promise.reject(res)
})

export default request