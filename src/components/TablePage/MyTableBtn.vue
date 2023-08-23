<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    :type="$attrs.type || 'text'"
    :icon="icon"
    :class="colorRed"
  >
    <slot>{{ btnName }}</slot>
  </el-button>
</template>

<script>
export default {
  name: 'MyTableBtn',
  props: {
    btnType: {
      type: String,
      default: 'edit',
    },
    status: {
      type: String,
      default: '1',
    },
  },
  computed: {
    icon() {
      if (this.btnType === 'edit') {
        return 'el-icon-edit'
      } else if (this.btnType === 'del') {
        return 'el-icon-delete'
      } else if (this.btnType === 'status') {
        return this.status === '1' ? 'el-icon-open' : 'el-icon-turn-off'
      }
    },
    btnName() {
      if (this.btnType === 'edit') {
        return '修改'
      } else if (this.btnType === 'del') {
        return '删除'
      } else if (this.btnType === 'status') {
        return this.status === '1' ? '停用' : '启用'
      }
    },
    colorRed() {
      return {
        'btn_text_red': this.btnType === 'del'
      }
    }
  },
}
</script>

<style lang="less" scoped></style>
