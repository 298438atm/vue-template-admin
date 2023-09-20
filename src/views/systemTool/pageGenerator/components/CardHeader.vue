<template>
  <div class="header_box">
    <span>{{ title }}</span>
    <span class="lock">
      <span v-if="dataChange">数据有所更改，记得及时缓存！</span>
      <el-tooltip
        effect="dark"
        content="将数据缓存在浏览器，刷新或退出也依旧存在"
        placement="top"
      >
        <el-button
          :icon="dataChange ? 'el-icon-unlock' : 'el-icon-lock'"
          type="text"
          @click="cacheHandler"
          >缓存</el-button
        >
      </el-tooltip>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CardHeader',
  inject: ['cache', 'watchData'],
  props: {
    title: String,
    cacheData: Object,
  },
  computed: {
    watchDataCom() {
      return this.watchData()
    },
  },
  methods: {
    cacheHandler() {
      this.dataChange = false
      this.initData = this.$commonFun.cloneDeep(this.watchDataCom)
      this.cache()
    },
  },
  data() {
    return {
      init: false,
      initData: {},
      dataChange: false,
    }
  },
  watch: {
    watchDataCom: {
      deep: true,
      immediate: true,
      handler(newV) {
        if (!this.init) {
          this.init = true
          this.initData = this.$commonFun.cloneDeep(newV)
        } else {
          const flag = !this.$commonFun.isEqual(newV, this.initData)
          this.dataChange = flag
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.header_box {
  display: flex;
  justify-content: space-between;
  .lock {
    span {
      font-size: 12px;
      color: red;
    }
  }
}
</style>
