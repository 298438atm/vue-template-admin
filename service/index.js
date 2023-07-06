const express = require('express')
const app = express()
// const dict = require('./router/dict')
const {login} = require('./user.js')
const { getTableList } = require('./table.js')
require('./utils/index')
const APIRouter = require('./router/index')

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type, Authorization");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS,FILE");
  if (req.method.toLowerCase() == 'options') {
    res.send(200); //让options尝试请求快速结束
  }else {
    next();
  }
});

app.use(express.urlencoded())
app.use(express.json())
app.use((req, res, next) => {
  setTimeout(next, 500)
})
app.use(APIRouter)
// 字典和按钮权限
// app.use('/dict', dict)
app.get('/getPermission', (req, res) => {
	res.send(getPermission())
})
app.post('/login', (req, res) => {
  login(res)
})
app.get('/getTable', (req, res) => {
  getTableList(req.query,res)
})
app.get('/raceList', (req, res) => {
  res.send({
    code: 200,
    data: [1,2,3,4,5,6,7,8,9,10]
  })
})

app.listen(3333, () => {
  console.log(`服务启动成功`)
})

