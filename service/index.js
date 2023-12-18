const express = require('express')
const app = express()
// const dict = require('./router/dict')
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

global.secretKey = 'fujunlingyangdandan'
app.use(express.urlencoded())
app.use(express.json())
const noTokenApi = ['/user/login']
app.use((req, res, next) => {
  setTimeout(() => {
    if (noTokenApi.includes(req._parsedUrl.pathname)) {
      next()
    } else {
      global.selfUtils.tokenVerify(req, res, next)
    }
  }, 500);
})
app.use(APIRouter)

app.listen(3333, () => {
  console.log(`服务启动成功`)
})

