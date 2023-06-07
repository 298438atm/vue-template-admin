export default class SessiomCrud {
  static get(key) {
    const data = window.sessionStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
  }
  
  static set(key, data) {
    window.sessionStorage.setItem(key, JSON.stringify(data))
  }
  
  static del(key) {
    window.sessionStorage.removeItem(key)
  }
}