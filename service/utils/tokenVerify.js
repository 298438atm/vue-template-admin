const jwt = require('jsonwebtoken');

function tokenVerify(req, res, next) {
  const { authorization } = req.headers
  jwt.verify(authorization, global.secretKey, function (err, decoded) {
    console.log(err, 'err');
    if (err) {
      res.send({
        code: 401,
        msg: 'token失效'
      })
    } else {
      req.tokenData = decoded
      next()
    }
  })
}

module.exports = tokenVerify