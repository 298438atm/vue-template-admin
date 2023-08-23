import request from '@/utils/request'

export function getTable (params) {
  return request({
    url: '/newAddGoods/list',
    method: 'get',
    params
  })
}
