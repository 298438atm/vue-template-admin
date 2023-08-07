export function formatTime(formatTimeStr = 'YYYY-MM-DD hh:mm:ss', date = new Date()) {
  if (Object.prototype.toString.call(new Date(date)) === '[object Date]') {
    let YYYY = date.getFullYear()
    let M = String(date.getMonth() + 1)
    let D = String(date.getDate())
    let h = String(date.getHours())
    let m = String(date.getMinutes())
    let s = String(date.getSeconds())
    let str = formatTimeStr.replace(/YYYY/g, YYYY);
    let obj = { M, D, h, m, s }
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const reg = new RegExp(`(${key}+)`, 'g')
        str = str.replace(reg, ($1) => {
          return $1.length === 2 ? (value < 10 ? '0' + value : value) : value
        })
      }
    }
    return str
  } else {
    throw new Error('您传入的类型不是时间格式！')
  }
}
// 返回数据类型
export function returnType(data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}
export function verifyType(data, type) {
  return returnType(data) === type
}

export default {
  formatTime,
  returnType,
  verifyType
}
