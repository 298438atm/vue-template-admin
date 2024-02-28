<template>
  <div id="app" :style="`--themeColor: ${themeColor};--menuColor: ${menuColor}`">
    <router-view/>
    <!-- <Ask></Ask> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'APP',
  computed: {
    ...mapState('theme', [
      'themeColor',
      'menuTextColor',
      'menuTextActiveColor',
      'menuColor',
    ]),
  }
}
</script>
<style>
/* 因为ClIconSelect组件的box-sizing属性设置为content-box，而我们的reset.css里面又重置为了border-box，所以需要手动手动设置下 */
.icon_ul {
  /* box-sizing: content-box; */
}
</style>