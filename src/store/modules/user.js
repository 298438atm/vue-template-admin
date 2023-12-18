import { getRoutes } from '@/api/menu'
import { getUserInfo } from '@/api/user'
export default {
  namespaced: true,
  state: {
    routes: [],
    userInfo: {}
  },
  mutations: {
    ROUTES_CHANGE(state, routes) {
      state.routes = routes
    },
    ROUTES_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    getMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getRoutes().then(res => {
          commit('ROUTES_CHANGE', res)
          resolve(res)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          commit('ROUTES_USER_INFO', res)
          resolve(res)
        })
      })
    }
  }
}