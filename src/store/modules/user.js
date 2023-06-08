import { getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    routes: [
      {
        name: '首页',
        path: 'home',
        remark: '我是备注',
        type: 'page',
        icon: 'el-icon-s-home',
        id: 'home',
        component: 'home'
      },
      {
        name: '系统设置',
        path: 'systenSetting',
        remark: '我是备注',
        type: 'menu',
        icon: 'el-icon-setting',
        id: 'systenSetting',
        children: [
          {
            name: '字典管理',
            path: 'dict',
            remark: '我是备注',
            type: 'page',
            icon: 'el-icon-reading',
            id: 'dict',
            component: '/systenSetting/dict'
          },
          {
            name: '角色管理',
            path: 'role',
            remark: '我是备注',
            type: 'page',
            icon: 'el-icon-bank-card',
            id: 'role',
            component: '/systenSetting/role'
          },
          {
            name: '菜单管理',
            path: 'menu',
            remark: '我是备注',
            type: 'page',
            icon: 'el-icon-menu',
            id: 'menu',
            component: '/systenSetting/menu'
          }
        ]
      },
      {
        name: '业务模拟',
        path: 'business',
        remark: '我是备注',
        type: 'menu',
        icon: 'el-icon-s-cooperation',
        id: 'business',
        children: [
          {
            name: '商品管理',
            path: 'goods',
            remark: '我是备注',
            type: 'menu',
            icon: 'el-icon-s-shop',
            id: 'goods',
            children: [
              {
                name: '新进商品',
                path: 'newAddGoods',
                remark: '我是备注',
                type: 'page',
                icon: 'el-icon-s-data',
                id: 'newAddGoods',
                component: '/systenSetting/newAddGoods'
              },
            ]
          },
        ]
      }
    ]
  },
  mutations: {
    ROUTES_CHANGE(state, routes) {
      state.routes = routes
    },
    SCREEN_CHANGE(state) {
      state.isFullScreen = !state.isFullScreen
    }
  },
  actions: {
    getInfo({ commit }) {
      getUserInfo().then(res => {

      })
    }
  }
}