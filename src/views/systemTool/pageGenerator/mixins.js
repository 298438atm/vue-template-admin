import Vue from 'vue'
export default {
  provide() {
    return {
      cache: this.cache,
      watchData: () => this[this.key]
    }
  },
  created() {
    const cacheData = JSON.parse(localStorage.getItem(this.key) || null)
    if (cacheData) {
      this[this.key] = cacheData
    }
  },
  methods: {
    cache() {
      localStorage.setItem(this.key, JSON.stringify(this[this.key]))
      this.$message.success('缓存成功！')
    }
  }
}