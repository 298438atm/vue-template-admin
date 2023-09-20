import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    noToken: true,
    params,
  })
}

export function getMenu() {
  return request({
    url: '/getMenu',
    method: 'get',
  })
}
export function getRoleList() {
  return request({
    url: '/user/getRoleList',
    method: 'get',
  })
}

export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  })
}
export function addOrEdit(data) {
  return request({
    url: '/user/addOrEdit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/user/del',
    method: 'delete',
    data
  })
}
export function changeStatus(params) {
  return request({
    url: '/user/changeStatus',
    method: 'get',
    params
  })
}

export default {
  getList,
  getRoleList,
  addOrEdit,
  del,
  changeStatus
}