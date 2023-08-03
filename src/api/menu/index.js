import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: '/menu/getMenuList',
    method: 'get',
    params
  })
}
export function getRoutes(params) {
  return request({
    url: '/menu/getRoutes',
    method: 'get',
    params
  })
}
export function addEditMenu(data) {
  return request({
    url: '/menu/addEditMenu',
    method: 'post',
    data
  })
}
export function delMenu(data) {
  return request({
    url: '/menu/delMenu',
    method: 'delete',
    data
  })
}

export function changeMenuStatus(id) {
  return request({
    url: '/menu/changeMenuStatus',
    method: 'get',
    params: { id }
  })
}

export default {
  getMenuList,
  addEditMenu,
  delMenu,
  changeMenuStatus
}