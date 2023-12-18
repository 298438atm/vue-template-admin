<template>
  <div class="message_list_box">
    <div
      v-for="(item, index) in messageList"
      :key="index"
      class="message_item"
      :style="styleByRole(item.role)"
    >
      <img
        width="50"
        src="https://bpic.51yuansu.com/pic3/cover/01/72/07/5960011dd491d_610.jpg?x-oss-process=image/resize,h_360,m_lfit/sharpen,100"
        alt="头像"
        :class="item.role === 'user' ? 'scaleX' : ''"
      />
      <div
        class="message_centent"
        :class="item.role === 'assistant' ? 'assistant' : 'user'"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MessageList',
  props: {
    messageList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState('theme', ['menuColor']),
  },
  data() {
    return {
      // mssageList: [],
      localMessageList: []
    }
  },
  methods: {
    styleByRole(role) {
      return {
        justifyContent: role === 'user' ? 'end' : 'start',
        flexDirection: role === 'user' ? 'row-reverse' : 'row',
      }
    },
  }
}
</script>

<style lang="less" scoped>
.message_item {
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  img {
    border-radius: 50%;
  }
  .scaleX {
    transform: scaleX(-1);
  }
  .message_centent {
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px;
    // width: 80%;
    border: 1px solid var(--menuColor);
    border-radius: 5px;
    min-height: 50px;
    font-size: 14px;
    word-break: break-all;
  }
  .assistant {
    margin-left: 15px;
  }
  .user {
    margin-right: 15px;
    flex-direction: row-reverse;
  }
  .message_centent::before {
    content: '';
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 10px solid transparent;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
  .assistant::before {
    left: -16px;
    border-right: 10px solid var(--menuColor);
  }
  .user::before {
    margin-right: 15px;
    right: -35px;
    border-left: 10px solid var(--menuColor);
  }
}
</style>
