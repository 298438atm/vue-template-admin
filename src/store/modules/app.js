export default {
  namespaced: true,
  state: {
    isCollapse: false,
    isFullScreen: false
  },
  mutations: {
    COLLAPSE_CHANGE(state) {
      state.isCollapse = !state.isCollapse
    },
    SCREEN_CHANGE(state) {
      state.isFullScreen = !state.isFullScreen
    }
  }
}