import { verifyType} from '@/utils/commonFun'
const state = {
  themeColor: '#03748b',
  menuColor: '#03748b',
  menuTextColor: '#ffffff',
  menuTextActiveColor: '#000000',
  elementSize: 'small'
}

const mutations = {
  // 修改state里面的数据，支持批量修改，可以传递对象和数组
  CHANGE_STATE: (state, obj) => {
    if (Array.isArray(obj)) {
      obj.forEach(item => {
        const key = Object.keys(item)[0]
        const val = item[key]
        if (state.hasOwnProperty(key)) {
          state[key] = val
        }
      })
    } else if (verifyType(obj, 'Object')) {
      const keys = Object.keys(obj)
      keys.forEach(key => {
        const val = obj[key]
        if (state.hasOwnProperty(key)) {
          state[key] = val
        }
      })
    }
    localStorage.setItem('theme', JSON.stringify(state))
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
