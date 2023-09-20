//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

function findParentMenus(menuStructure, menuIds) {
  const result = {};

  // 递归查找父级菜单
  function findParents(menuId, menuItems) {
    menuItems.forEach((menuItem) => {
      if (menuIds.includes(menuItem.code)) {
        result[menuItem.code] = menuItem;

        if (menuItem.parentMenu !== 'rootMenu') {
          findParents(menuItem.parentMenu, menuStructure);
        }
      } else if (menuItem.children) {
        findParents(menuId, menuItem.children);
      }
    });
  }

  // 遍历菜单 ID 集合
  menuIds.forEach((menuId) => {
    console.log(menuId, 'menuId');
    findParents(menuId, menuStructure);
  });
  return Object.values(result);
}


//挂载具体路由
Router.get('/getRoutes', function (req, res) {
  const { roleIds } = req.tokenData
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  let selfMenuIds = []
  roleData.forEach(item => {
    if (roleIds.includes(item.code)) {
      selfMenuIds = selfMenuIds.concat(item.menuIds)
    }
  })
  console.log(selfMenuIds);
  const selfMenu = findParentMenus(menuData, selfMenuIds)
  console.log(selfMenu, 'selfMenu');
  const data = selfMenu.filter(item => item.status === '1')
  res.send({
    code: 200,
    data
  })
})
// 路由列表
Router.get('/getMenuList', function (req, res) {
  const { name = '', status = '' } = req.query
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
  if (!req.body.id) {
    if (req.body.parentMenu === 'rootMenu') {
      req.body.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
      req.body.id = global.selfUtils.createId()
      menuData.push(req.body)
    } else {
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