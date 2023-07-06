import { getMenuList } from '@/api/menu'
export default {
  namespaced: true,
  state: {
    routes: []
  },
  mutations: {
    ROUTES_CHANGE(state, routes) {
      state.routes = routes
    },
  },
  actions: {
    getMenu({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList().then(res => {
          commit('ROUTES_CHANGE', res)
          resolve(res)
        })
      })
    }
  }
}