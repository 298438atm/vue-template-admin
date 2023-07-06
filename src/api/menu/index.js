import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: '/menu/getMenuList',
    method: 'get',
    params,
    load: 'tableLoading'
  })
}
export function addEditMenu(data) {
  return request({
    url: '/menu/addEditMenu',
    method: 'post',
    data,
    load: 'submitLoading'
  })
}
export function delMenu(data) {
  return request({
    url: '/menu/delMenu',
    method: 'delete',
    data,
    load: 'delBtnLoading',
    remind: {title: '提示', message: '确认删除所选数据吗？', type: 'warning'}
  })
}

export default {
  getMenuList,
  addEditMenu,
  delMenu
}