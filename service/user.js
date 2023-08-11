const fs=require('fs')
function login(res) {
  console.log(res.body);
  res.send({
    code: 200,
    msg: '登录成功！',
    data: {
      token: '213123131231231312321'
    }
  })
}

module.exports = {login}