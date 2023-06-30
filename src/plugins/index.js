// 此处用于管理项目所有插件，自动引入该文件夹下所有项目进行插件注册
const plugins = function (Vue) {
  const requireAll = require.context('@/plugins', true, /^\.\/(?!index|element)(\w+)\.js$/)
  const modulList = requireAll.keys().map(item => requireAll(item))
  modulList.forEach(item => {
    Vue.use(item.default)
  })
}
export default plugins