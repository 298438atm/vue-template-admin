const express = require('express');
const router = express.Router();
const fs = require('fs')

const files = fs.readdirSync('./router').filter(item => item !== 'index.js')
files.forEach(item => {
  const name = item.split('.')[0]
  router.use(`/${name}`, require(`./${item}`))
})
module.exports = router;