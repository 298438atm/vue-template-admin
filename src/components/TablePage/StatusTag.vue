<template>
  <el-tag :type="tagType">{{ text }}</el-tag>
</template>

<script>
  export default {
    name: 'StatusTag',
    props: {
      status: {
        type: String,
        default: '1'
      }
    },
    computed: {
      tagType() {
        return this.status === '1' ? '' : 'danger'
      },
      text() {
        return  this.status === '1' ? '启用' : '停用'
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang='less' scoped>

</style>