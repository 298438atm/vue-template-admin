import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import MyTable from '@/components/TablePage/index.vue'
import plugins from './plugins'

import '@/assets/css/common.scss'
import '@/assets/css/reset.css'

Vue.component('MyTable', MyTable)

Vue.use(plugins)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
