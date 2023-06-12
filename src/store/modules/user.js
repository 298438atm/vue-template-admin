import { getMenu, test } from '@/api/user'
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
        getMenu().then(res => {
          commit('ROUTES_CHANGE', res)
          resolve(res)
        })
      })
    }
  }
}