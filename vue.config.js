const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      // 禁止Uncaught runtime error直接提示在屏幕上
      overlay: false,
    },
  }
})
