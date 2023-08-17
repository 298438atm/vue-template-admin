<template>
  <el-input
    v-model="localValue"
    :maxlength="$attrs.maxlength || 20"
    :show-word-limit="$attrs.showWordLimit || true"
    :clearable="$attrs.clearable || true"
    :rows="$attrs.row || 3"
    v-bind="$attrs"
    v-on="$listeners"
    style="width: 100%"
    :placeholder="$attrs.placeholder || '请输入'"
    type="textarea"
  >
    <template v-for="(value, name) in $slots" #[name]>
      <slot :name="name"> </slot>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'MyTextarea',
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
