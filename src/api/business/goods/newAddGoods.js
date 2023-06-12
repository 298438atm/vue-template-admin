import request from '@/utils/request'

export function getTable (params) {
  return request({
    url: '/getTable',
    method: 'get',
    params
  })
}
