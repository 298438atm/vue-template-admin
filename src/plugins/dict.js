import { getDictDatasBydictTypes } from "@/api/dict"
const install = function (Vue) {
	Vue.mixin({
		data() {
			if (Array.isArray(this.$options.dicts)) {
				return {
					dict: {}
				}
			} else {
				return {}
			}

		},
		created() {
			if (this.$options.dicts instanceof Array) {
				getDictDatasBydictTypes(this.$options.dicts).then(res => {
					//数据结构为 {dict1:[{value:'1', label: '类型1'}], dict2:[{value:'1', label: '类型1'}]
					Object.keys(res).forEach(key => {
						let value = res[key].map(item => {
							item.value = item.dictDataCode
							item.label = item.dictDataName
							return item
						})
						this.$set(this.dict, key, value)
					});
				})
			}
		},
		methods: {
			getDictValue(dictName, label) {
				let dictArr = this.dict[dictName]
				if (Array.isArray(dictArr) && dictArr.length > 0) {
					return dictArr.filter(item => item.label === label)[0]?.label
				} else {
					console.error('未匹配到对应字典的label值')
					return ''
				}
			},
			getDictLabel(dictName, value) {
				let dictArr = this.dict[dictName]
				if (Array.isArray(dictArr) && dictArr.length > 0) {
					return dictArr.filter(item => item.value === value)[0]?.value
				} else {
					console.error('未匹配到对应字典的value值')
					return ''
				}
			}
		}
	})
}
export default install