// 自定义时间格式函数
function formatTime(date, formatTimeStr = 'YYYY-MM-DD', ) {
  let useDate = null
  //优先判断时间是否存在，不存在则选取当前时间进行转换。
  if (date) {
    useDate = new Date(date)
    //判断传入的时间能否被正确转换为时间格式
    if (isNaN(useDate.getTime())) {
      console.error('请输入可以正确转换的时间格式！')
      return ''
    }
  } else {
    useDate = new Date()
  }
	if(formatTimeStr === 'time') {
		return useDate.getTime()
	}
  let YYYY = useDate.getFullYear()
  let M = String(useDate.getMonth() + 1)
  //es6字符补齐方法
  let MM = M.padStart(2, '0')
  let D = String(useDate.getDate())
  let DD = D.padStart(2, '0')
  let h = String(useDate.getHours())
  let hh = h.padStart(2, '0')
  let m = String(useDate.getMinutes())
  let mm = m.padStart(2, '0')
  let s = String(useDate.getSeconds())
  let ss = s.padStart(2, '0')
  //使用replace进行正则替换，并进行链式调用
  let str = formatTimeStr.replace(/Y{4}/g, YYYY)
    .replace(/(M{1,2})/g, function (all, month) {
      return month.length === 2 ? MM : M
    })
    .replace(/(D{1,2})/g, function (all, date) {
      return date.length === 2 ? DD : D
    })
    .replace(/(h{1,2})/g, function (all, hours) {
      return hours.length === 2 ? hh : h
    })
    .replace(/(m{1,2})/g, function (all, minutes) {
      return minutes.length === 2 ? mm : m
    })
    .replace(/(s{1,2})/g, function (all, seconds) {
      return seconds.length === 2 ? ss : s
    })
  return str
}
module.exports = formatTime