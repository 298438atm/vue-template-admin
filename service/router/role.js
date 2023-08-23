//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

//挂载具体路由
// 查询
Router.get('/getRoleList', function (req, res) {
  const { name = '', status = '', code = '', currentPage, pageSize } = req.query
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  const record = roleData.filter(item => item.name.includes(name) && (typeof item.status === 'string' ? item.status.includes(status) : true) && item.code.includes(code)).slice(currentPage - 1, currentPage - 1 + pageSize)
  res.send({
    code: 200,
    data: {
      record,
      total: record.length,
      currentPage: Number(currentPage),
      pageSize: Number(pageSize)
    }
  })
})
// 新增
Router.post('/addEditRole', function (req, res) {
  const { sort, id } = req.body
  req.body.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
  if (!id) {
    req.body.id = global.selfUtils.createId()
  }
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  if (id) {
    const index = roleData.findIndex(item => item.id === id)
    roleData.splice(index, 1, req.body)
  } else {
    roleData.splice(sort, 0, req.body)
  }
  roleData.sort((a, b) => a.sort - b.sort)
  fs.writeFileSync('./data/role.json', JSON.stringify(roleData))
  res.send({
    code: 200,
    msg: (id ? '编辑' : '新增') + '成功！'
  })
})

// 校验角色编码是否重复
Router.get('/checkNameOrCode', function (req, res) {
  const { field, id } = req.query
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  let flag = roleData.some(item => (item[field] === req.query[field] && item.id !== id))
  res.send({
    code: 200,
    data: !flag,
  })
})

// 删除
Router.delete('/delRole', function (req, res) {
  let roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  roleData = roleData.filter(item => !req.body.includes(item.id))
  fs.writeFileSync('./data/role.json', JSON.stringify(roleData))
  res.send({
    code: 200,
    msg: '删除成功！'
  })
})

Router.post('/changeRoleStatus', function (req, res) {
  const {id} = req.body
  let currentStatus = null
  let roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  roleData = roleData.map(item => {
    if(item.id === id) {
      currentStatus = item.status
      item.status = item.status === '0' ? '1' : '0'
    }
    return item
  })
  fs.writeFileSync('./data/role.json', JSON.stringify(roleData))
  res.send({
    code: 200,
    msg: (currentStatus === '0' ? '启用' : '停用') + '成功！'
  })
})

module.exports = Router