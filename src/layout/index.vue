<template>
  <el-container>
    <Aside></Aside>
    <el-container>
      <Header></Header>
      <!-- <el-main>Main</el-main> -->
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
export default {
  name: 'Layout',
  components: { Aside, Header },
  data() {
    return {
    }
  },

}
</script>

<style lang="less" scoped></style>
