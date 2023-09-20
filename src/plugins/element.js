import Vue from 'vue'
import Element from 'element-ui'
import '@/assets/css/element-variables.scss'
import store from '@/store/index'

const {elementSize: size } = store.state.theme
Vue.use(Element, { size, zIndex: 3000 })
