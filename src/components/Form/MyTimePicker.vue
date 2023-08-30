<template>
  <el-time-select
   v-bind="$attrs"
    v-on="$listeners"
    style="width: 100%"
    v-model="localValue"
    :placeholder="$attrs.placeholder || '请选择时间'"
  >
  </el-time-select>
</template>

<script>
export default {
  name: 'MyTimePicker',
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue
      },
      set(newV) {
        this.$emit('updateModelValue', newV)
      },
    },
  },
  data() {
    return {
      value: this.modelValue,
    }
  },
  watch: {
    value(newV) {
      this.$emit('updateModelValue', newV)
    },
  },
}
</script>

<style lang="less" scoped></style>
