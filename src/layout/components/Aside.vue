<template>
  <div class="aside">
    <div class="logo">
      <img src="@/assets/image/logo.png" alt="logo" height="50" />
    </div>
    <el-menu
      default-active="1-4-1"
      class="w250"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#000"
      active-text-color="#64beff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.aside {
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
