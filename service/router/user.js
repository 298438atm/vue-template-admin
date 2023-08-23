
//导入express
const express = require('express')
const jwt = require('jsonwebtoken');
//创建路由对象
const Router = express.Router()
const fs = require('fs')
//挂载具体路由
Router.get('/login', function (req, res) {
  const { username, password } = req.query
  const userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  const filterUser = userData.filter(item => item.username === username && item.password === password)
  if (filterUser.length === 1) {
    const payload = filterUser[0];
    const token = jwt.sign(payload, global.secretKey);
    res.send({
      code: 200,
      data: {
        token
      },
      msg: '登录成功！'
    })
  } else {
    res.send({
      code: 500,
      msg: '用户不存在！'
    })
  }
})

module.exports = Router