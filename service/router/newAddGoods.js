//导入express
const express = require('express')

//创建路由对象
const Router = express.Router()
const fs = require('fs')

//挂载具体路由
Router.get('/list', function (req, res) {
  const { currentPage = 1, pageSize = 10 } = req.query
  let list = new Array(100).fill(1).map((item, index) => {
    return {
      name: `我是第${index + 1}个商品`,
      code: index + 1,
      price: index + 1,
      createTime: new Date()
    }
  })
  const record = list.slice(currentPage - 1, currentPage - 1 + pageSize)
  res.send({
    code: 200,
    data: {
      record,
      total: list.length,
      currentPage,
      pageSize
    }
  })
})

//向外导出路由
module.exports = Router