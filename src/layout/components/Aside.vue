<template>
  <div class="aside">
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="logo" height="50" />
    </div>
    <el-menu
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#000"
      active-text-color="#64beff"
      :default-active="$route.path"
    >
      <AsideItem v-for="item in routes" :key="item.path" :route="item"></AsideItem>
    </el-menu>
  </div>
</template>

<script>
import AsideItem from './AsideItem.vue'
export default {
  name: 'Aside',
  components: { AsideItem },
  props: {},
  data() {
    return {}
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse
    },
    routes() {
      return this.$store.state.user.routes
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.aside {
  flex-shrink: 0;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
  .logo {
    padding: 10px 0;
    text-align: center;
    // width: 100%;
    height: 70px;
    img {
      margin: auto;
    }
  }
  .el-menu {
    height: calc(100vh - 70px);
    overflow-y: scroll;
  }
  // 解决menu收缩的时候卡顿
  .el-menu:not(.el-menu--collapse) {
    width: 250px;
  }
}
// 设置整个滚动条
*::-webkit-scrollbar {
  width: 6px;
  background-color: black;
}
// 设置没有占用到的滚动条
*::-webkit-scrollbar-track {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
// 设置正在占用的滚动条
*::-webkit-scrollbar-thumb {
  background-color: #e7e9e9;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
</style>
