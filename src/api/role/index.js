import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/role/getRoleList',
    method: 'get',
    params
  })
}
// 新增校验name和code是否重复
export function checkNameOrCode(params) {
  return request({
    url: '/role/checkNameOrCode',
    method: 'get',
    params
  })
}

export function addEditMenu(data) {
  return request({
    url: '/role/addEditMenu',
    method: 'post',
    data
  })
}
export function editRole() {
  return request({
    url: '/role/addRole',
    method: 'post',
    data
  })
}
export function delRole(data) {
  return request({
    url: '/role/delRole',
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
  getRoleList,
  checkNameOrCode,
  addEditMenu,
  delRole,
  editRole
}