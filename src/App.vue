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
