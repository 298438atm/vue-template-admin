export default function install(Vue) {
  console.log(Vue.config, 'Vue');
  Vue.config.errorHandler = (err, vm, info) => {
    console.log(err, 'err');
    if (err.name === 'NavigationDuplicated') {
      console.log('重复点击了链接！', err)
    }
  };
}
