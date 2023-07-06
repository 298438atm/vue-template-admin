import { Tooltip } from 'element-ui';

const install = function (Vue) {
  Vue.directive('tooltip', {
    bind(el, binding) {
      const { value } = binding
      console.log(value, 'value');
      // 创建 Tooltip 实例
      
    }
  })
}

export default install