<template>
  <div class="home_box">
    <div class="center_box">
      <h3>宗旨</h3>
      <p>
        正对市面上的一些庞大的功能全面的后台管理系统，vue-admin-template反其道而行，只保留后台系统真正需要的几个简单模块，做到非过度封装，非过度冗柔。
      </p>
      <span
        >其实就是技术不到位，做不到那么全面，但是基础功能还是保证的，让开发者拿到的是一个干净简洁，便于拓展的后台管理框架！</span
      >
    </div>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.home_box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center_box {
  margin-top: 10vh;
  text-align: center;
  h3 {
    margin-bottom: 50px;
  }
  p {
    margin: auto;
    margin-bottom: 50px;
    width: 400px;
    text-align: left;
  }
  span {
    font-size: 12px;
    color: red;
  }
}
</style>
