<template>
  <div class="divider" :style="{ backgroundColor: bgkColor, color: color }">
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  name: 'Divider',
  props: {
    bgkColor: String,
    color: String,
    text: String,
  },
}
</script>

<style lang="less" scoped>
.divider {
  position: relative;
  width: 100%;
  height: 1px;
  background-color: rgb(196, 196, 196);
  color: rgb(164, 164, 164);
  span {
    padding: 0 10px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translateY(-50%);
    z-index: 999;
    background-color: #fff;
  }
}
</style>
