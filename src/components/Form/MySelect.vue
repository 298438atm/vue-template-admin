<template>
  <el-select
    style="width: 100%"
    v-model="localValue"
    :placeholder="$attrs.placeholder ? $attrs.placeholder : '请选择'"
    :clearable="$attrs.clearable ? $attrs.clearable : true"
    :filterable="$attrs.filterable ? $attrs.filterable : true"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item[optionKey]"
      :label="item[optionLabelFiled]"
      :value="optionValueIsObject ? item : item[optionValueFiled]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: [String, Object, Array],
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValueIsObject: Boolean,
    optionValueFiled: {
      type: String,
      default: 'value',
    },
    optionLabelFiled: {
      type: String,
      default: 'label',
    },
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
}
</script>

<style lang="less" scoped></style>
