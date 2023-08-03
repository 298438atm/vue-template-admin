const tableList = []
for (let i = 0; i < 100; i++) {
  let obj = {
    id: i + 1,
    date: new Date(),
    name: `我是第${(i + 1)}号商品`,
    code: generateRandomNumber(8),
    price: getRandomNumber(10, 1000000)
  }
  tableList.push(obj)
}
function generateRandomNumber(length) {
  const min = 10 ** (length - 1);
  const max = (10 ** length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTableList(params, res) {
  let {
    currentPage,
    pageSize,
    name
  } = params
  currentPage = Number(currentPage)
  pageSize = Number(pageSize)
  name = name ? name : ''
  let filterList = tableList.filter(item => item.name.includes(name))
  let resList = filterList.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize)
  let resObj = {
    currentPage,
    pageSize,
    total: filterList.length,
    data: resList
  }
  setTimeout(() => {
    res.send({
      code: 200,
      data: resObj
    })
  }, 1000);
}

exports.getTableList = getTableList