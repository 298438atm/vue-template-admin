import request from '@/utils/request'

export function login (params) {
  return request({
    url: '/user/login',
    method: 'get',
    noToken: true,
    params,
  })
}

export function getMenu () {
  return request({
    url: '/getMenu',
    method: 'get',
    
  })
}
