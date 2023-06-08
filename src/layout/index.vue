<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <el-header height="120">
        <Header></Header>
        <PageTags></PageTags>
      </el-header>
      <el-main>Main</el-main>
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
    return {
    }
  },

}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
