
const dictData = {
	'goodsType': [
		{value: '1', label: '数码产品'},
		{value: '2', label: '服装鞋帽'},
		{value: '3', label: '食品饮料'},
		{value: '4', label: '生活用品'},
		{value: '5', label: '瓜果蔬菜'}
	],
	'priceRegion': [
		{value: '1', label: '0-99'},
		{value: '2', label: '100-199'},
		{value: '3', label: '200-499'},
		{value: '4', label: '500-999'},
		{value: '5', label: '大于1000'}
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
	let data = {}
	arr.forEach(item => {
		data[item] = dictData[item]
	})
	return {
		code: 200,
		data,
		msg: '获取成功'
	}
}

function getPermission() {
	return ['add', 'del']
}

module.exports = {getDict, getPermission}

