//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

//挂载具体路由
// 查询
Router.get('/getRoleList', function (req, res) {
  const { name = '', status = '', code = '' } = req.query
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  const data = roleData.filter(item => item.name.includes(name) && (typeof item.status === 'string' ? item.status.includes(status) : true) && item.code.includes(code))
  res.send({
    code: 200,
    data: data
  })
})
// 新增
Router.post('/addEditMenu', function (req, res) {
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
module.exports = Router