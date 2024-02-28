//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

function findParentMenus(menuData, menuCodes) {
  const result = {}
  // 递归查找父级菜单
  function findParents(menuItems, menuCode) {
    menuItems.forEach((menuItem) => {
      if (menuCodes.includes(menuItem.code)) {
        result[menuItem.code] = menuItem
        if (menuItem.parentMenu !== 'rootMenu') {
          findParents(menuData, menuItem.parentMenu)
        }
      } else if (menuItem.children.length > 0) {
        findParents(menuItem.children, menuCode)
      }
    })
  }
  // 遍历菜单 ID 集合
  menuCodes.forEach((menuCode) => {
    findParents(menuData, menuCode)
  })
  return Object.values(result)
}

// 将菜单数据结构化取出
function sortMenuTree(menus, codes) {
  const isFilter = Array.isArray(codes)
  const menuMap = new Map()
  for (const menu of menus) {
    menuMap.set(menu.code, menu)
  }
  const showMenuMap = new Map()
  if (isFilter) {
    for (const menu of menus) {
      if (codes.includes(menu.code)) {
        pushParentMenu(showMenuMap, menu, menus)
      }
    }
  }

  function findParent(menu) {
    return menuMap.get(menu.parentMenu)
  }
  // 将子级的所有父级都放入Map里
  function pushParentMenu(map, menu, menus) {
    map.set(menu.code, menu)
    const parentMenuCode = menu.parentMenu
    if (parentMenuCode !== 'rootMenu') {
      const parentMenu = menus.filter((item) => item.code === parentMenuCode)[0]
      if (parentMenu) {
        pushParentMenu(map, parentMenu, menus)
      }
    }
  }

  function insertIntoParent(menu, parent) {
    if (!parent) return
    if (!Array.isArray(parent.children)) {
      parent.children = []
    }
    const index = parent.children.findIndex((child) => child.sort > menu.sort)
    if (index === -1) {
      parent.children.push(menu)
    } else {
      parent.children.splice(index, 0, menu)
    }
  }

  const rootMenu = { code: '', children: [] }
  for (const [key, menu] of isFilter ? showMenuMap : menuMap) {
    // 如果是顶级目录
    const index = rootMenu.children.findIndex((child) => child.sort > menu.sort)
    if (menu.parentMenu === 'rootMenu') {
      if (index === -1) {
        rootMenu.children.push(menu)
      } else {
        rootMenu.children.splice(index, 0, menu)
      }
    } else {
      const parent = findParent(menu)
      if (parent) {
        insertIntoParent(menu, parent)
      } else {
        if (index === -1) {
          rootMenu.children.push(menu)
        } else {
          rootMenu.children.splice(index, 0, menu)
        }
      }
    }
  }
  return rootMenu.children
}

//挂载具体路由
Router.get('/getRoutes', function (req, res) {
  const { roleIds } = req.tokenData
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  let selfMenuCodes = []
  roleData.forEach((item) => {
    if (roleIds.includes(item.code)) {
      selfMenuCodes = selfMenuCodes.concat(item.menuCodes)
    }
  })
  const selfMenu = sortMenuTree(menuData, selfMenuCodes)
  const data = selfMenu.filter((item) => item.status === '1')
  res.send({
    code: 200,
    data,
  })
})

// 路由列表
Router.get('/getMenuList', function (req, res) {
  const { name = '', status = '' } = req.query
  function treeFilter(tree, func) {
    // 使用map复制一下节点，避免修改到原树
    return tree
      .map((node) => ({ ...node }))
      .filter((node) => {
        node.children = node.children && treeFilter(node.children, func)
        return func(node) || (node.children && node.children.length)
      })
  }
  const { roleIds } = req.tokenData
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  let selfMenuCodes = []
  roleData.forEach((item) => {
    if (roleIds.includes(item.code)) {
      selfMenuCodes = selfMenuCodes.concat(item.menuCodes)
    }
  })
  const selfMenu = sortMenuTree(menuData, selfMenuCodes)
  const data = treeFilter(
    selfMenu,
    (item) => item.name.includes(name) && item.status.includes(status)
  )
  res.send({
    code: 200,
    data,
  })
})

Router.post('/addEditMenu', function (req, res) {
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  let roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  if (!req.body.id) {
    req.body.is = global.selfUtils.createId()
    menuData.push(req.body)
    roleData = roleData.map((item) => {
      if (item.code === 'systemAdmin') {
        item.menuCodes.push(req.body.code)
      }
      return item
    })
  } else {
    const index = menuData.findIndex((item) => item.code === req.body.code)
    if (index > -1) {
      menuData.splice(index, 1, req.body)
    } else {
      res.send({
        code: 500,
        msg: '未查询到修改数据！',
      })
    }
  }
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  fs.writeFileSync('./data/role.json', JSON.stringify(roleData))
  res.send({
    code: 200,
    msg: (req.body.id ? '修改' : '新增') + '成功！',
  })
})

Router.delete('/delMenu', function (req, res) {
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  let index = menuData.findIndex(item => item.code === req.code)
  menuData.splice(index, 1)
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  res.send({
    code: 200,
    msg: '删除成功！',
  })
  // // let roleData = JSON.parse(fs.readFileSync('./data/role.json', 'utf8'))
  // const copyMenuData = JSON.parse(JSON.stringify(menuData))
  // const codes = req.body
  // menuData.forEach((item, index) => {
  //   if (codes.includes(item.code)) {
  //     if (item.isLeaf) {
  //       let idx = copyMenuData.findIndex((itm) => itm.code === item.code)
  //       copyMenuData.splice(idx, 1)
  //     } else {
  //       delSonMenu(copyMenuData, item.code)
  //     }
  //   }
  // })
  // // 更新角色数据
  // roleData = roleData.map((item) => {
  //   let delCodes = item.menuCodes.filter((itm) => !codes.includes(itm))
  //   item.menuCodes = delCodes
  //   return item
  // })
  // fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  // fs.writeFileSync('./data/role.json', JSON.stringify(roleData))
  // res.send({
  //   code: 200,
  //   msg: '删除成功！',
  // })
  function delSonMenu(menus, code) {
    let idx = menus.findIndex((itm) => itm.code === code)
    console.log(idx)
    if (idx > -1) {
      let currentMenu = menus[idx]
      const currentCode = currentMenu.code
      menus.splice(idx, 1)
      JSON.parse(JSON.stringify(menus)).forEach((item) => {
        if (item.parentMenu === currentCode) {
          delSonMenu(menus, item.code)
        }
      })
    }
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
    })
    return menuData
  }
  fs.writeFileSync('./data/menu.json', JSON.stringify(menuData))
  res.send({
    code: 200,
    msg: '状态修改成功！',
  })
})
//向外导出路由
module.exports = Router
