import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    noToken: true,
    data
  })
}

export function getMenu () {
  return request({
    url: '/getMenu',
    method: 'get',
    
  })
}
