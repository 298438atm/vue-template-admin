const fs=require('fs')
function login(res) {
  res.send({
    code: 200,
    msg: '登录成功！',
    data: {
      token: '213123131231231312321'
    }
  })
  // fs.readFile('./menu.json', 'UTF8', function(err, dataStr) {
  //   let arr = JSON.parse(dataStr)
  //   res.send({
  //     code: 200,
  //     data: arr,
  //     msg: '操作成功！'
  //   }) 
  // })
}

module.exports = {login}