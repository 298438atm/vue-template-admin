import axios from 'axios'
import SessiomCrud from '@/utils/sessionCRUD'
import { Notification } from 'element-ui';
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
const request = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 100000
})

request.interceptors.request.use(config => {
  console.log(config, this, 'config');
  const { noToken, method, params } = config
  if (!noToken) {
    const token = SessiomCrud.get('token')
    if (!token) {
      Notification({ title: '提示', message: 'token不存在！请重新登录', type: 'error' })
      return Promise.reject('token不存在！请重新登录')
    }
    config.headers['Authorization'] = token
  }
  return config
})

function performAsyncOperation(remind) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(remind.title, {
      ...remind
    }).then(() => {
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

request.interceptors.response.use(res => {
  const { load } = res.config
  if (window.myVue && load) {
    window.myVue[load] = false
  }
  if (res.status === 401) {
    return res
  }
  if (res.status === 200) {
    if (res.data.code === 200) {
      if (res.data.msg) {
        Message({
          type: 'success',
          message: res.data.msg
        })
      }
      return res.data.data
    } else {
      Message({
        type: 'error',
        message: res.data.msg
      })
      return Promise.reject(res.data)
    }

  } else {
    Message({
      type: 'error',
      message: res.statusText
    })
    return Promise.reject(res.data)
  }
})

export default request