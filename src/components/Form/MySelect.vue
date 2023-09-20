<template>
  <el-select
    style="width: 100%"
    v-model="localValue"
    :placeholder="$attrs.placeholder ? $attrs.placeholder : '请选择'"
    :clearable="$commonFun.isEmpt($attrs.clearable) ? true : $attrs.clearable"
    :filterable="
      $commonFun.isEmpt($attrs.filterable) ? true : $attrs.filterable
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in localOptions"
      :key="item[optionKey]"
      :label="item[optionLabel]"
      :value="optionValueIsObject ? item : item[optionValue]"
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
    options: [Function, Array],
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValueIsObject: Boolean,
    optionValue: {
      type: String,
      default: 'value',
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
  },
  model: {
    prop: 'modelValue',
    event: 'updateModelValue',
  },
  data() {
    return {
      localOptions: [],
    }
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
  watch: {
    options: {
      immediate: true,
      async handler(newV) {
        if (typeof newV === 'function') {
          newV((list) => {
            this.localOptions = list
          })
        } else {
          this.localOptions = newV
        }
      },
    },
  },
}
</script>

<style lang="less" scoped></style>
