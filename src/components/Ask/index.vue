<template>
  <el-drawer
    title="欢迎来到问讯处"
    :visible.sync="visible"
    :direction="direction"
    :size="size"
  >
    <MessageList :list="messageList"></MessageList>
    <SendBox class="send_box" @send="send"></SendBox>
  </el-drawer>
</template>

<script>
import {Ask, packageText} from './ask'

import MessageList from './MessageList.vue'
import SendBox from './SendBox.vue'

export default {
  name: 'Ask',
  components: { SendBox, MessageList },
  data() {
    return {
      visible: true,
      direction: 'rtl',
      size: 400,
      APISecret: 'MmEyMDk5MDY4NDU0MWIzNTllZDdmYmJl',
      APIKey: '9c55c46a4c72a3360fc1112f069cafcc',
      askWs: null,
      messageList: []
    }
  },
  created() {
    this.askWs = new Ask(this)
  },
  mounted() {
    this.$on('ws', (params) => {
      const {type, data} = params
      switch (type) {
        case 'init':
          
          break;
      
        default:
          break;
      }
      // 接收和处理数据
      console.log(data, type, 'type');
    });
  },
  methods: {
    send(text) {
      this.askWs.send(packageText(text))
    }
  },
  watch: {
    visible(flag) {
      if (flag) {
        // this.askWs = new Ask(this)
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-drawer {
  .el-drawer__body {
    position: relative !important;
  }
  .send_box {
    position: absolute;
    bottom: 0px;
  }
}
</style>
