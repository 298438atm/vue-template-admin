<template>
  <div :class="status" class="status_text">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'StatusIconVue',
  props: {
    status: {
      type: String,
      default: 'connect',
    },
  },
  computed: {
    text() {
      switch (this.status) {
        case 'init':
          return '连接中'
          break
        case 'success':
          return '连接成功'
          break
        case 'error':
          return '连接失败'
          break

        default:
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.status_text{
  font-size: 12px;
}
.init::before {
  display: inline-block;
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  animation: spin 1s linear infinite;
}
.success::before {
  display: inline-block;
  content: '✔';
  color: green;
}
.error::before {
  display: inline-block;
  content: '×';
  color: red;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  } /* 转动的起始位置 */
  100% {
    transform: rotate(360deg);
  } /* 转动的结束位置 */
}
</style>
