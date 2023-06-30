const fs = require('fs');

const files = fs.readdirSync('./utils').filter(item => item !== 'index.js')
const selfUtils = {}
files.forEach(item => {
  const name = item.split('.')[0]
  selfUtils[name] = require(`./${item}`)
})
global.selfUtils = selfUtils