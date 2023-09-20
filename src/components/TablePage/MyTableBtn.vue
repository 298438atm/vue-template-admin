<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    :type="$attrs.type || 'text'"
    :icon="$attrs.icon || btnList[btnType]['icon']"
    :class="btnList[btnType]['class']"
  >
    <slot>{{ btnList[btnType]['btnName'] }}</slot>
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
    btnList() {
      return {
        del: {
          icon: 'el-icon-delete',
          class: 'btn_text_red',
          btnName: '删除',
        },
        edit: {
          icon: 'el-icon-edit',
          btnName: '修改',
        },
        status: {
          icon: this.status === '1' ? 'el-icon-open' : 'el-icon-turn-off',
          btnName: this.status === '1' ? '停用' : '启用',
        },
        save: {
          icon: 'el-icon-check',
          btnName: '保存',
        },
      }
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped></style>
