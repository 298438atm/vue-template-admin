import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import plugins from './plugins'
import installCommomComponents from '@/components/install.js'

import '@/assets/css/common.scss'
import '@/assets/css/reset.css'

Vue.use(plugins)
Vue.use(installCommomComponents)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
