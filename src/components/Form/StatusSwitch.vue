<template>
  <el-switch
    v-model="switchValue"
    active-text="启用"
    inactive-text="停用"
    active-value="1"
    inactive-value="0"
  ></el-switch>
</template>

<script>
export default {
  name: 'StatusSwitch',
  props: {
    modelValue: {
      type: String,
      default: '1'
    }
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue'
  },
  computed: {
    switchValue: {
      get() {
        return this.modelValue
      },
      set(newV) {
        this.$emit('updateModelValue', newV)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
