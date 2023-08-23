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

export function addEditRole(data) {
  return request({
    url: '/role/addEditRole',
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

export function changeRoleStatus(id) {
  return request({
    url: '/role/changeRoleStatus',
    method: 'post',
    data: { id }
  })
}

export default {
  getRoleList,
  checkNameOrCode,
  addEditRole,
  delRole,
  editRole,
  changeRoleStatus
}