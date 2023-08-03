// 自动注册components里面的组件为全局组件
// 如果不需要注册为全局组件则可以在组件内部使用noInstall: true关闭该功能
const plugins = function (Vue) {
  const requireAll = require.context('@/components', true, /\.vue$/)
  const modulList = requireAll.keys().map(item => requireAll(item))
  modulList.forEach(({default : vm}) => {
    if(!vm.noInstall) {
      Vue.component(vm.name, vm)
    }
  })
}
export default plugins