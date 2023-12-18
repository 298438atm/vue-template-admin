import { verifyEmpty } from './commonFun'

export function getSessionByKey(key) {
  if (verifyEmpty(key)) {
    console.err('session的key为空！')
  } else {
    const keyStr = String(key)
    return JSON.parse(window.sessionStorage.getItem(keyStr))
  }
}
export function setSessionByKey(key, data) {
  if (verifyEmpty(key)) {
    console.err('session的key为空！')
  } else {
    let dataStr = ''
    const keyStr = String(key)
    if (!verifyEmpty(data)) {
      dataStr = JSON.stringify(data)
      window.sessionStorage.setItem(keyStr, dataStr)
    } else {
      window.sessionStorage.setItem(keyStr, '')
    }
  }
}
export function delSessionByKey(key) {
  if (verifyEmpty(key)) {
    console.err('session的key为空！')
  } else {
    window.sessionStorage.removeItem(keyStr)
  }
}
export function clearSession() {
  window.sessionStorage.clear()
}

export default {
  getSessionByKey,
  setSessionByKey,
  delSessionByKey,
  clearSession,
}
