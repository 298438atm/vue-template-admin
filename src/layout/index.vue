<template>
  <el-container>
    <Aside></Aside>
    <el-container style="height: 100vh;">
      <el-header height="120">
        <Header></Header>
        <PageTags></PageTags>
      </el-header>
      <el-main>
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import PageTags from './components/PageTags.vue'
export default {
  name: 'Layout',
  components: { Aside, Header, PageTags },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
