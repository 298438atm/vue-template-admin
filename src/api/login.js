import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/vue2AdminTempalte/login',
    method: 'post',
    noToken: true,
    data
  })
}
