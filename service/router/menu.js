//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')
//挂载具体路由
Router.get('/getMenuList', function (req, res) {
  const { name = '', status = '' } = req.query
  const menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  const data = menuData.filter(item => item.name.includes(name) && item.status)
  res.send({
    code: 200,
    data: data
  })
})

Router.post('/addEditMenu', function (req, res) {
  let menuData = JSON.parse(fs.readFileSync('./data/menu.json', 'utf8'))
  if (!req.body.id) {
    if (req.body.parentMenu === 'rootMenu') {
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
    msg: req.body.id ? '修改' : '新增' + '成功！'
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
        item.children.push(req.body)
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

// Router.get('/getDictDataList', function (req, res) {
//   const { id } = req.query
//   const dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   const index = dictData.findIndex(item => item.id === id)
//   if (index > -1) {
//     res.send({
//       code: 200,
//       data: dictData[index]['dictData'] || [],
//     })
//   } else {
//     res.send({
//       code: 500,
//       data: [],
//       msg: '字典类型id错误'
//     })
//   }

// })

// Router.get('/check', function (req, res) {
//   const dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   const { type, value, id } = req.query
//   let resData = {}
//   if (!id) {
//     if (dictData.some(item => item[type] === value)) {
//       resData = {
//         code: 200,
//         data: false
//       }
//     } else {
//       resData = {
//         code: 200,
//         data: true,
//       }
//     }
//   } else {
//     let filterDictTypeData = dictData.filter(item => item[type] === value)
//     if (filterDictTypeData.length === 0 || (filterDictTypeData.length === 1 && filterDictTypeData[0]['id'] === id)) {
//       resData = {
//         code: 200,
//         data: true,
//       }
//     } else {
//       resData = {
//         code: 200,
//         data: false
//       }
//     }
//   }
//   res.send(resData)
// })

// Router.post('/addEditDictType', function (req, res) {
//   const { id, dictTypeName, dictTypeCode, dictTypeRemark } = req.body
//   const dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   if (id) {
//     const index = dictData.findIndex(item => item.id === id)
//     if (index > -1) {
//       dictData[index]['dictTypeName'] = dictTypeName
//       dictData[index]['dictTypeCode'] = dictTypeCode
//       dictData[index]['dictTypeRemark'] = dictTypeRemark
//     } else {
//       res.send({
//         code: 500,
//         msg: '字典类型id不存在！'
//       })
//       return
//     }
//   } else {
//     req.body.createTime = global.selfUtils.formatTime(null, 'YYYY-MM-DD hh:mm:ss')
//     req.body.id = global.selfUtils.createId()
//     dictData.push(req.body)
//   }
//   fs.writeFileSync('./data/dict.json', JSON.stringify(dictData))
//   res.send({
//     code: 200,
//     msg: id ? '编辑成功！' : '新增成功！'
//   })
// })
// Router.post('/addEditDictData', function (req, res) {
//   const {id, dictDataList} = req.body
//   const dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   const index = dictData.findIndex(item => item.id === id)
//   if (index > -1) {
//     dictData[index]['dictData'] = dictDataList
//     fs.writeFileSync('./data/dict.json', JSON.stringify(dictData))
//     res.send({
//       code: 200,
//       msg: '操作成功！'
//     })
//   } else {
//     res.send({
//       code: 500,
//       data: [],
//       msg: '字典类型id错误'
//     })
//   }

// })

// Router.delete('/del', function (req, res) {
//   let dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   dictData = dictData.filter(item => !req.body.includes(item.id))
//   fs.writeFileSync('./data/dict.json', JSON.stringify(dictData))
//   res.send({
//     code: 200,
//     msg: '删除成功！'
//   })
// })

// Router.post('/getDictDatasBydictTypes', function (req, res) {
//   let resData = {}
//   let dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8')).filter(item => item.dictTypeStatus === '1')
//   dictData.forEach(item => {
//     if (req.body.includes(item.dictTypeCode)) {
//       resData[item.dictTypeCode] = item.dictData.filter(item => item.dictDataStatus === '1')
//     }
//   })
//   res.send({
//     code: 200,
//     data: resData
//   })
// })

// Router.get('/changeDictypeStatus/:id', function (req, res) {
//   const { id } = req.params
//   let dictData = JSON.parse(fs.readFileSync('./data/dict.json', 'utf8'))
//   const index = dictData.findIndex(item => item.id === id)
//   if (index > -1) {
//     dictData[index]['dictTypeStatus'] = (dictData[index]['dictTypeStatus'] === '1' ? '2' : '1')
//   }
//   fs.writeFileSync('./data/dict.json', JSON.stringify(dictData))
//   res.send({
//     code: 200,
//     msg: '操作成功！'
//   })
// })
//向外导出路由
module.exports = Router