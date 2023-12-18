
//导入express
const express = require('express')
const jwt = require('jsonwebtoken');
//创建路由对象
const Router = express.Router()
const fs = require('fs')
//挂载具体路由
Router.get('/login', function (req, res) {
  const { nickname, password } = req.query
  const userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  const filterUser = userData.filter(item => item.nickname === nickname && item.password === password)
  if (filterUser.length === 1) {
    const payload = filterUser[0];
    const token = jwt.sign(payload, global.secretKey);
    res.send({
      code: 200,
      data: {
        token
      },
      msg: '欢迎登录vue-admin-template平台！'
    })
  } else {
    res.send({
      code: 500,
      msg: '用户不存在！'
    })
  }
})

Router.get('/getUserInfo', function (req, res) {
  res.send({
    code: 200,
    data: req.tokenData
  })
})

Router.get('/list', function (req, res) {
  const { nickname = '', tel = '', roles, currentPage = 1, pageSize = 10 } = req.query
  const userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  const filterUser = userData.filter(item => item.nickname.includes(nickname) && item.tel.includes(tel)).slice(currentPage - 1, currentPage - 1 + pageSize)
  res.send({
    code: 200,
    msg: '',
    data: {
      record: filterUser,
      total: filterUser.length,
      currentPage,
      pageSize
    }
  })
})

Router.get('/getRoleList', function (req, res) {
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  res.send({
    code: 200,
    msg: '',
    data: roleData
  })
})

Router.post('/addOredit', function (req, res) {
  const { id, tel } = req.body
  const userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  let addData = req.body
  if (!id) {
    addData.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
    addData.id = global.selfUtils.createId()
    if (userData.some(item => item.tel === tel)) {
      res.send({
        code: 500,
        msg: '手机号码已被使用'
      })
    } else {
      userData.push(addData)
      fs.writeFileSync('./data/user.json', JSON.stringify(userData))
      res.send({
        code: 200,
        msg: '新增成功！'
      })
    }
  } else {
    const index = userData.findIndex(item => item.id === id)
    const sameTelIndex = userData.findIndex(item => item.tel === tel)
    if (sameTelIndex > -1 && sameTelIndex !== index) {
      res.send({
        code: 500,
        msg: '修改失败！手机号码已被使用'
      })
      return
    }
    if (index > -1) {
      addData.editTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
      userData.splice(index, 1, addData)
      fs.writeFileSync('./data/user.json', JSON.stringify(userData))
      res.send({
        code: 200,
        msg: '修改成功！'
      })
    } else {
      res.send({
        code: 500,
        msg: '修改失败！'
      })
    }
  }
})

Router.delete('/del', function (req, res) {
  let userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  userData = userData.filter(item => !req.body.includes(item.id))
  fs.writeFileSync('./data/user.json', JSON.stringify(userData))
  res.send({
    code: 200
  })
})

Router.get('/changeStatus', function (req, res) {
  const { id } = req.query
  let userData = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))
  const index = userData.findIndex(item => item.id === id)
  if (index > -1) {
    userData[index]['status'] = (userData[index]['status'] === '1' ? '0' : '1')
    fs.writeFileSync('./data/user.json', JSON.stringify(userData))
    res.send({
      code: 200,
      msg: userData[index]['status'] === '1' ? '启用成功！' : '停用成功！'
    })
  }

})

module.exports = Router