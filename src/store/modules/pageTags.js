export default {
  namespaced: true,
  state: {
    tags: []
  },
  mutations: {
    ADD_TAG(state, tag) {
      let flag = state.tags.every(item => item.path !== tag.path)
      if (flag) {
        state.tags = [...state.tags, tag]
      }
    },
    DEL_TAG(state, tag) {
      state.tags = state.tags.filter(item => item.path !== tag.path)
    },
  },
  actions: {
    
  }
}