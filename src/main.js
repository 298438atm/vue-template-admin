/*
 * @Author: fujunling 2984387807@qq.com
 * @Date: 2023-06-07 15:16:43
 * @LastEditors: fujunling 2984387807@qq.com
 * @LastEditTime: 2023-08-07 11:05:17
 * @FilePath: \vue2-admin-template\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js' 
import plugins from './plugins'
import installCommomComponents from '@/components/install.js'

import '@/assets/css/common.scss'
import '@/assets/css/reset.css'

// 原型绑定方法
import colorFun from '@/utils/colorFun'
Vue.prototype.$colorFun = colorFun

Vue.use(plugins)
Vue.use(installCommomComponents)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
