const fs=require('fs')
function getMenu(res) {
  fs.readFile('./menu.json', 'UTF8', function(err, dataStr) {
    let arr = JSON.parse(dataStr)
    res.send({
      code: 200,
      data: arr
    }) 
  })
}

module.exports = {getMenu}