<template>
  <el-drawer
    title="欢迎来到问讯处"
    :visible.sync="visible"
    :direction="direction"
    :size="size"
  >
    <template #title>
      <div class="header_box">
        <span>欢迎来到问讯处</span>
        <StatusIconVue :status="status"></StatusIconVue>
      </div>
    </template>
    <MessageList :messageList="messageList"></MessageList>
    <SendBox class="send_box" @send="send" :disabled="status !== 'success'"></SendBox>
  </el-drawer>
</template>

<script>
import {Ask} from './ask'

import MessageList from './MessageList.vue'
import SendBox from './SendBox.vue'
import StatusIconVue from './StatusIcon.vue'

export default {
  name: 'Ask',
  components: { SendBox, MessageList, StatusIconVue },
  data() {
    return {
      visible: false,
      direction: 'rtl',
      size: 400,
      APISecret: 'MmEyMDk5MDY4NDU0MWIzNTllZDdmYmJl',
      APIKey: '9c55c46a4c72a3360fc1112f069cafcc',
      askWs: null,
      messageList: [],
      status: 'init',
      currentMessage: ''
    }
  },
  created() {
    this.askWs = new Ask(this)
  },
  mounted() {
    this.$on('ws', (params) => {
      const {type, data} = params
      this.status = type
      switch (type) {
        case 'init':
          
          break;
        case 'getMessage':
          this.messageHanlder(data)
          break;
        default:
          break;
      }
      // 接收和处理数据
    });
  },
  methods: {
    // 发送信息
    send(content) {
      const packageText = {role: 'user', content}
      this.messageList.push(packageText)
      this.askWs.send([packageText])
    },
    // 拼接信息
    messageHanlder(message) {
      const {choices} = message
      this.currentMessage += choices.text.reduce((pre, next) => pre += next.content , '')
      // 判断是否是最后一条
      if (choices.status === 2) {
        this.messageList.push({role: 'assistant', content: this.currentMessage})
        this.currentMessage = ''
      }
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
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status_text {
  font-size: 12px;
}
</style>
