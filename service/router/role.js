//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

//挂载具体路由
Router.get('/getRoles', function (req, res) {
  const { name = '', status = '' } = req.query
  const menuData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  const data = menuData.filter(item => item.name.includes(name) && item.status)
  res.send({
    code: 200,
    data: data
  })
})

module.exports = Router