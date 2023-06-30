import qs from 'qs'
import request from '@/utils/request'

export function getDictTypeList(params) {
  return request({
    url: '/dict/getDictTypeList',
    method: 'get',
    params
  })
}
export function getDictDataList(id) {
  return request({
    url: '/dict/getDictDataList',
    method: 'get',
    params: {id}
  })
}
export function addEditDictType(data) {
  return request({
    url: '/dict/addEditDictType',
    method: 'post',
    data
  })
}
export function addEditDictData(data) {
  return request({
    url: '/dict/addEditDictData',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/dict/del',
    method: 'delete',
    data
  })
}
export function check(params) {
  return request({
    url: '/dict/check',
    method: 'get',
    params
  })
}

export function getDictDatasBydictTypes(data) {
  return request({
    url: '/dict/getDictDatasBydictTypes',
    method: 'post',
    data,
  })
}

export function changeDictypeStatus(id) {
  return request({
    url: '/dict/changeDictypeStatus/' + id,
    method: 'get',
  })
  
}
export default
  {
    getDictTypeList,
    getDictDataList,
    addEditDictType,
    addEditDictData,
    del,
    check,
    changeDictypeStatus
  }