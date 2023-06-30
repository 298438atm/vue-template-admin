export default function install(Vue) {
  Vue.config.errorHandler = (err, vm, info) => {
    if (err.name === 'NavigationDuplicated') {
      console.log('重复点击了链接！', err)
    }
  };
}
  