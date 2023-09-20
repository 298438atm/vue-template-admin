<template>
  <div class="AsideItem" :style="`--beforeColor: ${menuTextActiveColor}`">
    <el-menu-item v-if="route.type === 'page'" :index="route.id" @click="$router.push(route.path)">
      <i :class="route.icon"></i>
      <span v-show="!isCollapse">{{ route.name }}</span>
    </el-menu-item>
    <el-submenu v-else-if="route.type === 'menu'" :index="route.id">
      <template slot="title">
        <i :class="route.icon"></i>
        <span v-show="!isCollapse">{{ route.name }}</span>
      </template>
      <AsideItem
        v-for="item in route.children"
        :key="item.id"
        :route="item"
      ></AsideItem>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'AsideItem',
  props: {
    route: {
      type: Object,
      default: () => ({}),
    },
  },
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
    menuTextActiveColor() {
      return this.$store.state.theme.menuTextActiveColor
    }

  },
  methods: {},
}
</script>

<style lang="less" scoped>
.aside {
  height: 100vh;
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
    overflow-x: hidden;
    .el-menu-item.is-active::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 0;
      width: 3px;
      height: 40px;
      background-color: var(--beforeColor);
    }
  }
}
</style>
