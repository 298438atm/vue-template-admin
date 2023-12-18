import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js' 
import plugins from './plugins'
import installCommomComponents from '@/components/install.js'
import tools_ui from "@code_life/tools_ui"
import "@code_life/tools_ui/tools_ui.css"
console.log(tools_ui, 'tools_ui');
// 引入样式
import '@/assets/css/common.scss'
import '@/assets/css/reset.css'

// 原型绑定方法
import colorFun from '@/utils/colorFun'
import commonFun from '@/utils/commonFun'
Vue.prototype.$colorFun = colorFun
Vue.prototype.$commonFun = commonFun
// 创建一个事件总线
Vue.prototype.$bus = new Vue()

Vue.use(plugins)
Vue.use(installCommomComponents)
Vue.use(tools_ui)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
