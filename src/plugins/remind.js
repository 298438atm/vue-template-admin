import { MessageBox } from 'element-ui';
const install = function(Vue) {
  Vue.directive('remind', {
    bind(el, binding) {
      const { value } = binding
      const defaultValue = {
        title: '提示',
        message: '确认删除所选数据？',
        type: 'warning'
      }
      Object.assign(defaultValue, value)
      el.addEventListener('click', () => {
        MessageBox.confirm(value.title || defaultValue.title, {
          ...defaultValue
        }).then(() => {
          value.hander.loading = true
          console.log(value.hander);
          value.hander()
        }).catch(err => {
          console.log(err);
        })
      })  
    }
  })
}

export default install