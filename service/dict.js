
const dictData = {
	'fruits': [
		{value: '1', label: '西瓜'},
		{value: '2', label: '苹果'},
		{value: '3', label: '菠萝'},
		{value: '4', label: '香蕉'},
		{value: '5', label: '葡萄'}
	],
	'song': [
		{value: '1', label: '相亲相爱的一家人'},
		{value: '2', label: '感恩的♥'},
		{value: '3', label: '团结就是力量'},
		{value: '4', label: '没有共产党就是没有新中国'},
		{value: '5', label: '学习雷锋好榜样'}
	],
	'movies': [
		{value: '1', label: '肖申克的救赎'},
		{value: '2', label: '点石成金'},
		{value: '3', label: '将夜'},
		{value: '4', label: '将夜2'},
		{value: '5', label: '赘婿'}
	]
}
function getDict(arr) {
	let resArr = {}
	arr.forEach(item => {
		resArr[item] = dictData[item]
	})
	return resArr
}

function getPermission() {
	return ['add', 'del']
}

module.exports = {getDict, getPermission}

