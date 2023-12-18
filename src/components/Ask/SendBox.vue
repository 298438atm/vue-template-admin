<template>
  <div class="sendBox">
    <el-input
      v-model.trim="request"
      type="textarea"
      placeholder="请输入您的问题，按回车键进行查询"
      :rows="3"
      v-on:keydown.enter.native="keyUp"
      :disabled="disabled"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: 'SendBox',
  noInstall: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
    
  },
  data() {
    return {
      request: '',
    }
  },
  methods: {
    keyUp(e) {
      const { shiftKey } = e
      if (!shiftKey) {
        e.preventDefault()
        this.$emit('send', this.request)
        this.request = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.sendBox {
  width: 100%;
  padding: 10px;
}
</style>
