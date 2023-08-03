<template>
  <el-tag :type="tagType">{{ text }}</el-tag>
</template>

<script>
  export default {
    name: 'StatusTag',
    props: {
      status: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      tagType() {
        return this.status ? '' : 'danger'
      },
      text() {
        return  this.status ? '启用' : '停用'
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