<template>
  <div class="header_box">
    <span>{{title}}</span>
    <span class="lock">
      <el-tooltip
        effect="dark"
        content="将数据缓存在浏览器，刷新或退出也依旧存在"
        placement="top"
      >
        <el-button icon="el-icon-lock" type="text" @click="cacheToggle"
          >缓存</el-button
        >
      </el-tooltip>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'CardHeader',
    props: {
      title: String
    },
    methods: {
      cacheToggle() {

      }
    }
  }
</script>

<style lang="less" scoped></style>
