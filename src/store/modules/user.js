import { getRoutes } from '@/api/menu'
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
        getRoutes().then(res => {
          commit('ROUTES_CHANGE', res)
          resolve(res)
        })
      })
    }
  }
}