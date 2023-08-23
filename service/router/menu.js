//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

//挂载具体路由
Router.get('/getRoutes', function (req, res) {
  console.log(req.tokenData, 'req.tokenData');
  const { role } = req.tokenData
  const { name = '', status = '' } = req.query
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const data = menuData.filter(item => item.name.includes(name) && (item.status === '' ? true : item.status.includes(status)))
  res.send({
    code: 200,
    data: role === 'admin' ? data : data
  })

})
// 路由列表
Router.get('/getMenuList', function (req, res) {
  const { name = '', status = '' } = req.query
  console.log(status, 'status');
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const data = treeFilter(menuData, item => item.name.includes(name) && (status === '' ? true : (item.status === status)))
  res.send({
    code: 200,
    data: data
  })
  function treeFilter(tree, func) {
    // 使用map复制一下节点，避免修改到原树
    return tree.map(node => ({ ...node })).filter(node => {
      node.children = node.children && treeFilter(node.children, func)
      return func(node) || (node.children && node.children.length)
    })
  }
})

Router.post('/addEditMenu', function (req, res) {
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  console.log(req.body);
  if (!req.body.id) {
    if (req.body.parentMenu === 'rootMenu') {
      req.body.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
      req.body.id = global.selfUtils.createId()
      menuData.push(req.body)
    } else {
      console.log(123123123);
      menuData = addMenu(req.body.parentMenu, menuData)
    }
  } else {
    menuData = editMenu(req.body, menuData)
  }
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  res.send({
    code: 200,
    msg: (req.body.id ? '修改' : '新增') + '成功！'
  })
  function addMenu(parentMenu, menuData) {
    menuData.forEach((item, index) => {
      if (parentMenu === item.id) {
        Array.isArray(item.children) ? item.children : item.children = []
        req.body.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
        req.body.id = global.selfUtils.createId()
        item.children.push(req.body)
      } else {
        item.children = addMenu(parentMenu, item.children || [])
      }
    });
    return menuData
  }
  function editMenu(newMenuData, menuData) {
    menuData.forEach((item, index) => {
      if (newMenuData.id === item.id) {
        menuData.splice(index, 1, newMenuData)
      } else {
        item.children = editMenu(newMenuData, item.children || [])
      }
    });
    return menuData
  }
})

Router.delete('/delMenu', function (req, res) {
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  menuData = delMenu(req.body, menuData)
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  res.send({
    code: 200,
    msg: '删除成功！'
  })
  function delMenu(ids, menuData) {
    menuData.forEach((item, index, list) => {
      if (!ids.includes(item.id)) {
        if (Array.isArray(item.children) && item.children.length > 0) {
          delMenu(ids, item.children)
        }
      } else {
        console.log(ids);
        list.splice(index, 1)
      }
    });
    return menuData
  }
})

Router.get('/changeMenuStatus', function (req, res) {
  const { id } = req.query
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  menuData = statusChangeMenu(id, menuData)
  function statusChangeMenu(id, menuData) {
    menuData.forEach((item, index, list) => {
      if (id === item.id) {
        list[index]['status'] = item.status === '0' ? '1' : '0'
      } else {
        statusChangeMenu(id, item.children || [])
      }
    });
    return menuData
  }
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  res.send({
    code: 200,
    msg: '状态修改成功！'
  })
})
//向外导出路由
module.exports = Router