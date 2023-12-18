<template>
  <el-date-picker
   v-bind="$attrs"
    v-on="$listeners"
    style="width: 100%"
    v-model="localValue"
    :placeholder="$attrs.placeholder || '请选择日期'"
    :value-format="$attrs.valueFormat || 'yyyy-MM-dd'"
  >
  </el-date-picker>
</template>

<script>
export default {
  name: 'MyDatePicker',
  props: {
    modelValue: {
      type: [String, Array, Object, Number],
    }
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  created() {
    
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
